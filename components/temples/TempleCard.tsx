// components/temples/TempleCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from "@/components/UI/card";
import { Button } from "@/components/UI/button";
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
    <Card className="flex p-4 mb-6 border bg-[color:var(--card-color)] border-orange-200 rounded-lg shadow-sm hover:shadow-md transition-all">
      <div className="w-64 h-32 relative mr-4">
        <Image
          src={temple.imageUrl || `/omkar.jpg`}
          alt={temple.name}
          fill
          className="object-cover rounded-md"
        />
      </div>
      
      <CardContent className="flex-1 p-0 flex flex-col">
        <div className="flex justify-between items-start w-full">
          <div>
            <h2 className="text-xl font-medium text-[color:var(--primary-color)]">{temple.name}</h2>
            <p className="text-sm text-[color:var(--secondary-color)]">{temple.address}</p>
          </div>
          
          <Link href={`/dashboard/temples/${temple.id}`} className="text-[color:var(--primary-color)] hover:text-orange-700 flex items-center">
            View 
            <span className="material-icons ml-1" style={{ fontSize: "18px" }}>open_in_new</span>
          </Link>
        </div>
        
        
        <div className="flex justify-between items-center mt-auto pt-4">
          <div className="flex space-x-8">
            <div>
              <p className="text-md font-medium text-[color:var(--primary-color)]">{temple.subscriberCount} Subscribers</p>
            </div>
            <div>
              <p className="text-md font-medium text-[color:var(--primary-color)]">{temple.donationCount} Donations</p>
            </div>
          </div>
          
          {temple.manager ? (
            <div className="flex items-center">
              <p className="text-[color:var(--primary-color)] mr-2">Manager</p>
              <p className="font-medium text-[color:var(--primary-color)]">{temple.manager}</p>
            </div>
          ) : (
            <Button variant="outline" className="bg-orange-100 text-[color:var(--primary-color)] border-orange-200 hover:bg-orange-200 hover:text-[color:var(--accent1-color)] rounded-full px-4 py-1 h-8 flex items-center">
              <span className="material-icons mr-2" style={{ fontSize: "18px" }}>person_add</span>
              Assign Manager
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TempleCard;