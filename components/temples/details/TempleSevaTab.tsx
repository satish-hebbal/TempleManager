// components/temples/details/TempleSevaTab.tsx
import React from 'react';
import { Button } from '@/components/UI/button';
import SevaCard from '@/components/temples/details/SevaCard';

interface Seva {
  id: string;
  name: string;
  description: string;
  amount: number;
  imageUrl?: string;
}

interface TempleSevaTabProps {
  sevas: Seva[];
}

const TempleSevaTab: React.FC<TempleSevaTabProps> = ({ sevas = [] }) => {
  // Ensure sevas is an array
  const sevasList = Array.isArray(sevas) ? sevas : [];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium text-[color:var(--accent1-color)]">Temple Sevas</h2>
        <Button 
          className="bg-[color:var(--primary-color)] hover:bg-[color:var(--accent1-color)] text-white rounded-full px-4 py-2 flex items-center gap-2"
        >
          <span className="material-icons" style={{ fontSize: "20px" }}>add</span>
          Add new Seva
        </Button>
      </div>
      
      <div className="space-y-6">
        {sevasList.length > 0 ? (
          sevasList.map((seva) => (
            <SevaCard key={seva.id || Math.random().toString()} seva={seva} />
          ))
        ) : (
          <p className="text-center text-[color:var(--secondary-color)]">No sevas available.</p>
        )}
      </div>
    </div>
  );
};

export default TempleSevaTab;