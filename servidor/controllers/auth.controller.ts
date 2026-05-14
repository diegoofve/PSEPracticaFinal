import type { NextFunction, Request, Response } from 'express';
import { LoginSchema, RegisterClienteSchema, RegisterEmpresaSchema, UpdateClienteSchema, UpdateEmpresaSchema } from '../dtos/auth.dto';
import { AuthService } from '../services/auth.service';
import { isEmptyObject } from '../lib/util';
import { BadRequestError } from '../lib/errors';
import 'passport' //para req.user
import { logger } from '../lib/logger';

const ERRORES_GENERICOS = ['unrecognized_keys', 'invalid_type'] //contiene los errores de zod que no queremos mostar por seguridad(faltan campos, tipo erroneo)

const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const validation = LoginSchema.safeParse(req.body);

        if (!validation.success) {
            const issue = validation.error.issues[0]
            const mensaje = ERRORES_GENERICOS.includes(issue.code)
                ? 'Request no válida'
                : issue.message
            throw new BadRequestError(mensaje)
            return;
        }

        const result = await AuthService.login(validation.data);
        logger.info("Login exitoso.")
        res.status(200).json({token: result})

    }catch(err){
        next(err);
    }
}

const registerCliente = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const validation = RegisterClienteSchema.safeParse(req.body);

        if (!validation.success) {
            const issue = validation.error.issues[0]
            const mensaje = ERRORES_GENERICOS.includes(issue.code)
                ? 'Request no válida'
                : issue.message
            throw new BadRequestError(mensaje)
            return;
        }

        await AuthService.registerCliente(validation.data);
        logger.info("Registro de cliente exitoso.")
        res.status(201).json({})
    }catch(err){
        next(err);
    }
}

const registerEmpresa = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const validation = RegisterEmpresaSchema.safeParse(req.body);

        if (!validation.success) {
            const issue = validation.error.issues[0]
            const mensaje = ERRORES_GENERICOS.includes(issue.code)
                ? 'Request no válida'
                : issue.message
            throw new BadRequestError(mensaje)
            return;
        }

        await AuthService.registerEmpresa(validation.data);
        logger.info("Registro de empresa exitoso.");
        res.status(201).json({})
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

        await AuthService.updateCliente(clienteId, validation.data);
        logger.info("Update de cliente exitosa.")
        res.status(200).json({ result: "actualizado correctamente "});

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

        await AuthService.updateEmpresa(empresaId, validation.data);
        logger.info("Update de empresa exitosa.")
        res.status(200).json({ result: "actualizado correctamente "});

    }catch(err){
        next(err)
    }
}

const deleteCliente = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const clienteId = (req.user as any).id

        await AuthService.deleteCliente(clienteId);
        logger.info("Cliente dado de baja exitosamente.")
        res.status(204).send();
    }catch(err){
        next(err)
    }
}

const deleteEmpresa = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const empresaId = (req.user as any).id

        await AuthService.deleteCliente(empresaId);
        logger.info("Empresa dada de baja exitosamente.")
        res.status(204).send();
    }catch(err){
        next(err)
    }
}

export const AuthController = {
    login,
    registerCliente,
    registerEmpresa,
    updateCliente,
    updateEmpresa,
    deleteCliente,
    deleteEmpresa
};