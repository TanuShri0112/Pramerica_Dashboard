import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const FillInBlanks = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(1200); // 20 minutes

  const questions = [
    {
      id: 1,
      text: "The ___BLANK1___ method in JavaScript is used to add elements to the end of an array, while ___BLANK2___ removes the last element.",
      blanks: [
        { id: "BLANK1", correctAnswer: "push" },
        { id: "BLANK2", correctAnswer: "pop" }
      ],
      instruction: "Type your answers in the blank fields above. Each blank should be filled with the most appropriate term."
    },
    {
      id: 2,
      text: "In React, ___BLANK1___ is used to manage state in functional components, while ___BLANK2___ is used for side effects.",
      blanks: [
        { id: "BLANK1", correctAnswer: "useState" },
        { id: "BLANK2", correctAnswer: "useEffect" }
      ],
      instruction: "Fill in the blanks with the appropriate React hooks."
    },
    {
      id: 3,
      text: "CSS ___BLANK1___ is used for layout in two dimensions, while ___BLANK2___ is used for one-dimensional layouts.",
      blanks: [
        { id: "BLANK1", correctAnswer: "Grid" },
        { id: "BLANK2", correctAnswer: "Flexbox" }
      ],
      instruction: "Enter the CSS layout methods that match the descriptions."
    }
  ];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (blankId, value) => {
    setAnswers(prev => ({
      ...prev,
      [`${currentQuestion}-${blankId}`]: value
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
    let total = 0;
    questions.forEach((question, qIndex) => {
      question.blanks.forEach(blank => {
        total++;
        const userAnswer = answers[`${qIndex}-${blank.id}`]?.toLowerCase().trim();
        const correctAnswer = blank.correctAnswer.toLowerCase().trim();
        if (userAnswer === correctAnswer) {
          correct++;
        }
      });
    });
    return Math.round((correct / total) * 100);
  };

  const isCurrentQuestionComplete = () => {
    return questions[currentQuestion].blanks.every(blank =>
      answers[`${currentQuestion}-${blank.id}`]?.trim()
    );
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsCompleted(false);
    setTimeRemaining(1200);
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
                <h1 className="text-2xl font-bold">Fill in the Blanks</h1>
                <p className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Demo Mode</span>
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
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <h2 className="text-lg font-medium mb-6">Fill in the blanks:</h2>

            <div className="text-lg leading-relaxed mb-6">
              {questions[currentQuestion].text.split('___').map((part, index) => {
                if (index % 2 === 0) {
                  return <span key={index}>{part}</span>;
                } else {
                  const blankId = part;
                  const inputKey = `${currentQuestion}-${blankId}`;
                  return (
                    <Input
                      key={index}
                      className="inline-block w-32 mx-2 text-center border-2 border-orange-300 focus:border-orange-500"
                      placeholder={`Blank ${blankId.replace('BLANK', '')}`}
                      value={answers[inputKey] || ''}
                      onChange={(e) => handleInputChange(blankId, e.target.value)}
                    />
                  );
                }
              })}
            </div>

            {questions[currentQuestion].instruction && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700">
                  <span className="font-medium">Instructions:</span> {questions[currentQuestion].instruction}
                </p>
              </div>
            )}
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
            disabled={!isCurrentQuestionComplete()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FillInBlanks;
