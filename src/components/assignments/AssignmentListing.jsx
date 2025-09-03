import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Clock, Target, TrendingUp, Plus } from 'lucide-react';

const AssignmentListing = ({ moduleId }) => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    // Load assignments from localStorage or use sample data
    const savedAssignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    const moduleAssignments = savedAssignments.filter((a) => a.id.includes(moduleId)) || [];
    
    // If no assignments exist, use sample data
    if (moduleAssignments.length === 0) {
      const sampleAssignments = [
        {
          id: `${moduleId}-assignment-1`,
          name: 'Assignment 1',
          topic: 'Financial Statement Analysis',
          totalQuestions: 8,
          timeLimit: 60,
          maxScore: 100,
          difficulty: 'Medium',
          description: 'Analyze various financial statements and provide insights on company performance.'
        },
        {
          id: `${moduleId}-assignment-2`,
          name: 'Assignment 2',
          topic: 'Risk Assessment Framework',
          totalQuestions: 12,
          timeLimit: 90,
          maxScore: 150,
          difficulty: 'Hard',
          description: 'Develop a comprehensive risk assessment framework for financial institutions.'
        },
        {
          id: `${moduleId}-assignment-3`,
          name: 'Assignment 3',
          topic: 'Investment Portfolio Design',
          totalQuestions: 6,
          timeLimit: 45,
          maxScore: 80,
          difficulty: 'Easy',
          description: 'Create and justify an investment portfolio based on given parameters.'
        }
      ];
      setAssignments(sampleAssignments);
      localStorage.setItem('assignments', JSON.stringify([...savedAssignments, ...sampleAssignments]));
    } else {
      setAssignments(moduleAssignments);
    }
  }, [moduleId]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewAssignment = (assignmentId) => {
    navigate(`/courses/modules/${moduleId}/assignments/${assignmentId}`);
  };

  return (
    <div className="space-y-6">
      {assignments.length === 0 ? (
        <Card className="border-dashed border-2">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No assignments yet</h3>
            <p className="text-muted-foreground mb-4">Create your first assignment to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((assignment) => (
            <Card key={assignment.id} className="hover:shadow-md transition-shadow cursor-pointer border border-green-200" onClick={() => handleViewAssignment(assignment.id)}>
              <CardHeader className="space-y-0 pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-green-600" />
                    <CardTitle className="text-lg font-semibold text-gray-900">{assignment.name}</CardTitle>
                  </div>
                  <Badge className={getDifficultyColor(assignment.difficulty)}>
                    {assignment.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Topic</h4>
                    <p className="text-sm text-gray-600">{assignment.topic}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-gray-500" />
                      <span>{assignment.totalQuestions} questions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{assignment.timeLimit} min</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-gray-500" />
                    <span>Max Score: {assignment.maxScore} points</span>
                  </div>
                  
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white mt-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewAssignment(assignment.id);
                    }}
                  >
                    View Assignment
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssignmentListing;