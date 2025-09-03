import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, CheckCircle, Clock, XCircle } from 'lucide-react';

const AssignmentSubmissionStatusTab = ({ assignment }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [enrolledUsers] = useState([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      status: 'completed',
      submittedAt: '2024-01-15T10:30:00Z',
      score: 85
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      status: 'completed',
      submittedAt: '2024-01-16T14:22:00Z',
      score: 92
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike.wilson@email.com',
      status: 'not-attempted'
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      status: 'completed',
      submittedAt: '2024-01-17T16:45:00Z',
      score: 78
    },
    {
      id: '5',
      name: 'Robert Brown',
      email: 'robert.brown@email.com',
      status: 'completed',
      submittedAt: '2024-01-18T11:30:00Z',
      score: 88
    },
    {
      id: '6',
      name: 'Lisa Chen',
      email: 'lisa.chen@email.com',
      status: 'not-attempted'
    },
    {
      id: '7',
      name: 'David Miller',
      email: 'david.miller@email.com',
      status: 'not-attempted'
    },
    {
      id: '8',
      name: 'Jennifer Taylor',
      email: 'jennifer.taylor@email.com',
      status: 'completed',
      submittedAt: '2024-01-19T09:15:00Z',
      score: 95
    },
    {
      id: '9',
      name: 'Mark Anderson',
      email: 'mark.anderson@email.com',
      status: 'not-attempted'
    },
    {
      id: '10',
      name: 'Ashley White',
      email: 'ashley.white@email.com',
      status: 'completed',
      submittedAt: '2024-01-20T13:20:00Z',
      score: 82
    }
  ]);

  const filteredUsers = enrolledUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const completedUsers = enrolledUsers.filter(user => user.status === 'completed');
  const notAttemptedUsers = enrolledUsers.filter(user => user.status === 'not-attempted');

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'not-attempted':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'not-attempted': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreColor = (score) => {
    const percentage = (score / assignment.maxScore) * 100;
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Submission Status</h2>
          <p className="text-gray-600">
            {enrolledUsers.length} enrolled users • {completedUsers.length} completed • {notAttemptedUsers.length} not attempted
          </p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-md">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{enrolledUsers.length}</p>
                <p className="text-sm text-gray-600">Total Enrolled</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-md">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{completedUsers.length}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-md">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{notAttemptedUsers.length}</p>
                <p className="text-sm text-gray-600">Not Attempted</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Status Overview</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-4 font-medium">User</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Submitted At</th>
                  <th className="text-left p-4 font-medium">Score</th>
                  <th className="text-left p-4 font-medium">Completion Rate</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(user.status)}
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className={getStatusColor(user.status)}>
                        {user.status === 'completed' ? 'Completed' : 'Not Attempted'}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm">
                      {user.submittedAt ? (
                        formatDate(user.submittedAt)
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </td>
                    <td className="p-4">
                      {user.score !== undefined ? (
                        <span className={`font-semibold ${getScoreColor(user.score)}`}>
                          {user.score}/{assignment.maxScore}
                        </span>
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </td>
                    <td className="p-4">
                      {user.score !== undefined ? (
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(user.score / assignment.maxScore) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">
                            {Math.round((user.score / assignment.maxScore) * 100)}%
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignmentSubmissionStatusTab;