import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const NewFestivalSchema = z.object({
    nombre: z.string().openapi({ example: "Coachella" }),
    descripcion: z.string().optional().openapi({ example: "Un festival muy divertido al que acudir con tus amigos!"}),
    ubicacion: z.string().openapi({ example: "IFEMA, Madrid" }),
    aforo: z.number().int().positive().openapi({ example: 10000}),
    artistas: z.array(z.string()).optional().openapi({ example: ["Mora", "Rosalía"]}),
    fechaInicio: z.coerce.date().openapi({ example: "2025-05-01" }),
    fechaFin: z.coerce.date().openapi({ example: "2025-05-02"}),
    imagen: z.string().url().optional().openapi({ example: "https://ejemplo.com/primavera.jpg" }),
    empresaId: z.number().int().optional().openapi({ example: 2})
}).strict().openapi("NewFestivalDto");

export type NewFestivalDto = z.infer<typeof NewFestivalSchema>;