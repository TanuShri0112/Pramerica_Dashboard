import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const scoreDistributionData = [
  { range: '90-100', count: 3, percentage: 50 },
  { range: '80-89', count: 1, percentage: 17 },
  { range: '70-79', count: 0, percentage: 0 },
  { range: '60-69', count: 0, percentage: 0 },
  { range: '0-59', count: 2, percentage: 33 }
];

const wordCountData = [
  { range: '0-200', count: 1 },
  { range: '200-400', count: 0 },
  { range: '400-600', count: 0 },
  { range: '600-800', count: 1 },
  { range: '800-1000', count: 2 },
  { range: '1000+', count: 2 }
];

const timeSpentData = [
  { range: '0-30 min', count: 0 },
  { range: '30-60 min', count: 1 },
  { range: '60-90 min', count: 0 },
  { range: '90-120 min', count: 3 },
  { range: '120+ min', count: 2 }
];

const statusData = [
  { name: 'Completed', value: 6, color: '#10B981' },
  { name: 'Not Attempted', value: 2, color: '#6B7280' }
];

export const EssayAnalyticsTab = ({ essay }) => {
  const avgScore = 82;
  const highestScore = 98;
  const lowestScore = 45;
  const completionRate = 75;
  const avgWordCount = 712;
  const avgTimeSpent = 93;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Essay Analytics</h3>
          <p className="text-sm text-gray-600">Comprehensive analysis of essay performance and engagement</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{avgScore}%</p>
            <p className="text-sm text-gray-600">Average Score</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{highestScore}%</p>
            <p className="text-sm text-gray-600">Highest Score</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">{lowestScore}%</p>
            <p className="text-sm text-gray-600">Lowest Score</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">{completionRate}%</p>
            <p className="text-sm text-gray-600">Completion Rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">{avgWordCount}</p>
            <p className="text-sm text-gray-600">Avg Word Count</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-indigo-600">{avgTimeSpent}m</p>
            <p className="text-sm text-gray-600">Avg Time Spent</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
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

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Word Count Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Word Count Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={wordCountData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Time Spent Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Time Spent Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={timeSpentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};