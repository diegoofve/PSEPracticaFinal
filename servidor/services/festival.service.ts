import { FestivalSchema, ListaFestivalSchema, UpdateFestivalDto, type FestivalDto, type NewFestivalDto } from "../dtos/festival.dto"
import {prisma} from "../lib/db";
import { BadRequestError, ConflictError, ForbiddenError, NotFoundError } from "../lib/errors";

const getFestivales = async (): Promise<FestivalDto[]> => {
    const result = await prisma.festival.findMany({
        where: { activo: true },
        include: { abonos: true }
    })

    return ListaFestivalSchema.parse(result);
}

const getFestival = async (id: number): Promise<FestivalDto> => {
    const result = await prisma.festival.findUnique({
        where: { id },
        include: { abonos: true }
    })

    if(!result){
        throw new NotFoundError("No se ha encontrado el festival.")
    }

    return FestivalSchema.parse(result)
}

const getFestivalesEmpresa = async (empresaId: number): Promise<FestivalDto[]> => {
    const result = await prisma.festival.findMany({
        where: { empresaId:empresaId },
        include: { abonos: true },  
        orderBy: { fechaInicio: "asc" }
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

    if (data.cantidad > data.aforo){
        throw new BadRequestError("No puedes vender mas entradas que el aforo que tiene el festival.")
    }

    const { precioAbono, ...datosFestival } = data;
    const festival = await prisma.festival.create({
        data: {
            empresaId,
            ...datosFestival,
            abonos: {
                create: {
                    nombre: "Abono General",
                    descripcion: "Abono general para la entrada al festival",
                    precio: data.precioAbono,
                    stock: data.cantidad
                }
            }
        },
        include: {abonos: true}
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


    const fechaIni = data.fechaInicio ? data.fechaInicio : festival.fechaInicio
    const fechaFin = data.fechaFin ? data.fechaFin : festival.fechaFin
    if(fechaIni <= fechaFin) {
        throw new BadRequestError("La fecha de fin no puede ser mayor que la de inicio.")
    }

    const empresa = await prisma.empresa.findUnique({
        where: { id: empresaId }
    })

    if(empresa?.estado === "PENDIENTE") {
        throw new ForbiddenError("La empresa tiene que estar verificada para editar festival.")
    }

    await prisma.festival.update({
        where: { id: festivalId },
        data: data  
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

    const tresDiasAntes = new Date()
    tresDiasAntes.setDate(tresDiasAntes.getDate() + 3)
    if(festival.fechaInicio <= tresDiasAntes){
        throw new ForbiddenError("No puedes cancelar festivales con menos de 3 dias de antelacion.")
    }

    const empresa = await prisma.empresa.findUnique({
        where: { id: empresaId }
    })

    if(empresa?.estado === "PENDIENTE") {
        throw new ForbiddenError("La empresa tiene que estar verificada para borrar festivales.")
    }

    await prisma.festival.update({
        where: { id: festivalId },
        data: { activo: false }
    })
}

export const FestivalService = {
    getFestivales,
    getFestivalesEmpresa,
    getFestival,
    crearFestival,
    updateFestival,
    bajaFestival
}