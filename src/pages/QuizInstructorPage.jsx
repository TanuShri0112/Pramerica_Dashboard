import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, RotateCcw, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { QuizOverviewTab } from '@/components/assessments/QuizOverviewTab';
import QuizQuestionsTab from '@/components/assessments/QuizQuestionsTab';
import QuizScoresTab from '@/components/assessments/QuizScoresTab';
import QuizSubmissionStatusTab from '@/components/assessments/QuizSubmissionStatusTab';
import QuizAnalyticsTab from '@/components/assessments/QuizAnalyticsTab';
import QuizGradingScaleTab from '@/components/assessments/QuizGradingScaleTab';

// Sample quiz data
const sampleQuizData = {
  'quiz-1': {
    id: 'quiz-1',
    title: 'JavaScript Fundamentals Quiz',
    description: 'Test your knowledge of basic JavaScript concepts including variables, functions, arrays, and objects.',
    type: 'general',
    timeLimit: 30,
    attempts: 'unlimited',
    questions: 10,
    difficulty: 'Medium',
    minScore: 60,
    maxScore: 100
  },
  'quiz-2': {
    id: 'quiz-2',
    title: 'Advanced Programming Quiz',
    description: 'Assessment covering advanced programming concepts and problem-solving techniques.',
    type: 'general',
    timeLimit: 25,
    attempts: 3,
    questions: 10,
    difficulty: 'Medium',
    minScore: 70,
    maxScore: 100
  },
  'quiz-3': {
    id: 'quiz-3',
    title: 'Final Assessment Quiz',
    description: 'Comprehensive final assessment covering all course topics and concepts.',
    type: 'final',
    timeLimit: 45,
    attempts: 1,
    questions: 15,
    difficulty: 'Hard',
    minScore: 80,
    maxScore: 150
  }
};

const QuizInstructorPage = () => {
  const { moduleId, quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(sampleQuizData[quizId] || sampleQuizData['quiz-1']);

  const handleBack = () => {
    navigate(`/courses/modules/${moduleId}/assessments`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollArea className="h-screen">
        <div className="p-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Assessments
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Quiz Instructor Dashboard</h1>
              <p className="text-gray-600">Manage and evaluate quiz activities</p>
            </div>
          </div>

          {/* Quiz Header */}
          <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <CardTitle className="text-blue-800">{quiz.title}</CardTitle>
                    <Badge className={quiz.type === 'final' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}>
                      {quiz.type === 'final' ? 'Final Quiz' : 'General Quiz'}
                    </Badge>
                  </div>
                  <p className="text-blue-600 mb-4">{quiz.description}</p>
                  <div className="flex items-center gap-6 text-sm text-blue-600">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Time: {quiz.timeLimit} minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RotateCcw className="h-4 w-4" />
                      <span>Attempts: {quiz.attempts}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      <span>{quiz.questions} questions</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Quiz Tabs */}
          <Card>
            <Tabs defaultValue="overview" className="w-full">
              <div className="border-b">
                <TabsList className="grid w-full grid-cols-6 bg-gray-50">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="questions">Questions</TabsTrigger>
                  <TabsTrigger value="scores">Scores</TabsTrigger>
                  <TabsTrigger value="submission-status">Submission Status</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="grading-scale">Grading Scale</TabsTrigger>
                </TabsList>
              </div>

              <ScrollArea className="h-[600px]">
                <TabsContent value="overview" className="p-6">
                  <QuizOverviewTab quiz={quiz} onUpdate={setQuiz} />
                </TabsContent>

                <TabsContent value="questions" className="p-6">
                  <QuizQuestionsTab quiz={quiz} onUpdate={setQuiz} />
                </TabsContent>

                <TabsContent value="scores" className="p-6">
                  <QuizScoresTab quiz={quiz} />
                </TabsContent>

                <TabsContent value="submission-status" className="p-6">
                  <QuizSubmissionStatusTab quiz={quiz} />
                </TabsContent>

                <TabsContent value="analytics" className="p-6">
                  <QuizAnalyticsTab quiz={quiz} />
                </TabsContent>

                <TabsContent value="grading-scale" className="p-6">
                  <QuizGradingScaleTab quiz={quiz} onUpdate={setQuiz} />
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default QuizInstructorPage;
