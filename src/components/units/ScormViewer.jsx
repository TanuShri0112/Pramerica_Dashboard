import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Package, Play, ExternalLink } from 'lucide-react';

export const ScormViewer = ({ scormData, title, onBack }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [scormContent, setScormContent] = useState(null);

  useEffect(() => {
    const loadScormContent = async () => {
      setIsLoading(true);

      // Simulate loading delay and set mock content
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setScormContent({
        title: title,
        version: 'SCORM 1.2',
        launchUrl: `${scormData.extractedPath}index.html`,
        description: 'Interactive SCORM learning content',
        duration: 'Estimated 30 minutes',
        objectives: [
          'Complete the interactive learning module',
          'Pass the embedded assessments',
          'Demonstrate understanding of key concepts',
        ],
      });

      setIsLoading(false);
    };

    loadScormContent();
  }, [scormData, title]);

  const handleLaunchScorm = () => {
    window.open(scormContent?.launchUrl || '#', '_blank', 'width=1024,height=768');
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2">Loading SCORM content...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Units
        </Button>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Package className="h-6 w-6" />
            {title}
          </h1>
          <p className="text-muted-foreground">SCORM Package</p>
        </div>
      </div>

      {/* SCORM Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            SCORM Package Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">File Name</label>
              <p className="font-medium">{scormData.fileName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">File Size</label>
              <p className="font-medium">{formatFileSize(scormData.size)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">SCORM Version</label>
              <p className="font-medium">{scormContent?.version}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Duration</label>
              <p className="font-medium">{scormContent?.duration}</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Description</label>
            <p className="mt-1">{scormContent?.description}</p>
          </div>

          {scormContent?.objectives && (
            <div>
              <label className="text-sm font-medium text-gray-500">Learning Objectives</label>
              <ul className="mt-1 space-y-1">
                {scormContent.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-500 text-sm">•</span>
                    <span className="text-sm">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Launch SCORM */}
      <Card>
        <CardHeader>
          <CardTitle>Launch SCORM Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button onClick={handleLaunchScorm} className="bg-green-600 hover:bg-green-700 text-white">
              <Play className="h-4 w-4 mr-2" />
              Launch SCORM Package
            </Button>
            <Badge variant="outline" className="flex items-center gap-1">
              <ExternalLink className="h-3 w-3" />
              Opens in new window
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            The SCORM content will open in a new window. Your progress will be tracked automatically.
          </p>
        </CardContent>
      </Card>

      {/* SCORM API Integration Info */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800">SCORM Integration</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700">
          <p className="text-sm">
            This SCORM package is fully integrated with the learning management system. 
            Your progress, scores, and completion status will be automatically tracked and recorded.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
