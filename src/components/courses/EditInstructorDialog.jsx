import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

/**
 * @typedef {object} Instructor
 * @property {string} id
 * @property {string} name
 * @property {string} [avatar]
 * @property {boolean} isOwner
 * @property {string} lastVisited
 * @property {string} [role]
 */

/**
 * A dialog for editing an instructor's details.
 * @param {object} props
 * @param {boolean} props.open - Whether the dialog is open.
 * @param {(open: boolean) => void} props.onOpenChange - Function to handle dialog open/close state.
 * @param {Instructor | null} props.instructor - The instructor object to edit.
 * @param {(instructor: Instructor) => void} props.onSave - Callback function to save the updated instructor.
 */
export const EditInstructorDialog = ({ open, onOpenChange, instructor, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (instructor) {
      setFormData({
        name: instructor.name,
        role: instructor.role || 'Instructor'
      });
    }
  }, [instructor]);

  /**
   * Handles the form submission.
   * @param {React.FormEvent} e - The form event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!instructor) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedInstructor = {
        ...instructor,
        name: formData.name,
        role: formData.role
      };
      
      onSave(updatedInstructor);
      toast({
        title: "Instructor updated successfully!",
        description: `${formData.name} has been updated.`,
        duration: 3000,
      });
      onOpenChange(false);
      setIsSubmitting(false);
    }, 1000);
  };

  const roleOptions = [
    'Lead Instructor',
    'Instructor',
    'Assistant Instructor',
    'Teaching Assistant',
    'Guest Instructor'
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Instructor</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {roleOptions.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};