// admin.service.ts
import { es } from "zod/v4/locales"
import { EstadoEmpresaDto } from "../dtos/admin.dto"
import { prisma } from "../lib/db"
import { NotFoundError, ConflictError, GonePermanentlyError } from "../lib/errors"
import { EstadoGestora } from "@prisma/client"

const cambiarEstadoEmpresa = async (empresaId: number, data: EstadoEmpresaDto) => {
    const empresa = await prisma.empresa.findUnique({ where: { id: empresaId } })
    if (!empresa){
        throw new NotFoundError("Empresa no encontrada")
    }

    if (empresa.fechaBaja){
        throw new GonePermanentlyError("La empresa está dada de baja")
    }

    await prisma.empresa.update({
        where: { id: empresaId },
        data: { estado: data.estado as EstadoGestora }
    })
}

const banearCliente = async (clienteId: number) => {
    const cliente = await prisma.cliente.findUnique({ where: { id: clienteId } })
    if (!cliente){
        throw new NotFoundError("Cliente no encontrado")
    }

    await prisma.registroEmail.update({
        where: { email: cliente.email },
        data: { baneado: true }
    })
}

const banearEmpresa = async (empresaId: number) => {
    const empresa = await prisma.empresa.findUnique({ where: { id: empresaId } })
    if (!empresa){
        throw new NotFoundError("Empresa no encontrada")
    }

    await prisma.registroEmail.update({
        where: { email: empresa.email },
        data: { baneado: true }
    })
}

export const AdminService = {
    cambiarEstadoEmpresa,
    banearCliente,
    banearEmpresa
}