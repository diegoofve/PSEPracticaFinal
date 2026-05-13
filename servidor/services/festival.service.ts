import type { NewFestivalDto } from "../dtos/festival.dto"
import {prisma} from "../lib/db";

const crearFestival = async (empresaId: number, data: NewFestivalDto) => {
    const empresa = await prisma.empresa.findUnique({
        where: { id: empresaId }
    })

    if (!empresa){
        throw new Error("Empresa no encontrada")//TODO:err
    }

    if (empresa.estado !== "VERIFICADA"){
        //throw new Error("La empresa no está verificada")//TODO:err
    }

    if (data.fechaFin <= data.fechaInicio){
        throw new Error("La fecha de fin debe ser posterior a la de inicio")//TODO:err
    }

    if (data.fechaInicio <= new Date){
        throw new Error("La fecha de inicio no puede ser pasada")//TODO:err
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