// components/temples/forms/DeityInfoForm.tsx
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { Button } from '@/components/UI/button';
import { useTempleForm } from '@/context/TempleFormContext';
import { deityInfoSchema, validateFile, MAX_FILE_SIZE, ALLOWED_IMAGE_TYPES } from '@/utils/TempleFormContext';

const DeityInfoForm: React.FC = () => {
  const { formData, updateFormData, goToNextStep } = useTempleForm();
  const [deityImagePreview, setDeityImagePreview] = useState<string | null>(null);
  const [deityImageError, setDeityImageError] = useState<string | null>(null);
  const [otherDeities, setOtherDeities] = useState<string[]>(formData.otherDeities || []);
  const [newDeity, setNewDeity] = useState<string>('');

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    control 
  } = useForm({
    resolver: yupResolver(deityInfoSchema),
    defaultValues: {
      mainDeity: formData.mainDeity || '',
      otherDeities: formData.otherDeities || []
    }
  });

  // Handle deity image upload
  const handleDeityImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      const validationError = validateFile(file);
      
      if (validationError) {
        setDeityImageError(validationError);
        setDeityImagePreview(null);
        return;
      }
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setDeityImagePreview(previewUrl);
      setDeityImageError(null);
      
      // Update form data
      updateFormData({ deityImage: file });
    }
  };

  // Add other deity
  const addOtherDeity = () => {
    if (newDeity.trim() !== '') {
      const updatedDeities = [...otherDeities, newDeity.trim()];
      setOtherDeities(updatedDeities);
      updateFormData({ otherDeities: updatedDeities });
      setNewDeity('');
    }
  };

  // Remove other deity
  const removeOtherDeity = (index: number) => {
    const updatedDeities = otherDeities.filter((_, i) => i !== index);
    setOtherDeities(updatedDeities);
    updateFormData({ otherDeities: updatedDeities });
  };

  // Submit form data
  const onSubmit = (data: any) => {
    updateFormData({
      mainDeity: data.mainDeity,
      otherDeities: otherDeities
    });
    
    goToNextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-medium text-[color:var(--accent1-color)] mb-6">Main Deity Information</h2>
      
      {/* Deity Image Upload */}
      <div className="mb-6">
        <label className="block text-[color:var(--primary-color)] mb-4">Main Deity Image</label>
        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-orange-200 rounded-lg bg-orange-50">
          {deityImagePreview ? (
            <div className="relative w-full max-w-md h-64 mb-4">
              <Image
                src={deityImagePreview}
                alt="Deity preview"
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center text-center mb-4">
              <span className="material-icons text-[color:var(--primary-color)] text-4xl mb-2">
                cloud_upload
              </span>
              <p className="text-[color:var(--primary-color)]">
                Upload Temple Deity Images <span className="text-orange-600">browse</span>
              </p>
              <p className="text-sm text-[color:var(--secondary-color)] mt-2">
                Max 10 MB files are allowed
              </p>
            </div>
          )}
          
          <input
            type="file"
            accept="image/*"
            onChange={handleDeityImageChange}
            className="hidden"
            id="deity-image-upload"
          />
          <label
            htmlFor="deity-image-upload"
            className="bg-orange-100 text-[color:var(--primary-color)] border border-orange-200 hover:bg-orange-200 rounded-full px-4 py-2 cursor-pointer"
          >
            {deityImagePreview ? 'Change Image' : 'Upload Image'}
          </label>
          
          {deityImageError && (
            <p className="text-red-500 text-sm mt-2">{deityImageError}</p>
          )}
        </div>
      </div>
      
      {/* Main Deity Name */}
      <div className="mb-6">
        <label className="block text-[color:var(--primary-color)] mb-2">
          Main Deity Name
        </label>
        <input
          type="text"
          {...register('mainDeity')}
          placeholder="God Worshipped"
          className="w-full border border-orange-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        {errors.mainDeity && (
          <p className="text-red-500 text-sm mt-1">{errors.mainDeity.message}</p>
        )}
      </div>
      
      {/* Other Deities */}
      <div className="mb-6">
        <label className="block text-[color:var(--primary-color)] mb-2">
          Other Deities
        </label>
        
        <div className="flex mb-2">
          <input
            type="text"
            value={newDeity}
            onChange={(e) => setNewDeity(e.target.value)}
            placeholder="Add other deity"
            className="flex-1 border border-orange-200 rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <button
            type="button"
            onClick={addOtherDeity}
            className="bg-orange-100 text-[color:var(--primary-color)] border border-orange-200 hover:bg-orange-200 rounded-r-md px-4 flex items-center"
          >
            <span className="material-icons" style={{ fontSize: "20px" }}>add</span>
            Add
          </button>
        </div>
        
        {/* List of added deities */}
        {otherDeities.length > 0 && (
          <div className="mt-2 space-y-2">
            {otherDeities.map((deity, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between bg-orange-50 p-2 rounded-md"
              >
                <span>{deity}</span>
                <button
                  type="button"
                  onClick={() => removeOtherDeity(index)}
                  className="text-[color:var(--primary-color)] hover:text-[color:var(--accent1-color)]"
                >
                  <span className="material-icons" style={{ fontSize: "20px" }}>close</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Next Button */}
      <div className="flex justify-center mt-8">
        <Button 
          type="submit" 
          className="bg-[color:var(--primary-color)] hover:bg-[color:var(--accent1-color)] text-white rounded-md px-6 py-2"
        >
          Next
        </Button>
      </div>
    </form>
  );
};

export default DeityInfoForm;