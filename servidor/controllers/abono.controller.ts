import type { Request, Response, NextFunction } from "express"
import { NewAbonoSchema } from "../dtos/abono.dto";
import { logger } from "../lib/logger";
import { AbonoService } from "../services/abono.service";
import { validateBody, validateParamsId, validateUserId } from "../lib/util";

const crearAbono = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const empresaId = validateUserId(req)

        const festivalId = validateParamsId(req)
        
        const data = validateBody(NewAbonoSchema, req)

        await AbonoService.crearAbono(empresaId, festivalId, data)

        logger.info("abono creado correctamente")
        res.status(201).json({result: "creado correctamente"})
    } catch (err) {
        next(err)
    }
}

export const AbonoController = {
    crearAbono
}