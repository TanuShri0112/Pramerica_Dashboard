import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, FileText, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { EssayOverviewTab } from '@/components/assessments/EssayOverviewTab';
import { EssayScoresTab } from '@/components/assessments/EssayScoresTab';
import { EssaySubmissionStatusTab } from '@/components/assessments/EssaySubmissionStatusTab';
import { EssayAnalyticsTab } from '@/components/assessments/EssayAnalyticsTab';

// Sample essay data
const sampleEssayData = {
  'essay-1': {
    id: 'essay-1',
    title: 'Technology and Society',
    description:
      'Write a comprehensive essay on the impact of technology on modern society and human relationships.',
    topic:
      'Analyze how technology has transformed the way we communicate, work, and interact in the 21st century.',
    timeLimit: 120,
    wordLimit: 1000,
    difficulty: 'Medium',
    maxScore: 100,
  },
  'essay-2': {
    id: 'essay-2',
    title: 'Climate Change Solutions',
    description:
      'Analyze various approaches to addressing climate change and propose innovative solutions.',
    topic:
      'Evaluate current climate change mitigation strategies and propose sustainable solutions for the future.',
    timeLimit: 150,
    wordLimit: 1200,
    difficulty: 'Hard',
    maxScore: 120,
  },
};

const EssayInstructorPage = () => {
  const { moduleId, essayId } = useParams();
  const navigate = useNavigate();
  const [essay, setEssay] = useState(
    sampleEssayData[essayId] || sampleEssayData['essay-1']
  );

  const handleBack = () => {
    navigate(`/courses/modules/${moduleId}/assessments`);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
              <h1 className="text-2xl font-bold">Essay Instructor Dashboard</h1>
              <p className="text-gray-600">Manage and evaluate essay submissions</p>
            </div>
          </div>

          {/* Essay Header */}
          <Card className="mb-6 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <CardTitle className="text-purple-800">{essay.title}</CardTitle>
                      <Badge className={getDifficultyColor(essay.difficulty)}>
                        {essay.difficulty}
                      </Badge>
                    </div>
                    <p className="text-purple-600 mb-2">{essay.description}</p>
                    <p className="text-purple-700 font-medium mb-4 italic">
                      Topic: {essay.topic}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-purple-600">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Time: {essay.timeLimit} minutes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span>Word Limit: {essay.wordLimit} words</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        <span>Max Score: {essay.maxScore}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Essay Tabs */}
          <Card>
            <Tabs defaultValue="overview" className="w-full">
              <div className="border-b">
                <TabsList className="grid w-full grid-cols-4 bg-gray-50">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="scores">Scores</TabsTrigger>
                  <TabsTrigger value="submission-status">Submission Status</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
              </div>

              <ScrollArea className="h-[600px]">
                <TabsContent value="overview" className="p-6">
                  <EssayOverviewTab essay={essay} onUpdate={setEssay} />
                </TabsContent>

                <TabsContent value="scores" className="p-6">
                  <EssayScoresTab essay={essay} />
                </TabsContent>

                <TabsContent value="submission-status" className="p-6">
                  <EssaySubmissionStatusTab essay={essay} />
                </TabsContent>

                <TabsContent value="analytics" className="p-6">
                  <EssayAnalyticsTab essay={essay} />
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default EssayInstructorPage;
