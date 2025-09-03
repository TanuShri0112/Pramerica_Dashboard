import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const EssayQuestions = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes

  const questions = [
    {
      id: 1,
      title: "The Future of Web Development",
      prompt: "Write an essay discussing the current trends in web development and how you think the field will evolve over the next 5-10 years. Consider topics such as emerging technologies, changing user expectations, and the impact of AI on web development. Support your arguments with examples and personal insights.",
      wordRange: "300-800 words",
      maxWords: 800,
      minWords: 300
    },
    {
      id: 2,
      title: "Software Architecture Design Principles",
      prompt: "Analyze the importance of software architecture in large-scale applications. Discuss key principles such as scalability, maintainability, and security. Provide real-world examples of how poor architecture decisions can impact a project and suggest best practices for designing robust software systems.",
      wordRange: "400-900 words",
      maxWords: 900,
      minWords: 400
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

  const getWordCount = (text) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const getCharacterCount = (text) => {
    return text.length;
  };

  const getProgressToMinWords = () => {
    const currentWords = getWordCount(answers[currentQuestion] || '');
    const minWords = questions[currentQuestion].minWords;
    return Math.min((currentWords / minWords) * 100, 100);
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

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsCompleted(false);
    setTimeRemaining(3600);
  };

  const isMinWordCountMet = () => {
    const currentWords = getWordCount(answers[currentQuestion] || '');
    return currentWords >= questions[currentQuestion].minWords;
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center p-8">
            <CardContent>
              <h1 className="text-3xl font-bold mb-4 text-green-600">Essay Submitted!</h1>
              <p className="text-lg mb-6">Your essay has been submitted for review</p>
              <div className="space-y-4">
                <Button onClick={handleRestart} className="w-full bg-blue-600 hover:bg-blue-700">
                  Start New Essay
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
      <div className="max-w-5xl mx-auto">
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
                <h1 className="text-2xl font-bold">Essay Questions</h1>
                <p className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
                <Badge className="bg-purple-100 text-purple-800">Demo Mode</Badge>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-4 w-4" />
              <span className="font-mono">{formatTime(timeRemaining)}</span>
            </div>
          </div>
        </div>

        {/* Essay Card */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-blue-600 mb-4">
                {questions[currentQuestion].title}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {questions[currentQuestion].prompt}
              </p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your essay ({questions[currentQuestion].wordRange})
              </label>
              <Textarea
                placeholder="Begin writing your essay here..."
                value={answers[currentQuestion] || ''}
                onChange={(e) => handleAnswerChange(e.target.value)}
                className="min-h-[400px] resize-none text-base leading-relaxed"
              />
            </div>

            {/* Progress and Word Count */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress to minimum word count</span>
                  <span className="text-sm text-gray-600">
                    {getWordCount(answers[currentQuestion] || '')} / {questions[currentQuestion].minWords} words
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressToMinWords()}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-gray-600 space-y-1">
                  <div>Characters: {getCharacterCount(answers[currentQuestion] || '')}</div>
                  <div>Max words: {questions[currentQuestion].maxWords}</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-700">
                <span className="font-medium">Instructions:</span> Write a well-structured essay with clear introduction, body paragraphs, and conclusion. Use specific examples to support your arguments.
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
            disabled={!isMinWordCountMet()}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EssayQuestions;