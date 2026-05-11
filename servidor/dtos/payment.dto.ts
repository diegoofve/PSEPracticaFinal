import { z } from "zod";

export const BuySchema = z.object({

});

export type BuyDto = z.infer<typeof BuySchema>;