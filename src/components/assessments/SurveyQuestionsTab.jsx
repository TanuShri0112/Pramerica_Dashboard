import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export const SurveyQuestionsTab = ({ survey, onUpdate }) => {
  const questionTypes = [
    {
      id: 'mcq',
      title: 'Multiple Choice Question',
      description: 'Create questions with multiple answer options',
      icon: '☑️',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 'descriptive',
      title: 'Descriptive Question',
      description: 'Open-ended questions for detailed responses',
      icon: '📝',
      color: 'bg-green-50 border-green-200'
    }
  ];

  const handleQuestionTypeClick = (type) => {
    if (window.addAssessmentBlock) {
      window.addAssessmentBlock(type);
    }
  };

  const handleInstructionsClick = () => {
    if (window.editInstructions) {
      window.editInstructions();
    }
  };

  return (
    <div className="space-y-4">
      {/* Instructions Button */}
      <Card
        className="cursor-pointer transition-all duration-200 hover:shadow-md border bg-indigo-50 border-indigo-200"
        onClick={handleInstructionsClick}
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center text-lg">
              <FileText className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 text-sm mb-1">Edit Instructions</h4>
              <p className="text-xs text-gray-600">Add or modify survey instructions</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="font-semibold text-gray-900 mb-2">Question Types</h3>
        <p className="text-sm text-gray-600 mb-4">Click to add questions to your survey</p>

        <div className="space-y-3">
          {questionTypes.map((type) => (
            <Card
              key={type.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md border ${type.color}`}
              onClick={() => handleQuestionTypeClick(type.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center text-lg">
                    {type.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm mb-1">{type.title}</h4>
                    <p className="text-xs text-gray-600">{type.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
