// components/temples/TempleList.tsx
import React from 'react';
import TempleCard from './TempleCard';

interface Temple {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  subscriberCount: number;
  donationCount: number;
  manager: string | null;
}

interface TempleListProps {
  temples: Temple[];
}

const TempleList: React.FC<TempleListProps> = ({ temples }) => {
  return (
    <div className="mt-4">
      {temples.map((temple) => (
        <TempleCard 
          key={temple.id} 
          temple={temple} 
        />
      ))}
    </div>
  );
};

export default TempleList;