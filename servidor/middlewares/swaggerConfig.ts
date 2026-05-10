import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi"
import { LoginSchema, RegisterClienteSchema, RegisterEmpresaSchema } from "../dtos/auth.dto"
import { z } from "zod"

export const registry = new OpenAPIRegistry()

//seguridad
registry.registerComponent("securitySchemes", "bearerAuth", {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT"
})

//schemas
registry.register("LoginDto", LoginSchema)
registry.register("RegisterClienteDto", RegisterClienteSchema)
registry.register("RegisterEmpresaDto", RegisterEmpresaSchema)

//endpoints
registry.registerPath({
    method: "post",
    path: "/auth/login",
    summary: "Login de usuario",
    tags: ["Auth"],
    request: {
        body: { content: { "application/json": { schema: LoginSchema } } }
    },
    responses: {
        200: {
            description: "Token JWT",
            content: { "application/json": { schema: z.object({ token: z.string() }) } }
        }
    }
})

registry.registerPath({
    method: "post",
    path: "/auth/register",
    summary: "Registro de cliente",
    tags: ["Auth"],
    request: {
        body: { content: { "application/json": { schema: RegisterClienteSchema } } }
    },
    responses: {
        201: { description: "Cliente registrado correctamente" }
    }
})

registry.registerPath({
    method: "post",
    path: "/auth/register",
    summary: "Registro de empresa",
    tags: ["Auth"],
    request: {
        body: { content: { "application/json": { schema: RegisterEmpresaSchema } } }
    },
    responses: {
        201: { description: "Empresa registrada correctamente" }
    }
})


export const generateSwaggerSpec = () => {
    const generator = new OpenApiGeneratorV3(registry.definitions)
    return generator.generateDocument({
        openapi: "3.0.0",
        info: {
            title: "fest.io API",
            version: "1.0.0",
            description: "API de la práctica de festivales de PSE"
        },
        servers: [{ url: "http://localhost:3000", description: "Servidor local" }]
    })
}