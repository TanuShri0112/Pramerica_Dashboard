import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Upload, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const libraryFiles = [
  '29d13cf9-70d3-4eeb-8907-894601ce43e2.jpg',
  '41Z_2106.w009.n001.5B.p8.5(2).jpg',
  '41Z_2106.w009.n001.5B.p8.5.jpg',
  '5390791.jpg',
  'Abstract of Trust(PPT)',
  'another file test',
  'Banking Resolution(PPT)',
  'Basics of Sovereignty, Summary of Freedom',
  'Basics of Sovereignty, Summary of Freedom (PPT)',
  'Basics_of_Sovereignty_Summary_of_Freedom(PPT)',
  'Beneficiaries and Units of Interest (PPT)'
];

const FileDialog = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('local');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    personal: true,
    organization: true,
    business: true,
    builtIn: true,
    favorites: true
  });

  const handleFileToggle = (fileName) => {
    setSelectedFiles(prev =>
      prev.includes(fileName)
        ? prev.filter(name => name !== fileName)
        : [...prev, fileName]
    );
  };

  const handleUpload = () => {
    if (activeTab === 'local') {
      toast({
        title: "File Upload",
        description: "This would open a file picker to upload files from your computer.",
      });
    } else {
      if (selectedFiles.length === 0) {
        toast({
          title: "No Files Selected",
          description: "Please select at least one file from the resources.",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Files Added",
        description: `${selectedFiles.length} file(s) have been successfully added to the module.`,
      });
    }
    
    setSelectedFiles([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Upload file</DialogTitle>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="local" className="bg-blue-500 text-white data-[state=active]:bg-blue-600">
              Local
            </TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Resources
            </TabsTrigger>
          </TabsList>

          <TabsContent value="local" className="mt-6">
            <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Upload className="h-12 w-12 text-gray-400 mb-4" />
                <div className="text-center">
                  <p className="text-lg font-medium text-gray-700">Drop file here,</p>
                  <p className="text-lg font-medium text-gray-700">or click to browse</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="mt-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Filter</label>
              <input 
                type="text" 
                placeholder="Search files..." 
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              {Object.entries(filterOptions).map(([key, checked]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={checked}
                    onCheckedChange={(checked) =>
                      setFilterOptions(prev => ({ ...prev, [key]: checked }))
                    }
                  />
                  <label htmlFor={key} className="text-sm capitalize">
                    {key === 'builtIn' ? 'Built-in' : key}
                  </label>
                </div>
              ))}
            </div>

            <div className="max-h-80 overflow-y-auto space-y-2">
              {libraryFiles.map((fileName) => (
                <div
                  key={fileName}
                  className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleFileToggle(fileName)}
                >
                  <Checkbox
                    checked={selectedFiles.includes(fileName)}
                    onCheckedChange={() => handleFileToggle(fileName)}
                  />
                  <FileText className="h-5 w-5 text-blue-500" />
                  <span className="flex-1 text-sm">{fileName}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <Button 
                onClick={handleUpload}
                className="bg-blue-500 hover:bg-blue-600"
                disabled={activeTab === 'resources' && selectedFiles.length === 0}
              >
                Upload
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default FileDialog;