import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const AddPrerequisiteDialog = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    type: 'course',
    course: '',
    certificate: '',
    passingScore: ''
  });

  const handleSave = () => {
    toast({
      title: "Prerequisite added",
      description: "Prerequisite has been successfully added",
      duration: 3000,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Prerequisite</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Prerequisite Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="course">Course Completion</SelectItem>
                <SelectItem value="certificate">Certificate</SelectItem>
                <SelectItem value="assessment">Assessment Score</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.type === 'course' && (
            <div className="space-y-2">
              <Label>Required Course</Label>
              <Select value={formData.course} onValueChange={(value) => setFormData({ ...formData, course: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="intro101">Introduction to Programming</SelectItem>
                  <SelectItem value="web201">Web Development Basics</SelectItem>
                  <SelectItem value="db301">Database Fundamentals</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {formData.type === 'certificate' && (
            <div className="space-y-2">
              <Label>Required Certificate</Label>
              <Input
                placeholder="Enter certificate name"
                value={formData.certificate}
                onChange={(e) => setFormData({ ...formData, certificate: e.target.value })}
              />
            </div>
          )}

          {formData.type === 'assessment' && (
            <div className="space-y-2">
              <Label>Minimum Passing Score (%)</Label>
              <Input
                type="number"
                placeholder="80"
                value={formData.passingScore}
                onChange={(e) => setFormData({ ...formData, passingScore: e.target.value })}
              />
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Add Prerequisite
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPrerequisiteDialog;
