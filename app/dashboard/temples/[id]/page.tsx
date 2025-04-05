// app/dashboard/temples/[id]/page.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/UI/button';

// Temple details tabs
import AboutTab from '@/components/temples/details/AboutTab';
import TempleSevaTab from '@/components/temples/details/TempleSevaTab';
import DonationsTab from '@/components/temples/details/DonationsTab';
import SubscribersTab from '@/components/temples/details/SubscribersTab';

// Mock data for temple details
const templeData = {
  id: "t1",
  name: "Shri Ganapati Devastana",
  imageUrl: "/TEST_temple_images/temple1.png",
  address: "Rajeev Nagar Rd, Rajiv Nagar, Akshay Colony, Hubballi, Karnataka",
  mainDeity: "Shri Ganesha Devastana",
  otherDeities: ["Shiva", "Nandi", "Nava Graha", "Maruti"],
  timings: "5:AM to 9:00 PM",
  priest: "Shri Govind Acharya",
  phoneNumber: "9856770021",
  trustFounder: "Maha Ganapati Seva Sanga",
  management: "Maha Ganapati Seva Sanga",
  established: "01 Jan 2000",
  jatraDate: "05 March",
  website: "www.Temple.com",
  socialMedia: "www.FaceBook.com/scdv5dfvb",
  historicSignificance: "Shri Ganesha Devastana, Akshay Colony's first Ganapati temple, was built in 1986. A symbol of faith, it continues to unite devotees through prayers, traditions, and grand celebrations.",
  hasManager: false,
  manager: null,
  subscriberCount: 5,
  donationTotal: 5000,
  donations: [
    { name: "Satish Reddy Hebbal", place: "Vidhyanagar, Hubli", date: "01/05/25", amount: 501 },
    { name: "Kiran Potdar", place: "Vidhyanagar, Hubli", date: "01/05/25", amount: 701 },
    { name: "Kumar Kotappa Patil", place: "Vidhyanagar, Hubli", date: "01/05/25", amount: 801 },
    { name: "Shashank Hiremath", place: "Vidhyanagar, Hubli", date: "01/05/25", amount: 701 },
    { name: "Satvik Patil", place: "Vidhyanagar, Hubli", date: "01/05/25", amount: 501 }
  ],
  subscribers: [
    { name: "Satish Reddy Hebbal", place: "Vidhyanagar, Hubli" },
    { name: "Kiran Potdar", place: "Vidhyanagar, Hubli" },
    { name: "Kumar Kotappa Patil", place: "Vidhyanagar, Hubli" },
    { name: "Shashank Hiremath", place: "Vidhyanagar, Hubli" },
    { name: "Satvik Patil", place: "Vidhyanagar, Hubli" }
  ],
  sevas: [
    { 
      id: "s1", 
      name: "Vishesh Puja", 
      description: "A sacred ritual invoking divine blessings and prosperity.", 
      amount: 201,
      imageUrl: "/TEST_seva_images/seva1.png"
    },
    { 
      id: "s2", 
      name: "Vahana Puja", 
      description: "A sacred ritual seeking divine protection and safe journeys.", 
      amount: 501,
      imageUrl: "/TEST_seva_images/seva2.png"
    },
    { 
      id: "s3", 
      name: "Satyanarayana Puja", 
      description: "A sacred ritual honoring Lord Vishnu for prosperity, harmony, and divine blessings.", 
      amount: 501,
      imageUrl: "/TEST_seva_images/seva3.png"
    }
  ]
};

export default function TempleDetailsPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('About');
  
  // Get temple data (in real app, fetch using params.id)
  const temple = templeData; // For now, using mock data

  // Ensure the temple data is valid
  if (!temple) {
    return <div className="container mx-auto px-4 py-6">Temple not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      {/* Header with back button, temple name, and edit button */}
      <div className="flex justify-between items-center mb-4">
        <Link href="/dashboard" className="text-[color:var(--primary-color)] flex items-center rounded-full border border-orange-200 px-4 py-2 hover:bg-orange-50 transition-colors">
          <span className="material-icons mr-1" style={{ fontSize: "18px" }}>arrow_back</span>
          Back
        </Link>
        
        <div className="flex items-center">
          <div className="h-10 w-10 relative mr-2">
            <Image
              src="/TEST_temple_images/temple1.png"
              alt={temple.name}
              fill
              className="object-cover rounded-full"
            />
          </div>
          <h2 className="text-[color:var(--primary-color)] alice-font text-xl">
            {temple.name}
          </h2>
        </div>
        
        <Button 
          className="bg-[color:var(--primary-color)] hover:bg-[color:var(--accent1-color)] text-white rounded-full px-4 py-2 flex items-center gap-2"
        >
          <span className="material-icons" style={{ fontSize: "20px" }}>edit</span>
          Edit Temple Info
        </Button>
      </div>
      
      {/* Navigation Tabs */}
      <div className="bg-orange-100 rounded-full flex justify-center mb-6">
        <div className="flex space-x-2 p-2 w-full max-w-xl mx-auto">
          {['About', 'Temple Seva', 'Donations', 'Subscribers'].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-2 px-4 rounded-full transition-colors ${
                activeTab === tab 
                  ? 'bg-white text-[color:var(--primary-color)] font-medium' 
                  : 'text-[color:var(--primary-color)] hover:bg-orange-50'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      {/* Content based on active tab */}
      <div className="mt-6">
        {activeTab === 'About' && <AboutTab temple={temple} />}
        {activeTab === 'Temple Seva' && <TempleSevaTab sevas={temple.sevas} />}
        {activeTab === 'Donations' && <DonationsTab donations={temple.donations} totalDonation={temple.donationTotal} templeName={temple.name} />}
        {activeTab === 'Subscribers' && <SubscribersTab subscribers={temple.subscribers} />}
      </div>
    </div>
  );
}