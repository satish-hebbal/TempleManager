// components/temples/TempleCard.tsx
import Image from 'next/image';
import Link from 'next/link';

interface Temple {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  subscriberCount: number;
  donationCount: number;
  manager: string | null;
}

interface TempleCardProps {
  temple: Temple;
}

const TempleCard: React.FC<TempleCardProps> = ({ temple }) => {
  return (
    <div className="flex bg-white rounded-lg overflow-hidden p-4 border border-gray-100 shadow-sm mb-4 transition-all duration-200 hover:shadow-md hover:border-orange-200">
      <div className="w-48 h-32 relative mr-4">
        <Image
          src={temple.imageUrl || `/omkar.jpg`}
          alt={temple.name}
          fill
          className="object-cover rounded-md"
        />
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-medium text-orange-500">{temple.name}</h2>
            <p className="text-sm text-gray-500">{temple.address}</p>
          </div>
          
          <Link href={`/dashboard/temples/${temple.id}`} className="text-orange-500 flex items-center">
            View 
            <span className="material-icons ml-1" style={{ fontSize: "18px" }}>open_in_new</span>
          </Link>
        </div>
        
        <div className="flex mt-4 space-x-8">
          <div>
            <p className="text-orange-500 font-medium">{temple.subscriberCount} Subscribers</p>
          </div>
          <div>
            <p className="text-orange-500 font-medium">{temple.donationCount} Donations</p>
          </div>
        </div>
        
        <div className="flex justify-end mt-3">
          {temple.manager ? (
            <div className="flex items-center">
              <p className="text-gray-600 mr-2">Manager</p>
              <p className="font-medium text-orange-500">{temple.manager}</p>
            </div>
          ) : (
            <button className="flex items-center text-orange-500 bg-orange-50 px-4 py-1 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-2" viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c0-.001-.006-.177-.188-.31C12.078 11.94 10.328 11 8 11c-2.33 0-4.078.939-4.813 1.686-.182.132-.188.308-.188.31L3 13h10l-.001-.004z"/>
              </svg>
              Assign Manager
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TempleCard;