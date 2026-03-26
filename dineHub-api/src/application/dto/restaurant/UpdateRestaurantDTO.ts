import { z } from 'zod'

export const UpdateRestaurantSchema = z.object({
    name: z
    .string()
    .min(2, "Restaurant name must be at least 2 characters")
    .max(255)
    .trim()
    .optional(),
    address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500)
    .trim()
    .optional(),
    phone: z 
    .string()
    .min(7, "Phone must be at least 7 characters")
    .max(20)
    .trim()
    .optional(),
    email: z
    .string()
    .email("Invalid email address")
    .max(255)
    .trim()
    .toLowerCase()
    .optional()
    .or(z.literal("")),
    description: z
    .string()
    .max(2000)
    .trim()
    .optional()
    .or(z.literal(""))
        

})

export type UpdateRestaurantDTO = z.infer<typeof UpdateRestaurantSchema>