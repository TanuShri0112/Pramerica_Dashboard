import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Clock, AlertCircle, Calendar as CalendarIcon, Bell, ArrowLeft, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { format, differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';
import { cn } from '@/lib/utils';

const TenderManagement = () => {
  const navigate = useNavigate();
  
  const [tenders, setTenders] = useState([
    {
      id: 1,
      title: 'DepEd Training Services Procurement',
      tenderNumber: 'DEPED-2024-001',
      preBidConference: {
        date: new Date('2024-03-01'),
        time: '10:00 AM',
        venue: 'DepEd Central Office',
        isCompleted: false
      },
      closingDeadline: new Date('2024-03-15T17:00:00'),
      status: 'active',
      contactPerson: {
        name: 'Dr. Maria Santos',
        email: 'maria.santos@deped.gov.ph',
        phone: '+63 2 1234 5678'
      },
      documents: ['tender-doc-1.pdf', 'specifications.xlsx']
    },
    {
      id: 2,
      title: 'Educational Materials Procurement',
      tenderNumber: 'DEPED-2024-002',
      preBidConference: {
        date: new Date('2024-02-25'),
        time: '2:00 PM',
        venue: 'Online (Zoom)',
        isCompleted: true
      },
      closingDeadline: new Date('2024-02-28T17:00:00'),
      status: 'closed',
      contactPerson: {
        name: 'Mr. John Dela Cruz',
        email: 'john.delacruz@deped.gov.ph',
        phone: '+63 2 2345 6789'
      },
      documents: ['tender-doc-2.pdf']
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTender, setEditingTender] = useState(null);
  const [newTender, setNewTender] = useState({
    title: '',
    tenderNumber: '',
    preBidConference: {
      date: undefined,
      time: '',
      venue: '',
      isCompleted: false
    },
    closingDeadline: undefined,
    contactPerson: {
      name: '',
      email: '',
      phone: ''
    }
  });

  const getTimeRemaining = (deadline) => {
    const now = new Date();
    const days = differenceInDays(deadline, now);
    const hours = differenceInHours(deadline, now) % 24;
    const minutes = differenceInMinutes(deadline, now) % 60;

    if (days < 0) return { expired: true, text: 'EXPIRED' };
    if (days === 0 && hours < 0) return { expired: true, text: 'EXPIRED' };
    
    return {
      expired: false,
      days,
      hours,
      minutes,
      text: `${days}d ${hours}h ${minutes}m`
    };
  };

  const getUrgencyLevel = (deadline) => {
    const now = new Date();
    const days = differenceInDays(deadline, now);
    
    if (days < 0) return 'expired';
    if (days <= 1) return 'critical';
    if (days <= 3) return 'urgent';
    if (days <= 7) return 'warning';
    return 'normal';
  };

  const addTender = () => {
    if (!newTender.title.trim() || !newTender.tenderNumber.trim() || !newTender.closingDeadline) {
      toast.error('Please fill in all required fields');
      return;
    }

    const tender = {
      id: Math.max(...tenders.map(t => t.id), 0) + 1,
      ...newTender,
      status: 'active',
      documents: []
    };

    setTenders([...tenders, tender]);
    setNewTender({
      title: '',
      tenderNumber: '',
      preBidConference: { date: undefined, time: '', venue: '', isCompleted: false },
      closingDeadline: undefined,
      contactPerson: { name: '', email: '', phone: '' }
    });
    setIsDialogOpen(false);
    toast.success('Tender added successfully');
  };

  const updateTender = () => {
    setTenders(tenders.map(t => 
      t.id === editingTender.id ? editingTender : t
    ));
    setEditingTender(null);
    toast.success('Tender updated successfully');
  };

  const deleteTender = (id) => {
    setTenders(tenders.filter(t => t.id !== id));
    toast.success('Tender deleted');
  };

  const activeTenders = tenders.filter(t => t.status === 'active');
  const criticalTenders = activeTenders.filter(t => {
    const urgency = getUrgencyLevel(t.closingDeadline);
    return urgency === 'critical' || urgency === 'urgent';
  });

  useEffect(() => {
    // Check for alerts periodically
    const interval = setInterval(() => {
      activeTenders.forEach(tender => {
        const timeRemaining = getTimeRemaining(tender.closingDeadline);
        if (!timeRemaining.expired && timeRemaining.days <= 1 && timeRemaining.hours <= 2) {
          // Could trigger browser notification here
          toast.warning(`Tender "${tender.title}" closes in ${timeRemaining.text}!`);
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [activeTenders]);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button onClick={() => navigate('/')} variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Government Tender Deadline Tracking</h1>
            <p className="text-gray-600 mt-2">Track pre-bid conferences and tender closing deadlines</p>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add New Tender
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Tender</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Tender Title *"
                value={newTender.title}
                onChange={(e) => setNewTender({ ...newTender, title: e.target.value })}
              />
              <Input
                placeholder="Tender Number *"
                value={newTender.tenderNumber}
                onChange={(e) => setNewTender({ ...newTender, tenderNumber: e.target.value })}
              />
              
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Pre-Bid Conference</h3>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !newTender.preBidConference.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newTender.preBidConference.date 
                        ? format(newTender.preBidConference.date, "PPP")
                        : "Select conference date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newTender.preBidConference.date}
                      onSelect={(date) => setNewTender({
                        ...newTender,
                        preBidConference: { ...newTender.preBidConference, date }
                      })}
                    />
                  </PopoverContent>
                </Popover>
                <Input
                  placeholder="Time (e.g., 10:00 AM)"
                  value={newTender.preBidConference.time}
                  onChange={(e) => setNewTender({
                    ...newTender,
                    preBidConference: { ...newTender.preBidConference, time: e.target.value }
                  })}
                  className="mt-2"
                />
                <Input
                  placeholder="Venue"
                  value={newTender.preBidConference.venue}
                  onChange={(e) => setNewTender({
                    ...newTender,
                    preBidConference: { ...newTender.preBidConference, venue: e.target.value }
                  })}
                  className="mt-2"
                />
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Closing Deadline *</h3>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !newTender.closingDeadline && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newTender.closingDeadline
                        ? format(newTender.closingDeadline, "PPP p")
                        : "Select closing date & time"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newTender.closingDeadline}
                      onSelect={(date) => setNewTender({ ...newTender, closingDeadline: date })}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Contact Person</h3>
                <Input
                  placeholder="Contact Name"
                  value={newTender.contactPerson.name}
                  onChange={(e) => setNewTender({
                    ...newTender,
                    contactPerson: { ...newTender.contactPerson, name: e.target.value }
                  })}
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={newTender.contactPerson.email}
                  onChange={(e) => setNewTender({
                    ...newTender,
                    contactPerson: { ...newTender.contactPerson, email: e.target.value }
                  })}
                  className="mt-2"
                />
                <Input
                  placeholder="Phone"
                  value={newTender.contactPerson.phone}
                  onChange={(e) => setNewTender({
                    ...newTender,
                    contactPerson: { ...newTender.contactPerson, phone: e.target.value }
                  })}
                  className="mt-2"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button onClick={addTender} className="flex-1">Add Tender</Button>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">Cancel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Critical Alerts */}
      {criticalTenders.length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Urgent:</strong> {criticalTenders.length} tender(s) closing soon! Review deadlines immediately.
          </AlertDescription>
        </Alert>
      )}

      {/* Countdown Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeTenders.map((tender) => {
          const timeRemaining = getTimeRemaining(tender.closingDeadline);
          const urgency = getUrgencyLevel(tender.closingDeadline);
          
          const urgencyColors = {
            expired: 'border-red-500 bg-red-50',
            critical: 'border-red-400 bg-red-100',
            urgent: 'border-orange-400 bg-orange-100',
            warning: 'border-yellow-400 bg-yellow-100',
            normal: 'border-blue-400 bg-blue-50'
          };

          return (
            <Card key={tender.id} className={urgencyColors[urgency]}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{tender.title}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{tender.tenderNumber}</p>
                  </div>
                  <Badge variant={urgency === 'critical' || urgency === 'urgent' ? 'destructive' : 'default'}>
                    {urgency}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-white rounded-lg border-2 border-dashed">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-red-600" />
                    <span className="font-semibold">Deadline Countdown</span>
                  </div>
                  <div className="text-2xl font-bold text-red-600">
                    {timeRemaining.expired ? 'EXPIRED' : timeRemaining.text}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Closes: {format(tender.closingDeadline, 'PPP p')}
                  </div>
                </div>

                {tender.preBidConference && !tender.preBidConference.isCompleted && (
                  <div className="p-3 bg-white rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CalendarIcon className="h-4 w-4" />
                      <span className="font-semibold text-sm">Pre-Bid Conference</span>
                    </div>
                    <div className="text-sm">
                      <p>{format(tender.preBidConference.date, 'PPP')} at {tender.preBidConference.time}</p>
                      <p className="text-gray-600">{tender.preBidConference.venue}</p>
                    </div>
                  </div>
                )}

                <div className="p-3 bg-white rounded-lg">
                  <div className="text-sm font-semibold mb-1">Contact Person</div>
                  <div className="text-sm text-gray-600">
                    <p>{tender.contactPerson.name}</p>
                    <p>{tender.contactPerson.email}</p>
                    <p>{tender.contactPerson.phone}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingTender(tender)}
                    className="flex-1"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteTender(tender.id)}
                    className="flex-1 text-red-600"
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* All Tenders Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Tenders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tender Number</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Pre-Bid Conference</TableHead>
                <TableHead>Closing Deadline</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenders.map((tender) => {
                const timeRemaining = getTimeRemaining(tender.closingDeadline);
                return (
                  <TableRow key={tender.id}>
                    <TableCell className="font-medium">{tender.tenderNumber}</TableCell>
                    <TableCell>{tender.title}</TableCell>
                    <TableCell>
                      {tender.preBidConference ? (
                        <div className="text-sm">
                          <p>{format(tender.preBidConference.date, 'MMM dd, yyyy')} {tender.preBidConference.time}</p>
                          <p className="text-gray-500">{tender.preBidConference.venue}</p>
                          {tender.preBidConference.isCompleted && (
                            <Badge variant="outline" className="mt-1">Completed</Badge>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400">Not scheduled</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{format(tender.closingDeadline, 'MMM dd, yyyy p')}</p>
                        <p className={timeRemaining.expired ? 'text-red-600 font-semibold' : 'text-gray-500'}>
                          {timeRemaining.expired ? 'EXPIRED' : timeRemaining.text}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={tender.status === 'active' ? 'default' : 'secondary'}>
                        {tender.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setEditingTender(tender)}>
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Tender Dialog */}
      {editingTender && (
        <Dialog open={!!editingTender} onOpenChange={() => setEditingTender(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Tender</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Tender Title"
                value={editingTender.title}
                onChange={(e) => setEditingTender({ ...editingTender, title: e.target.value })}
              />
              <Input
                placeholder="Tender Number"
                value={editingTender.tenderNumber}
                onChange={(e) => setEditingTender({ ...editingTender, tenderNumber: e.target.value })}
              />
              <div className="flex gap-2">
                <Button onClick={updateTender} className="flex-1">Update</Button>
                <Button variant="outline" onClick={() => setEditingTender(null)} className="flex-1">Cancel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default TenderManagement;

