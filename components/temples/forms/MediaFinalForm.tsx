// components/temples/forms/MediaFinalForm.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { Button } from '@/components/UI/button';
import { useTempleForm } from '@/context/TempleFormContext';
import { mediaFinalSchema, validateFile, MAX_FILE_SIZE, ALLOWED_IMAGE_TYPES } from '@/utils/TempleFormContext';

interface ImagePreview {
  file: File;
  url: string;
}

const MediaFinalForm: React.FC = () => {
  const { formData, updateFormData, goToPreviousStep, resetForm } = useTempleForm();
  const [imageError, setImageError] = useState<string | null>(null);
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(mediaFinalSchema),
    defaultValues: {
      website: formData.website || '',
      socialMedia: {
        facebook: formData.socialMedia?.facebook || '',
        instagram: formData.socialMedia?.instagram || '',
        twitter: formData.socialMedia?.twitter || ''
      }
    }
  });

  // Handle multiple image upload
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    
    if (files && files.length > 0) {
      const newImagePreviews: ImagePreview[] = [];
      let hasError = false;
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const validationError = validateFile(file);
        
        if (validationError) {
          setImageError(validationError);
          hasError = true;
          break;
        }
        
        newImagePreviews.push({
          file,
          url: URL.createObjectURL(file)
        });
      }
      
      if (!hasError) {
        setImagePreviews([...imagePreviews, ...newImagePreviews]);
        setImageError(null);
        
        // Update form data with files
        const updatedImages = [...formData.templeImages || [], ...Array.from(files)];
        updateFormData({ templeImages: updatedImages });
      }
    }
  };

  // Remove image
  const removeImage = (index: number) => {
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(updatedPreviews);
    
    // Update form data
    const updatedImages = updatedPreviews.map(preview => preview.file);
    updateFormData({ templeImages: updatedImages });
  };

  // Submit form data
  const onSubmit = async (data: any) => {
    // Update form data
    updateFormData({
      website: data.website,
      socialMedia: {
        facebook: data.socialMedia.facebook,
        instagram: data.socialMedia.instagram,
        twitter: data.socialMedia.twitter
      }
    });
    
    // Here you would typically send the complete form data to your API
    try {
      // Mock API call - in a real app, this would send data to your backend
      console.log('Form Data to Submit:', formData);
      
      // Show success notification
      alert('Temple added successfully!');
      
      // Reset form and redirect
      resetForm();
      // Optional: redirect to the temples list
      window.location.href = '/dashboard/temples';
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-medium text-[color:var(--accent1-color)] mb-6">Media and Final Steps</h2>
      
      {/* Temple Images Upload */}
      <div className="mb-6">
        <label className="block text-[color:var(--primary-color)] mb-4">
          Upload Temple Images
        </label>
        <div className="border-2 border-dashed border-orange-200 rounded-lg bg-orange-50 p-6">
          <div className="flex flex-col items-center justify-center">
            <span className="material-icons text-[color:var(--primary-color)] text-4xl mb-2">
              cloud_upload
            </span>
            <p className="text-[color:var(--primary-color)]">
              Upload Temple Images <span className="text-orange-600">browse</span>
            </p>
            <p className="text-sm text-[color:var(--secondary-color)] mt-2">
              Max 10 MB files are allowed
            </p>
            
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagesChange}
              className="hidden"
              id="temple-images-upload"
            />
            <label
              htmlFor="temple-images-upload"
              className="mt-4 bg-orange-100 text-[color:var(--primary-color)] border border-orange-200 hover:bg-orange-200 rounded-full px-4 py-2 cursor-pointer"
            >
              Upload Images
            </label>
            
            {imageError && (
              <p className="text-red-500 text-sm mt-2">{imageError}</p>
            )}
          </div>
          
          {/* Image Previews */}
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <div className="relative h-32 w-full">
                    <Image
                      src={preview.url}
                      alt={`Temple image ${index + 1}`}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="material-icons" style={{ fontSize: "16px" }}>close</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Website */}
      <div className="mb-6">
        <label className="block text-[color:var(--primary-color)] mb-2">
          Website
        </label>
        <input
          type="url"
          {...register('website')}
          placeholder="www.example.com"
          className="w-full border border-orange-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        {errors.website && (
          <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>
        )}
      </div>
      
      {/* Social Media */}
      <div className="mb-6">
        <label className="block text-[color:var(--primary-color)] mb-2">
          Social Media
        </label>
        <input
          type="text"
          {...register('socialMedia.facebook')}
          placeholder="Facebook/ Instagram/ X"
          className="w-full border border-orange-200 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        {errors.socialMedia?.facebook && (
          <p className="text-red-500 text-sm mt-1">{errors.socialMedia.facebook.message}</p>
        )}
        
        <input
          type="text"
          {...register('socialMedia.instagram')}
          placeholder="Instagram URL"
          className="w-full border border-orange-200 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-orange-300 hidden"
        />
        
        <input
          type="text"
          {...register('socialMedia.twitter')}
          placeholder="X (Twitter) URL"
          className="w-full border border-orange-200 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-orange-300 hidden"
        />
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button 
          type="button" 
          onClick={goToPreviousStep}
          className="bg-orange-100 text-[color:var(--primary-color)] border border-orange-200 hover:bg-orange-200 rounded-md px-6 py-2"
        >
          Back
        </Button>
        <Button 
          type="submit" 
          className="bg-[color:var(--primary-color)] hover:bg-[color:var(--accent1-color)] text-white rounded-md px-6 py-2"
        >
          Create
        </Button>
      </div>
    </form>
  );
};

export default MediaFinalForm;