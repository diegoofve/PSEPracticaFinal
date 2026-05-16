import type { Request, Response, NextFunction } from "express"
import { UpdateClienteSchema } from '../dtos/clientes.dto';
import { isEmptyObject, validateBody, validateUserId } from '../lib/util';
import { BadRequestError } from '../lib/errors';
import { logger } from '../lib/logger';
import { ClienteService } from "../services/cliente.service";

const getCliente = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const id = validateUserId(req)

        const result = await ClienteService.getCliente(id)

        logger.info(`Informacion del cliente ${id} ha sido devuelta.`)
        res.status(200).json(result)
    }catch(err){
        next(err)
    }
}

const getClientes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const result = await ClienteService.getClientes()

        logger.info("Informacion del cliente(s) ha sido devuelta.")
        res.status(200).json(result)
    }catch(err){
        next(err)
    }
}

const getAbonosCliente = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const id = validateUserId(req)

        const result = await ClienteService.getAbonosCliente(id);
        
        logger.info("Abonos del cliente devueltos correctamente.")
        res.status(200).json(result)
    }catch(err){
        next(err)
    }
}

const updateCliente = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const data = validateBody(UpdateClienteSchema, req)

        if(isEmptyObject(data)){
            throw new BadRequestError("Debes proporcionar datos a actualizar.")
        }

        const id = validateUserId(req)

        await ClienteService.updateCliente(id, data);

        logger.info("Update de cliente exitosa.")
        res.status(200).json({ result: "actualizado correctamente "});
    }catch(err){
        next(err)
    }
}

const bajaCliente = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const id = validateUserId(req)

        await ClienteService.bajaCliente(id);

        logger.info("Cliente dado de baja exitosamente.")
        res.status(204).send();
    }catch(err){
        next(err)
    }
}

export const ClienteController = {
    getCliente,
    getClientes,
    getAbonosCliente,
    updateCliente,
    bajaCliente
}