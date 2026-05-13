export class AppError extends Error{
    status: number
    constructor(message: string, status: number) {
        super(message)
        this.status = status
    }
}

export class BadRequestError extends AppError {
    constructor(message = "Datos no válidos") {
        super(message, 400)
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = "No autenticado") {
        super(message, 401)
    }
}

export class PaymentError extends AppError {
    constructor(message = "Pago rechazado") {
        super(message, 402)
    }
}

export class ForbiddenError extends AppError {
    constructor(message = "Acceso no autorizado") {
        super(message, 403)
    }
}

export class NotFoundError extends AppError {
    constructor(message = "No encontrado") {
        super(message, 404)
    }
}

export class ConflictError extends AppError {
    constructor(message = "Recurso ya existente") {
        super(message, 409)
    }
}

export class GonePermanentlyError extends AppError {
    constructor(message = "Recurso eliminado permanentemente") {
        super(message, 410)
    }
}

export class FatalError extends AppError {
    constructor(message = "Error fatal del servidor") {
        super(message, 500)
    }
}
//422 para fechas??