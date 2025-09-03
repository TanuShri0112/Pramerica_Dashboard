import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';

const CourseCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 23)); // May 2025
  const [selectedView, setSelectedView] = useState('month');
  
  // Sample events data
  const events = [
    {
      id: 1,
      title: "Course starts",
      date: new Date(2025, 4, 14), // May 14, 2025
      type: "course-start"
    },
    {
      id: 2,
      title: "Course ends",
      date: new Date(2025, 4, 21), // May 21, 2025
      type: "course-end"
    }
  ];

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const getEventsForDate = (date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    // Get the first day of the week for the month view
    const startDate = new Date(monthStart);
    const startDay = startDate.getDay();
    
    // Add previous month days to complete the week
    const previousDays = [];
    for (let i = startDay - 1; i >= 0; i--) {
      const date = new Date(monthStart);
      date.setDate(date.getDate() - (i + 1));
      previousDays.push(date);
    }
    
    // Add next month days to complete the week
    const allDays = [...previousDays, ...days];
    const remainingDays = 42 - allDays.length; // 6 weeks * 7 days
    const nextDays = [];
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(monthEnd);
      date.setDate(date.getDate() + i);
      nextDays.push(date);
    }
    
    const calendarDays = [...allDays, ...nextDays];
    
    return (
      <div className="bg-white">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 border-b">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-3 text-sm font-medium text-gray-600 text-center border-r last:border-r-0">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {calendarDays.map((date, index) => {
            const dayEvents = getEventsForDate(date);
            const isCurrentMonth = isSameMonth(date, currentDate);
            const isToday = isSameDay(date, new Date());
            
            return (
              <div 
                key={index} 
                className={`min-h-[120px] p-2 border-r border-b last:border-r-0 ${
                  !isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white'
                }`}
              >
                <div className={`text-sm font-medium mb-1 ${
                  isToday ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''
                }`}>
                  {format(date, 'd')}
                </div>
                
                {/* Events for this day */}
                {dayEvents.map(event => (
                  <div 
                    key={event.id}
                    className={`text-xs p-1 mb-1 rounded ${
                      event.type === 'course-start' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    return (
      <div className="bg-white">
        {/* Week Header */}
        <div className="grid grid-cols-8 border-b">
          <div className="p-3 text-sm font-medium text-gray-600 border-r">All day</div>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={day} className="p-3 text-sm font-medium text-gray-600 text-center border-r last:border-r-0">
              <div>{day}</div>
              <div className="text-lg font-semibold">{18 + index}</div>
            </div>
          ))}
        </div>
        
        {/* Week Grid with Time Slots */}
        <div className="grid grid-cols-8">
          {/* All day row */}
          <div className="p-3 border-r border-b text-sm"></div>
          <div className="p-3 border-r border-b"></div>
          <div className="p-3 border-r border-b"></div>
          <div className="p-3 border-r border-b text-xs bg-blue-100 text-blue-800 rounded">Course ends</div>
          <div className="p-3 border-r border-b"></div>
          <div className="p-3 border-r border-b"></div>
          <div className="p-3 border-r border-b"></div>
          <div className="p-3 border-b"></div>
          
          {/* Time slots */}
          {Array.from({ length: 10 }, (_, i) => (
            <React.Fragment key={i}>
              <div className="p-3 border-r border-b text-sm text-gray-600">
                {i + 12}am
              </div>
              {Array.from({ length: 7 }, (_, dayIndex) => (
                <div key={dayIndex} className="p-3 border-r border-b min-h-[40px] relative">
                  {i === 0 && dayIndex === 4 && (
                    <div className="absolute top-1 left-1 right-1 bg-blue-500 text-white text-xs p-1 rounded flex items-center justify-center">
                      +
                    </div>
                  )}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  const renderAgendaView = () => {
    const agendaDays = [
      { date: 'Sun May 18', events: ['Nothing going on today'] },
      { date: 'Mon May 19', events: ['Nothing going on today'] },
      { date: 'Tue May 20', events: ['Nothing going on today'] },
      { date: 'Wed May 21', events: ['Nothing going on today'] },
      { date: 'Thu May 22', events: ['Nothing going on today'] },
    ];

    return (
      <div className="space-y-6 bg-white p-6">
        {agendaDays.map((day, index) => (
          <div key={index}>
            <h3 className="font-semibold text-lg mb-2">{day.date}</h3>
            {day.events.map((event, eventIndex) => (
              <p key={eventIndex} className="text-gray-600 ml-4">{event}</p>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold">
            {format(currentDate, 'MMMM yyyy')}
          </h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleToday}>
              Today
            </Button>
            <Button variant="ghost" size="sm" onClick={handlePreviousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* View Toggle Buttons */}
          <div className="flex items-center gap-1 border rounded-lg p-1">
            <Button
              variant={selectedView === 'week' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedView('week')}
              className="text-sm"
            >
              Week
            </Button>
            <Button
              variant={selectedView === 'month' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedView('month')}
              className="text-sm"
            >
              Month
            </Button>
            <Button
              variant={selectedView === 'agenda' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedView('agenda')}
              className="text-sm"
            >
              Agenda
            </Button>
          </div>
          
          {selectedView === 'agenda' && (
            <Button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600">
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Calendar Content */}
      <Card>
        <CardContent className="p-0">
          {selectedView === 'month' && renderMonthView()}
          {selectedView === 'week' && renderWeekView()}
          {selectedView === 'agenda' && renderAgendaView()}
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseCalendar;