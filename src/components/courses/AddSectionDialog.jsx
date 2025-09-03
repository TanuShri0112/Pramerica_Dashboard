import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  Box, 
  File, 
  Globe, 
  Wrench, 
  Library,
  HelpCircle,
  Edit,
  FileCheck,
  BarChart,
  MessageSquare,
  Gavel,
  Users,
  Upload,
  CheckSquare,
  Video
} from 'lucide-react';
import WebResourceDialog from './section-dialogs/WebResourceDialog';
import ToolDialog from './section-dialogs/ToolDialog';
import LibraryDialog from './section-dialogs/LibraryDialog';
import PageDialog from './section-dialogs/PageDialog';
import ScormDialog from './section-dialogs/ScormDialog';
import FileDialog from './section-dialogs/FileDialog';

const contentSections = [
  {
    id: 'page',
    title: 'Page',
    description: 'Enter your own content, such as text, images and video',
    icon: FileText
  },
  {
    id: 'scorm',
    title: 'SCORM',
    description: 'Content from a SCORM package',
    icon: Box
  },
  {
    id: 'file',
    title: 'File',
    description: 'A file from your computer such as a document or video',
    icon: File
  },
  {
    id: 'web-resource',
    title: 'Web resource',
    description: 'A link to a resource on the web',
    icon: Globe
  },
  {
    id: 'tool',
    title: 'Tool',
    description: 'A provisioned tool provider',
    icon: Wrench
  },
  {
    id: 'library',
    title: 'Library',
    description: 'Resources from a library or your favorites',
    icon: Library
  }
];

const assessmentSections = [
  {
    id: 'quiz',
    title: 'Quiz',
    description: 'Take an online quiz',
    icon: HelpCircle
  },
  {
    id: 'essay',
    title: 'Essay',
    description: 'Respond to a question with some text and optional attachments',
    icon: Edit
  },
  {
    id: 'offline-assessment',
    title: 'Offline assessment',
    description: 'An offline assessment such as taking a test or reading a book',
    icon: FileCheck
  },
  {
    id: 'survey',
    title: 'Survey',
    description: 'Take an online survey',
    icon: BarChart
  },
  {
    id: 'discussion',
    title: 'Discussion',
    description: 'Discuss a topic and earn points for participation',
    icon: MessageSquare
  },
  {
    id: 'debate',
    title: 'Debate',
    description: 'Debate a proposition and earn points for participation',
    icon: Gavel
  },
  {
    id: 'team',
    title: 'Team',
    description: 'Group learners into teams and score their combined efforts',
    icon: Users
  },
  {
    id: 'scorm-assessment',
    title: 'SCORM',
    description: 'Take a SCORM quiz',
    icon: Box
  },
  {
    id: 'dropbox',
    title: 'Dropbox',
    description: 'Submit one or more files',
    icon: Upload
  },
  {
    id: 'library-assessment',
    title: 'Library',
    description: 'Add a copy of one or more of your existing assessments',
    icon: Library
  }
];

const otherSections = [
  {
    id: 'checkbox',
    title: 'Checkbox',
    description: 'Add mandatory checkboxes',
    icon: CheckSquare
  },
  {
    id: 'web-conferencing',
    title: 'Web conferencing',
    description: 'Add web conferencing',
    icon: Video
  }
];

const AddSectionDialog = ({ open, onOpenChange }) => {
  const [activeTab, setActiveTab] = useState('content');
  const [specificDialogOpen, setSpecificDialogOpen] = useState(null);

  const handleSectionClick = (section, category) => {
    onOpenChange(false);
    setSpecificDialogOpen(section.id);
  };

  const handleSpecificDialogClose = () => {
    setSpecificDialogOpen(null);
  };

  const renderSectionGrid = (sections, category) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {sections.map((section) => (
        <Card 
          key={section.id} 
          className="cursor-pointer hover:shadow-md transition-shadow border-gray-200"
          onClick={() => handleSectionClick(section, category)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-md">
                <section.icon className="h-5 w-5 text-blue-600" />
              </div>
              <CardTitle className="text-base">{section.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <CardDescription className="text-sm text-gray-600">
              {section.description}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add section</DialogTitle>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger 
                value="content" 
                className={activeTab === 'content' ? 'bg-blue-500 text-white' : ''}
              >
                Content
              </TabsTrigger>
              <TabsTrigger 
                value="assessment"
                className={activeTab === 'assessment' ? 'bg-blue-500 text-white' : ''}
              >
                Assessment
              </TabsTrigger>
              <TabsTrigger 
                value="other"
                className={activeTab === 'other' ? 'bg-blue-500 text-white' : ''}
              >
                Other
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="mt-6">
              {renderSectionGrid(contentSections, 'Content')}
            </TabsContent>
            
            <TabsContent value="assessment" className="mt-6">
              {renderSectionGrid(assessmentSections, 'Assessment')}
            </TabsContent>
            
            <TabsContent value="other" className="mt-6">
              {renderSectionGrid(otherSections, 'Other')}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <WebResourceDialog 
        open={specificDialogOpen === 'web-resource'} 
        onOpenChange={handleSpecificDialogClose} 
      />
      
      <ToolDialog 
        open={specificDialogOpen === 'tool'} 
        onOpenChange={handleSpecificDialogClose} 
      />
      
      <LibraryDialog 
        open={specificDialogOpen === 'library'} 
        onOpenChange={handleSpecificDialogClose} 
      />
      
      <PageDialog 
        open={specificDialogOpen === 'page'} 
        onOpenChange={handleSpecificDialogClose} 
      />
      
      <ScormDialog 
        open={specificDialogOpen === 'scorm'} 
        onOpenChange={handleSpecificDialogClose} 
      />
      
      <FileDialog 
        open={specificDialogOpen === 'file'} 
        onOpenChange={handleSpecificDialogClose} 
      />
    </>
  );
};

export default AddSectionDialog;