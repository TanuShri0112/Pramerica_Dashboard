import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Cpu, Info, Users, Activity, Workflow, Calendar, 
  BookOpen, FileText, Download, HelpCircle, Upload,
  Star, MessageSquare, Lock, Globe, Tag, LayoutDashboard,
  Gamepad2, ClipboardList, Shield, Video,
  Mail, Layers, GraduationCap, AtSign, List, Sparkles
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';

const AdminCard = ({ title, icon, description, path }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer flex items-center p-4 gap-4"
      onClick={() => navigate(path)}
    >
      <div className="bg-primary/10 p-3 rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

const Admin = () => {
  const adminFeatures = [
    { title: "API", icon: <Cpu className="h-5 w-5 text-primary" />, description: "Configure API settings and keys", path: "/admin/api" },
    { title: "About", icon: <Info className="h-5 w-5 text-primary" />, description: "Manage site information and details", path: "/admin/about" },
    { title: "Accounts", icon: <Users className="h-5 w-5 text-primary" />, description: "Configure account settings and user management", path: "/admin/accounts" },
    { title: "Activity display", icon: <Activity className="h-5 w-5 text-primary" />, description: "Manage activity indicators and displays", path: "/admin/activity" },
    { title: "Automation", icon: <Workflow className="h-5 w-5 text-primary" />, description: "Configure automated tasks and workflows", path: "/admin/automation" },
    { title: "Calendar", icon: <Calendar className="h-5 w-5 text-primary" />, description: "Configure calendar settings and events", path: "/admin/calendar" },
    { title: "Catalog", icon: <BookOpen className="h-5 w-5 text-primary" />, description: "Manage course catalog settings", path: "/admin/catalog" },
    { title: "AI Assistant", icon: <AtSign className="h-5 w-5 text-primary" />, description: "Configure AI assistant settings", path: "/admin/ai-assistant" },
    { title: "Copilot", icon: <Sparkles className="h-5 w-5 text-primary" />, description: "Configure AI copilot settings and monitor usage", path: "/admin/copilot" },
    { title: "Courses", icon: <GraduationCap className="h-5 w-5 text-primary" />, description: "Configure course settings and defaults", path: "/admin/courses" },
    { title: "Email", icon: <Mail className="h-5 w-5 text-primary" />, description: "Configure email settings and templates", path: "/admin/email" },
    { title: "Export", icon: <Download className="h-5 w-5 text-primary" />, description: "Export data and settings", path: "/admin/export" },
    { title: "Grading scales", icon: <Layers className="h-5 w-5 text-primary" />, description: "Configure grading scales and rubrics", path: "/admin/grading" },
    { title: "Help desk", icon: <HelpCircle className="h-5 w-5 text-primary" />, description: "Manage help desk and support settings", path: "/admin/help" },
    { title: "Import", icon: <Upload className="h-5 w-5 text-primary" />, description: "Import data from external sources", path: "/admin/import" },
    { title: "LTI", icon: <AtSign className="h-5 w-5 text-primary" />, description: "Configure LTI integration", path: "/admin/lti" },
    { title: "Mastery", icon: <Star className="h-5 w-5 text-primary" />, description: "Configure mastery settings and tracks", path: "/admin/mastery" },
    { title: "Messages", icon: <MessageSquare className="h-5 w-5 text-primary" />, description: "Manage messaging system settings", path: "/admin/messages" },
    { title: "Moderate", icon: <Shield className="h-5 w-5 text-primary" />, description: "Configure moderation settings", path: "/admin/moderate" },
    { title: "Permissions", icon: <Lock className="h-5 w-5 text-primary" />, description: "Configure user roles and permissions", path: "/admin/permissions" },
    { title: "Portal", icon: <Globe className="h-5 w-5 text-primary" />, description: "Manage portal settings and appearance", path: "/admin/portal" },
    { title: "Surveys", icon: <List className="h-5 w-5 text-primary" />, description: "Manage surveys and questionnaires", path: "/admin/surveys" },
    { title: "Tagging", icon: <Tag className="h-5 w-5 text-primary" />, description: "Configure content tagging system", path: "/admin/tagging" },
    { title: "Dashboard", icon: <LayoutDashboard className="h-5 w-5 text-primary" />, description: "Manage admin dashboard settings", path: "/admin/dashboard" },
    { title: "Games", icon: <Gamepad2 className="h-5 w-5 text-primary" />, description: "Configure gamification features", path: "/admin/games" },
    { title: "Plans", icon: <ClipboardList className="h-5 w-5 text-primary" />, description: "Manage subscription plans and features", path: "/admin/plans" },
    { title: "Policies", icon: <Shield className="h-5 w-5 text-primary" />, description: "Configure system policies and rules", path: "/admin/policies" },
    { title: "Turnitin", icon: <FileText className="h-5 w-5 text-primary" />, description: "Configure Turnitin integration", path: "/admin/turnitin" },
    { title: "ZoomUS API", icon: <Video className="h-5 w-5 text-primary" />, description: "Configure Zoom integration settings", path: "/admin/zoomus" },
    // Removed "App center"
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Admin" 
        description="Manage system settings and configurations"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {adminFeatures.map((feature, index) => (
          <AdminCard
            key={index}
            title={feature.title}
            icon={feature.icon}
            description={feature.description}
            path={feature.path}
          />
        ))}
      </div>
    </div>
  );
};

export default Admin;
