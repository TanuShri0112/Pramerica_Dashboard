import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Clock, ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const DropdownSelection = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes

  const questions = [
    {
      id: 1,
      text: "Select the appropriate HTTP status code for a successful resource creation:",
      options: ["200 OK", "201 Created", "204 No Content", "400 Bad Request", "404 Not Found"],
      correctAnswer: "201 Created",
      placeholder: "Choose HTTP status code"
    },
    {
      id: 2,
      text: "Which CSS property is used to control the stacking order of elements?",
      options: ["position", "z-index", "display", "float", "overflow"],
      correctAnswer: "z-index",
      placeholder: "Select CSS property"
    },
    {
      id: 3,
      text: "In React, which hook is used for side effects?",
      options: ["useState", "useEffect", "useContext", "useReducer", "useMemo"],
      correctAnswer: "useEffect",
      placeholder: "Choose React hook"
    },
    {
      id: 4,
      text: "What is the default port for HTTPS?",
      options: ["80", "443", "8080", "3000", "5000"],
      correctAnswer: "443",
      placeholder: "Select port number"
    },
    {
      id: 5,
      text: "Which database operation is used to modify existing records?",
      options: ["SELECT", "INSERT", "UPDATE", "DELETE", "CREATE"],
      correctAnswer: "UPDATE",
      placeholder: "Choose database operation"
    }
  ];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (value) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: value
    }));
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
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setIsCompleted(false);
    setTimeRemaining(900);
  };

  if (isCompleted) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center p-8">
            <CardContent>
              <h1 className="text-3xl font-bold mb-4 text-green-600">Assessment Completed!</h1>
              <div className="text-6xl font-bold text-blue-600 mb-4">{score}%</div>
              <p className="text-lg mb-6">You scored {score}% on this assessment</p>
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
                <h1 className="text-2xl font-bold">Dropdown Selection</h1>
                <p className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
                <Badge className="bg-orange-100 text-orange-800">
                  <ChevronDown className="h-3 w-3 mr-1" />
                  Dropdown
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
                className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold mb-8">
              {questions[currentQuestion].text}
            </h2>
            
            <div className="max-w-md">
              <Select 
                value={selectedAnswers[currentQuestion] || ""} 
                onValueChange={handleAnswerSelect}
              >
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder={questions[currentQuestion].placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {questions[currentQuestion].options.map((option, index) => (
                    <SelectItem key={index} value={option} className="text-base py-3">
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mt-8 p-4 bg-orange-50 rounded-lg">
              <p className="text-sm text-orange-700">
                <span className="font-medium">Tip:</span> Click the dropdown to see all available options and select the most appropriate answer.
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
            disabled={!selectedAnswers[currentQuestion]}
            className="bg-orange-600 hover:bg-orange-700"
          >
            {currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DropdownSelection;