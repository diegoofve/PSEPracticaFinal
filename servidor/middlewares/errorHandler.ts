import type { Request, Response, NextFunction } from "express"
import { AppError } from "../lib/errors"
import { logger } from '../lib/logger'
import { log } from "console";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        if(err.status >= 500){
            logger.error(err);
        }else{
            logger.warn(err);
        }
        res.status(err.status).json({ error: err.message })
        return
    }

    //Error inesperado (prisma por ejemplo)
    logger.error(err)
    res.status(500).json({ error: "Error interno del servidor" })
}