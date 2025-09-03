import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft, FileText, Clock, Users, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EmptyStateCard } from './EmptyStateCard';

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

const CourseAssessments = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [assessments, setAssessments] = useState([]);
  const [surveys] = useState(sampleSurveys);
  const [loading, setLoading] = useState(true);
  const [isPublishedCourse, setIsPublishedCourse] = useState(false);

  useEffect(() => {
    const loadAssessments = () => {
      setLoading(true);
      
      const publishedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
      const publishedCourse = publishedCourses.find((course) => course.id === courseId);
      
      if (publishedCourse) {
        setIsPublishedCourse(true);
        
        const allAssessments = [];
        
        if (publishedCourse.modules) {
          publishedCourse.modules.forEach((module) => {
            if (module.assessments && module.assessments.length > 0) {
              module.assessments.forEach((assessment) => {
                allAssessments.push({
                  id: assessment.id,
                  title: assessment.title,
                  description: assessment.description || 'No description available',
                  type: assessment.type || 'Quiz',
                  duration: assessment.duration || '30 min',
                  points: assessment.points || 100,
                  questions: assessment.questions?.length || 0
                });
              });
            }
          });
        }
        
        setAssessments(allAssessments);
      } else {
        setIsPublishedCourse(false);
        const defaultAssessments = [
          {
            id: '1',
            title: 'JavaScript Fundamentals Quiz',
            description: 'Test your knowledge of basic JavaScript concepts',
            type: 'Multiple Choice',
            duration: '30 min',
            points: 100,
            questions: 10
          },
          {
            id: '2',
            title: 'Programming Logic Assessment',
            description: 'Evaluate your understanding of programming logic and problem-solving',
            type: 'Mixed',
            duration: '45 min',
            points: 150,
            questions: 15
          }
        ];
        setAssessments(defaultAssessments);
      }
      
      setLoading(false);
    };

    loadAssessments();
  }, [courseId]);

  const handleAddAssessment = () => {
    toast.success('Add assessment functionality coming soon!');
  };

  const handleSurveyClick = (survey) => {
    navigate(`/courses/view/${courseId}/surveys/${survey.id}`);
  };

  if (loading) {
    return (
      <div className="p-6 animate-fade-in">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2">Loading assessments...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button 
            onClick={() => navigate('/courses')} 
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Course Assessments</h1>
            <p className="text-gray-600">
              Manage assessments and evaluations
              {isPublishedCourse && ' • Published Course'}
            </p>
          </div>
        </div>
        <Button onClick={handleAddAssessment} className="bg-ca-primary hover:bg-ca-secondary">
          <Plus className="h-4 w-4 mr-2" />
          Add Assessment
        </Button>
      </div>

      <div className="space-y-8">
        {assessments.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Assessments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assessments.map((assessment) => (
                <Card key={assessment.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <CardTitle className="text-lg">{assessment.title}</CardTitle>
                      </div>
                      <Badge variant="outline">{assessment.type}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{assessment.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{assessment.duration}</span>
                        <span>{assessment.points} pts</span>
                        <span>{assessment.questions} questions</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Edit
                      </Button>
                      <Button size="sm" className="flex-1 bg-ca-primary hover:bg-ca-secondary">
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-orange-500" />
            Survey Section
          </h2>
          
          {surveys.length === 0 ? (
            <EmptyStateCard
              icon={MessageSquare}
              title="No Surveys Found"
              description="Create your first survey to gather feedback and insights from students."
              actionLabel="Create First Survey"
              onAction={handleAddAssessment}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {surveys.map((survey) => (
                <Card 
                  key={survey.id} 
                  className="hover:shadow-lg transition-shadow duration-300 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-orange-500" />
                        <CardTitle className="text-lg text-orange-800">{survey.title}</CardTitle>
                      </div>
                      <Badge className="bg-orange-100 text-orange-800">Survey</Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-orange-700">Topic: {survey.topic}</p>
                      <p className="text-sm text-orange-600">{survey.description}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-orange-600">
                        <FileText className="h-4 w-4" />
                        <span>Questions: {survey.questions}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-orange-600">
                        <Clock className="h-4 w-4" />
                        <span>Time Limit: {survey.timeLimit} minutes</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-orange-600">
                        <Users className="h-4 w-4" />
                        <span>Responses: {survey.totalResponses}/{survey.totalStudents}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 border-orange-200 text-orange-700 hover:bg-orange-100">
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                        onClick={() => handleSurveyClick(survey)}
                      >
                        View Survey
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {assessments.length === 0 && surveys.length === 0 && (
          <EmptyStateCard
            icon={FileText}
            title="No Assessments Found"
            description={
              isPublishedCourse 
                ? "This course doesn't have any assessments yet. Create your first assessment to evaluate student progress."
                : "No assessments available for this course."
            }
            actionLabel="Create First Assessment"
            onAction={handleAddAssessment}
          />
        )}
      </div>
    </div>
  );
};

export default CourseAssessments;