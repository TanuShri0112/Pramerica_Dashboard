import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  AlertCircle, 
  Clock, 
  MessageSquare, 
  Heart, 
  Play,
  Mic,
  MicOff,
  Image as ImageIcon,
  Video as VideoIcon,
  Send,
  Upload,
  File as FileIcon,
  Download
} from 'lucide-react';

export const PostCard = ({ post, onUpdatePost }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentFiles, setCommentFiles] = useState([]);
  const [isRecordingComment, setIsRecordingComment] = useState(false);
  const { toast } = useToast();

  const handleLike = () => {
    const newLiked = !isLiked;
    setIsLiked(newLiked);
    const newLikes = newLiked ? post.likes + 1 : post.likes - 1;
    onUpdatePost(post.id, { likes: newLikes });
    
    toast({
      title: newLiked ? "Post liked!" : "Like removed",
      duration: 1500,
    });
  };

  const handleComment = () => {
    if (commentText.trim() || commentFiles.length > 0 || isRecordingComment) {
      const newComments = post.comments + 1;
      onUpdatePost(post.id, { comments: newComments });
      
      toast({
        title: "Comment posted!",
        description: "Your comment has been added to the discussion.",
        duration: 2000,
      });
      
      setCommentText('');
      setCommentFiles([]);
      setIsRecordingComment(false);
    }
  };

  const handleCommentFileSelect = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setCommentFiles(prev => [...prev, ...newFiles]);
      toast({
        title: "Files attached",
        description: `${newFiles.length} file(s) added to comment`,
        duration: 1500,
      });
    }
  };

  const toggleCommentRecording = () => {
    setIsRecordingComment(!isRecordingComment);
    toast({
      title: isRecordingComment ? "Recording stopped" : "Recording started",
      description: isRecordingComment ? "Voice note saved" : "Speak now to record",
      duration: 1500,
    });
  };

  const removeCommentFile = (index) => {
    setCommentFiles(prev => prev.filter((_, i) => i !== index));
  };

  const renderFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return <ImageIcon className="h-4 w-4" />;
    if (fileType.startsWith('video/')) return <VideoIcon className="h-4 w-4" />;
    if (fileType.startsWith('audio/')) return <Mic className="h-4 w-4" />;
    return <FileIcon className="h-4 w-4" />;
  };

  const renderMediaPreview = (file) => {
    if (file.type.startsWith('image/') && file.url) {
      return (
        <div className="relative group">
          <img 
            src={file.url} 
            alt={file.name} 
            className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity text-white">
              <ImageIcon className="h-4 w-4 mr-2" />
              View Full Size
            </Button>
          </div>
        </div>
      );
    }
    
    if (file.type.startsWith('video/') && file.url) {
      return (
        <div className="relative">
          <video 
            src={file.url} 
            className="w-full h-48 object-cover rounded-lg"
            controls
            poster="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMiA4TDE4IDE0TDYgMTRMMTIgOFoiIGZpbGw9IiM2NTY1NjUiLz4KPC9zdmc+"
          />
        </div>
      );
    }
    
    return null;
  };

  return (
    <Card className={`transition-all duration-300 hover:shadow-lg ${post.important ? "border-orange-200 bg-orange-50/50" : "hover:border-primary/20"}`}>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              {post.important && (
                <AlertCircle className="h-5 w-5 text-orange-500" />
              )}
              {post.title}
              {post.type === 'announcement' && (
                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-normal">
                  Announcement
                </span>
              )}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
              <span className="font-medium">{post.author}</span>
              <span>•</span>
              <div className="flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1" />
                {new Date(post.date).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {post.content && (
          <p className="text-base leading-relaxed text-foreground">{post.content}</p>
        )}
        
        {/* Voice Note */}
        {post.hasVoiceNote && (
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="bg-blue-500 p-2 rounded-full">
              <Mic className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-700">Voice Note</p>
              <p className="text-xs text-blue-600">Click to play the audio message</p>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
              <Play className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        {/* File Attachments */}
        {post.files && post.files.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Attachments ({post.files.length})</h4>
            
            {/* Media previews */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {post.files.filter(file => file.type.startsWith('image/') || file.type.startsWith('video/')).map((file, index) => (
                <div key={index}>
                  {renderMediaPreview(file)}
                </div>
              ))}
            </div>
            
            {/* Other files list */}
            {post.files.filter(file => !file.type.startsWith('image/') && !file.type.startsWith('video/')).length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {post.files.filter(file => !file.type.startsWith('image/') && !file.type.startsWith('video/')).map((file, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                    {renderFileIcon(file.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-4 flex flex-col space-y-4">
        {/* Only show interaction for regular posts, not announcements */}
        {post.type === 'post' && (
          <>
            {/* Action Buttons with counts */}
            <div className="flex items-center justify-between w-full">
              <div className="flex gap-2">
                <Button
                  variant={isLiked ? "default" : "ghost"}
                  size="sm"
                  onClick={handleLike}
                  className="flex items-center gap-2 transition-all"
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-current text-red-500' : ''}`} />
                  <span className="hidden sm:inline">Like</span>
                  <span className="text-xs">{post.likes}</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowComments(!showComments)}
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">Comment</span>
                  <span className="text-xs">{post.comments}</span>
                </Button>
              </div>
            </div>
            
            {/* Comments Section */}
            {showComments && (
              <div className="w-full space-y-4 pt-4 border-t">
                <h4 className="font-semibold text-base">Comments</h4>
                
                {/* Sample existing comments */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-sm">John Doe</span>
                      <span className="text-xs text-muted-foreground">2 hours ago</span>
                    </div>
                    <p className="text-sm">Great post! Very informative and helpful.</p>
                  </div>
                </div>
                
                {/* Comment Input */}
                <div className="space-y-3">
                  <Textarea
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="min-h-[100px] resize-none"
                  />
                  
                  {/* Comment Attachments */}
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="file"
                      multiple
                      accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                      onChange={handleCommentFileSelect}
                      className="hidden"
                      id={`comment-files-${post.id}`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => document.getElementById(`comment-files-${post.id}`)?.click()}
                    >
                      <Upload className="h-4 w-4 mr-1" />
                      Attach
                    </Button>
                    
                    <Button
                      type="button"
                      variant={isRecordingComment ? "destructive" : "ghost"}
                      size="sm"
                      onClick={toggleCommentRecording}
                    >
                      {isRecordingComment ? <MicOff className="h-4 w-4 mr-1" /> : <Mic className="h-4 w-4 mr-1" />}
                      {isRecordingComment ? 'Stop' : 'Voice'}
                    </Button>
                    
                    <Button
                      size="sm"
                      onClick={handleComment}
                      disabled={!commentText.trim() && commentFiles.length === 0 && !isRecordingComment}
                      className="ml-auto"
                    >
                      <Send className="h-4 w-4 mr-1" />
                      Post Comment
                    </Button>
                  </div>
                  
                  {/* Selected Files for Comment */}
                  {commentFiles.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Attached files:</p>
                      <div className="flex flex-wrap gap-2">
                        {commentFiles.map((file, index) => (
                          <div key={index} className="flex items-center gap-2 bg-muted p-2 rounded text-xs">
                            {renderFileIcon(file.type)}
                            <span className="truncate max-w-24">{file.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeCommentFile(index)}
                              className="h-4 w-4 p-0 text-destructive"
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {isRecordingComment && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <div className="animate-pulse w-2 h-2 bg-red-500 rounded-full"></div>
                      Recording voice note for comment...
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
};