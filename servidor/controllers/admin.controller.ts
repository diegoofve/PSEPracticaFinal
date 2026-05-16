import type { Request, Response, NextFunction } from "express"
import { AdminService } from "../services/admin.service"
import { EstadoEmpresaSchema } from "../dtos/admin.dto"
import { logger } from "../lib/logger"
import { validateBody, validateParamsId } from "../lib/util"

const cambiarEstadoEmpresa = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = validateBody(EstadoEmpresaSchema, req)

        const id = validateParamsId(req)

        await AdminService.cambiarEstadoEmpresa(id, data)

        logger.info("Estado de la empresa actualizado.")
        res.status(200).json({ result: "Estado de la empresa actualizado correctamente." })
    } catch (err) {
        next(err)
    }
}

const banearCliente = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = validateParamsId(req)

        await AdminService.banearCliente(id)

        logger.info(`Cliente ${id} baneado.`)
        res.status(200).json({ result: "Cliente baneado correctamente." })
    } catch (err) {
        next(err)
    }
}

const banearEmpresa = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = validateParamsId(req)

        await AdminService.banearEmpresa(id)
        
        logger.info(`Empresa ${id} baneada.`)
        res.status(200).json({ result: "Empresa baneada correctamente." })
    } catch (err) {
        next(err)
    }
}

export const AdminController = {
    cambiarEstadoEmpresa,
    banearCliente,
    banearEmpresa
}