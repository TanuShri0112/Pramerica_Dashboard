import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Eye, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const AssignmentScoresTab = ({ assignment }) => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([
    {
      id: '1',
      studentName: 'John Smith',
      studentEmail: 'john.smith@email.com',
      submittedAt: '2024-01-15T10:30:00Z',
      score: 85,
      status: 'graded',
      responseLink: 'https://drive.google.com/file/d/sample1',
      feedback: 'Excellent analysis of technology\'s impact. Well-structured argument with good examples.'
    },
    {
      id: '2',
      studentName: 'Sarah Johnson',
      studentEmail: 'sarah.johnson@email.com',
      submittedAt: '2024-01-16T14:22:00Z',
      score: 92,
      status: 'graded',
      responseLink: 'https://drive.google.com/file/d/sample2',
      feedback: 'Outstanding work with clear reasoning and comprehensive analysis.'
    },
    {
      id: '3',
      studentName: 'Mike Wilson',
      studentEmail: 'mike.wilson@email.com',
      submittedAt: '2024-01-17T09:15:00Z',
      score: null,
      status: 'pending',
      responseLink: 'https://drive.google.com/file/d/sample3'
    },
    {
      id: '4',
      studentName: 'Emily Davis',
      studentEmail: 'emily.davis@email.com',
      submittedAt: '2024-01-17T16:45:00Z',
      score: 78,
      status: 'graded',
      responseLink: 'https://drive.google.com/file/d/sample4',
      feedback: 'Good effort with room for improvement in critical analysis.'
    },
    {
      id: '5',
      studentName: 'Robert Brown',
      studentEmail: 'robert.brown@email.com',
      submittedAt: '2024-01-18T11:30:00Z',
      score: null,
      status: 'in-review',
      responseLink: 'https://drive.google.com/file/d/sample5'
    }
  ]);

  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [score, setScore] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleGradeSubmission = (submission) => {
    setSelectedSubmission(submission);
    setScore(submission.score?.toString() || '');
    setFeedback(submission.feedback || '');
    setIsDialogOpen(true);
  };

  const handleSaveGrade = () => {
    if (selectedSubmission) {
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
      setIsDialogOpen(false);
      setSelectedSubmission(null);
      setScore('');
      setFeedback('');
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setSelectedSubmission(null);
    setScore('');
    setFeedback('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'graded': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score) => {
    const percentage = (score / assignment.maxScore) * 100;
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const gradedSubmissions = submissions.filter(s => s.status === 'graded');
  const averageScore = gradedSubmissions.length > 0 
    ? gradedSubmissions.reduce((sum, s) => sum + (s.score || 0), 0) / gradedSubmissions.length 
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Assignment Scores</h2>
          <p className="text-gray-600">
            {submissions.length} submissions • Average Score: {averageScore.toFixed(1)}/{assignment.maxScore}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{gradedSubmissions.length}</p>
              <p className="text-sm text-gray-600">Graded</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{submissions.filter(s => s.status === 'pending').length}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{submissions.filter(s => s.status === 'in-review').length}</p>
              <p className="text-sm text-gray-600">In Review</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submissions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-4 font-medium">Student</th>
                  <th className="text-left p-4 font-medium">Submitted At</th>
                  <th className="text-left p-4 font-medium">Score</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-right p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr key={submission.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{submission.studentName}</p>
                        <p className="text-sm text-gray-600">{submission.studentEmail}</p>
                      </div>
                    </td>
                    <td className="p-4 text-sm">
                      {formatDate(submission.submittedAt)}
                    </td>
                    <td className="p-4">
                      {submission.score !== null ? (
                        <span className={`font-semibold ${getScoreColor(submission.score)}`}>
                          {submission.score}/{assignment.maxScore}
                        </span>
                      ) : (
                        <span className="text-gray-500">Not graded</span>
                      )}
                    </td>
                    <td className="p-4">
                      <Badge className={getStatusColor(submission.status)}>
                        {submission.status.replace('-', ' ')}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleGradeSubmission(submission)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View & Grade
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Grade Assignment - {selectedSubmission?.studentName}</DialogTitle>
          </DialogHeader>
          
          {selectedSubmission && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Avatar>
                  <AvatarImage src="/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png" />
                  <AvatarFallback>{selectedSubmission.studentName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{selectedSubmission.studentName}</h4>
                  <p className="text-sm text-gray-600">{selectedSubmission.studentEmail}</p>
                  <div className="flex gap-4 text-xs text-gray-500 mt-1">
                    <span>Submitted: {formatDate(selectedSubmission.submittedAt)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Student Response:</h4>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-blue-600" />
                    <a 
                      href={selectedSubmission.responseLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {selectedSubmission.responseLink}
                    </a>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(selectedSubmission.responseLink, '_blank')}
                    >
                      Open
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4 border-t pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Score (out of {assignment.maxScore})</label>
                    <Input
                      type="number"
                      max={assignment.maxScore}
                      min={0}
                      placeholder="Enter score"
                      value={score}
                      onChange={(e) => setScore(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Feedback</label>
                  <Textarea
                    placeholder="Provide detailed feedback for the student..."
                    rows={4}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={handleSaveGrade} className="bg-blue-600 hover:bg-blue-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save Grade
                  </Button>
                  <Button onClick={handleCancel} variant="outline">
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};