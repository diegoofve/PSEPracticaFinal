import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { EstadoGestora } from '@prisma/client';

extendZodWithOpenApi(z);

export const EstadoEmpresaSchema = z.object({
    estado: z.enum(EstadoGestora).extract(["VERIFICADA", "RESTRINGIDA"]).openapi({ example: "VERIFICADA" })
}).strict().openapi("EstadoEmpresaDto")

export type EstadoEmpresaDto = z.infer<typeof EstadoEmpresaSchema>