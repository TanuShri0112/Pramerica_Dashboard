import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Calendar } from 'lucide-react';

const EditStyleDialog = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    type: 'Instructor',
    startDate: 'May 14 2025',
    endDate: 'May 21 2025'
  });

  const handleSave = () => {
    toast({
      title: "Style updated",
      description: "Course style settings have been successfully updated",
      duration: 3000,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Style</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Style Type */}
          <div className="space-y-2">
            <Label htmlFor="course-type" className="text-sm font-medium">Style:</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Instructor">Instructor</SelectItem>
                <SelectItem value="Self-paced">Self-paced</SelectItem>
                <SelectItem value="Blended">Blended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Duration */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Duration:</Label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
              {/* Start Date */}
              <div className="relative">
                <Input
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="pr-10"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>

              {/* To (Text) */}
              <div className="text-center text-sm text-gray-600 hidden md:block">to</div>
              <div className="md:hidden text-sm text-gray-600 text-center">to</div>

              {/* End Date */}
              <div className="relative">
                <Input
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="pr-10"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Optional Note */}
          <div className="text-sm text-gray-500">* Optional</div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditStyleDialog;
