import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ResourceFormDialog } from './ResourceFormDialog';

const resourceOptions = [
  {
    id: 'badge',
    title: 'Badge',
    icon: <div className="w-10 h-10 text-blue-500 flex items-center justify-center"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8"><path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>,
    description: 'A badge is an award you can give learners'
  },
  {
    id: 'certificate',
    title: 'Certificate',
    icon: <div className="w-10 h-10 text-blue-500 flex items-center justify-center"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8"><path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20M4 19.5C4 20.163 4.26339 20.7989 4.73223 21.2678C5.20107 21.7366 5.83696 22 6.5 22H20V2H6.5C5.83696 2 5.20107 2.26339 4.73223 2.73223C4.26339 3.20107 4 3.83696 4 4.5V19.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>,
    description: 'A certificate indicates one or more proficiencies'
  },
  {
    id: 'content-template',
    title: 'Content template',
    icon: <div className="w-10 h-10 text-blue-500 flex items-center justify-center"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8"><path d="M8 2V5M16 2V5M3 8H21M8 11H8.01M12 11H12.01M16 11H16.01M8 15H8.01M12 15H12.01M16 15H16.01M8 19H8.01M12 19H12.01M16 19H16.01M5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6C21 5.46957 20.7893 4.96086 20.4142 4.58579C20.0391 4.21071 19.5304 4 19 4H5C4.46957 4 3.96086 4.21071 3.58579 4.58579C3.21071 4.96086 3 5.46957 3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>,
    description: 'Create custom content and use it as a template'
  },
  {
    id: 'course-template',
    title: 'Course template',
    icon: <div className="w-10 h-10 text-blue-500 flex items-center justify-center"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8"><path d="M4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2H20M4 19.5C4 20.163 4.26339 20.7989 4.73223 21.2678C5.20107 21.7366 5.83696 22 6.5 22H20V14M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20M16 8L18 6M18 6L20 8M18 6V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>,
    description: 'A course template is a course without learners or enrollment'
  },
  {
    id: 'file',
    title: 'File',
    icon: <div className="w-10 h-10 text-blue-500 flex items-center justify-center"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8"><path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8M14 2L20 8M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>,
    description: 'A file from your computer such as a document or video'
  },
  {
    id: 'grading-scale',
    title: 'Grading scale',
    icon: <div className="w-10 h-10 text-blue-500 flex items-center justify-center"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8"><path d="M4 20H8M12 20H16M20 20H22M2 20H2.01M17 8L22 13M22 8L17 13M7 15V17M12 11V17M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>,
    description: 'A grading scale is used to map scores'
  },
  {
    id: 'page',
    title: 'Page',
    icon: <div className="w-10 h-10 text-blue-500 flex items-center justify-center"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8"><path d="M20 14H14V20H20V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 4H20V10H14V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 4H10V10H4V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 14H10V20H4V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>,
    description: 'Plain text or HTML'
  },
  {
    id: 'question-bank',
    title: 'Question bank',
    icon: <div className="w-10 h-10 text-blue-500 flex items-center justify-center"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8"><path d="M9 17H15M9 13L15 13M9 9H15M17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>,
    description: 'A question bank is a reusable set of questions'
  },
  {
    id: 'rubric',
    title: 'Rubric',
    icon: <div className="w-10 h-10 text-blue-500 flex items-center justify-center"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8"><path d="M9 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V7C19 6.46957 18.7893 5.96086 18.4142 5.58579C18.0391 5.21071 17.5304 5 17 5H15M9 5C9 5.53043 9.21071 6.03914 9.58579 6.41421C9.96086 6.78929 10.4696 7 11 7H13C13.5304 7 14.0391 6.78929 14.4142 6.41421C14.7893 6.03914 15 5.53043 15 5M9 5C9 4.46957 9.21071 3.96086 9.58579 3.58579C9.96086 3.21071 10.4696 3 11 3H13C13.5304 3 14.0391 3.21071 14.4142 3.58579C14.7893 3.96086 15 4.46957 15 5M12 11H15M12 15H15M9 11H9.01M9 15H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>,
    description: 'A rubric is a scoring tool for rating an assessment'
  },
  {
    id: 'scorm',
    title: 'SCORM package',
    icon: <div className="w-10 h-10 text-blue-500 flex items-center justify-center"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8"><path d="M21 16V7.97721C20.9997 7.75357 20.9308 7.53672 20.8043 7.35812C20.6778 7.17953 20.5004 7.0484 20.3 6.98775L12.3 4.01775C12.1453 3.97282 11.9814 3.97282 11.8267 4.01775L3.7 7.02775C3.49717 7.08621 3.31767 7.21859 3.19239 7.40004C3.06711 7.58148 3.00173 7.8029 3 8.02775V16M21 16C21 16.5304 20.7893 17.0391 20.4142 17.4142C20.0391 17.7893 19.5304 18 19 18H5C4.46957 18 3.96086 17.7893 3.58579 17.4142C3.21071 17.0391 3 16.5304 3 16M21 16C21 15.4696 20.7893 14.9609 20.4142 14.5858C20.0391 14.2107 19.5304 14 19 14H5C4.46957 14 3.96086 14.2107 3.58579 14.5858C3.21071 14.9609 3 15.4696 3 16M12 13.5V10.5M16 13.5V10.5M8 13.5V10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>,
    description: 'Upload SCORM package for course content'
  },
  {
    id: 'skills',
    title: 'Skills',
    icon: <div className="w-10 h-10 text-blue-500 flex items-center justify-center"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8"><path d="M7 12L12 7L17 12M7 17L12 12L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>,
    description: 'Create and manage skill sets'
  },
  {
    id: 'survey',
    title: 'Survey question bank',
    icon: <div className="w-10 h-10 text-blue-500 flex items-center justify-center"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8"><path d="M8 15H16M8 9H16M8 12H12M21 11.5V16.8C21 17.9201 21 18.4802 20.782 18.908C20.5903 19.2843 20.2843 19.5903 19.908 19.782C19.4802 20 18.9201 20 17.8 20H6.2C5.07989 20 4.5198 20 4.09202 19.782C3.71569 19.5903 3.40973 19.2843 3.21799 18.908C3 18.4802 3 17.9201 3 16.8V7.2C3 6.07989 3 5.5198 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.5198 4 5.07989 4 6.2 4H14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>,
    description: 'Create surveys and questionnaires'
  }
];

export function AddResourceDialog({ open, onClose, onSelect }) {
  const [selectedResourceType, setSelectedResourceType] = useState(null);

  const handleResourceSelect = (resourceType) => {
    setSelectedResourceType(resourceType);
  };

  const handleFormClose = () => {
    setSelectedResourceType(null);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="p-6 border-b sticky top-0 bg-white z-10">
            <div className="flex justify-between items-center">
              <DialogTitle>Add resource</DialogTitle>
              <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
            {resourceOptions.map((option) => (
              <button
                key={option.id}
                className="flex flex-col items-center text-center border rounded-md p-6 hover:bg-gray-50 transition-colors"
                onClick={() => handleResourceSelect(option.id)}
              >
                {option.icon}
                <h3 className="mt-4 font-medium text-lg">{option.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{option.description}</p>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {selectedResourceType && (
        <ResourceFormDialog 
          resourceType={selectedResourceType}
          open={!!selectedResourceType}
          onClose={handleFormClose}
        />
      )}
    </>
  );
}