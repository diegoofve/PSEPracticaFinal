import type { Request, } from 'express';
import { ZodType } from 'zod';
import { BadRequestError, ForbiddenError } from './errors';

// Comprueba si un string es un email válido usando una expresión regular
export const isValidEmail = (email: string): boolean => {
    const emailRegex: RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    return emailRegex.test(email);
};

export const esMayorDeEdad = (fecha: Date): boolean => {
    const hoy = new Date();

    if (hoy.getTime() - fecha.getTime() <= 18 * 365 * 24 * 60 * 60 * 1000){
        return false;
    }

    return true;
}

export const isEmptyObject = (args: unknown): boolean => {
  return JSON.stringify(args) === '{}';
};

export const isValidDate = (fecha: Date): boolean => {
    return fecha >= new Date();
}

export const validateBody = <T>(schema: ZodType<T>, req: Request): T  => {
    //errores en los cuales no queremos mostrar el mensaje de zod por seguridad (campos extra, campos faltantes)
    const ERRORES_GENERICOS = ['unrecognized_keys', 'invalid_type']

    const validation = schema.safeParse(req.body)

    if(!validation.success){
        const issue = validation.error.issues[0]
        const mensaje = ERRORES_GENERICOS.includes(issue.code)
            ? 'Request no válida'
            : issue.message
        throw new BadRequestError(mensaje)
    }

    return validation.data
}

export const validateParamsId = (req: Request): number => {
    const idString = (req.params.id) as any

    if (!idString) {
        throw new BadRequestError("No se ha detectado ningun parámetro.")
    }

    const id = Number(idString)

    if(isNaN(id)){
        throw new BadRequestError("El parámetro debe ser un número.")
    }

    if(id <= 0){
        throw new BadRequestError("El parámetro debe ser un número positivo.")
    }
    
    return id
}

//Esta funcion nunca deberia lanzar errores porque inyectamos el id en la sesion y sin hacer 
//login no se puede acceder a los endpoints pero mejor validarlo igual
export const validateUserId = (req: Request): number => {
    const id = Number((req.user as any).id)
    if (!id || isNaN(id) || id <= 0) {
        throw new ForbiddenError("Acceso no autorizado.")
    }

    return id
}