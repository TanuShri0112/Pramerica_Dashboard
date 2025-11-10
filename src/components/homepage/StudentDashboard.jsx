import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, Clock, MessageSquare, Users, BarChart, Bell, ChevronRight, Plus } from 'lucide-react';
import TextReader from '@/components/accessibility/TextReader';
import {WelcomeSection} from './WelcomeSection';
import TeachingCoursesSection from './TeachingCoursesSection';
import ZoomClassesSection from './ZoomClassesSection';
import WidgetsSection from './WidgetsSection';
import TaskListSection from './TaskListSection';
import {AnnouncementSection} from './AnnouncementSection';
import {CalendarSection} from './CalendarSection';

export function StudentDashboard() {
  const dashboardNarration = useMemo(
    () =>
      [
        'Student dashboard overview.',
        'The top navigation bar provides access to alerts, profile shortcuts, and quick actions.',
        'The main column contains the welcome briefing, current teaching courses, upcoming Zoom classes, and productivity widgets to monitor progress.',
        'The right column includes the personal task list, organization announcements, and a mini calendar for upcoming events.',
        'Use the sections to keep track of schedules, assignments, and communications.'
      ].join(' '),
    []
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-emerald-700">Student Dashboard</h1>
          <p className="text-sm text-gray-600">
            Need a quick orientation? Press the speaker button to hear what each area of the dashboard covers.
          </p>
        </div>
        <TextReader text={dashboardNarration} label="Read dashboard overview" className="justify-end" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
    </div>
  );
}

export default StudentDashboard;