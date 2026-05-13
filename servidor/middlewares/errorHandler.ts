import type { Request, Response, NextFunction } from "express"
import { AppError } from "../lib/errors"
import { logger } from '../lib/logger'

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(err);

    if (err instanceof AppError) {
        res.status(err.status).json({ error: err.message })
        return
    }

    //Error inesperado (prisma por ejemplo)
    console.error(err)
    res.status(500).json({ error: "Error interno del servidor" })
}