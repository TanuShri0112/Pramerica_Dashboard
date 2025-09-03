import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Clock, Calculator } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const NumericCalculation = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes

  const questions = [
    {
      id: 1,
      problem: "A server processes 250 requests per second. If the response time increases by 15% during peak hours, calculate the new response time if the original response time was 120ms.",
      formula: "New Response Time = Original Time × (1 + Increase %)",
      correctAnswer: 138,
      tolerance: 2,
      unit: "ms"
    },
    {
      id: 2,
      problem: "Calculate the total bandwidth required for a video streaming service that serves 1,000 concurrent users, where each user requires 5 Mbps for HD quality.",
      formula: "Total Bandwidth = Users × Individual Bandwidth",
      correctAnswer: 5000,
      tolerance: 100,
      unit: "Mbps"
    },
    {
      id: 3,
      problem: "A database table has 2.5 million records. If each record is 0.8 KB in size, calculate the total storage space required in GB. (1 GB = 1,024 MB, 1 MB = 1,024 KB)",
      formula: "Storage = Records × Size per Record ÷ (1024 × 1024)",
      correctAnswer: 1.91,
      tolerance: 0.1,
      unit: "GB"
    },
    {
      id: 4,
      problem: "Calculate the compound annual growth rate (CAGR) of user registrations that grew from 10,000 to 45,000 over 3 years. Express as a percentage rounded to one decimal place.",
      formula: "CAGR = (Final/Initial)^(1/years) - 1",
      correctAnswer: 66.1,
      tolerance: 1,
      unit: "%"
    }
  ];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (value) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: value
    }));
  };

  const isAnswerCorrect = (questionIndex, userAnswer) => {
    const question = questions[questionIndex];
    const numericAnswer = parseFloat(userAnswer);
    if (isNaN(numericAnswer)) return false;

    return Math.abs(numericAnswer - question.correctAnswer) <= question.tolerance;
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (isAnswerCorrect(index, answers[index] || '')) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsCompleted(false);
    setTimeRemaining(1800);
  };

  if (isCompleted) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center p-8">
            <CardContent>
              <h1 className="text-3xl font-bold mb-4 text-green-600">Calculation Test Completed!</h1>
              <div className="text-6xl font-bold text-blue-600 mb-4">{score}%</div>
              <p className="text-lg mb-6">You scored {score}% on this numerical assessment</p>
              <div className="space-y-4">
                <Button onClick={handleRestart} className="w-full bg-blue-600 hover:bg-blue-700">
                  Restart Test
                </Button>
                <Button onClick={() => navigate('/courses/modules/1/assessments')} variant="outline" className="w-full">
                  Back to Assessments
                </Button>
                <Button onClick={() => navigate('/courses/modules')} variant="outline" className="w-full">
                  Go to Home
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
                <h1 className="text-2xl font-bold">Numeric Calculation</h1>
                <p className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
                <Badge className="bg-green-100 text-green-800">
                  <Calculator className="h-3 w-3 mr-1" />
                  Calculation
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-4 w-4" />
              <span className="font-mono">{formatTime(timeRemaining)}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <h2 className="text-lg font-semibold mb-6 text-green-700">
              Problem {currentQuestion + 1}:
            </h2>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <p className="text-gray-800 leading-relaxed mb-4">
                {questions[currentQuestion].problem}
              </p>

              {questions[currentQuestion].formula && (
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                  <p className="text-sm font-medium text-blue-700 mb-2">Formula:</p>
                  <p className="text-blue-600 font-mono">{questions[currentQuestion].formula}</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <label className="block font-medium text-gray-700">
                Your Answer:
              </label>
              <div className="flex items-center gap-3 max-w-md">
                <Input
                  type="number"
                  step="any"
                  placeholder="Enter your calculation result"
                  value={answers[currentQuestion] || ''}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="text-lg font-mono text-center"
                />
                {questions[currentQuestion].unit && (
                  <span className="text-gray-600 font-medium">
                    {questions[currentQuestion].unit}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-700">
                <span className="font-medium">Note:</span> Show your work on paper if needed. Round your final answer to the appropriate number of decimal places.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button 
            onClick={handlePrevious} 
            variant="outline" 
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Auto-save enabled</span>
          </div>

          <Button 
            onClick={handleNext}
            disabled={!answers[currentQuestion]?.trim()}
            className="bg-green-600 hover:bg-green-700"
          >
            {currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NumericCalculation;
