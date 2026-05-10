import type { Request, Response } from 'express';
import { LoginSchema, RegisterClienteSchema, RegisterEmpresaSchema, type RegisterClienteDto, type RegisterEmpresaDto } from '../dtos/auth.dto';
import { AuthService } from '../services/auth.service';

const login = async (req: Request, res: Response): Promise<void> => {
    try{
        const validation = LoginSchema.safeParse(req.body);

        if(!validation.success){
            res.status(400).json({error: 'Request con datos no válidos'});
            return;
        }

        const result = await AuthService.login(validation.data);
        res.status(200).json(result)

    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Error interno del servidor'} );
    }
}

const register = async (req: Request, res: Response): Promise<void> => {
    try{
        const clienteValidation = RegisterClienteSchema.safeParse(req.body);
        const empresaValidation = RegisterEmpresaSchema.safeParse(req.body);

        if(!clienteValidation.success && !empresaValidation.success){
            res.status(400).json({error: 'Request con datos no válidos'});
            return;
        }

        if(clienteValidation.success){
            await AuthService.registerCliente(clienteValidation.data);
            res.status(201).json({result: ''});
        }

        if(empresaValidation.success){
            await AuthService.registerEmpresa(empresaValidation.data);
        }

    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

export const AuthController = {
    login,
    register
};