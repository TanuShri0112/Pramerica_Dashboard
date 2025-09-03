import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Plus, Calendar as CalendarIcon, Clock, Edit, Trash2, MapPin, Users, ArrowLeft, Video, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const CalendarManagement = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Insurance Sales Training',
      time: '10:00 AM - 12:00 PM',
      date: 'Today',
      type: 'lecture',
      description: 'Advanced insurance sales methodologies and customer engagement techniques',
      location: 'Training Room 101 / Online',
      attendees: '25 sales agents',
      course: 'Insurance Fundamentals',
      zoomUrl: 'https://zoom.us/j/1234567890'
    },
    {
      id: 2,
      title: 'Life Insurance Sales Review',
      time: '2:00 PM - 3:00 PM',
      date: 'Today',
      type: 'meeting',
      description: 'Review life insurance sales performance and strategies',
      location: 'Conference Room 205',
      attendees: '15 sales managers',
      course: 'Life Insurance Sales',
      zoomUrl: 'https://zoom.us/j/0987654321'
    },
    {
      id: 3,
      title: 'Insurance License Exam Prep',
      time: '11:59 PM',
      date: 'Tomorrow',
      type: 'deadline',
      description: 'Final assessment submission for Insurance License preparation course',
      location: 'Online Portal',
      attendees: '30 trainees',
      course: 'Insurance License Prep'
    },
    {
      id: 4,
      title: 'Sales Technique Office Hours',
      time: '2:00 PM - 4:00 PM',
      date: 'Thursday',
      type: 'office-hours',
      description: 'Weekly office hours for sales technique consultation and guidance',
      location: 'Office 205',
      attendees: 'Open to all sales agents'
    },
    {
      id: 5,
      title: 'Insurance Compliance Meeting',
      time: '9:00 AM - 10:30 AM',
      date: 'Friday',
      type: 'meeting',
      description: 'Monthly insurance regulatory compliance and policy updates meeting',
      location: 'Conference Room A',
      attendees: '12 compliance officers',
      zoomUrl: 'https://zoom.us/j/1122334455'
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    date: undefined,
    type: 'lecture',
    location: '',
    attendees: '',
    course: '',
    zoomUrl: ''
  });

  const addEvent = () => {
    if (!newEvent.title.trim() || !newEvent.startTime.trim() || !newEvent.endTime.trim() || !newEvent.date) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Check if link is required and provided for meeting/lecture
    if ((newEvent.type === 'meeting' || newEvent.type === 'lecture') && !newEvent.zoomUrl.trim()) {
      toast.error('Meeting/Lecture link is required');
      return;
    }

    const event = {
      id: Math.max(...events.map(e => e.id)) + 1,
      title: newEvent.title,
      description: newEvent.description,
      time: `${newEvent.startTime} - ${newEvent.endTime}`,
      date: format(newEvent.date, 'PPP'),
      type: newEvent.type,
      location: newEvent.location,
      attendees: newEvent.attendees,
      course: newEvent.course,
      zoomUrl: newEvent.zoomUrl
    };

    setEvents([...events, event]);
    setNewEvent({ 
      title: '', description: '', startTime: '', endTime: '', date: undefined,
      type: 'lecture', location: '', attendees: '', course: '', zoomUrl: '' 
    });
    setIsAddDialogOpen(false);
    toast.success('Event added successfully');
  };

  const updateEvent = () => {
    if (!editingEvent?.title.trim() || !editingEvent?.time.trim() || !editingEvent?.date.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setEvents(events.map(event => 
      event.id === editingEvent.id ? editingEvent : event
    ));
    setEditingEvent(null);
    toast.success('Event updated successfully');
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
    toast.success('Event deleted successfully');
  };

  const handleJoinZoom = (zoomUrl, eventTitle) => {
    window.open(zoomUrl, '_blank');
    toast.success(`Joining ${eventTitle}...`);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'lecture': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'workshop': return 'bg-green-50 text-green-700 border-green-200';
      case 'meeting': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'deadline': return 'bg-red-50 text-red-700 border-red-200';
      case 'office-hours': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const eventTypes = ['lecture', 'meeting', 'deadline'];
  const courses = ['Insurance Fundamentals', 'Life Insurance Sales', 'Insurance License Prep'];

  // Filter today's events
  const todaysEvents = events.filter(event => event.date === 'Today');

  const handleBackToHome = () => {
    navigate('/');
  };

  const shouldShowZoomJoin = (event) => {
    return (event.type === 'lecture' || event.type === 'meeting') && event.zoomUrl;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          onClick={handleBackToHome}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">Calendar Management</h1>
          <p className="text-gray-600 mt-2">Manage your schedule and events</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Event
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-md max-h-[85vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
            </DialogHeader>
            <div className="overflow-y-auto max-h-[calc(85vh-120px)] pr-2">
              <div className="space-y-4">
                <Input
                  placeholder="Event Name"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
                <Textarea
                  placeholder="Event Description (Optional)"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  rows={3}
                />
                
                {/* Date Picker */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Event Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !newEvent.date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newEvent.date ? format(newEvent.date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={newEvent.date}
                        onSelect={(date) => setNewEvent({ ...newEvent, date })}
                        initialFocus
                        className="p-2 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Enhanced Time Duration */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Start Time
                    </label>
                    <div className="relative">
                      <Input
                        type="time"
                        value={newEvent.startTime}
                        onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                        className="pl-8 text-sm"
                      />
                      <Clock className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      End Time
                    </label>
                    <div className="relative">
                      <Input
                        type="time"
                        value={newEvent.endTime}
                        onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                        className="pl-8 text-sm"
                      />
                      <Clock className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                    </div>
                  </div>
                </div>

                <Select value={newEvent.type} onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Event Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {(newEvent.type === 'meeting' || newEvent.type === 'lecture') && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-red-600">
                      {newEvent.type === 'meeting' ? 'Meeting' : 'Lecture'} Link (Required)
                    </label>
                    <Input
                      placeholder={`${newEvent.type === 'meeting' ? 'Meeting' : 'Lecture'} Link (Required)`}
                      value={newEvent.zoomUrl}
                      onChange={(e) => setNewEvent({ ...newEvent, zoomUrl: e.target.value })}
                      className="border-red-200 focus:border-red-400"
                    />
                  </div>
                )}
                
                <div className="flex gap-2 pt-2">
                  <Button onClick={addEvent} className="flex-1">Add Event</Button>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1">Cancel</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Today's Events Section */}
      <Card className="border-blue-200">
        <CardHeader className="bg-blue-50">
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <CalendarIcon className="h-5 w-5" />
            Today's Schedule ({todaysEvents.length} events)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {todaysEvents.length > 0 ? (
            <div className="space-y-3">
              {todaysEvents.map((event) => (
                <div key={event.id} className="bg-white p-3 rounded-lg border border-blue-100 hover:border-blue-200 transition-all">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-blue-900">{event.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {event.attendees}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs ${getTypeColor(event.type)}`}>
                        {event.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </Badge>
                      {shouldShowZoomJoin(event) && (
                        <Button
                          size="sm"
                          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleJoinZoom(event.zoomUrl, event.title)}
                        >
                          <Video className="h-3 w-3" />
                          Join
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No events scheduled for today</p>
          )}
        </CardContent>
      </Card>

      {/* All Events Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            All Events ({events.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg text-slate-700">{event.title}</h3>
                      <Badge className={`text-xs ${getTypeColor(event.type)}`}>
                        {event.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </Badge>
                      {event.course && (
                        <Badge variant="outline" className="text-xs">
                          {event.course}
                        </Badge>
                      )}
                      {shouldShowZoomJoin(event) && (
                        <Badge variant="outline" className="text-xs flex items-center gap-1">
                          <Video className="h-3 w-3" />
                          Zoom Available
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-700 mb-3">{event.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{event.attendees}</span>
                      </div>
                    </div>
                    {shouldShowZoomJoin(event) && (
                      <div className="mt-3">
                        <Button
                          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleJoinZoom(event.zoomUrl, event.title)}
                        >
                          <Video className="h-4 w-4" />
                          Join Zoom Meeting
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingEvent(event)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteEvent(event.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Event Dialog */}
      <Dialog open={!!editingEvent} onOpenChange={() => setEditingEvent(null)}>
        <DialogContent className="w-full max-w-md max-h-[85vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
          </DialogHeader>
          {editingEvent && (
            <div className="overflow-y-auto max-h-[calc(85vh-120px)] pr-2">
              <div className="space-y-4">
                <Input
                  placeholder="Event title"
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                />
                <Textarea
                  placeholder="Event description"
                  value={editingEvent.description}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  rows={3}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Date"
                    value={editingEvent.date}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                  />
                  <Input
                    placeholder="Time"
                    value={editingEvent.time}
                    onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
                  />
                </div>
                <Select value={editingEvent.type} onValueChange={(value) => setEditingEvent({ ...editingEvent, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Location"
                  value={editingEvent.location}
                  onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                />
                <Input
                  placeholder="Attendees"
                  value={editingEvent.attendees}
                  onChange={(e) => setEditingEvent({ ...editingEvent, attendees: e.target.value })}
                />
                <Select value={editingEvent.course || 'none'} onValueChange={(value) => setEditingEvent({ ...editingEvent, course: value === 'none' ? '' : value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Related Course (Optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Course</SelectItem>
                    {courses.map(course => (
                      <SelectItem key={course} value={course}>
                        {course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {(editingEvent.type === 'lecture' || editingEvent.type === 'meeting') && (
                  <Input
                    placeholder="Zoom Meeting URL (Optional)"
                    value={editingEvent.zoomUrl || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, zoomUrl: e.target.value })}
                  />
                )}
                <div className="flex gap-2 pt-2">
                  <Button onClick={updateEvent} className="flex-1">Update Event</Button>
                  <Button variant="outline" onClick={() => setEditingEvent(null)} className="flex-1">Cancel</Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarManagement;