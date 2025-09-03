import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Target, MousePointer } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const HotspotImageQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedHotspots, setSelectedHotspots] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes

  const questions = [
    {
      id: 1,
      title: "Website Layout Components",
      instruction: "Click on the navigation bar in this website layout",
      imageUrl: "/api/placeholder/800/600",
      hotspots: [
        { id: 'nav', x: 50, y: 8, radius: 40, label: 'Navigation Bar', description: 'Main navigation menu' },
        { id: 'header', x: 50, y: 25, radius: 25, label: 'Header', description: 'Page header section' },
        { id: 'content', x: 50, y: 55, radius: 35, label: 'Main Content', description: 'Primary content area' },
        { id: 'footer', x: 50, y: 90, radius: 30, label: 'Footer', description: 'Page footer section' }
      ],
      correctHotspots: ['nav']
    },
    {
      id: 2,
      title: "Database Schema Diagram",
      instruction: "Identify the primary key fields in this database schema",
      imageUrl: "/api/placeholder/800/600",
      hotspots: [
        { id: 'user_id', x: 25, y: 30, radius: 15, label: 'User ID', description: 'Primary key for users table' },
        { id: 'user_name', x: 25, y: 45, radius: 15, label: 'Username', description: 'User name field' },
        { id: 'order_id', x: 75, y: 30, radius: 15, label: 'Order ID', description: 'Primary key for orders table' },
        { id: 'product_name', x: 75, y: 45, radius: 15, label: 'Product Name', description: 'Product name field' }
      ],
      correctHotspots: ['user_id', 'order_id']
    }
  ];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleHotspotClick = (hotspotId) => {
    setSelectedHotspots(prev => {
      const currentSelections = prev[currentQuestion] || [];
      const isSelected = currentSelections.includes(hotspotId);
      if (isSelected) {
        return {
          ...prev,
          [currentQuestion]: currentSelections.filter(id => id !== hotspotId)
        };
      } else {
        return {
          ...prev,
          [currentQuestion]: [...currentSelections, hotspotId]
        };
      }
    });
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
    let totalCorrect = 0;
    let totalPossible = 0;

    questions.forEach((question, index) => {
      const userSelections = selectedHotspots[index] || [];
      const correctAnswers = question.correctHotspots;
      totalPossible += correctAnswers.length;
      userSelections.forEach(selection => {
        if (correctAnswers.includes(selection)) {
          totalCorrect++;
        }
      });
    });

    return Math.round((totalCorrect / Math.max(totalPossible, 1)) * 100);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedHotspots({});
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
              <h1 className="text-3xl font-bold mb-4 text-green-600">Quiz Completed!</h1>
              <div className="text-6xl font-bold text-blue-600 mb-4">{score}%</div>
              <p className="text-lg mb-6">You scored {score}% on this hotspot quiz</p>
              <div className="space-y-4">
                <Button onClick={handleRestart} className="w-full bg-blue-600 hover:bg-blue-700">
                  Restart Quiz
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

  const currentQuestionData = questions[currentQuestion];
  const currentSelections = selectedHotspots[currentQuestion] || [];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
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
                <h1 className="text-2xl font-bold">Hotspot Image Quiz</h1>
                <p className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
                <Badge className="bg-red-100 text-red-800">
                  <Target className="h-3 w-3 mr-1" />
                  Hotspot
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
                className="bg-red-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">{currentQuestionData.title}</h2>
              <Badge variant="outline" className="bg-red-100 text-red-800">
                <MousePointer className="h-3 w-3 mr-1" />
                Interactive
              </Badge>
            </div>
            <p className="text-gray-600 mb-8 text-lg">{currentQuestionData.instruction}</p>

            {/* Image + Hotspots */}
            <div className="relative mx-auto" style={{ maxWidth: '800px' }}>
              <div 
                className="relative bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg overflow-hidden border-2 border-dashed border-gray-300"
                style={{ paddingBottom: '75%' }}
              >
                <div className="absolute inset-0 p-4">
                  <div className="bg-slate-600 h-12 rounded mb-4 flex items-center px-4">
                    <div className="text-white text-sm">Navigation Menu</div>
                  </div>
                  <div className="bg-blue-100 h-16 rounded mb-4 flex items-center justify-center">
                    <div className="text-gray-600">Header Section</div>
                  </div>
                  <div className="bg-white flex-1 rounded mb-4 p-6 flex items-center justify-center" style={{ minHeight: '200px' }}>
                    <div className="text-gray-600 text-lg">Main Content Area</div>
                  </div>
                  <div className="bg-slate-600 h-12 rounded flex items-center justify-center">
                    <div className="text-white text-sm">Footer</div>
                  </div>
                </div>

                {/* Hotspots */}
                {currentQuestionData.hotspots.map((hotspot) => {
                  const isSelected = currentSelections.includes(hotspot.id);
                  return (
                    <button
                      key={hotspot.id}
                      onClick={() => handleHotspotClick(hotspot.id)}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full border-4 transition-all duration-200 hover:scale-110 ${
                        isSelected 
                          ? 'bg-red-500 border-red-600 shadow-lg' 
                          : 'bg-red-200 border-red-400 hover:bg-red-300'
                      }`}
                      style={{
                        left: `${hotspot.x}%`,
                        top: `${hotspot.y}%`,
                        width: `${hotspot.radius}px`,
                        height: `${hotspot.radius}px`
                      }}
                      title={hotspot.description}
                    >
                      {isSelected && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Target className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Hotspots */}
            {currentSelections.length > 0 && (
              <div className="mt-6 p-4 bg-red-50 rounded-lg">
                <h4 className="font-medium text-red-800 mb-2">Selected:</h4>
                <div className="flex flex-wrap gap-2">
                  {currentSelections.map(hotspotId => {
                    const hotspot = currentQuestionData.hotspots.find(h => h.id === hotspotId);
                    return (
                      <Badge key={hotspotId} className="bg-red-100 text-red-800">
                        {hotspot?.label}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <span className="font-medium">Instructions:</span> Click on the areas in the image that match the question. You can select multiple hotspots if needed.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
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
            disabled={currentSelections.length === 0}
            className="bg-red-600 hover:bg-red-700"
          >
            {currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HotspotImageQuiz;
