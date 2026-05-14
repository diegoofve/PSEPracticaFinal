import { z } from "zod";

export const BuyTicketDto = z.object({
  festivalId: z.number(), //esto hay que validarlo
  abonoId: z.number(),
  cardHolder: z.string(),
  cardNumber: z.string(), // Viene en Base64
  expiryDate: z.string(), // Viene en Base64
  cvv: z.string()         // Viene en Base64
});

export type BuyDto = z.infer<typeof BuyTicketDto>;