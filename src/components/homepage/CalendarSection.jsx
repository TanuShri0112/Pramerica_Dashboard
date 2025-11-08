import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';

export function CalendarSection() {
  const navigate = useNavigate();
  
  const events = [
    {
      id: 1,
      title: 'General Engineering Design Review',
      time: '9:30 AM - 11:00 AM',
      date: 'Today',
      type: 'workshop',
    },
    {
      id: 2,
      title: 'Computer Engineering Secure Coding Stand-up',
      time: '1:00 PM - 1:45 PM',
      date: 'Today',
      type: 'standup',
    },
    {
      id: 3,
      title: 'Contract Specialist Negotiation Lab',
      time: '3:00 PM - 4:15 PM',
      date: 'Tomorrow',
      type: 'simulation',
    },
    {
      id: 4,
      title: 'Program Manager Risk Sync',
      time: '10:30 AM - 11:30 AM',
      date: 'Thu, Nov 13',
      type: 'meeting',
    },
    {
      id: 5,
      title: 'Business & Industry Analytics Briefing',
      time: '2:00 PM - 3:00 PM',
      date: 'Fri, Nov 14',
      type: 'briefing',
    },
  ];

  const getEventTypeStyles = (type) => {
    switch (type) {
      case 'workshop':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'standup':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'simulation':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'meeting':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'briefing':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };
  
  const handleViewCalendar = () => {
    navigate('/calendar');
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between pb-3 pt-4 px-4 bg-slate-50 border-b border-gray-100">
        <CardTitle className="text-lg font-semibold text-slate-700">Calendar</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <ScrollArea className="h-[220px] pr-3">
          {events.length > 0 ? (
            <div className="space-y-3 mt-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white p-3 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm text-slate-700">{event.title}</h3>
                      <p className="text-xs text-gray-600">{event.time}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-md border ${getEventTypeStyles(event.type)}`}>
                      {event.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-24 text-gray-500">
              <CalendarIcon className="h-8 w-8 mb-2 text-gray-400" />
              <p className="text-sm">No upcoming events</p>
            </div>
          )}
        </ScrollArea>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-4 hover:bg-slate-50 transition-colors border-gray-200"
          onClick={handleViewCalendar}
        >
          View Calendar
        </Button>
      </CardContent>
    </Card>
  );
}