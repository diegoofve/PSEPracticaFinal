import { type UpdateClienteDto, type ClienteDto, ListaClienteSchema } from "../dtos/clientes.dto"
import { prisma } from '../lib/db';
import { UnauthorizedError } from "../lib/errors";

const verCliente = async (id: number): Promise<ClienteDto[]> => {
    const result = await prisma.cliente.findMany({
        where: {
            id: id,
            fechaBaja: null
        }
    })

    return ListaClienteSchema.parse(result);
}

const verClientes = async (): Promise<ClienteDto[]> => {
    const result = await prisma.cliente.findMany({
        where: {
            fechaBaja: null
        }
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

    await prisma.cliente.update({
        where: {id: clienteId},
        data: data
    })
}

const deleteCliente = async (clienteId: number): Promise<void> => {
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

export const ClienteService = {
    verCliente,
    verClientes,
    updateCliente,
    deleteCliente
}