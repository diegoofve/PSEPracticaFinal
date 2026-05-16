import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { isValidDate } from "../lib/util";

extendZodWithOpenApi(z);

export const NewFestivalSchema = z.object({
    nombre: z.string().openapi({ example: "Coachella" }),
    descripcion: z.string().optional().openapi({ example: "Un festival muy divertido al que acudir con tus amigos!"}),
    ubicacion: z.string().openapi({ example: "IFEMA, Madrid" }),
    aforo: z.number().int().positive("El aforo debe ser positivo.").openapi({ example: 10000}),
    artistas: z.array(z.string()).optional().openapi({ example: ["Mora", "Rosalía"]}),
    fechaInicio: z.coerce.date().refine(isValidDate, "La fecha de inicio no puede ser pasada.").openapi({ example: "2025-05-01" }),
    fechaFin: z.coerce.date().openapi({ example: "2025-05-02"}),
    precioAbono: z.number().positive().openapi({ example: 70}),//hay que añadir euro/dolar??...
    imagen: z.url("La url no es válida.").optional().openapi({ example: "https://ejemplo.com/primavera.jpg" }),
}).strict().openapi("NewFestivalDto");

const AbonoSchema = z.object({
    id: z.number(),
    festivalId: z.number(),
    nombre: z.string(),
    descripcion: z.string().nullable(),
    precio: z.coerce.string(), //decimal de prisma se serializa como string
    stock: z.number(),
    creadoEn: z.coerce.date()
}).openapi("AbonoDto")

export const FestivalSchema = z.object({
    id: z.number(),
    empresaId: z.number(),
    nombre: z.string(),
    descripcion: z.string().nullable(),
    ubicacion: z.string(),
    aforo: z.number(),
    artistas: z.array(z.string()),
    fechaInicio: z.coerce.date(),
    fechaFin: z.coerce.date(),
    imagen: z.string().nullable(),
    activo: z.boolean(),
    creadoEn: z.coerce.date(),
    abonos: z.array(AbonoSchema)
}).openapi("FestivalDto")

export const ListaFestivalSchema = z.array(FestivalSchema);

export const UpdateFestivalSchema = z.object({
    nombre: z.string().optional().openapi({ example: "Coachella" }),
    descripcion: z.string().optional().openapi({ example: "Un festival muy divertido al que acudir con tus amigos!"}),
    ubicacion: z.string().optional().openapi({ example: "IFEMA, Madrid" }),
    aforo: z.number().int().positive("El aforo debe ser positivo.").optional().openapi({ example: 10000}),
    artistas: z.array(z.string()).optional().openapi({ example: ["Mora", "Rosalía"]}),
    fechaInicio: z.coerce.date().refine(isValidDate, "La fecha de inicio no puede ser pasada.").optional().openapi({ example: "2025-05-01" }),
    fechaFin: z.coerce.date().optional().openapi({ example: "2025-05-02"}),
    imagen: z.url("La url no es válida.").optional().openapi({ example: "https://ejemplo.com/primavera.jpg" }),
}).openapi("UpdateFestivalDto")

export const NewAbonoSchema = z.object({
    nombre: z.string().openapi({ example: "VIP" }),
    descripcion: z.string().optional().openapi({ example: "Acceso VIP al festival" }),
        precio: z.number().positive().openapi({ example: 150 }),
    stock: z.number().int().positive().openapi({ example: 500 })
}).strict().openapi("NewAbonoDto")


export type NewFestivalDto = z.infer<typeof NewFestivalSchema>;
export type FestivalDto = z.infer<typeof FestivalSchema>;
export type ListaFestivalDto = z.infer<typeof ListaFestivalSchema>;
export type UpdateFestivalDto = z.infer<typeof UpdateFestivalSchema>;
export type NewAbonoDto = z.infer<typeof NewAbonoSchema>