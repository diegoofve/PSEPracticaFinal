import type { NextFunction, Request, Response } from 'express';
import { NewFestivalSchema, UpdateFestivalSchema } from '../dtos/festival.dto';
import { FestivalService } from '../services/festival.service';
import { BadRequestError } from '../lib/errors';
import { logger } from '../lib/logger';
import { validateBody, validateParamsId, validateUserId } from '../lib/util';

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
        const id = validateUserId(req)

        const result = await FestivalService.getFestivalesEmpresa(id)

        logger.info(`Información de todos los festivales de la empresa ${id} devuelta.`)
        res.status(200).json(result)
    }catch(err){
        next(err)
    }
}

const crearFestival = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const data = validateBody(NewFestivalSchema, req)

        if (data.fechaFin <= data.fechaInicio){
            throw new BadRequestError("La fecha de fin debe ser posterior a la de inicio.")
        }       

        const id = validateUserId(req)

        await FestivalService.crearFestival(id, data);

        logger.info("Festival creado exitosamente.")
        res.status(201).json({ result: "Festival creado con éxito." });
    }catch(err){
        next(err)
    }
}

const updateFestival = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const empresaId = validateUserId(req)

        const festivalId = validateParamsId(req)

        const data = validateBody(UpdateFestivalSchema, req)

        await FestivalService.updateFestival(empresaId, festivalId, data)

        logger.info(`Festival ${festivalId} actualizado correctamente.`)
        res.status(200).json({ result: "Festival actualizado correctamente" })
    } catch (err) {
        next(err)
    }
}

const bajaFestival = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const empresaId = validateUserId(req)

        const festivalId = validateParamsId(req)

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
    updateFestival,
    bajaFestival
}