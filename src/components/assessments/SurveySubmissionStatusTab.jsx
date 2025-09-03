import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, CheckCircle, Clock } from 'lucide-react';

const sampleStudents = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    avatar: '/placeholder.svg',
    status: 'completed',
    submittedAt: '2024-01-15 10:30 AM'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    avatar: '/placeholder.svg',
    status: 'completed',
    submittedAt: '2024-01-15 02:15 PM'
  },
  {
    id: '3',
    name: 'Mike Wilson',
    email: 'mike.wilson@email.com',
    avatar: '/placeholder.svg',
    status: 'not_attempted',
    submittedAt: null
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    avatar: '/placeholder.svg',
    status: 'not_attempted',
    submittedAt: null
  },
  {
    id: '5',
    name: 'Robert Brown',
    email: 'robert.brown@email.com',
    avatar: '/placeholder.svg',
    status: 'completed',
    submittedAt: '2024-01-16 09:45 AM'
  }
];

export const SurveySubmissionStatusTab = ({ survey }) => {
  const completedCount = sampleStudents.filter(student => student.status === 'completed').length;
  const notAttemptedCount = sampleStudents.filter(student => student.status === 'not_attempted').length;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'not_attempted':
        return <Badge className="bg-gray-100 text-gray-800">Not Attempted</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'not_attempted':
        return <Clock className="h-4 w-4 text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Submission Status</h3>
          <p className="text-sm text-gray-600">Track student survey completion status</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold">{sampleStudents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold">{completedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <Clock className="h-4 w-4 text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Not Attempted</p>
                <p className="text-2xl font-bold">{notAttemptedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students List */}
      <Card>
        <CardHeader>
          <CardTitle>Student Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sampleStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={student.avatar} alt={student.name} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{student.name}</h4>
                    <p className="text-sm text-gray-600">{student.email}</p>
                    {student.submittedAt && (
                      <p className="text-xs text-gray-500">Submitted: {student.submittedAt}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(student.status)}
                  {getStatusBadge(student.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SurveySubmissionStatusTab;
