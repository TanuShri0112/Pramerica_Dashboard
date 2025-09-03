import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X, Upload, Mic, MicOff, Calendar } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export const TimelineEditor = ({ isOpen, onClose, onSave, initialData }) => {
  const [timelineEvents, setTimelineEvents] = useState(
    initialData?.timelineEvents || [
      { 
        date: '2024', 
        title: 'Event 1', 
        description: 'Description of the first event',
        image: '',
        audioUrl: ''
      }
    ]
  );

  const [recordingStates, setRecordingStates] = useState({});
  const [mediaRecorders, setMediaRecorders] = useState({});
  const imageInputRefs = useRef({});

  const addEvent = () => {
    setTimelineEvents([...timelineEvents, { 
      date: new Date().getFullYear().toString(), 
      title: `Event ${timelineEvents.length + 1}`, 
      description: 'Description of the event',
      image: '',
      audioUrl: ''
    }]);
  };

  const removeEvent = (index) => {
    if (timelineEvents.length > 1) {
      setTimelineEvents(timelineEvents.filter((_, i) => i !== index));
      // Clean up refs for removed event
      delete imageInputRefs.current[`${index}`];
    }
  };

  const updateEvent = (index, field, value) => {
    const updatedEvents = timelineEvents.map((event, i) => 
      i === index ? { ...event, [field]: value } : event
    );
    setTimelineEvents(updatedEvents);
  };

  const triggerImageUpload = (eventIndex) => {
    const fileInput = imageInputRefs.current[`${eventIndex}`];
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleImageUpload = (eventIndex, event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        updateEvent(eventIndex, 'image', result);
      };
      reader.readAsDataURL(file);
      // Reset the input value to allow re-uploading the same file
      event.target.value = '';
    }
  };

  const handleDateSelect = (eventIndex, date) => {
    if (date) {
      updateEvent(eventIndex, 'date', format(date, 'yyyy-MM-dd'));
    }
  };

  const startRecording = async (eventIndex) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        updateEvent(eventIndex, 'audioUrl', audioUrl);
        
        // Stop all tracks to release the microphone
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      
      setMediaRecorders(prev => ({ ...prev, [eventIndex]: mediaRecorder }));
      setRecordingStates(prev => ({ ...prev, [eventIndex]: true }));
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Error accessing microphone. Please check your permissions.');
    }
  };

  const stopRecording = (eventIndex) => {
    const mediaRecorder = mediaRecorders[eventIndex];
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      setRecordingStates(prev => ({ ...prev, [eventIndex]: false }));
      setMediaRecorders(prev => ({ ...prev, [eventIndex]: null }));
    }
  };

  const handleSave = () => {
    onSave({
      interactiveType: 'timeline',
      timelineEvents
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Timeline</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {timelineEvents.map((event, index) => (
            <div key={index} className="border p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Event {index + 1}</h4>
                {timelineEvents.length > 1 && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => removeEvent(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date */}
                <div className="space-y-2">
                  <Label htmlFor={`date-${index}`}>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !event.date && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {event.date ? (
                          format(new Date(event.date + '-01-01'), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={event.date ? new Date(event.date + '-01-01') : undefined}
                        onSelect={(date) => handleDateSelect(index, date)}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Event Title */}
                <div className="space-y-2">
                  <Label htmlFor={`title-${index}`}>Event Title</Label>
                  <Input
                    id={`title-${index}`}
                    value={event.title}
                    onChange={(e) => updateEvent(index, 'title', e.target.value)}
                    placeholder="Enter event title"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 mt-4">
                <Label htmlFor={`description-${index}`}>Description</Label>
                <Textarea
                  id={`description-${index}`}
                  value={event.description}
                  onChange={(e) => updateEvent(index, 'description', e.target.value)}
                  placeholder="Enter event description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {/* Media (Images) */}
                <div className="space-y-2">
                  <Label>Media (Image)</Label>
                  <div className="flex gap-2">
                    <Input
                      value={event.image || ''}
                      onChange={(e) => updateEvent(index, 'image', e.target.value)}
                      placeholder="Image URL"
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => triggerImageUpload(index)}
                      type="button"
                    >
                      <Upload className="w-4 h-4" />
                    </Button>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(index, e)}
                      ref={(el) => imageInputRefs.current[`${index}`] = el}
                      className="hidden"
                    />
                  </div>
                  {event.image && (
                    <img 
                      src={event.image} 
                      alt="Event preview" 
                      className="mt-2 w-20 h-20 object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                </div>

                {/* Record Audio */}
                <div className="space-y-2">
                  <Label>Record Audio</Label>
                  <div className="flex gap-2 items-center">
                    {!recordingStates[index] ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => startRecording(index)}
                        type="button"
                      >
                        <Mic className="w-4 h-4 mr-1" />
                        Record
                      </Button>
                    ) : (
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => stopRecording(index)}
                        type="button"
                      >
                        <MicOff className="w-4 h-4 mr-1" />
                        Stop Recording
                      </Button>
                    )}
                    {event.audioUrl && (
                      <audio controls className="max-w-xs">
                        <source src={event.audioUrl} type="audio/wav" />
                        Your browser does not support the audio element.
                      </audio>
                    )}
                  </div>
                  {recordingStates[index] && (
                    <p className="text-sm text-red-600">Recording in progress...</p>
                  )}
                </div>
              </div>
            </div>
          ))}

          <Button onClick={addEvent} variant="outline" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </Button>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TimelineEditor;