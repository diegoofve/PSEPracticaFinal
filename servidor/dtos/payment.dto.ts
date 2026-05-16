import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const BuyTicketSchema = z.object({
  abonoId: z.number().int().openapi({example:3}),
  cardHolder: z.string().openapi({example: "Manolito Text Perez"}),
  cardNumber: z.string().openapi({example: "ZXN0byBlcyB1biBlamVtcGxvIGVuIGJhc2U2NA==", description: "este campo viene codificado en base64"}), // Viene en Base64
  expiryDate: z.string().openapi({example: "ZXN0byBlcyB1biBlamVtcGxvIGVuIGJhc2U2NA==", description: "este campo viene codificado en base64"}), // Viene en Base64
  cvv: z.string().openapi({example: "ZXN0byBlcyB1biBlamVtcGxvIGVuIGJhc2U2NA==", description: "este campo viene codificado en base64"})       // Viene en Base64
}).strict().openapi("BuyTicketDto");

export type BuyTicketDto = z.infer<typeof BuyTicketSchema>;