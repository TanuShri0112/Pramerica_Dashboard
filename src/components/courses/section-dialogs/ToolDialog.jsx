import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const toolProviders = [
  {
    id: 'acadsource',
    name: 'AcadSource',
    description: 'Academic Entitlements',
    icon: '📚'
  },
  {
    id: 'accepi',
    name: 'Accepi',
    description: 'Online homework',
    icon: '📝'
  },
  {
    id: 'activeclass',
    name: 'ActiveClass',
    description: 'ActiveClass is a social learning platform that simplifies classroom management and communication.',
    icon: '👥'
  },
  {
    id: 'adfontes',
    name: 'AdFontes CART',
    description: 'AdFontes - Content Analysis Rating Tools (CART) Platform',
    icon: '🔍'
  },
  {
    id: 'african-american',
    name: 'African-American History',
    description: 'Search available articles, videos and images. A new icon will show up in your course rich editor letting you search the product and click to embed in your course material.',
    icon: '📖'
  }
];

const ToolDialog = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedLibrary, setSelectedLibrary] = useState('all');
  const [selectedTool, setSelectedTool] = useState(null);

  const filteredTools = toolProviders.filter(tool =>
    tool.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const handleSubmit = () => {
    if (!selectedTool) {
      toast({
        title: "Tool Selection Required",
        description: "Please select a tool provider from the list.",
        variant: "destructive",
      });
      return;
    }

    const tool = toolProviders.find(t => t.id === selectedTool);
    toast({
      title: "Tool Added",
      description: `${tool?.name} has been successfully configured and added to the module.`,
    });
    
    setSelectedTool(null);
    setSearchFilter('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Build Tool</DialogTitle>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-sm text-gray-600">Select a tool provider from the list</p>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Filter"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedLibrary} onValueChange={setSelectedLibrary}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All libraries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All libraries</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="organization">Organization</SelectItem>
                <SelectItem value="business">Business</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="text-sm font-medium">
            {filteredTools.length} matches found.
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredTools.map((tool) => (
              <Card 
                key={tool.id}
                className={`cursor-pointer transition-colors ${
                  selectedTool === tool.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedTool(tool.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                      {tool.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base">{tool.name}</CardTitle>
                      <CardDescription className="text-sm">{tool.description}</CardDescription>
                    </div>
                    <div className="flex-shrink-0">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        selectedTool === tool.id ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                      }`} />
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button 
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600"
            disabled={!selectedTool}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ToolDialog;