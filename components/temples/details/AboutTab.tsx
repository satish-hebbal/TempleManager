import React, { useState } from 'react';
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
  const [showManagerLink, setShowManagerLink] = useState(false);
  const [managerFormLink, setManagerFormLink] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  // Generate a unique link for the temple manager form
  const generateManagerLink = () => {
    const baseUrl = window.location.origin;
    const uniqueId = `temple-${temple.id}-${Date.now()}`;
    const link = `${baseUrl}/temple-manager-form?templeId=${temple.id}&token=${uniqueId}`;
    setManagerFormLink(link);
    setShowManagerLink(true);
  };

  // Open the manager form in a new tab
  const openManagerForm = () => {
    if (managerFormLink) {
      window.open(managerFormLink, '_blank');
    }
  };

  // Copy link to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(managerFormLink);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

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
                <p className="text-[color:var(--primary-color)] mb-4 text-center font-medium">No manager</p>
                
                {!showManagerLink ? (
                  <Button
                    onClick={generateManagerLink}
                    className="bg-[color:var(--primary-color)] hover:bg-[color:var(--accent1-color)] text-white rounded-full px-6 py-2 font-medium"
                  >
                    Assign Manager
                  </Button>
                ) : (
                  <div className="w-full space-y-3">
                    {/* Generated Link Display */}
                    <div className="flex items-center gap-2 p-3 bg-white border border-orange-200 rounded-lg">
                      <input
                        type="text"
                        value={managerFormLink}
                        readOnly
                        className="flex-1 text-sm text-gray-600 bg-transparent border-none outline-none"
                        placeholder="Generated link will appear here"
                      />
                      
                      {/* Open Link Icon */}
                      <button
                        onClick={openManagerForm}
                        className="p-2 text-[color:var(--primary-color)] hover:bg-orange-100 rounded-md transition-colors"
                        title="Open in new tab"
                      >
                        <svg 
                          width="18" 
                          height="18" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15,3 21,3 21,9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </button>
                      
                      {/* Copy Link Icon */}
                      <button
                        onClick={copyToClipboard}
                        className="p-2 text-[color:var(--primary-color)] hover:bg-orange-100 rounded-md transition-colors relative"
                        title={copySuccess ? "Copied!" : "Copy to clipboard"}
                      >
                        {copySuccess ? (
                          <svg 
                            width="18" 
                            height="18" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          >
                            <polyline points="20,6 9,17 4,12"></polyline>
                          </svg>
                        ) : (
                          <svg 
                            width="18" 
                            height="18" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          >
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                        )}
                      </button>
                    </div>
                    
                    {copySuccess && (
                      <p className="text-green-600 text-sm text-center">Link copied to clipboard!</p>
                    )}
                  </div>
                )}
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