import { type UpdateClienteDto, type ClienteDto, ListaClienteSchema } from "../dtos/clientes.dto"
import { prisma } from '../lib/db';
import { UnauthorizedError } from "../lib/errors";

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

export const ClienteService = {
    getCliente,
    getClientes,
    updateCliente,
    bajaCliente
}