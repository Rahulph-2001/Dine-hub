import { z} from "zod"

export const LoginSchema = z.object({
    email: z
    .string()
    .email("Invalid email address")
    .trim()
    .toLowerCase(),
    password: z
    .string()
    .min(1, "Password is required")
})

export type LoginDTO = z.infer < typeof LoginSchema>;