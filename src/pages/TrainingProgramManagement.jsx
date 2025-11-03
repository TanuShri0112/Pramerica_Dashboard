import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Plus, Edit, Trash2, MapPin, Users, Clock, Calendar as CalendarIcon, ArrowLeft, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const TrainingProgramManagement = () => {
  const navigate = useNavigate();
  const [trainingPrograms, setTrainingPrograms] = useState([
    {
      id: 1,
      title: 'DepEd Leadership Training',
      type: 'physical',
      venue: {
        name: 'Manila Hotel',
        address: 'One Rizal Park, Manila',
        capacity: 200,
        rooms: 50
      },
      sessions: [
        { id: 1, date: '2024-02-15', startTime: '09:00', endTime: '17:00', topic: 'Session 1: Introduction' },
        { id: 2, date: '2024-02-16', startTime: '09:00', endTime: '17:00', topic: 'Session 2: Advanced Topics' }
      ],
      trainers: [
        { id: 1, name: 'Dr. Maria Santos', role: 'Trainer', email: 'maria.santos@example.com' },
        { id: 2, name: 'Mr. John Dela Cruz', role: 'Facilitator', email: 'john.delacruz@example.com' }
      ],
      participants: 45,
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Teacher Development Program',
      type: 'blended',
      venue: {
        name: 'Online + SMX Convention Center',
        address: 'SMX Convention Center, Pasay',
        capacity: 150,
        rooms: 30
      },
      sessions: [
        { id: 1, date: '2024-02-20', startTime: '14:00', endTime: '16:00', topic: 'Online: Orientation', isOnline: true },
        { id: 2, date: '2024-02-25', startTime: '09:00', endTime: '17:00', topic: 'Physical: Workshop Day 1' }
      ],
      trainers: [
        { id: 3, name: 'Prof. Anna Reyes', role: 'Trainer', email: 'anna.reyes@example.com' }
      ],
      participants: 120,
      status: 'active'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSessionDialogOpen, setIsSessionDialogOpen] = useState(false);
  const [isVenueDialogOpen, setIsVenueDialogOpen] = useState(false);
  const [isTrainerDialogOpen, setIsTrainerDialogOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [currentProgramId, setCurrentProgramId] = useState(null);
  
  const [newProgram, setNewProgram] = useState({
    title: '',
    type: 'physical',
    description: '',
    venue: {
      name: '',
      address: '',
      capacity: '',
      rooms: ''
    }
  });

  const [newSession, setNewSession] = useState({
    date: undefined,
    startTime: '',
    endTime: '',
    topic: '',
    isOnline: false
  });

  const addTrainingProgram = () => {
    if (!newProgram.title.trim() || !newProgram.venue.name.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const program = {
      id: Math.max(...trainingPrograms.map(p => p.id), 0) + 1,
      ...newProgram,
      venue: { ...newProgram.venue, capacity: parseInt(newProgram.venue.capacity), rooms: parseInt(newProgram.venue.rooms) },
      sessions: [],
      trainers: [],
      participants: 0,
      status: 'upcoming'
    };

    setTrainingPrograms([...trainingPrograms, program]);
    setNewProgram({
      title: '',
      type: 'physical',
      description: '',
      venue: { name: '', address: '', capacity: '', rooms: '' }
    });
    setIsDialogOpen(false);
    toast.success('Training program created successfully');
  };

  const addSession = () => {
    if (!newSession.date || !newSession.startTime || !newSession.endTime || !newSession.topic.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const session = {
      id: Date.now(),
      ...newSession,
      date: format(newSession.date, 'yyyy-MM-dd')
    };

    setTrainingPrograms(trainingPrograms.map(p => 
      p.id === currentProgramId 
        ? { ...p, sessions: [...p.sessions, session] }
        : p
    ));

    setNewSession({ date: undefined, startTime: '', endTime: '', topic: '', isOnline: false });
    setIsSessionDialogOpen(false);
    toast.success('Session added successfully');
  };

  const addVenue = (programId) => {
    const program = trainingPrograms.find(p => p.id === programId);
    if (!newProgram.venue.name.trim() || !newProgram.venue.address.trim()) {
      toast.error('Please fill in venue details');
      return;
    }

    setTrainingPrograms(trainingPrograms.map(p => 
      p.id === programId 
        ? { 
            ...p, 
            venue: {
              ...newProgram.venue,
              capacity: parseInt(newProgram.venue.capacity),
              rooms: parseInt(newProgram.venue.rooms)
            }
          }
        : p
    ));

    setNewProgram({
      ...newProgram,
      venue: { name: '', address: '', capacity: '', rooms: '' }
    });
    setIsVenueDialogOpen(false);
    toast.success('Venue details updated successfully');
  };

  const addTrainer = (programId) => {
    // In real app, this would open a user picker
    const trainer = {
      id: Date.now(),
      name: 'New Trainer',
      role: 'Trainer',
      email: 'trainer@example.com'
    };

    setTrainingPrograms(trainingPrograms.map(p => 
      p.id === programId 
        ? { ...p, trainers: [...p.trainers, trainer] }
        : p
    ));

    toast.success('Trainer added successfully');
  };

  const deleteProgram = (id) => {
    setTrainingPrograms(trainingPrograms.filter(p => p.id !== id));
    toast.success('Training program deleted');
  };

  const getStatusBadge = (status) => {
    const colors = {
      upcoming: 'bg-blue-100 text-blue-800',
      active: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800'
    };
    return <Badge className={colors[status] || 'bg-gray-100'}>{status}</Badge>;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button onClick={() => navigate('/')} variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Training Program Management</h1>
            <p className="text-gray-600 mt-2">Create and manage training programs (physical + blended)</p>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Create Training Program
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Training Program</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Training Program Title *"
                value={newProgram.title}
                onChange={(e) => setNewProgram({ ...newProgram, title: e.target.value })}
              />
              <Select value={newProgram.type} onValueChange={(value) => setNewProgram({ ...newProgram, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Training Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="physical">Physical</SelectItem>
                  <SelectItem value="blended">Blended (Physical + Online)</SelectItem>
                </SelectContent>
              </Select>
              <Textarea
                placeholder="Description (Optional)"
                value={newProgram.description}
                onChange={(e) => setNewProgram({ ...newProgram, description: e.target.value })}
                rows={3}
              />
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Venue Details</h3>
                <div className="space-y-3">
                  <Input
                    placeholder="Venue/Hotel Name *"
                    value={newProgram.venue.name}
                    onChange={(e) => setNewProgram({ 
                      ...newProgram, 
                      venue: { ...newProgram.venue, name: e.target.value }
                    })}
                  />
                  <Textarea
                    placeholder="Venue Address *"
                    value={newProgram.venue.address}
                    onChange={(e) => setNewProgram({ 
                      ...newProgram, 
                      venue: { ...newProgram.venue, address: e.target.value }
                    })}
                    rows={2}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="number"
                      placeholder="Capacity *"
                      value={newProgram.venue.capacity}
                      onChange={(e) => setNewProgram({ 
                        ...newProgram, 
                        venue: { ...newProgram.venue, capacity: e.target.value }
                      })}
                    />
                    <Input
                      type="number"
                      placeholder="Available Rooms *"
                      value={newProgram.venue.rooms}
                      onChange={(e) => setNewProgram({ 
                        ...newProgram, 
                        venue: { ...newProgram.venue, rooms: e.target.value }
                      })}
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button onClick={addTrainingProgram} className="flex-1">Create Program</Button>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">Cancel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {trainingPrograms.map((program) => (
          <Card key={program.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-xl">{program.title}</CardTitle>
                    <Badge variant={program.type === 'blended' ? 'default' : 'outline'}>
                      {program.type}
                    </Badge>
                    {getStatusBadge(program.status)}
                  </div>
                  {program.description && (
                    <p className="text-gray-600 text-sm">{program.description}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setEditingProgram(program)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteProgram(program.id)} className="text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="venue">Venue</TabsTrigger>
                  <TabsTrigger value="sessions">Sessions ({program.sessions.length})</TabsTrigger>
                  <TabsTrigger value="trainers">Trainers ({program.trainers.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                      <Users className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Participants</p>
                        <p className="text-lg font-semibold">{program.participants}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                      <Building2 className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-600">Capacity</p>
                        <p className="text-lg font-semibold">{program.venue.capacity}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                      <Clock className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="text-sm text-gray-600">Sessions</p>
                        <p className="text-lg font-semibold">{program.sessions.length}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="venue" className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Venue Information
                      </h3>
                      <Button size="sm" variant="outline" onClick={() => {
                        setCurrentProgramId(program.id);
                        setIsVenueDialogOpen(true);
                      }}>
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Name:</span> {program.venue.name}</p>
                      <p><span className="font-medium">Address:</span> {program.venue.address}</p>
                      <p><span className="font-medium">Capacity:</span> {program.venue.capacity} participants</p>
                      <p><span className="font-medium">Rooms:</span> {program.venue.rooms} available</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="sessions" className="space-y-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold">Training Sessions</h3>
                    <Button size="sm" onClick={() => {
                      setCurrentProgramId(program.id);
                      setIsSessionDialogOpen(true);
                    }}>
                      <Plus className="h-4 w-4 mr-1" /> Add Session
                    </Button>
                  </div>
                  {program.sessions.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Topic</TableHead>
                          <TableHead>Type</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {program.sessions.map((session) => (
                          <TableRow key={session.id}>
                            <TableCell>{format(new Date(session.date), 'PPP')}</TableCell>
                            <TableCell>{session.startTime} - {session.endTime}</TableCell>
                            <TableCell>{session.topic}</TableCell>
                            <TableCell>
                              <Badge variant={session.isOnline ? 'default' : 'outline'}>
                                {session.isOnline ? 'Online' : 'Physical'}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No sessions added yet</p>
                  )}
                </TabsContent>

                <TabsContent value="trainers" className="space-y-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold">Trainers & Facilitators</h3>
                    <Button size="sm" onClick={() => addTrainer(program.id)}>
                      <Plus className="h-4 w-4 mr-1" /> Assign Trainer
                    </Button>
                  </div>
                  {program.trainers.length > 0 ? (
                    <div className="space-y-2">
                      {program.trainers.map((trainer) => (
                        <div key={trainer.id} className="p-3 border rounded-lg flex justify-between items-center">
                          <div>
                            <p className="font-medium">{trainer.name}</p>
                            <p className="text-sm text-gray-500">{trainer.email}</p>
                          </div>
                          <Badge variant="outline">{trainer.role}</Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No trainers assigned yet</p>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Session Dialog */}
      <Dialog open={isSessionDialogOpen} onOpenChange={setIsSessionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Training Session</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Session Topic *"
              value={newSession.topic}
              onChange={(e) => setNewSession({ ...newSession, topic: e.target.value })}
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !newSession.date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {newSession.date ? format(newSession.date, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={newSession.date} onSelect={(date) => setNewSession({ ...newSession, date })} />
              </PopoverContent>
            </Popover>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="time"
                placeholder="Start Time *"
                value={newSession.startTime}
                onChange={(e) => setNewSession({ ...newSession, startTime: e.target.value })}
              />
              <Input
                type="time"
                placeholder="End Time *"
                value={newSession.endTime}
                onChange={(e) => setNewSession({ ...newSession, endTime: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isOnline"
                checked={newSession.isOnline}
                onChange={(e) => setNewSession({ ...newSession, isOnline: e.target.checked })}
                className="rounded"
              />
              <label htmlFor="isOnline" className="text-sm">Online Session</label>
            </div>
            <div className="flex gap-2">
              <Button onClick={addSession} className="flex-1">Add Session</Button>
              <Button variant="outline" onClick={() => setIsSessionDialogOpen(false)} className="flex-1">Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Venue Dialog */}
      <Dialog open={isVenueDialogOpen} onOpenChange={setIsVenueDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Venue Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Venue/Hotel Name *"
              value={newProgram.venue.name}
              onChange={(e) => setNewProgram({ ...newProgram, venue: { ...newProgram.venue, name: e.target.value } })}
            />
            <Textarea
              placeholder="Venue Address *"
              value={newProgram.venue.address}
              onChange={(e) => setNewProgram({ ...newProgram, venue: { ...newProgram.venue, address: e.target.value } })}
              rows={2}
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="number"
                placeholder="Capacity *"
                value={newProgram.venue.capacity}
                onChange={(e) => setNewProgram({ ...newProgram, venue: { ...newProgram.venue, capacity: e.target.value } })}
              />
              <Input
                type="number"
                placeholder="Available Rooms *"
                value={newProgram.venue.rooms}
                onChange={(e) => setNewProgram({ ...newProgram, venue: { ...newProgram.venue, rooms: e.target.value } })}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => addVenue(currentProgramId)} className="flex-1">Update Venue</Button>
              <Button variant="outline" onClick={() => setIsVenueDialogOpen(false)} className="flex-1">Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrainingProgramManagement;

