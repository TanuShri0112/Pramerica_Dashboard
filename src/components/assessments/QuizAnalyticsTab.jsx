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

const scoreDistributionData = [
  { range: '90-100', count: 8, percentage: 18 },
  { range: '80-89', count: 12, percentage: 27 },
  { range: '70-79', count: 15, percentage: 33 },
  { range: '60-69', count: 7, percentage: 16 },
  { range: '50-59', count: 3, percentage: 6 }
];

const statusData = [
  { name: 'Completed', value: 32, color: '#10B981' },
  { name: 'In Progress', value: 8, color: '#F59E0B' },
  { name: 'Not Attempted', value: 5, color: '#6B7280' }
];

const QuizAnalyticsTab = ({ quiz }) => {
  const totalAttempts = 85;
  const totalQuestions = quiz?.questions || 10;
  const passedParticipants = 68;
  const failedParticipants = 17;
  const averageScore = 78;
  const highestScore = 95;
  const lowestScore = 52;
  const maxScore = quiz?.maxScore || 100;
  const minScore = quiz?.minScore || 0;
  const timeEstimate = quiz?.timeLimit || 30;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Quiz Analytics</h3>
          <p className="text-sm text-gray-600">Comprehensive analysis of quiz performance</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: '📊',
            value: totalAttempts,
            label: 'Total Attempts',
            color: 'blue'
          },
          {
            icon: '❓',
            value: totalQuestions,
            label: 'Total Questions',
            color: 'purple'
          },
          {
            icon: '✅',
            value: passedParticipants,
            label: 'Passed Participants',
            color: 'green'
          },
          {
            icon: '❌',
            value: failedParticipants,
            label: 'Failed Participants',
            color: 'red'
          },
          {
            icon: '📈',
            value: `${averageScore}%`,
            label: 'Average Score',
            color: 'blue'
          },
          {
            icon: '🏆',
            value: `${highestScore}%`,
            label: 'Highest Score',
            color: 'green'
          },
          {
            icon: '📉',
            value: `${lowestScore}%`,
            label: 'Lowest Score',
            color: 'red'
          },
          {
            icon: '🎯',
            value: maxScore,
            label: 'Max Score',
            color: 'orange'
          },
          {
            icon: '📏',
            value: minScore,
            label: 'Min Score',
            color: 'gray'
          },
          {
            icon: '⏱️',
            value: `${timeEstimate} min`,
            label: 'Time Estimate',
            color: 'indigo'
          }
        ].map((item, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 bg-${item.color}-100 rounded-lg`}>
                  <div className={`h-5 w-5 text-${item.color}-600`}>{item.icon}</div>
                </div>
                <div>
                  <p className={`text-2xl font-bold text-${item.color}-600`}>{item.value}</p>
                  <p className="text-sm text-gray-600">{item.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Score Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={scoreDistributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Submission Status */}
        <Card>
          <CardHeader>
            <CardTitle>Submission Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizAnalyticsTab;
