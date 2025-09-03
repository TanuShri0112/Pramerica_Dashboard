import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Upload, Edit, BarChart, MessageSquare, ArrowRight } from 'lucide-react';

export const AssessmentTypesTab = ({ selectedType, onTypeSelect }) => {
  const assessmentTypes = [
    {
      id: 'quiz',
      title: 'Quiz Section',
      description: 'Test your knowledge with various question formats',
      icon: FileText,
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600'
    },
    {
      id: 'assignment',
      title: 'Assignment Section',
      description: 'Submit projects and practical assignments',
      icon: Upload,
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600'
    },
    {
      id: 'essay',
      title: 'Essay Section',
      description: 'Write detailed essays and analytical pieces',
      icon: Edit,
      color: 'bg-purple-50 border-purple-200',
      iconColor: 'text-purple-600'
    },
    {
      id: 'survey',
      title: 'Survey Section',
      description: 'Participate in course feedback and surveys',
      icon: BarChart,
      color: 'bg-yellow-50 border-yellow-200',
      iconColor: 'text-yellow-600'
    },
    {
      id: 'debate',
      title: 'Debate Section',
      description: 'Engage in structured debates and discussions',
      icon: MessageSquare,
      color: 'bg-red-50 border-red-200',
      iconColor: 'text-red-600'
    }
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-gray-900 mb-2">Assessment Types</h3>
        <p className="text-sm text-gray-600 mb-4">Choose the type of assessment you want to create</p>
        
        <div className="space-y-3">
          {assessmentTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Card 
                key={type.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md border ${type.color} ${
                  selectedType === type.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => onTypeSelect(type.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-white flex items-center justify-center ${type.iconColor}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm mb-1">{type.title}</h4>
                      <p className="text-xs text-gray-600">{type.description}</p>
                      <div className="mt-2 flex items-center text-blue-600 text-xs font-medium">
                        Get Started <ArrowRight className="h-3 w-3 ml-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};