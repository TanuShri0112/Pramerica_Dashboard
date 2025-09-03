import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertCircle } from 'lucide-react';

export const KVLPreview = ({ kvlQuestion, kvlOptions, kvlCorrectAnswer, kvlFeedback }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  if (!kvlQuestion) {
    return (
      <div className="p-4 border rounded-lg bg-gray-50">
        <p className="text-gray-500">No KVL question configured</p>
      </div>
    );
  }

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
  };

  const resetQuiz = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{kvlQuestion}</h3>
          
          {!showFeedback ? (
            <div className="space-y-2">
              {kvlOptions?.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left justify-start h-auto p-4"
                  onClick={() => handleAnswerSelect(index)}
                >
                  <span className="bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </Button>
              )) || (
                <p className="text-gray-500">No options configured</p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Show all options with correct/incorrect indicators */}
              <div className="space-y-2">
                {kvlOptions?.map((option, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 flex items-center space-x-3 ${
                      index === kvlCorrectAnswer
                        ? 'border-green-500 bg-green-50'
                        : index === selectedAnswer
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <span className="bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1">{option}</span>
                    {index === kvlCorrectAnswer && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                    {index === selectedAnswer && index !== kvlCorrectAnswer && (
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                ))}
              </div>

              {/* Feedback */}
              <div className={`p-4 rounded-lg ${
                selectedAnswer === kvlCorrectAnswer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-center space-x-2 mb-2">
                  {selectedAnswer === kvlCorrectAnswer ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className="font-medium">
                    {selectedAnswer === kvlCorrectAnswer ? 'Correct!' : 'Incorrect'}
                  </span>
                </div>
                <p className="text-gray-700">
                  {kvlFeedback || 'No feedback provided'}
                </p>
              </div>

              <Button onClick={resetQuiz} variant="outline" className="w-full">
                Try Again
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default KVLPreview;