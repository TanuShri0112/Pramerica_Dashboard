import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export const ResendLoginModal = ({ open, onOpenChange, selectedUsers }) => {
  const handleSendNow = () => {
    console.log('Sending login information to:', selectedUsers);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  const handlePreviewEmails = () => {
    console.log('Preview emails for:', selectedUsers);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" hideCloseButton>
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-xl font-semibold">Resend Login Information</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCancel}
            className="h-6 w-6 rounded-sm opacity-70 hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <p className="text-gray-600 mb-4">Login information will be sent to the following users:</p>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              {selectedUsers.map((user) => (
                <div key={user.id} className="flex justify-between items-center">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-gray-600">{user.email}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-blue-700 text-sm">
              Each user will receive an email with their login credentials and instructions to access the platform.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              onClick={handlePreviewEmails}
              className="px-6"
            >
              Preview Emails
            </Button>
            <Button
              onClick={handleSendNow}
              className="px-6 bg-blue-600 hover:bg-blue-700"
            >
              Send Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
