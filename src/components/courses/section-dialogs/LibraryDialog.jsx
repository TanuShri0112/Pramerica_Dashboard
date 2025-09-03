import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { X, FileImage } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const libraryResources = [
  {
    id: '29d13cf9-70d3-4eeb-8907-894601ce43e2.jpg',
    name: '29d13cf9-70d3-4eeb-8907-894601ce43e2.jpg',
    type: 'File',
    category: 'Picture',
    library: 'Personal',
    created: 'Tue May 20, 2025'
  },
  {
    id: '41Z_2106.w009.n001.5B.p8.5(2).jpg',
    name: '41Z_2106.w009.n001.5B.p8.5(2).jpg',
    type: 'File',
    category: 'Picture',
    library: 'Personal',
    created: 'Mon May 19, 2025'
  },
  {
    id: '41Z_2106.w009.n001.5B.p8.5.jpg',
    name: '41Z_2106.w009.n001.5B.p8.5.jpg',
    type: 'File',
    category: 'Picture',
    library: 'Personal',
    created: 'Mon May 19, 2025'
  },
  {
    id: '5390791.jpg',
    name: '5390791.jpg',
    type: 'File',
    category: 'Picture',
    library: 'Personal',
    created: 'Sun May 18, 2025'
  }
];

const LibraryDialog = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [filter, setFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [libraryFilter, setLibraryFilter] = useState('all');
  const [selectedResources, setSelectedResources] = useState([]);

  const filteredResources = libraryResources.filter(resource => {
    const matchesFilter = resource.name.toLowerCase().includes(filter.toLowerCase());
    const matchesType = typeFilter === 'all' || resource.type.toLowerCase() === typeFilter.toLowerCase();
    const matchesLibrary = libraryFilter === 'all' || resource.library.toLowerCase() === libraryFilter.toLowerCase();
    
    return matchesFilter && matchesType && matchesLibrary;
  });

  const handleResourceToggle = (resourceId) => {
    setSelectedResources(prev =>
      prev.includes(resourceId)
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId]
    );
  };

  const handleSave = () => {
    if (selectedResources.length === 0) {
      toast({
        title: "No Resources Selected",
        description: "Please select at least one resource from the library.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Library Resources Added",
      description: `${selectedResources.length} resource(s) have been successfully added to the module.`,
    });
    
    setSelectedResources([]);
    setFilter('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Add existing resource</DialogTitle>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-sm text-gray-600">Select one or more resources from the list and then press Save.</p>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="flex-1"
            />
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="file">File</SelectItem>
                <SelectItem value="page">Page</SelectItem>
                <SelectItem value="quiz">Quiz</SelectItem>
              </SelectContent>
            </Select>
            <Select value={libraryFilter} onValueChange={setLibraryFilter}>
              <SelectTrigger className="w-36">
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
            {filteredResources.length} matches found.
          </div>

          <div className="space-y-3 max-h-80 overflow-y-auto">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => handleResourceToggle(resource.id)}
              >
                <Checkbox
                  checked={selectedResources.includes(resource.id)}
                  onCheckedChange={() => handleResourceToggle(resource.id)}
                />
                
                <div className="flex items-center gap-2">
                  <FileImage className="h-4 w-4 text-blue-500" />
                  <Badge variant="outline" className="text-xs">
                    {resource.type}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {resource.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Other
                  </Badge>
                  <span className="text-sm text-gray-600">Library: {resource.library}</span>
                  <span className="text-sm text-gray-500">Created: {resource.created}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{resource.name}</div>
                  <div className="text-xs text-gray-500 truncate">{resource.id}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button 
            onClick={handleSave}
            className="bg-gray-500 hover:bg-gray-600"
            disabled={selectedResources.length === 0}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LibraryDialog;