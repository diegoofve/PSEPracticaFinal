import { EstadoEmpresaDto } from "../dtos/admin.dto"
import { prisma } from "../lib/db"
import { NotFoundError, GonePermanentlyError } from "../lib/errors"
import { EstadoGestora } from "@prisma/client"

const cambiarEstadoEmpresa = async (empresaId: number, data: EstadoEmpresaDto) => {
    const empresa = await prisma.empresa.findUnique({ where: { id: empresaId } })
    if (!empresa){
        throw new NotFoundError("Empresa no encontrada")
    }

    if (empresa.fechaBaja){
        throw new GonePermanentlyError("La empresa está dada de baja")
    }

    const consultas: any = [
        prisma.empresa.update({
            where: { id: empresaId },
            data: { estado: data.estado as EstadoGestora }
        })
    ]

    if(data.estado === "RESTRINGIDA"){
        consultas.push(
            prisma.registroEmail.update({
                where: { email: empresa.email },
                data: { baneado: true}
            })
        )  
        consultas.push(
            prisma.empresa.update({
                where: { id: empresaId },
                data: { fechaBaja: new Date() }
            })
        )
    }

    await prisma.$transaction(consultas)
}

const banearCliente = async (clienteId: number) => {
    const cliente = await prisma.cliente.findUnique({ where: { id: clienteId } })
    if (!cliente){
        throw new NotFoundError("Cliente no encontrado.")
    }

    if(cliente.fechaBaja != null){
        throw new GonePermanentlyError("El cliente se ha dado de baja.")
    }

    await prisma.$transaction([
        prisma.registroEmail.update({
            where: { email: cliente.email },
            data: { baneado: true }
        }),
        prisma.cliente.update({
            where : { id: clienteId},
            data: { fechaBaja: new Date() }
        })
    ])
}

const banearEmpresa = async (empresaId: number) => {
    const empresa = await prisma.empresa.findUnique({ where: { id: empresaId } })
    if (!empresa){
        throw new NotFoundError("Empresa no encontrada.")
    }

    if(empresa.fechaBaja != null){
        throw new GonePermanentlyError("La empresa se ha dado de baja.")
    }

    await prisma.$transaction([prisma.registroEmail.update({
            where: { email: empresa.email },
            data: { baneado: true }
        }),
        prisma.empresa.update({
            where: { id: empresaId },
            data: { fechaBaja: new Date() }
        })
    ])
}

export const AdminService = {
    cambiarEstadoEmpresa,
    banearCliente,
    banearEmpresa
}