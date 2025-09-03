import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, Clock, MessageSquare, Users, BarChart, Bell, ChevronRight, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {WelcomeSection} from './WelcomeSection';
import TeachingCoursesSection from './TeachingCoursesSection';
import ZoomClassesSection from './ZoomClassesSection';
import WidgetsSection from './WidgetsSection';
import TaskListSection from './TaskListSection';
import {AnnouncementSection} from './AnnouncementSection';
import {CalendarSection} from './CalendarSection';

export function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
      {/* Main Content - Takes 2/3 of the space on large screens */}
      <div className="space-y-6 min-w-0 lg:col-span-2">
        <WelcomeSection />
        <TeachingCoursesSection />
        <ZoomClassesSection />
        <WidgetsSection />
      </div>
      
      {/* Right Column - Optimized width and spacing */}
      <div className="space-y-4 lg:sticky lg:top-20 w-full lg:col-span-1">
        <TaskListSection />
        <AnnouncementSection />
        <CalendarSection />
      </div>
    </div>
  );
}

export default StudentDashboard;