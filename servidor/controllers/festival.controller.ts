import type { Request, Response } from 'express';
import { NewFestivalSchema } from '../dtos/festival.dto';
import { FestivalService } from '../services/festival.service';
import 'passport' //para req.user

const crearFestival = async (req: Request, res: Response) => {
    try{
        const validation = NewFestivalSchema.safeParse(req.body);

        if(!validation.success){
            res.status(400).json({error: 'Request con datos no válidos'});
            return;
        }

        const { empresaId: empresaIdReq, ...festivalData } = validation.data

        const user = (req.user) as any;
        const empresaId = user.rol === "ADMIN" ? empresaIdReq : user.id;

        await FestivalService.crearFestival(empresaId, festivalData);
        res.status(201).json({});

    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Error interno del servidor'} );
    }
}

export const FestivalController = {
    crearFestival
}