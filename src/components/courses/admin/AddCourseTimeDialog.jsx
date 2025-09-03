import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const AddCourseTimeDialog = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    day: '',
    startTime: '12',
    startPeriod: 'PM',
    startMinutes: '00',
    endTime: '12',
    endPeriod: 'PM',
    endMinutes: '00',
    location: ''
  });

  const handleSave = () => {
    if (!formData.day) {
      toast({
        title: "Validation Error",
        description: "Please select a day",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    toast({
      title: "Course time added",
      description: "Course schedule has been successfully added",
      duration: 3000,
    });
    onOpenChange(false);
    setFormData({
      day: '',
      startTime: '12',
      startPeriod: 'PM',
      startMinutes: '00',
      endTime: '12',
      endPeriod: 'PM',
      endMinutes: '00',
      location: ''
    });
  };

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const minutes = ['00', '15', '30', '45'];
  const periods = ['AM', 'PM'];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" hideCloseButton>
        <DialogHeader>
          <DialogTitle>Add to course schedule</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {/* Course time section */}
          <div className="space-y-4">
            <h3 className="font-medium text-base">Course time</h3>

            <div className="flex flex-wrap items-center gap-2 text-sm">
              <Select value={formData.day} onValueChange={(value) => setFormData({ ...formData, day: value })}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select a day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monday">Monday</SelectItem>
                  <SelectItem value="tuesday">Tuesday</SelectItem>
                  <SelectItem value="wednesday">Wednesday</SelectItem>
                  <SelectItem value="thursday">Thursday</SelectItem>
                  <SelectItem value="friday">Friday</SelectItem>
                  <SelectItem value="saturday">Saturday</SelectItem>
                  <SelectItem value="sunday">Sunday</SelectItem>
                </SelectContent>
              </Select>

              <span className="text-gray-600">from</span>

              <Select value={formData.startTime} onValueChange={(value) => setFormData({ ...formData, startTime: value })}>
                <SelectTrigger className="w-16">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {hours.map(hour => (
                    <SelectItem key={hour} value={hour}>{hour}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={formData.startPeriod} onValueChange={(value) => setFormData({ ...formData, startPeriod: value })}>
                <SelectTrigger className="w-16">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {periods.map(period => (
                    <SelectItem key={period} value={period}>{period}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <span className="text-gray-600">:</span>

              <Select value={formData.startMinutes} onValueChange={(value) => setFormData({ ...formData, startMinutes: value })}>
                <SelectTrigger className="w-16">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {minutes.map(minute => (
                    <SelectItem key={minute} value={minute}>{minute}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <span className="text-gray-600">to</span>

              <Select value={formData.endTime} onValueChange={(value) => setFormData({ ...formData, endTime: value })}>
                <SelectTrigger className="w-16">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {hours.map(hour => (
                    <SelectItem key={hour} value={hour}>{hour}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={formData.endPeriod} onValueChange={(value) => setFormData({ ...formData, endPeriod: value })}>
                <SelectTrigger className="w-16">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {periods.map(period => (
                    <SelectItem key={period} value={period}>{period}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <span className="text-gray-600">:</span>

              <Select value={formData.endMinutes} onValueChange={(value) => setFormData({ ...formData, endMinutes: value })}>
                <SelectTrigger className="w-16">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {minutes.map(minute => (
                    <SelectItem key={minute} value={minute}>{minute}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Location section */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-base font-medium">Location (optional)</Label>
            <Input
              id="location"
              placeholder=""
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-start gap-3 pt-4">
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

export default AddCourseTimeDialog;
