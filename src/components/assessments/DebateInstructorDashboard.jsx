import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Users, Edit, Save, X, Star, TrendingUp, TrendingDown, BarChart3, User, Clock, CheckCircle, AlertCircle, XCircle, MessageSquare, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const DebateInstructorDashboard = ({ open, onOpenChange, debate, onUpdate, isFullPage = false }) => {
  const [editingOverview, setEditingOverview] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedTopic, setEditedTopic] = useState('');
  const [editedInstructions, setEditedInstructions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [scoringSubmission, setScoringSubmission] = useState(null);
  const [tempScore, setTempScore] = useState(0);
  const [tempFeedback, setTempFeedback] = useState('');
  const [viewingResponse, setViewingResponse] = useState(null);

  useEffect(() => {
    if (debate) {
      setEditedTitle(debate.title);
      setEditedDescription(debate.description);
      setEditedTopic(debate.topic);
      setEditedInstructions(debate.instructions || [
        'Read all debate requirements carefully before participating',
        'Choose your position (for or against) based on your understanding',
        'Provide clear arguments supported by evidence',
        'Respect opposing viewpoints and maintain professional discourse',
        'Submit your response within the given time frame',
        'Use proper citations for any external sources referenced'
      ]);
    }
  }, [debate]);

  if (!debate) return null;

  const handleSaveOverview = () => {
    const updatedDebate = {
      ...debate,
      title: editedTitle,
      description: editedDescription,
      topic: editedTopic,
      instructions: editedInstructions
    };
    onUpdate(updatedDebate);
    setEditingOverview(false);
    toast.success('Debate overview updated successfully');
  };

  const handleAddInstruction = () => {
    setEditedInstructions([...editedInstructions, '']);
  };

  const handleRemoveInstruction = (index) => {
    if (editedInstructions.length > 1) {
      setEditedInstructions(editedInstructions.filter((_, i) => i !== index));
    }
  };

  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...editedInstructions];
    updatedInstructions[index] = value;
    setEditedInstructions(updatedInstructions);
  };

  const handleTeamAssignment = (userId, team) => {
    const updatedParticipants = debate.participants.map(user => 
      user.id === userId ? { ...user, team } : user
    );
    
    const updatedDebate = {
      ...debate,
      participants: updatedParticipants,
      forUsers: updatedParticipants.filter(u => u.team === 'for').map(u => u.id),
      againstUsers: updatedParticipants.filter(u => u.team === 'against').map(u => u.id)
    };
    
    onUpdate(updatedDebate);
    toast.success(`User assigned to ${team} team`);
  };

  const handleScoreSubmission = (submission, score, feedback) => {
    const updatedSubmissions = debate.submissions.map(sub =>
      sub.id === submission.id ? { ...sub, score, feedback } : sub
    );
    
    const updatedDebate = {
      ...debate,
      submissions: updatedSubmissions
    };
    
    onUpdate(updatedDebate);
    setScoringSubmission(null);
    setTempScore(0);
    setTempFeedback('');
    toast.success('Score and feedback submitted successfully');
  };

  const handleViewResponse = (submission) => {
    setViewingResponse(submission);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
      case 'not-attempted':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" /> Not Attempted</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getAnalytics = () => {
    const scores = debate.submissions.filter(s => s.score !== undefined).map(s => s.score);
    const totalSubmissions = debate.submissions.length;
    const completedSubmissions = debate.submissions.filter(s => s.score !== undefined).length;
    
    return {
      totalParticipants: debate.participants.length,
      totalSubmissions,
      completedSubmissions,
      averageScore: scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : 0,
      highestScore: scores.length > 0 ? Math.max(...scores) : 0,
      lowestScore: scores.length > 0 ? Math.min(...scores) : 0,
      forCount: debate.forUsers.length,
      againstCount: debate.againstUsers.length
    };
  };

  const getChartData = () => {
    const scores = debate.submissions.filter(s => s.score !== undefined).map(s => s.score);
    const chartData = [
      { name: 'Highest Score', value: scores.length > 0 ? Math.max(...scores) : 0 },
      { name: 'Average Score', value: scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0 },
      { name: 'Lowest Score', value: scores.length > 0 ? Math.min(...scores) : 0 }
    ];

    const participationData = [
      { name: 'For', value: analytics.forCount, fill: '#10b981' },
      { name: 'Against', value: analytics.againstCount, fill: '#ef4444' },
      { name: 'Unassigned', value: analytics.totalParticipants - analytics.forCount - analytics.againstCount, fill: '#6b7280' }
    ];

    return { chartData, participationData };
  };

  const analytics = getAnalytics();
  const { chartData, participationData } = getChartData();

  const content = (
    <div className={`space-y-4 ${isFullPage ? '' : 'max-h-[80vh] overflow-hidden'}`}>
      {/* Topic Header */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-blue-900 mb-2">{debate.title}</h2>
              <p className="text-blue-700 text-sm">{debate.description}</p>
              <p className="text-blue-600 text-xs mt-2 italic">Topic: {debate.topic}</p>
            </div>
            <Badge className="bg-blue-100 text-blue-800">Max Score: {debate.maxScore}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="scores">Scores</TabsTrigger>
          <TabsTrigger value="submission-status">Submission Status</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <ScrollArea className="h-96 w-full">
            <div className="space-y-4 pr-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Debate Overview</CardTitle>
                    <Button
                      variant={editingOverview ? "ghost" : "outline"}
                      size="sm"
                      onClick={() => setEditingOverview(!editingOverview)}
                    >
                      {editingOverview ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                      {editingOverview ? 'Cancel' : 'Edit'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {editingOverview ? (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Title</label>
                        <Input
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                          placeholder="Debate title"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Description</label>
                        <Textarea
                          value={editedDescription}
                          onChange={(e) => setEditedDescription(e.target.value)}
                          placeholder="Debate description"
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Topic</label>
                        <Input
                          value={editedTopic}
                          onChange={(e) => setEditedTopic(e.target.value)}
                          placeholder="Debate topic"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Instructions</label>
                        <div className="space-y-2">
                          {editedInstructions.map((instruction, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <span className="text-sm text-gray-500 w-6">{index + 1}.</span>
                              <Input
                                value={instruction}
                                onChange={(e) => handleInstructionChange(index, e.target.value)}
                                placeholder="Enter instruction..."
                                className="flex-1"
                              />
                              {editedInstructions.length > 1 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveInstruction(index)}
                                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleAddInstruction}
                            className="flex items-center gap-2"
                          >
                            <Plus className="h-4 w-4" />
                            Add Instruction
                          </Button>
                        </div>
                      </div>
                      <Button onClick={handleSaveOverview} className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Save Changes
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{debate.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{debate.description}</p>
                        <p className="text-gray-500 text-xs mt-2 italic">Topic: {debate.topic}</p>
                      </div>
                    </div>
                  )}

                  {/* Overall Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{analytics.totalParticipants}</div>
                      <div className="text-sm text-gray-600">Total Participants</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{analytics.forCount}</div>
                      <div className="text-sm text-gray-600">For the Topic</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{analytics.againstCount}</div>
                      <div className="text-sm text-gray-600">Against the Topic</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{analytics.totalSubmissions}</div>
                      <div className="text-sm text-gray-600">Total Submissions</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Instructions Card */}
              <Card className="bg-yellow-50 border-yellow-200">
                <CardHeader>
                  <CardTitle className="text-yellow-800">Debate Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="text-yellow-700 text-sm leading-relaxed space-y-2">
                    {(debate.instructions || [
                      'Read all debate requirements carefully before participating',
                      'Choose your position (for or against) based on your understanding',
                      'Provide clear arguments supported by evidence',
                      'Respect opposing viewpoints and maintain professional discourse',
                      'Submit your response within the given time frame',
                      'Use proper citations for any external sources referenced'
                    ]).map((instruction, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-current mt-1">{index + 1}.</span>
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Teams Tab */}
        <TabsContent value="teams" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{analytics.totalParticipants}</div>
                  <div className="text-sm text-gray-600">Total Participants</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{analytics.forCount}</div>
                  <div className="text-sm text-gray-600">For the Topic</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{analytics.againstCount}</div>
                  <div className="text-sm text-gray-600">Against the Topic</div>
                </div>
              </div>

              <ScrollArea className="h-96 w-full">
                <div className="space-y-3 pr-4">
                  {debate.participants.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {user.team && (
                          <Badge className={user.team === 'for' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {user.team === 'for' ? 'For' : 'Against'}
                          </Badge>
                        )}
                        <Select
                          value={user.team || ''}
                          onValueChange={(value) => handleTeamAssignment(user.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Assign Team" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="for">For</SelectItem>
                            <SelectItem value="against">Against</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scores Tab */}
        <TabsContent value="scores" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                User Responses & Scoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96 w-full">
                <div className="space-y-4 pr-4">
                  {debate.submissions.map((submission) => (
                    <Card key={submission.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <User className="h-5 w-5 text-gray-500" />
                            <div>
                              <div className="font-medium">{submission.userName}</div>
                              <Badge className={submission.position === 'for' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                {submission.position === 'for' ? 'For' : 'Against'}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {submission.score !== undefined ? (
                              <Badge className="bg-blue-100 text-blue-800">
                                Score: {submission.score}/{debate.maxScore}
                              </Badge>
                            ) : null}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewResponse(submission)}
                            >
                              View Details
                            </Button>
                            {submission.score === undefined && (
                              <Button
                                size="sm"
                                onClick={() => {
                                  setScoringSubmission(submission);
                                  setTempScore(0);
                                  setTempFeedback('');
                                }}
                              >
                                Score Response
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-700 line-clamp-3">{submission.response}</p>
                        </div>
                        {submission.feedback && (
                          <div className="mt-2 bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm font-medium text-blue-800">Instructor Feedback:</p>
                            <p className="text-sm text-blue-700">{submission.feedback}</p>
                          </div>
                        )}
                        <div className="text-xs text-gray-500 mt-2">
                          Submitted: {new Date(submission.submittedAt).toLocaleString()}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Response Detail Modal */}
          {viewingResponse && (
            <Dialog open={!!viewingResponse} onOpenChange={() => setViewingResponse(null)}>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Response Details - {viewingResponse.userName}
                  </DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-96 w-full">
                  <div className="space-y-4 pr-4">
                    <div className="flex items-center gap-2">
                      <Badge className={viewingResponse.position === 'for' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        Position: {viewingResponse.position === 'for' ? 'For' : 'Against'} the topic
                      </Badge>
                      {viewingResponse.score !== undefined && (
                        <Badge className="bg-blue-100 text-blue-800">
                          Score: {viewingResponse.score}/{debate.maxScore}
                        </Badge>
                      )}
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Student Response:</h4>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{viewingResponse.response}</p>
                    </div>
                    {viewingResponse.feedback && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">Instructor Feedback:</h4>
                        <p className="text-sm text-blue-700 whitespace-pre-wrap">{viewingResponse.feedback}</p>
                      </div>
                    )}
                    <div className="text-xs text-gray-500">
                      Submitted: {new Date(viewingResponse.submittedAt).toLocaleString()}
                    </div>
                    {viewingResponse.score === undefined && (
                      <Button
                        onClick={() => {
                          setScoringSubmission(viewingResponse);
                          setTempScore(0);
                          setTempFeedback('');
                          setViewingResponse(null);
                        }}
                        className="w-full"
                      >
                        Score This Response
                      </Button>
                    )}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          )}

          {/* Scoring Modal */}
          {scoringSubmission && (
            <Dialog open={!!scoringSubmission} onOpenChange={() => setScoringSubmission(null)}>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
                <DialogHeader>
                  <DialogTitle>Score Response - {scoringSubmission.userName}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-96 w-full">
                  <div className="space-y-4 pr-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Score (Max: {debate.maxScore})
                      </label>
                      <Input
                        type="number"
                        min="0"
                        max={debate.maxScore}
                        value={tempScore}
                        onChange={(e) => setTempScore(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Feedback for Student
                      </label>
                      <Textarea
                        value={tempFeedback}
                        onChange={(e) => setTempFeedback(e.target.value)}
                        placeholder="Provide constructive feedback on their response..."
                        rows={4}
                      />
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm font-medium mb-1">Student Response:</p>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{scoringSubmission.response}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => handleScoreSubmission(scoringSubmission, tempScore, tempFeedback)}>
                        Submit Score & Feedback
                      </Button>
                      <Button variant="outline" onClick={() => setScoringSubmission(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          )}
        </TabsContent>

        {/* Submission Status Tab */}
        <TabsContent value="submission-status" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Submission Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96 w-full">
                <div className="space-y-3 pr-4">
                  {debate.participants.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          {user.team && (
                            <Badge className={user.team === 'for' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                              Team: {user.team === 'for' ? 'For' : 'Against'}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(user.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <ScrollArea className="h-96 w-full">
            <div className="space-y-6 pr-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">{analytics.highestScore}</div>
                    <div className="text-sm text-gray-600">Highest Score</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <TrendingDown className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-red-600">{analytics.lowestScore}</div>
                    <div className="text-sm text-gray-600">Lowest Score</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">{analytics.averageScore}</div>
                    <div className="text-sm text-gray-600">Average Score</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-600">{analytics.completedSubmissions}</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </CardContent>
                </Card>
              </div>

              {/* Score Distribution Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Score Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Team Participation Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Team Participation</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={participationData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {participationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Participation Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Participation Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Total Participants</span>
                      <span className="text-sm text-gray-600">{analytics.totalParticipants}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Submissions Received</span>
                      <span className="text-sm text-gray-600">{analytics.totalSubmissions}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Submissions Graded</span>
                      <span className="text-sm text-gray-600">{analytics.completedSubmissions}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">For the Topic</span>
                      <span className="text-sm text-gray-600">{analytics.forCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Against the Topic</span>
                      <span className="text-sm text-gray-600">{analytics.againstCount}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );

  if (isFullPage) {
    return content;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Debate Instructor Dashboard</DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
};