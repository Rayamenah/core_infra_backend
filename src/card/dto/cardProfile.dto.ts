/* eslint-disable prettier/prettier */
import { Currency, FeeFrequency, FeeImpact, CardScheme, AccountPaid, BranchBlackList, CardStatus } from "@prisma/client";
import { z } from "zod";

export const FeesDto = z.object({
    id: z.string().optional(),
    fee_name: z.string().min(1, "fee name required"),
    value: z.coerce.number(),
    currency: z.nativeEnum(Currency),
    fee_frequency: z.nativeEnum(FeeFrequency),
    fee_impact: z.nativeEnum(FeeImpact),
    account_paid: z.nativeEnum(AccountPaid),
    account: z.coerce.number(),
});

export const CardProfileDto = z.object({
    card_name: z.string().min(1, "card name required"),
    bin_prefix: z.string().min(1, "bin prefix required"),
    card_scheme: z.nativeEnum(CardScheme),
    expiration: z.coerce.date({ message: "invalid date" }),
    description: z.string().min(1, "description required"),
    currency: z.nativeEnum(Currency),
    branch_blacklist: z.nativeEnum(BranchBlackList),
    fees: z.array(FeesDto).optional(),
});

export type CardProfileType = z.infer<typeof CardProfileDto>;
export type FeesType = z.infer<typeof FeesDto>;
