import React from 'react';
import { cn } from '@/lib/utils';

export const NavItem = ({ 
  icon: Icon, 
  label, 
  to, 
  active = false, 
  collapsed = false, 
  className,
  onClick 
}) => {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "group w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg",
        "transition-all duration-200",
        "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
        active && "bg-blue-50 text-blue-700 border-l-4 border-blue-600",
        collapsed && "justify-center px-2",
        !active && "text-gray-700 hover:text-gray-900",
        className
      )}
      title={collapsed ? label : undefined}
    >
      <Icon className={cn(
        "flex-shrink-0 transition-colors duration-200", 
        collapsed ? "h-5 w-5" : "h-5 w-5",
        active ? "text-blue-600" : "text-gray-500 group-hover:text-gray-700"
      )} />
      
      {!collapsed && (
        <span className="truncate font-medium">
          {label}
        </span>
      )}
    </button>
  );
};

export default NavItem;