import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Clock, FileText, CheckCircle, Timer, Send } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const AssessmentLearnerPreview = ({ 
  open, 
  onOpenChange, 
  assessment 
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  if (!assessment) return null;

  const currentQuestion = assessment.questions[currentQuestionIndex];
  const totalQuestions = assessment.questions.length;
  const totalPoints = assessment.questions.reduce((sum, q) => sum + q.points, 0);

  const handleStart = () => {
    setIsStarted(true);
    setTimeRemaining(assessment.timeLimitMinutes * 60);
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    setIsStarted(false);
    setCurrentQuestionIndex(0);
    setAnswers({});
    onOpenChange(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const renderQuestion = (question) => {
    switch (question.type.toLowerCase()) {
      case 'multiple choice quiz':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{question.question}</h3>
            <RadioGroup
              value={answers[question.id] || ''}
              onValueChange={(value) => handleAnswerChange(question.id, value)}
            >
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`q${question.id}-${index}`} />
                  <Label htmlFor={`q${question.id}-${index}`} className="flex-1">
                    <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 'true/false test':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{question.question}</h3>
            <RadioGroup
              value={answers[question.id] || ''}
              onValueChange={(value) => handleAnswerChange(question.id, value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id={`q${question.id}-true`} />
                <Label htmlFor={`q${question.id}-true`}>True</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id={`q${question.id}-false`} />
                <Label htmlFor={`q${question.id}-false`}>False</Label>
              </div>
            </RadioGroup>
          </div>
        );

      case 'fill in the blanks':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{question.question}</h3>
            <Input
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              placeholder="Enter your answer..."
              className="w-full"
            />
          </div>
        );

      case 'essay writing':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{question.question}</h3>
            <Textarea
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              placeholder="Write your essay response..."
              className="min-h-[200px] w-full"
            />
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{question.question}</h3>
            <Textarea
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              placeholder="Enter your answer..."
              className="w-full"
            />
          </div>
        );
    }
  };

  if (!isStarted) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {assessment.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Assessment Instructions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{assessment.description}</p>
                
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                      <FileText className="h-4 w-4" />
                      Questions
                    </div>
                    <div className="font-semibold text-lg">{totalQuestions}</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      Time Limit
                    </div>
                    <div className="font-semibold text-lg">{assessment.timeLimitMinutes} min</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Total Points</div>
                    <div className="font-semibold text-lg">{totalPoints}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Passing Score</div>
                    <div className="font-semibold text-lg">{assessment.passingScore || 70}%</div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-3 rounded">
                  <p className="text-sm text-blue-800">
                    <strong>Important:</strong> Once you start the assessment, the timer will begin. 
                    Make sure you have a stable internet connection and enough time to complete it.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleStart} className="bg-green-600 hover:bg-green-700">
              Start Assessment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {assessment.title}
            </DialogTitle>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-blue-600">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </Badge>
              <div className="flex items-center gap-1 text-orange-600">
                <Timer className="h-4 w-4" />
                <span className="font-mono">{formatTime(timeRemaining)}</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {currentQuestion && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    Question {currentQuestionIndex + 1}
                  </CardTitle>
                  <Badge variant="outline">
                    {currentQuestion.points} {currentQuestion.points === 1 ? 'point' : 'points'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {renderQuestion(currentQuestion)}
              </CardContent>
            </Card>
          )}

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            
            <div className="text-sm text-gray-500">
              {Object.keys(answers).length} of {totalQuestions} answered
            </div>

            {currentQuestionIndex < totalQuestions - 1 ? (
              <Button onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                <Send className="h-4 w-4 mr-2" />
                Submit Assessment
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssessmentLearnerPreview;