import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Clock, Users, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const courseTemplates = [
  {
    id: 1,
    title: "Basic Finance Course",
    description: "A comprehensive template covering fundamental financial concepts",
    duration: "8 weeks",
    modules: 6,
    level: "Beginner",
    category: "Finance",
    thumbnail: "💰",
  },
  {
    id: 2,
    title: "Credit Analysis Workshop",
    description: "Advanced credit risk assessment and analysis methodologies",
    duration: "6 weeks",
    modules: 8,
    level: "Advanced",
    category: "Credit",
    thumbnail: "📊",
  },
  {
    id: 3,
    title: "Legal Compliance Training",
    description: "Essential legal frameworks and compliance requirements",
    duration: "4 weeks",
    modules: 5,
    level: "Intermediate",
    category: "Legal",
    thumbnail: "⚖️",
  },
  {
    id: 4,
    title: "Personal Development Series",
    description: "Self-improvement and professional growth course structure",
    duration: "12 weeks",
    modules: 10,
    level: "Beginner",
    category: "Personal Development",
    thumbnail: "🚀",
  },
  {
    id: 5,
    title: "Investment Strategies Course",
    description: "Modern portfolio theory and investment analysis",
    duration: "10 weeks",
    modules: 7,
    level: "Advanced",
    category: "Finance",
    thumbnail: "📈",
  },
  {
    id: 6,
    title: "Sovereignty & Rights Education",
    description: "Constitutional rights and personal sovereignty principles",
    duration: "6 weeks",
    modules: 8,
    level: "Intermediate",
    category: "SOVEREIGNTY 101",
    thumbnail: "🏛️",
  },
];

export const TemplateSelectionDialog = ({ open, onOpenChange }) => {
  const navigate = useNavigate();

  const handleTemplateSelect = (templateId) => {
    navigate(`/courses/create?template=${templateId}`);
    onOpenChange(false);
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none">
          <X className="h-4 w-4" onClick={() => onOpenChange(false)} />
          <span className="sr-only">Close</span>
        </div>
        <DialogHeader>
          <DialogTitle className="text-xl">Choose a Course Template</DialogTitle>
          <p className="text-muted-foreground">
            Select a pre-built template to jumpstart your course creation
          </p>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {courseTemplates.map((template) => (
            <div
              key={template.id}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => handleTemplateSelect(template.id)}
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl">{template.thumbnail}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{template.title}</h3>
                    <Badge variant="outline" className={getLevelColor(template.level)}>
                      {template.level}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {template.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {template.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {template.modules} modules
                    </div>
                  </div>
                  <Badge variant="outline" className="mt-2 text-xs">
                    {template.category}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-end mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateSelectionDialog;