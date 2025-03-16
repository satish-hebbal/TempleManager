// components/temples/forms/TempleDetailsForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/UI/button';
import { useTempleForm } from '@/context/TempleFormContext';
import { templeDetailsSchema } from '@/utils/TempleFormContext';

const TempleDetailsForm: React.FC = () => {
  const { formData, updateFormData, goToNextStep, goToPreviousStep } = useTempleForm();

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(templeDetailsSchema),
    defaultValues: {
      establishmentDate: formData.establishmentDate || '',
      founderName: formData.founderName || '',
      managementTrust: formData.managementTrust || '',
      jatraDate: formData.jatraDate || '',
      priestLeaderName: formData.priestLeaderName || '',
      timingFrom: formData.timingFrom || '9:00 AM',
      timingTo: formData.timingTo || '6:00 PM',
      description: formData.description || ''
    }
  });

  const onSubmit = (data: any) => {
    updateFormData({
      establishmentDate: data.establishmentDate,
      founderName: data.founderName,
      managementTrust: data.managementTrust,
      jatraDate: data.jatraDate,
      priestLeaderName: data.priestLeaderName,
      timingFrom: data.timingFrom,
      timingTo: data.timingTo,
      description: data.description
    });
    
    goToNextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-medium text-[color:var(--accent1-color)] mb-6">Temple Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Date of Establishment */}
        <div>
          <label className="block text-[color:var(--primary-color)] mb-2">
            Date of Establishment
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[color:var(--secondary-color)]">
              <span className="material-icons" style={{ fontSize: "20px" }}>calendar_today</span>
            </span>
            <input
              type="date"
              {...register('establishmentDate')}
              className="w-full border border-orange-200 rounded-md p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>
          {errors.establishmentDate && (
            <p className="text-red-500 text-sm mt-1">{errors.establishmentDate.message}</p>
          )}
        </div>
        
        {/* Name of Trust/Founder */}
        <div>
          <label className="block text-[color:var(--primary-color)] mb-2">
            Name of Trust/Founder
          </label>
          <input
            type="text"
            {...register('founderName')}
            placeholder="Founder/Trust"
            className="w-full border border-orange-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          {errors.founderName && (
            <p className="text-red-500 text-sm mt-1">{errors.founderName.message}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Management/Trust */}
        <div>
          <label className="block text-[color:var(--primary-color)] mb-2">
            Management/Trust
          </label>
          <input
            type="text"
            {...register('managementTrust')}
            placeholder="Management/Trust name"
            className="w-full border border-orange-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          {errors.managementTrust && (
            <p className="text-red-500 text-sm mt-1">{errors.managementTrust.message}</p>
          )}
        </div>
        
        {/* Jatra Mohotsava */}
        <div>
          <label className="block text-[color:var(--primary-color)] mb-2">
            Jatra Mohotsava
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[color:var(--secondary-color)]">
              <span className="material-icons" style={{ fontSize: "20px" }}>calendar_today</span>
            </span>
            <input
              type="date"
              {...register('jatraDate')}
              className="w-full border border-orange-200 rounded-md p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        {/* Priest/Leader */}
        <div>
          <label className="block text-[color:var(--primary-color)] mb-2">
            Priest/Leader
          </label>
          <input
            type="text"
            {...register('priestLeaderName')}
            placeholder="Name of Priest/Leader"
            className="w-full border border-orange-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          {errors.priestLeaderName && (
            <p className="text-red-500 text-sm mt-1">{errors.priestLeaderName.message}</p>
          )}
        </div>
      </div>
      
      {/* Timings */}
      <div className="mb-6">
        <label className="block text-[color:var(--primary-color)] mb-2">
          Timings
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="time"
            {...register('timingFrom')}
            className="border border-orange-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <span className="text-[color:var(--primary-color)]">To</span>
          <input
            type="time"
            {...register('timingTo')}
            className="border border-orange-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>
        {(errors.timingFrom || errors.timingTo) && (
          <p className="text-red-500 text-sm mt-1">Please specify both opening and closing times</p>
        )}
      </div>
      
      {/* Description (Historic Significance) */}
      <div className="mb-6">
        <label className="block text-[color:var(--primary-color)] mb-2">
          Description (Historic Significance)
        </label>
        <textarea
          {...register('description')}
          rows={5}
          placeholder="Write Historic Significance of this Temple"
          className="w-full border border-orange-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
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
          Next
        </Button>
      </div>
    </form>
  );
};

export default TempleDetailsForm;