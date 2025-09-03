import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const DragDropExercise = () => {
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes
  const [isCompleted, setIsCompleted] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);

  const dragItems = [
    { id: 'react', text: 'React.js', correctZone: 'frontend' },
    { id: 'mysql', text: 'MySQL', correctZone: 'backend' },
    { id: 'nodejs', text: 'Node.js', correctZone: 'backend' },
    { id: 'html', text: 'HTML/CSS', correctZone: 'frontend' },
    { id: 'express', text: 'Express.js', correctZone: 'backend' },
    { id: 'mongodb', text: 'MongoDB', correctZone: 'backend' }
  ];

  const [availableItems, setAvailableItems] = useState(dragItems);
  const [dropZones, setDropZones] = useState([
    { id: 'frontend', title: 'Frontend Layer', color: 'bg-blue-50 border-blue-200', items: [] },
    { id: 'backend', title: 'Backend Layer', color: 'bg-green-50 border-green-200', items: [] }
  ]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDragStart = (e, itemId) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, zoneId) => {
    e.preventDefault();
    if (!draggedItem) return;

    const item = availableItems.find(item => item.id === draggedItem);
    if (!item) return;

    // Remove from available items
    setAvailableItems(prev => prev.filter(i => i.id !== draggedItem));
    
    // Add to drop zone
    setDropZones(prev => prev.map(zone => 
      zone.id === zoneId 
        ? { ...zone, items: [...zone.items, item.text] }
        : zone
    ));

    setDraggedItem(null);
  };

  const handleComplete = () => {
    setIsCompleted(true);
  };

  const calculateScore = () => {
    let correct = 0;
    let total = 0;
    
    dragItems.forEach(item => {
      total++;
      const correctZone = dropZones.find(zone => zone.id === item.correctZone);
      if (correctZone?.items.includes(item.text)) {
        correct++;
      }
    });
    
    return Math.round((correct / total) * 100);
  };

  const handleRestart = () => {
    setAvailableItems(dragItems);
    setDropZones([
      { id: 'frontend', title: 'Frontend Layer', color: 'bg-blue-50 border-blue-200', items: [] },
      { id: 'backend', title: 'Backend Layer', color: 'bg-green-50 border-green-200', items: [] }
    ]);
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
              <h1 className="text-3xl font-bold mb-4 text-green-600">Exercise Completed!</h1>
              <div className="text-6xl font-bold text-blue-600 mb-4">{score}%</div>
              <p className="text-lg mb-6">You scored {score}% on this exercise</p>
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
                <h1 className="text-2xl font-bold">Drag & Drop Exercise</h1>
                <p className="text-gray-600">Question 1 of 2</p>
                <Badge className="bg-blue-100 text-blue-800">Demo Mode</Badge>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-4 w-4" />
              <span className="font-mono">{formatTime(timeRemaining)}</span>
            </div>
          </div>
        </div>

        {/* Exercise Content */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Web Development Stack Layers</h2>
              <Badge variant="outline" className="bg-purple-100 text-purple-800">Interactive</Badge>
            </div>
            
            <p className="text-gray-600 mb-8">
              Drag the technologies to their correct layer in the web development stack
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Available Items */}
              <div className="lg:col-span-1">
                <h3 className="font-medium mb-4">Available Items</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[300px]">
                  <div className="space-y-3">
                    {availableItems.map((item) => (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item.id)}
                        className="bg-white border border-gray-200 rounded-lg p-3 cursor-move hover:shadow-md transition-shadow"
                      >
                        {item.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drop Zones */}
              <div className="lg:col-span-2 space-y-6">
                {dropZones.map((zone) => (
                  <div key={zone.id}>
                    <h3 className="font-medium mb-3">{zone.title}</h3>
                    <div
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, zone.id)}
                      className={`border-2 border-dashed rounded-lg p-6 min-h-[120px] ${zone.color} transition-colors`}
                    >
                      {zone.items.length === 0 ? (
                        <p className="text-gray-500 text-center">Drop items here</p>
                      ) : (
                        <div className="grid grid-cols-2 gap-3">
                          {zone.items.map((item, index) => (
                            <div
                              key={index}
                              className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
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
            disabled={availableItems.length > 0}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Complete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DragDropExercise;