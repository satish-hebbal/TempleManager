// app/dashboard/temples/add/page.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { TempleFormProvider } from '@/context/TempleFormContext';
import StepIndicator from '@/components/temples/StepIndicator';
import DeityInfoForm from '@/components/temples/forms/DeityInfoForm';
import TempleDetailsForm from '@/components/temples/forms/TempleDetailsForm';
import LocationFacilitiesForm from '@/components/temples/forms/LocationFacilitiesForm';
import MediaFinalForm from '@/components/temples/forms/MediaFinalForm';
import { useTempleForm } from '@/context/TempleFormContext';

// Form step renderer component
const FormStepRenderer = () => {
  const { currentStep } = useTempleForm();

  switch (currentStep) {
    case 1:
      return <DeityInfoForm />;
    case 2:
      return <TempleDetailsForm />;
    case 3:
      return <LocationFacilitiesForm />;
    case 4:
      return <MediaFinalForm />;
    default:
      return <DeityInfoForm />;
  }
};

export default function AddTemple() {
  return (
    <TempleFormProvider>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-2xl font-medium text-[color:var(--accent1-color)] mb-6">Add New Temple</h1>
        
        <div className="flex items-center mb-6">
          <Link 
            href="/dashboard" 
            className="flex items-center text-[color:var(--primary-color)] hover:text-[color:var(--accent1-color)]"
          >
            <span className="material-icons mr-1" style={{ fontSize: "20px" }}>arrow_back</span>
            <span>All Temples</span>
          </Link>
        </div>
        
        <StepIndicator />
        
        <div className="bg-white rounded-lg p-6 mb-8">
          <FormStepRenderer />
        </div>
      </div>
    </TempleFormProvider>
  );
}