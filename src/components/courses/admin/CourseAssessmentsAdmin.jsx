import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Bell, 
  Calculator, 
  Clock, 
  FileText, 
  Settings, 
  AlertCircle,
  CheckCircle,
  Star,
  Users,
  Calendar
} from 'lucide-react';

const CourseAssessmentsAdmin = () => {
  const { toast } = useToast();
  const [activeAssessmentTab, setActiveAssessmentTab] = useState("features");

  // Assessment Features State
  const [assessmentFeatures, setAssessmentFeatures] = useState({
    showAssessmentList: true,
    allowRetakes: false,
    randomizeQuestions: false,
    showCorrectAnswers: true,
    timeLimits: false,
    proctoringEnabled: false,
    autoGrading: true,
    manualGrading: false
  });

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    notifyInstructorsOnSubmission: true,
    notifyLearnersOnGrading: true,
    reminderEmails: false,
    deadlineAlerts: true,
    completionNotifications: true
  });

  // Grading System State
  const [gradingSystem, setGradingSystem] = useState({
    gradingScale: 'percentage',
    passingScore: '70',
    weightedGrading: false,
    rubricEnabled: false,
    anonymousGrading: false,
    gradeVisibility: 'immediate'
  });

  // Assessment Settings State
  const [assessmentSettings, setAssessmentSettings] = useState({
    defaultTimeLimit: '60',
    attemptsAllowed: '3',
    lockdownBrowser: false,
    questionBanking: false,
    plagiarismCheck: false,
    accessibilityOptions: true
  });

  const handleFeatureChange = (key, value) => {
    setAssessmentFeatures(prev => ({ ...prev, [key]: value }));
    if (toast) {
      toast({
        title: "Feature updated",
        description: `Assessment feature has been ${value ? 'enabled' : 'disabled'}`,
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

  const handleGradingChange = (key, value) => {
    setGradingSystem(prev => ({ ...prev, [key]: value }));
    if (toast) {
      toast({
        title: "Grading updated",
        description: "Grading system setting has been updated",
        duration: 2000,
      });
    }
  };

  const handleSettingsChange = (key, value) => {
    setAssessmentSettings(prev => ({ ...prev, [key]: value }));
    if (toast) {
      toast({
        title: "Settings updated",
        description: "Assessment setting has been updated",
        duration: 2000,
      });
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeAssessmentTab} onValueChange={setActiveAssessmentTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="features" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Features
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="grading" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Grading System
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Features Tab */}
        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-500" />
                Assessment Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="showAssessmentList"
                      checked={assessmentFeatures.showAssessmentList}
                      onCheckedChange={(checked) => {
                        if (typeof checked === 'boolean') {
                          handleFeatureChange('showAssessmentList', checked);
                        }
                      }}
                    />
                    <label htmlFor="showAssessmentList" className="text-sm">
                      Show assessment list to learners
                    </label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="allowRetakes"
                      checked={assessmentFeatures.allowRetakes}
                      onCheckedChange={(checked) => {
                        if (typeof checked === 'boolean') {
                          handleFeatureChange('allowRetakes', checked);
                        }
                      }}
                    />
                    <label htmlFor="allowRetakes" className="text-sm">
                      Allow retakes
                    </label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="randomizeQuestions"
                      checked={assessmentFeatures.randomizeQuestions}
                      onCheckedChange={(checked) => {
                        if (typeof checked === 'boolean') {
                          handleFeatureChange('randomizeQuestions', checked);
                        }
                      }}
                    />
                    <label htmlFor="randomizeQuestions" className="text-sm">
                      Randomize question order
                    </label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="showCorrectAnswers"
                      checked={assessmentFeatures.showCorrectAnswers}
                      onCheckedChange={(checked) => {
                        if (typeof checked === 'boolean') {
                          handleFeatureChange('showCorrectAnswers', checked);
                        }
                      }}
                    />
                    <label htmlFor="showCorrectAnswers" className="text-sm">
                      Show correct answers after submission
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="timeLimits"
                      checked={assessmentFeatures.timeLimits}
                      onCheckedChange={(checked) => {
                        if (typeof checked === 'boolean') {
                          handleFeatureChange('timeLimits', checked);
                        }
                      }}
                    />
                    <label htmlFor="timeLimits" className="text-sm">
                      Enable time limits
                    </label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="proctoringEnabled"
                      checked={assessmentFeatures.proctoringEnabled}
                      onCheckedChange={(checked) => {
                        if (typeof checked === 'boolean') {
                          handleFeatureChange('proctoringEnabled', checked);
                        }
                      }}
                    />
                    <label htmlFor="proctoringEnabled" className="text-sm">
                      Enable proctoring
                    </label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="autoGrading"
                      checked={assessmentFeatures.autoGrading}
                      onCheckedChange={(checked) => {
                        if (typeof checked === 'boolean') {
                          handleFeatureChange('autoGrading', checked);
                        }
                      }}
                    />
                    <label htmlFor="autoGrading" className="text-sm">
                      Automatic grading
                    </label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="manualGrading"
                      checked={assessmentFeatures.manualGrading}
                      onCheckedChange={(checked) => {
                        if (typeof checked === 'boolean') {
                          handleFeatureChange('manualGrading', checked);
                        }
                      }}
                    />
                    <label htmlFor="manualGrading" className="text-sm">
                      Manual grading required
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-orange-500" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Users className="h-4 w-4 text-blue-500" />
                    <div>
                      <Label className="text-sm font-medium">Notify instructors on submission</Label>
                      <p className="text-xs text-gray-600">Send email when learners submit assessments</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={notificationSettings.notifyInstructorsOnSubmission}
                    onCheckedChange={(checked) => {
                      if (typeof checked === 'boolean') {
                        handleNotificationChange('notifyInstructorsOnSubmission', checked);
                      }
                    }}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <div>
                      <Label className="text-sm font-medium">Notify learners on grading</Label>
                      <p className="text-xs text-gray-600">Send email when assessments are graded</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={notificationSettings.notifyLearnersOnGrading}
                    onCheckedChange={(checked) => {
                      if (typeof checked === 'boolean') {
                        handleNotificationChange('notifyLearnersOnGrading', checked);
                      }
                    }}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-yellow-500" />
                    <div>
                      <Label className="text-sm font-medium">Reminder emails</Label>
                      <p className="text-xs text-gray-600">Send reminders for upcoming deadlines</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={notificationSettings.reminderEmails}
                    onCheckedChange={(checked) => {
                      if (typeof checked === 'boolean') {
                        handleNotificationChange('reminderEmails', checked);
                      }
                    }}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <div>
                      <Label className="text-sm font-medium">Deadline alerts</Label>
                      <p className="text-xs text-gray-600">Alert when deadlines are approaching</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={notificationSettings.deadlineAlerts}
                    onCheckedChange={(checked) => {
                      if (typeof checked === 'boolean') {
                        handleNotificationChange('deadlineAlerts', checked);
                      }
                    }}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Star className="h-4 w-4 text-purple-500" />
                    <div>
                      <Label className="text-sm font-medium">Completion notifications</Label>
                      <p className="text-xs text-gray-600">Notify when assessments are completed</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={notificationSettings.completionNotifications}
                    onCheckedChange={(checked) => {
                      if (typeof checked === 'boolean') {
                        handleNotificationChange('completionNotifications', checked);
                      }
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Grading System Tab */}
        <TabsContent value="grading" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-green-500" />
                Grading System Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="gradingScale">Grading Scale</Label>
                    <Select 
                      value={gradingSystem.gradingScale} 
                      onValueChange={(value) => handleGradingChange('gradingScale', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage (0-100%)</SelectItem>
                        <SelectItem value="points">Points Based</SelectItem>
                        <SelectItem value="letter">Letter Grades (A-F)</SelectItem>
                        <SelectItem value="pass-fail">Pass/Fail</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="passingScore">Passing Score (%)</Label>
                    <Input
                      id="passingScore"
                      type="number"
                      min="0"
                      max="100"
                      value={gradingSystem.passingScore}
                      onChange={(e) => handleGradingChange('passingScore', e.target.value)}
                      placeholder="70"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gradeVisibility">Grade Visibility</Label>
                    <Select 
                      value={gradingSystem.gradeVisibility} 
                      onValueChange={(value) => handleGradingChange('gradeVisibility', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="after-deadline">After Deadline</SelectItem>
                        <SelectItem value="manual-release">Manual Release</SelectItem>
                        <SelectItem value="never">Never Show</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="weightedGrading"
                      checked={gradingSystem.weightedGrading}
                      onCheckedChange={(checked) => {
                        if (typeof checked === 'boolean') {
                          handleGradingChange('weightedGrading', checked);
                        }
                      }}
                    />
                    <label htmlFor="weightedGrading" className="text-sm">
                      Enable weighted grading
                    </label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="rubricEnabled"
                      checked={gradingSystem.rubricEnabled}
                      onCheckedChange={(checked) => {
                        if (typeof checked === 'boolean') {
                          handleGradingChange('rubricEnabled', checked);
                        }
                      }}
                    />
                    <label htmlFor="rubricEnabled" className="text-sm">
                      Use grading rubrics
                    </label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="anonymousGrading"
                      checked={gradingSystem.anonymousGrading}
                      onCheckedChange={(checked) => {
                        if (typeof checked === 'boolean') {
                          handleGradingChange('anonymousGrading', checked);
                        }
                      }}
                    />
                    <label htmlFor="anonymousGrading" className="text-sm">
                      Anonymous grading
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">Grade Distribution</h4>
                <div className="grid grid-cols-5 gap-2 text-sm">
                  <Badge variant="outline">A: 90-100%</Badge>
                  <Badge variant="outline">B: 80-89%</Badge>
                  <Badge variant="outline">C: 70-79%</Badge>
                  <Badge variant="outline">D: 60-69%</Badge>
                  <Badge variant="outline">F: 0-59%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-500" />
                Assessment Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="defaultTimeLimit">Default Time Limit (minutes)</Label>
                    <Input
                      id="defaultTimeLimit"
                      type="number"
                      min="5"
                      max="300"
                      value={assessmentSettings.defaultTimeLimit}
                      onChange={(e) => handleSettingsChange('defaultTimeLimit', e.target.value)}
                      placeholder="60"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="attemptsAllowed">Attempts Allowed</Label>
                    <Select 
                      value={assessmentSettings.attemptsAllowed} 
                      onValueChange={(value) => handleSettingsChange('attemptsAllowed', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Attempt</SelectItem>
                        <SelectItem value="2">2 Attempts</SelectItem>
                        <SelectItem value="3">3 Attempts</SelectItem>
                        <SelectItem value="unlimited">Unlimited</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="lockdownBrowser"
                      checked={assessmentSettings.lockdownBrowser}
                      onCheckedChange={(checked) => {
                        if (typeof checked === 'boolean') {
                          handleSettingsChange('lockdownBrowser', checked);
                        }
                      }}
                    />
                    <label htmlFor="lockdownBrowser" className="text-sm">
                      Require lockdown browser
                    </label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="questionBanking"
                      checked={assessmentSettings.questionBanking}
                      onCheckedChange={(checked) => {
                        if (typeof checked === 'boolean') {
                          handleSettingsChange('questionBanking', checked);
                        }
                      }}
                    />
                    <label htmlFor="questionBanking" className="text-sm">
                      Enable question banking
                    </label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="plagiarismCheck"
                      checked={assessmentSettings.plagiarismCheck}
                      onCheckedChange={(checked) => {
                        if (typeof checked === 'boolean') {
                          handleSettingsChange('plagiarismCheck', checked);
                        }
                      }}
                    />
                    <label htmlFor="plagiarismCheck" className="text-sm">
                      Enable plagiarism detection
                    </label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="accessibilityOptions"
                      checked={assessmentSettings.accessibilityOptions}
                      onCheckedChange={(checked) => {
                        if (typeof checked === 'boolean') {
                          handleSettingsChange('accessibilityOptions', checked);
                        }
                      }}
                    />
                    <label htmlFor="accessibilityOptions" className="text-sm">
                      Enable accessibility options
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">Additional Configuration</h4>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="instructions">Default Instructions</Label>
                    <Textarea
                      id="instructions"
                      placeholder="Enter default instructions for assessments..."
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseAssessmentsAdmin;