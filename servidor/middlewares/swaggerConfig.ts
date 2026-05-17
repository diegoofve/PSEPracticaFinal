import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi"
import { z } from "zod"
import { LoginSchema, RegisterClienteSchema, RegisterEmpresaSchema } from "../dtos/auth.dto"
import { UpdateClienteSchema, ClienteSchema, ListaClienteSchema } from "../dtos/clientes.dto"
import { UpdateEmpresaSchema, EmpresaSchema, ListaEmpresaSchema } from "../dtos/empresa.dto"
import { NewFestivalSchema, FestivalSchema, ListaFestivalSchema, UpdateFestivalSchema } from "../dtos/festival.dto"
import { NewAbonoSchema, AbonoSchema } from "../dtos/abono.dto"
import { BuyTicketSchema } from "../dtos/payment.dto"
import { EstadoEmpresaSchema } from "../dtos/admin.dto"

export const registry = new OpenAPIRegistry()

// ─────────────────────────────────────────
// SEGURIDAD
// ─────────────────────────────────────────
registry.registerComponent("securitySchemes", "bearerAuth", {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT"
})

// ─────────────────────────────────────────
// SCHEMAS
// ─────────────────────────────────────────
registry.register("LoginDto", LoginSchema)
registry.register("RegisterClienteDto", RegisterClienteSchema)
registry.register("RegisterEmpresaDto", RegisterEmpresaSchema)
registry.register("UpdateClienteDto", UpdateClienteSchema)
registry.register("ClienteDto", ClienteSchema)
registry.register("UpdateEmpresaDto", UpdateEmpresaSchema)
registry.register("EmpresaDto", EmpresaSchema)
registry.register("NewFestivalDto", NewFestivalSchema)
registry.register("FestivalDto", FestivalSchema)
registry.register("UpdateFestivalDto", UpdateFestivalSchema)
registry.register("NewAbonoDto", NewAbonoSchema)
registry.register("AbonoDto", AbonoSchema)
registry.register("BuyTicketDto", BuyTicketSchema)
registry.register("EstadoEmpresaDto", EstadoEmpresaSchema)

// ─────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────
const errorResponse = (description: string) => ({
    description,
    content: { "application/json": { schema: z.object({ error: z.string() }) } }
})

const successResponse = (description: string, schema?: z.ZodTypeAny) => ({
    description,
    content: schema ? { "application/json": { schema } } : undefined
})

const idParam = z.object({ id: z.string().openapi({ example: "1" }) })

// ─────────────────────────────────────────
// SCHEMAS DE RESPUESTA APLANADOS
// ─────────────────────────────────────────

// Respuesta de getAbonosCliente - aplanada en cliente.service.ts
const AbonoClienteSchema = z.object({
    id: z.number(),
    total: z.any(), // Decimal de Prisma
    estado: z.string(),
    fechaCompra: z.string(),
    abonos: z.array(z.object({
        nombre: z.string(),
        festival: z.string(),
        cantidad: z.number(),
        precioUnit: z.any()
    }))
})

// Respuesta de getVentasEmpresa - aplanada en empresa.service.ts
const VentaEmpresaSchema = z.object({
    id: z.number(),
    total: z.any(),
    fechaCompra: z.string(),
    festival: z.number() // empresaId del festival
})

// ─────────────────────────────────────────
// AUTH - PÚBLICOS
// ─────────────────────────────────────────
registry.registerPath({
    method: "post",
    path: "/login",
    summary: "Login de usuario (cliente, empresa o admin)",
    tags: ["Auth"],
    request: {
        body: { content: { "application/json": { schema: LoginSchema } } }
    },
    responses: {
        200: successResponse("Token JWT", z.object({ token: z.string() })),
        401: errorResponse("Credenciales incorrectas"),
        410: errorResponse("Cuenta suspendida permanentemente"),
        400: errorResponse("Request no válida")
    }
})

registry.registerPath({
    method: "post",
    path: "/register/cliente",
    summary: "Registro de un nuevo cliente",
    tags: ["Auth"],
    request: {
        body: { content: { "application/json": { schema: RegisterClienteSchema } } }
    },
    responses: {
        201: successResponse("Cliente registrado correctamente", z.object({ result: z.string() })),
        409: errorResponse("Email o DNI ya en uso"),
        400: errorResponse("Request no válida")
    }
})

registry.registerPath({
    method: "post",
    path: "/register/empresa",
    summary: "Registro de una nueva empresa gestora",
    tags: ["Auth"],
    request: {
        body: { content: { "application/json": { schema: RegisterEmpresaSchema } } }
    },
    responses: {
        201: successResponse("Empresa registrada correctamente", z.object({ result: z.string() })),
        409: errorResponse("Email o CIF ya en uso"),
        400: errorResponse("Request no válida")
    }
})

// ─────────────────────────────────────────
// CLIENTE
// ─────────────────────────────────────────
registry.registerPath({
    method: "get",
    path: "/cliente",
    summary: "Ver perfil del cliente autenticado",
    tags: ["Cliente"],
    security: [{ bearerAuth: [] }],
    responses: {
        200: successResponse("Datos del cliente", z.array(ClienteSchema)),
        401: errorResponse("No autenticado"),
        403: errorResponse("Acceso no autorizado")
    }
})

registry.registerPath({
    method: "put",
    path: "/cliente",
    summary: "Actualizar perfil del cliente autenticado",
    tags: ["Cliente"],
    security: [{ bearerAuth: [] }],
    request: {
        body: { content: { "application/json": { schema: UpdateClienteSchema } } }
    },
    responses: {
        200: successResponse("Perfil actualizado correctamente", z.object({ result: z.string() })),
        400: errorResponse("Request no válida o sin datos a actualizar"),
        401: errorResponse("No autenticado")
    }
})

registry.registerPath({
    method: "delete",
    path: "/cliente",
    summary: "Baja voluntaria del cliente autenticado",
    tags: ["Cliente"],
    security: [{ bearerAuth: [] }],
    responses: {
        204: { description: "Cuenta eliminada correctamente" },
        401: errorResponse("No autenticado")
    }
})

registry.registerPath({
    method: "get",
    path: "/cliente/abonos",
    summary: "Ver historial de compras del cliente autenticado",
    tags: ["Cliente"],
    security: [{ bearerAuth: [] }],
    responses: {
        200: successResponse("Lista de compras realizadas", z.array(AbonoClienteSchema)),
        401: errorResponse("No autenticado"),
        404: errorResponse("Cliente no encontrado")
    }
})

// ─────────────────────────────────────────
// EMPRESA
// ─────────────────────────────────────────
registry.registerPath({
    method: "get",
    path: "/empresa",
    summary: "Ver perfil de la empresa autenticada",
    tags: ["Empresa"],
    security: [{ bearerAuth: [] }],
    responses: {
        200: successResponse("Datos de la empresa", z.array(EmpresaSchema)),
        401: errorResponse("No autenticado"),
        403: errorResponse("Acceso no autorizado")
    }
})

registry.registerPath({
    method: "put",
    path: "/empresa",
    summary: "Actualizar perfil de la empresa autenticada",
    tags: ["Empresa"],
    security: [{ bearerAuth: [] }],
    request: {
        body: { content: { "application/json": { schema: UpdateEmpresaSchema } } }
    },
    responses: {
        200: successResponse("Perfil actualizado correctamente", z.object({ result: z.string() })),
        400: errorResponse("Request no válida o sin datos a actualizar"),
        401: errorResponse("No autenticado")
    }
})

registry.registerPath({
    method: "delete",
    path: "/empresa",
    summary: "Baja voluntaria de la empresa autenticada",
    tags: ["Empresa"],
    security: [{ bearerAuth: [] }],
    responses: {
        204: { description: "Cuenta eliminada correctamente" },
        401: errorResponse("No autenticado")
    }
})

registry.registerPath({
    method: "get",
    path: "/empresa/ventas",
    summary: "Ver ventas de los festivales de la empresa autenticada",
    tags: ["Empresa"],
    security: [{ bearerAuth: [] }],
    responses: {
        200: successResponse("Lista de ventas", z.array(VentaEmpresaSchema)),
        401: errorResponse("No autenticado"),
        403: errorResponse("Empresa dada de baja"),
        404: errorResponse("Empresa no encontrada")
    }
})

// ─────────────────────────────────────────
// FESTIVALES
// ─────────────────────────────────────────
registry.registerPath({
    method: "get",
    path: "/festivales",
    summary: "Listar todos los festivales activos con sus abonos",
    tags: ["Festivales"],
    security: [{ bearerAuth: [] }],
    responses: {
        200: successResponse("Lista de festivales activos", ListaFestivalSchema),
        401: errorResponse("No autenticado")
    }
})

registry.registerPath({
    method: "get",
    path: "/festivales/empresa",
    summary: "Listar festivales de la empresa autenticada (activos e inactivos)",
    tags: ["Festivales"],
    security: [{ bearerAuth: [] }],
    responses: {
        200: successResponse("Lista de festivales de la empresa", ListaFestivalSchema),
        401: errorResponse("No autenticado"),
        403: errorResponse("Acceso no autorizado")
    }
})

registry.registerPath({
    method: "get",
    path: "/festival/{id}",
    summary: "Ver detalle de un festival por id",
    tags: ["Festivales"],
    security: [{ bearerAuth: [] }],
    request: { params: idParam },
    responses: {
        200: successResponse("Datos del festival", FestivalSchema),
        404: errorResponse("Festival no encontrado"),
        400: errorResponse("Id no válido"),
        401: errorResponse("No autenticado")
    }
})

registry.registerPath({
    method: "post",
    path: "/festivales",
    summary: "Crear un nuevo festival con abono general",
    description: "Al crear el festival se genera automáticamente un abono general con el precio y stock indicados.",
    tags: ["Festivales"],
    security: [{ bearerAuth: [] }],
    request: {
        body: { content: { "application/json": { schema: NewFestivalSchema } } }
    },
    responses: {
        201: successResponse("Festival creado correctamente", z.object({ result: z.string() })),
        400: errorResponse("Request no válida o fechas incorrectas"),
        403: errorResponse("Empresa no verificada"),
        404: errorResponse("Empresa no encontrada"),
        401: errorResponse("No autenticado")
    }
})

registry.registerPath({
    method: "put",
    path: "/festivales/{id}",
    summary: "Editar un festival",
    tags: ["Festivales"],
    security: [{ bearerAuth: [] }],
    request: {
        params: idParam,
        body: { content: { "application/json": { schema: UpdateFestivalSchema } } }
    },
    responses: {
        200: successResponse("Festival actualizado correctamente", z.object({ result: z.string() })),
        400: errorResponse("Request no válida"),
        403: errorResponse("Sin permisos o empresa no verificada"),
        404: errorResponse("Festival no encontrado"),
        401: errorResponse("No autenticado")
    }
})

registry.registerPath({
    method: "delete",
    path: "/festivales/{id}",
    summary: "Cancelar un festival (solo con más de 3 días de antelación)",
    tags: ["Festivales"],
    security: [{ bearerAuth: [] }],
    request: { params: idParam },
    responses: {
        200: successResponse("Festival cancelado correctamente", z.object({ result: z.string() })),
        403: errorResponse("Sin permisos, empresa no verificada o menos de 3 días para el festival"),
        404: errorResponse("Festival no encontrado"),
        409: errorResponse("El festival ya está cancelado"),
        401: errorResponse("No autenticado")
    }
})

registry.registerPath({
    method: "post",
    path: "/festivales/{id}/nuevoAbono",
    summary: "Añadir un nuevo tipo de abono a un festival",
    tags: ["Festivales"],
    security: [{ bearerAuth: [] }],
    request: {
        params: idParam,
        body: { content: { "application/json": { schema: NewAbonoSchema } } }
    },
    responses: {
        201: successResponse("Abono creado correctamente", z.object({ result: z.string() })),
        400: errorResponse("Stock supera el aforo disponible del festival"),
        403: errorResponse("Sin permisos, empresa no verificada o festival cancelado"),
        404: errorResponse("Festival no encontrado"),
        401: errorResponse("No autenticado")
    }
})

// ─────────────────────────────────────────
// PAGOS
// ─────────────────────────────────────────
registry.registerPath({
    method: "post",
    path: "/payment",
    summary: "Comprar un abono de festival",
    description: "Los campos cardNumber, expiryDate y cvv deben venir codificados en Base64.",
    tags: ["Pagos"],
    security: [{ bearerAuth: [] }],
    request: {
        body: { content: { "application/json": { schema: BuyTicketSchema } } }
    },
    responses: {
        200: successResponse("Pago realizado con éxito", z.object({ result: z.string() })),
        402: errorResponse("Pago rechazado por la pasarela"),
        409: errorResponse("Sin stock disponible"),
        404: errorResponse("Abono no encontrado"),
        401: errorResponse("No autenticado")
    }
})

// ─────────────────────────────────────────
// ADMIN
// ─────────────────────────────────────────
registry.registerPath({
    method: "get",
    path: "/clientes",
    summary: "Listar todos los clientes activos",
    tags: ["Admin"],
    security: [{ bearerAuth: [] }],
    responses: {
        200: successResponse("Lista de clientes", ListaClienteSchema),
        401: errorResponse("No autenticado"),
        403: errorResponse("Sin permisos de administrador")
    }
})

registry.registerPath({
    method: "get",
    path: "/empresas",
    summary: "Listar todas las empresas activas",
    tags: ["Admin"],
    security: [{ bearerAuth: [] }],
    responses: {
        200: successResponse("Lista de empresas", ListaEmpresaSchema),
        401: errorResponse("No autenticado"),
        403: errorResponse("Sin permisos de administrador")
    }
})

registry.registerPath({
    method: "put",
    path: "/admin/empresa/{id}/estado",
    summary: "Cambiar estado de una empresa (VERIFICADA o RESTRINGIDA)",
    description: "Al restringir una empresa se cancela su cuenta, sus festivales activos y se bloquea su email permanentemente.",
    tags: ["Admin"],
    security: [{ bearerAuth: [] }],
    request: {
        params: idParam,
        body: { content: { "application/json": { schema: EstadoEmpresaSchema } } }
    },
    responses: {
        200: successResponse("Estado actualizado correctamente", z.object({ result: z.string() })),
        404: errorResponse("Empresa no encontrada"),
        410: errorResponse("La empresa está dada de baja"),
        401: errorResponse("No autenticado"),
        403: errorResponse("Sin permisos de administrador")
    }
})

registry.registerPath({
    method: "put",
    path: "/admin/empresa/{id}/banear",
    summary: "Banear permanentemente una empresa",
    description: "Cancela la cuenta, bloquea el email y da de baja todos sus festivales.",
    tags: ["Admin"],
    security: [{ bearerAuth: [] }],
    request: { params: idParam },
    responses: {
        200: successResponse("Empresa baneada correctamente", z.object({ result: z.string() })),
        404: errorResponse("Empresa no encontrada"),
        410: errorResponse("La empresa ya está dada de baja"),
        401: errorResponse("No autenticado"),
        403: errorResponse("Sin permisos de administrador")
    }
})

registry.registerPath({
    method: "put",
    path: "/admin/cliente/{id}/banear",
    summary: "Banear permanentemente un cliente",
    description: "Bloquea el email del cliente impidiendo que vuelva a registrarse.",
    tags: ["Admin"],
    security: [{ bearerAuth: [] }],
    request: { params: idParam },
    responses: {
        200: successResponse("Cliente baneado correctamente", z.object({ result: z.string() })),
        404: errorResponse("Cliente no encontrado"),
        410: errorResponse("El cliente ya está dado de baja"),
        401: errorResponse("No autenticado"),
        403: errorResponse("Sin permisos de administrador")
    }
})

// ─────────────────────────────────────────
// GENERADOR
// ─────────────────────────────────────────
export const generateSwaggerSpec = () => {
    const generator = new OpenApiGeneratorV3(registry.definitions)
    return generator.generateDocument({
        openapi: "3.0.0",
        info: {
            title: "fest.io API",
            version: "1.0.0",
            description: "API de la plataforma de gestión y venta de entradas para festivales fest.io"
        },
        servers: [{ url: "http://localhost:3000", description: "Servidor local" }]
    })
}
