import type { NextFunction, Request, Response } from 'express';
import { LoginSchema, RegisterClienteSchema, RegisterEmpresaSchema, UpdateClienteSchema, UpdateEmpresaSchema } from '../dtos/auth.dto';
import { AuthService } from '../services/auth.service';
import { isEmptyObject } from '../lib/util';

const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const validation = LoginSchema.safeParse(req.body);

        if(!validation.success){
            res.status(400).json({error: 'Request con datos no válidos'});
            return;
        }

        const result = await AuthService.login(validation.data);
        res.status(200).json({token: result})

    }catch(err){
        next(err);
        console.log(err);
        res.status(500).json({ error: 'Error interno del servidor'} );
    }
}

const registerCliente = async (req: Request, res: Response): Promise<void> => {
    try{
        const validation = RegisterClienteSchema.safeParse(req.body);

        if(!validation.success){
            res.status(400).json({error: 'Request con datos no válidos'})//TODO:err ?
            return;
        }

        await AuthService.registerCliente(validation.data);
        res.status(201).json({})
    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

const registerEmpresa = async (req: Request, res: Response): Promise<void> => {
    try{
        const validation = RegisterEmpresaSchema.safeParse(req.body);

        if(!validation.success){
            res.status(400).json({error: 'Request con datos no válidos'})//TODO:err ?
            return;
        }

        await AuthService.registerEmpresa(validation.data);
        res.status(201).json({})
    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

const updateCliente = async (req: Request, res: Response): Promise<void> => {
    try{
        const validation = UpdateClienteSchema.safeParse(req.body);

        if(!validation.success){
            res.status(400).json({error: 'Request con datos no válidos'})//TODO:err ?
            return;
        }

        if(isEmptyObject(validation.data)){
            res.status(400).json({error: 'Tienes que proporcionar datos a actualizar'})//TODO:err ?
            return;
        }

        const clienteId = (req.user as any).id

        await AuthService.updateCliente(clienteId, validation.data);
        res.status(200).json({ result: "actualizado correctamente "});

    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

const updateEmpresa = async (req: Request, res: Response): Promise<void> => {
    try{
        const validation = UpdateEmpresaSchema.safeParse(req.body);

        if(!validation.success){
            res.status(400).json({error: 'Request con datos no válidos'})//TODO:err ?
            return;
        }

        if(isEmptyObject(validation.data)){
            res.status(400).json({error: 'Tienes que proporcionar datos a actualizar'})//TODO:err ?
            return;
        }

        const empresaId = (req.user as any).id

        await AuthService.updateEmpresa(empresaId, validation.data);
        res.status(200).json({ result: "actualizado correctamente "});

    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

const deleteCliente = async (req: Request, res: Response): Promise<void> => {
    try{
        const clienteId = (req.user as any).id

        await AuthService.deleteCliente(clienteId);
        res.status(204).send();
    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

const deleteEmpresa = async (req: Request, res: Response): Promise<void> => {
    try{
        const empresaId = (req.user as any).id

        await AuthService.deleteCliente(empresaId);
        res.status(204).send();
    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Error interno del servidor' })
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