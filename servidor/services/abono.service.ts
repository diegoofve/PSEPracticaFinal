import type { NewAbonoDto } from "../dtos/abono.dto"
import { prisma } from "../lib/db"
import { NotFoundError, ForbiddenError, BadRequestError } from "../lib/errors"

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

    const empresa = await prisma.empresa.findUnique({
        where: { id: empresaId }
    })

    if(empresa?.estado === "PENDIENTE"){
        throw new ForbiddenError("Tienes que estar verificado para crear abonos.")
    }

    const otrosAbonos = await prisma.abono.findMany({
        where: { festivalId: festival.id}
    })

    const stockVendido = otrosAbonos.reduce((acc, abono) => acc + Number(abono.stock), 0)
    const aforoRestante = festival.aforo - stockVendido

    if (data.stock > aforoRestante) {
        throw new BadRequestError("No puedes vender mas entradas que el aforo que tiene el festival.")
    }

    await prisma.abono.create({
        data: {
            festivalId,
            ...data
        }
    })

}

export const AbonoService = {
    crearAbono
}