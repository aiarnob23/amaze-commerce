import { z } from "zod";

const newUserValidation = z.object({
    body: z.object({
        name: z.string(),
        email: z.string(),
        phone: z.string(),
        password: z.string(),
        isVerified: z.boolean().optional().default(false),
        otp:z.string().optional(),
    })
})

export const zodUserValidationSchema = {
    newUserValidation,
}