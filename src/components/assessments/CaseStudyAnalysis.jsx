import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Timer from '@/components/shared/Timer';

const CaseStudyAnalysis = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [completionTime, setCompletionTime] = useState(null);
  
  const timeLimitMinutes = 30;

  const caseStudyContent = {
    title: "IT Infrastructure Modernization Project",
    description: "TechCorp, a mid-sized financial services company, is planning a comprehensive IT infrastructure modernization to improve system performance, security, and scalability.",
    constraints: [
      "Budget: $500,000 for infrastructure improvements",
      "Timeline: 6 months for implementation", 
      "Downtime: Maximum 4 hours per month for maintenance",
      "Team: 8 developers, 2 DevOps engineers, 1 database administrator"
    ]
  };

  const questions = [
    {
      id: 1,
      title: "Question 1",
      question: "Analyze the performance bottlenecks in the current system and prioritize them based on impact and effort required to fix.",
      placeholder: "Provide your detailed analysis and recommendations...",
      recommendedWords: "200-400 words"
    },
    {
      id: 2,
      title: "Question 2", 
      question: "Propose a comprehensive solution architecture that addresses the performance issues while staying within the given constraints.",
      placeholder: "Provide your detailed analysis and recommendations...",
      recommendedWords: "200-400 words"
    },
    {
      id: 3,
      title: "Question 3",
      question: "Develop a migration strategy that minimizes risk and downtime while implementing your proposed solution.",
      placeholder: "Provide your detailed analysis and recommendations...",
      recommendedWords: "200-400 words"
    }
  ];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const getWordCount = (text) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const handleComplete = () => {
    setIsTimerRunning(false);
    setIsCompleted(true);
  };

  const handleTimerComplete = (totalTime) => {
    setCompletionTime(totalTime);
  };

  const handleRestart = () => {
    setAnswers({});
    setIsCompleted(false);
    setIsTimerRunning(true);
    setCompletionTime(null);
  };

  const isAllQuestionsAnswered = () => {
    return questions.every(q => answers[q.id]?.trim().length > 0);
  };

  const handleTimeUp = () => {
    handleComplete();
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center p-8">
            <CardContent>
              <h1 className="text-3xl font-bold mb-4 text-green-600">Analysis Submitted!</h1>
              <div className="space-y-4 mb-6">
                <p className="text-lg mb-6">Your case study analysis has been submitted for review</p>
                {completionTime && (
                  <p className="text-lg">Time Taken: <span className="font-bold text-purple-600">{formatTime(completionTime)}</span></p>
                )}
                <p className="text-sm text-gray-600">Time Limit: {timeLimitMinutes} minutes</p>
              </div>
              <div className="space-y-4">
                <Button onClick={handleRestart} className="w-full bg-blue-600 hover:bg-blue-700">
                  Restart Analysis
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
                <h1 className="text-2xl font-bold">Case Study Analysis</h1>
                <p className="text-gray-600">Question 1 of 1</p>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Demo Mode</span>
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

        {/* Case Study Content */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold mb-4">{caseStudyContent.title}</h2>
            <p className="text-gray-700 mb-6">{caseStudyContent.description}</p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold mb-4">Business Constraints:</h3>
              <ul className="space-y-2">
                {caseStudyContent.constraints.map((constraint, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{constraint}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Questions */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Analysis Questions</h2>
          
          {questions.map((question) => (
            <Card key={question.id} className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="font-semibold text-blue-600 mb-2">{question.title}</h3>
                  <p className="text-gray-800">{question.question}</p>
                </div>
                
                <Textarea
                  placeholder={question.placeholder}
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  className="min-h-[200px] mb-4"
                />
                
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Word count: {getWordCount(answers[question.id] || '')}</span>
                  <span>Recommended: {question.recommendedWords}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button variant="outline" disabled>
            Previous
          </Button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Auto-save enabled</span>
          </div>
          
          <Button 
            onClick={handleComplete}
            disabled={!isAllQuestionsAnswered()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Complete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyAnalysis;