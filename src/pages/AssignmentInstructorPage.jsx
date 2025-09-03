import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AssignmentOverviewTab } from '@/components/assignments/AssignmentOverviewTab';
import { AssignmentQuestionsTab } from '@/components/assignments/AssignmentQuestionsTab';
import { AssignmentScoresTab } from '@/components/assignments/AssignmentScoresTab';
import AssignmentSubmissionStatusTab from '@/components/assignments/AssignmentSubmissionStatusTab';
import AssignmentAnalyticsTab from '@/components/assignments/AssignmentAnalyticsTab';

const AssignmentInstructorPage = () => {
  const { moduleId, assignmentId } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);

  useEffect(() => {
    const savedAssignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    const foundAssignment = savedAssignments.find(a => a.id === assignmentId);

    if (foundAssignment) {
      setAssignment(foundAssignment);
    } else {
      const sampleAssignment = {
        id: assignmentId || '',
        name: 'Assignment 1',
        topic: 'Financial Statement Analysis',
        description:
          'Analyze various financial statements and provide insights on company performance, including balance sheets, income statements, and cash flow analysis.',
        instructions: [
          'Please read all questions carefully before starting.',
          'Show your work for all calculations.',
          'Use proper financial terminology and provide clear explanations for your analysis.',
        ],
        totalQuestions: 8,
        timeLimit: 60,
        maxScore: 100,
        difficulty: 'Medium',
      };
      setAssignment(sampleAssignment);
    }
  }, [assignmentId]);

  const handleBack = () => {
    navigate(`/courses/modules/${moduleId}/assessments`);
  };

  const getDifficultyColor = difficulty => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!assignment) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        <span className="ml-2">Loading assignment...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollArea className="h-screen">
        <div className="p-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button onClick={handleBack} variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Assessments
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Assignment Instructor Dashboard</h1>
              <p className="text-gray-600">Manage and evaluate assignment submissions</p>
            </div>
          </div>

          {/* Assignment Header */}
          <Card className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <CardTitle className="text-green-800">{assignment.name}</CardTitle>
                    <Badge className={getDifficultyColor(assignment.difficulty)}>
                      {assignment.difficulty}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-medium text-green-700 mb-2">{assignment.topic}</h3>
                  <p className="text-green-600 mb-4">{assignment.description}</p>
                  <div className="flex items-center gap-6 text-sm text-green-600">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Time: {assignment.timeLimit} minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      <span>{assignment.totalQuestions} questions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      <span>Max Score: {assignment.maxScore} points</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Assignment Tabs */}
          <Card>
            <Tabs defaultValue="overview" className="w-full">
              <div className="border-b">
                <TabsList className="grid w-full grid-cols-5 bg-gray-50">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="questions">Questions</TabsTrigger>
                  <TabsTrigger value="scores">Scores</TabsTrigger>
                  <TabsTrigger value="submission-status">Submission Status</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
              </div>

              <ScrollArea className="h-[600px]">
                <TabsContent value="overview" className="p-6">
                  <AssignmentOverviewTab assignment={assignment} onUpdate={setAssignment} />
                </TabsContent>

                <TabsContent value="questions" className="p-6">
                  <AssignmentQuestionsTab assignment={assignment} onUpdate={setAssignment} />
                </TabsContent>

                <TabsContent value="scores" className="p-6">
                  <AssignmentScoresTab assignment={assignment} />
                </TabsContent>

                <TabsContent value="submission-status" className="p-6">
                  <AssignmentSubmissionStatusTab assignment={assignment} />
                </TabsContent>

                <TabsContent value="analytics" className="p-6">
                  <AssignmentAnalyticsTab assignment={assignment} />
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AssignmentInstructorPage;
