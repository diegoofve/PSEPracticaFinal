import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { esMayorDeEdad } from '../lib/util';

extendZodWithOpenApi(z);

export const ClienteSchema = z.object({ //necesario documentar en swagger? es de response solo
    id: z.number().int(),
    email: z.email(),
    dni: z.string(),
    nombre: z.string(),
    apellidos: z.string(),
    fechaNacimiento: z.coerce.date(), 
    telefono: z.string(),
    creadoEn: z.coerce.date()
})

export const ListaClienteSchema = z.array(ClienteSchema)

export const UpdateClienteSchema = z.object({
    nombre: z.string().optional().openapi({ example: 'Pepe'}),
    apellidos: z.string().optional().openapi({ example: 'Garcia Ejemplo'}),
    fechaNacimiento: z.coerce.date().refine(esMayorDeEdad, 'Debes ser mayor de edad para registrarte.').optional().openapi({ example: "2000-01-01"}),
    telefono: z.string().regex(/^(\+34|0034|34)?[6789]\d{8}$/, 'Teléfono no válido.').optional().openapi({ example: "666123456"}),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres.").optional().openapi({ example: 'contraseña123'}),
}).strict().openapi('UpdateClienteDto');

export type UpdateClienteDto = z.infer<typeof UpdateClienteSchema>;
export type ClienteDto = z.infer<typeof ClienteSchema>;
export type ListaClienteDto = z.infer<typeof ListaClienteSchema>;