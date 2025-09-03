import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Target, Users, Trophy, Eye, Plus, MessageSquare, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AssessmentCategories = () => {
  const navigate = useNavigate();
  const [selectedQuizType, setSelectedQuizType] = useState('general');
  const [selectedAssessmentType, setSelectedAssessmentType] = useState('quizzes');

  const quizzes = {
    general: [
      {
        id: 'quiz-1',
        title: 'JavaScript Fundamentals Quiz',
        description: 'Test your knowledge of basic JavaScript concepts including variables, functions, arrays, and objects.',
        timeLimit: 30,
        attempts: 'unlimited',
        questions: 10,
        difficulty: 'Medium',
        minScore: 60,
        maxScore: 100,
        status: 'active'
      },
      {
        id: 'quiz-2',
        title: 'Advanced Programming Quiz',
        description: 'Assessment covering advanced programming concepts and problem-solving techniques.',
        timeLimit: 25,
        attempts: 3,
        questions: 10,
        difficulty: 'Medium',
        minScore: 70,
        maxScore: 100,
        status: 'active'
      }
    ],
    final: [
      {
        id: 'quiz-3',
        title: 'Final Assessment Quiz',
        description: 'Comprehensive final assessment covering all course topics and concepts.',
        timeLimit: 45,
        attempts: 1,
        questions: 15,
        difficulty: 'Hard',
        minScore: 80,
        maxScore: 150,
        status: 'active'
      }
    ]
  };

  const surveys = [
    {
      id: 'survey-1',
      title: 'Course Feedback Survey',
      description: 'Help us improve the course content and delivery by sharing your feedback on the learning experience.',
      topic: 'Course Experience and Satisfaction',
      timeLimit: 15,
      questions: 8,
      status: 'active'
    },
    {
      id: 'survey-2',
      title: 'Module Assessment Survey',
      description: 'Evaluate your understanding and satisfaction with the current module content and structure.',
      topic: 'Module Content Evaluation',
      timeLimit: 10,
      questions: 6,
      status: 'active'
    }
  ];

  const handleViewQuiz = (quizId) => {
    navigate(`/courses/modules/1/quizzes/${quizId}`);
  };

  const handleViewSurvey = (surveyId) => {
    navigate(`/courses/modules/1/surveys/${surveyId}`);
  };

  const currentQuizzes = quizzes[selectedQuizType] || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Assessment Categories</h2>
          <p className="text-gray-600">Manage different types of assessments for your course</p>
        </div>
        <Select value={selectedAssessmentType} onValueChange={setSelectedAssessmentType}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="quizzes">Quizzes</SelectItem>
            <SelectItem value="surveys">Surveys</SelectItem>
            <SelectItem value="essays">Essays</SelectItem>
            <SelectItem value="assignments">Assignments</SelectItem>
            <SelectItem value="debates">Debates</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {selectedAssessmentType === 'quizzes' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Quizzes
              </CardTitle>
              <div className="flex items-center gap-4">
                <Select value={selectedQuizType} onValueChange={setSelectedQuizType}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Quizzes</SelectItem>
                    <SelectItem value="final">Final Quizzes</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Quiz
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentQuizzes.map((quiz) => (
                <Card key={quiz.id} className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{quiz.title}</h3>
                        <Badge className="mt-1 bg-blue-100 text-blue-800">
                          {selectedQuizType === 'final' ? 'Final Quiz' : 'General Quiz'}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600 text-sm">{quiz.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span>{quiz.timeLimit} min</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-green-600" />
                        <span>{quiz.questions} questions</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Min Score:</span>
                        <span className="ml-1 font-medium">{quiz.minScore}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Max Score:</span>
                        <span className="ml-1 font-medium">{quiz.maxScore}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleViewQuiz(quiz.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Quiz
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedAssessmentType === 'surveys' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Surveys
              </CardTitle>
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Survey
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {surveys.map((survey) => (
                <Card key={survey.id} className="border-l-4 border-l-orange-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{survey.title}</h3>
                        <Badge className="mt-1 bg-orange-100 text-orange-800">Survey</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-gray-600 text-sm">{survey.description}</p>
                      <p className="text-sm font-medium text-gray-700 mt-2">Topic: {survey.topic}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-orange-600" />
                        <span>{survey.timeLimit} min</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-green-600" />
                        <span>{survey.questions} questions</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleViewSurvey(survey.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Survey
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedAssessmentType !== 'quizzes' && selectedAssessmentType !== 'surveys' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedAssessmentType === 'essays' && (
            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-orange-600" />
                  Essays
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Written assignments and essay questions</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>3 Essays</span>
                  <span>2 Active</span>
                </div>
                <Button variant="outline" className="w-full">
                  Manage Essays
                </Button>
              </CardContent>
            </Card>
          )}

          {selectedAssessmentType === 'assignments' && (
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  Assignments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Project-based assignments and submissions</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>5 Assignments</span>
                  <span>4 Active</span>
                </div>
                <Button variant="outline" className="w-full">
                  Manage Assignments
                </Button>
              </CardContent>
            </Card>
          )}

          {selectedAssessmentType === 'debates' && (
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-red-600" />
                  Debates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Interactive debate sessions and discussions</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>2 Debates</span>
                  <span>1 Active</span>
                </div>
                <Button variant="outline" className="w-full">
                  Manage Debates
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default AssessmentCategories;