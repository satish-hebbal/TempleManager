// components/UI/Header.tsx
import Image from 'next/image';
import Link from 'next/link';

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
  // This is now used in the dashboard context
  return (
    <div className="flex justify-between items-center py-4 border-b border-gray-200 mb-6">
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
          <h3 className="text-orange-500 font-medium">Mandir Manthan</h3>
          <h1 className="text-xl font-medium">Temple Manager</h1>
        </div>
      </div>
      
      <div className="flex items-center">
        <h2 className="text-2xl text-orange-500 mr-8">{title}</h2>
        {showAddButton && (
          <button 
            onClick={onAddClick}
            className="bg-orange-500 text-white px-4 py-2 rounded-md flex items-center"
          >
            <span className="material-icons mr-2" style={{ fontSize: "20px" }}>add</span>
            Add new Temple
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;