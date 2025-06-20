import { z } from "zod";

const newUserValidation = z.object({
    body: z.object({
        name: z.string(),
        email: z.string(),
        phone: z.string(),
        password: z.string(),
        city:z.string().optional().default(""),
        country:z.string().optional().default(""),
        shippingAddress:z.string().optional().default(""),
        postalCode:z.number().optional(),
        isVerified: z.boolean().optional().default(false),
        otp:z.string().optional(),
    })
})

export const zodUserValidationSchema = {
    newUserValidation,
}