import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, MessageSquare, FileText, Clock, Target, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import AssignmentListing  from '@/components/assignments/AssignmentListing';

// Sample quiz data
const sampleQuizzes = [
  {
    id: 'quiz-1',
    title: 'Quiz 1',
    description: 'Assessment Quiz - 10 questions covering various topics',
    type: 'general',
    timeLimit: '30 minutes',
    attempts: 'unlimited',
    questions: 10,
    difficulty: 'Medium'
  },
  {
    id: 'quiz-2',
    title: 'Quiz 2',
    description: 'Assessment Quiz - 10 questions covering various topics',
    type: 'general',
    timeLimit: '25 minutes',
    attempts: '3',
    questions: 10,
    difficulty: 'Medium'
  },
  {
    id: 'quiz-3',
    title: 'Quiz 3',
    description: 'Assessment Quiz - 10 questions covering various topics',
    type: 'final',
    timeLimit: '45 minutes',
    attempts: '1',
    questions: 15,
    difficulty: 'Hard'
  },
  {
    id: 'quiz-4',
    title: 'Quiz 4',
    description: 'Assessment Quiz - 10 questions covering various topics',
    type: 'general',
    timeLimit: '20 minutes',
    attempts: 'unlimited',
    questions: 8,
    difficulty: 'Easy'
  },
  {
    id: 'quiz-5',
    title: 'Quiz 5',
    description: 'Assessment Quiz - 10 questions covering various topics',
    type: 'general',
    timeLimit: '35 minutes',
    attempts: '2',
    questions: 12,
    difficulty: 'Medium'
  },
  {
    id: 'quiz-6',
    title: 'Quiz 6',
    description: 'Assessment Quiz - 10 questions covering various topics',
    type: 'final',
    timeLimit: '60 minutes',
    attempts: '1',
    questions: 20,
    difficulty: 'Hard'
  }
];

// Sample debate data
const sampleDebates = [
  {
    id: 'debate-1',
    title: 'Debate 1: Technology\'s Impact on Society',
    description: 'Discuss whether technology has done more harm than good to modern society.',
    topic: 'Technology has done more harm than good to society',
    maxScore: 50,
    difficulty: 'Medium',
    format: 'Class discussion',
    participants: [
      {
        id: 'user-1',
        name: 'John Smith',
        email: 'john@example.com',
        avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png',
        team: 'for',
        status: 'completed'
      },
      {
        id: 'user-2',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png',
        team: 'against',
        status: 'pending'
      },
      {
        id: 'user-3',
        name: 'Mike Wilson',
        email: 'mike@example.com',
        avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png',
        team: 'for',
        status: 'not-attempted'
      }
    ],
    forUsers: ['user-1', 'user-3'],
    againstUsers: ['user-2'],
    submissions: [
      {
        id: 'sub-1',
        userId: 'user-1',
        userName: 'John Smith',
        position: 'for',
        response: 'Technology has revolutionized healthcare, education, and communication, making our lives significantly better. The benefits far outweigh the drawbacks.',
        score: 42,
        submittedAt: '2024-01-15T10:30:00Z'
      },
      {
        id: 'sub-2',
        userId: 'user-2',
        userName: 'Sarah Johnson',
        position: 'against',
        response: 'While technology has benefits, it has also led to social isolation, job displacement, and privacy concerns that are harming society.',
        submittedAt: '2024-01-15T11:15:00Z'
      }
    ]
  },
  {
    id: 'debate-2',
    title: 'Debate 2: Climate Change Solutions',
    description: 'Debate the effectiveness of individual vs. governmental action on climate change.',
    topic: 'Individual actions are more important than government policies for climate change',
    maxScore: 60,
    difficulty: 'Hard',
    format: 'Open forum',
    participants: [
      {
        id: 'user-4',
        name: 'Emily Davis',
        email: 'emily@example.com',
        avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png',
        team: 'for',
        status: 'completed'
      },
      {
        id: 'user-5',
        name: 'Robert Brown',
        email: 'robert@example.com',
        avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png',
        team: 'against',
        status: 'completed'
      }
    ],
    forUsers: ['user-4'],
    againstUsers: ['user-5'],
    submissions: [
      {
        id: 'sub-3',
        userId: 'user-4',
        userName: 'Emily Davis',
        position: 'for',
        response: 'Individual actions create awareness and drive demand for sustainable products, ultimately forcing policy changes.',
        score: 55,
        submittedAt: '2024-01-16T09:20:00Z'
      },
      {
        id: 'sub-4',
        userId: 'user-5',
        userName: 'Robert Brown',
        position: 'against',
        response: 'Government policies have the scale and authority to create systemic changes that individual actions cannot achieve.',
        score: 58,
        submittedAt: '2024-01-16T10:45:00Z'
      }
    ]
  }
];

