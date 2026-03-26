import { z } from "zod"

export const SignupSchema = z.object({
    name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 charcters")
    .trim(),
    email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email must not exceed 255 charcters")
    .trim()
    .toLowerCase(),
    password : z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password must not exceed 128 characters"),

});

export type SignupDTO = z.infer<typeof SignupSchema>;