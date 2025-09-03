import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SidebarContext = createContext(undefined);

export function SidebarProvider({ children }) {
  const [isMainOpen, setIsMainOpen] = useState(true);
  const [isMainCollapsed, setIsMainCollapsed] = useState(false);
  
  const [isAdminSidebarOpen, setIsAdminSidebarOpen] = useState(false);
  const [isAdminSectionActive, setIsAdminSectionActive] = useState(false);

  const [isGroupSidebarOpen, setIsGroupSidebarOpen] = useState(false);
  const [isGroupSectionActive, setIsGroupSectionActive] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState(null);

  const location = useLocation();
  
  useEffect(() => {
    const isInAdminSection = location.pathname.startsWith('/admin');
    const groupViewRegex = /^\/groups\/view\/([^/]+)/;
    const groupMatch = location.pathname.match(groupViewRegex);
    const isInGroupSection = !!groupMatch;
    const currentGroupId = groupMatch ? groupMatch[1] : null;
    
    const courseViewRegex = /^\/courses\/view\/([^/]+)/;
    const isCourseSection = location.pathname.match(courseViewRegex);
    const lessonContentRegex = /^\/catalog\/[^/]+\/[^/]+\/[^/]+\/[^/]+/;
    const isLessonContent = lessonContentRegex.test(location.pathname);

    if (isInAdminSection) {
      setIsAdminSectionActive(true);
      setIsGroupSectionActive(false);
      setIsGroupSidebarOpen(false);
    } else if (isInGroupSection) {
      setIsGroupSectionActive(true);
      setIsAdminSectionActive(false);
      setActiveGroupId(currentGroupId);
      setIsAdminSidebarOpen(false);
    } else {
      if (!isCourseSection) {
        setIsAdminSidebarOpen(false);
        setIsGroupSidebarOpen(false);
        setIsAdminSectionActive(false);
        setIsGroupSectionActive(false);
        setActiveGroupId(null);
        // Keep sidebar collapsed on immersive lesson content pages
        setIsMainCollapsed(isLessonContent ? true : false);
      }
    }
  }, [location.pathname]);
  
  const toggleMain = () => setIsMainOpen(!isMainOpen);
  const closeMain = () => setIsMainOpen(false);
  
  const toggleAdminSidebar = () => {
    const newState = !isAdminSidebarOpen;
    setIsAdminSidebarOpen(newState);
    if (newState) {
      setIsGroupSidebarOpen(false);
      setIsGroupSectionActive(false);
      setIsMainCollapsed(true);
    } else {
      setIsAdminSectionActive(false);
      setIsMainCollapsed(false);
    }
  };
  
  const openAdminPanel = () => {
    setIsMainCollapsed(true);
    setIsAdminSidebarOpen(true);
    setIsAdminSectionActive(true);
    setIsGroupSidebarOpen(false);
    setIsGroupSectionActive(false);
  };
  
  const closeAdminPanel = () => {
    setIsAdminSidebarOpen(false);
    setIsAdminSectionActive(false);
    setIsMainCollapsed(false);
  };

  const toggleGroupSidebar = () => {
    const newState = !isGroupSidebarOpen;
    setIsGroupSidebarOpen(newState);
    if (newState) {
      setIsAdminSidebarOpen(false);
      setIsAdminSectionActive(false);
      setIsMainCollapsed(true);
    } else {
      setIsGroupSectionActive(false);
      setIsMainCollapsed(false);
    }
  };

  const openGroupPanel = (groupId) => {
    setActiveGroupId(groupId);
    setIsMainCollapsed(true);
    setIsGroupSidebarOpen(true);
    setIsGroupSectionActive(true);
    setIsAdminSidebarOpen(false);
    setIsAdminSectionActive(false);
  };

  const closeGroupPanel = () => {
    setIsGroupSidebarOpen(false);
    setIsGroupSectionActive(false);
    setActiveGroupId(null);
    setIsMainCollapsed(false);
  };

  return (
    <SidebarContext.Provider 
      value={{ 
        isMainOpen, 
        toggleMain, 
        closeMain, 
        
        isAdminSectionActive,
        setAdminSectionActive: setIsAdminSectionActive,
        isMainCollapsed,
        setMainCollapsed: setIsMainCollapsed,
        isAdminSidebarOpen,
        toggleAdminSidebar,
        setAdminSidebarOpen: setIsAdminSidebarOpen,
        openAdminPanel,
        closeAdminPanel,

        isGroupSectionActive,
        setGroupSectionActive: setIsGroupSectionActive,
        isGroupSidebarOpen,
        toggleGroupSidebar,
        setGroupSidebarOpen: setIsGroupSidebarOpen,
        openGroupPanel,
        closeGroupPanel,
        activeGroupId
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}