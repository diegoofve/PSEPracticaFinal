import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { isValidDate } from "../lib/util";
import { AbonoSchema } from "./abono.dto";

extendZodWithOpenApi(z);

export const NewFestivalSchema = z.object({
    nombre: z.string().openapi({ example: "Coachella" }),
    descripcion: z.string().optional().openapi({ example: "Un festival muy divertido al que acudir con tus amigos!"}),
    ubicacion: z.string().openapi({ example: "IFEMA, Madrid" }),
    aforo: z.number().int().positive("El aforo debe ser positivo.").openapi({ example: 10000}),
    cantidad: z.number().int().positive("El numero de entradas debe ser positivo").openapi({ example: 500 }),
    artistas: z.array(z.string()).optional().openapi({ example: ["Mora", "Rosalía"]}),
    fechaInicio: z.coerce.date().refine(isValidDate, "La fecha de inicio no puede ser pasada.").openapi({ example: "2025-05-01" }),
    fechaFin: z.coerce.date().openapi({ example: "2025-05-02"}),
    precioAbono: z.number().positive("El precio del abono debe ser positivo.").openapi({ example: 70}),
    imagen: z.url("La url no es válida.").optional().openapi({ example: "https://ejemplo.com/primavera.jpg" }),
}).strict().openapi("NewFestivalDto");

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
}).strict().openapi("UpdateFestivalDto")

export type NewFestivalDto = z.infer<typeof NewFestivalSchema>;
export type FestivalDto = z.infer<typeof FestivalSchema>;
export type ListaFestivalDto = z.infer<typeof ListaFestivalSchema>;
export type UpdateFestivalDto = z.infer<typeof UpdateFestivalSchema>;