// components/temples/details/AboutTab.tsx
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/UI/button';

interface Temple {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  mainDeity: string;
  otherDeities: string[];
  timings: string;
  priest: string;
  phoneNumber: string;
  trustFounder: string;
  management: string;
  established: string;
  jatraDate: string;
  website: string;
  socialMedia: string;
  historicSignificance: string;
  hasManager: boolean;
  manager: string | null;
}

interface AboutTabProps {
  temple: Temple;
}

const AboutTab: React.FC<AboutTabProps> = ({ temple }) => {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Temple Image and Info */}
        <div className="flex-1">
          <div className="mb-8">
            <div className="relative h-80 w-full mb-4">
              <Image
                src="/TEST_temple_images/temple1.png"
                alt={temple.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              <div className="relative h-16 w-20">
                <Image
                  src="/TEST_temple_images/temple1.png"
                  alt={temple.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="relative h-16 w-20">
                <Image
                  src="/TEST_temple_images/temple2.png"
                  alt="Temple view"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="relative h-16 w-20">
                <Image
                  src="/TEST_temple_images/temple3.png"
                  alt="Temple stairs"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="relative h-16 w-20">
                <Image
                  src="/TEST_temple_images/temple4.png"
                  alt="Temple corridor"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
          
          <div>
            <h1 className="text-3xl font-medium text-[color:var(--primary-color)] mb-2">{temple.mainDeity}</h1>
            <p className="text-[color:var(--secondary-color)] mb-4">{temple.address}</p>
            
            <div className="mb-6">
              <h3 className="text-[color:var(--primary-color)] mb-2">Other Deities</h3>
              <div className="flex flex-wrap gap-2">
                {temple.otherDeities.map((deity, index) => (
                  <span
                    key={index}
                    className="bg-orange-100 text-[color:var(--primary-color)] px-3 py-1 rounded-full text-sm"
                  >
                    {deity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Temple Details Information */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            {temple.hasManager ? (
              <div className="mb-4">
                <h3 className="text-[color:var(--accent1-color)] mb-2 font-medium">Manager</h3>
                <p className="text-[color:var(--primary-color)]">{temple.manager}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-4 bg-orange-50 rounded-lg mb-4">
                <p className="text-[color:var(--primary-color)] mb-2">No manager</p>
                <Button
                  className="bg-[color:var(--primary-color)] hover:bg-[color:var(--accent1-color)] text-white rounded-full px-4 py-2"
                >
                  Assign Manager
                </Button>
              </div>
            )}
            
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="material-icons text-[color:var(--primary-color)] mr-2">schedule</span>
                <span className="text-[color:var(--primary-color)] font-medium w-32">Temple Timings</span>
                <span className="text-[color:var(--secondary-color)]">{temple.timings}</span>
              </div>
              
              <div className="flex items-center">
                <span className="material-icons text-[color:var(--primary-color)] mr-2">person</span>
                <span className="text-[color:var(--primary-color)] font-medium w-32">Priest</span>
                <span className="text-[color:var(--secondary-color)]">{temple.priest}</span>
              </div>
              
              <div className="flex items-center">
                <span className="material-icons text-[color:var(--primary-color)] mr-2">phone</span>
                <span className="text-[color:var(--primary-color)] font-medium w-32">Phone Number</span>
                <span className="text-[color:var(--secondary-color)]">{temple.phoneNumber}</span>
              </div>
              
              <div className="flex items-center">
                <span className="material-icons text-[color:var(--primary-color)] mr-2">people</span>
                <span className="text-[color:var(--primary-color)] font-medium w-32">Trust/Founder</span>
                <span className="text-[color:var(--secondary-color)]">{temple.trustFounder}</span>
              </div>
              
              <div className="flex items-center">
                <span className="material-icons text-[color:var(--primary-color)] mr-2">business</span>
                <span className="text-[color:var(--primary-color)] font-medium w-32">Management</span>
                <span className="text-[color:var(--secondary-color)]">{temple.management}</span>
              </div>
              
              <div className="flex items-center">
                <span className="material-icons text-[color:var(--primary-color)] mr-2">event</span>
                <span className="text-[color:var(--primary-color)] font-medium w-32">Established on</span>
                <span className="text-[color:var(--secondary-color)]">{temple.established}</span>
              </div>
              
              <div className="flex items-center">
                <span className="material-icons text-[color:var(--primary-color)] mr-2">celebration</span>
                <span className="text-[color:var(--primary-color)] font-medium w-32">Jatra Mahostav</span>
                <span className="text-[color:var(--secondary-color)]">{temple.jatraDate}</span>
              </div>
              
              <div className="flex items-center">
                <span className="material-icons text-[color:var(--primary-color)] mr-2">language</span>
                <span className="text-[color:var(--primary-color)] font-medium w-32">Website</span>
                <span className="text-[color:var(--secondary-color)]">{temple.website}</span>
              </div>
              
              <div className="flex items-center">
                <span className="material-icons text-[color:var(--primary-color)] mr-2">share</span>
                <span className="text-[color:var(--primary-color)] font-medium w-32">Social Media</span>
                <span className="text-[color:var(--secondary-color)]">{temple.socialMedia}</span>
              </div>
              
              <div className="flex">
                <span className="material-icons text-[color:var(--primary-color)] mr-2 mt-1">history</span>
                <div>
                  <span className="text-[color:var(--primary-color)] font-medium block">Historic Significance</span>
                  <p className="text-[color:var(--secondary-color)] mt-2">{temple.historicSignificance}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTab;