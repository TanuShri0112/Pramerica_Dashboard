import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Users, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SurveyOverviewTab } from '@/components/assessments/SurveyOverviewTab';
import { SurveyQuestionsTab } from '@/components/assessments/SurveyQuestionsTab';
import SurveyResponsesTab from '@/components/assessments/SurveyResponsesTab';
import { SurveySubmissionStatusTab } from '@/components/assessments/SurveySubmissionStatusTab';
import SurveyAnalyticsTab from '@/components/assessments/SurveyAnalyticsTab';

// Sample survey data
const sampleSurveyData = {
  'survey-1': {
    id: 'survey-1',
    title: 'Survey 1',
    topic: 'Course Feedback Survey',
    description: 'Help us improve the course content and delivery by sharing your feedback on the learning experience.',
    timeLimit: 15,
    questions: 8,
    totalResponses: 24,
    totalStudents: 30
  },
  'survey-2': {
    id: 'survey-2',
    title: 'Survey 2',
    topic: 'Module Assessment Survey',
    description: 'Evaluate your understanding and satisfaction with the current module content and structure.',
    timeLimit: 10,
    questions: 6,
    totalResponses: 18,
    totalStudents: 30
  },
  'survey-3': {
    id: 'survey-3',
    title: 'Survey 3',
    topic: 'Learning Experience Survey',
    description: 'Share your thoughts on the overall learning experience and suggest improvements.',
    timeLimit: 12,
    questions: 7,
    totalResponses: 12,
    totalStudents: 30
  },
  'survey-4': {
    id: 'survey-4',
    title: 'Survey 4',
    topic: 'Content Quality Survey',
    description: 'Rate the quality and relevance of the course materials and resources provided.',
    timeLimit: 8,
    questions: 5,
    totalResponses: 22,
    totalStudents: 30
  }
};

const SurveyInstructorPage = () => {
  const { moduleId, surveyId } = useParams();
  const navigate = useNavigate();

  const [survey, setSurvey] = useState(sampleSurveyData[surveyId] || sampleSurveyData['survey-1']);

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
              <h1 className="text-2xl font-bold">Survey Instructor Dashboard</h1>
              <p className="text-gray-600">Manage and evaluate survey activities</p>
            </div>
          </div>

          {/* Survey Header */}
          <Card className="mb-6 bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <CardTitle className="text-orange-800">{survey.topic}</CardTitle>
                    <Badge className="bg-orange-100 text-orange-800">Survey</Badge>
                  </div>
                  <p className="text-orange-600 mb-4">{survey.description}</p>
                  <div className="flex items-center gap-6 text-sm text-orange-600">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Time: {survey.timeLimit} minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>{survey.questions} questions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{survey.totalResponses}/{survey.totalStudents} responses</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Survey Tabs */}
          <Card>
            <Tabs defaultValue="overview" className="w-full">
              <div className="border-b">
                <TabsList className="grid w-full grid-cols-5 bg-gray-50">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="questions">Questions</TabsTrigger>
                  <TabsTrigger value="responses">Responses</TabsTrigger>
                  <TabsTrigger value="submission-status">Submission Status</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
              </div>

              <ScrollArea className="h-[600px]">
                <TabsContent value="overview" className="p-6">
                  <SurveyOverviewTab survey={survey} onUpdate={setSurvey} />
                </TabsContent>

                <TabsContent value="questions" className="p-6">
                  <SurveyQuestionsTab survey={survey} onUpdate={setSurvey} />
                </TabsContent>

                <TabsContent value="responses" className="p-6">
                  <SurveyResponsesTab survey={survey} />
                </TabsContent>

                <TabsContent value="submission-status" className="p-6">
                  <SurveySubmissionStatusTab survey={survey} />
                </TabsContent>

                <TabsContent value="analytics" className="p-6">
                  <SurveyAnalyticsTab survey={survey} />
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default SurveyInstructorPage;
