import type { NextFunction, Request, Response } from 'express';
import { BuyTicketSchema } from '../dtos/payment.dto';
import { PaymentService } from '../services/payment.service';
import { logger } from '../lib/logger';
import { validateBody, validateUserId } from '../lib/util';

const makePayment = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const data = validateBody(BuyTicketSchema, req)

        const id = validateUserId(req)

        const {  abonoId, cardHolder, cardNumber, expiryDate, cvv } = data;

        const decodedCardNumber = Buffer.from(cardNumber, 'base64').toString('utf-8');
        const decodedExpiryDate = Buffer.from(expiryDate, 'base64').toString('utf-8');
        const decodedCvv = Buffer.from(cvv, 'base64').toString('utf-8');

        await PaymentService.makePayment(id, {
            abonoId,
            cardHolder,
            cardNumber: decodedCardNumber,
            expiryDate: decodedExpiryDate,
            cvv: decodedCvv
        });

        logger.info("Pago realizado con éxito.")
        res.status(200).json({result: "Pago realizado con exito."});
    }catch(err){
        next(err);
    }
}

export const PaymentController = {
    makePayment
}