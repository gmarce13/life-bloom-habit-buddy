
import React from 'react';
import { cn } from '../lib/utils';

interface WidgetProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const Widget: React.FC<WidgetProps> = ({ 
  title, 
  children, 
  className,
  size = 'medium'
}) => {
  const sizeClasses = {
    small: 'col-span-1',
    medium: 'col-span-2',
    large: 'col-span-3'
  };

  return (
    <div className={cn(
      "bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-4 transition-all duration-200 hover:shadow-xl",
      sizeClasses[size],
      className
    )}>
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-sm">
        {title}
      </h3>
      {children}
    </div>
  );
};

export default Widget;
