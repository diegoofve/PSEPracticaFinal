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
    imagen: z.string().url().optional().openapi({ example: "https://ejemplo.com/primavera.jpg" }),
}).strict().openapi("NewFestivalDto");

export const NewAbonoScheme = z.object({
    
})

export type NewFestivalDto = z.infer<typeof NewFestivalSchema>;