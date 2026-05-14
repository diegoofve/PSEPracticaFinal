import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { EstadoGestora } from '@prisma/client';

extendZodWithOpenApi(z)

export const EmpresaSchema = z.object({
  id: z.number().int(),
  email: z.email(),
  razonSocial: z.string(),
  cif: z.string(),
  domicilioSocial: z.string(),
  nombreContacto: z.string(),
  telefonoContacto: z.string(),
  estado: z.enum(EstadoGestora),
  creadoEn: z.coerce.date()
});

export const ListaEmpresaSchema = z.array(EmpresaSchema);

export const UpdateEmpresaSchema = z.object({
    razon: z.string().optional().openapi({ example: 'Google Spain, S.L.'}),
    domicilio: z.string().optional().openapi({ example: 'Calle Gran Vía 10, 28013 Madrid'}),
    nombreContacto: z.string().optional().openapi({ example: 'Pepe Contacto Garcia'}),
    telefono: z.string().regex(/^(\+34|0034|34)?[6789]\d{8}$/, 'Teléfono no válido.').optional().openapi({ example: "666123456"}),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres.").optional().openapi({ example: 'contraseña123'})
}).strict().openapi('UpdateEmpresaDto');

export type UpdateEmpresaDto = z.infer<typeof UpdateEmpresaSchema>;
export type EmpresaDto = z.infer<typeof EmpresaSchema>;
export type ListaEmpresaDto = z.infer<typeof ListaEmpresaSchema>;