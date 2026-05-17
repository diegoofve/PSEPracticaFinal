import  { type UpdateEmpresaDto, ListaEmpresaSchema, type EmpresaDto  } from "../dtos/empresa.dto"
import { prisma } from '../lib/db';
import { ForbiddenError, NotFoundError, UnauthorizedError } from "../lib/errors";
import bcrypt from "bcryptjs";

const getEmpresa = async (id: number): Promise<EmpresaDto[]> => {
    const result = await prisma.empresa.findMany({
        where: {
            id: id,
            fechaBaja: null
        }
    })

    return ListaEmpresaSchema.parse(result);
}

const getEmpresas = async (): Promise<EmpresaDto[]> => {
    const result = await prisma.empresa.findMany({
        where: {
            fechaBaja: null
        }
    })

    return ListaEmpresaSchema.parse(result);
}

//lio historico, ver si no es mejor refactorizarlo a /festivales/empresa y devolver todo de una vez a las cards
const getVentasEmpresa = async (empresaId: number) => {
    const empresa = await prisma.empresa.findUnique({
        where: { id: empresaId },
    });

    if (!empresa) throw new NotFoundError("Empresa no encontrada");
    if (empresa.fechaBaja) throw new ForbiddenError("Empresa dada de baja");

    const ventas = await prisma.venta.findMany({
        where: {
        ventasAbonos: {
            some: { abono: { festival: { empresaId } } },
        },
        estado: "PAGADA"
        },
        include: {
        ventasAbonos: {
            include: { abono: { include: { festival: true } } },
        },
        },
        orderBy: { creadoEn: "desc" },
    });

    return ventas.map(venta => ({
        id: venta.id,
        total: venta.total,
        fechaCompra: venta.creadoEn,
        festival: venta.ventasAbonos[0].abono.festival.id,
    }));

};

const updateEmpresa = async (empresaId: number, data: UpdateEmpresaDto): Promise<void> => {
    const result = await prisma.empresa.findUnique({
        where: {id: empresaId}
    })

    if(!result){
        throw new UnauthorizedError("Credenciales incorrectas.")
    }

    const { password, ...datos } = data
    const dataUpdate: any = {
        razonSocial: datos.razon,
        domicilioSocial: datos.domicilio,
        telefonoContacto: datos.telefono,
        nombreContacto: datos.nombreContacto
    } 

    if(password) {
        dataUpdate.password = await bcrypt.hash(password, 10)
    }

    await prisma.empresa.update({
        where: {id: empresaId},
        data: dataUpdate
    })
}

const bajaEmpresa = async (empresaId: number): Promise<void> => {
    const result = await prisma.empresa.findUnique({
        where: {id: empresaId}
    })

    if(!result){
        throw new UnauthorizedError("Credenciales incorrectas.")
    }

    await prisma.$transaction( async (tx) => {
        await tx.registroEmail.delete({
            where: {email: result.email}
        }),
        await tx.empresa.update({
            where: { id: empresaId },
            data: { fechaBaja: new Date() }
        }),
        //Dar de baja todos los festivales de la empresa
        await tx.festival.updateMany({
        where: { empresaId },
        data: { activo: false }
        })  
    })
}

export const EmpresaService = {
    getEmpresa,
    getEmpresas,
    getVentasEmpresa,
    updateEmpresa,
    bajaEmpresa
}