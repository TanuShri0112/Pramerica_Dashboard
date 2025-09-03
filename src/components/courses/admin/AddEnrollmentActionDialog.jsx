import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const AddEnrollmentActionDialog = ({ open, onOpenChange, type }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    actionType: 'email',
    recipient: '',
    subject: '',
    message: ''
  });

  const handleSave = () => {
    toast({
      title: `${type} action added`,
      description: `${type} action has been successfully created`,
      duration: 3000,
    });
    onOpenChange(false);
  };

  const getTitle = () => {
    switch (type) {
      case 'enrollment': return 'Add Enrollment Action';
      case 'unenrollment': return 'Add Unenrollment Action';
      case 'reenrollment': return 'Add Reenrollment Action';
      default: return 'Add Action';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Action Type</Label>
            <Select
              value={formData.actionType}
              onValueChange={(value) => setFormData({ ...formData, actionType: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Send Email</SelectItem>
                <SelectItem value="notification">Send Notification</SelectItem>
                <SelectItem value="webhook">Call Webhook</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.actionType === 'email' && (
            <>
              <div className="space-y-2">
                <Label>Recipient</Label>
                <Select
                  value={formData.recipient}
                  onValueChange={(value) => setFormData({ ...formData, recipient: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="learner">Learner</SelectItem>
                    <SelectItem value="instructors">All Instructors</SelectItem>
                    <SelectItem value="admins">All Admins</SelectItem>
                    <SelectItem value="custom">Custom Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Email Subject</Label>
                <Input
                  placeholder="Enter email subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea
                  placeholder="Enter email message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                />
              </div>
            </>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Add Action
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddEnrollmentActionDialog;
