import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const CustomReportDialog = ({ isOpen, onClose, onAddCustomReport }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [library, setLibrary] = useState('personal');
  const [reportOn, setReportOn] = useState('');

  const handleSave = () => {
    if (!name.trim()) {
      toast.error('Please enter a report name');
      return;
    }

    if (!reportOn) {
      toast.error('Please select what to report on');
      return;
    }

    // Call the callback to add the report
    onAddCustomReport({
      name,
      description,
      library,
      category: reportOn,
    });
    // Reset fields
    setName('');
    setDescription('');
    setLibrary('personal');
    setReportOn('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add custom report</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="name">Name:</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter report name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description:</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter report description"
              className="min-h-[100px]"
            />
          </div>
          <div className="grid gap-2">
            <Label>Library:</Label>
            <RadioGroup defaultValue="personal" value={library} onValueChange={setLibrary} className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="personal" id="personal" />
                <Label htmlFor="personal">Personal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="organization" id="organization" />
                <Label htmlFor="organization">Organization</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="business" id="business" />
                <Label htmlFor="business">Business</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="report-on">Report on</Label>
            <Select value={reportOn} onValueChange={setReportOn}>
              <SelectTrigger id="report-on">
                <SelectValue placeholder="Please select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="assessments">Assessments</SelectItem>
                <SelectItem value="certificates">Certificates</SelectItem>
                <SelectItem value="compliance">Compliance courses</SelectItem>
                <SelectItem value="courses">Courses</SelectItem>
                <SelectItem value="groups">Groups</SelectItem>
                <SelectItem value="users">Users</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomReportDialog;