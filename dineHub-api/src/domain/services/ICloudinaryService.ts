export interface ICloudinaryService {
    uploadImage(fileBuffer: Buffer, folder: string): Promise<string>;
    deleteImage(publicId: string): Promise< void> 
}