import { z } from "zod"

export const SignupSchema = z
    .object({
        name: z
            .string()
            .min(2, "Name must be at least 2 characters")
            .max(100, "Name must not exceed 100 characters")
            .trim(),
        email: z
            .string()
            .email("Invalid email address")
            .max(255, "Email must not exceed 255 characters")
            .trim()
            .toLowerCase(),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters")
            .max(128, "Password must not exceed 128 characters"),
        confirmPassword: z
            .string()
            .min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type SignupDTO = Omit<z.infer<typeof SignupSchema>, "confirmPassword">;