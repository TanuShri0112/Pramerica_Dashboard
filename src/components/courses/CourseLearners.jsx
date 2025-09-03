import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, MoreHorizontal, Trash2 } from 'lucide-react';
import { AddLearnerModal } from './AddLearnerModal';
import { useParams } from 'react-router-dom';

/**
 * @typedef {object} Learner
 * @property {string} id - A unique identifier or initials for the learner.
 * @property {string} name - The full name of the learner.
 * @property {string} email - The email address of the learner.
 * @property {string} role - The role of the user in the course (e.g., 'Learner', 'Instructor').
 * @property {number} progress - The completion progress percentage.
 * @property {string} status - The current status of the learner (e.g., 'Active', 'Pending').
 * @property {string} enrolled - The date the learner was enrolled.
 */

const CourseLearners = () => {
  const { courseId } = useParams();
  const [isAddLearnerOpen, setIsAddLearnerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data matching the image
  /** @type {Learner[]} */
  const learners = [
    {
      id: 'JS',
      name: 'John Smith',
      email: 'john.smith@example.com',
      role: 'Learner',
      progress: 75,
      status: 'Active',
      enrolled: '2024-01-15'
    },
    {
      id: 'SJ',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      role: 'Instructor',
      progress: 60,
      status: 'Active',
      enrolled: '2024-01-16'
    },
    {
      id: 'MW',
      name: 'Mike Wilson',
      email: 'mike.wilson@example.com',
      role: 'Learner',
      progress: 85,
      status: 'Active',
      enrolled: '2024-01-17'
    },
    {
      id: 'ED',
      name: 'Emma Davis',
      email: 'emma.davis@example.com',
      role: 'Admin',
      progress: 40,
      status: 'Pending',
      enrolled: '2024-01-19'
    }
  ];

  const stats = {
    totalParticipants: 4,
    active: 3,
    pending: 1,
    avgProgress: 65
  };

  const filteredLearners = learners.filter(learner =>
    learner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    learner.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Returns the appropriate color classes for a given role.
   * @param {string} role - The user's role.
   * @returns {string} Tailwind CSS color classes.
   */
  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case 'learner':
        return 'bg-blue-100 text-blue-800';
      case 'instructor':
        return 'bg-purple-100 text-purple-800';
      case 'admin':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  /**
   * Returns the appropriate color classes for a given status.
   * @param {string} status - The user's status.
   * @returns {string} Tailwind CSS color classes.
   */
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Learners</h1>
          <p className="text-gray-600">Manage course participants and their roles</p>
        </div>
        <Button 
          onClick={() => setIsAddLearnerOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Learner
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">{stats.totalParticipants}</div>
            <div className="text-sm text-gray-600">Total Participants</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <div className="text-sm text-gray-600">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-purple-600">{stats.avgProgress}%</div>
            <div className="text-sm text-gray-600">Avg Progress</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border mb-6">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Course Participants Table */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Course Participants</h2>
          </div>

          <div className="space-y-3">
            {filteredLearners.map((learner) => (
              <div key={learner.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded font-medium text-sm">
                  {learner.id}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{learner.name}</span>
                    <Badge className={`text-xs ${getRoleColor(learner.role)}`}>
                      {learner.role}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">{learner.email}</div>
                  <div className="text-xs text-gray-500">Enrolled: {learner.enrolled}</div>
                </div>
                
                <div className="text-right">
                  <div className="font-semibold text-blue-600">{learner.progress}%</div>
                  <div className="text-xs text-gray-500">Progress</div>
                </div>
                
                <div>
                  <Badge className={`text-xs ${getStatusColor(learner.status)}`}>
                    {learner.status}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AddLearnerModal 
        open={isAddLearnerOpen}
        onOpenChange={setIsAddLearnerOpen}
        courseId={courseId || ''}
      />
    </div>
  );
};

export default CourseLearners;