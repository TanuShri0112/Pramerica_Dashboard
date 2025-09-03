import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Volume2, FileText, Video, Headphones, ArrowLeft, Edit, Save, X, BookOpen } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { ImmersiveReader } from '@/components/shared/ImmersiveReader';

const LessonContent = ({ lesson, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(lesson.title);
  const [editContent, setEditContent] = useState(lesson.content);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showImmersiveReader, setShowImmersiveReader] = useState(false);

  const handleSave = () => {
    toast({
      title: "Lesson Updated",
      description: "Lesson content has been saved successfully.",
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(lesson.title);
    setEditContent(lesson.content);
    setIsEditing(false);
  };

  const openImmersiveReader = () => {
    setShowImmersiveReader(true);
  };

  const renderContent = () => {
    if (lesson.type === 'text') {
      return (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Text Content</h3>
            <Button
              onClick={openImmersiveReader}
              variant="outline"
              className="flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              Immersive Reader
            </Button>
          </div>
          
          <div className="prose prose-slate max-w-none">
            {isEditing ? (
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="min-h-[400px] w-full"
                placeholder="Enter lesson content..."
              />
            ) : (
              <div className="whitespace-pre-wrap text-slate-700 leading-relaxed p-4 bg-gray-50 rounded-lg">
                {lesson.content}
              </div>
            )}
          </div>
        </div>
      );
    }

    if (lesson.type === 'video') {
      return (
        <div className="space-y-4">
          <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center">
            {lesson.videoUrl ? (
              <video 
                controls 
                className="w-full h-full rounded-lg"
                poster="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop&auto=format"
              >
                <source src={lesson.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="text-center p-8">
                <Video className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-500">Video content placeholder</p>
                <p className="text-sm text-slate-400 mt-2">Duration: {lesson.duration}</p>
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Video Description:</h4>
            {lesson.content && (
              <Button
                onClick={openImmersiveReader}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                Read Description
              </Button>
            )}
          </div>
          
          {isEditing ? (
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="min-h-[200px]"
              placeholder="Enter video description and transcript..."
            />
          ) : (
            <div className="text-slate-700 p-4 bg-gray-50 rounded-lg">
              <p className="whitespace-pre-wrap">{lesson.content}</p>
            </div>
          )}
        </div>
      );
    }

    if (lesson.type === 'audio') {
      return (
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-full">
                  <Headphones className="h-8 w-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-slate-800">Audio Lesson</h4>
                  <p className="text-sm text-slate-600">Duration: {lesson.duration}</p>
                </div>
                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
              </div>
              
              {lesson.audioUrl && (
                <audio controls className="w-full mt-4">
                  <source src={lesson.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
            </CardContent>
          </Card>
          
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Audio Transcript:</h4>
            {lesson.content && (
              <Button
                onClick={openImmersiveReader}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                Read Transcript
              </Button>
            )}
          </div>
          
          {isEditing ? (
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="min-h-[300px]"
              placeholder="Enter audio transcript and notes..."
            />
          ) : (
            <div className="text-slate-700 p-4 bg-gray-50 rounded-lg">
              <p className="whitespace-pre-wrap">{lesson.content}</p>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  const getTypeIcon = () => {
    switch (lesson.type) {
      case 'text': return <FileText className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'audio': return <Volume2 className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = () => {
    switch (lesson.type) {
      case 'text': return 'bg-green-100 text-green-800';
      case 'video': return 'bg-blue-100 text-blue-800';
      case 'audio': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-6 animate-fade-in max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            {isEditing ? (
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="text-2xl font-bold border-none p-0 h-auto focus-visible:ring-0"
              />
            ) : (
              <h1 className="text-2xl font-bold">{lesson.title}</h1>
            )}
            <div className="flex items-center gap-2 mt-2">
              <Badge className={getTypeColor()}>
                {getTypeIcon()}
                <span className="ml-1 capitalize">{lesson.type}</span>
              </Badge>
              {lesson.duration && (
                <Badge variant="outline">
                  {lesson.duration}
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button onClick={handleSave} size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          {renderContent()}
        </CardContent>
      </Card>

      <ImmersiveReader
        content={lesson.content}
        isOpen={showImmersiveReader}
        onClose={() => setShowImmersiveReader(false)}
        title={lesson.title}
      />
    </div>
  );
};

export default LessonContent;