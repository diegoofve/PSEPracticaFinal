import type { NextFunction, Request, Response } from 'express';
import { UpdateEmpresaSchema } from '../dtos/empresa.dto';
import { isEmptyObject, validateBody, validateUserId } from '../lib/util';
import { BadRequestError } from '../lib/errors';
import { logger } from '../lib/logger';
import { EmpresaService } from '../services/empresa.service';

const getEmpresa = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const id = validateUserId(req)

        const result = await EmpresaService.getEmpresa(id)

        logger.info(`Informacion de la empresa ${id} ha sido devuelta.`)
        res.status(200).json(result)
    }catch(err){
        next(err)
    }
}

const getEmpresas = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const result = await EmpresaService.getEmpresas()
        
        logger.info("Informacion del cliente(s) ha sido devuelta.")
        res.status(200).json(result)
    }catch(err){
        next(err)
    }
}

const getVentasEmpresa = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const id = validateUserId(req)

        const result = await EmpresaService.getVentasEmpresa(id)

        logger.info("Ventas de la empresa devueltas correctamente.")
        res.status(200).json(result)
    }catch(err){
        next(err)
    }
}

const updateEmpresa = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const data = validateBody(UpdateEmpresaSchema, req)

        if(isEmptyObject(data)){
            throw new BadRequestError("Debes proporcionar datos a actualizar.")
            return;
        }

        const id = validateUserId(req)

        await EmpresaService.updateEmpresa(id, data);

        logger.info("Update de empresa exitosa.")
        res.status(200).json({ result: "actualizado correctamente "});
    }catch(err){
        next(err)
    }
}

const bajaEmpresa = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const id = validateUserId(req)

        await EmpresaService.bajaEmpresa(id);

        logger.info("Empresa dada de baja exitosamente.")
        res.status(204).send();
    }catch(err){
        next(err)
    }
}

export const EmpresaController = {
    getEmpresa,
    getEmpresas,
    getVentasEmpresa,
    updateEmpresa,
    bajaEmpresa
}