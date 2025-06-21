import { useState } from 'react';
import { ImageUploadService, UploadedImage } from './ImageUpload';

export const useVehicleImages = () => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [savedImageUrls, setSavedImageUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    try {
      setUploadError(null);
      const uploadedImages = await ImageUploadService.handleImageUpload(files);
      setImages(prev => [...prev, ...uploadedImages]);
    } catch (error) {
      setUploadError('Failed to process images');
      console.error('Image upload error:', error);
    }

    // Reset input
    event.target.value = '';
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const saveImages = async (vehicleNumber: string): Promise<string[]> => {
    if (images.length === 0) return [];

    try {
      setIsUploading(true);
      setUploadError(null);
      
      const urls = await ImageUploadService.saveImagesToLocal(images, vehicleNumber);
      setSavedImageUrls(urls);
      return urls;
    } catch (error) {
      setUploadError('Failed to save images');
      console.error('Save images error:', error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const clearImages = () => {
    setImages([]);
    setSavedImageUrls([]);
    setUploadError(null);
  };

  const getImagePreviews = (): string[] => {
    return images.map(img => img.preview);
  };

  return {
    images,
    savedImageUrls,
    isUploading,
    uploadError,
    handleImageUpload,
    removeImage,
    saveImages,
    clearImages,
    getImagePreviews
  };
};
