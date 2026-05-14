import type { NewFestivalDto } from "../dtos/festival.dto"
import {prisma} from "../lib/db";
import { ForbiddenError, NotFoundError } from "../lib/errors";

const crearFestival = async (empresaId: number, data: NewFestivalDto) => {
    const empresa = await prisma.empresa.findUnique({
        where: { id: empresaId }
    })

    if (!empresa){
        throw new NotFoundError("Empresa no encontrada.")
    }

    if (empresa.estado !== "VERIFICADA"){
        throw new ForbiddenError("La empresa no está verificada.")
    }

    const festival = await prisma.festival.create({
        data: {
            empresaId,
            ...data
        }
    })

    return festival
}

export const FestivalService = {
    crearFestival
}