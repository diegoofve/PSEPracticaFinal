import type { NextFunction, Request, Response } from 'express';
import { LoginSchema, RegisterClienteSchema, RegisterEmpresaSchema } from '../dtos/auth.dto';
import { AuthService } from '../services/auth.service';
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

export const AuthController = {
    login,
    registerCliente,
    registerEmpresa,
};