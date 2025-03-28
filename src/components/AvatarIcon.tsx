
import React from 'react';
import { cn } from '@/lib/utils';

interface AvatarIconProps {
  name: string;
  avatarUrl: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const AvatarIcon: React.FC<AvatarIconProps> = ({ 
  name, 
  avatarUrl, 
  isSelected = false,
  onClick 
}) => {
  return (
    <div 
      className={cn(
        "flex flex-col items-center p-3 cursor-pointer transition-all duration-300",
        isSelected ? "scale-110" : "hover:scale-105"
      )}
      onClick={onClick}
    >
      <div className={cn(
        "h-24 w-24 rounded-full overflow-hidden border-4 mb-2",
        isSelected ? "border-akademi-purple" : "border-gray-200"
      )}>
        <img 
          src={avatarUrl} 
          alt={`Avatar de ${name}`} 
          className="h-full w-full object-cover"
        />
      </div>
      <span className={cn(
        "text-center font-medium text-lg",
        isSelected ? "text-akademi-purple" : "text-gray-700"
      )}>
        {name}
      </span>
    </div>
  );
};

export default AvatarIcon;
