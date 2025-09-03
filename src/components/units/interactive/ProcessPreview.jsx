import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ProcessPreview = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!steps || steps.length === 0) {
    return (
      <div className="p-4 border rounded-lg bg-gray-50">
        <p className="text-gray-500">No process steps configured</p>
      </div>
    );
  }

  const step = steps[currentStep];

  return (
    <div className="space-y-4">
      {/* Step Indicator */}
      <div className="flex items-center justify-center space-x-2">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentStep ? 'bg-blue-600' : index < currentStep ? 'bg-green-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="text-sm text-gray-500">Step {currentStep + 1} of {steps.length}</div>
            <h3 className="text-xl font-bold">{step.title || `Step ${currentStep + 1}`}</h3>
            
            {step.image && (
              <img 
                src={step.image} 
                alt={step.title} 
                className="w-full h-48 object-cover rounded-lg mx-auto"
              />
            )}
            
            <p className="text-gray-700">{step.description || 'No description set'}</p>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>
        
        <Button
          onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
          disabled={currentStep === steps.length - 1}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default ProcessPreview;