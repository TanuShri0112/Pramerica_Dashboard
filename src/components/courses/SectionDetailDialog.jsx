import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  BarChart2, 
  Calendar, 
  Clock,
  Users,
  CheckCircle,
  Lock,
  BookOpen,
  Eye,
  Edit,
  Play,
  Download,
  Video,
  Image as ImageIcon,
  Link,
  Globe,
  EyeOff,
  Tag,
  MoreVertical,
  Settings,
  Award,
  Target,
  ClipboardCheck
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

const SectionDetailDialog = ({ open, onOpenChange, section }) => {
  const [activeTab, setActiveTab] = useState('content');
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  if (!section) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'lesson':
        return <BookOpen className="h-5 w-5 text-blue-500" />;
      case 'quiz':
        return <BarChart2 className="h-5 w-5 text-amber-500" />;
      case 'assignment':
        return <Calendar className="h-5 w-5 text-purple-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTypeDescription = (type) => {
    switch (type) {
      case 'lesson':
        return 'Interactive learning content with text, images, and multimedia elements';
      case 'quiz':
        return 'Assessment tool to test understanding with multiple choice and other question types';
      case 'assignment':
        return 'Task-based learning activity with submission and grading capabilities';
      default:
        return 'Learning section';
    }
  };

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  const renderMenuContent = () => {
    if (!selectedMenuItem) return null;

    switch (selectedMenuItem) {
      case 'score-rules':
        return (
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart2 className="h-5 w-5" />
                Score Rules
              </CardTitle>
              <CardDescription>Configure scoring rules and grading criteria</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 min-h-0">
              <ScrollArea className="h-full w-full">
                <div className="space-y-6 pr-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Scoring Method</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Points based</option>
                      <option>Percentage based</option>
                      <option>Letter grade</option>
                      <option>Pass/Fail</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Maximum Points</label>
                    <input type="number" className="w-full p-2 border rounded-md" defaultValue="100" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Passing Score</label>
                    <input type="number" className="w-full p-2 border rounded-md" defaultValue="70" />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <label className="text-sm">Allow partial credit</label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <label className="text-sm">Round scores to nearest integer</label>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Grade Scale</label>
                    <div className="border rounded-md p-4 space-y-2">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs text-gray-500">A: 90-100%</label>
                          <input type="range" min="0" max="100" defaultValue="90" className="w-full" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-gray-500">B: 80-89%</label>
                          <input type="range" min="0" max="100" defaultValue="80" className="w-full" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-gray-500">C: 70-79%</label>
                          <input type="range" min="0" max="100" defaultValue="70" className="w-full" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-gray-500">D: 60-69%</label>
                          <input type="range" min="0" max="100" defaultValue="60" className="w-full" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-md">
                    <h4 className="font-medium text-blue-800 mb-2">Score Analytics</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <p>Average Score: 85%</p>
                      <p>Highest Score: 98%</p>
                      <p>Lowest Score: 62%</p>
                      <p>Pass Rate: 92%</p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        );

      case 'completion':
        return (
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Completion Settings
              </CardTitle>
              <CardDescription>Configure how completion is tracked and requirements</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 min-h-0">
              <ScrollArea className="h-full w-full">
                <div className="space-y-6 pr-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Completion Method</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Manual completion</option>
                      <option>Automatic on view</option>
                      <option>Quiz completion required</option>
                      <option>Assignment submission required</option>
                      <option>Minimum time spent</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Minimum Time Spent (minutes)</label>
                    <input type="number" className="w-full p-2 border rounded-md" placeholder="Minutes" defaultValue="5" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Required Actions</label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <label className="text-sm">View all content</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <label className="text-sm">Complete all activities</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <label className="text-sm">Pass assessment</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <label className="text-sm">Submit assignment</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <label className="text-sm">Track progress automatically</label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <label className="text-sm">Allow re-completion</label>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Prerequisites</label>
                    <div className="border rounded-md p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <label className="text-sm">Previous section must be completed</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <label className="text-sm">Specific score requirement (70%)</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <label className="text-sm">Time delay before access</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800">Current Status</span>
                    </div>
                    <div className="text-green-700 text-sm space-y-1">
                      <p>Status: {section.completed ? 'Completed' : 'In Progress'}</p>
                      <p>Progress: 75%</p>
                      <p>Time Spent: 12 minutes</p>
                      <p>Last Activity: 2 hours ago</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Completion Certificate</label>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <label className="text-sm">Generate completion certificate</label>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        );

      case 'set-skills':
        return (
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="h-5 w-5" />
                Set Skills
              </CardTitle>
              <CardDescription>Define and manage skills associated with this section</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 min-h-0">
              <ScrollArea className="h-full w-full">
                <div className="space-y-6 pr-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Primary Skills</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge className="bg-blue-100 text-blue-800">Digital Marketing</Badge>
                      <Badge className="bg-green-100 text-green-800">Strategy Planning</Badge>
                      <Badge className="bg-purple-100 text-purple-800">ROI Analysis</Badge>
                    </div>
                    <div className="flex gap-2">
                      <input type="text" className="flex-1 p-2 border rounded-md text-sm" placeholder="Add new skill..." />
                      <Button size="sm">Add</Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Skill Level</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                      <option>Expert</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Learning Objectives</label>
                    <textarea 
                      className="w-full p-2 border rounded-md text-sm" 
                      rows={4}
                      placeholder="Describe what learners will be able to do after completing this section..."
                      defaultValue="By the end of this section, learners will be able to:
• Understand the differences between traditional and digital marketing
• Identify key digital marketing channels
• Develop a basic digital marketing strategy
• Measure marketing ROI effectively"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Assessment Criteria</label>
                    <div className="border rounded-md p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Knowledge Application</span>
                        <div className="flex items-center gap-2">
                          <input type="range" min="0" max="100" defaultValue="80" className="w-20" />
                          <span className="text-sm text-gray-500">80%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Practical Implementation</span>
                        <div className="flex items-center gap-2">
                          <input type="range" min="0" max="100" defaultValue="70" className="w-20" />
                          <span className="text-sm text-gray-500">70%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Critical Thinking</span>
                        <div className="flex items-center gap-2">
                          <input type="range" min="0" max="100" defaultValue="75" className="w-20" />
                          <span className="text-sm text-gray-500">75%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Related Skills</label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <label className="text-sm">Communication</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <label className="text-sm">Data Analysis</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <label className="text-sm">Problem Solving</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <label className="text-sm">Creative Thinking</label>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-md">
                    <h4 className="font-medium text-yellow-800 mb-2">Skill Recommendations</h4>
                    <div className="text-sm text-yellow-700 space-y-1">
                      <p>• Consider adding "Customer Psychology" as a related skill</p>
                      <p>• "Social Media Management" could enhance this section</p>
                      <p>• Link to "Business Analytics" for advanced learners</p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        );

      case 'use-rubric':
        return (
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5" />
                Use Rubric
              </CardTitle>
              <CardDescription>Configure and apply grading rubrics for assessment</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 min-h-0">
              <ScrollArea className="h-full w-full">
                <div className="space-y-6 pr-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Rubric</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Standard Assessment Rubric</option>
                      <option>Creative Project Rubric</option>
                      <option>Research Paper Rubric</option>
                      <option>Presentation Rubric</option>
                      <option>Create New Rubric</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Rubric Criteria</label>
                    <div className="border rounded-md overflow-hidden">
                      <div className="bg-gray-50 p-3 border-b">
                        <div className="grid grid-cols-5 gap-2 text-xs font-medium">
                          <div>Criteria</div>
                          <div>Excellent (4)</div>
                          <div>Good (3)</div>
                          <div>Fair (2)</div>
                          <div>Poor (1)</div>
                        </div>
                      </div>
                      <div className="divide-y">
                        <div className="grid grid-cols-5 gap-2 p-3 text-xs">
                          <div className="font-medium">Content Knowledge</div>
                          <div>Demonstrates comprehensive understanding</div>
                          <div>Shows good understanding</div>
                          <div>Basic understanding evident</div>
                          <div>Limited understanding</div>
                        </div>
                        <div className="grid grid-cols-5 gap-2 p-3 text-xs">
                          <div className="font-medium">Application</div>
                          <div>Applies concepts expertly</div>
                          <div>Good application</div>
                          <div>Basic application</div>
                          <div>Poor application</div>
                        </div>
                        <div className="grid grid-cols-5 gap-2 p-3 text-xs">
                          <div className="font-medium">Analysis</div>
                          <div>Thorough analysis</div>
                          <div>Good analysis</div>
                          <div>Basic analysis</div>
                          <div>Limited analysis</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Weighting</label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Content Knowledge</span>
                        <div className="flex items-center gap-2">
                          <input type="range" min="0" max="100" defaultValue="40" className="w-24" />
                          <span className="text-sm text-gray-500 w-8">40%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Application</span>
                        <div className="flex items-center gap-2">
                          <input type="range" min="0" max="100" defaultValue="35" className="w-24" />
                          <span className="text-sm text-gray-500 w-8">35%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Analysis</span>
                        <div className="flex items-center gap-2">
                          <input type="range" min="0" max="100" defaultValue="25" className="w-24" />
                          <span className="text-sm text-gray-500 w-8">25%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <label className="text-sm">Show rubric to students</label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <label className="text-sm">Allow peer assessment using this rubric</label>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Feedback Settings</label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <label className="text-sm">Provide criterion-specific feedback</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <label className="text-sm">Include improvement suggestions</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <label className="text-sm">Show exemplar responses</label>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-md">
                    <h4 className="font-medium text-purple-800 mb-2">Rubric Statistics</h4>
                    <div className="text-sm text-purple-700 space-y-1">
                      <p>Average Score: 3.2/4.0</p>
                      <p>Most Common Score: 3 (Good)</p>
                      <p>Assessments Completed: 45</p>
                      <p>Inter-rater Reliability: 85%</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                      Save Rubric
                    </Button>
                    <Button size="sm" variant="outline">
                      Preview Rubric
                    </Button>
                    <Button size="sm" variant="outline">
                      Export Rubric
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl w-[95vw] h-[90vh] p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b flex-shrink-0">
          <DialogTitle className="flex items-center gap-3 text-xl">
            {getIcon(section.type)}
            <span className="truncate">{section.title}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col lg:flex-row h-full min-h-0">
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="flex flex-col h-full">
              <div className="px-6 py-4 border-b flex-shrink-0 flex items-center justify-between">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
                  <TabsList className="grid grid-cols-5 w-full max-w-lg">
                    <TabsTrigger value="content" className="text-xs">Content</TabsTrigger>
                    <TabsTrigger value="resources" className="text-xs">Resources</TabsTrigger>
                    <TabsTrigger value="completion" className="text-xs">Completion</TabsTrigger>
                    <TabsTrigger value="visibility" className="text-xs">Visibility</TabsTrigger>
                    <TabsTrigger value="tags" className="text-xs">Tags</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <ContextMenu>
                  <ContextMenuTrigger>
                    <Button variant="ghost" size="sm" className="ml-4">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </ContextMenuTrigger>
                  <ContextMenuContent className="w-48 bg-white border shadow-lg">
                    <ContextMenuItem 
                      onClick={() => handleMenuItemClick('score-rules')}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <BarChart2 className="h-4 w-4" />
                      Score Rules
                    </ContextMenuItem>
                    <ContextMenuItem 
                      onClick={() => handleMenuItemClick('completion')}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Completion
                    </ContextMenuItem>
                    <ContextMenuItem 
                      onClick={() => handleMenuItemClick('set-skills')}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Target className="h-4 w-4" />
                      Set Skills
                    </ContextMenuItem>
                    <ContextMenuItem 
                      onClick={() => handleMenuItemClick('use-rubric')}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <ClipboardCheck className="h-4 w-4" />
                      Use Rubric
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              </div>

              <div className="flex-1 min-h-0 p-6">
                {selectedMenuItem ? (
                  <div className="h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setSelectedMenuItem(null)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        ← Back to {activeTab}
                      </Button>
                    </div>
                    {renderMenuContent()}
                  </div>
                ) : (
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                    <TabsContent value="content" className="mt-0 h-full">
                      <Card className="h-full flex flex-col">
                        <CardContent className="p-6 flex-1 min-h-0">
                          <ScrollArea className="h-full w-full">
                            {section.type === 'lesson' && (
                              <div className="space-y-4 pr-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                                  <Eye className="h-4 w-4" />
                                  <span>Immersive Reader</span>
                                </div>
                                
                                <h2 className="text-xl font-semibold mb-4">
                                  Understanding the Shift: From Traditional Marketing to Digital Marketing
                                </h2>
                                
                                <div className="space-y-4 text-sm leading-relaxed">
                                  <p>
                                    {section.content || `Marketing has always been about connecting with your audience in the right place and at the right time. Traditional marketing methods, such as billboards, flyers, and television ads, were once the primary tools for reaching customers. However, the advent of the internet revolutionized how businesses reach and engage with their audience. This shift to digital marketing brings unparalleled opportunities for side hustlers to promote their businesses effectively.`}
                                  </p>
                                  
                                  <h3 className="text-lg font-semibold mt-6">Traditional Marketing: A Brief Overview</h3>
                                  <p>
                                    Traditional marketing encompasses tangible and offline methods of promotion. For example, a small coffee shop might post flyers around the neighborhood or advertise on local radio stations to attract customers. These methods, while effective in the past, often lack the precision and scalability that modern businesses require.
                                  </p>
                                  
                                  <p>
                                    Traditional marketing has its merits, such as its ability to reach a local audience and create a memorable impression through physical materials. However, it is often costly and difficult to measure the return on investment (ROI).
                                  </p>

                                  <h3 className="text-lg font-semibold mt-6">The Rise of Digital Marketing</h3>
                                  <p>
                                    Digital marketing leverages online platforms and technologies to reach customers. This includes social media marketing, email campaigns, search engine optimization (SEO), content marketing, and pay-per-click (PPC) advertising. Unlike traditional marketing, digital marketing allows for precise targeting, real-time analytics, and cost-effective campaigns.
                                  </p>

                                  <p>
                                    For side hustlers, digital marketing offers several advantages:
                                  </p>

                                  <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li><strong>Cost-effectiveness:</strong> Many digital marketing strategies can be implemented with minimal budget</li>
                                    <li><strong>Targeted reach:</strong> Ability to reach specific demographics and interests</li>
                                    <li><strong>Measurable results:</strong> Track performance with detailed analytics</li>
                                    <li><strong>Global audience:</strong> Reach customers beyond geographical limitations</li>
                                    <li><strong>Real-time engagement:</strong> Immediate interaction with potential customers</li>
                                  </ul>

                                  <div className="bg-blue-50 p-4 rounded-md mt-6">
                                    <h4 className="font-semibold text-blue-800 mb-2">Key Takeaway</h4>
                                    <p className="text-blue-700 text-sm">
                                      Digital marketing offers unprecedented targeting, measurement, and cost-effectiveness compared to traditional methods, making it essential for modern side hustles.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {section.type === 'quiz' && (
                              <div className="space-y-4 pr-4">
                                <div>
                                  <h3 className="text-lg font-semibold">Quiz: {section.title}</h3>
                                  <p className="text-gray-600">Test your understanding of the concepts covered in this module.</p>
                                </div>
                                <div className="bg-amber-50 p-4 rounded-md">
                                  <p className="text-amber-800 text-sm font-medium">Quiz Details:</p>
                                  <ul className="text-amber-700 text-sm mt-2 space-y-1">
                                    <li>• 10 multiple choice questions</li>
                                    <li>• 15 minute time limit</li>
                                    <li>• Minimum 70% to pass</li>
                                    <li>• 3 attempts allowed</li>
                                  </ul>
                                </div>
                              </div>
                            )}
                            
                            {section.type === 'assignment' && (
                              <div className="space-y-4 pr-4">
                                <div>
                                  <h3 className="text-lg font-semibold">Assignment: {section.title}</h3>
                                  <p className="text-gray-600">{section.description || "Complete the following assignment to apply what you've learned."}</p>
                                </div>
                                <div className="bg-purple-50 p-4 rounded-md">
                                  <p className="text-purple-800 text-sm font-medium">Assignment Requirements:</p>
                                  <ul className="text-purple-700 text-sm mt-2 space-y-1">
                                    <li>• Submit a written report (minimum 500 words)</li>
                                    <li>• Include relevant examples</li>
                                    <li>• Due date: End of module</li>
                                    <li>• File formats accepted: PDF, DOC, DOCX</li>
                                  </ul>
                                </div>
                              </div>
                            )}
                          </ScrollArea>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="resources" className="mt-0 h-full">
                      <Card className="h-full flex flex-col">
                        <CardHeader>
                          <CardTitle className="text-lg">Resources</CardTitle>
                          <CardDescription>Additional materials and downloads for this section</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 min-h-0">
                          <ScrollArea className="h-full w-full">
                            <div className="space-y-3 pr-4">
                              <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                <FileText className="h-5 w-5 text-blue-500 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm truncate">Course Handbook.pdf</p>
                                  <p className="text-xs text-gray-500">2.4 MB</p>
                                </div>
                                <Download className="h-4 w-4 text-gray-400 flex-shrink-0" />
                              </div>
                              
                              <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                <Video className="h-5 w-5 text-red-500 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm truncate">Introduction Video</p>
                                  <p className="text-xs text-gray-500">15:30 duration</p>
                                </div>
                                <Play className="h-4 w-4 text-gray-400 flex-shrink-0" />
                              </div>
                              
                              <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                <ImageIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm truncate">Marketing Infographic</p>
                                  <p className="text-xs text-gray-500">PNG image</p>
                                </div>
                                <Download className="h-4 w-4 text-gray-400 flex-shrink-0" />
                              </div>
                              
                              <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                <Link className="h-5 w-5 text-purple-500 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm truncate">External Resources</p>
                                  <p className="text-xs text-gray-500">Additional reading materials</p>
                                </div>
                                <Globe className="h-4 w-4 text-gray-400 flex-shrink-0" />
                              </div>
                            </div>
                          </ScrollArea>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="completion" className="mt-0 h-full">
                      <Card className="h-full flex flex-col">
                        <CardHeader>
                          <CardTitle className="text-lg">Completion Settings</CardTitle>
                          <CardDescription>Configure how completion is tracked for this section</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 min-h-0">
                          <ScrollArea className="h-full w-full">
                            <div className="space-y-6 pr-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Completion Method</label>
                                <select className="w-full p-2 border rounded-md">
                                  <option>Manual completion</option>
                                  <option>Automatic on view</option>
                                  <option>Quiz completion required</option>
                                  <option>Assignment submission required</option>
                                </select>
                              </div>
                              
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Minimum Time Spent</label>
                                <input type="number" className="w-full p-2 border rounded-md" placeholder="Minutes" defaultValue="5" />
                              </div>
                              
                              <div className="bg-green-50 p-4 rounded-md">
                                <div className="flex items-center gap-2 mb-2">
                                  <CheckCircle className="h-5 w-5 text-green-600" />
                                  <span className="font-medium text-green-800">Current Status</span>
                                </div>
                                <p className="text-green-700 text-sm">
                                  {section.completed ? 'Completed' : 'Not completed'}
                                </p>
                              </div>
                            </div>
                          </ScrollArea>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="visibility" className="mt-0 h-full">
                      <Card className="h-full flex flex-col">
                        <CardHeader>
                          <CardTitle className="text-lg">Visibility Settings</CardTitle>
                          <CardDescription>Control who can see and access this section</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 min-h-0">
                          <ScrollArea className="h-full w-full">
                            <div className="space-y-6 pr-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Visibility Level</label>
                                <select className="w-full p-2 border rounded-md">
                                  <option>All enrolled students</option>
                                  <option>Specific groups only</option>
                                  <option>Hidden from students</option>
                                  <option>Preview mode only</option>
                                </select>
                              </div>
                              
                              <div className="bg-blue-50 p-4 rounded-md">
                                <div className="flex items-center gap-2 mb-2">
                                  {section.locked ? (
                                    <EyeOff className="h-5 w-5 text-blue-600" />
                                  ) : (
                                    <Eye className="h-5 w-5 text-blue-600" />
                                  )}
                                  <span className="font-medium text-blue-800">Current Status</span>
                                </div>
                                <p className="text-blue-700 text-sm">
                                  {section.locked ? 'Hidden/Locked' : 'Visible to students'}
                                </p>
                              </div>
                            </div>
                          </ScrollArea>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="tags" className="mt-0 h-full">
                      <Card className="h-full flex flex-col">
                        <CardHeader>
                          <CardTitle className="text-lg">Tags & Categories</CardTitle>
                          <CardDescription>Organize and categorize this section</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 min-h-0">
                          <ScrollArea className="h-full w-full">
                            <div className="space-y-6 pr-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Learning Objectives</label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                  <Badge variant="outline">Digital Marketing</Badge>
                                  <Badge variant="outline">Strategy</Badge>
                                  <Badge variant="outline">ROI</Badge>
                                </div>
                                <input type="text" className="w-full p-2 border rounded-md text-sm" placeholder="Add new tag..." />
                              </div>
                              
                              <div className="bg-purple-50 p-4 rounded-md">
                                <div className="flex items-center gap-2 mb-2">
                                  <Tag className="h-5 w-5 text-purple-600" />
                                  <span className="font-medium text-purple-800">Quick Actions</span>
                                </div>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline">Apply Template Tags</Button>
                                  <Button size="sm" variant="outline">Clear All Tags</Button>
                                </div>
                              </div>
                            </div>
                          </ScrollArea>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                )}
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-80 border-l bg-gray-50 flex-shrink-0">
            <ScrollArea className="h-full">
              <div className="p-6 space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Section Details</CardTitle>
                      <div className="flex gap-2 flex-wrap">
                        {section.completed && (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                        {section.locked && (
                          <Badge variant="outline" className="border-gray-300 text-gray-500">
                            <Lock className="h-3 w-3 mr-1" />
                            Locked
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-1">Type</h4>
                      <p className="text-sm capitalize">{section.type}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-1">Description</h4>
                      <p className="text-sm text-gray-600">
                        {section.description || getTypeDescription(section.type)}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 pt-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>Est. 15 min</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>Individual</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex flex-col gap-2">
                  {!section.locked && (
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                      <Play className="h-4 w-4 mr-2" />
                      {section.completed ? 'Review' : 'Start'}
                    </Button>
                  )}
                  
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  
                  <Button variant="outline" onClick={() => onOpenChange(false)}>
                    Close
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SectionDetailDialog;