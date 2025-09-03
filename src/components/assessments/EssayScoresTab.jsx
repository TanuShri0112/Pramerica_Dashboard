import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Eye, Save, X } from 'lucide-react';

const sampleSubmissions = [
  {
    id: 'sub-1',
    userId: 'user-1',
    userName: 'John Smith',
    email: 'john@example.com',
    avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png',
    response: 'Technology has fundamentally transformed modern society in unprecedented ways. From the way we communicate through social media platforms and instant messaging to how we work remotely and collaborate across continents, technology has reshaped human interactions. The digital revolution has democratized access to information, enabling anyone with an internet connection to learn, create, and share knowledge globally. However, this transformation comes with challenges including digital divides, privacy concerns, and the potential for social isolation despite increased connectivity.',
    wordCount: 789,
    submittedAt: '2024-01-15T10:30:00Z',
    timeSpent: 95,
    score: 85,
    feedback: 'Excellent analysis of technology\'s impact. Well-structured argument with good examples.',
    status: 'graded'
  },
  {
    id: 'sub-2',
    userId: 'user-2',
    userName: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png',
    response: 'The impact of technology on society is a complex topic that requires careful consideration. Technology has brought many benefits including improved healthcare, better education opportunities, and enhanced communication. Medical technology has saved countless lives through advanced diagnostic tools and treatment methods. Educational technology has made learning more accessible and interactive. However, we must also consider the negative aspects such as job displacement due to automation, increased screen time affecting physical health, and the spread of misinformation through social media platforms.',
    wordCount: 892,
    submittedAt: '2024-01-15T11:15:00Z',
    timeSpent: 110,
    score: null,
    feedback: '',
    status: 'pending'
  },
  {
    id: 'sub-3',
    userId: 'user-3',
    userName: 'Mike Wilson',
    email: 'mike@example.com',
    avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png',
    response: 'Technology has changed everything. We use phones all the time now. Social media connects people but also causes problems. Online shopping is convenient. Technology helps in schools and hospitals. But there are also bad things like cyberbullying and addiction to devices. Overall, technology is both good and bad for society.',
    wordCount: 234,
    submittedAt: '2024-01-16T09:20:00Z',
    timeSpent: 45,
    score: null,
    feedback: '',
    status: 'pending'
  }
];

export const EssayScoresTab = ({ essay }) => {
  const [submissions, setSubmissions] = useState(sampleSubmissions);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [score, setScore] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isGrading, setIsGrading] = useState(false);

  const handleGradeSubmission = (submission) => {
    setSelectedSubmission(submission);
    setScore(submission.score?.toString() || '');
    setFeedback(submission.feedback || '');
    setIsGrading(true);
  };

  const handleSaveGrade = () => {
    if (!selectedSubmission) return;

    const updatedSubmissions = submissions.map(sub => 
      sub.id === selectedSubmission.id 
        ? { 
            ...sub, 
            score: parseInt(score) || 0, 
            feedback,
            status: 'graded'
          }
        : sub
    );
    
    setSubmissions(updatedSubmissions);
    setIsGrading(false);
    setSelectedSubmission(null);
    setScore('');
    setFeedback('');
  };

  const handleCancelGrading = () => {
    setIsGrading(false);
    setSelectedSubmission(null);
    setScore('');
    setFeedback('');
  };

  const getScoreColor = (score) => {
    if (score === null) return 'text-gray-500';
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'graded': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Essay Scores</h3>
          <p className="text-sm text-gray-600">Review and grade student essay submissions</p>
        </div>
        <div className="text-sm text-gray-600">
          Total Submissions: {submissions.length} | 
          Graded: {submissions.filter(s => s.status === 'graded').length} | 
          Pending: {submissions.filter(s => s.status === 'pending').length}
        </div>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {submissions.map((submission) => (
          <Card key={submission.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={submission.avatar} />
                    <AvatarFallback>{submission.userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{submission.userName}</h4>
                    <p className="text-sm text-gray-600">{submission.email}</p>
                    <p className="text-xs text-gray-500">
                      Submitted: {new Date(submission.submittedAt).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      Time spent: {submission.timeSpent} minutes | Words: {submission.wordCount}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className={`text-2xl font-bold ${getScoreColor(submission.score)}`}>
                      {submission.score !== null ? `${submission.score}%` : 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600">Score</p>
                  </div>
                  
                  <Badge className={getStatusColor(submission.status)}>
                    {submission.status === 'graded' ? 'Graded' : 'Pending'}
                  </Badge>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View & Grade
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Grade Essay - {submission.userName}</DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-6">
                        {/* Student Info */}
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <Avatar>
                            <AvatarImage src={submission.avatar} />
                            <AvatarFallback>{submission.userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{submission.userName}</h4>
                            <p className="text-sm text-gray-600">{submission.email}</p>
                            <div className="flex gap-4 text-xs text-gray-500 mt-1">
                              <span>Submitted: {new Date(submission.submittedAt).toLocaleString()}</span>
                              <span>Time: {submission.timeSpent} min</span>
                              <span>Words: {submission.wordCount}</span>
                            </div>
                          </div>
                        </div>

                        {/* Essay Response */}
                        <div>
                          <h4 className="font-semibold mb-2">Student Response:</h4>
                          <div className="p-4 bg-gray-50 rounded-lg max-h-60 overflow-y-auto">
                            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                              {submission.response}
                            </p>
                          </div>
                        </div>

                        {/* Grading Section */}
                        <div className="space-y-4 border-t pt-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium mb-2 block">Score (out of {essay.maxScore})</label>
                              <Input
                                type="number"
                                max={essay.maxScore}
                                min={0}
                                placeholder="Enter score"
                                value={isGrading && selectedSubmission?.id === submission.id ? score : submission.score || ''}
                                onChange={(e) => {
                                  if (!isGrading) {
                                    handleGradeSubmission(submission);
                                  }
                                  setScore(e.target.value);
                                }}
                                onFocus={() => {
                                  if (!isGrading) {
                                    handleGradeSubmission(submission);
                                  }
                                }}
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium mb-2 block">Feedback</label>
                            <Textarea
                              placeholder="Provide detailed feedback for the student..."
                              rows={4}
                              value={isGrading && selectedSubmission?.id === submission.id ? feedback : submission.feedback || ''}
                              onChange={(e) => {
                                if (!isGrading) {
                                  handleGradeSubmission(submission);
                                }
                                setFeedback(e.target.value);
                              }}
                              onFocus={() => {
                                if (!isGrading) {
                                  handleGradeSubmission(submission);
                                }
                              }}
                            />
                          </div>

                          {isGrading && selectedSubmission?.id === submission.id && (
                            <div className="flex gap-2">
                              <Button onClick={handleSaveGrade} className="bg-green-600 hover:bg-green-700">
                                <Save className="h-4 w-4 mr-2" />
                                Save Grade
                              </Button>
                              <Button onClick={handleCancelGrading} variant="outline">
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {submissions.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-gray-500">No essay submissions yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};