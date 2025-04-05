// components/temples/details/SubscribersTab.tsx
import React from 'react';

interface Subscriber {
  name: string;
  place: string;
}

interface SubscribersTabProps {
  subscribers: Subscriber[];
}

const SubscribersTab: React.FC<SubscribersTabProps> = ({ subscribers }) => {
  return (
    <div>
      <h2 className="text-xl font-medium text-[color:var(--primary-color)] mb-6">All Subscribers</h2>
      
      <div className="bg-white rounded-lg overflow-hidden border border-orange-100">
        <div className="grid grid-cols-2 bg-[color:var(--card-color)] py-3 px-4">
          <div className="text-[color:var(--primary-color)] font-medium">Name</div>
          <div className="text-[color:var(--primary-color)] font-medium">Place</div>
        </div>
        
        {subscribers.map((subscriber, index) => (
          <div 
            key={index} 
            className="grid grid-cols-2 py-4 px-4 border-t border-orange-100 hover:bg-orange-50"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full mr-3"></div>
              <span className="text-[color:var(--primary-color)]">{subscriber.name}</span>
            </div>
            <div className="text-[color:var(--secondary-color)]">{subscriber.place}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscribersTab;