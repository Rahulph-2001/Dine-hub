import { z} from 'zod'

export const CreateRestaurantSchema = z.object({
    name: z
    .string()
    .min(2, "Restaurant name must be at least 2 characters")
    .max(255,"Restaurant name must not exceed 255 characters")
    .trim(),
    address: z
    .string()
    .min(5, "Address must be at least 5 charcters")
    .max(500, "Address must not exceed 20 characters")
    .trim(),
    phone: z
    .string()
    .min(7,"Phone must be atleast 7 characters")
    .max(20,"Phone must not exceed 20 characters")
    .trim(),
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
    .max(2000,"Description must not exceed 2000 charcters")
    .trim()
    .optional()
    .or(z.literal(""))
});

export type CreateRestaurantDTO = z.infer<typeof CreateRestaurantSchema>;