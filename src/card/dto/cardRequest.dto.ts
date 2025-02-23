import { CardType } from '@prisma/client';
import { z } from 'zod';

export const CardRequestDto = z.object({
    branch_name: z.string(),
    initiator: z.string(),
    card_type: z.nativeEnum(CardType),
    card_charges: z.coerce.number(),
    quantity: z.coerce.number(),
    batch: z.string()
});
