import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

export const EnrollCourseDialog = ({ open, onOpenChange }) => {
  const [accessCode, setAccessCode] = useState('');
  const navigate = useNavigate();
  
  const handleEnroll = () => {
    onOpenChange(false);
    navigate('/catalog');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <div className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none">
          <X className="h-4 w-4" onClick={() => onOpenChange(false)} />
          <span className="sr-only">Close</span>
        </div>
        <DialogHeader>
          <DialogTitle>Enroll in a course</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="accessCode" className="text-sm font-medium">
              Access code:
            </label>
            <Input
              id="accessCode"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              className="col-span-3"
            />
            <p className="text-sm text-muted-foreground mt-2">
              If the course does not have an access code, you can enroll by finding it in the{' '}
              <span className="text-blue-500 cursor-pointer" onClick={() => navigate('/catalog')}>
                course catalog
              </span>{' '}
              and then clicking its Enroll option.
            </p>
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <Button type="submit" onClick={handleEnroll}>
            Enroll
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EnrollCourseDialog;