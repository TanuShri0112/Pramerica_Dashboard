import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Users, BarChart3, Scale, Eye, X, ClipboardList } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const DebateAssessmentDialog = ({ open, onOpenChange, section }) => {
  const [activeTab, setActiveTab] = useState('Assessment');

  if (!section) return null;

  const tabs = [
    'Assessment',
    'Debate', 
    'Scores',
    'Analytics',
    'Grading Scale',
    'Visibility'
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Assessment':
        return (
          <ScrollArea className="h-[600px] w-full">
            <div className="space-y-6 p-4">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <ClipboardList className="h-5 w-5 text-blue-500" />
                  <h3 className="text-lg font-semibold">Assessment Details</h3>
                </div>
                <p className="text-gray-600 mb-6">Configure the debate assessment framework</p>
                
                <div className="bg-blue-50 p-6 rounded-lg space-y-6">
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-4">Proposition</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-blue-700 mb-2">1. Objective:</h5>
                        <p className="text-gray-700">
                          To evaluate learners' ability to analyze, argue, and critically assess the benefits and challenges of Business Trusts by participating in a structured debate.
                        </p>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-blue-700 mb-2">2. Topic Options:</h5>
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <span className="font-semibold text-blue-600">Option A:</span>
                            <span className="text-gray-700">"Business Trusts are a superior investment vehicle compared to corporations."</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="font-semibold text-blue-600">Option B:</span>
                            <span className="text-gray-700">"The regulatory complexities and limited control make Business Trusts less favorable for investors."</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">(Choose one as both the proposition teams!)</p>
                      </div>

                      <div>
                        <h5 className="font-semibold text-blue-700 mb-3">3. Format:</h5>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse border border-gray-300 bg-white rounded">
                            <thead>
                              <tr className="bg-blue-100">
                                <th className="border border-gray-300 px-4 py-2 text-left">Phase</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Time (approx.)</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border border-gray-300 px-4 py-2">Preparation</td>
                                <td className="border border-gray-300 px-4 py-2">Teams research and prepare arguments for their position.</td>
                                <td className="border border-gray-300 px-4 py-2">30 minutes to 1 hour</td>
                              </tr>
                              <tr>
                                <td className="border border-gray-300 px-4 py-2">Opening Statements</td>
                                <td className="border border-gray-300 px-4 py-2">Each team presents their main arguments.</td>
                                <td className="border border-gray-300 px-4 py-2">3-5 minutes per team</td>
                              </tr>
                              <tr>
                                <td className="border border-gray-300 px-4 py-2">Rebuttals</td>
                                <td className="border border-gray-300 px-4 py-2">Each team responds to the opponent's points and counters them.</td>
                                <td className="border border-gray-300 px-4 py-2">3-4 minutes per team</td>
                              </tr>
                              <tr>
                                <td className="border border-gray-300 px-4 py-2">Open Discussion</td>
                                <td className="border border-gray-300 px-4 py-2">Free exchange of ideas moderated by instructor/host.</td>
                                <td className="border border-gray-300 px-4 py-2">10 minutes</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-semibold text-blue-700 mb-3">4. Assessment Criteria:</h5>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse border border-gray-300 bg-white rounded">
                            <thead>
                              <tr className="bg-blue-100">
                                <th className="border border-gray-300 px-4 py-2 text-left">Criterion</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Scoring Guide (out of 10)</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border border-gray-300 px-4 py-2">Argument Strength</td>
                                <td className="border border-gray-300 px-4 py-2">Clarity, relevance, and persuasiveness of arguments.</td>
                                <td className="border border-gray-300 px-4 py-2">8-10 = excellent, 5-7 = good, &lt;5 = needs improvement</td>
                              </tr>
                              <tr>
                                <td className="border border-gray-300 px-4 py-2">Use of Evidence</td>
                                <td className="border border-gray-300 px-4 py-2">Use of facts, examples, and references.</td>
                                <td className="border border-gray-300 px-4 py-2">8-10 = excellent, 5-7 = good, &lt;5 = needs improvement</td>
                              </tr>
                              <tr>
                                <td className="border border-gray-300 px-4 py-2">Rebuttal Effectiveness</td>
                                <td className="border border-gray-300 px-4 py-2">Ability to address and counter opposing points</td>
                                <td className="border border-gray-300 px-4 py-2">8-10 = excellent, 5-7 = good, &lt;5 = needs improvement</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-semibold text-blue-700 mb-2">5. Suggested Preparation Resources:</h5>
                        <ul className="space-y-2 ml-4">
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600">•</span>
                            <a href="#" className="text-blue-600 hover:underline">Benefits and Challenges of Business Trusts (Module content)</a>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600">•</span>
                            <a href="#" className="text-blue-600 hover:underline">Legal frameworks and case studies on Business Trusts</a>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600">•</span>
                            <a href="#" className="text-blue-600 hover:underline">Relevant articles/videos (e.g., Paul Michael from Creditors Academy)</a>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-semibold text-blue-700 mb-2">6. Optional Extensions:</h5>
                        <ul className="space-y-2 ml-4">
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600">•</span>
                            <span className="text-gray-700">Written reflection post-debate summarizing key insights</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600">•</span>
                            <span className="text-gray-700">Peer evaluation for feedback on teamwork and argument quality</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        );
        
      case 'Debate':
        return (
          <ScrollArea className="h-[600px] w-full">
            <div className="space-y-6 p-4">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <ClipboardList className="h-5 w-5 text-green-500" />
                  <h3 className="text-lg font-semibold">Debate Configuration</h3>
                </div>
                <p className="text-gray-600 mb-6">Set up debate parameters and teams</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="debate-topic">Debate Topic</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select debate topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option-a">Business Trusts are superior investment vehicles</SelectItem>
                        <SelectItem value="option-b">Business Trusts have regulatory challenges</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="prep-time">Preparation Time (minutes)</Label>
                    <Input id="prep-time" type="number" defaultValue="30" />
                  </div>
                  
                  <div>
                    <Label htmlFor="team-size">Team Size</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select team size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 members</SelectItem>
                        <SelectItem value="3">3 members</SelectItem>
                        <SelectItem value="4">4 members</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="moderator">Moderator</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select moderator" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instructor">Instructor</SelectItem>
                        <SelectItem value="student">Student Volunteer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="total-duration">Total Duration (minutes)</Label>
                    <Input id="total-duration" type="number" defaultValue="45" />
                  </div>
                  
                  <div>
                    <Label htmlFor="recording">Record Debate</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Recording option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes, record</SelectItem>
                        <SelectItem value="no">No recording</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-semibold mb-4">Team Assignment</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Team A (Pro)</CardTitle>
                        <CardDescription>Supporting the proposition</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full">
                          <Users className="h-4 w-4 mr-2" />
                          Assign Students
                        </Button>
                        <p className="text-sm text-gray-500 mt-2">No students assigned yet</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Team B (Con)</CardTitle>
                        <CardDescription>Opposing the proposition</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full">
                          <Users className="h-4 w-4 mr-2" />
                          Assign Students
                        </Button>
                        <p className="text-sm text-gray-500 mt-2">No students assigned yet</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        );
        
      case 'Scores':
        return (
          <ScrollArea className="h-[600px] w-full">
            <div className="space-y-6 p-4">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="h-5 w-5 text-orange-500" />
                  <h3 className="text-lg font-semibold">Scores & Results</h3>
                </div>
                <p className="text-gray-600 mb-6">View debate scores and performance metrics</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-blue-500 mb-2">85%</div>
                      <div className="text-gray-600">Average Score</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-green-500 mb-2">12</div>
                      <div className="text-gray-600">Participants</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-purple-500 mb-2">100%</div>
                      <div className="text-gray-600">Completion Rate</div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Individual Scores</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 bg-white rounded">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 px-4 py-2 text-left">Student</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Team</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Argument</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Evidence</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Rebuttal</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Presentation</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-4 py-2">John Smith</td>
                          <td className="border border-gray-300 px-4 py-2">Team A</td>
                          <td className="border border-gray-300 px-4 py-2">8/10</td>
                          <td className="border border-gray-300 px-4 py-2">9/10</td>
                          <td className="border border-gray-300 px-4 py-2">7/10</td>
                          <td className="border border-gray-300 px-4 py-2">8/10</td>
                          <td className="border border-gray-300 px-4 py-2">80%</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-2">Sarah Johnson</td>
                          <td className="border border-gray-300 px-4 py-2">Team B</td>
                          <td className="border border-gray-300 px-4 py-2">9/10</td>
                          <td className="border border-gray-300 px-4 py-2">8/10</td>
                          <td className="border border-gray-300 px-4 py-2">9/10</td>
                          <td className="border border-gray-300 px-4 py-2">9/10</td>
                          <td className="border border-gray-300 px-4 py-2">87%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        );
        
      case 'Analytics':
        return (
          <ScrollArea className="h-[600px] w-full">
            <div className="space-y-6 p-4">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                  <h3 className="text-lg font-semibold">Performance Analytics</h3>
                </div>
                <p className="text-gray-600 mb-6">Detailed analysis of debate performance and engagement</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Participation Rate</p>
                          <p className="text-2xl font-bold">95%</p>
                        </div>
                        <Users className="h-8 w-8 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Avg. Speaking Time</p>
                          <p className="text-2xl font-bold">4.2m</p>
                        </div>
                        <BarChart3 className="h-8 w-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Engagement Score</p>
                          <p className="text-2xl font-bold">88%</p>
                        </div>
                        <Eye className="h-8 w-8 text-purple-500" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Team Balance</p>
                          <p className="text-2xl font-bold">Good</p>
                        </div>
                        <Scale className="h-8 w-8 text-orange-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Performance by Criteria</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Argument Strength</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-gray-200 rounded">
                              <div className="w-4/5 h-2 bg-blue-500 rounded"></div>
                            </div>
                            <span className="text-sm font-medium">80%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Use of Evidence</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-gray-200 rounded">
                              <div className="w-5/6 h-2 bg-green-500 rounded"></div>
                            </div>
                            <span className="text-sm font-medium">85%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Rebuttal Skills</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-gray-200 rounded">
                              <div className="w-3/4 h-2 bg-orange-500 rounded"></div>
                            </div>
                            <span className="text-sm font-medium">75%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Team Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Team A (Pro)</span>
                            <span className="text-sm">82% avg</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded">
                            <div className="w-4/5 h-2 bg-blue-500 rounded"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Team B (Con)</span>
                            <span className="text-sm">88% avg</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded">
                            <div className="w-5/6 h-2 bg-green-500 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </ScrollArea>
        );
        
      case 'Grading Scale':
        return (
          <ScrollArea className="h-[600px] w-full">
            <div className="space-y-6 p-4">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Scale className="h-5 w-5 text-purple-500" />
                  <h3 className="text-lg font-semibold">Grading Scale & Rubric</h3>
                </div>
                <p className="text-gray-600 mb-6">Define scoring criteria and grade boundaries</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Scoring Weights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Argument Strength</span>
                          <span className="text-sm font-medium">40%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Use of Evidence</span>
                          <span className="text-sm font-medium">25%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Rebuttal Skills</span>
                          <span className="text-sm font-medium">20%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Presentation</span>
                          <span className="text-sm font-medium">15%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Grade Boundaries</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">A (Excellent)</span>
                          <span className="text-sm font-medium">90-100%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">B (Good)</span>
                          <span className="text-sm font-medium">80-89%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">C (Satisfactory)</span>
                          <span className="text-sm font-medium">70-79%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">D (Needs Improvement)</span>
                          <span className="text-sm font-medium">60-69%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">F (Unsatisfactory)</span>
                          <span className="text-sm font-medium">Below 60%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Detailed Rubric</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-300 px-4 py-2 text-left">Criteria</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Excellent (9-10)</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Good (7-8)</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Satisfactory (5-6)</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Needs Work (1-4)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2 font-medium">Argument Strength</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm">Clear, logical, compelling arguments</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm">Good arguments with minor gaps</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm">Adequate arguments, some unclear</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm">Weak or confusing arguments</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2 font-medium">Use of Evidence</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm">Strong evidence, well-integrated</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm">Good evidence, mostly relevant</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm">Some evidence, not always relevant</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm">Little or weak evidence</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2 font-medium">Rebuttal Skills</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm">Excellent counters to opponents</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm">Good responses to opponents</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm">Basic responses, some missed</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm">Poor or no rebuttals</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </ScrollArea>
        );
        
      case 'Visibility':
        return (
          <ScrollArea className="h-[600px] w-full">
            <div className="space-y-6 p-4">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Eye className="h-5 w-5 text-green-500" />
                  <h3 className="text-lg font-semibold">Visibility & Access Settings</h3>
                  <div className="ml-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Score rules</DropdownMenuItem>
                        <DropdownMenuItem>Completion</DropdownMenuItem>
                        <DropdownMenuItem>Set skills</DropdownMenuItem>
                        <DropdownMenuItem>Use rubric</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">Control who can access and view this debate assessment</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Access Control</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Status</span>
                        <Badge className="bg-green-100 text-green-800">Published</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Visibility</span>
                        <Badge variant="outline">Course Members Only</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Enrollment Required</span>
                        <Badge variant="outline">Yes</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Prerequisites</span>
                        <Badge variant="outline">Module 1 Complete</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Schedule Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Available From</span>
                        <span className="text-sm font-medium">May 15, 2024</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Due Date</span>
                        <span className="text-sm font-medium">May 30, 2024</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Late Submissions</span>
                        <Badge variant="outline">Not Allowed</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Time Limit</span>
                        <Badge variant="outline">45 minutes</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Permission Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Students can view scores</p>
                          <p className="text-xs text-gray-500">Allow students to see their debate scores</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Students can view feedback</p>
                          <p className="text-xs text-gray-500">Allow students to see instructor feedback</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Peer evaluation</p>
                          <p className="text-xs text-gray-500">Allow students to evaluate teammates</p>
                        </div>
                        <Badge variant="outline">Disabled</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </ScrollArea>
        );
        
      default:
        return <div>Select a tab to view content</div>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden p-0" hideCloseButton>
        <div className="flex flex-col h-full">
          <DialogHeader className="flex flex-row items-center justify-between p-6 pb-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                <ClipboardList className="w-4 h-4 text-green-600" />
              </div>
              <DialogTitle className="text-xl">Debate Assessment Framework: Business Trusts</DialogTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 flex flex-col">
              <div className="border-b bg-gray-50">
                <nav className="flex">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab
                          ? 'border-blue-500 text-blue-600 bg-white'
                          : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="flex-1 overflow-hidden">
                {renderTabContent()}
              </div>
            </div>

            <div className="w-80 border-l bg-gray-50 p-6 overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Assessment Info</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Type: Debate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Max score: 100</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Scale className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Grading: Normal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Category: Participation</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Grading</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Due:</span>
                      <span className="text-sm font-medium">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Submitted:</span>
                      <span className="text-sm font-medium">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Graded:</span>
                      <span className="text-sm font-medium">0</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Options</h3>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Edit Assessment
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      View Submissions
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Export Results
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DebateAssessmentDialog;