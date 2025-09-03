import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Edit,
  Trash2, 
  Plus
} from 'lucide-react';
import { 
  format, 
  addMonths, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addHours,
  isSameWeek,
  startOfWeek,
  endOfWeek
} from 'date-fns';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RichTextEditor } from '@/components/ui/rich-text-editor';

const GroupCalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeTab, setActiveTab] = useState('summary');
  const [modalMode, setModalMode] = useState('create');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [events, setEvents] = useState([
    {
      id: 'event-1',
      title: 'Sovereignty 101',
      startDate: new Date(2025, 4, 19, 14, 0), // 2pm
      endDate: new Date(2025, 4, 19, 15, 30),
      allDay: false,
      description: 'Learn about sovereignty principles and applications'
    },
    {
      id: 'event-2',
      title: 'Credit Workshop',
      startDate: new Date(2025, 4, 21, 10, 0), // 10am
      endDate: new Date(2025, 4, 21, 12, 0),
      allDay: false
    }
  ]);
  
  // Event form state
  const [eventTitle, setEventTitle] = useState('');
  const [eventStartDate, setEventStartDate] = useState(null);
  const [eventEndDate, setEventEndDate] = useState(null);
  const [eventAllDay, setEventAllDay] = useState(true);
  const [eventDescription, setEventDescription] = useState('');
  const [repeatEvent, setRepeatEvent] = useState(false);
  const [repeatFrequency, setRepeatFrequency] = useState('daily');
  const [repeatInterval, setRepeatInterval] = useState(1);
  const [repeatEndType, setRepeatEndType] = useState('never');
  const [repeatEndDate, setRepeatEndDate] = useState(null);
  const [repeatEndCount, setRepeatEndCount] = useState(5);
  const [eventsForSelectedDay, setEventsForSelectedDay] = useState([]);
  
  // Reset form to default values
  const resetEventForm = () => {
    setEventTitle('');
    setEventDescription('');
    setEventAllDay(true);
    setRepeatEvent(false);
    setRepeatFrequency('daily');
    setRepeatInterval(1);
    setRepeatEndType('never');
    setRepeatEndDate(null);
    setRepeatEndCount(5);
    setActiveTab('summary');
    setSelectedEvent(null);
  };
  
  // Load event data into form for editing
  const loadEventForEdit = (event) => {
    setEventTitle(event.title);
    setEventStartDate(event.startDate);
    setEventEndDate(event.endDate);
    setEventAllDay(event.allDay);
    setEventDescription(event.description || '');
    setRepeatEvent(event.repeat || false);
    setRepeatFrequency(event.repeatFrequency || 'daily');
    setRepeatInterval(event.repeatInterval || 1);
    setRepeatEndType(event.repeatEndType || 'never');
    setRepeatEndDate(event.repeatEndDate || null);
    setRepeatEndCount(event.repeatEndCount || 5);
    setSelectedEvent(event);
    setActiveTab('summary');
  };
  
  const handlePreviousMonth = () => {
    setCurrentDate(prevDate => addMonths(prevDate, -1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(prevDate => addMonths(prevDate, 1));
  };
  
  // Handle day click based on existing events
  const handleDayClick = (day, dayEvents) => {
    setSelectedDate(day);
    setEventsForSelectedDay(dayEvents);
    
    if (dayEvents.length === 0) {
      // No events for this day, create a new one
      setModalMode('create');
      setEventStartDate(day);
      setEventEndDate(day);
      resetEventForm();
      setIsEventModalOpen(true);
    } else if (dayEvents.length === 1) {
      // Single event, show event actions
      setSelectedEvent(dayEvents[0]);
      setModalMode('view');
      loadEventForEdit(dayEvents[0]);
      setIsEventModalOpen(true);
    } else {
      // Multiple events, show list of events
      setModalMode('event-list');
      setIsEventModalOpen(true);
    }
  };
  
  // Handle selecting an event from the event list
  const handleSelectEventFromList = (event) => {
    setSelectedEvent(event);
    loadEventForEdit(event);
    setModalMode('view');
  };
  
  // Handle creating a new event from the event list
  const handleCreateNewFromList = () => {
    resetEventForm();
    if (selectedDate) {
      setEventStartDate(selectedDate);
      setEventEndDate(selectedDate);
    }
    setModalMode('create');
  };
  
  // Handle edit button click
  const handleEditEvent = () => {
    setModalMode('edit');
  };
  
  // Handle delete button click
  const handleDeleteEvent = () => {
    setConfirmDeleteOpen(true);
  };
  
  // Confirm delete event
  const confirmDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(events.filter(e => e.id !== selectedEvent.id));
      toast.success("Event deleted successfully");
      setConfirmDeleteOpen(false);
      setIsEventModalOpen(false);
      resetEventForm();
    }
  };
  
  const handleToday = () => {
    setCurrentDate(new Date());
  };
  
  const handleSaveEvent = () => {
    if (!eventTitle || !eventStartDate || !eventEndDate) {
      toast.error("Please fill in required fields");
      return;
    }
    
    const eventData = {
      id: selectedEvent?.id || `event-${Date.now()}`,
      title: eventTitle,
      startDate: eventStartDate,
      endDate: eventEndDate,
      allDay: eventAllDay,
      description: eventDescription,
      repeat: repeatEvent,
      repeatFrequency: repeatEvent ? repeatFrequency : undefined,
      repeatInterval: repeatEvent ? repeatInterval : undefined,
      repeatEndType: repeatEvent ? repeatEndType : undefined,
      repeatEndDate: repeatEvent && repeatEndType === 'on' ? repeatEndDate : undefined,
      repeatEndCount: repeatEvent && repeatEndType === 'after' ? repeatEndCount : undefined
    };
    
    if (modalMode === 'edit' && selectedEvent) {
      // Update existing event
      setEvents(prev => prev.map(e => e.id === selectedEvent.id ? eventData : e));
      toast.success("Event updated successfully!");
    } else {
      // Create new event
      setEvents(prev => [...prev, eventData]);
      toast.success("Event added successfully!");
    }
    
    setIsEventModalOpen(false);
    resetEventForm();
  };
  
  const getDaysInMonth = (date) => {
    const firstDay = startOfMonth(date);
    const lastDay = endOfMonth(date);
    return eachDayOfInterval({ start: firstDay, end: lastDay });
  };
  
  const getDaysInWeek = (date) => {
    const start = startOfWeek(date, { weekStartsOn: 0 }); // 0 = Sunday
    const end = endOfWeek(date, { weekStartsOn: 0 });
    return eachDayOfInterval({ start, end });
  };
  
  // Get events for a specific day
  const getEventsForDay = (day) => {
    return events.filter(event => isSameDay(event.startDate, day));
  };

  // Get events for a specific hour on a specific day
  const getEventsForHour = (day, hour) => {
    return events.filter(event => {
      const startHour = event.startDate.getHours();
      const endHour = event.endDate.getHours();
      return isSameDay(event.startDate, day) && (startHour <= hour && hour <= endHour);
    });
  };
  
  const daysInCurrentMonth = getDaysInMonth(currentDate);
  const daysInCurrentWeek = getDaysInWeek(currentDate);
  
  const renderCalendarDays = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    return (
      <div className="grid grid-cols-7 gap-1">
        {daysOfWeek.map(day => (
          <div key={day} className="text-center py-2 font-medium text-sm border-b">
            {day}
          </div>
        ))}
        
        {daysInCurrentMonth.map((day, index) => {
          const dayEvents = getEventsForDay(day);
          const isToday = isSameDay(day, new Date());
          const isCurrentMonth = isSameMonth(day, currentDate);
          
          return (
            <div 
              key={index} 
              className={cn(
                "min-h-[80px] p-1 border text-sm cursor-pointer",
                isToday ? "bg-blue-50" : "hover:bg-gray-50",
                !isCurrentMonth && "opacity-50"
              )}
              onClick={() => handleDayClick(day, dayEvents)}
            >
              <div className={cn(
                "font-medium mb-1", 
                isToday ? "text-blue-600 bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center mx-auto" : ""
              )}>
                {format(day, 'd')}
              </div>
              {dayEvents.length > 0 && (
                <div className="space-y-1">
                  {dayEvents.map((event, idx) => (
                    <div 
                      key={idx} 
                      className="text-xs p-1 rounded truncate group relative bg-green-100 text-green-800 border-l-4 border-green-500"
                      title={event.title}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEvent(event);
                        loadEventForEdit(event);
                        setModalMode('view');
                        setIsEventModalOpen(true);
                      }}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderWeekCalendar = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    
    return (
      <div className="flex flex-col">
        <div className="grid grid-cols-8 border-b bg-muted/30">
          <div className="py-2 px-3 text-sm font-medium border-r">Time</div>
          {daysInCurrentWeek.map((day, i) => (
            <div 
              key={i} 
              className={cn(
                "py-2 text-center text-sm font-medium",
                isSameDay(day, new Date()) && "bg-blue-50"
              )}
            >
              <div className="font-semibold">{format(day, 'EEE')}</div>
              <div className={cn(
                "text-lg mt-1",
                isSameDay(day, new Date()) && "text-blue-600 bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mx-auto"
              )}>
                {format(day, 'd')}
              </div>
            </div>
          ))}
        </div>
        
        <div className="overflow-y-auto h-[500px]">
          {hours.map(hour => (
            <div key={hour} className="grid grid-cols-8 border-b min-h-[60px]">
              <div className="border-r py-1 px-3 text-xs text-muted-foreground">
                {hour === 0 ? '12am' : hour < 12 ? `${hour}am` : hour === 12 ? '12pm' : `${hour-12}pm`}
              </div>
              
              {daysInCurrentWeek.map((day, dayIndex) => {
                const hourEvents = getEventsForHour(day, hour);
                
                return (
                  <div 
                    key={dayIndex} 
                    className={cn(
                      "border-r relative",
                      isSameDay(day, new Date()) && "bg-blue-50/50"
                    )}
                    onClick={() => {
                      const dateWithHour = new Date(day);
                      dateWithHour.setHours(hour);
                      handleDayClick(dateWithHour, hourEvents);
                    }}
                  >
                    {hourEvents.map((event, idx) => (
                      <div
                        key={idx}
                        className="text-xs p-1 rounded truncate absolute z-10 left-0 right-0 mx-1 cursor-pointer bg-green-100 text-green-800 border-l-4 border-green-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEvent(event);
                          loadEventForEdit(event);
                          setModalMode('view');
                          setIsEventModalOpen(true);
                        }}
                      >
                        {event.startDate.getHours() === hour && (
                          <>
                            <span className="font-semibold">
                              {format(event.startDate, 'h:mma')}
                            </span> - {event.title}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderEventList = () => {
    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground mb-2">
          {selectedDate && `Events for ${format(selectedDate, 'MMMM d, yyyy')}`}
        </div>
        
        {eventsForSelectedDay.map((event) => (
          <div 
            key={event.id} 
            className="p-3 border rounded-md cursor-pointer hover:bg-gray-50 border-l-4 border-green-500"
            onClick={() => handleSelectEventFromList(event)}
          >
            <div className="font-medium">{event.title}</div>
            <div className="text-sm text-muted-foreground">
              {format(event.startDate, 'h:mm a')} - {format(event.endDate, 'h:mm a')}
            </div>
          </div>
        ))}
        
        <Button 
          className="w-full mt-4 flex items-center gap-2" 
          onClick={handleCreateNewFromList}
        >
          <Plus className="h-4 w-4" />
          Add New Event
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold">{format(currentDate, 'MMMM yyyy')}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleToday}>
            Today
          </Button>
          <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <div className="ml-4">
            <Button variant={view === 'week' ? 'default' : 'outline'} onClick={() => setView('week')}>
              Week
            </Button>
            <Button variant={view === 'month' ? 'default' : 'outline'} onClick={() => setView('month')}>
              Month
            </Button>
          </div>
        </div>
      </div>
      
      <div className="border rounded-md bg-white shadow">
        {view === 'month' ? renderCalendarDays() : renderWeekCalendar()}
      </div>
      
      {/* Event View/Edit/Create Dialog */}
      <Dialog open={isEventModalOpen} onOpenChange={setIsEventModalOpen}>
        <DialogContent className="max-w-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {modalMode === 'view' ? 'View Event' : 
               modalMode === 'edit' ? 'Edit Event' : 
               modalMode === 'create' ? 'Add Event' :
               modalMode === 'event-list' ? 'Events' : 'Add Event'}
            </DialogTitle>
          </DialogHeader>
          
          {modalMode === 'event-list' ? (
            renderEventList()
          ) : (
            <>
              {modalMode === 'view' && selectedEvent && (
                <div className="flex justify-end space-x-2 mb-4">
                  <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleEditEvent}>
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1 text-red-600" onClick={handleDeleteEvent}>
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              )}
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="repeat">Repeat</TabsTrigger>
                </TabsList>
                
                <TabsContent value="summary" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-name">Name:</Label>
                    <Input 
                      id="event-name" 
                      placeholder="Event name" 
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                      disabled={modalMode === 'view'}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Duration:</Label>
                    <div className="flex flex-col space-y-2">
                      <div className="grid grid-cols-2 gap-2 items-center">
                        <Input 
                          type="date"
                          value={eventStartDate ? format(eventStartDate, 'yyyy-MM-dd') : ''}
                          onChange={(e) => setEventStartDate(e.target.value ? new Date(e.target.value) : null)}
                          disabled={modalMode === 'view'}
                        />
                        <span className="text-center">to</span>
                        <Input 
                          type="date"
                          value={eventEndDate ? format(eventEndDate, 'yyyy-MM-dd') : ''}
                          onChange={(e) => setEventEndDate(e.target.value ? new Date(e.target.value) : null)}
                          disabled={modalMode === 'view'}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="description" className="space-y-4 pt-4">
                  <RichTextEditor 
                    value={eventDescription}
                    onChange={setEventDescription}
                    disabled={modalMode === 'view'}
                    placeholder="Add description for your event..."
                  />
                </TabsContent>
                
                <TabsContent value="repeat" className="pt-4">
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <Checkbox 
                        id="repeat-event" 
                        checked={repeatEvent}
                        onCheckedChange={(checked) => setRepeatEvent(!!checked)}
                        disabled={modalMode === 'view'}
                      />
                      <label htmlFor="repeat-event" className="ml-2 font-medium">Repeat</label>
                    </div>
                    
                    {repeatEvent && (
                      <>
                        <div className="space-y-4">
                          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 items-center">
                            <Label htmlFor="repeat-frequency" className="text-sm">Repeats:</Label>
                            <Select 
                              value={repeatFrequency}
                              onValueChange={setRepeatFrequency}
                              disabled={modalMode === 'view'}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select frequency" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="yearly">Yearly</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            <Label htmlFor="repeat-interval" className="text-sm">Repeats every:</Label>
                            <div className="flex items-center gap-2">
                              <Select
                                value={repeatInterval.toString()}
                                onValueChange={(val) => setRepeatInterval(parseInt(val))}
                                disabled={modalMode === 'view'}
                              >
                                <SelectTrigger className="w-24">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <span>days</span>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <Label className="text-sm">Event ends:</Label>
                            <div className="space-y-3">
                              <div className="flex items-center space-x-2">
                                <RadioGroup 
                                  value={repeatEndType}
                                  onValueChange={(val) => setRepeatEndType(val)}
                                  disabled={modalMode === 'view'}
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="never" id="end-never" disabled={modalMode === 'view'} />
                                    <Label htmlFor="end-never">Never</Label>
                                  </div>
                                  
                                  <div className="flex items-center space-x-2 mt-2">
                                    <RadioGroupItem value="after" id="end-after" disabled={modalMode === 'view'} />
                                    <div className="flex items-center gap-2">
                                      <Label htmlFor="end-after">After</Label>
                                      <Input 
                                        type="number" 
                                        min={1} 
                                        className="w-16" 
                                        value={repeatEndCount}
                                        onChange={(e) => setRepeatEndCount(parseInt(e.target.value))}
                                        disabled={repeatEndType !== 'after' || modalMode === 'view'}
                                      />
                                      <span>occurrences</span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center space-x-2 mt-2">
                                    <RadioGroupItem value="on" id="end-on" disabled={modalMode === 'view'} />
                                    <div className="flex items-center gap-2">
                                      <Label htmlFor="end-on">On</Label>
                                      <Input 
                                        type="date" 
                                        className="w-auto" 
                                        value={repeatEndDate ? format(repeatEndDate, 'yyyy-MM-dd') : ''}
                                        onChange={(e) => setRepeatEndDate(e.target.value ? new Date(e.target.value) : null)}
                                        disabled={repeatEndType !== 'on' || modalMode === 'view'}
                                      />
                                    </div>
                                  </div>
                                </RadioGroup>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mt-6 flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsEventModalOpen(false)}
                >
                  Cancel
                </Button>
                
                {modalMode !== 'view' && (
                  <Button onClick={handleSaveEvent}>
                    {modalMode === 'edit' ? 'Update Event' : 'Create Event'}
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Confirm Delete Dialog */}
      <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this event? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteEvent}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GroupCalendarPage;