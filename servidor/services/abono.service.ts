import type { NewAbonoDto } from "../dtos/abono.dto"
import { prisma } from "../lib/db"
import { NotFoundError, ForbiddenError } from "../lib/errors"

const crearAbono = async (empresaId: number, festivalId: number, data: NewAbonoDto) => {
    const festival = await prisma.festival.findUnique({
        where: { id: festivalId }
    })

    if(!festival){
        throw new NotFoundError("Festival no encontrado.")
    }

    if(festival.empresaId !== empresaId){
        throw new ForbiddenError("No tienes permiso para añadir abonos a este festival.")
    }

    if(!festival.activo){
        throw new ForbiddenError("El festival ha sido cancelado.")
    }

    await prisma.$transaction([
        prisma.abono.create({
            data: {
                festivalId,
                ...data
            }
        }),
        prisma.festival.update({
            where: { id: festivalId },
            data: { aforo: { increment: data.stock } }
        })
    ])

}

export const AbonoService = {
    crearAbono
}