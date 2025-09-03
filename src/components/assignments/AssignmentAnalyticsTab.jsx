import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Users, Target, Clock, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AssignmentAnalyticsTab = ({ assignment }) => {
  // Sample analytics data
  const scoreDistribution = [
    { range: '0-20', count: 1 },
    { range: '21-40', count: 2 },
    { range: '41-60', count: 3 },
    { range: '61-80', count: 8 },
    { range: '81-100', count: 12 }
  ];

  const completionData = [
    { name: 'Completed', value: 26, color: '#10b981' },
    { name: 'Not Attempted', value: 4, color: '#ef4444' }
  ];

  const analytics = {
    highestScore: 95,
    lowestScore: 45,
    averageScore: 84.2,
    totalParticipants: 30,
    completionRate: 86.7,
    averageTimeSpent: 52,
    passRate: 93.3
  };

  const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {change && (
              <div className={`flex items-center gap-1 text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                <span>{Math.abs(change)}%</span>
              </div>
            )}
          </div>
          <div className={`p-2 rounded-md ${color}`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Assignment Analytics</h2>
        <p className="text-gray-600">Comprehensive insights and performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Highest Score"
          value={`${analytics.highestScore}/${assignment.maxScore}`}
          change={5.2}
          icon={Award}
          color="bg-green-500"
        />
        <StatCard
          title="Lowest Score"
          value={`${analytics.lowestScore}/${assignment.maxScore}`}
          change={-2.8}
          icon={Target}
          color="bg-red-500"
        />
        <StatCard
          title="Average Score"
          value={`${analytics.averageScore}/${assignment.maxScore}`}
          change={3.1}
          icon={TrendingUp}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Participants"
          value={analytics.totalParticipants}
          icon={Users}
          color="bg-purple-500"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Completion Rate"
          value={`${analytics.completionRate}%`}
          change={1.5}
          icon={Target}
          color="bg-emerald-500"
        />
        <StatCard
          title="Average Time Spent"
          value={`${analytics.averageTimeSpent} min`}
          change={-4.2}
          icon={Clock}
          color="bg-orange-500"
        />
        <StatCard
          title="Pass Rate"
          value={`${analytics.passRate}%`}
          change={2.3}
          icon={Award}
          color="bg-indigo-500"
        />
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
              <BarChart data={scoreDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Completion Rate */}
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
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
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
    </div>
  );
};

export default AssignmentAnalyticsTab;