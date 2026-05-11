import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { esMayorDeEdad } from '../lib/util';

extendZodWithOpenApi(z);

export const LoginSchema = z.object({
    email: z.email().openapi({ example: 'test@test.com'}),
    password: z.string().min(8).openapi({ example: 'contraseña123'})
}).strict().openapi('LoginDto');

export const RegisterClienteSchema = z.object({
    nombre: z.string().openapi({ example: 'Pepe'}),
    apellidos: z.string().openapi({ example: 'Garcia Ejemplo'}),
    fechaNacimiento: z.coerce.date().refine(esMayorDeEdad, 'Debes ser mayor de edad para registrarte.').openapi({ example: "2000-01-01"}),
    dni: z.string().regex(/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i, 'DNI no válido.').openapi({ example: '00000000T'}),
    telefono: z.string().regex(/^(\+34|0034|34)?[6789]\d{8}$/, 'Teléfono no válido.'),
    email: z.email().openapi({ example: 'test@test.com'}),
    password: z.string().min(8).openapi({ example: 'contraseña123'}),

}).strict().openapi('RegisterClienteDto');

export const RegisterEmpresaSchema = z.object({
    razon: z.string().openapi({ example: 'Google Spain, S.L.'}),
    cif: z.string().regex(/^[ABCDEFGHJKLMNPQRSUVWabcdefghjklmnpqrsuvw][0-9]{8}$/, 'CIF no válido.').openapi({ example: 'A12345678'}),
    domicilio: z.string().openapi({ example: 'Calle Gran Vía 10, 28013 Madrid'}),
    nombreContacto: z.string().openapi({ example: 'Pepe Contacto Garcia'}),
    telefono: z.string().regex(/^(\+34|0034|34)?[6789]\d{8}$/, 'Teléfono no válido.').openapi({ example: "666123456"}),
    email: z.email().openapi({ example: 'test@test.com'}),
    password: z.string().min(8).openapi({ example: 'contraseña123'})
}).strict().openapi('RegisterEmpresaDto');

export const UpdateClienteSchema = z.object({
    nombre: z.string().optional().openapi({ example: 'Pepe'}),
    apellidos: z.string().optional().openapi({ example: 'Garcia Ejemplo'}),
    fechaNacimiento: z.coerce.date().refine(esMayorDeEdad, 'Debes ser mayor de edad para registrarte.').optional().openapi({ example: "2000-01-01"}),
    telefono: z.string().regex(/^(\+34|0034|34)?[6789]\d{8}$/, 'Teléfono no válido.').optional().openapi({ example: "666123456"}),
    password: z.string().min(8).optional().openapi({ example: 'contraseña123'}),
}).strict().openapi('UpdateClienteDto');

export const UpdateEmpresaSchema = z.object({
    razon: z.string().optional().openapi({ example: 'Google Spain, S.L.'}),
    domicilio: z.string().optional().openapi({ example: 'Calle Gran Vía 10, 28013 Madrid'}),
    nombreContacto: z.string().optional().openapi({ example: 'Pepe Contacto Garcia'}),
    telefono: z.string().regex(/^(\+34|0034|34)?[6789]\d{8}$/, 'Teléfono no válido.').optional().openapi({ example: "666123456"}),
    password: z.string().min(8).optional().openapi({ example: 'contraseña123'})
}).strict().openapi('UpdateEmpresaDto');

export type LoginDto = z.infer<typeof LoginSchema>;
export type RegisterClienteDto = z.infer<typeof RegisterClienteSchema>;
export type RegisterEmpresaDto = z.infer<typeof RegisterEmpresaSchema>;
export type UpdateClienteDto = z.infer<typeof UpdateClienteSchema>;
export type UpdateEmpresaDto = z.infer<typeof UpdateEmpresaSchema>;