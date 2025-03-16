// components/UI/Header.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/UI/button";
interface HeaderProps {
  title?: string;
  showAddButton?: boolean;
  onAddClick?: () => void;
}

export const Header = ({ 
  title = "All Temples", 
  showAddButton = true,
  onAddClick = () => {}
}: HeaderProps) => {
  return (
    <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-6">
      <div className="flex items-center">
        <div className="relative w-14 h-14 mr-3">
          <Image 
            src="/templeLogo.png" 
            alt="Mandir Manthan" 
            fill
            className="object-contain"
          />
        </div>
        <div>
          <h3 className="text-xl alice-font font-normal text-[color:var(--primary-color)]">Mandir Manthan</h3>
          <h1 className="text-xl font-medium text-[color:var(--accent1-color)]">Temple Manager</h1>
        </div>
      </div>
      
      <div className="flex items-center">
        {/* <h2 className="text-2xl text-[color:var(--primary-color)] font-normal mr-8">{title}</h2> */}
        {showAddButton && (
          <Button 
            onClick={onAddClick}
            className="bg-[color:var(--primary-color)] hover:bg-[color:var(--accent1-color)] text-white rounded-2xl px-4 py-2 flex items-center gap-2"
          >
            <span className="material-icons" style={{ fontSize: "20px" }}>add</span>
            Add new Temple
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;