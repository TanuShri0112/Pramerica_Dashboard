import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Plus, Upload, Edit, Trash2, Link } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export const AssignmentQuestionsTab = ({ assessmentType }) => {
  const [showSubmission, setShowSubmission] = useState(false);
  const [assignmentLink, setAssignmentLink] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const handleAddFirstQuestion = () => {
    if (window.addAssessmentBlock) {
      window.addAssessmentBlock('descriptive');
    }
  };

  const handleEditInstructions = () => {
    if (window.editInstructions) {
      window.editInstructions();
    }
  };

  const handleSubmissionClick = () => {
    if (window.hasSubmissionBlock && window.hasSubmissionBlock()) {
      if (window.editSubmissionBlock) {
        window.editSubmissionBlock();
      }
      return;
    }
    
    if (window.addAssessmentBlock) {
      window.addAssessmentBlock('submission');
    }
  };

  const handleEditSubmission = () => {
    console.log('Edit submission');
  };

  const handleDeleteSubmission = () => {
    setShowSubmission(false);
    setAssignmentLink('');
    setAdditionalNotes('');
    if (window.removeSubmissionForm) {
      window.removeSubmissionForm();
    }
    console.log('Delete submission');
  };

  const cards = [
    {
      id: 'instructions',
      title: 'Edit Instructions',
      description: 'Add or modify assessment instructions',
      icon: FileText,
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600',
      onClick: handleEditInstructions,
      clickable: true
    },
    {
      id: 'questions',
      title: 'Questions',
      description: 'Add descriptive questions to your assessment',
      icon: Plus,
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600',
      onClick: handleAddFirstQuestion,
      clickable: true
    }
  ];

  if (assessmentType !== 'essay') {
    cards.push({
      id: 'submission',
      title: 'Submission',
      description: 'Configure assessment submission settings',
      icon: Upload,
      color: 'bg-purple-50 border-purple-200',
      iconColor: 'text-purple-600',
      onClick: handleSubmissionClick,
      clickable: true
    });
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-gray-900 mb-2">Assessment Options</h3>
        <p className="text-sm text-gray-600 mb-4">Configure your assessment settings and content</p>
        
        <div className="space-y-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Card 
                key={card.id}
                className={`border ${card.color} ${card.clickable ? 'cursor-pointer transition-all duration-200 hover:shadow-md' : 'cursor-not-allowed opacity-60'}`}
                onClick={card.clickable ? card.onClick : undefined}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center text-lg">
                      <Icon className={`h-5 w-5 ${card.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm mb-1">{card.title}</h4>
                      <p className="text-xs text-gray-600">{card.description}</p>
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