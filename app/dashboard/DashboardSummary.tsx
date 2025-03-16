// components/dashboard/DashboardSummary.tsx
import React from 'react';
import { Card, CardContent } from "@/components/UI/card";
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
        iconName="temple_hindu"
      />
      <SummaryCard 
        title="Total Subscribers" 
        value={stats.totalSubscribers} 
        iconName="people"
      />
      <SummaryCard 
        title="Total Donations" 
        value={stats.totalDonations} 
        iconName="volunteer_activism"
      />
      <SummaryCard 
        title="Managed Temples" 
        value={stats.managedTemples} 
        iconName="manage_accounts"
      />
    </div>
  );
};

interface SummaryCardProps {
  title: string;
  value: number;
  iconName: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, iconName }) => {
  return (
    <Card className="">
      <CardContent className="p-4 flex items-center">
        <div className="w-12 h-12 rounded-full bg-orange-100 text-[color:var(--primary-color)] flex items-center justify-center mr-4">
          <span className="material-symbols-outlined">{iconName}</span>
        </div>
        <div>
          <p className="text-[color:var(--primary-color)]">{title}</p>
          <p className="text-2xl font-medium text-[color:var(--primary-color)]">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardSummary;