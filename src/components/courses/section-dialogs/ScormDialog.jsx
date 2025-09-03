import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Plus, Library } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ScormDialog = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    
    if (option === 'new') {
      toast({
        title: "SCORM Upload",
        description: "This would open a file upload dialog for new SCORM packages.",
      });
    } else {
      toast({
        title: "SCORM Library",
        description: "This would open the library to select existing SCORM packages.",
      });
    }
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Add SCORM section</DialogTitle>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-sm text-gray-600">Select a SCORM package:</p>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-200"
            onClick={() => handleOptionSelect('new')}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <Plus className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-lg">New</CardTitle>
            </CardHeader>
            <CardContent className="text-center pt-0">
              <CardDescription>Upload a new SCORM package</CardDescription>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-200"
            onClick={() => handleOptionSelect('library')}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <Library className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Library</CardTitle>
            </CardHeader>
            <CardContent className="text-center pt-0">
              <CardDescription>Use an existing SCORM package from a library</CardDescription>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScormDialog;