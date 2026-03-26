import { injectable } from "inversify";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { ICloudinaryService } from "../../domain/services/ICloudinaryService";
import { env } from "../../config/env";

@injectable()
export class CloudinaryService implements ICloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: env.CLOUDINARY_CLOUD_NAME,
      api_key: env.CLOUDINARY_API_KEY,
      api_secret: env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(fileBuffer: Buffer, folder: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "image",
          transformation: [
            { width: 800, height: 600, crop: "limit" },
            { quality: "auto", fetch_format: "auto" },
          ],
        },
        (error: unknown, result: UploadApiResponse | undefined) => {
          if (error) reject(error);
          else if (result) resolve(result.secure_url);
          else reject(new Error("Upload failed: no result returned"));
        }
      );
      uploadStream.end(fileBuffer);
    });
  }

  async deleteImage(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId);
  }
}
