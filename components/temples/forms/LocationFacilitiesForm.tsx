// components/temples/forms/LocationFacilitiesForm.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/UI/button';
import { useTempleForm } from '@/context/TempleFormContext';
import { locationFacilitiesSchema } from '@/utils/TempleFormContext';

const LocationFacilitiesForm: React.FC = () => {
  const { formData, updateFormData, goToNextStep, goToPreviousStep } = useTempleForm();
  const [entranceFeeType, setEntranceFeeType] = useState<'Free' | 'Free & Paid' | 'Paid'>(
    formData.entranceFee || 'Free'
  );



  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    watch 
  } = useForm({
    resolver: yupResolver(locationFacilitiesSchema),
    defaultValues: {
      address: formData.address || '',
      googleMap: formData.googleMap || false,
      contactNumber: formData.contactNumber || '',
      entranceFee: formData.entranceFee || 'Free',
      feeAmount: formData.feeAmount || '',
      isParking: formData.isParking || false,
      isAccommodation: formData.isAccommodation || false,
      isPhotography: formData.isPhotography || false
    }
  });

  const handleFeeTypeChange = (type: 'Free' | 'Free & Paid' | 'Paid') => {
    setEntranceFeeType(type);
  };

  const onSubmit = (data: any) => {
    updateFormData({
      address: data.address,
      googleMap: data.googleMap,
      contactNumber: data.contactNumber,
      entranceFee: entranceFeeType,
      feeAmount: data.feeAmount,
      isParking: data.isParking,
      isAccommodation: data.isAccommodation,
      isPhotography: data.isPhotography
    });
    
    goToNextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-medium text-[color:var(--accent1-color)] mb-6">Location and Facilities</h2>
      
      {/* Address */}
      <div className="mb-6">
        <label className="block text-[color:var(--primary-color)] mb-2">
          Address
        </label>
        <div className="flex items-center gap-3">
          <input
            type="text"
            {...register('address')}
            placeholder="Add Address manually"
            className="flex-1 border border-orange-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <button
            type="button"
            className="bg-orange-100 text-[color:var(--primary-color)] border border-orange-200 hover:bg-orange-200 rounded-md px-4 py-2 flex items-center gap-2"
          >
            <span className="material-icons" style={{ fontSize: "20px" }}>location_on</span>
            Paste Google Map
          </button>
        </div>
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Contact Number */}
        <div>
          <label className="block text-[color:var(--primary-color)] mb-2">
            Contact number
          </label>
          <input
            type="text"
            {...register('contactNumber')}
            placeholder="000-000-0000"
            className="w-full border border-orange-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          {errors.contactNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.contactNumber.message}</p>
          )}
        </div>
        
        {/* Entrance Fee */}
        <div>
          <label className="block text-[color:var(--primary-color)] mb-2">
            Entrance Fee
          </label>
          <div className="flex gap-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="free"
                name="entranceFee"
                checked={entranceFeeType === 'Free'}
                onChange={() => handleFeeTypeChange('Free')}
                className="mr-2 accent-[color:var(--primary-color)]"
              />
              <label htmlFor="free" className="text-gray-700">Free</label>
            </div>
            
            <div className="flex items-center">
              <input
                type="radio"
                id="freePaid"
                name="entranceFee"
                checked={entranceFeeType === 'Free & Paid'}
                onChange={() => handleFeeTypeChange('Free & Paid')}
                className="mr-2 accent-[color:var(--primary-color)]"
              />
              <label htmlFor="freePaid" className="text-gray-700">Free & Paid</label>
            </div>
            
            <div className="flex items-center">
              <input
                type="radio"
                id="paid"
                name="entranceFee"
                checked={entranceFeeType === 'Paid'}
                onChange={() => handleFeeTypeChange('Paid')}
                className="mr-2 accent-[color:var(--primary-color)]"
              />
              <label htmlFor="paid" className="text-gray-700">Paid</label>
            </div>
          </div>
        </div>
      </div>
      
      {/* Fee Amount (if Paid or Free & Paid) */}
      {(entranceFeeType === 'Paid' || entranceFeeType === 'Free & Paid') && (
        <div className="mb-6">
          <label className="block text-[color:var(--primary-color)] mb-2">
            Fees
          </label>
          <input
            type="text"
            {...register('feeAmount')}
            placeholder="₹000"
            className="w-full max-w-xs border border-orange-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          {errors.feeAmount && (
            <p className="text-red-500 text-sm mt-1">{errors.feeAmount.message}</p>
          )}
        </div>
      )}
      
      {/* Yes/No Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Parking Available */}
        <div>
          <p className="text-[color:var(--primary-color)] mb-2">Is Parking Available?</p>
          <div className="flex gap-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="parkingYes"
                {...register('isParking')}
                value="true"
                checked={watch('isParking') === true}
                onChange={() => updateFormData({ isParking: true })}
                className="mr-2 accent-[color:var(--primary-color)]"
              />
              <label htmlFor="parkingYes" className="text-gray-700">Yes</label>
            </div>
            
            <div className="flex items-center">
              <input
                type="radio"
                id="parkingNo"
                {...register('isParking')}
                value="false"
                checked={watch('isParking') === false}
                onChange={() => updateFormData({ isParking: false })}
                className="mr-2 accent-[color:var(--primary-color)]"
              />
              <label htmlFor="parkingNo" className="text-gray-700">No</label>
            </div>
          </div>
        </div>
        
        {/* Accommodation Available */}
        <div>
          <p className="text-[color:var(--primary-color)] mb-2">Is Accommodation Available?</p>
          <div className="flex gap-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="accommodationYes"
                {...register('isAccommodation')}
                value="true"
                checked={watch('isAccommodation') === true}
                onChange={() => updateFormData({ isAccommodation: true })}
                className="mr-2 accent-[color:var(--primary-color)]"
              />
              <label htmlFor="accommodationYes" className="text-gray-700">Yes</label>
            </div>
            
            <div className="flex items-center">
              <input
                type="radio"
                id="accommodationNo"
                {...register('isAccommodation')}
                value="false"
                checked={watch('isAccommodation') === false}
                onChange={() => updateFormData({ isAccommodation: false })}
                className="mr-2 accent-[color:var(--primary-color)]"
              />
              <label htmlFor="accommodationNo" className="text-gray-700">No</label>
            </div>
          </div>
        </div>
        
        {/* Photography Allowed */}
        <div>
          <p className="text-[color:var(--primary-color)] mb-2">Is Photography allowed?</p>
          <div className="flex gap-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="photographyYes"
                {...register('isPhotography')}
                value="true"
                checked={watch('isPhotography') === true}
                onChange={() => updateFormData({ isPhotography: true })}
                className="mr-2 accent-[color:var(--primary-color)]"
              />
              <label htmlFor="photographyYes" className="text-gray-700">Yes</label>
            </div>
            
            <div className="flex items-center">
              <input
                type="radio"
                id="photographyNo"
                {...register('isPhotography')}
                value="false"
                checked={watch('isPhotography') === false}
                onChange={() => updateFormData({ isPhotography: false })}
                className="mr-2 accent-[color:var(--primary-color)]"
              />
              <label htmlFor="photographyNo" className="text-gray-700">No</label>
            </div>
          </div>
        </div>
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

export default LocationFacilitiesForm;