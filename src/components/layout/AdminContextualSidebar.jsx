import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AdminNavigation } from './AdminNavigation';
import { cn } from '@/lib/utils';
import { ChevronLeft, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { useSidebar } from '@/contexts/SidebarContext';
import { useToast } from '@/hooks/use-toast';

const AdminContextualSidebar = ({ isCollapsed }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { closeAdminPanel } = useSidebar();
  const { toast } = useToast();
  
  const handleCloseClick = () => {
    closeAdminPanel();
    navigate('/');
    toast({
      title: "Admin panel closed",
      description: "Returned to main dashboard",
      duration: 2000,
    });
  };
  
  return (
    <div 
      className={cn(
        "h-full flex flex-col bg-white border-r border-gray-200 shadow-sm transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div 
        className={cn(
          "h-16 flex items-center bg-red-600 border-b border-gray-100",
          isCollapsed ? "px-3 justify-center" : "px-4 justify-between"
        )}
      >
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/20">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div className="text-white">
              <h2 className="font-semibold text-sm">Admin Panel</h2>
              <p className="text-xs text-red-200">System Management</p>
            </div>
          </div>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCloseClick}
          className="text-white/80 hover:text-white hover:bg-white/10 h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Navigation */}
      <div className="flex-1">
        <AdminNavigation 
          pathname={pathname}
          collapsed={isCollapsed}
        />
      </div>
    </div>
  );
};

export default AdminContextualSidebar;