import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Volume2, Video, Code, Paperclip } from 'lucide-react';

export const MultimediaTypeDialog = ({ open, onOpenChange, onSelectType }) => {
  const multimediaTypes = [
    {
      id: 'audio',
      title: 'Audio',
      description: 'Add an audio file with playback controls',
      icon: Volume2,
      color: 'text-purple-600'
    },
    {
      id: 'video',
      title: 'Video',
      description: 'Add a video file with playback controls',
      icon: Video,
      color: 'text-blue-600'
    },
    {
      id: 'embedded',
      title: 'Embedded',
      description: 'Add embedded content like iframes or widgets',
      icon: Code,
      color: 'text-green-600'
    },
    {
      id: 'attachment',
      title: 'Attachment',
      description: 'Add a PDF or downloadable file (PDF preview supported)',
      icon: Paperclip,
      color: 'text-orange-600'
    }
  ];

  const handleTypeSelect = (type) => {
    onSelectType(type);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Choose Media Type</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {multimediaTypes.map((type) => (
            <Card
              key={type.id}
              className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-300"
              onClick={() => handleTypeSelect(type.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-md">
                    <type.icon className={`h-5 w-5 ${type.color}`} />
                  </div>
                  <CardTitle className="text-base">{type.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm">
                  {type.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
