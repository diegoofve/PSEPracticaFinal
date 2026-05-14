// admin.controller.ts
import type { Request, Response, NextFunction } from "express"
import { AdminService } from "../services/admin.service"
import { EstadoEmpresaSchema } from "../dtos/admin.dto"
import { BadRequestError } from "../lib/errors"

const ERRORES_GENERICOS = ['unrecognized_keys', 'invalid_type'] //contiene los errores de zod que no queremos mostar por seguridad(faltan campos, tipo erroneo)

const cambiarEstadoEmpresa = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validation = EstadoEmpresaSchema.safeParse(req.body)

        if (!validation.success) {
            const issue = validation.error.issues[0]
            const mensaje = ERRORES_GENERICOS.includes(issue.code)
                ? 'Request no válida'
                : issue.message
            throw new BadRequestError(mensaje)
            return;
        }

        const idString = (req.params.id) as any

        if (!idString) {
            throw new BadRequestError("No se ha detectado ningun parámetro.")
            return;
        }

        const id = Number(idString)

        if(Number.isNaN(id)){
            throw new BadRequestError("El parámetro debe ser un número.")
        }

        if(id <= 0){
            throw new BadRequestError("El parámetro debe ser un número positivo.")
            return;
        }

        await AdminService.cambiarEstadoEmpresa(id, validation.data)
        res.status(200).json({ result: "Empresa restringida correctamente" })
    } catch (err) {
        next(err)
    }
}

const banearCliente = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idString = (req.params.id) as any

        if (!idString) {
            throw new BadRequestError("No se ha detectado ningun parámetro.")
            return;
        }

        const id = Number(idString)

        if(Number.isNaN(id)){
            throw new BadRequestError("El parámetro debe ser un número.")
        }

        if(id <= 0){
            throw new BadRequestError("El parámetro debe ser un número positivo.")
            return;
        }

        await AdminService.banearCliente(id)
        res.status(200).json({ result: "Cliente baneado correctamente" })
    } catch (err) {
        next(err)
    }
}

const banearEmpresa = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idString = (req.params.id) as any

        if (!idString) {
            throw new BadRequestError("No se ha detectado ningun parámetro.")
            return;
        }

        const id = Number(idString)

        if(Number.isNaN(id)){
            throw new BadRequestError("El parámetro debe ser un número.")
        }

        if(id <= 0){
            throw new BadRequestError("El parámetro debe ser un número positivo.")
            return;
        }

        await AdminService.banearEmpresa(id)
        res.status(200).json({ result: "Empresa baneada correctamente" })
    } catch (err) {
        next(err)
    }
}

export const AdminController = {
    cambiarEstadoEmpresa,
    banearCliente,
    banearEmpresa
}