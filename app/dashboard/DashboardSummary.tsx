// components/dashboard/DashboardSummary.tsx
import React from 'react';

interface DashboardSummaryProps {
  stats: {
    totalTemples: number;
    totalSubscribers: number;
    totalDonations: number;
    managedTemples: number;
  };
}

const DashboardSummary = ({ stats }: DashboardSummaryProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <SummaryCard 
        title="Total Temples" 
        value={stats.totalTemples} 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 0a1 1 0 0 1 1 1v1h4a1 1 0 1 1 0 2H9v1h3a1 1 0 1 1 0 2H9v1h2a1 1 0 1 1 0 2H9v1h1a1 1 0 1 1 0 2H8v1a1 1 0 1 1-2 0v-1H5a1 1 0 1 1 0-2h1v-1H4a1 1 0 1 1 0-2h2V8H3a1 1 0 1 1 0-2h3V5H2a1 1 0 1 1 0-2h4V2H1a1 1 0 0 1 0-2h7z"/>
          </svg>
        } 
      />
      <SummaryCard 
        title="Total Subscribers" 
        value={stats.totalSubscribers} 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
          </svg>
        } 
      />
      <SummaryCard 
        title="Total Donations" 
        value={stats.totalDonations} 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.25-11.25v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 1.5 0zm0 4v4.25a.75.75 0 0 1-1.5 0v-4.25a.75.75 0 0 1 1.5 0z"/>
          </svg>
        } 
      />
      <SummaryCard 
        title="Managed Temples" 
        value={stats.managedTemples} 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
          </svg>
        } 
      />
    </div>
  );
};

interface SummaryCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex items-center">
      <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center mr-4">
        {icon}
      </div>
      <div>
        <p className="text-gray-600">{title}</p>
        <p className="text-2xl font-medium">{value}</p>
      </div>
    </div>
  );
};

export default DashboardSummary;