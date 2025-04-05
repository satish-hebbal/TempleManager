// components/temples/details/SevaCard.tsx
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/UI/button';

interface Seva {
  id: string;
  name: string;
  description: string;
  amount: number;
  imageUrl?: string;
}

interface SevaCardProps {
  seva: Seva;
}

// Helper function to determine the image source
const getSevaImageSrc = (id?: string): string => {
  if (!id) return "/TEST_seva_images/seva1.png";
  
  switch (id) {
    case "s1": return "/TEST_seva_images/seva1.png";
    case "s2": return "/TEST_seva_images/seva2.png";
    case "s3": return "/TEST_seva_images/seva3.png";
    default: return "/TEST_seva_images/seva1.png";
  }
};

const SevaCard: React.FC<SevaCardProps> = ({ seva }) => {
  // Return null if seva is undefined
  if (!seva) {
    return null;
  }
  
  // Safe image source
  const imageSrc = getSevaImageSrc(seva.id);
  
  return (
    <div className="bg-[color:var(--card-color)] border border-orange-100 rounded-lg p-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-48 h-40 relative">
          <Image
            src={imageSrc}
            alt={seva.name || "Seva Image"}
            fill
            className="object-cover rounded-md"
          />
        </div>
        
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-medium text-[color:var(--primary-color)]">{seva.name}</h3>
              <Button
                variant="outline"
                className="h-8 px-4 py-0 bg-[color:var(--primary-color)] text-white border-none rounded-full hover:bg-[color:var(--accent1-color)]"
              >
                <span className="material-icons mr-1" style={{ fontSize: "16px" }}>edit</span>
                Edit
              </Button>
            </div>
            <p className="text-[color:var(--secondary-color)] mt-2">{seva.description}</p>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div>
              <span className="text-[color:var(--secondary-color)] text-sm">Seva Dakshina</span>
              <p className="text-[color:var(--primary-color)] text-xl font-medium">₹{seva.amount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SevaCard;