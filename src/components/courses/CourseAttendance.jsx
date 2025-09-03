import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Plus, Calendar as CalendarIcon, Search, Filter, Download, Users, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { format, isAfter, endOfDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { SessionDetailsDialog } from './SessionDetailsDialog';

const CourseAttendance = () => {
  const [activeTab, setActiveTab] = useState('details');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [currentAttendance, setCurrentAttendance] = useState({
    status: '',
    time: '',
    notes: ''
  });
  const [sessionDetailsOpen, setSessionDetailsOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  // Mock data for students
  const students = [
    {
      id: 'JS',
      name: 'John Smith',
      email: 'john.smith@example.com',
      avatar: 'JS',
      attendance: {
        present: 8,
        absent: 2,
        late: 1,
        percentage: 80
      }
    },
    {
      id: 'SJ',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      avatar: 'SJ',
      attendance: {
        present: 10,
        absent: 0,
        late: 1,
        percentage: 95
      }
    },
    {
      id: 'MW',
      name: 'Mike Wilson',
      email: 'mike.wilson@example.com',
      avatar: 'MW',
      attendance: {
        present: 7,
        absent: 3,
        late: 1,
        percentage: 70
      }
    },
    {
      id: 'ED',
      name: 'Emma Davis',
      email: 'emma.davis@example.com',
      avatar: 'ED',
      attendance: {
        present: 9,
        absent: 1,
        late: 1,
        percentage: 85
      }
    }
  ];

  // Mock attendance sessions
  const attendanceSessions = [
    {
      id: 1,
      date: '2024-01-15',
      topic: 'Introduction to React',
      totalStudents: 4,
      present: 3,
      absent: 1,
      late: 0,
      sessionLink: 'https://zoom.us/j/123456789',
      duration: '1 hour 30 minutes',
      location: 'Virtual Meeting Room A'
    },
    {
      id: 2,
      date: '2024-01-17',
      topic: 'Component Lifecycle',
      totalStudents: 4,
      present: 4,
      absent: 0,
      late: 0,
      sessionLink: 'https://meet.google.com/abc-defg-hij',
      duration: '2 hours',
      location: 'Virtual Meeting Room B'
    },
    {
      id: 3,
      date: '2024-01-19',
      topic: 'State Management',
      totalStudents: 4,
      present: 2,
      absent: 1,
      late: 1,
      sessionLink: 'https://teams.microsoft.com/l/meetup-join/123',
      duration: '1 hour 45 minutes',
      location: 'Conference Room 101'
    }
  ];

  // Daily attendance for each date (mocked as an object keyed by date string)
  const [dailyAttendanceByDate, setDailyAttendanceByDate] = useState({
    '2025-07-11': [
      { studentId: 'JS', status: 'present', time: '09:00 AM', notes: '' },
      { studentId: 'SJ', status: 'present', time: '09:05 AM', notes: '' },
      { studentId: 'MW', status: 'late', time: '09:15 AM', notes: 'Traffic delay' },
      { studentId: 'ED', status: 'absent', time: '', notes: 'Sick leave' }
    ],
    '2025-07-12': [
      { studentId: 'JS', status: 'present', time: '09:00 AM', notes: '' },
      { studentId: 'SJ', status: 'present', time: '09:05 AM', notes: '' },
      { studentId: 'MW', status: 'present', time: '09:10 AM', notes: '' },
      { studentId: 'ED', status: 'absent', time: '', notes: 'Family emergency' }
    ]
  });

  // Get attendance for the selected date
  const dateKey = format(selectedDate, 'yyyy-MM-dd');
  const today = endOfDay(new Date());
  const isFuture = isAfter(selectedDate, today);
  const dailyAttendance = dailyAttendanceByDate[dateKey] || [];

  // Helper to get a student's attendance record for the selected date
  const getAttendanceRecord = (studentId) => {
    return dailyAttendance.find(a => a.studentId === studentId);
  };

  // Helper to get status for a student for the selected date
  const getAttendanceStatus = (studentId) => {
    if (isFuture) return '';
    const attendance = getAttendanceRecord(studentId);
    return attendance?.status || 'absent';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'late':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter students by search and status for the selected date
  const filteredStudents = students.filter(student => {
    if (isFuture) return false;
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const status = getAttendanceStatus(student.id);
    const matchesStatus = statusFilter === 'all' || status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const exportToCSV = () => {
    if (isFuture) return;
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Student Name,Email,Status,Time,Notes\n";
    
    filteredStudents.forEach(student => {
      const attendance = getAttendanceRecord(student.id) || {};
      csvContent += `"${student.name}","${student.email}","${attendance.status || 'absent'}","${attendance.time || ''}","${attendance.notes || ''}"\n`;
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `attendance_${dateKey}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openEditModal = (student) => {
    if (isFuture) return;
    const attendance = getAttendanceRecord(student.id) || {
      studentId: student.id,
      status: 'absent',
      time: '',
      notes: ''
    };
    setCurrentStudent(student);
    setCurrentAttendance(attendance);
    setIsEditModalOpen(true);
  };

  const handleStatusChange = (value) => {
    setCurrentAttendance(prev => ({
      ...prev,
      status: value
    }));
  };

  const handleTimeChange = (e) => {
    setCurrentAttendance(prev => ({
      ...prev,
      time: e.target.value
    }));
  };

  const handleNotesChange = (e) => {
    setCurrentAttendance(prev => ({
      ...prev,
      notes: e.target.value
    }));
  };

  const saveAttendanceChanges = () => {
    setDailyAttendanceByDate(prev => {
      const prevAttendance = prev[dateKey] || [];
      const updatedAttendance = [...prevAttendance];
      const existingIndex = updatedAttendance.findIndex(a => a.studentId === currentStudent.id);
      if (existingIndex >= 0) {
        updatedAttendance[existingIndex] = currentAttendance;
      } else {
        updatedAttendance.push(currentAttendance);
      }
      return { ...prev, [dateKey]: updatedAttendance };
    });
    setIsEditModalOpen(false);
  };

  const handleViewSessionDetails = (session) => {
    setSelectedSession(session);
    setSessionDetailsOpen(true);
  };

  const handleDateChange = (date) => {
    if (date) setSelectedDate(date);
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Attendance</h1>
          <p className="text-gray-600">Track and manage student attendance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportToCSV} disabled={isFuture}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">{students.length}</div>
                <div className="text-sm text-gray-600">Total Students</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold text-green-600">85%</div>
                <div className="text-sm text-gray-600">Avg Attendance</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold text-yellow-600">{attendanceSessions.length}</div>
                <div className="text-sm text-gray-600">Sessions Recorded</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <div>
                <div className="text-2xl font-bold text-red-600">3</div>
                <div className="text-sm text-gray-600">Frequent Absences</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="details" className="px-6 py-2">Daily Attendance</TabsTrigger>
          <TabsTrigger value="summary" className="px-6 py-2">Summary</TabsTrigger>
          <TabsTrigger value="sessions" className="px-6 py-2">Sessions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Daily Attendance - {format(selectedDate, 'PPP')}</CardTitle>
                <div className="flex items-center gap-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(selectedDate, 'PPP')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateChange}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                    disabled={isFuture}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter} disabled={isFuture}>
                  <SelectTrigger className="w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                    <SelectItem value="late">Late</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Attendance Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isFuture ? (
                    students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-medium text-sm">
                              {student.avatar}
                            </div>
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="text-sm text-gray-500">{student.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              disabled
                            >
                              Edit
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    filteredStudents.map((student) => {
                      const status = getAttendanceStatus(student.id);
                      const attendance = getAttendanceRecord(student.id);
                      return (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-medium text-sm">
                                {student.avatar}
                              </div>
                              <div>
                                <div className="font-medium">{student.name}</div>
                                <div className="text-sm text-gray-500">{student.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(status)}
                              {status && (
                                <Badge className={`${getStatusColor(status)} text-xs`}>
                                  {status.charAt(0).toUpperCase() + status.slice(1)}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{attendance?.time || '-'}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-gray-600">{attendance?.notes || '-'}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => openEditModal(student)}
                              >
                                Edit
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Present</TableHead>
                    <TableHead>Absent</TableHead>
                    <TableHead>Late</TableHead>
                    <TableHead>Attendance %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-medium text-xs">
                            {student.avatar}
                          </div>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-xs text-gray-500">{student.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-green-600 font-medium">{student.attendance.present}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-red-600 font-medium">{student.attendance.absent}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-yellow-600 font-medium">{student.attendance.late}</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${student.attendance.percentage >= 80 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {student.attendance.percentage}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Topic</TableHead>
                    <TableHead>Total Students</TableHead>
                    <TableHead>Present</TableHead>
                    <TableHead>Absent</TableHead>
                    <TableHead>Late</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>
                        <span className="font-medium">{format(new Date(session.date), 'PPP')}</span>
                      </TableCell>
                      <TableCell>{session.topic}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{session.totalStudents}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-green-600 font-medium">{session.present}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-red-600 font-medium">{session.absent}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-yellow-600 font-medium">{session.late}</span>
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewSessionDetails(session)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Attendance Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Attendance</DialogTitle>
            <DialogDescription>
              Update attendance status for {currentStudent?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="status" className="text-right">
                Status
              </label>
              <Select 
                value={currentAttendance?.status} 
                onValueChange={handleStatusChange}
                className="col-span-3"
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="time" className="text-right">
                Time
              </label>
              <Input
                id="time"
                value={currentAttendance?.time || ''}
                onChange={handleTimeChange}
                placeholder="e.g. 09:00 AM"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="notes" className="text-right">
                Notes
              </label>
              <Input
                id="notes"
                value={currentAttendance?.notes || ''}
                onChange={handleNotesChange}
                placeholder="Optional notes"
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveAttendanceChanges}>
              Save changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <SessionDetailsDialog
        open={sessionDetailsOpen}
        onOpenChange={setSessionDetailsOpen}
        session={selectedSession}
      />
    </div>
  );
};

export default CourseAttendance;