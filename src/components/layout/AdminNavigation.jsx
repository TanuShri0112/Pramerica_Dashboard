import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Users, Activity, Workflow, Calendar, BookOpen, Download,
  HelpCircle, Upload, Star, MessageSquare, Lock, Globe, Tag,
  LayoutDashboard, ClipboardList, Shield, Video, 
  Cpu, Info, Mail, Layers, AtSign, GraduationCap, Trophy, FileText, Sparkles
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const AdminMenuItem = ({ 
  label, 
  to, 
  active, 
  icon, 
  onClick,
  collapsed = false 
}) => {
  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={to}
            onClick={onClick}
            className={cn(
              "flex items-center gap-3 py-2 rounded-md transition-colors",
              active 
                ? "bg-primary/20 text-primary font-medium shadow-sm" 
                : "text-gray-700 hover:bg-primary/10 hover:shadow-sm",
              "justify-center px-2 relative overflow-hidden"
            )}
          >
            <span className="absolute inset-0 bg-primary/5 transform scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-md"></span>
            {icon}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" className="z-50 animate-in fade-in-80 zoom-in-95 duration-200">
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        "group flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
        active 
          ? "bg-primary/20 text-primary font-medium shadow-sm" 
          : "text-gray-700 hover:bg-primary/10 hover:text-primary",
        "justify-start relative overflow-hidden"
      )}
    >
      <span className="absolute inset-0 bg-primary/5 transform origin-left scale-x-0 group-hover:scale-x-100 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
      <span className="text-gray-700">
        {icon}
      </span>
      <span className="group-hover:translate-x-1 transition-transform duration-300">{label}</span>
    </Link>
  );
};

export const AdminNavigation = ({ 
  pathname, 
  onItemClick,
  collapsed = false 
}) => {
  const adminItems = [
    { icon: <Cpu size={collapsed ? 22 : 18} className="text-gray-700" />, label: "API", path: "/admin/api" },
    { icon: <Info size={collapsed ? 22 : 18} className="text-gray-700" />, label: "About", path: "/admin/about" },
    { icon: <Users size={collapsed ? 22 : 18} className="text-gray-700" />, label: "Accounts", path: "/admin/accounts" },
    { icon: <Activity size={collapsed ? 22 : 18} className="text-gray-700" />, label: "Activity display", path: "/admin/activity" },
    { icon: <Workflow size={collapsed ? 22 : 18} className="text-gray-700" />, label: "Automation", path: "/admin/automation" },
    { icon: <Calendar size={collapsed ? 22 : 18} className="text-gray-700" />, label: "Calendar", path: "/admin/calendar" },
    { icon: <BookOpen size={collapsed ? 22 : 18} className="text-gray-700" />, label: "Catalog", path: "/admin/catalog" },
    { icon: <Sparkles size={collapsed ? 22 : 18} className="text-gray-700" />, label: "Copilot", path: "/admin/copilot" },
    { icon: <GraduationCap size={collapsed ? 22 : 18} className="text-gray-700" />, label: "Courses", path: "/admin/courses" },
    { icon: <LayoutDashboard size={collapsed ? 22 : 18} className="text-gray-700" />, label: "Dashboard", path: "/admin/dashboard" },
    { icon: <Mail size={collapsed ? 22 : 18} className="text-gray-700" />, label: "Email", path: "/admin/email" },
    { icon: <Download size={collapsed ? 22 : 18} className="text-gray-700" />, label: "Export", path: "/admin/export" },
    { icon: <Trophy size={collapsed ? 22 : 18} className="text-gray-700" />, label: "Games", path: "/admin/games" },
    { icon: <Layers size={collapsed ? 22 : 18} className="text-gray-700" />, label: "Grading scales", path: "/admin/grading" },
    { icon: <HelpCircle size={collapsed ? 22 : 18} className="text-gray-700" />, label: "Help desk", path: "/admin/help" },
    { icon: <Upload size={collapsed ? 22 : 18} className="text-gray-700" />, label: "Import", path: "/admin/import" },
    { icon: <AtSign size={collapsed ? 22 : 18} className="text-gray-700" />, label: "LTI", path: "/admin/lti" },
    { icon: <Star size={collapsed ? 22 : 18} className="text-gray-700" />, label: "Mastery", path: "/admin/mastery" },
    { icon: <MessageSquare size={collapsed ? 22 : 18} className="text-gray-700" />, label: "Messages", path: "/admin/messages" },
    { icon: <Shield size={collapsed ? 22 : 18} className="text-gray-700" />, label: "Moderate", path: "/admin/moderate" },
    { icon: <Lock size={collapsed ? 22 : 18} className="text-gray-700" />, label: "Permissions", path: "/admin/permissions" },
    { icon: <ClipboardList size={collapsed ? 22 : 18} className="text-gray-700" />, label: "Plans", path: "/admin/plans" },
    { icon: <Shield size={collapsed ? 22 : 18} className="text-gray-700" />, label: "Policies", path: "/admin/policies" },
    { icon: <Globe size={collapsed ? 22 : 18} className="text-gray-700" />, label: "Portal", path: "/admin/portal" },
    { icon: <Tag size={collapsed ? 22 : 18} className="text-gray-700" />, label: "Tagging", path: "/admin/tagging" },
    { icon: <FileText size={collapsed ? 22 : 18} className="text-gray-700" />, label: "Turnitin", path: "/admin/turnitin" },
    { icon: <Video size={collapsed ? 22 : 18} className="text-gray-700" />, label: "ZoomUS API", path: "/admin/zoomus" },
  ];
  
  // Remove duplicated items
  const uniqueAdminItems = adminItems.filter((item, index, self) =>
    index === self.findIndex((t) => t.label === item.label && t.path === item.path)
  );
  
  // Check if we're on a subpage of a section
  const isSubpageActive = (path) => {
    const mainPath = path.split('/').slice(0, 3).join('/');
    return pathname.startsWith(mainPath);
  };
  
  return (
    <div className={cn(
      "py-4 overflow-y-auto scrollbar-none",
      "bg-white"
    )}>
      <div className="space-y-1 px-2">
        {uniqueAdminItems.map((item) => (
          <AdminMenuItem
            key={item.path}
            label={item.label}
            to={item.path}
            icon={item.icon}
            active={pathname === item.path || isSubpageActive(item.path)}
            onClick={onItemClick}
            collapsed={collapsed}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminNavigation;