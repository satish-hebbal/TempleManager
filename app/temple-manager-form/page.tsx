// app/temple-manager-form/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/UI/header';
import TempleManagerForm from '@/components/TempleManagerForm';

export default function TempleManagerFormPage() {
  const searchParams = useSearchParams();
  const [templeInfo, setTempleInfo] = useState<{ id: string; name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const templeId = searchParams.get('templeId');
    const token = searchParams.get('token');

    if (templeId && token) {
      // In a real app, you would validate the token and fetch temple info
      // For now, we'll simulate this with mock data
      const mockTemples = [
        { id: '1', name: 'Omkareswara Temple' },
        { id: '2', name: 'Shri Ganapati Temple' },
        { id: '3', name: 'Shri Hanuman Temple' },
        { id: 't1', name: 'Omkareswara Temple' },
        { id: 't2', name: 'Shri Ganapati Temple' },
        { id: 't3', name: 'Shri Hanuman Temple' }
      ];

      const temple = mockTemples.find(t => t.id === templeId);
      if (temple) {
        setTempleInfo(temple);
      }
    }
    
    setLoading(false);
  }, [searchParams]);

  const handleFormSubmit = (data: any) => {
    console.log('Manager form submitted:', data);
    console.log('For temple:', templeInfo);
    
    // Here you would typically send the data to your backend API
    // and handle the manager assignment process
  };

  const handleFormClose = () => {
    // Close the tab or redirect
    window.close();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-4 max-w-screen-xl">
          <Header title="Temple Manager" showAddButton={false} />
          <div className="flex items-center justify-center h-64">
            <div className="text-[#CC5C1F] text-lg">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!templeInfo) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-4 max-w-screen-xl">
          <Header title="Temple Manager" showAddButton={false} />
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h1 className="text-2xl text-red-900 mb-4">Invalid Link</h1>
              <p className="text-gray-600">This temple manager assignment link is invalid or has expired.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4 max-w-screen-xl">
        <Header title="Temple Manager" showAddButton={false} />
        <TempleManagerForm
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
          temples={[templeInfo]} // Pre-populate with the specific temple
        />
      </div>
    </div>
  );
}