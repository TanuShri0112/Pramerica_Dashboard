import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Mic, MicOff, Image as ImageIcon, Video as VideoIcon, FileText, File as FileIcon } from 'lucide-react';

export const CreatePostDialog = ({ open, onOpenChange, type, onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [activeTab, setActiveTab] = useState('text');
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newPost = {
        id: Date.now(),
        title: title || `${type === 'post' ? 'New Post' : 'Important Announcement'}`,
        content: content || (selectedFiles.length > 0 ? 'Shared media files' : 'Voice note shared'),
        author: "Current User",
        date: new Date().toISOString().split('T')[0],
        comments: 0,
        likes: 0,
        shares: 0,
        type,
        important: type === 'announcement',
        files: selectedFiles.map(file => ({
          name: file.name,
          type: file.type,
          size: file.size,
          url: URL.createObjectURL(file) // For preview purposes
        })),
        hasVoiceNote: isRecording || activeTab === 'voice'
      };

      onPostCreated(newPost);
      
      toast({
        title: `${type === 'post' ? 'Post' : 'Announcement'} created!`,
        description: `Your ${type} has been published successfully.`,
        duration: 3000,
      });
      
      // Reset form
      setTitle('');
      setContent('');
      setSelectedFiles([]);
      setActiveTab('text');
      setIsRecording(false);
      onOpenChange(false);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleFileSelect = (e, fileType) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(prevFiles => [...prevFiles, ...files]);
      
      toast({
        title: "Files selected",
        description: `${files.length} file(s) added to your ${type}`,
        duration: 2000,
      });
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast({
        title: "Recording started",
        description: "Speak now to record your voice note",
        duration: 2000,
      });
    } else {
      toast({
        title: "Recording stopped",
        description: "Voice note saved successfully",
        duration: 2000,
      });
    }
  };

  const removeFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return <ImageIcon className="h-4 w-4" />;
    if (fileType.startsWith('video/')) return <VideoIcon className="h-4 w-4" />;
    if (fileType.startsWith('audio/')) return <Mic className="h-4 w-4" />;
    return <FileIcon className="h-4 w-4" />;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Create {type === 'post' ? 'Post' : 'Announcement'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title (Optional)</Label>
            <Input
              id="title"
              placeholder={`Add a title to your ${type}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-base"
            />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 h-12">
              <TabsTrigger value="text" className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Text</span>
              </TabsTrigger>
              <TabsTrigger value="image" className="flex items-center gap-2 text-sm">
                <ImageIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Image</span>
              </TabsTrigger>
              <TabsTrigger value="video" className="flex items-center gap-2 text-sm">
                <VideoIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Video</span>
              </TabsTrigger>
              <TabsTrigger value="voice" className="flex items-center gap-2 text-sm">
                <Mic className="h-4 w-4" />
                <span className="hidden sm:inline">Voice</span>
              </TabsTrigger>
              <TabsTrigger value="files" className="flex items-center gap-2 text-sm">
                <Upload className="h-4 w-4" />
                <span className="hidden sm:inline">Files</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="What's on your mind? Share your thoughts with the group..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[200px] text-base resize-none"
                  required
                />
              </div>
            </TabsContent>

            <TabsContent value="image" className="space-y-4 mt-6">
              <div className="space-y-4">
                <Label>Upload Images</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/40 transition-colors">
                  <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-base text-muted-foreground mb-4">Click to upload or drag and drop images</p>
                  <p className="text-sm text-muted-foreground mb-4">Supports: JPG, PNG, GIF, WebP</p>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileSelect(e, 'image')}
                    className="hidden"
                    id="image-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('image-upload')?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Images
                  </Button>
                </div>
                <Textarea
                  placeholder="Add a caption for your images..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[120px] text-base"
                />
              </div>
            </TabsContent>

            <TabsContent value="video" className="space-y-4 mt-6">
              <div className="space-y-4">
                <Label>Upload Video</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/40 transition-colors">
                  <VideoIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-base text-muted-foreground mb-4">Click to upload video files</p>
                  <p className="text-sm text-muted-foreground mb-4">Supports: MP4, WebM, AVI, MOV</p>
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleFileSelect(e, 'video')}
                    className="hidden"
                    id="video-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('video-upload')?.click()}
                  >
                    <VideoIcon className="h-4 w-4 mr-2" />
                    Choose Video
                  </Button>
                </div>
                <Textarea
                  placeholder="Add a description for your video..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[120px] text-base"
                />
              </div>
            </TabsContent>

            <TabsContent value="voice" className="space-y-4 mt-6">
              <div className="space-y-6">
                <div className="text-center p-8 border rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                  <Button
                    type="button"
                    variant={isRecording ? "destructive" : "default"}
                    size="lg"
                    onClick={toggleRecording}
                    className="rounded-full w-20 h-20 mb-4"
                  >
                    {isRecording ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
                  </Button>
                  <p className="text-base font-medium mb-2">
                    {isRecording ? "Recording in progress..." : "Voice Note"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {isRecording ? "Click to stop recording" : "Click to start recording your voice note"}
                  </p>
                  {isRecording && (
                    <div className="mt-4 flex items-center justify-center">
                      <div className="animate-pulse flex space-x-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      </div>
                    </div>
                  )}
                </div>
                <Textarea
                  placeholder="Add additional text to your voice note..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[120px] text-base"
                />
              </div>
            </TabsContent>

            <TabsContent value="files" className="space-y-4 mt-6">
              <div className="space-y-4">
                <Label>Upload Documents & Files</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/40 transition-colors">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-base text-muted-foreground mb-4">Upload any type of file</p>
                  <p className="text-sm text-muted-foreground mb-4">Documents, PDFs, spreadsheets, presentations, etc.</p>
                  <Input
                    type="file"
                    multiple
                    onChange={(e) => handleFileSelect(e, 'file')}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Files
                  </Button>
                </div>
                {selectedFiles.length > 0 && (
                  <div className="space-y-2">
                    <Label>Selected Files</Label>
                    <div className="border rounded-md divide-y">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3">
                          <div className="flex items-center space-x-3">
                            {getFileIcon(file.type)}
                            <span className="text-sm font-medium truncate max-w-[200px]">{file.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {(file.size / 1024).toFixed(1)} KB
                            </span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="text-destructive hover:text-destructive"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <Textarea
                  placeholder="Add a description for your files..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[120px] text-base"
                />
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setTitle('');
                setContent('');
                setSelectedFiles([]);
                onOpenChange(false);
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || (!content.trim() && selectedFiles.length === 0 && !isRecording && activeTab !== 'voice')}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {isSubmitting ? 'Publishing...' : 'Publish'}
                </>
              ) : (
                `Publish ${type === 'post' ? 'Post' : 'Announcement'}`
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};