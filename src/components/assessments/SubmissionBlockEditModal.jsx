import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Link, Save, X, FileUp } from 'lucide-react';

export const SubmissionBlockEditModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [questionText, setQuestionText] = useState('');
  const [submissionType, setSubmissionType] = useState('drive-link');
  const [driveLink, setDriveLink] = useState('');
  const [textSubmission, setTextSubmission] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (initialData) {
      setQuestionText(initialData.questionText || '');
      setSubmissionType(initialData.submissionType || 'drive-link');
      setDriveLink(initialData.driveLink || '');
      setTextSubmission(initialData.textSubmission || '');
      setNotes(initialData.notes || '');
    } else {
      setQuestionText('Upload your assignment files');
      setSubmissionType('drive-link');
      setDriveLink('');
      setTextSubmission('');
      setNotes('');
    }
  }, [initialData, isOpen]);

  const handleSave = () => {
    const submissionData = {
      questionText,
      submissionType,
      driveLink,
      textSubmission,
      notes
    };
    onSave(submissionData);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg h-[85vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Edit Submission Block
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="questionText" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Question Text
              </Label>
              <Textarea
                id="questionText"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Enter the submission question or instructions..."
                className="min-h-[60px] resize-none"
                rows={3}
              />
            </div>

            <div className="space-y-3">
              <Label className="text-base font-medium">Submission Type</Label>
              <RadioGroup value={submissionType} onValueChange={setSubmissionType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="drive-link" id="drive-link" />
                  <Label htmlFor="drive-link" className="flex items-center gap-2 cursor-pointer">
                    <Link className="h-4 w-4" />
                    Drive Link
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="text-submission" id="text-submission" />
                  <Label htmlFor="text-submission" className="flex items-center gap-2 cursor-pointer">
                    <FileText className="h-4 w-4" />
                    Text Submission
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="file-upload" id="file-upload" />
                  <Label htmlFor="file-upload" className="flex items-center gap-2 cursor-pointer">
                    <FileUp className="h-4 w-4" />
                    File Upload <span className="text-xs text-gray-500">(Coming Soon)</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {submissionType === 'drive-link' && (
              <div className="space-y-2">
                <Label htmlFor="driveLink" className="flex items-center gap-2">
                  <Link className="h-4 w-4" />
                  Drive Link or Submission URL
                </Label>
                <Input
                  id="driveLink"
                  value={driveLink}
                  onChange={(e) => setDriveLink(e.target.value)}
                  placeholder="https://drive.google.com/... or submission URL"
                />
              </div>
            )}

            {submissionType === 'text-submission' && (
              <div className="space-y-2">
                <Label htmlFor="textSubmission" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Text Submission Placeholder
                </Label>
                <Textarea
                  id="textSubmission"
                  value={textSubmission}
                  onChange={(e) => setTextSubmission(e.target.value)}
                  placeholder="Enter placeholder text for the submission area..."
                  className="min-h-[50px] resize-none"
                  rows={2}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes/Instructions (Optional)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any additional notes or instructions for students..."
                className="min-h-[50px] resize-none"
                rows={2}
              />
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-3 pt-4 border-t flex-shrink-0">
          <Button variant="outline" onClick={handleCancel} className="flex items-center gap-2">
            <X className="h-4 w-4" />
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionBlockEditModal;
