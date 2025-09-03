import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { NavItem } from './NavItem';
import { cn } from '@/lib/utils';
import { 
  LayoutGrid, FileText, BarChart2, TrendingUp,
  Users, Clock, Settings, 
  X, GraduationCap
} from 'lucide-react';
import { useCourseSidebar } from '@/contexts/CourseSidebarContext';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

export const CourseContextualSidebar = ({ isCollapsed }) => {
  const { courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { closeCourseSidebar, courseTitle } = useCourseSidebar();
  const { toast } = useToast();

  if (!courseId) return null;

  const handleCloseCourseSidebar = () => {
    closeCourseSidebar();
    toast({
      title: "Course sidebar closed",
      description: "Redirecting to courses page",
      duration: 2000,
    });
  };

  const handleNavItemClick = (path) => {
    navigate(path);
    toast({
      title: "Navigation",
      description: `Opened ${path.split('/').pop()}`,
      duration: 1500,
    });
  };
  
  const courseNavItems = [
    { icon: LayoutGrid, label: "Modules", path: `/courses/view/${courseId}/modules` },
    { icon: BarChart2, label: "Scores", path: `/courses/view/${courseId}/scores` },
    { icon: Users, label: "Learners", path: `/courses/view/${courseId}/learners` },
    { icon: GraduationCap, label: "Instructors", path: `/courses/view/${courseId}/instructors` },
    { icon: Clock, label: "Attendance", path: `/courses/view/${courseId}/attendance` },
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
        isCollapsed ? "w-16" : "w-56"
      )}
    >
      {/* Header */}
      <div 
        className={cn(
          "h-16 flex items-center bg-slate-600 border-b border-gray-100",
          isCollapsed ? "px-3 justify-center" : "px-4 justify-between"
        )}
      >
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/20">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <div className="text-white">
              <h2 className="font-semibold text-sm truncate max-w-[130px]">
                {courseTitle || 'Course Menu'}
              </h2>
              <p className="text-xs text-slate-300">Learning Management</p>
            </div>
          </div>
        )}
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleCloseCourseSidebar}
          aria-label="Close course sidebar"
          className="text-white/80 hover:text-white hover:bg-white/10 h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="px-3 space-y-1">
          {courseNavItems.map((item) => (
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
      
      {/* Admin section */}
      <div className="border-t border-gray-100 p-3">
        {renderTooltip("Course Administration", 
          <NavItem
            icon={Settings}
            label="Administration"
            to={`/courses/view/${courseId}/admin`}
            active={location.pathname === `/courses/view/${courseId}/admin` || 
                   location.pathname.startsWith(`/courses/view/${courseId}/admin/`)}
            onClick={() => handleNavItemClick(`/courses/view/${courseId}/admin`)}
            collapsed={isCollapsed}
            className="bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
          />
        )}
      </div>
    </div>
  );
};

export default CourseContextualSidebar;