import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const SelectCertificateDialog = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [filter, setFilter] = useState('');
  const [library, setLibrary] = useState('All libraries');
  const [selectedCertificate, setSelectedCertificate] = useState(false);

  const handleSubmit = () => {
    if (!selectedCertificate) {
      toast({
        title: "Selection Required",
        description: "Please select a certificate",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    toast({
      title: "Certificate Selected",
      description: "Certificate prerequisite has been added",
      duration: 3000,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Select certificate
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-6 w-6"
            >
              ×
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <p className="text-sm text-gray-600">Select prerequisite certificate</p>
          
          {/* Filter and Library Selection */}
          <div className="flex gap-4">
            <Input
              placeholder="Filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="flex-1"
            />
            <Select value={library} onValueChange={setLibrary}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All libraries">All libraries</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Healthcare">Healthcare</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <p className="font-medium">1 matches found.</p>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={selectedCertificate}
                  onCheckedChange={(checked) => setSelectedCertificate(Boolean(checked))}
                  className="mt-1"
                />
                <div className="flex-1">
                  <h3 className="font-medium mb-2">Certificate of completion</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-blue-500 rounded"></div>
                      Certificate
                    </span>
                    <span>Library: Business</span>
                    <span>Created: Fri Mar 7, 2025</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    This certificate is awarded at the completion of one of the Advanced Photography Academy courses
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button 
              onClick={handleSubmit}
              disabled={!selectedCertificate}
              className="bg-gray-400 text-white hover:bg-gray-500 disabled:bg-gray-300"
            >
              Submit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectCertificateDialog;
