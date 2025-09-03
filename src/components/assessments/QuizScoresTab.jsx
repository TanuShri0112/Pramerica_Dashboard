import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Eye, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

const sampleSubmissions = [
  {
    id: '1',
    userId: 'user-1',
    userName: 'John Smith',
    email: 'john@example.com',
    avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png',
    score: 85,
    totalPoints: 100,
    timeSpent: '22 minutes',
    submittedAt: '2024-01-15T10:30:00Z',
    responses: [
      { questionId: '1', answer: 'var x = 5;', isCorrect: true, points: 10 },
      { questionId: '2', answer: 'React', isCorrect: true, points: 10 },
      { questionId: '3', answer: 'push', isCorrect: true, points: 5 },
      { questionId: '4', answer: 'let and const are block-scoped...', isCorrect: true, points: 15 }
    ],
    feedback: 'Great work! Your understanding of JavaScript fundamentals is solid.'
  },
  {
    id: '2',
    userId: 'user-2',
    userName: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png',
    score: 72,
    totalPoints: 100,
    timeSpent: '28 minutes',
    submittedAt: '2024-01-15T11:15:00Z',
    responses: [
      { questionId: '1', answer: 'var x = 5;', isCorrect: true, points: 10 },
      { questionId: '2', answer: 'HTML', isCorrect: false, points: 0 },
      { questionId: '3', answer: 'push', isCorrect: true, points: 5 },
      { questionId: '4', answer: 'They are all the same', isCorrect: false, points: 7 }
    ],
    feedback: ''
  },
  {
    id: '3',
    userId: 'user-3',
    userName: 'Mike Wilson',
    email: 'mike@example.com',
    avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png',
    score: 95,
    totalPoints: 100,
    timeSpent: '18 minutes',
    submittedAt: '2024-01-16T09:20:00Z',
    responses: [
      { questionId: '1', answer: 'var x = 5;', isCorrect: true, points: 10 },
      { questionId: '2', answer: 'React', isCorrect: true, points: 10 },
      { questionId: '3', answer: 'push', isCorrect: true, points: 5 },
      { questionId: '4', answer: 'let and const have block scope...', isCorrect: true, points: 15 }
    ],
    feedback: 'Excellent performance! Perfect understanding of the concepts.'
  }
];

const QuizScoresTab = ({ quiz }) => {
  const [submissions, setSubmissions] = useState(sampleSubmissions);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const getScoreColor = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const openSubmissionDetail = (submission) => {
    setSelectedSubmission(submission);
  };

  const handleCloseDialog = () => {
    setSelectedSubmission(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Quiz Scores</h3>
          <p className="text-sm text-gray-600">View and manage student submissions</p>
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
                    <AvatarFallback>
                      {submission.userName.split(' ').map((n) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{submission.userName}</h4>
                    <p className="text-sm text-gray-600">{submission.email}</p>
                    <p className="text-xs text-gray-500">
                      Submitted: {new Date(submission.submittedAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className={`text-2xl font-bold ${getScoreColor(submission.score, submission.totalPoints)}`}>
                      {submission.score}/{submission.totalPoints}
                    </p>
                    <p className="text-sm text-gray-600">Score</p>
                  </div>

                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-700">{submission.timeSpent}</p>
                    <p className="text-sm text-gray-600">Time Spent</p>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openSubmissionDetail(submission)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Submission Details - {submission.userName}</DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="h-[600px] pr-4">
                        <div className="space-y-6">
                          {/* Student Info */}
                          <Card>
                            <CardContent className="p-4">
                              <div className="flex items-center gap-4">
                                <Avatar>
                                  <AvatarImage src={submission.avatar} />
                                  <AvatarFallback>
                                    {submission.userName.split(' ').map((n) => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-semibold">{submission.userName}</h4>
                                  <p className="text-sm text-gray-600">{submission.email}</p>
                                </div>
                                <div className="ml-auto text-right">
                                  <p className={`text-xl font-bold ${getScoreColor(submission.score, submission.totalPoints)}`}>
                                    {submission.score}/{submission.totalPoints}
                                  </p>
                                  <p className="text-sm text-gray-600">Final Score</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Responses */}
                          <div className="space-y-4">
                            <h4 className="font-semibold">Student Responses</h4>
                            {submission.responses.map((response, index) => (
                              <Card key={response.questionId}>
                                <CardHeader className="pb-2">
                                  <div className="flex items-center justify-between">
                                    <h5 className="font-medium">Question {index + 1}</h5>
                                    <Badge className={response.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                      {response.points} / {response.questionId === '4' ? '15' : '10'} points
                                    </Badge>
                                  </div>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-2">
                                    <p className="text-sm font-medium">Student Answer:</p>
                                    <p className="text-sm bg-gray-50 p-2 rounded">{response.answer}</p>
                                    {response.isCorrect ? (
                                      <p className="text-sm text-green-600">✅ Correct answer</p>
                                    ) : (
                                      <p className="text-sm text-red-600">❌ Incorrect answer</p>
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>

                          {/* Close Button */}
                          <div className="flex justify-end border-t pt-4">
                            <Button onClick={handleCloseDialog} variant="outline">
                              <X className="h-4 w-4 mr-2" />
                              Close
                            </Button>
                          </div>
                        </div>
                      </ScrollArea>
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
            <p className="text-gray-500">No submissions yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuizScoresTab;
