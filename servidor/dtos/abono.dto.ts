import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const NewAbonoSchema = z.object({
    nombre: z.string().openapi({ example: "VIP" }),
    descripcion: z.string().optional().openapi({ example: "Acceso VIP al festival" }),
    precio: z.number().positive("El precio del abono debe ser positivo.").openapi({ example: 150 }),
    stock: z.number().int().positive("El stock del abono debe ser positivo.").openapi({ example: 500 })
}).strict().openapi("NewAbonoDto");

export const AbonoSchema = z.object({
    id: z.number(),
    festivalId: z.number(),
    nombre: z.string(),
    descripcion: z.string().nullable(),
    precio: z.coerce.string(), //decimal de prisma se serializa como string
    stock: z.number(),
    creadoEn: z.coerce.date()
}).openapi("AbonoDto")


export type NewAbonoDto = z.infer<typeof NewAbonoSchema>;
export type AbonoDto = z.infer<typeof AbonoSchema>;