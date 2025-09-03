import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, BookOpen, FileText, BarChart as BarChartIcon, Settings, Bell, HelpCircle } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Users', value: '1,234', icon: Users, change: '+12%', changeType: 'increase' },
    { label: 'Active Courses', value: '45', icon: BookOpen, change: '+5', changeType: 'increase' },
    { label: 'Total Enrollments', value: '3,456', icon: FileText, change: '+234', changeType: 'increase' },
    { label: 'Completion Rate', value: '78%', icon: BarChartIcon, change: '+5%', changeType: 'increase' },
  ];

  const recentActivities = [
    { id: 1, user: 'John Doe', action: 'created a new course', time: '2 minutes ago' },
    { id: 2, user: 'Jane Smith', action: 'completed "Introduction to React"', time: '1 hour ago' },
    { id: 3, user: 'Mike Johnson', action: 'uploaded a new resource', time: '3 hours ago' },
    { id: 4, user: 'Sarah Williams', action: 'sent a message', time: '5 hours ago' },
    { id: 5, user: 'David Brown', action: 'commented on a discussion', time: '1 day ago' },
  ];

  const chartData = [
    { name: 'Jan', users: 4000, courses: 2400 },
    { name: 'Feb', users: 3000, courses: 1398 },
    { name: 'Mar', users: 2000, courses: 9800 },
    { name: 'Apr', users: 2780, courses: 3908 },
    { name: 'May', users: 1890, courses: 4800 },
    { name: 'Jun', users: 2390, courses: 3800 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button variant="outline" size="sm">
            <HelpCircle className="h-4 w-4 mr-2" />
            Help
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" fill="#8884d8" name="Users" />
                  <Bar dataKey="courses" fill="#82ca9d" name="Courses" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-2" />
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {activity.user} <span className="text-muted-foreground">{activity.action}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
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

export default AdminDashboard;