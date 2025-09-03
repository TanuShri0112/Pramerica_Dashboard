import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const InactivitySettingsDialog = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [inactivityDays, setInactivityDays] = useState('Disable');

  const handleSave = () => {
    toast({
      title: "Inactivity settings updated",
      description: `Inactivity threshold set to: ${inactivityDays}`,
      duration: 3000,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl" hideCloseButton>
        <DialogHeader>
          <DialogTitle>Inactivity</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <Label className="text-sm font-medium whitespace-nowrap">
              Number of days of not visiting the course before learner is considered inactive:
            </Label>
            <Select value={inactivityDays} onValueChange={setInactivityDays}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Disable">Disable</SelectItem>
                <SelectItem value="1">1 day</SelectItem>
                <SelectItem value="3">3 days</SelectItem>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="14">14 days</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="60">60 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button 
              onClick={handleSave}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6"
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InactivitySettingsDialog;
