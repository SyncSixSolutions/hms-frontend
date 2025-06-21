export interface UploadedImage {
  file: File;
  preview: string;
  savedPath?: string;
}

export class ImageUploadService {
  private static readonly UPLOAD_DIR = '/src/assets/images/vehicle/';
  private static readonly PUBLIC_URL_BASE = '/src/assets/images/vehicle/';

  /**
   * Handle multiple image uploads and return preview URLs
   */
  static handleImageUpload(files: FileList): Promise<UploadedImage[]> {
    return new Promise((resolve) => {
      const uploadedImages: UploadedImage[] = [];
      let processedCount = 0;

      Array.from(files).forEach((file) => {
        if (this.isValidImageFile(file)) {
          const reader = new FileReader();
          reader.onload = (e) => {
            uploadedImages.push({
              file,
              preview: e.target?.result as string,
            });
            processedCount++;
            
            if (processedCount === files.length) {
              resolve(uploadedImages);
            }
          };
          reader.readAsDataURL(file);
        } else {
          processedCount++;
          if (processedCount === files.length) {
            resolve(uploadedImages);
          }
        }
      });
    });
  }

  /**
   * Save images to local directory and return public URLs
   */
  static async saveImagesToLocal(images: UploadedImage[], vehicleNumber: string): Promise<string[]> {
    const savedUrls: string[] = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const fileName = this.generateFileName(vehicleNumber, i + 1, image.file.name);
      const savedUrl = await this.saveImageFile(image.file, fileName);
      savedUrls.push(savedUrl);
    }

    return savedUrls;
  }

  /**
   * Generate unique filename for vehicle image
   */
  private static generateFileName(vehicleNumber: string, index: number, originalName: string): string {
    const extension = originalName.split('.').pop() || 'jpg';
    const timestamp = Date.now();
    return `${vehicleNumber.replace(/[^a-zA-Z0-9]/g, '_')}_${index}_${timestamp}.${extension}`;
  }

  /**
   * Save single image file to local directory
   */
  private static async saveImageFile(file: File, fileName: string): Promise<string> {
    try {
      // In a real application, you would upload to your server
      // For now, we'll simulate the save and return a public URL
      const publicUrl = `${this.PUBLIC_URL_BASE}${fileName}`;
      
      // Simulate file save (in real app, you'd make an API call to save the file)
      await this.simulateFileSave(file, fileName);
      
      return publicUrl;
    } catch (error) {
      console.error('Error saving image:', error);
      throw new Error(`Failed to save image: ${fileName}`);
    }
  }

  /**
   * Simulate file save operation
   * In a real application, this would be an API call to your backend
   */
  private static simulateFileSave(file: File, fileName: string): Promise<void> {
    return new Promise((resolve) => {
      // Simulate async operation
      setTimeout(() => {
        console.log(`Image saved: ${fileName} (${file.size} bytes)`);
        resolve();
      }, 100);
    });
  }

  /**
   * Validate if file is a valid image
   */
  private static isValidImageFile(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      console.warn(`Invalid file type: ${file.type}`);
      return false;
    }

    if (file.size > maxSize) {
      console.warn(`File too large: ${file.size} bytes`);
      return false;
    }

    return true;
  }

  /**
   * Remove image from local storage
   */
  static async removeImage(imageUrl: string): Promise<boolean> {
    try {
      // In a real application, you would make an API call to delete the file
      console.log(`Image removed: ${imageUrl}`);
      return true;
    } catch (error) {
      console.error('Error removing image:', error);
      return false;
    }
  }

  /**
   * Get full image URL for display
   */
  static getImageUrl(relativePath: string): string {
    if (relativePath.startsWith('http')) {
      return relativePath; // Already a full URL
    }
    return relativePath.startsWith('/') ? relativePath : `/${relativePath}`;
  }
}
