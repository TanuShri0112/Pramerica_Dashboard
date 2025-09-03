import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MainNavigation } from './MainNavigation';
import { ChevronLeft, BookOpen } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/contexts/SidebarContext';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export const SidebarNav = ({ onCloseMobile }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { 
    isMainCollapsed, 
    setMainCollapsed
  } = useSidebar();
  
  const handleClick = () => {
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const handleLogoClick = () => {
    navigate('/');
    if (isMainCollapsed) {
      setMainCollapsed(false);
    }
  };

  const toggleCollapsed = () => {
    setMainCollapsed(!isMainCollapsed);
  };

  const renderTooltip = (content, children) => {
    if (isMainCollapsed) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            {children}
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-white border shadow-sm">
            {content}
          </TooltipContent>
        </Tooltip>
      );
    }
    return children;
  };
  
  // Check if we're in unit creator mode
  const isUnitCreator = pathname.includes('/units/creator');
  
  return (
    <nav 
      className={cn(
        "h-full flex flex-col bg-white border-r border-gray-200 shadow-sm transition-all duration-300",
        isMainCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div 
        className={cn(
          "flex h-16 items-center border-b border-gray-100 bg-blue-600",
          isMainCollapsed ? "px-3 justify-center" : "px-6 justify-between"
        )}
      >
        <div 
          className="cursor-pointer flex items-center gap-3"
          onClick={handleLogoClick}
        >
          {isMainCollapsed ? (
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/20">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/20">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div className="text-white">
                <h1 className="text-lg font-semibold">PRAMERICA</h1>
              </div>
            </div>
          )}
        </div>

        {!isMainCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapsed}
            className="text-white/80 hover:text-white hover:bg-white/10 h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {/* Navigation content */}
      <div className="flex-1 overflow-y-auto py-4">
        <MainNavigation pathname={pathname} onItemClick={handleClick} />
      </div>
    </nav>
  );
};

export default SidebarNav;