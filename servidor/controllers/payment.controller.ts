import type { NextFunction, Request, Response } from 'express';
import { BuyTicketSchema } from '../dtos/payment.dto';
import { PaymentService } from '../services/payment.service';
import 'passport';
import { logger } from '../lib/logger';
import { BadRequestError, ForbiddenError, UnauthorizedError } from '../lib/errors';

const ERRORES_GENERICOS = ['unrecognized_keys', 'invalid_type'] //contiene los errores de zod que no queremos mostar por seguridad(faltan campos, tipo erroneo)


const makePayment = async (req: Request, res: Response, next: NextFunction) => {
    try{
        logger.warn(req.body)
        const validation = BuyTicketSchema.safeParse(req.body)

        if (!validation.success) {
            const issue = validation.error.issues[0]
            const mensaje = ERRORES_GENERICOS.includes(issue.code)
                ? 'Request no válida'
                : issue.message
            throw new BadRequestError(mensaje)
            return;
        }

        const clienteId = (req.user as any).id
        if (!clienteId || isNaN(clienteId) || clienteId <= 0) {
            throw new ForbiddenError("Acceso no autorizado.")
            return
        }

        const {  abonoId, cardHolder, cardNumber, expiryDate, cvv } = validation.data;

        const decodedCardNumber = Buffer.from(cardNumber, 'base64').toString('utf-8');
        const decodedExpiryDate = Buffer.from(expiryDate, 'base64').toString('utf-8');
        const decodedCvv = Buffer.from(cvv, 'base64').toString('utf-8');

        await PaymentService.makePayment(clienteId, {
            abonoId,
            cardHolder,
            cardNumber: decodedCardNumber,
            expiryDate: decodedExpiryDate,
            cvv: decodedCvv
        });
        logger.info("Pago realizado con éxito.")
        res.status(200).json({result: "pago realizado con exito"});
        

    }catch(err){
        next(err);
    }
}

export const PaymentController = {
    makePayment
}