import React, { useState, useRef } from 'react';
import { Check, X, Trophy } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const DragDropChallenge = () => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [buckets, setBuckets] = useState({
    protection: [],
    flexibility: [],
    assurance: []
  });
  const [availableItems, setAvailableItems] = useState([
    { id: 'tax-savings', text: 'Tax Savings', correctBucket: 'assurance' },
    { id: 'guaranteed-income', text: 'Guaranteed Income', correctBucket: 'assurance' },
    { id: 'life-cover', text: 'Life Cover', correctBucket: 'protection' },
    { id: 'choose-term', text: 'Choose Your Term', correctBucket: 'flexibility' },
    { id: 'guaranteed-security', text: 'Guaranteed Security', correctBucket: 'protection' }
  ]);
  const [correctMatches, setCorrectMatches] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [shakeItem, setShakeItem] = useState(null);

  const bucketConfig = {
    protection: { title: 'Protection', color: 'border-blue-200 bg-blue-50' },
    flexibility: { title: 'Flexibility', color: 'border-green-200 bg-green-50' },
    assurance: { title: 'Assurance', color: 'border-purple-200 bg-purple-50' }
  };

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, bucketKey) => {
    e.preventDefault();
    
    if (!draggedItem) return;

    const isCorrect = draggedItem.correctBucket === bucketKey;
    
    if (isCorrect) {
      // Correct match
      setBuckets(prev => ({
        ...prev,
        [bucketKey]: [...prev[bucketKey], draggedItem]
      }));
      setAvailableItems(prev => prev.filter(item => item.id !== draggedItem.id));
      setCorrectMatches(prev => prev + 1);
      
      // Check if all items are matched
      if (correctMatches + 1 === 5) {
        setIsComplete(true);
      }
    } else {
      // Incorrect match - shake animation
      setShakeItem(draggedItem.id);
      setTimeout(() => {
        setShakeItem(null);
      }, 1000);
    }
    
    setDraggedItem(null);
  };

  const resetChallenge = () => {
    setBuckets({
      protection: [],
      flexibility: [],
      assurance: []
    });
    setAvailableItems([
      { id: 'tax-savings', text: 'Tax Savings', correctBucket: 'assurance' },
      { id: 'guaranteed-income', text: 'Guaranteed Income', correctBucket: 'assurance' },
      { id: 'life-cover', text: 'Life Cover', correctBucket: 'protection' },
      { id: 'choose-term', text: 'Choose Your Term', correctBucket: 'flexibility' },
      { id: 'guaranteed-security', text: 'Guaranteed Security', correctBucket: 'protection' }
    ]);
    setCorrectMatches(0);
    setIsComplete(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="bg-gradient-to-r from-gray-50 to-indigo-50 rounded-2xl shadow-lg p-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Drag & Drop Activity: Match Benefits to Categories
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Test your knowledge by matching each benefit to its correct category
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-medium text-gray-700">
              Progress: {correctMatches} of 5 matched correctly
            </span>
            {!isComplete && (
              <button
                onClick={resetChallenge}
                className="text-sm text-indigo-600 hover:text-indigo-800 underline"
              >
                Reset Challenge
              </button>
            )}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-indigo-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(correctMatches / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Success Modal */}
        <Dialog open={isComplete} onOpenChange={setIsComplete}>
          <DialogContent className="max-w-md">
            <DialogHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <DialogTitle className="text-2xl font-bold text-green-800">
                🎉 Congratulations!
              </DialogTitle>
            </DialogHeader>
            
            <div className="text-center space-y-4">
              <p className="text-green-700 text-lg">
                Great job! You've mastered the key benefits.
              </p>
              <p className="text-gray-600">
                You've successfully matched all benefits to their correct categories.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={resetChallenge}
                  className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                >
                  Try Again
                </button>
                <button
                  onClick={() => setIsComplete(false)}
                  className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
                >
                  Continue
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Droppable Buckets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {Object.entries(bucketConfig).map(([bucketKey, config]) => (
            <div
              key={bucketKey}
              className={`min-h-[200px] border-2 border-dashed border-gray-300 rounded-lg p-4 transition-all duration-200 ${
                draggedItem ? 'border-indigo-400 bg-indigo-50' : config.color
              }`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, bucketKey)}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">
                {config.title}
              </h3>
              
              {/* Dropped Items */}
              <div className="space-y-2">
                {buckets[bucketKey].map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-green-300 rounded-lg p-3 shadow-sm flex items-center justify-between"
                  >
                    <span className="text-gray-800 font-medium">{item.text}</span>
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Draggable Items */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Available Benefits
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableItems.map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                className={`bg-white border-2 border-gray-200 rounded-lg p-4 cursor-move hover:border-indigo-300 hover:shadow-md transition-all duration-200 transform hover:scale-105 ${
                  shakeItem === item.id ? 'animate-shake border-red-400' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-800 font-medium">{item.text}</span>
                  <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {availableItems.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              <p>All items have been matched! 🎯</p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h4 className="font-semibold text-blue-800 mb-2">How to Play:</h4>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• Drag each benefit card to its correct category bucket</li>
            <li>• Green checkmarks indicate correct matches</li>
            <li>• Incorrect matches will shake and return to the pool</li>
            <li>• Complete all matches to finish the challenge</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DragDropChallenge;
