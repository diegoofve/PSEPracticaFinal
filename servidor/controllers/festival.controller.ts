import type { NextFunction, Request, Response } from 'express';
import { NewFestivalSchema } from '../dtos/festival.dto';
import { FestivalService } from '../services/festival.service';
import 'passport' //para req.user
import { BadRequestError } from '../lib/errors';
import { logger } from '../lib/logger';

const ERRORES_GENERICOS = ['unrecognized_keys', 'invalid_type'] //contiene los errores de zod que no queremos mostar por seguridad(faltan campos, tipo erroneo)

const crearFestival = async (req: Request, res: Response, next: NextFunction) => {
    try{
        console.log(req.body)
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

        const user = (req.user) as any;
        const empresaId = user.id;

        await FestivalService.crearFestival(empresaId, validation.data);
        logger.info("Festival creado exitosamente.")
        res.status(201).json({});

    }catch(err){
        next(err)
    }
}

export const FestivalController = {
    crearFestival
}