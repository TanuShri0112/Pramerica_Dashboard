import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  CheckCircle, 
  Clock, 
  Settings, 
  Bell, 
  Award,
  Users,
  FileText,
  ArrowRight
} from 'lucide-react';

const CourseCompletionAdmin = () => {
  const { toast } = useToast();
  const [activeCompletionTab, setActiveCompletionTab] = useState("completion");
  
  const [completionSettings, setCompletionSettings] = useState({
    requireAllModules: true,
    allowPartialCompletion: false,
    trackTimeSpent: true,
    requireFinalAssessment: false
  });

  const [sequencingSettings, setSequencingSettings] = useState({
    enforceOrder: false,
    allowSkipping: true,
    lockContent: false
  });

  const [autoCompletionSettings, setAutoCompletionSettings] = useState({
    enabled: false,
    timeBasedCompletion: false,
    scoreBasedCompletion: true,
    minimumScore: 80
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailOnCompletion: true,
    managerNotification: false,
    certificateEmail: true,
    reminderEmails: false
  });

  const handleCompletionSettingChange = (key, value) => {
    setCompletionSettings(prev => ({ ...prev, [key]: value }));
    if (toast) {
      toast({
        title: "Completion setting updated",
        description: `Setting has been ${value ? 'enabled' : 'disabled'}`,
        duration: 2000,
      });
    }
  };

  const handleSequencingChange = (key, value) => {
    setSequencingSettings(prev => ({ ...prev, [key]: value }));
    if (toast) {
      toast({
        title: "Sequencing updated",
        description: `Sequencing setting has been ${value ? 'enabled' : 'disabled'}`,
        duration: 2000,
      });
    }
  };

  const handleAutoCompletionChange = (key, value) => {
    setAutoCompletionSettings(prev => ({ ...prev, [key]: value }));
    if (toast) {
      toast({
        title: "Auto-completion updated",
        description: `Auto-completion setting has been ${value ? 'enabled' : 'disabled'}`,
        duration: 2000,
      });
    }
  };

  const handleNotificationChange = (key, value) => {
    setNotificationSettings(prev => ({ ...prev, [key]: value }));
    if (toast) {
      toast({
        title: "Notification updated",
        description: `Notification setting has been ${value ? 'enabled' : 'disabled'}`,
        duration: 2000,
      });
    }
  };

  const handleCompleteAction = (action) => {
    if (toast) {
      toast({
        title: "Complete action triggered",
        description: `${action} has been executed`,
        duration: 2000,
      });
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeCompletionTab} onValueChange={setActiveCompletionTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="completion">Completion</TabsTrigger>
          <TabsTrigger value="sequencing">Sequencing</TabsTrigger>
          <TabsTrigger value="auto-completion">Auto-completion</TabsTrigger>
          <TabsTrigger value="complete-actions">Complete Actions</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="completion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Completion Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Require all modules</label>
                    <span className="text-xs text-gray-500">Students must complete all modules to finish the course</span>
                  </div>
                  <Switch
                    checked={completionSettings.requireAllModules}
                    onCheckedChange={(checked) => 
                      handleCompletionSettingChange('requireAllModules', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Allow partial completion</label>
                    <span className="text-xs text-gray-500">Students can receive partial credit</span>
                  </div>
                  <Switch
                    checked={completionSettings.allowPartialCompletion}
                    onCheckedChange={(checked) => 
                      handleCompletionSettingChange('allowPartialCompletion', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Track time spent</label>
                    <span className="text-xs text-gray-500">Monitor student engagement time</span>
                  </div>
                  <Switch
                    checked={completionSettings.trackTimeSpent}
                    onCheckedChange={(checked) => 
                      handleCompletionSettingChange('trackTimeSpent', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Require final assessment</label>
                    <span className="text-xs text-gray-500">Final assessment must be completed</span>
                  </div>
                  <Switch
                    checked={completionSettings.requireFinalAssessment}
                    onCheckedChange={(checked) => 
                      handleCompletionSettingChange('requireFinalAssessment', checked)
                    }
                  />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t">
                <h4 className="text-sm font-medium mb-3">Completion Status</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">12</div>
                    <div className="text-xs text-gray-600">Completed</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">5</div>
                    <div className="text-xs text-gray-600">In Progress</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">8</div>
                    <div className="text-xs text-gray-600">Not Started</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">2</div>
                    <div className="text-xs text-gray-600">Overdue</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sequencing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRight className="h-5 w-5 text-blue-500" />
                Course Sequencing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Enforce sequential order</label>
                    <span className="text-xs text-gray-500">Students must complete modules in order</span>
                  </div>
                  <Switch
                    checked={sequencingSettings.enforceOrder}
                    onCheckedChange={(checked) => 
                      handleSequencingChange('enforceOrder', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Allow skipping</label>
                    <span className="text-xs text-gray-500">Students can skip optional content</span>
                  </div>
                  <Switch
                    checked={sequencingSettings.allowSkipping}
                    onCheckedChange={(checked) => 
                      handleSequencingChange('allowSkipping', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Lock future content</label>
                    <span className="text-xs text-gray-500">Hide upcoming modules until prerequisites are met</span>
                  </div>
                  <Switch
                    checked={sequencingSettings.lockContent}
                    onCheckedChange={(checked) => 
                      handleSequencingChange('lockContent', checked)
                    }
                  />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t">
                <h4 className="text-sm font-medium mb-3">Sequencing Rules</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Module 1 → Module 2</span>
                    <Badge variant="outline">Required</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Module 2 → Assessment 1</span>
                    <Badge variant="outline">Required</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    + Add Sequencing Rule
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="auto-completion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-purple-500" />
                Auto-completion Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Enable auto-completion</label>
                    <span className="text-xs text-gray-500">Automatically mark course as complete when criteria are met</span>
                  </div>
                  <Switch
                    checked={autoCompletionSettings.enabled}
                    onCheckedChange={(checked) => 
                      handleAutoCompletionChange('enabled', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Time-based completion</label>
                    <span className="text-xs text-gray-500">Complete after spending minimum time</span>
                  </div>
                  <Switch
                    checked={autoCompletionSettings.timeBasedCompletion}
                    onCheckedChange={(checked) => 
                      handleAutoCompletionChange('timeBasedCompletion', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Score-based completion</label>
                    <span className="text-xs text-gray-500">Complete after achieving minimum score</span>
                  </div>
                  <Switch
                    checked={autoCompletionSettings.scoreBasedCompletion}
                    onCheckedChange={(checked) => 
                      handleAutoCompletionChange('scoreBasedCompletion', checked)
                    }
                  />
                </div>
              </div>

              {autoCompletionSettings.scoreBasedCompletion && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <label className="text-sm font-medium">Minimum Score: {autoCompletionSettings.minimumScore}%</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={autoCompletionSettings.minimumScore}
                    className="w-full mt-2"
                    onChange={(e) => setAutoCompletionSettings(prev => ({ 
                      ...prev, 
                      minimumScore: parseInt(e.target.value) 
                    }))}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="complete-actions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-orange-500" />
                Complete Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                Configure actions that happen when a student completes the course.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-start"
                  onClick={() => handleCompleteAction('Issue Certificate')}
                >
                  <Award className="h-5 w-5 mb-2 text-orange-500" />
                  <span className="font-medium">Issue Certificate</span>
                  <span className="text-xs text-gray-500">Generate completion certificate</span>
                </Button>

                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-start"
                  onClick={() => handleCompleteAction('Send Email')}
                >
                  <Bell className="h-5 w-5 mb-2 text-blue-500" />
                  <span className="font-medium">Send Email</span>
                  <span className="text-xs text-gray-500">Notify student and manager</span>
                </Button>

                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-start"
                  onClick={() => handleCompleteAction('Update Records')}
                >
                  <FileText className="h-5 w-5 mb-2 text-green-500" />
                  <span className="font-medium">Update Records</span>
                  <span className="text-xs text-gray-500">Update LMS records</span>
                </Button>

                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-start"
                  onClick={() => handleCompleteAction('Enroll Next Course')}
                >
                  <Users className="h-5 w-5 mb-2 text-purple-500" />
                  <span className="font-medium">Enroll Next Course</span>
                  <span className="text-xs text-gray-500">Auto-enroll in sequel course</span>
                </Button>
              </div>

              <div className="mt-6 pt-4 border-t">
                <h4 className="text-sm font-medium mb-3">Active Actions</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm flex items-center gap-2">
                      <Award className="h-4 w-4 text-orange-500" />
                      Certificate issuance
                    </span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm flex items-center gap-2">
                      <Bell className="h-4 w-4 text-blue-500" />
                      Email notification
                    </span>
                    <Badge variant="outline">Inactive</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-500" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Email on completion</label>
                    <span className="text-xs text-gray-500">Send email when student completes course</span>
                  </div>
                  <Switch
                    checked={notificationSettings.emailOnCompletion}
                    onCheckedChange={(checked) => 
                      handleNotificationChange('emailOnCompletion', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Manager notification</label>
                    <span className="text-xs text-gray-500">Notify student's manager of completion</span>
                  </div>
                  <Switch
                    checked={notificationSettings.managerNotification}
                    onCheckedChange={(checked) => 
                      handleNotificationChange('managerNotification', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Certificate email</label>
                    <span className="text-xs text-gray-500">Email certificate as attachment</span>
                  </div>
                  <Switch
                    checked={notificationSettings.certificateEmail}
                    onCheckedChange={(checked) => 
                      handleNotificationChange('certificateEmail', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Reminder emails</label>
                    <span className="text-xs text-gray-500">Send reminders for incomplete courses</span>
                  </div>
                  <Switch
                    checked={notificationSettings.reminderEmails}
                    onCheckedChange={(checked) => 
                      handleNotificationChange('reminderEmails', checked)
                    }
                  />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t">
                <h4 className="text-sm font-medium mb-3">Email Templates</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Completion Email Template
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Certificate Email Template
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Reminder Email Template
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseCompletionAdmin;