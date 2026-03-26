export interface RestaurantResponseDTO {
    id: string;
    name: string;
    address: string
    phone: string;
    email: string | null
    description : string | null;
    imageUrl: string | null;
    createBy: string;
    createdAt: Date;
    updatedAt: Date;
}