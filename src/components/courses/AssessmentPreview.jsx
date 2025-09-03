import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const AssessmentPreview = ({ 
  open, 
  onOpenChange, 
  assessment 
}) => {
  if (!assessment) return null;

  const getAssessmentTypeColor = (type) => {
    const typeMap = {
      'Multiple Choice Quiz': 'bg-blue-100 text-blue-800',
      'True/False Test': 'bg-green-100 text-green-800',
      'Fill in the Blanks': 'bg-yellow-100 text-yellow-800',
      'Essay Writing': 'bg-purple-100 text-purple-800',
      'Assignment Upload': 'bg-orange-100 text-orange-800',
      'Project Submission': 'bg-red-100 text-red-800',
      'Live Proctored Exam': 'bg-indigo-100 text-indigo-800'
    };
    return typeMap[type] || 'bg-gray-100 text-gray-800';
  };

  const getQuestionTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'multiple choice quiz':
        return <CheckCircle className="h-4 w-4" />;
      case 'true/false test':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const totalPoints = assessment.questions.reduce((sum, q) => sum + q.points, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Assessment Preview: {assessment.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Assessment Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Assessment Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900">{assessment.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{assessment.description}</p>
                </div>
                <div className="space-y-2">
                  <Badge className={getAssessmentTypeColor(assessment.assessmentType)}>
                    {assessment.assessmentType}
                  </Badge>
                  <Badge variant={assessment.status === 'published' ? 'default' : 'secondary'}>
                    {assessment.status === 'published' ? 'Published' : 'Draft'}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                    <FileText className="h-4 w-4" />
                    Questions
                  </div>
                  <div className="font-semibold">{assessment.questions.length}</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    Time Limit
                  </div>
                  <div className="font-semibold">{assessment.timeLimitMinutes} min</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">Total Points</div>
                  <div className="font-semibold">{totalPoints}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">Passing Score</div>
                  <div className="font-semibold">{assessment.passingScore || 70}%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Questions Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Questions ({assessment.questions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assessment.questions.map((question, index) => (
                  <Card key={question.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {getQuestionTypeIcon(question.type)}
                          <span className="font-medium">Question {index + 1}</span>
                          <Badge variant="outline" className="text-xs">
                            {question.points} {question.points === 1 ? 'point' : 'points'}
                          </Badge>
                          {question.timeLimit && (
                            <Badge variant="outline" className="text-xs">
                              {question.timeLimit}s
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <p className="font-medium text-gray-900">{question.question}</p>

                        {question.options && question.options.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-700">Options:</p>
                            <div className="space-y-1">
                              {question.options.map((option, optionIndex) => (
                                <div 
                                  key={optionIndex} 
                                  className={`p-2 rounded text-sm ${
                                    option === question.correctAnswer 
                                      ? 'bg-green-50 border border-green-200 text-green-800' 
                                      : 'bg-gray-50 border border-gray-200'
                                  }`}
                                >
                                  <span className="font-medium">{String.fromCharCode(65 + optionIndex)}.</span> {option}
                                  {option === question.correctAnswer && (
                                    <CheckCircle className="inline h-4 w-4 ml-2 text-green-600" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {question.explanation && (
                          <div className="bg-blue-50 border border-blue-200 p-3 rounded">
                            <p className="text-sm">
                              <span className="font-medium text-blue-800">Explanation: </span>
                              <span className="text-blue-700">{question.explanation}</span>
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {assessment.questions.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No questions added to this assessment yet.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close Preview
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssessmentPreview;