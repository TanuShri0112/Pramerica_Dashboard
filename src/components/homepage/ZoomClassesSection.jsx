import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Video, Calendar, Users, ExternalLink, Eye, Download, Edit, Trash2, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import TextReader from '@/components/accessibility/TextReader';

const ZoomClassesSection = () => {
  const [classes, setClasses] = useState([
    {
      id: 1,
      title: "General Engineering Systems Lab",
      date: "Tue, Nov 12",
      time: "9:00 AM",
      duration: "1.5 hours",
      description: "Live walkthrough of reliability testing frameworks and instrumentation best practices.",
      zoomLink: "https://zoom.us/j/823456789",
      meetingId: "823 456 789",
      attendance: 0,
      totalStudents: 32,
      isCompleted: false
    },
    {
      id: 2,
      title: "Secure Embedded Design Sprint",
      date: "Thu, Nov 14",
      time: "1:00 PM",
      duration: "2 hours",
      description: "Computer engineering cohort sprint covering zero-trust firmware patterns and code reviews.",
      zoomLink: "https://zoom.us/j/287654321",
      meetingId: "287 654 321",
      attendance: 0,
      totalStudents: 28,
      isCompleted: false
    },
    {
      id: 3,
      title: "Acquisition Negotiation Lab",
      date: "Mon, Nov 4",
      time: "3:00 PM",
      duration: "1 hour",
      description: "Scenario-based practice for Contract Specialists focused on source selection tradecraft.",
      attendance: 26,
      totalStudents: 30,
      recordingUrl: "https://example.com/recording/contracting-negotiation.mp4",
      isCompleted: true
    },
    {
      id: 4,
      title: "Program Baseline Risk Clinic",
      date: "Wed, Oct 30",
      time: "11:00 AM",
      duration: "1 hour",
      description: "Program manager forum reviewing integrated baseline readiness and risk burndown tactics.",
      attendance: 24,
      totalStudents: 28,
      recordingUrl: "https://example.com/recording/program-risk-clinic.mp4",
      isCompleted: true
    },
    {
      id: 5,
      title: "Business Operations Data Lab",
      date: "Thu, Oct 24",
      time: "10:00 AM",
      duration: "1 hour",
      description: "Hands-on analytics session for General Business & Industry professionals using enterprise KPIs.",
      attendance: 31,
      totalStudents: 34,
      recordingUrl: "https://example.com/recording/business-data-lab.mp4",
      isCompleted: true
    }
  ]);

  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isRecordingDialogOpen, setIsRecordingDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [selectedRecording, setSelectedRecording] = useState(null);
  const [newClass, setNewClass] = useState({
    title: '',
    date: '',
    time: '',
    duration: '1 hour',
    description: '',
    zoomLink: '',
    meetingId: ''
  });

  const upcomingClasses = classes.filter(cls => !cls.isCompleted);
  const completedClasses = classes.filter(cls => cls.isCompleted);

  const readableText = useMemo(() => {
    const parts = ['Zoom Classes Management'];

    if (upcomingClasses.length > 0) {
      parts.push('Upcoming Classes');
      upcomingClasses.forEach((cls) => {
        parts.push(
          [
            cls.title,
            cls.date ? `${cls.date} at ${cls.time}` : '',
            cls.duration ? `Duration ${cls.duration}` : '',
            cls.description || '',
          ]
            .filter(Boolean)
            .join('. ')
        );
      });
    } else {
      parts.push('No upcoming classes scheduled.');
    }

    if (completedClasses.length > 0) {
      parts.push('Completed Classes');
      completedClasses.forEach((cls) => {
        parts.push(
          [
            cls.title,
            cls.date ? `Held ${cls.date} at ${cls.time}` : '',
            cls.duration ? `Duration ${cls.duration}` : '',
            typeof cls.attendance === 'number' && typeof cls.totalStudents === 'number'
              ? `Attendance ${cls.attendance} out of ${cls.totalStudents}`
              : '',
            cls.description || '',
          ]
            .filter(Boolean)
            .join('. ')
        );
      });
    } else {
      parts.push('No completed classes yet.');
    }

    return parts.join(' ');
  }, [upcomingClasses, completedClasses]);

  const handleScheduleClass = () => {
    if (!newClass.title || !newClass.date || !newClass.time) {
      toast.error('Please fill in all required fields');
      return;
    }

    const formattedDate = new Date(newClass.date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    const newZoomClass = {
      id: Math.max(...classes.map(c => c.id)) + 1,
      title: newClass.title,
      date: formattedDate,
      time: newClass.time,
      duration: newClass.duration,
      description: newClass.description,
      zoomLink: newClass.zoomLink || `https://zoom.us/j/${Math.random().toString().substring(2, 11)}`,
      meetingId: newClass.meetingId || Math.random().toString().substring(2, 11).replace(/(.{3})/g, '$1 ').trim(),
      attendance: 0,
      totalStudents: 25,
      isCompleted: false
    };

    setClasses([...classes, newZoomClass]);
    setNewClass({
      title: '',
      date: '',
      time: '',
      duration: '1 hour',
      description: '',
      zoomLink: '',
      meetingId: ''
    });
    setIsScheduleDialogOpen(false);
    toast.success('Class scheduled successfully!');
  };

  const handleEditClass = () => {
    if (!editingClass) return;

    setClasses(classes.map(cls => 
      cls.id === editingClass.id ? editingClass : cls
    ));
    setIsEditDialogOpen(false);
    setEditingClass(null);
    toast.success('Class updated successfully!');
  };

  const handleDeleteClass = (id) => {
    setClasses(classes.filter(cls => cls.id !== id));
    toast.success('Class deleted successfully!');
  };

  const handleJoinZoom = (zoomLink, title) => {
    window.open(zoomLink, '_blank');
    toast.success(`Joining ${title} on Zoom`);
  };

  const handleViewRecording = (cls) => {
    setSelectedRecording(cls);
    setIsRecordingDialogOpen(true);
  };

  const handleDownloadRecording = (cls) => {
    if (cls.recordingUrl) {
      const link = document.createElement('a');
      link.href = cls.recordingUrl;
      link.download = `${cls.title.replace(/\s+/g, '-')}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(`Downloading ${cls.title} recording`);
    }
  };

  return (
    <section className="mb-6">
      <Card className="overflow-hidden border-green-100 shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-white flex flex-row items-center justify-between pb-4">
          <div className="flex items-center gap-3">
            <CardTitle className="text-xl flex items-center gap-2 text-emerald-800">
              <Video className="h-6 w-6" />
              Zoom Classes Management
            </CardTitle>
            <TextReader text={readableText} />
          </div>
          <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-4 w-4 mr-2" />
                Schedule New Class
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Schedule New Class
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Class Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter class title"
                    value={newClass.title}
                    onChange={(e) => setNewClass({...newClass, title: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newClass.date}
                      onChange={(e) => setNewClass({...newClass, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newClass.time}
                      onChange={(e) => setNewClass({...newClass, time: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Select value={newClass.duration} onValueChange={(value) => setNewClass({...newClass, duration: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30 minutes">30 minutes</SelectItem>
                      <SelectItem value="1 hour">1 hour</SelectItem>
                      <SelectItem value="1.5 hours">1.5 hours</SelectItem>
                      <SelectItem value="2 hours">2 hours</SelectItem>
                      <SelectItem value="3 hours">3 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter class description"
                    value={newClass.description}
                    onChange={(e) => setNewClass({...newClass, description: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="zoomLink">Zoom Meeting Link (optional)</Label>
                  <Input
                    id="zoomLink"
                    placeholder="https://zoom.us/j/..."
                    value={newClass.zoomLink}
                    onChange={(e) => setNewClass({...newClass, zoomLink: e.target.value})}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleScheduleClass} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                    Schedule Class
                  </Button>
                  <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)} className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Upcoming Classes
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Completed Classes
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="mt-4">
              <div className="space-y-4">
                {upcomingClasses.length > 0 ? (
                  upcomingClasses.map((cls) => (
                    <div key={cls.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:border-purple-200 hover:shadow-sm transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-800">{cls.title}</h3>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingClass(cls);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteClass(cls.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                        <div>
                          <p className="text-sm text-gray-600">{cls.date}</p>
                          <p className="text-sm text-gray-600">{cls.time}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">0/{cls.totalStudents}</span>
                        </div>
                        <div>
                          {cls.zoomLink && (
                            <Button
                              size="sm"
                              onClick={() => handleJoinZoom(cls.zoomLink, cls.title)}
                              className="bg-emerald-600 hover:bg-emerald-700"
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Join via Zoom
                            </Button>
                          )}
                        </div>
                        <div>
                          <Badge variant="outline" className="text-green-600 border-green-200 ml-4">
                            {cls.duration}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Video className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>No upcoming classes scheduled</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="mt-4">
              <div className="space-y-4">
                {completedClasses.length > 0 ? (
                  completedClasses.map((cls) => (
                    <div key={cls.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:border-purple-200 hover:shadow-sm transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-800">{cls.title}</h3>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingClass(cls);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteClass(cls.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        <div>
                          <p className="text-sm text-gray-600">{cls.date}</p>
                          <p className="text-sm text-gray-600">{cls.time}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{cls.attendance}/{cls.totalStudents}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewRecording(cls)}
                            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View Recording
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownloadRecording(cls)}
                            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                        <div>
                          <Badge variant="secondary" className="text-gray-600">
                            {cls.duration}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Video className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>No completed classes yet</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Edit Class Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Edit Class
            </DialogTitle>
          </DialogHeader>
          {editingClass && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title">Class Title</Label>
                <Input
                  id="edit-title"
                  value={editingClass.title}
                  onChange={(e) => setEditingClass({...editingClass, title: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-duration">Duration</Label>
                <Select 
                  value={editingClass.duration} 
                  onValueChange={(value) => setEditingClass({...editingClass, duration: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30 minutes">30 minutes</SelectItem>
                    <SelectItem value="1 hour">1 hour</SelectItem>
                    <SelectItem value="1.5 hours">1.5 hours</SelectItem>
                    <SelectItem value="2 hours">2 hours</SelectItem>
                    <SelectItem value="3 hours">3 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingClass.description}
                  onChange={(e) => setEditingClass({...editingClass, description: e.target.value})}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleEditClass} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                  Update Class
                </Button>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Recording Viewer Dialog */}
      <Dialog open={isRecordingDialogOpen} onOpenChange={setIsRecordingDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              {selectedRecording?.title} - Recording
            </DialogTitle>
          </DialogHeader>
          {selectedRecording && (
            <div className="space-y-4">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Video className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 mb-2">Recording Player</p>
                  <p className="text-sm text-gray-500">
                    Class held on {selectedRecording.date} at {selectedRecording.time}
                  </p>
                  <p className="text-sm text-gray-500">
                    Attendance: {selectedRecording.attendance}/{selectedRecording.totalStudents} students
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{selectedRecording.title}</h3>
                  <p className="text-sm text-gray-600">{selectedRecording.description}</p>
                </div>
                <Button onClick={() => handleDownloadRecording(selectedRecording)} className="bg-emerald-600 hover:bg-emerald-700">
                  <Download className="h-4 w-4 mr-2" />
                  Download Recording
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default ZoomClassesSection;