// components/temples/TempleFormContainer.tsx
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '../UI/header';
import StepIndicator from './StepIndicator';
import DeityInfoForm from './forms/DeityInfoForm';
import TempleDetailsForm from './forms/TempleDetailsForm';
import LocationFacilitiesForm from './forms/LocationFacilitiesForm';
import MediaFinalForm from './forms/MediaFinalForm';
import { useTempleForm } from '@/context/TempleFormContext';

const TempleFormContainer: React.FC = () => {
  const { currentStep } = useTempleForm();
  const router = useRouter();

  // Function to render the correct form step
  const renderFormStep = () => {
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Header 
        title="Add New Temple" 
        showAddButton={false}
      />
      
      <div className="flex items-center mb-6">
        <Link 
          href="/dashboard/temples" 
          className="flex items-center text-[color:var(--primary-color)] hover:text-[color:var(--accent1-color)]"
        >
          <span className="material-icons mr-1" style={{ fontSize: "20px" }}>arrow_back</span>
          <span>All Temples</span>
        </Link>
      </div>
      
      <StepIndicator />
      
      <div className="bg-white rounded-lg p-6 mb-8">
        {renderFormStep()}
      </div>
    </div>
  );
};

export default TempleFormContainer;