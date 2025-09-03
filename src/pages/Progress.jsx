import React from 'react';
import { ChartBar, Users, BookOpen, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/shared/PageHeader';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Progress = () => {
  const stats = [
    { label: 'Average Course Progress', value: '76%', trend: '+5%' },
    { label: 'Assignment Completion', value: '82%', trend: '+3%' },
    { label: 'Active Students', value: '843', trend: '+12' },
    { label: 'Course Engagement', value: '91%', trend: '+7%' },
  ];

  const courseProgress = [
    { course: 'Credit Analysis Fundamentals', progress: 85 },
    { course: 'Risk Assessment Basics', progress: 92 },
    { course: 'Financial Reporting', progress: 78 },
    { course: 'Banking Regulations', progress: 88 },
  ];

  // User engagement data for line chart
  const userEngagementData = [
    { name: 'Jan', users: 400 },
    { name: 'Feb', users: 300 },
    { name: 'Mar', users: 500 },
    { name: 'Apr', users: 580 },
    { name: 'May', users: 620 },
    { name: 'Jun', users: 700 },
    { name: 'Jul', users: 850 },
  ];

  // Course completion data for bar chart
  const courseCompletionData = [
    { name: 'Credit Analysis', complete: 65, incomplete: 35 },
    { name: 'Risk Assessment', complete: 72, incomplete: 28 },
    { name: 'Financial Reports', complete: 58, incomplete: 42 },
    { name: 'Banking Regs', complete: 80, incomplete: 20 },
  ];

  // Device usage data for pie chart
  const deviceUsageData = [
    { name: 'Desktop', value: 45 },
    { name: 'Mobile', value: 35 },
    { name: 'Tablet', value: 20 },
  ];
  
  const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5'];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Progress" 
        description="Track student performance and engagement"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-4">
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="flex items-baseline gap-2 mt-1">
                <div className="text-2xl font-semibold">{stat.value}</div>
                <div className="text-sm text-green-500">{stat.trend}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={userEngagementData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="#9b87f5" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Course Completion Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Course Completion Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={courseCompletionData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="complete" stackId="a" fill="#9b87f5" />
                  <Bar dataKey="incomplete" stackId="a" fill="#e0e0e0" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device Usage Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Device Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceUsageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {deviceUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Course Progress Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Course Progress Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courseProgress.map((course, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{course.course}</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div 
                      className="h-full bg-ca-primary rounded-full" 
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Progress;