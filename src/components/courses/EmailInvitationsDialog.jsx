import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

export const EmailInvitationsDialog = ({ open, onOpenChange, courseId }) => {
  const [organization, setOrganization] = useState('PRAMERICA');
  const [invitationCount, setInvitationCount] = useState('1');

  const handleContinue = () => {
    console.log('Sending', invitationCount, 'email invitations for course:', courseId);
    // This would typically navigate to the next step or send the invitations
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">Email invitations</DialogTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onOpenChange(false)}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <p className="text-sm text-gray-600">
            To send invitations, first enter the number of invitations you'd like to send (up to 50 at a time) and press Continue. Then enter the email addresses and press Send.
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Organization
              </label>
              <Select value={organization} onValueChange={setOrganization}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PRAMERICA">PRAMERICA</SelectItem>
                  <SelectItem value="Other Organization">Other Organization</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Approximate number of invitations you'd like to send
              </label>
              <Select value={invitationCount} onValueChange={setInvitationCount}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 50 }, (_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>
                      {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-start pt-4">
            <Button 
              onClick={handleContinue}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6"
            >
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailInvitationsDialog;