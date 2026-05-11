import type { Request, Response } from 'express';
import { BuySchema } from '../dtos/payment.dto';
import { PaymentService } from '../services/payment.service';

const makePayment = async (req: Request, res: Response) => {
    try{
        const validation = BuySchema.safeParse(req.body)

        if(!validation.success){
            res.status(400).json({error: 'Request con datos no válidos'});
            return;
        }

        await PaymentService.makePayment(validation.data);
        res.status(200);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Error interno del servidor'});
    }
}

export const PaymentController = {
    makePayment
}