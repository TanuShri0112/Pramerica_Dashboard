import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ShortAnswerQuestions = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes

  const questions = [
    {
      id: 1,
      question: "Explain the difference between localStorage and sessionStorage in web browsers.",
      wordRange: "50-150 words recommended",
      placeholder: "Type your answer here..."
    },
    {
      id: 2,
      question: "What are the key benefits of using React hooks over class components?",
      wordRange: "50-150 words recommended", 
      placeholder: "Type your answer here..."
    },
    {
      id: 3,
      question: "Describe the concept of responsive web design and its importance.",
      wordRange: "50-150 words recommended",
      placeholder: "Type your answer here..."
    }
  ];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: value
    }));
  };

  const getWordCount = (text) => {
    return text.trim().split(/\s+/).filter((word) => word.length > 0).length;
  };

  const getCharacterCount = (text) => {
    return text.length;
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsCompleted(false);
    setTimeRemaining(900);
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center p-8">
            <CardContent>
              <h1 className="text-3xl font-bold mb-4 text-green-600">Assessment Completed!</h1>
              <p className="text-lg mb-6">Your short answer responses have been submitted for review</p>
              <div className="space-y-4">
                <Button onClick={handleRestart} className="w-full bg-blue-600 hover:bg-blue-700">
                  Restart Assessment
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
                <h1 className="text-2xl font-bold">Short Answer Questions</h1>
                <p className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
                <Badge className="bg-green-100 text-green-800">Demo Mode</Badge>
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
            <h2 className="text-lg font-semibold mb-6">
              {questions[currentQuestion].question}
            </h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your answer ({questions[currentQuestion].wordRange})
              </label>
              <Textarea
                placeholder={questions[currentQuestion].placeholder}
                value={answers[currentQuestion] || ''}
                onChange={(e) => handleAnswerChange(e.target.value)}
                className="min-h-[200px] resize-none"
              />
            </div>

            <div className="flex justify-between items-center text-sm text-gray-600 mb-6">
              <span>Word count: {getWordCount(answers[currentQuestion] || '')}</span>
              <span>Characters: {getCharacterCount(answers[currentQuestion] || '')}</span>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-700">
                <span className="font-medium">Instructions:</span> Provide a concise but comprehensive answer. Focus on key concepts and practical examples.
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

export default ShortAnswerQuestions;
