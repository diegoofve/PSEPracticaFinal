import { ListaFestivalSchema, NewAbonoDto, UpdateFestivalDto, type FestivalDto, type NewFestivalDto } from "../dtos/festival.dto"
import {prisma} from "../lib/db";
import { ConflictError, ForbiddenError, NotFoundError } from "../lib/errors";

const getFestivales = async (): Promise<FestivalDto[]> => {
    const result = await prisma.festival.findMany({
        where: { activo: true },
        include: { abonos: true }
    })

    return ListaFestivalSchema.parse(result);
}

const getFestivalesEmpresa = async (empresaId: number): Promise<FestivalDto[]> => {
    const result = await prisma.festival.findMany({
        where: { activo: true, empresaId:empresaId },
        include: { abonos: true }
    })

    return ListaFestivalSchema.parse(result);
}

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

const updateFestival = async (empresaId: number, festivalId: number, data: UpdateFestivalDto) => {
    const festival = await prisma.festival.findUnique({
        where: { id: festivalId }
    })

    if(!festival){
        throw new NotFoundError("Festival no encontrado.")
    }

    if(festival.empresaId !== empresaId){
        throw new ForbiddenError("No tienes permiso para editar este festival.")
    }

    if(!festival.activo){
        throw new ForbiddenError("El festival ha sido cancelado.")
    }

    await prisma.festival.update({
        where: { id: festivalId },
        data: data  
    })
}

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

    return await prisma.abono.create({
        data: {
            festivalId,
            ...data
        }
    })
}

const bajaFestival = async (empresaId: number, festivalId: number) => {
    const festival = await prisma.festival.findUnique({
        where: { id: festivalId }
    })

    if(!festival){
        throw new NotFoundError("Festival no encontrado.")
    }

    if(festival.empresaId !== empresaId){
        throw new ForbiddenError("No tienes permiso para cancelar este festival.")
    }

    if(!festival.activo){
        throw new ConflictError("El festival ya está cancelado.")
    }

    await prisma.festival.update({
        where: { id: festivalId },
        data: { activo: false }
    })
}

export const FestivalService = {
    getFestivales,
    getFestivalesEmpresa,
    crearFestival,
    crearAbono,
    updateFestival,
    bajaFestival
}