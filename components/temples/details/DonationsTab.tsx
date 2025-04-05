// components/temples/details/DonationsTab.tsx
import React from 'react';

interface Donation {
  name: string;
  place: string;
  date: string;
  amount: number;
}

interface DonationsTabProps {
  donations: Donation[];
  totalDonation: number;
  templeName: string;
}

const DonationsTab: React.FC<DonationsTabProps> = ({ donations, totalDonation, templeName }) => {
  return (
    <div>
      <div className="mb-8 flex items-start">
        <div className="mr-6">
          <h2 className="text-[color:var(--primary-color)] text-3xl font-medium">₹{totalDonation}</h2>
        </div>
        <div>
          <p className="text-[color:var(--primary-color)]">
            Total Donation Via Mandir Manthan to<br />
            {templeName}
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg overflow-hidden border border-orange-100">
        <div className="grid grid-cols-4 bg-[color:var(--card-color)] py-3 px-4">
          <div className="text-[color:var(--primary-color)] font-medium">Name</div>
          <div className="text-[color:var(--primary-color)] font-medium">Place</div>
          <div className="text-[color:var(--primary-color)] font-medium">Date</div>
          <div className="text-[color:var(--primary-color)] font-medium text-right">Donation amount</div>
        </div>
        
        {donations.map((donation, index) => (
          <div 
            key={index} 
            className="grid grid-cols-4 py-4 px-4 border-t border-orange-100 hover:bg-orange-50"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full mr-3"></div>
              <span className="text-[color:var(--primary-color)]">{donation.name}</span>
            </div>
            <div className="text-[color:var(--secondary-color)]">{donation.place}</div>
            <div className="text-[color:var(--secondary-color)]">{donation.date}</div>
            <div className="text-[color:var(--primary-color)] font-medium text-right">₹{donation.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationsTab;