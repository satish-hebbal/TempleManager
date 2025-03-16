// context/TempleFormContext.tsx
import React, { createContext, useContext, useState } from 'react';

// Define temple form data structure
export interface TempleFormData {
  // Screen 1: Deity Information
  deityImage?: File | null;
  mainDeity: string;
  otherDeities: string[];

  // Screen 2: Temple Details
  establishmentDate: string;
  founderName: string;
  managementTrust: string;
  jatraDate: string;
  priestLeaderName: string;
  timingFrom: string;
  timingTo: string;
  description: string;

  // Screen 3: Location and Facilities
  address: string;
  googleMap: boolean;
  contactNumber: string;
  entranceFee: 'Free' | 'Free & Paid' | 'Paid';
  feeAmount?: string;
  isParking: boolean;
  isAccommodation: boolean;
  isPhotography: boolean;

  // Screen 4: Media and Final
  templeImages: File[];
  website: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

// Initial state for form data
const initialTempleFormData: TempleFormData = {
  mainDeity: '',
  otherDeities: [],
  establishmentDate: '',
  founderName: '',
  managementTrust: '',
  jatraDate: '',
  priestLeaderName: '',
  timingFrom: '9:00 AM',
  timingTo: '6:00 PM',
  description: '',
  address: '',
  googleMap: false,
  contactNumber: '',
  entranceFee: 'Free',
  feeAmount: '',
  isParking: false,
  isAccommodation: false,
  isPhotography: false,
  templeImages: [],
  website: '',
  socialMedia: {
    facebook: '',
    instagram: '',
    twitter: ''
  }
};

// Create context type
interface TempleFormContextType {
  formData: TempleFormData;
  updateFormData: (data: Partial<TempleFormData>) => void;
  currentStep: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep: (step: number) => void;
  resetForm: () => void;
}

// Create context with initial values
const TempleFormContext = createContext<TempleFormContextType>({
  formData: initialTempleFormData,
  updateFormData: () => {},
  currentStep: 1,
  goToNextStep: () => {},
  goToPreviousStep: () => {},
  goToStep: () => {},
  resetForm: () => {}
});

// Create custom hook to use the context
export const useTempleForm = () => useContext(TempleFormContext);

// Provider component
export const TempleFormProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [formData, setFormData] = useState<TempleFormData>(initialTempleFormData);
  const [currentStep, setCurrentStep] = useState(1);

  // Update form data
  const updateFormData = (data: Partial<TempleFormData>) => {
    setFormData(prevData => ({
      ...prevData,
      ...data
    }));
  };

  // Navigation functions
  const goToNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(prevStep => prevStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= 4) {
      setCurrentStep(step);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData(initialTempleFormData);
    setCurrentStep(1);
  };

  return (
    <TempleFormContext.Provider 
      value={{
        formData,
        updateFormData,
        currentStep,
        goToNextStep,
        goToPreviousStep,
        goToStep,
        resetForm
      }}
    >
      {children}
    </TempleFormContext.Provider>
  );
};