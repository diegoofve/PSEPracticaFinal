import type { NextFunction, Request, Response } from 'express';
import { NewAbonoSchema, NewFestivalSchema, UpdateFestivalSchema } from '../dtos/festival.dto';
import { FestivalService } from '../services/festival.service';
import 'passport' //para req.user
import { BadRequestError, ForbiddenError } from '../lib/errors';
import { logger } from '../lib/logger';
import { log } from 'node:console';

const ERRORES_GENERICOS = ['unrecognized_keys', 'invalid_type'] //contiene los errores de zod que no queremos mostar por seguridad(faltan campos, tipo erroneo)

const getFestivales = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const result = await FestivalService.getFestivales()
        logger.info("Información de todos los festivales devuelta.")
        res.status(200).json(result)
    }catch(err){
        next(err)
    }
}

const getFestivalesEmpresa = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const empresaId = (req.user as any).id;

        //nunca deberia pasar porque el jwt inyecta el id
        if (!empresaId || isNaN(empresaId) || empresaId <= 0) {
            throw new ForbiddenError("Acceso no autorizado.")
            return
        }

        const result = await FestivalService.getFestivalesEmpresa(empresaId)
        logger.info(`Información de todos los festivales de la empresa ${empresaId  } devuelta.`)
        res.status(200).json(result)
    }catch(err){
        next(err)
    }
}

const crearFestival = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const validation = NewFestivalSchema.safeParse(req.body);

        if (!validation.success) {
            const issue = validation.error.issues[0]
            const mensaje = ERRORES_GENERICOS.includes(issue.code)
                ? 'Request no válida'
                : issue.message
            throw new BadRequestError(mensaje)
            return;
        }

        if (validation.data.fechaFin <= validation.data.fechaInicio){
            throw new BadRequestError("La fecha de fin debe ser posterior a la de inicio")
            return;
        }       

        const empresaId = (req.user as any).id;

        //nunca deberia pasar porque el jwt inyecta el id
        if (!empresaId || isNaN(empresaId) || empresaId <= 0) {
            throw new ForbiddenError("Acceso no autorizado.")
            return
        }

        await FestivalService.crearFestival(empresaId, validation.data);
        logger.info("Festival creado exitosamente.")
        res.status(201).json({});

    }catch(err){
        next(err)
    }
}

const updateFestival = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const empresaId = (req.user as any).id;
        if (!empresaId || isNaN(empresaId) || empresaId <= 0) {
            throw new ForbiddenError("Acceso no autorizado.")
            return
        }

        const idString = (req.params.id) as any

        if (!idString) {
            throw new BadRequestError("No se ha detectado ningun parámetro.")
            return;
        }

        const festivalId = Number(idString)

        if(Number.isNaN(festivalId)){
            throw new BadRequestError("El parámetro debe ser un número.")
            return
        }

        if(festivalId <= 0){
            throw new BadRequestError("El parámetro debe ser un número positivo.")
            return;
        }

        const validation = UpdateFestivalSchema.safeParse(req.body)
        
        if (!validation.success) {
            const issue = validation.error.issues[0]
            const mensaje = ERRORES_GENERICOS.includes(issue.code)
                ? 'Request no válida'
                : issue.message
            throw new BadRequestError(mensaje)
            return;
        }

        await FestivalService.updateFestival(empresaId, festivalId, validation.data)
        logger.info(`Festival ${festivalId} actualizado correctamente.`)
        res.status(200).json({ result: "Festival actualizado correctamente" })
    } catch (err) {
        next(err)
    }
}

const crearAbono = async (req: Request, res: Response, next: NextFunction) => {
    const empresaId = (req.user as any).id;
    if (!empresaId || isNaN(empresaId) || empresaId <= 0) {
        throw new ForbiddenError("Acceso no autorizado.")
        return
    }

    const idString = (req.params.id) as any

    if (!idString) {
        throw new BadRequestError("No se ha detectado ningun parámetro.")
        return;
    }

    const festivalId = Number(idString)

    if(Number.isNaN(festivalId)){
        throw new BadRequestError("El parámetro debe ser un número.")
        return
    }

    if(festivalId <= 0){
        throw new BadRequestError("El parámetro debe ser un número positivo.")
        return;
    }
    
    const validation = NewAbonoSchema.safeParse(req.body)
        
    if (!validation.success) {
        const issue = validation.error.issues[0]
        const mensaje = ERRORES_GENERICOS.includes(issue.code)
            ? 'Request no válida'
            : issue.message
        throw new BadRequestError(mensaje)
        return;
    }

    await FestivalService.crearAbono(empresaId, festivalId, validation.data)
    logger.info("abono creado correctamente")
    res.status(201).json({result: "creado correctamente"})
}

const bajaFestival = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const empresaId = (req.user as any).id;
        if (!empresaId || isNaN(empresaId) || empresaId <= 0) {
            throw new ForbiddenError("Acceso no autorizado.")
            return
        }

        const idString = (req.params.id) as any

        if (!idString) {
            throw new BadRequestError("No se ha detectado ningun parámetro.")
            return;
        }

        const festivalId = Number(idString)

        if(Number.isNaN(festivalId)){
            throw new BadRequestError("El parámetro debe ser un número.")
            return
        }

        if(festivalId <= 0){
            throw new BadRequestError("El parámetro debe ser un número positivo.")
            return;
        }

        await FestivalService.bajaFestival(empresaId, festivalId)
        logger.info(`Festival ${festivalId} cancelado.`)
        res.status(200).json({ result: "Festival cancelado correctamente" })
    } catch (err) {
        next(err)
    }
}

export const FestivalController = {
    getFestivales,
    getFestivalesEmpresa,
    crearFestival,
    crearAbono,
    updateFestival,
    bajaFestival
}