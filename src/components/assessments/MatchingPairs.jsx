import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const MatchingPairs = () => {
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedTech, setSelectedTech] = useState(null);
  const [selectedDesc, setSelectedDesc] = useState(null);
  const [matches, setMatches] = useState({});

  const technologies = [
    { id: 'html', text: 'HTML', correctMatch: 'markup' },
    { id: 'css', text: 'CSS', correctMatch: 'stylesheet' },
    { id: 'javascript', text: 'JavaScript', correctMatch: 'programming' },
    { id: 'react', text: 'React', correctMatch: 'library' }
  ];

  const descriptions = [
    { id: 'programming', text: 'Programming language for web interactivity' },
    { id: 'markup', text: 'Markup language for web structure' },
    { id: 'library', text: 'Library for building user interfaces' },
    { id: 'stylesheet', text: 'Stylesheet language for web presentation' }
  ];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTechClick = (techId) => {
    if (matches[techId]) return;
    setSelectedTech(selectedTech === techId ? null : techId);
    setSelectedDesc(null);
  };

  const handleDescClick = (descId) => {
    if (Object.values(matches).includes(descId)) return;

    if (selectedTech) {
      setMatches(prev => ({ ...prev, [selectedTech]: descId }));
      setSelectedTech(null);
      setSelectedDesc(null);
    } else {
      setSelectedDesc(selectedDesc === descId ? null : descId);
      setSelectedTech(null);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    technologies.forEach(tech => {
      if (matches[tech.id] === tech.correctMatch) {
        correct++;
      }
    });
    return Math.round((correct / technologies.length) * 100);
  };

  const handleComplete = () => {
    setIsCompleted(true);
  };

  const handleRestart = () => {
    setMatches({});
    setSelectedTech(null);
    setSelectedDesc(null);
    setIsCompleted(false);
    setTimeRemaining(900);
  };

  const isMatchUsed = (descId) => Object.values(matches).includes(descId);
  const isTechMatched = (techId) => matches[techId] !== undefined;

  if (isCompleted) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center p-8">
            <CardContent>
              <h1 className="text-3xl font-bold mb-4 text-green-600">Matching Completed!</h1>
              <div className="text-6xl font-bold text-blue-600 mb-4">{score}%</div>
              <p className="text-lg mb-6">You scored {score}% on this matching exercise</p>
              <div className="space-y-4">
                <Button onClick={handleRestart} className="w-full bg-blue-600 hover:bg-blue-700">
                  Restart Exercise
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
                <h1 className="text-2xl font-bold">Matching Pairs</h1>
                <p className="text-gray-600">Question 1 of 1</p>
                <Badge className="bg-purple-100 text-purple-800">Demo Mode</Badge>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-4 w-4" />
              <span className="font-mono">{formatTime(timeRemaining)}</span>
            </div>
          </div>
        </div>

        {/* Matching Exercise */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold mb-6">Match the technologies with their descriptions:</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Technologies Column */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Technologies</h3>
                <div className="space-y-3">
                  {technologies.map((tech) => (
                    <div
                      key={tech.id}
                      onClick={() => handleTechClick(tech.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        isTechMatched(tech.id)
                          ? 'bg-green-50 border-green-300 text-green-700'
                          : selectedTech === tech.id
                          ? 'bg-blue-50 border-blue-500 text-blue-700'
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium">{tech.text}</div>
                      {matches[tech.id] && (
                        <div className="text-sm text-green-600 mt-1">
                          ✓ Matched with: {descriptions.find(d => d.id === matches[tech.id])?.text}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Descriptions Column */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Descriptions</h3>
                <div className="space-y-3">
                  {descriptions.map((desc) => (
                    <div
                      key={desc.id}
                      onClick={() => handleDescClick(desc.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        isMatchUsed(desc.id)
                          ? 'bg-green-50 border-green-300 text-green-700'
                          : selectedDesc === desc.id
                          ? 'bg-blue-50 border-blue-500 text-blue-700'
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium">{desc.text}</div>
                      {isMatchUsed(desc.id) && (
                        <div className="text-sm text-green-600 mt-1">✓ Matched</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <span className="font-medium">Instructions:</span> Click on a technology from the left column, then click on its matching description from the right column.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button variant="outline" disabled>
            Previous
          </Button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Auto-save enabled</span>
          </div>
          
          <Button 
            onClick={handleComplete}
            disabled={Object.keys(matches).length !== technologies.length}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Complete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MatchingPairs;
