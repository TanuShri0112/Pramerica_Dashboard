import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  HelpCircle, 
  MessageSquare, 
  BookOpen, 
  Settings, 
  ChevronRight 
} from 'lucide-react';

export const HelpSidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  const navItems = [
    {
      name: 'Help Center',
      icon: <HelpCircle className="h-4 w-4" />,
      href: '/help',
      exact: true
    },
    {
      name: 'Getting Started',
      icon: <Home className="h-4 w-4" />,
      href: '/help/getting-started'
    },
    {
      name: 'FAQs',
      icon: <HelpCircle className="h-4 w-4" />,
      href: '/help/faqs'
    },
    {
      name: 'Guides',
      icon: <BookOpen className="h-4 w-4" />,
      href: '/help/guides'
    },
    {
      name: 'Contact Support',
      icon: <MessageSquare className="h-4 w-4" />,
      href: '/help/contact'
    },
    {
      name: 'System Status',
      icon: <Settings className="h-4 w-4" />,
      href: '/help/status'
    }
  ];

  return (
    <div className="w-64 border-r h-full p-4">
      <div className="space-y-4">
        <div className="px-2 py-4">
          <h2 className="text-xl font-semibold">Help & Support</h2>
        </div>
        
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = item.exact 
              ? path === item.href 
              : path.startsWith(item.href);
              
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={`flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center">
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </div>
                {isActive && <ChevronRight className="h-4 w-4" />}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default HelpSidebar;