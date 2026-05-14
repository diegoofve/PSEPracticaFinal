import type { Request, Response } from 'express';
import { BuyTicketDto } from '../dtos/payment.dto';
import { PaymentService } from '../services/payment.service';

const makePayment = async (req: Request, res: Response) => {
    try{
        const validation = BuyTicketDto.safeParse(req.body)

        if(!validation.success){
            res.status(400).json({error: 'Request con datos no válidos'});
            return;
        }
        const clienteId = (req as any).user?.id; 

        if (!clienteId) {
            res.status(401).json({ error: 'No estás autorizado para realizar esta compra' });
            return;
        }
        const { festivalId, abonoId, cardHolder, cardNumber, expiryDate, cvv } = validation.data;

        const decodedCardNumber = Buffer.from(cardNumber, 'base64').toString('utf-8');
        const decodedExpiryDate = Buffer.from(expiryDate, 'base64').toString('utf-8');
        const decodedCvv = Buffer.from(cvv, 'base64').toString('utf-8');

        const transaccion = await PaymentService.makePayment({
            // hay que corregirlo clienteId,
            festivalId,
            abonoId,
            cardHolder,
            cardNumber: decodedCardNumber,
            expiryDate: decodedExpiryDate,
            cvv: decodedCvv
        });

        res.status(200);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Error interno del servidor'});
    }
}

export const PaymentController = {
    makePayment
}