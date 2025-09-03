import React, { useEffect } from 'react';
import { Outlet, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSidebar } from '@/contexts/SidebarContext';

const GroupDetail = () => {
  const { groupId } = useParams();
  const { setGroupSectionActive, openGroupPanel, closeGroupPanel, setMainCollapsed } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (groupId) {
      setGroupSectionActive(true);
      openGroupPanel(groupId); // Open panel with current group ID
      setMainCollapsed(true); // Always collapse the main sidebar when viewing a group
      
      // For groups with full access (IT group with id 5 or enrolled groups like id 2), 
      // check if we need to navigate
      const hasFullAccess = groupId === "5" || groupId === "2";
      const isAtRootPath = location.pathname === `/groups/view/${groupId}`;
      
      // Only navigate if we're at the root path
      if (isAtRootPath) {
        if (hasFullAccess) {
          navigate(`/groups/view/${groupId}/news`, { replace: true });
        } else {
          navigate(`/groups/view/${groupId}/about`, { replace: true });
        }
      }
    }
    
    // Cleanup when component unmounts or groupId changes
    return () => {
      closeGroupPanel(); // Close panel when navigating away
    };
  }, [groupId, setGroupSectionActive, openGroupPanel, closeGroupPanel, navigate, location.pathname, setMainCollapsed]);

  return (
    <div className="animate-fade-in">
      <Outlet />
    </div>
  );
};

export default GroupDetail;