import type { NextFunction, Request, Response } from 'express';
import { UpdateEmpresaSchema } from '../dtos/empresa.dto';
import { isEmptyObject } from '../lib/util';
import { BadRequestError, ForbiddenError } from '../lib/errors';
import 'passport' //para req.user
import { logger } from '../lib/logger';
import { EmpresaService } from '../services/empresa.service';

const ERRORES_GENERICOS = ['unrecognized_keys', 'invalid_type'] //contiene los errores de zod que no queremos mostar por seguridad(faltan campos, tipo erroneo)

const getEmpresa = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const idString = (req.params.id) as any

        if (!idString) {
            throw new BadRequestError("No se ha detectado ningun parámetro.")
            return;
        }

        const id = Number(idString)

        if(Number.isNaN(id)){
            throw new BadRequestError("El parámetro debe ser un número.")
        }

        if(id <= 0){
            throw new BadRequestError("El parámetro debe ser un número positivo.")
            return;
        }

        const result = await EmpresaService.getEmpresa(id)
        logger.info(`Informacion de la empresa ${id} ha sido devuelta`)
        res.status(200).json(result)

    }catch(err){
        next(err)
    }
}

const getEmpresas = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const result = await EmpresaService.getEmpresas()
        logger.info("Informacion del cliente(s) ha sido devuelta")
        res.status(200).json(result)

    }catch(err){
        next(err)
    }
}

const updateEmpresa = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const validation = UpdateEmpresaSchema.safeParse(req.body);

        if (!validation.success) {
            const issue = validation.error.issues[0]
            const mensaje = ERRORES_GENERICOS.includes(issue.code)
                ? 'Request no válida'
                : issue.message
            throw new BadRequestError(mensaje)
            return;
        }

        if(isEmptyObject(validation.data)){
            throw new BadRequestError("Debes proporcionar datos a actualizar.")
            return;
        }

        const empresaId = (req.user as any).id
        if (!empresaId || isNaN(empresaId) || empresaId <= 0) {
            throw new ForbiddenError("Acceso no autorizado.")
            return
        }

        await EmpresaService.updateEmpresa(empresaId, validation.data);
        logger.info("Update de empresa exitosa.")
        res.status(200).json({ result: "actualizado correctamente "});

    }catch(err){
        next(err)
    }
}

const bajaEmpresa = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const empresaId = (req.user as any).id
        if (!empresaId || isNaN(empresaId) || empresaId <= 0) {
            throw new ForbiddenError("Acceso no autorizado.")
            return
        }

        await EmpresaService.bajaEmpresa(empresaId);
        logger.info("Empresa dada de baja exitosamente.")
        res.status(204).send();
    }catch(err){
        next(err)
    }
}

export const EmpresaController = {
    getEmpresa,
    getEmpresas,
    updateEmpresa,
    bajaEmpresa
}