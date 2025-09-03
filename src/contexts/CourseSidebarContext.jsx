import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSidebar } from './SidebarContext';

const CourseSidebarContext = createContext(undefined);

export function CourseSidebarProvider({ children }) {
  const [isCourseSection, setIsCourseSection] = useState(false);
  const [isCourseSidebarOpen, setCourseSidebarOpen] = useState(false);
  const [activeCourseId, setActiveCourseId] = useState(null);
  const [courseTitle, setCourseTitle] = useState('Course');
  const [courseAction, setCourseAction] = useState('none');
  const [isEnrollDialogOpen, setEnrollDialogOpen] = useState(false);
  const [isAddCourseDialogOpen, setAddCourseDialogOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { setMainCollapsed, setAdminSidebarOpen, setGroupSidebarOpen } = useSidebar();
  
  useEffect(() => {
    const courseViewRegex = /^\/courses\/view\/([^/]+)/;
    const courseMatch = location.pathname.match(courseViewRegex);
    const isInCourseSection = !!courseMatch;
    const currentCourseId = courseMatch ? courseMatch[1] : null;

    // Only update state if there's an actual change
    if (isInCourseSection !== isCourseSection) {
      setIsCourseSection(isInCourseSection);
    }
    
    if (isInCourseSection && currentCourseId) {
      // Only update if course ID changed
      if (currentCourseId !== activeCourseId) {
        setActiveCourseId(currentCourseId);
      }
      
      // Only open sidebar if it's not already open
      if (!isCourseSidebarOpen) {
        setCourseSidebarOpen(true);
        setMainCollapsed(true);
        
        // Close other contextual sidebars
        setAdminSidebarOpen(false);
        setGroupSidebarOpen(false);
      }
    } else if (!isInCourseSection && isCourseSection) {
      // Only close and expand main sidebar if we're completely leaving the course section
      setCourseSidebarOpen(false);
      setActiveCourseId(null);
      setMainCollapsed(false);
    }
  }, [location.pathname, isCourseSection, activeCourseId, isCourseSidebarOpen, setMainCollapsed, setAdminSidebarOpen, setGroupSidebarOpen]);

  const openCourseSidebar = (courseId, title) => {
    setActiveCourseId(courseId);
    setCourseTitle(title);
    setIsCourseSection(true);
    
    // Use a small delay to ensure state updates are processed
    setTimeout(() => {
      setCourseSidebarOpen(true);
      setMainCollapsed(true);
      
      // Close other contextual sidebars
      setAdminSidebarOpen(false);
      setGroupSidebarOpen(false);
      
      navigate(`/courses/view/${courseId}/modules`);
    }, 50);
  };

  const closeCourseSidebar = () => {
    setCourseSidebarOpen(false);
    setIsCourseSection(false);
    setActiveCourseId(null);
    setMainCollapsed(false);
    navigate('/courses');
  };

  return (
    <CourseSidebarContext.Provider
      value={{
        isCourseSection,
        setIsCourseSection,
        isCourseSidebarOpen,
        setCourseSidebarOpen,
        openCourseSidebar,
        closeCourseSidebar,
        activeCourseId,
        courseTitle,
        setCourseTitle,
        courseAction,
        setCourseAction,
        isEnrollDialogOpen,
        setEnrollDialogOpen,
        isAddCourseDialogOpen,
        setAddCourseDialogOpen
      }}
    >
      {children}
    </CourseSidebarContext.Provider>
  );
}

export function useCourseSidebar() {
  const context = useContext(CourseSidebarContext);
  if (context === undefined) {
    throw new Error('useCourseSidebar must be used within a CourseSidebarProvider');
  }
  return context;
}

export default CourseSidebarContext;