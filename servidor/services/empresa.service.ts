import  { type UpdateEmpresaDto, ListaEmpresaSchema, type EmpresaDto  } from "../dtos/empresa.dto"
import { prisma } from '../lib/db';
import { UnauthorizedError } from "../lib/errors";

const verEmpresa = async (id: number): Promise<EmpresaDto[]> => {
    const result = await prisma.empresa.findMany({
        where: {
            id: id,
            fechaBaja: null
        }
    })

    return ListaEmpresaSchema.parse(result);
}

const verEmpresas = async (): Promise<EmpresaDto[]> => {
    const result = await prisma.empresa.findMany({
        where: {
            fechaBaja: null
        }
    })

    return ListaEmpresaSchema.parse(result);
}

const updateEmpresa = async (empresaId: number, data: UpdateEmpresaDto): Promise<void> => {
    const result = await prisma.empresa.findUnique({
        where: {id: empresaId}
    })

    if(!result){
        throw new UnauthorizedError("Credenciales incorrectas.")
    }

    await prisma.empresa.update({
        where: {id: empresaId},
        data: data
    })
}



const deleteEmpresa = async (empresaId: number): Promise<void> => {
    const result = await prisma.empresa.findUnique({
        where: {id: empresaId}
    })

    if(!result){
        throw new UnauthorizedError("Credenciales incorrectas.")
    }

    await prisma.$transaction([
        prisma.registroEmail.delete({
            where: {email: result.email}
        }),
        prisma.empresa.update({
            where: { id: empresaId },
            data: { fechaBaja: new Date() }
        })
    ])
}

export const EmpresaService = {
    verEmpresa,
    verEmpresas,
    updateEmpresa,
    deleteEmpresa
}