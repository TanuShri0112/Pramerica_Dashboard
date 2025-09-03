import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { NavItem } from './NavItem';
import { cn } from '@/lib/utils';
import { Info, X, Calendar, Users, Shield, FileText, Newspaper, Activity, MessageCircle } from 'lucide-react';
import { useSidebar } from '@/contexts/SidebarContext';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

export const GroupContextualSidebar = ({ isCollapsed }) => {
  const { groupId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { closeGroupPanel, setGroupSectionActive } = useSidebar();
  const { toast } = useToast();

  if (!groupId) return null;
  
  const hasFullAccess = groupId === "5" || groupId === "2";

  const handleCloseGroupSidebar = () => {
    closeGroupPanel();
    setGroupSectionActive(false);
    navigate('/groups');
    toast({
      title: "Group sidebar closed",
      description: "Returned to groups overview",
      duration: 2000,
    });
  };

  const handleNavItemClick = (path) => {
    navigate(path);
    // Don't show toast for chat navigation
    if (!path.includes('/chat')) {
      toast({
        title: "Navigation",
        description: `Opened ${path.split('/').pop()}`,
        duration: 1500,
      });
    }
  };
  
  const groupNavItems = hasFullAccess ? [
    { icon: Info, label: "Overview", path: `/groups/view/${groupId}/about` },
    { icon: Newspaper, label: "News", path: `/groups/view/${groupId}/news` },
    { icon: Calendar, label: "Calendar", path: `/groups/view/${groupId}/calendar` },
    { icon: MessageCircle, label: "Group Chat", path: `/groups/view/${groupId}/chat` },
    { icon: Users, label: "Members", path: `/groups/view/${groupId}/members` },
    { icon: Shield, label: "Admins", path: `/groups/view/${groupId}/admins` },
    { icon: FileText, label: "Resources", path: `/groups/view/${groupId}/resources` },
  ] : [
    { icon: Info, label: "Overview", path: `/groups/view/${groupId}/about` },
  ];

  const renderTooltip = (content, children) => {
    if (isCollapsed) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent side="right" className="bg-white border shadow-sm">
            {content}
          </TooltipContent>
        </Tooltip>
      );
    }
    return children;
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
          "h-16 flex items-center bg-emerald-600 border-b border-gray-100",
          isCollapsed ? "px-3 justify-center" : "px-4 justify-between"
        )}
      >
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/20">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div className="text-white">
              <h2 className="font-semibold text-sm">Group Menu</h2>
              <p className="text-xs text-emerald-200">Community Hub</p>
            </div>
          </div>
        )}
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleCloseGroupSidebar}
          aria-label="Close group sidebar"
          className="text-white/80 hover:text-white hover:bg-white/10 h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="px-3 space-y-1">
          {groupNavItems.map((item) => (
            <div key={item.path}>
              {renderTooltip(item.label,
                <NavItem
                  icon={item.icon}
                  label={item.label}
                  to={item.path}
                  active={location.pathname === item.path || location.pathname.startsWith(item.path + '/')}
                  onClick={() => handleNavItemClick(item.path)}
                  collapsed={isCollapsed}
                />
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>
      
      {/* Status indicator */}
      <div className="border-t border-gray-100 p-3">
        <div className={cn(
          "flex items-center gap-2 p-2 rounded-lg bg-gray-50",
          isCollapsed ? "justify-center" : "justify-start"
        )}>
          <Activity className={cn(
            "text-emerald-600",
            isCollapsed ? "w-4 h-4" : "w-4 h-4"
          )} />
          {!isCollapsed && (
            <div className="text-gray-700">
              <p className="text-xs font-medium">
                {hasFullAccess ? "Full Access" : "Limited Access"}
              </p>
              <p className="text-xs text-gray-500">
                Group ID: {groupId}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupContextualSidebar;