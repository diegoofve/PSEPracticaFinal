import type { Request, Response, NextFunction } from "express"
import { UpdateClienteSchema } from '../dtos/clientes.dto';
import { isEmptyObject } from '../lib/util';
import { BadRequestError } from '../lib/errors';
import 'passport' //para req.user
import { logger } from '../lib/logger';
import { ClienteService } from "../services/cliente.service";

const ERRORES_GENERICOS = ['unrecognized_keys', 'invalid_type'] //contiene los errores de zod que no queremos mostar por seguridad(faltan campos, tipo erroneo)

const verCliente = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

        const result = await ClienteService.verCliente(id)
        logger.info(`Informacion del cliente ${id} ha sido devuelta`)
        res.status(200).json(result)

    }catch(err){
        next(err)
    }
}

const verClientes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const result = await ClienteService.verClientes()
        logger.info("Informacion del cliente(s) ha sido devuelta")
        res.status(200).json(result)

    }catch(err){
        next(err)
    }
}

const updateCliente = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const validation = UpdateClienteSchema.safeParse(req.body);

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

        const clienteId = (req.user as any).id

        await ClienteService.updateCliente(clienteId, validation.data);
        logger.info("Update de cliente exitosa.")
        res.status(200).json({ result: "actualizado correctamente "});

    }catch(err){
        next(err)
    }
}

const deleteCliente = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const clienteId = (req.user as any).id

        await ClienteService.deleteCliente(clienteId);
        logger.info("Cliente dado de baja exitosamente.")
        res.status(204).send();
    }catch(err){
        next(err)
    }
}

export const ClienteController = {
    verCliente,
    verClientes,
    updateCliente,
    deleteCliente
}