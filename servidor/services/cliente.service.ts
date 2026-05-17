import { type UpdateClienteDto, type ClienteDto, ListaClienteSchema } from "../dtos/clientes.dto"
import { prisma } from '../lib/db';
import { NotFoundError, UnauthorizedError } from "../lib/errors";
import bcrypt from "bcryptjs";

const getCliente = async (id: number): Promise<ClienteDto[]> => {
    const result = await prisma.cliente.findMany({
        where: {
            id: id,
            fechaBaja: null
        }
    })

    return ListaClienteSchema.parse(result);
}

const getClientes = async (): Promise<ClienteDto[]> => {
    const result = await prisma.cliente.findMany({
        where: {
            fechaBaja: null
        },
        orderBy: { creadoEn: "asc" }
    })

    return ListaClienteSchema.parse(result);
}

const updateCliente = async (clienteId: number, data: UpdateClienteDto): Promise<void> => {
    const result = await prisma.cliente.findUnique({
        where: {id: clienteId}
    })

    if(!result){
        throw new UnauthorizedError("Credenciales incorrectas.");
    }

    const { password, ...datos } = data
    const datosUpdate: any = datos

    if(password){
        datosUpdate.password = await bcrypt.hash(password, 10)
    }

    await prisma.cliente.update({
        where: {id: clienteId},
        data: datosUpdate
    })
}

const bajaCliente = async (clienteId: number): Promise<void> => {
    const result = await prisma.cliente.findUnique({
        where: {id: clienteId}
    })

    if(!result){
        throw new UnauthorizedError("Credenciales incorrectas.")
    }

    await prisma.$transaction([
        prisma.registroEmail.delete({
            where: {email: result.email}
        }),
        prisma.cliente.update({
            where: { id: clienteId },
            data: { fechaBaja: new Date() }
        })
    ])
}

const getAbonosCliente = async (clienteId: number) => {
    const cliente = await prisma.cliente.findUnique({
        where: { id: clienteId }
    });

    if (!cliente) {
        throw new NotFoundError("Cliente no encontrado.");
    }

    const compras = await prisma.venta.findMany({
        where: { 
            clienteId: clienteId,
            estado: "PAGADA" 
        },
        include: {      //conectamos mediante las relaciones de la BD las ventas
            ventasAbonos: { //con las ventas de abonos, estas con los abonos y
                include: {  //los abonos con los festivales para poder ver luego de cual es cada abono
                    abono: {
                        include: {
                            festival: true
                        }
                    }
                }
            }
        },
        orderBy: { creadoEn: "desc" }
    })

    //aplano la respuesta porque si no es un monstruo de json
    return compras.map(compra => ({
        id: compra.id,
        total: compra.total,
        estado: compra.estado,
        fechaCompra: compra.creadoEn,
        abonos: compra.ventasAbonos.map(ventaAbono => ({
            nombre: ventaAbono.abono.nombre,
            festival: ventaAbono.abono.festival.nombre,
            activo: ventaAbono.abono.festival.activo,
            cantidad: ventaAbono.cantidad,
            precioUnit: ventaAbono.precioUnit
        }))
    }))
}

export const ClienteService = {
    getCliente,
    getClientes,
    getAbonosCliente,
    updateCliente,
    bajaCliente
}