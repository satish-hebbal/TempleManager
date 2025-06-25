import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Image from 'next/image';
import { Button } from '@/components/UI/button';

// Form validation schema
const managerFormSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  dateOfBirth: yup.string().required('Date of birth is required'),
  gender: yup.string().oneOf(['Male', 'Female']).required('Gender is required'),
  emailId: yup.string().email('Please enter a valid email').required('Email is required'),
  contactNumber: yup
    .string()
    .matches(/^\d{10}$/, 'Phone number must be 10 digits')
    .required('Contact number is required'),
  temple: yup.string().required('Please select a temple to manage')
});

interface ManagerFormData {
  profileImage?: File | null;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female';
  emailId: string;
  contactNumber: string;
  temple: string;
}

interface TempleManagerFormProps {
  onSubmit?: (data: ManagerFormData) => void;
  onClose?: () => void;
  temples?: Array<{ id: string; name: string }>;
}

const TempleManagerForm: React.FC<TempleManagerFormProps> = ({ 
  onSubmit, 
  onClose,
  temples = [
    { id: '1', name: 'Omkareswara Temple' },
    { id: '2', name: 'Shri Ganapati Temple' },
    { id: '3', name: 'Shri Hanuman Temple' }
  ]
}) => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ManagerFormData>({
    resolver: yupResolver(managerFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: 'Male',
      emailId: '',
      contactNumber: '',
      temple: ''
    }
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const onFormSubmit = (data: ManagerFormData) => {
    const formData = {
      ...data,
      profileImage
    };
    
    // Show success message
    setShowSuccess(true);
    
    // Call parent onSubmit if provided
    if (onSubmit) {
      onSubmit(formData);
    }
    
    // Reset form
    reset();
    setProfileImage(null);
  };

  const handleBackToHome = () => {
    setShowSuccess(false);
    if (onClose) {
      onClose();
    }
  };

  // Success screen
  if (showSuccess) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center mb-8 shadow-sm border border-orange-100">
          <div className="relative w-16 h-16">
            <Image
              src="/templeLogo.png"
              alt="Temple Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h2 className="text-xl text-[color:var(--primary-color)] mb-2">Thank you for submitting your details.</h2>
          <p className="text-[color:var(--primary-color)]">Your application has been received and is now pending approval.</p>
          <p className="text-[color:var(--primary-color)]">You will be notified via email, Dhanyavad!</p>
        </div>

        <Button
          onClick={handleBackToHome}
          className="border border-[color:var(--primary-color)] text-[color:var(--primary-color)] bg-white hover:bg-gray-50 rounded-full px-8 py-2"
        >
          back to home
        </Button>
      </div>
    );
  }

  // Main form
  return (
    <div className="bg-gray-50 px-6 py-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-medium text-[color:var(--accent1-color)] text-center mb-8">Temple Manager Form</h2>
        
        <div className="bg-white rounded-lg p-8 shadow-sm">
            {/* Profile Image Upload */}
            <div className="flex flex-col items-center mb-8">
              <label className="cursor-pointer">
                <div className="w-32 h-24 border-2 border-dashed border-orange-300 rounded-full flex flex-col items-center justify-center mb-2 bg-orange-50 hover:bg-orange-100 transition-colors">
                  {profileImage ? (
                    <img 
                      src={URL.createObjectURL(profileImage)} 
                      alt="Profile preview" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <>
                      <div className="text-orange-400 text-2xl mb-1">☁️</div>
                      <span className="text-orange-400 text-sm">Upload</span>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              <span className="text-[color:var(--primary-color)] text-sm mb-1">Upload your profile Image</span>
              <span className="text-gray-400 text-xs">Max 10 MB file are allowed</span>
            </div>

            {/* Personal Information Section */}
            <div className="mb-6">
              <h3 className="text-[color:var(--primary-color)] text-lg font-medium mb-4">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* First Name */}
                <div>
                  <label className="block text-[color:var(--primary-color)] text-sm mb-2">First Name</label>
                  <input
                    type="text"
                    {...register('firstName')}
                    placeholder="First Name"
                    className="w-full border border-orange-200 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-[color:var(--primary-color)] text-sm mb-2">Last Name</label>
                  <input
                    type="text"
                    {...register('lastName')}
                    placeholder="Last Name"
                    className="w-full border border-orange-200 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Date of Birth */}
                <div>
                  <label className="block text-[color:var(--primary-color)] text-sm mb-2">Date of birth</label>
                  <div className="relative">
                    <input
                      type="date"
                      {...register('dateOfBirth')}
                      placeholder="01 Jan 2000"
                      className="w-full border border-orange-200 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                    />
                  </div>
                  {errors.dateOfBirth && (
                    <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth.message}</p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-[color:var(--primary-color)] text-sm mb-2">Gender</label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        {...register('gender')}
                        value="Male"
                        className="w-4 h-4 text-orange-500 border-orange-300 focus:ring-orange-500"
                      />
                      <span className="ml-2 text-sm text-[color:var(--secondary-color)]">Male</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        {...register('gender')}
                        value="Female"
                        className="w-4 h-4 text-orange-500 border-orange-300 focus:ring-orange-500"
                      />
                      <span className="ml-2 text-sm text-[color:var(--secondary-color)]">Female</span>
                    </label>
                  </div>
                  {errors.gender && (
                    <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="mb-6">
              <h3 className="text-[color:var(--primary-color)] text-lg font-medium mb-4">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email ID */}
                <div>
                  <label className="block text-[color:var(--primary-color)] text-sm mb-2">Email Id</label>
                  <input
                    type="email"
                    {...register('emailId')}
                    placeholder="example@gmail.com"
                    className="w-full border border-orange-200 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                  {errors.emailId && (
                    <p className="text-red-500 text-xs mt-1">{errors.emailId.message}</p>
                  )}
                </div>

                {/* Contact Number */}
                <div>
                  <label className="block text-[color:var(--primary-color)] text-sm mb-2">Contact number</label>
                  <input
                    type="tel"
                    {...register('contactNumber')}
                    placeholder="000-000-0000"
                    className="w-full border border-orange-200 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                  {errors.contactNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.contactNumber.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Select Temple Section */}
            <div className="mb-8">
              <h3 className="text-[color:var(--primary-color)] text-lg font-medium mb-4">Select Temple to Manage</h3>
              
              <div className="relative">
                <select
                  {...register('temple')}
                  className="w-full border border-orange-200 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 appearance-none bg-white text-[color:var(--secondary-color)]"
                >
                  <option value="">Search for temple name</option>
                  {temples.map((temple) => (
                    <option key={temple.id} value={temple.id}>
                      {temple.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <span className="text-gray-400">▼</span>
                </div>
              </div>
              {errors.temple && (
                <p className="text-red-500 text-xs mt-1">{errors.temple.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                type="button"
                onClick={handleSubmit(onFormSubmit)}
                className="bg-[color:var(--primary-color)] hover:bg-[color:var(--accent1-color)] text-white rounded-full px-8 py-3 font-medium"
              >
                Submit for Approval
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default TempleManagerForm;