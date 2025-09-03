import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Plus, MessageSquare, Edit, Users } from 'lucide-react';

export const DebateQuestionsTab = () => {
  const handleAddDebate = () => {
    if (window.addAssessmentBlock) {
      window.addAssessmentBlock('debate');
    }
  };

  const handleEditInstructions = () => {
    if (window.editInstructions) {
      window.editInstructions();
    }
  };

  const cards = [
    {
      id: 'instructions',
      title: 'Edit Instructions',
      description: 'Add or modify debate instructions',
      icon: FileText,
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600',
      onClick: handleEditInstructions,
      clickable: true
    },
    {
      id: 'debate',
      title: 'Add a Debate',
      description: 'Create a structured debate topic for discussion',
      icon: MessageSquare,
      color: 'bg-red-50 border-red-200',
      iconColor: 'text-red-600',
      onClick: handleAddDebate,
      clickable: true
    }
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-gray-900 mb-2">Debate Options</h3>
        <p className="text-sm text-gray-600 mb-4">Configure your debate settings and content</p>
        
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