import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BarChart3, Users, FileText, MessageSquare, TrendingUp } from 'lucide-react';

const CourseScores = () => {
  // Sample data for the performance overview
  const overallPerformance = {
    courseScore: 65,
    totalPoints: '850,140 points',
    completed: 10,
    totalAssessments: 16,
    remaining: 4,
    avgScore: 81
  };

  const sectionPerformance = [
    {
      title: 'Quiz Section',
      description: '10 assessments completed',
      maxScore: 340,
      avgScore: 85,
      percentage: 80,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      icon: BarChart3
    },
    {
      title: 'Essay Section', 
      description: '3 assessments completed',
      maxScore: 180,
      avgScore: 90,
      percentage: 67,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      icon: FileText
    },
    {
      title: 'Assignment Section',
      description: '4 assessments completed', 
      maxScore: 240,
      avgScore: 80,
      percentage: 75,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      icon: Users
    },
    {
      title: 'Debate Section',
      description: '2 assessments completed',
      maxScore: 45,
      avgScore: 45, 
      percentage: 50,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      icon: MessageSquare
    }
  ];

  const recentActivity = [
    { name: 'JavaScript Fundamentals Quiz', time: '2 hours ago', score: '85/100' },
    { name: 'Technology Essay', time: '1 day ago', score: '92/100' },
    { name: 'Legal Research Assignment', time: '2 days ago', score: '78/100' },
    { name: 'Ethics Debate', time: '1 week ago', score: '85/100' }
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Course Performance Overview</h1>
          <p className="text-gray-600">Track your progress across all assessment sections</p>
        </div>
        <Button variant="outline" className="text-blue-600">
          <TrendingUp className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </div>

      {/* Overall Course Performance */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Overall Course Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{overallPerformance.courseScore}%</div>
              <div className="text-sm text-blue-700">Course Score</div>
              <div className="text-xs text-blue-600">{overallPerformance.totalPoints}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{overallPerformance.completed}</div>
              <div className="text-sm text-green-700">Completed</div>
              <div className="text-xs text-green-600">out of {overallPerformance.totalAssessments} total</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{overallPerformance.remaining}</div>
              <div className="text-sm text-orange-700">Remaining</div>
              <div className="text-xs text-orange-600">assessments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{overallPerformance.avgScore}</div>
              <div className="text-sm text-purple-700">Avg Score</div>
              <div className="text-xs text-purple-600">per assessment</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance by Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Performance by Section</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sectionPerformance.map((section, index) => (
            <Card key={index} className={`${section.bgColor} border-2`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-md ${section.bgColor}`}>
                      <section.icon className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{section.title}</h3>
                      <p className="text-sm text-gray-600">{section.description}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {section.percentage}%
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold">{section.maxScore}</div>
                    <div className="text-xs text-gray-600">Max Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold">{section.avgScore}</div>
                    <div className="text-xs text-gray-600">Avg Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold">{section.percentage}%</div>
                    <div className="text-xs text-gray-600">Performance</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Progress value={section.percentage} className="h-2" />
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm" className="text-xs text-blue-600">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Assessment Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Recent Assessment Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{activity.name}</div>
                  <div className="text-sm text-gray-600">{activity.time}</div>
                </div>
                <Badge variant="outline" className="font-semibold">
                  {activity.score}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseScores;