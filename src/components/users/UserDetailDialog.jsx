import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Award,
  Users
} from 'lucide-react';
import { MessageUserDialog } from './MessageUserDialog';

export const UserDetailDialog = ({ open, onOpenChange, user }) => {
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);

  if (!user) return null;

  const mockUserDetails = {
    ...user,
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    joinDate: '2024-01-15',
    department: 'Engineering',
    status: 'Active',
    courses: [
      { id: 1, name: 'Advanced JavaScript', progress: 85, grade: 'A' },
      { id: 2, name: 'React Development', progress: 72, grade: 'B+' },
      { id: 3, name: 'Node.js Backend', progress: 45, grade: 'In Progress' }
    ],
    groups: ['IT Management', 'Frontend Developers', 'Project Alpha'],
    achievements: ['Course Completion', 'Perfect Attendance', 'Top Performer'],
    totalCourses: 8,
    completedCourses: 5,
    overallGrade: 'A-'
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>User Details</span>
              <Button 
                onClick={() => setMessageDialogOpen(true)}
                className="flex items-center gap-2"
                size="sm"
              >
                <MessageSquare className="h-4 w-4" />
                Message
              </Button>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-2xl">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 text-center md:text-left space-y-2">
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-muted-foreground">{user.email}</p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      {user.role.map((role, index) => (
                        <Badge key={index} variant="secondary">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{mockUserDetails.overallGrade}</div>
                    <p className="text-sm text-muted-foreground">Overall Grade</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{mockUserDetails.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{mockUserDetails.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined {mockUserDetails.joinDate}</span>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Information Tabs */}
            <Tabs defaultValue="courses" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="groups">Groups</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>
              
              <TabsContent value="courses" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Course Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockUserDetails.courses.map((course) => (
                      <div key={course.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{course.name}</span>
                          <Badge variant="outline">{course.grade}</Badge>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                        <p className="text-sm text-muted-foreground">{course.progress}% Complete</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="groups" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Group Memberships
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {mockUserDetails.groups.map((group, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <p className="font-medium">{group}</p>
                          <p className="text-sm text-muted-foreground">Active Member</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="achievements" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Achievements & Awards
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {mockUserDetails.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                          <Award className="h-6 w-6 text-yellow-500" />
                          <span className="font-medium">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>

      <MessageUserDialog
        open={messageDialogOpen}
        onOpenChange={setMessageDialogOpen}
        user={user}
      />
    </>
  );
};
