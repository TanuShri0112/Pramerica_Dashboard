import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, Clock, Users, MessageSquare } from 'lucide-react';

// Sample analytics data
const responseData = [
  { question: 'Q1', responses: 24 },
  { question: 'Q2', responses: 22 },
  { question: 'Q3', responses: 20 },
  { question: 'Q4', responses: 18 },
  { question: 'Q5', responses: 15 },
  { question: 'Q6', responses: 12 },
  { question: 'Q7', responses: 10 },
  { question: 'Q8', responses: 8 }
];

const completionData = [
  { name: 'Completed', value: 24, color: '#10b981' },
  { name: 'Not Attempted', value: 6, color: '#6b7280' }
];

const responseTimeData = [
  { timeRange: '0-5 min', count: 8 },
  { timeRange: '5-10 min', count: 12 },
  { timeRange: '10-15 min', count: 4 },
  { timeRange: '15+ min', count: 0 }
];

const mcqAnalytics = [
  {
    question: 'How would you rate the course content?',
    responses: [
      { option: 'Excellent', count: 12, percentage: 50 },
      { option: 'Good', count: 8, percentage: 33 },
      { option: 'Average', count: 3, percentage: 13 },
      { option: 'Poor', count: 1, percentage: 4 }
    ]
  },
  {
    question: 'Was the pace appropriate?',
    responses: [
      { option: 'Just right', count: 15, percentage: 75 },
      { option: 'Too fast', count: 4, percentage: 20 },
      { option: 'Too slow', count: 1, percentage: 5 }
    ]
  }
];

const SurveyAnalyticsTab = ({ survey }) => {
  const completionRate = Math.round((survey.totalResponses / survey.totalStudents) * 100);
  const averageResponseTime = '8.5 minutes';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Survey Analytics</h3>
          <p className="text-sm text-gray-600">Visual insights and statistics from survey responses</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold">{completionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Responses</p>
                <p className="text-2xl font-bold">{survey.totalResponses}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-full">
                <Clock className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Response Time</p>
                <p className="text-2xl font-bold">{averageResponseTime}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <MessageSquare className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Questions</p>
                <p className="text-2xl font-bold">{survey.questions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Responses per Question</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={responseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="question" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="responses" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completion Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={completionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {completionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Response Time Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Response Time Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timeRange" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* MCQ Analytics */}
      <div className="space-y-6">
        <h4 className="text-lg font-semibold">Multiple Choice Question Analysis</h4>
        {mcqAnalytics.map((mcq, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-base">{mcq.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mcq.responses.map((response, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-sm font-medium">{response.option}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${response.percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{response.count} votes</Badge>
                      <span className="text-sm font-medium">{response.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Insights Section */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-1 rounded-full flex-shrink-0">
                <TrendingUp className="h-3 w-3 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">High Engagement</p>
                <p className="text-sm text-gray-600">
                  80% completion rate indicates strong student engagement with the survey.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-1 rounded-full flex-shrink-0">
                <MessageSquare className="h-3 w-3 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Positive Feedback</p>
                <p className="text-sm text-gray-600">
                  Most students rated the course content as 'Excellent' or 'Good'.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-orange-100 p-1 rounded-full flex-shrink-0">
                <Clock className="h-3 w-3 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Optimal Duration</p>
                <p className="text-sm text-gray-600">
                  Average response time of 8.5 minutes shows appropriate survey length.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SurveyAnalyticsTab;