// Sample essay data
const sampleEssays = [
  {
    id: 'essay-1',
    title: 'Essay 1: Technology and Society',
    description: 'Write a comprehensive essay on the impact of technology on modern society and human relationships.',
    topic: 'Analyze how technology has transformed the way we communicate, work, and interact in the 21st century.',
    timeLimit: 120,
    wordLimit: 1000,
    difficulty: 'Medium',
    maxScore: 100
  },
  {
    id: 'essay-2',
    title: 'Essay 2: Climate Change Solutions',
    description: 'Analyze various approaches to addressing climate change and propose innovative solutions.',
    topic: 'Evaluate current climate change mitigation strategies and propose sustainable solutions for the future.',
    timeLimit: 150,
    wordLimit: 1200,
    difficulty: 'Hard',
    maxScore: 120
  },
  {
    id: 'essay-3',
    title: 'Essay 3: Economic Inequality',
    description: 'Examine the causes and consequences of economic inequality in modern society.',
    topic: 'Discuss the factors contributing to economic inequality and propose potential solutions.',
    timeLimit: 135,
    wordLimit: 1100,
    difficulty: 'Medium',
    maxScore: 110
  }
];

// Sample survey data
const sampleSurveys = [
  {
    id: 'survey-1',
    title: 'Survey 1',
    topic: 'Course Feedback Survey',
    description: 'Help us improve the course content and delivery by sharing your feedback on the learning experience.',
    timeLimit: 15,
    questions: 8,
    totalResponses: 24,
    totalStudents: 30
  },
  {
    id: 'survey-2',
    title: 'Survey 2', 
    topic: 'Module Assessment Survey',
    description: 'Evaluate your understanding and satisfaction with the current module content and structure.',
    timeLimit: 10,
    questions: 6,
    totalResponses: 18,
    totalStudents: 30
  },
  {
    id: 'survey-3',
    title: 'Survey 3',
    topic: 'Learning Experience Survey', 
    description: 'Share your thoughts on the overall learning experience and suggest improvements.',
    timeLimit: 12,
    questions: 7,
    totalResponses: 12,
    totalStudents: 30
  },
  {
    id: 'survey-4',
    title: 'Survey 4',
    topic: 'Content Quality Survey',
    description: 'Rate the quality and relevance of the course materials and resources provided.',
    timeLimit: 8,
    questions: 5,
    totalResponses: 22,
    totalStudents: 30
  }
];

const ModuleAssessments = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [debates] = useState(sampleDebates);
  const [quizzes] = useState(sampleQuizzes);
  const [essays] = useState(sampleEssays);
  const [surveys] = useState(sampleSurveys);
  const [quizFilter, setQuizFilter] = useState('general');

  const handleDebateClick = (debate) => {
    navigate(`/courses/modules/${moduleId}/debates/${debate.id}`);
  };

  const handleQuizClick = (quiz) => {
    navigate(`/courses/modules/${moduleId}/quizzes/${quiz.id}`);
  };

  const handleEssayClick = (essay) => {
    navigate(`/courses/modules/${moduleId}/essays/${essay.id}`);
  };

  const handleSurveyClick = (survey) => {
    navigate(`/courses/modules/${moduleId}/surveys/${survey.id}`);
  };

  const handleAddNewAssessment = () => {
    navigate(`/courses/builder/1757539/modules/${moduleId}/assessments/creator`);
  };

  const filteredQuizzes = quizFilter === 'general' ? quizzes.filter(quiz => quiz.type === 'general') : quizzes.filter(quiz => quiz.type === 'final');

  const getAssignmentCount = () => {
    const savedAssignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    const moduleAssignments = savedAssignments.filter((a) => a.id.includes(moduleId)) || [];
    return moduleAssignments.length > 0 ? moduleAssignments.length : 3;
  };

  const assessmentSections = [
    {
      id: 'quiz',
      title: 'Quiz Section',
      description: 'Test your knowledge with various question formats',
      icon: '📝',
      color: 'bg-blue-50 border-blue-200',
      iconBg: 'bg-blue-100',
      items: filteredQuizzes
    },
    {
      id: 'assignment',
      title: 'Assignment Section', 
      description: 'Submit projects and practical assignments',
      icon: '📁',
      color: 'bg-green-50 border-green-200',
      iconBg: 'bg-green-100',
      items: []
    },
    {
      id: 'essay',
      title: 'Essay Section',
      description: 'Write detailed essays and analytical pieces',
      icon: '✍️',
      color: 'bg-purple-50 border-purple-200', 
      iconBg: 'bg-purple-100',
      items: essays
    },
    {
      id: 'survey',
      title: 'Survey Section',
      description: 'Participate in course feedback and surveys',
      icon: '📊',
      color: 'bg-yellow-50 border-yellow-200',
      iconBg: 'bg-yellow-100',
      items: surveys
    },
    {
      id: 'debate',
      title: 'Debate Section',
      description: 'Engage in structured debates and discussions',
      icon: '💬',
      color: 'bg-red-50 border-red-200',
      iconBg: 'bg-red-100',
      items: debates
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getQuizTypeColor = (type) => {
    return type === 'final' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-auto">
      <div className="p-6 animate-fade-in max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            onClick={() => navigate('/courses/view/1757539/modules')} 
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Modules
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Module {moduleId} - Assessments</h1>
            <p className="text-gray-600">
              Explore and create assessments for this module
            </p>
          </div>
          <Button 
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleAddNewAssessment}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Assessment
          </Button>
        </div>

        <Card className="mb-6 bg-gradient-to-r from-purple-100 to-blue-100 border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-800">Introduction to Business Trust</CardTitle>
            <p className="text-purple-600">
              Learn the fundamentals of business trusts, their structure, and legal implications in modern business practices.
            </p>
            <div className="flex items-center gap-2 text-sm text-purple-600">
              <span>⏱️ Estimated time: 2 hours 30 minutes</span>
            </div>
          </CardHeader>
        </Card>

        <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Assessment Categories</h2>
          <p className="text-gray-600 mb-6">Create and manage different types of assessments for your course</p>
          
          <Accordion type="multiple" className="space-y-4">
            {assessmentSections.map((section) => (
              <AccordionItem key={section.id} value={section.id} className="border-0">
                <Card className={`${section.color} transition-all duration-200 hover:shadow-md`}>
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-4 w-full">
                      <div className={`w-10 h-10 ${section.iconBg} rounded-lg flex items-center justify-center text-lg`}>
                        {section.icon}
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="font-semibold text-gray-800">{section.title}</h3>
                        <p className="text-sm text-gray-600">{section.description}</p>
                      </div>
                      {section.id === 'quiz' && (
                        <div className="flex items-center gap-4">
                          <Select value={quizFilter} onValueChange={setQuizFilter}>
                            <SelectTrigger className="w-40 bg-white">
                              <SelectValue placeholder="Filter quizzes" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">General Quiz</SelectItem>
                              <SelectItem value="final">Final Quiz</SelectItem>
                            </SelectContent>
                          </Select>
                          <Badge className="bg-blue-100 text-blue-800">
                            {filteredQuizzes.length} quizzes
                          </Badge>
                        </div>
                      )}
                      {section.id === 'assignment' && (
                        <Badge className="bg-green-100 text-green-800">
                          {getAssignmentCount()} assignments
                        </Badge>
                      )}
                      {section.id === 'essay' && section.items.length > 0 && (
                        <Badge className="bg-purple-100 text-purple-800">
                          {section.items.length} essays
                        </Badge>
                      )}
                      {section.id === 'survey' && section.items.length > 0 && (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          {section.items.length} surveys
                        </Badge>
                      )}
                      {section.id === 'debate' && section.items.length > 0 && (
                        <Badge className="bg-red-100 text-red-800">
                          {section.items.length} debates
                        </Badge>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="pt-4 border-t border-gray-200 max-h-96 overflow-y-auto">
                      {section.id === 'assignment' ? (
                        <AssignmentListing moduleId={moduleId || ''} />
                      ) : section.id === 'survey' && section.items.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {section.items.map((survey) => (
                            <Card key={survey.id} className="bg-white hover:shadow-md transition-shadow cursor-pointer border border-yellow-200" onClick={() => handleSurveyClick(survey)}>
                              <CardContent className="p-4">
                                <div className="space-y-3">
                                  <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                      <MessageSquare className="h-5 w-5 text-yellow-600" />
                                      <h4 className="font-semibold text-gray-900 text-sm">{survey.title}</h4>
                                    </div>
                                    <Badge className="bg-yellow-100 text-yellow-800">Survey</Badge>
                                  </div>
                                  
                                  <div className="space-y-1">
                                    <p className="text-xs font-medium text-yellow-700">Topic: {survey.topic}</p>
                                    <p className="text-xs text-gray-600 line-clamp-2">{survey.description}</p>
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                      <Clock className="h-3 w-3" />
                                      <span>Time: {survey.timeLimit} minutes</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                      <Target className="h-3 w-3" />
                                      <span>{survey.questions} questions</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                      <MessageSquare className="h-3 w-3" />
                                      <span>{survey.totalResponses}/{survey.totalStudents} responses</span>
                                    </div>
                                  </div>
                                  
                                  <Button 
                                    size="sm" 
                                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSurveyClick(survey);
                                    }}
                                  >
                                    View Survey
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : section.id === 'quiz' && section.items.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {section.items.map((quiz) => (
                            <Card key={quiz.id} className="bg-white hover:shadow-md transition-shadow cursor-pointer border border-blue-200" onClick={() => handleQuizClick(quiz)}>
                              <CardContent className="p-4">
                                <div className="space-y-3">
                                  <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                      <FileText className="h-5 w-5 text-blue-600" />
                                      <h4 className="font-semibold text-gray-900 text-sm">{quiz.title}</h4>
                                    </div>
                                    <Badge className={getQuizTypeColor(quiz.type)}>
                                      {quiz.type === 'final' ? 'Final Quiz' : 'General Quiz'}
                                    </Badge>
                                  </div>
                                  
                                  <p className="text-xs text-gray-600 line-clamp-2">{quiz.description}</p>
                                  
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                      <Clock className="h-3 w-3" />
                                      <span>Time: {quiz.timeLimit}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                      <RotateCcw className="h-3 w-3" />
                                      <span>Attempts: {quiz.attempts}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                      <Target className="h-3 w-3" />
                                      <span>{quiz.questions} questions</span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                    <Badge className={getDifficultyColor(quiz.difficulty)}>
                                      {quiz.difficulty}
                                    </Badge>
                                  </div>
                                  
                                  <Button 
                                    size="sm" 
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleQuizClick(quiz);
                                    }}
                                  >
                                    View Quiz
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : section.id === 'essay' && section.items.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {section.items.map((essay) => (
                            <Card key={essay.id} className="bg-white hover:shadow-md transition-shadow cursor-pointer border border-purple-200" onClick={() => handleEssayClick(essay)}>
                              <CardContent className="p-4">
                                <div className="space-y-3">
                                  <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                      <FileText className="h-5 w-5 text-purple-600" />
                                      <h4 className="font-semibold text-gray-900 text-sm">{essay.title}</h4>
                                    </div>
                                    <Badge className={getDifficultyColor(essay.difficulty)}>
                                      {essay.difficulty}
                                    </Badge>
                                  </div>
                                  
                                  <p className="text-xs text-gray-600 line-clamp-2">{essay.description}</p>
                                  
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                      <Clock className="h-3 w-3" />
                                      <span>Time: {essay.timeLimit} minutes</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                      <FileText className="h-3 w-3" />
                                      <span>Word Limit: {essay.wordLimit}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                      <Target className="h-3 w-3" />
                                      <span>Max Score: {essay.maxScore}</span>
                                    </div>
                                  </div>
                                  
                                  <Button 
                                    size="sm" 
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEssayClick(essay);
                                    }}
                                  >
                                    View Essay
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : section.id === 'debate' && section.items.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {section.items.map((debate) => (
                            <Card key={debate.id} className="bg-white hover:shadow-md transition-shadow cursor-pointer border border-red-200" onClick={() => handleDebateClick(debate)}>
                              <CardContent className="p-4">
                                <div className="space-y-3">
                                  <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                      <MessageSquare className="h-5 w-5 text-red-600" />
                                      <h4 className="font-semibold text-gray-900 text-sm">{debate.title}</h4>
                                    </div>
                                    <Badge className={getDifficultyColor(debate.difficulty)}>
                                      {debate.difficulty}
                                    </Badge>
                                  </div>
                                  
                                  <p className="text-xs text-gray-600 line-clamp-2">{debate.description}</p>
                                  
                                  <div className="text-xs text-gray-500 italic">
                                    Topic: {debate.topic}
                                  </div>
                                  
                                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                    <div className="flex items-center gap-3 text-xs text-gray-600">
                                      <span>Max Score: {debate.maxScore}</span>
                                      <span>Format: {debate.format}</span>
                                    </div>
                                  </div>
                                  
                                  <Button 
                                    size="sm" 
                                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDebateClick(debate);
                                    }}
                                  >
                                    View Debate
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : section.items.length === 0 && section.id !== 'assignment' ? (
                        <div className="text-center py-8 text-gray-500">
                          <p className="mb-4">No assessments in this section yet</p>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="bg-white hover:bg-gray-50"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Create First Assessment
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {section.items.map((item, index) => (
                            <div key={index} className="p-3 bg-white rounded border">
                              {item.title}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ModuleAssessments;