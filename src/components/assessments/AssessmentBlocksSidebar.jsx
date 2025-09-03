import React from 'react';
import { AssessmentTypesTab } from './AssessmentTypesTab';
import { AssessmentQuestionsTab } from './AssessmentQuestionsTab';
import { AssignmentQuestionsTab } from './AssignmentQuestionsTab';
import { SurveyQuestionsTab } from './SurveyQuestionsTab';
import { DebateQuestionsTab } from './DebateQuestionsTab';
import { AssessmentSettingsTab } from './AssessmentSettingsTab';

// Default survey data for the sidebar context
const defaultSurvey = {
  id: 'new-survey',
  title: 'New Survey',
  description: 'Enter survey description',
  timeLimit: 15,
  questions: 0,
  totalResponses: 0,
  totalStudents: 0
};

export const AssessmentBlocksSidebar = ({ 
  activeTab, 
  selectedType, 
  onTypeSelect, 
  settings,
  onUpdateSettings 
}) => {
  
  const handleSurveyUpdate = (updatedSurvey) => {
    // Handle survey updates in sidebar context
    console.log('Survey updated in sidebar:', updatedSurvey);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'types':
        return <AssessmentTypesTab selectedType={selectedType} onTypeSelect={onTypeSelect} />;
      
      case 'questions':
        if (selectedType === 'quiz') {
          return <AssessmentQuestionsTab />;
        } else if (selectedType === 'assignment') {
          return <AssignmentQuestionsTab assessmentType={selectedType} />;
        } else if (selectedType === 'essay') {
          return <AssignmentQuestionsTab assessmentType={selectedType} />;
        } else if (selectedType === 'survey') {
          return <SurveyQuestionsTab survey={defaultSurvey} onUpdate={handleSurveyUpdate} />;
        } else if (selectedType === 'debate') {
          return <DebateQuestionsTab />;
        }
        return <AssessmentQuestionsTab />;
      
      case 'settings':
        return <AssessmentSettingsTab settings={settings} onUpdateSettings={onUpdateSettings} />;
      
      default:
        return <AssessmentTypesTab selectedType={selectedType} onTypeSelect={onTypeSelect} />;
    }
  };

  return (
    <div className="p-4 flex-1 overflow-y-auto">
      {renderTabContent()}
    </div>
  );
};