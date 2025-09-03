import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import Timer from '@/components/shared/Timer';

const MultipleChoiceQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [completionTime, setCompletionTime] = useState(null);

  // Assessment settings
  const timeLimitMinutes = 15;

  const questions = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: "Paris"
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars"
    },
    {
      id: 3,
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctAnswer: "4"
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (value) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    setIsTimerRunning(false);
    setIsCompleted(true);
  };

  const handleTimeUp = () => {
    handleComplete();
  };

  const handleTimerComplete = (totalTime) => {
    setCompletionTime(totalTime);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100)
    };
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsCompleted(false);
    setIsTimerRunning(true);
    setCompletionTime(null);
  };

  if (isCompleted) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center p-8">
            <CardContent>
              <h1 className="text-3xl font-bold mb-4 text-green-600">Quiz Completed!</h1>
              <div className="space-y-4 mb-6">
                <p className="text-lg">
                  Your Score: <span className="font-bold text-blue-600">{score.correct}/{score.total} ({score.percentage}%)</span>
                </p>
                {completionTime && (
                  <p className="text-lg">
                    Time Taken: <span className="font-bold text-purple-600">{formatTime(completionTime)}</span>
                  </p>
                )}
                <p className="text-sm text-gray-600">Time Limit: {timeLimitMinutes} minutes</p>
              </div>
              <div className="space-y-4">
                <Button onClick={handleRestart} className="w-full bg-blue-600 hover:bg-blue-700">
                  Restart Quiz
                </Button>
                <Button onClick={() => navigate('/courses/modules/1/assessments')} variant="outline" className="w-full">
                  Back to Assessments
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => navigate('/courses/modules/1/assessments')} 
                variant="ghost"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Multiple Choice Quiz</h1>
                <p className="text-gray-600">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  Demo Mode
                </span>
              </div>
            </div>
            <Timer
              isRunning={isTimerRunning}
              timeLimitMinutes={timeLimitMinutes}
              onTimeUp={handleTimeUp}
              onComplete={handleTimerComplete}
              className="text-lg"
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>

            <RadioGroup
              value={selectedAnswers[currentQuestion.id] || ''}
              onValueChange={handleAnswerSelect}
              className="space-y-4"
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="text-base cursor-pointer flex-1">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button 
            onClick={handlePrevious} 
            variant="outline"
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentQuestionIndex
                    ? 'bg-blue-600'
                    : selectedAnswers[questions[index].id]
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Button 
            onClick={handleNext}
            disabled={!selectedAnswers[currentQuestion.id]}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Complete' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MultipleChoiceQuiz;
