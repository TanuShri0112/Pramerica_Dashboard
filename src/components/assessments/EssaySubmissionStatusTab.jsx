import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, Clock, XCircle, Search } from 'lucide-react';

const sampleStudents = [
  {
    id: 'user-1',
    name: 'John Smith',
    email: 'john@example.com',
    avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png',
    status: 'completed',
    score: 85,
    submittedAt: '2024-01-15T10:30:00Z',
    timeSpent: 95,
    wordCount: 789
  },
  {
    id: 'user-2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png',
    status: 'completed',
    score: null,
    submittedAt: '2024-01-15T11:15:00Z',
    timeSpent: 110,
    wordCount: 892
  },
  {
    id: 'user-3',
    name: 'Mike Wilson',
    email: 'mike@example.com',
    avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png',
    status: 'completed',
    score: null,
    submittedAt: '2024-01-16T09:20:00Z',
    timeSpent: 45,
    wordCount: 234
  },
  {
    id: 'user-4',
    name: 'Emily Davis',
    email: 'emily@example.com',
    avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png',
    status: 'not-attempted'
  },
  {
    id: 'user-5',
    name: 'Robert Brown',
    email: 'robert@example.com',
    avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png',
    status: 'not-attempted'
  },
  {
    id: 'user-6',
    name: 'Lisa Anderson',
    email: 'lisa@example.com',
    avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png',
    status: 'completed',
    score: 92,
    submittedAt: '2024-01-14T14:30:00Z',
    timeSpent: 118,
    wordCount: 1150
  }
];

export const EssaySubmissionStatusTab = ({ essay }) => {
  const [students] = useState(sampleStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'not-attempted':
        return <XCircle className="h-5 w-5 text-gray-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'not-attempted':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'not-attempted':
        return 'Not Attempted';
      default:
        return status;
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    total: students.length,
    completed: students.filter(s => s.status === 'completed').length,
    notAttempted: students.filter(s => s.status === 'not-attempted').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Submission Status</h3>
          <p className="text-sm text-gray-600">Track student progress and essay submission status</p>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{statusCounts.total}</p>
            <p className="text-sm text-gray-600">Total Enrolled</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{statusCounts.completed}</p>
            <p className="text-sm text-gray-600">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-600">{statusCounts.notAttempted}</p>
            <p className="text-sm text-gray-600">Not Attempted</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Students</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="not-attempted">Not Attempted</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Students List */}
      <div className="space-y-4">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={student.avatar} />
                    <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{student.name}</h4>
                    <p className="text-sm text-gray-600">{student.email}</p>
                    {student.status === 'completed' && student.submittedAt && (
                      <p className="text-xs text-gray-500">
                        Submitted: {new Date(student.submittedAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  {student.status === 'completed' && student.score !== null && (
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-700">{student.score}%</p>
                      <p className="text-sm text-gray-600">Score</p>
                    </div>
                  )}
                  
                  {student.status === 'completed' && student.timeSpent && (
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-700">{student.timeSpent} min</p>
                      <p className="text-sm text-gray-600">Time Spent</p>
                    </div>
                  )}
                  
                  {student.status === 'completed' && student.wordCount && (
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-700">{student.wordCount}</p>
                      <p className="text-sm text-gray-600">Words</p>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    {getStatusIcon(student.status)}
                    <Badge className={getStatusColor(student.status)}>
                      {getStatusLabel(student.status)}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-gray-500">No students found matching your criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};