import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { esMayorDeEdad } from '../lib/util';

extendZodWithOpenApi(z);

export const LoginSchema = z.object({
    email: z.email("Email no válido.").openapi({ example: 'test@test.com'}),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres.").openapi({ example: 'contraseña123'})
}).strict().openapi('LoginDto');

export const RegisterClienteSchema = z.object({
    nombre: z.string().openapi({ example: 'Pepe'}),
    apellidos: z.string().openapi({ example: 'Garcia Ejemplo'}),
    fechaNacimiento: z.coerce.date().refine(esMayorDeEdad, 'Debes ser mayor de edad para registrarte.').openapi({ example: "2000-01-01"}),
    dni: z.string().regex(/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i, 'DNI no válido.').openapi({ example: '00000000T'}),
    telefono: z.string().regex(/^(\+34|0034|34)?[6789]\d{8}$/, 'Teléfono no válido.'),
    email: z.email("Email no válido.").openapi({ example: 'test@test.com'}),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres.").openapi({ example: 'contraseña123'}),
}).strict().openapi('RegisterClienteDto');

export const RegisterEmpresaSchema = z.object({
    razon: z.string().openapi({ example: 'Google Spain, S.L.'}),
    cif: z.string().regex(/^[ABCDEFGHJKLMNPQRSUVWabcdefghjklmnpqrsuvw][0-9]{8}$/, 'CIF no válido.').openapi({ example: 'A12345678'}),
    domicilio: z.string().openapi({ example: 'Calle Gran Vía 10, 28013 Madrid'}),
    nombreContacto: z.string().openapi({ example: 'Pepe Contacto Garcia'}),
    telefono: z.string().regex(/^(\+34|0034|34)?[6789]\d{8}$/, 'Teléfono no válido.').openapi({ example: "666123456"}),
    email: z.email("Email no válido.").openapi({ example: 'test@test.com'}),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres.").openapi({ example: 'contraseña123'})
}).strict().openapi('RegisterEmpresaDto');


export type LoginDto = z.infer<typeof LoginSchema>;
export type RegisterClienteDto = z.infer<typeof RegisterClienteSchema>;
export type RegisterEmpresaDto = z.infer<typeof RegisterEmpresaSchema>;

