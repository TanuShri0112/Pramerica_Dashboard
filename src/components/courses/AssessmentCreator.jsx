import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, FileText, Clock, Settings } from 'lucide-react';
import QuestionBuilder from './QuestionBuilder';
import { toast } from '@/hooks/use-toast';

const AssessmentCreator = ({ 
  open, 
  onOpenChange, 
  onSave,
  editingAssessment,
  initialAssessmentType 
}) => {
  const [currentStep, setCurrentStep] = useState('details');
  const [assessmentDetails, setAssessmentDetails] = useState({
    title: editingAssessment?.title || '',
    description: editingAssessment?.description || '',
    assessmentType: editingAssessment?.assessmentType || initialAssessmentType || '',
    category: editingAssessment?.category || 'quiz',
    passingScore: editingAssessment?.passingScore || 70,
    attemptsAllowed: editingAssessment?.attemptsAllowed || 3
  });
  const [questions, setQuestions] = useState(editingAssessment?.questions || []);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(editingAssessment?.timeLimitMinutes || 15);

  useEffect(() => {
    if (initialAssessmentType) {
      setAssessmentDetails(prev => ({ ...prev, assessmentType: initialAssessmentType }));
    }
  }, [initialAssessmentType]);

  const assessmentTypes = [
    'Multiple Choice Quiz',
    'True/False Test',
    'Fill in the Blanks',
    'Essay Writing',
    'Assignment Upload',
    'Project Submission',
    'Live Proctored Exam'
  ];

  const handleDetailsNext = () => {
    if (!assessmentDetails.title || !assessmentDetails.assessmentType) {
      toast({
        title: "Missing Information",
        description: "Please fill in the title and select an assessment type.",
        variant: "destructive"
      });
      return;
    }
    setCurrentStep('questions');
  };

  const handleSaveAssessment = (questions, timeLimit) => {
    const assessment = {
      id: editingAssessment?.id || Date.now(),
      ...assessmentDetails,
      questions,
      timeLimitMinutes: timeLimit,
      status: 'draft',
      createdAt: editingAssessment?.createdAt || new Date().toISOString()
    };

    onSave(assessment);
    onOpenChange(false);
    setCurrentStep('details');
    
    toast({
      title: editingAssessment ? "Assessment Updated" : "Assessment Created",
      description: `Assessment "${assessment.title}" has been saved as draft.`
    });
  };

  const handlePublishAssessment = (questions, timeLimit) => {
    const assessment = {
      id: editingAssessment?.id || Date.now(),
      ...assessmentDetails,
      questions,
      timeLimitMinutes: timeLimit,
      status: 'published',
      createdAt: editingAssessment?.createdAt || new Date().toISOString()
    };

    onSave(assessment);
    onOpenChange(false);
    setCurrentStep('details');
    
    toast({
      title: editingAssessment ? "Assessment Updated & Published" : "Assessment Created & Published",
      description: `Assessment "${assessment.title}" has been published and is now available to students.`
    });
  };

  const handleCancel = () => {
    onOpenChange(false);
    setCurrentStep('details');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {editingAssessment ? 'Edit Assessment' : 'Create New Assessment'}
          </DialogTitle>
        </DialogHeader>

        {currentStep === 'details' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Assessment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Assessment Title *</Label>
                    <Input
                      id="title"
                      value={assessmentDetails.title}
                      onChange={(e) => setAssessmentDetails(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter assessment title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="assessmentType">Assessment Type *</Label>
                    <Select 
                      value={assessmentDetails.assessmentType} 
                      onValueChange={(value) => setAssessmentDetails(prev => ({ ...prev, assessmentType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select assessment type" />
                      </SelectTrigger>
                      <SelectContent>
                        {assessmentTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={assessmentDetails.description}
                    onChange={(e) => setAssessmentDetails(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter assessment description"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="passingScore">Passing Score (%)</Label>
                    <Input
                      id="passingScore"
                      type="number"
                      min="0"
                      max="100"
                      value={assessmentDetails.passingScore}
                      onChange={(e) => setAssessmentDetails(prev => ({ ...prev, passingScore: parseInt(e.target.value) }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="attemptsAllowed">Attempts Allowed</Label>
                    <Select 
                      value={assessmentDetails.attemptsAllowed.toString()} 
                      onValueChange={(value) => setAssessmentDetails(prev => ({ ...prev, attemptsAllowed: parseInt(value) }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Attempt</SelectItem>
                        <SelectItem value="2">2 Attempts</SelectItem>
                        <SelectItem value="3">3 Attempts</SelectItem>
                        <SelectItem value="999">Unlimited</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={assessmentDetails.category} 
                      onValueChange={(value) => setAssessmentDetails(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quiz">Quiz</SelectItem>
                        <SelectItem value="exam">Exam</SelectItem>
                        <SelectItem value="assignment">Assignment</SelectItem>
                        <SelectItem value="project">Project</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleDetailsNext}>
                Next: Add Questions
              </Button>
            </div>
          </div>
        )}

        {currentStep === 'questions' && (
          <QuestionBuilder
            assessmentType={assessmentDetails.assessmentType}
            onSave={handleSaveAssessment}
            onPublish={handlePublishAssessment}
            onCancel={() => setCurrentStep('details')}
            initialQuestions={questions}
            initialTimeLimit={timeLimitMinutes}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AssessmentCreator;