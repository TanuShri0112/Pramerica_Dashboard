import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X, Plus } from 'lucide-react';
import { toast } from 'sonner';

const CourseForums = () => {
  const [isAddForumDialogOpen, setIsAddForumDialogOpen] = useState(false);
  const [forumName, setForumName] = useState('');
  const [forumDescription, setForumDescription] = useState('');

  const handleAddForum = () => {
    setIsAddForumDialogOpen(true);
  };

  const handleSaveForum = () => {
    if (!forumName.trim()) {
      toast.error('Please enter a forum name');
      return;
    }
    
    toast.success(`Forum "${forumName}" created successfully!`);
    setIsAddForumDialogOpen(false);
    setForumName('');
    setForumDescription('');
  };

  const forumSteps = [
    {
      id: 1,
      title: "A forum provides a place for users to create and participate in threaded discussions.",
      icon: (
        <div className="flex flex-col gap-2 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-400 rounded-full"></div>
            <div className="flex-1 h-2 bg-orange-300 rounded"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
            <div className="flex-1 h-2 bg-blue-300 rounded"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-400 rounded-full"></div>
            <div className="flex-1 h-2 bg-red-300 rounded"></div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Users can subscribe to forums or individual posts to receive notifications of new content.",
      icon: (
        <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
          <div className="w-6 h-6 bg-red-400 rounded-full"></div>
          <div className="flex-1 space-y-1">
            <div className="h-2 bg-red-300 rounded"></div>
            <div className="h-2 bg-red-300 rounded w-3/4"></div>
          </div>
          <div className="w-6 h-6 bg-blue-400 rounded flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded"></div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "To add a forum, click Add at the top of this page.",
      icon: (
        <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
          <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
          <div className="flex-1 space-y-1">
            <div className="h-2 bg-blue-300 rounded"></div>
            <div className="h-2 bg-blue-300 rounded w-2/3"></div>
          </div>
          <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
            <Plus className="w-4 h-4 text-white" />
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Once you have created a forum, you can configure it by clicking its Configure icon.",
      icon: (
        <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
          <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
          <div className="w-6 h-6 bg-red-400 rounded-full"></div>
        </div>
      )
    }
  ];

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Forums</h1>
          <Button onClick={handleAddForum} className="bg-blue-500 hover:bg-blue-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
        
        <p className="text-blue-600 mb-8">There are no forums.</p>
        
        <div className="space-y-6">
          {forumSteps.map((step) => (
            <div key={step.id} className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                  {step.id}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 mb-4">{step.title}</p>
                <div className="flex items-center">
                  {step.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Forum Dialog */}
      <Dialog open={isAddForumDialogOpen} onOpenChange={setIsAddForumDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Add forum</DialogTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsAddForumDialogOpen(false)}
                className="h-6 w-6"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="forumName">Name:</Label>
              <Input
                id="forumName"
                value={forumName}
                onChange={(e) => setForumName(e.target.value)}
                placeholder="Enter forum name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="forumDescription">Description: *</Label>
              <Textarea
                id="forumDescription"
                value={forumDescription}
                onChange={(e) => setForumDescription(e.target.value)}
                placeholder="Enter forum description"
                className="min-h-[100px]"
              />
              <p className="text-sm text-gray-500">* Optional</p>
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={handleSaveForum}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseForums;