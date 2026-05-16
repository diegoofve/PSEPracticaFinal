import type { NextFunction, Request, Response } from 'express';
import { LoginSchema, RegisterClienteSchema, RegisterEmpresaSchema } from '../dtos/auth.dto';
import { AuthService } from '../services/auth.service';
import { logger } from '../lib/logger';
import { validateBody } from '../lib/util';

const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const data = validateBody(LoginSchema, req)

        const result = await AuthService.login(data);

        logger.info("Login exitoso.")
        res.status(200).json({ token: result })
    }catch(err){
        next(err);
    }
}

const registerCliente = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const data = validateBody(RegisterClienteSchema, req)

        await AuthService.registerCliente(data);

        logger.info("Registro de cliente exitoso.")
        res.status(201).json({ result: "Cliente creado exitosamente." })
    }catch(err){
        next(err);
    }
}

const registerEmpresa = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const data = validateBody(RegisterEmpresaSchema, req)

        await AuthService.registerEmpresa(data);

        logger.info("Registro de empresa exitoso.");
        res.status(201).json({ result: "Empresa creada exitosamente." })
    }catch(err){
        next(err)
    }
}

export const AuthController = {
    login,
    registerCliente,
    registerEmpresa,
};