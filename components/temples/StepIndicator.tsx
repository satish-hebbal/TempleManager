// components/temples/StepIndicator.tsx
import React from 'react';
import { useTempleForm } from '@/context/TempleFormContext';

const StepIndicator: React.FC = () => {
  const { currentStep } = useTempleForm();
  
  const steps = [
    { number: 1, name: "Deity Information" },
    { number: 2, name: "Temple Details" },
    { number: 3, name: "Location & Facilities" },
    { number: 4, name: "Media & Final" }
  ];

  return (
    <div className="flex justify-center mb-6 mt-6">
      <div className="flex items-center space-x-3 px-4">
        {steps.map((step, index) => {
          // Determine if the step is active (current or completed)
          const isActive = currentStep >= step.number;
          
          // The first two steps in the image are dark orange, the last two are light
          return (
            <div 
              key={step.number}
              className={`h-1.25 rounded-full transition-all duration-300 ${
                isActive 
                  ? 'bg-[color:var(--primary-color)]' 
                  : 'bg-orange-200'
              } ${
                index === 0 || index === 1 ? 'w-12' : 'w-12'
              }`}
              title={step.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;