import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Clock, Edit3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ShortAnswerTest = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(2400); // 40 minutes

  const questions = [
    {
      id: 1,
      question: "Explain the concept of 'hoisting' in JavaScript and provide an example demonstrating how variable and function declarations behave differently.",
      points: 10,
      minWords: 50,
      maxWords: 150,
      sampleAnswer: "Hoisting moves declarations to the top of their scope. Variables declared with 'var' are hoisted but not initialized, while function declarations are fully hoisted."
    },
    {
      id: 2,
      question: "Describe the differences between SQL and NoSQL databases. When would you choose one over the other?",
      points: 10,
      minWords: 60,
      maxWords: 180,
      sampleAnswer: "SQL databases are relational with structured schemas and ACID compliance. NoSQL databases are flexible, schema-less, and better for unstructured data and horizontal scaling."
    },
    {
      id: 3,
      question: "What is the purpose of middleware in Express.js? Explain how it works and provide a practical use case.",
      points: 10,
      minWords: 40,
      maxWords: 120,
      sampleAnswer: "Middleware functions execute between request and response. They can modify req/res objects, end requests, or call next middleware. Common uses include authentication, logging, and parsing."
    },
    {
      id: 4,
      question: "Explain the Virtual DOM in React and why it improves performance compared to direct DOM manipulation.",
      points: 10,
      minWords: 50,
      maxWords: 140,
      sampleAnswer: "Virtual DOM is a JavaScript representation of the real DOM. React compares virtual DOM trees to find minimal changes needed, reducing expensive DOM operations and improving performance."
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

  const isAnswerValid = (questionIndex) => {
    const answer = answers[questionIndex] || '';
    const wordCount = getWordCount(answer);
    const question = questions[questionIndex];
    return wordCount >= question.minWords && wordCount <= question.maxWords;
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

  const calculateCompletion = () => {
    let completed = 0;
    questions.forEach((_, index) => {
      if (isAnswerValid(index)) {
        completed++;
      }
    });
    return Math.round((completed / questions.length) * 100);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsCompleted(false);
    setTimeRemaining(2400);
  };

  if (isCompleted) {
    const completion = calculateCompletion();
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center p-8">
            <CardContent>
              <h1 className="text-3xl font-bold mb-4 text-green-600">Test Submitted!</h1>
              <p className="text-lg mb-6">Your short answer test has been submitted for review</p>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-blue-700">
                  <span className="font-medium">Completion Rate:</span> {completion}% of questions answered within word limits
                </p>
              </div>
              <div className="space-y-4">
                <Button onClick={handleRestart} className="w-full bg-blue-600 hover:bg-blue-700">
                  Start New Test
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

  const currentWordCount = getWordCount(answers[currentQuestion] || '');
  const question = questions[currentQuestion];
  const isCurrentValid = isAnswerValid(currentQuestion);

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
                <h1 className="text-2xl font-bold">Short Answer Test</h1>
                <p className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
                <Badge className="bg-indigo-100 text-indigo-800">
                  <Edit3 className="h-3 w-3 mr-1" />
                  Written Response
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
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-lg font-semibold text-indigo-700">
                Question {currentQuestion + 1}
              </h2>
              <Badge variant="outline" className="bg-indigo-50 text-indigo-700">
                {question.points} points
              </Badge>
            </div>

            <p className="text-gray-800 text-lg leading-relaxed mb-8">
              {question.question}
            </p>

            <div className="space-y-4">
              <Textarea
                placeholder="Type your answer here..."
                value={answers[currentQuestion] || ''}
                onChange={(e) => handleAnswerChange(e.target.value)}
                className="min-h-[200px] text-base leading-relaxed"
              />

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4 text-sm">
                  <span className={`${
                    currentWordCount < question.minWords ? 'text-red-600' :
                    currentWordCount > question.maxWords ? 'text-red-600' :
                    'text-green-600'
                  }`}>
                    Word count: {currentWordCount}
                  </span>
                  <span className="text-gray-500">
                    Required: {question.minWords}-{question.maxWords} words
                  </span>
                </div>
                {isCurrentValid && (
                  <Badge className="bg-green-100 text-green-800">
                    Valid length
                  </Badge>
                )}
              </div>
            </div>

            <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
              <p className="text-sm text-indigo-700">
                <span className="font-medium">Tips:</span> Be concise and specific. Use technical terms appropriately and provide examples where relevant.
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
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            {currentQuestion === questions.length - 1 ? 'Submit Test' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShortAnswerTest;
