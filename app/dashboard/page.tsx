// app/dashboard/page.tsx
'use client';

import { useState } from 'react';
import Header from '@/components/UI/header';
import TempleList from '@/components/temples/TempleList';
import DashboardSummary from '@/app/dashboard/DashboardSummary';

interface Temple {
    id: string;
    name: string;
    address: string;
    imageUrl: string;
    subscriberCount: number;
    donationCount: number;
    manager: string | null;
  }
  
  export default function DashboardPage() {
    // Sample temple data
    const [temples, setTemples] = useState<Temple[]>([
      {
        id: '1',
        name: 'Omkareswara Temple',
        address: 'Rajeev Nagar Rd, Rajiv Nagar, Akshay Colony, Hubballi, Karnataka',
        imageUrl: '/omkar.jpg',
        subscriberCount: 155,
        donationCount: 42,
        manager: 'Kotappa Patil'
      },
      {
        id: '2',
        name: 'Shri Ganapati Temple',
        address: 'Rajeev Nagar Rd, Rajiv Nagar, Akshay Colony, Hubballi, Karnataka',
        imageUrl: '/ganesh.jpeg',
        subscriberCount: 64,
        donationCount: 15,
        manager: 'Kiran Potdar'
      },
      {
        id: '3',
        name: 'Shri Ganapati Temple',
        address: 'Rajeev Nagar Rd, Rajiv Nagar, Akshay Colony, Hubballi, Karnataka',
        imageUrl: '/ganesh.jpeg',
        subscriberCount: 64,
        donationCount: 15,
        manager: null
      }
    ]);
  
    // Calculate dashboard stats
    const dashboardStats = {
      totalTemples: temples.length,
      totalSubscribers: temples.reduce((sum, temple) => sum + temple.subscriberCount, 0),
      totalDonations: temples.reduce((sum, temple) => sum + temple.donationCount, 0),
      managedTemples: temples.filter(temple => temple.manager !== null).length
    };
  
    const handleAddTemple = () => {
      // This would typically navigate to or open a modal for adding a new temple
      console.log('Add new temple clicked');
    };
  
    return (
      <div className="container mx-auto px-4 py-4 max-w-screen-xl">
        <Header title="All Temples" showAddButton={true} onAddClick={handleAddTemple} />
        <DashboardSummary stats={dashboardStats} />
        <TempleList temples={temples} />
      </div>
    );
  }