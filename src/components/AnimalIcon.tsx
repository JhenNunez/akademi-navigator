
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimalIconProps {
  name: string;
  imageUrl: string;
  isSelected?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

const AnimalIcon: React.FC<AnimalIconProps> = ({ 
  name, 
  imageUrl, 
  isSelected = false,
  onClick,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'h-16 w-16',
    md: 'h-20 w-20',
    lg: 'h-24 w-24'
  };

  return (
    <div 
      className={cn(
        "flex flex-col items-center p-2 cursor-pointer transition-all duration-200",
        isSelected ? "scale-110" : "hover:scale-105"
      )}
      onClick={onClick}
    >
      <div className={cn(
        "rounded-full overflow-hidden border-4 mb-1",
        sizeClasses[size],
        isSelected ? "border-akademi-orange animate-bounce-in" : "border-gray-200"
      )}>
        <img 
          src={imageUrl} 
          alt={`Ícono de ${name}`} 
          className="h-full w-full object-cover"
        />
      </div>
      {name && (
        <span className={cn(
          "text-center font-medium text-sm",
          isSelected ? "text-akademi-orange" : "text-gray-600"
        )}>
          {name}
        </span>
      )}
    </div>
  );
};

export default AnimalIcon;
