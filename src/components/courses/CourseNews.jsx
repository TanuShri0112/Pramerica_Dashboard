import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCourseSidebar } from '@/contexts/CourseSidebarContext';
import { Plus, Rss, Send, X, BarChart2, Settings, Megaphone, Heart } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';

const CourseNews = () => {
  const { courseTitle } = useCourseSidebar();
  const [activeView, setActiveView] = useState('feed');
  const [postContent, setPostContent] = useState('');
  const [isSticky, setIsSticky] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Wiley Edwards",
      content: "on the module link, my tests are showing 100% and complete when I have not studied the material. Could you wipe it clean as to start over. Thank you.",
      timestamp: new Date(new Date().getTime() - 1000 * 60 * 60 * 2), // 2 hours ago
      liked: false
    },
    {
      id: 2,
      author: "Wiley Edwards",
      content: "My calendar is not populated with various webinars. Thank you.",
      timestamp: new Date(new Date().getTime() - 1000 * 60 * 60 * 2), // 2 hours ago
      liked: false
    }
  ]);

  const handlePostClick = () => {
    setActiveView('post');
  };

  const handleAnnouncementClick = () => {
    setActiveView('announcement');
  };

  const handleCancel = () => {
    setActiveView('feed');
    setPostContent('');
    setIsSticky(false);
  };

  const handleSend = () => {
    if (postContent.trim()) {
      const newPost = {
        id: posts.length + 1,
        author: "Demo Instructor",
        content: postContent,
        timestamp: new Date(),
        liked: false,
        avatar: "/lovable-Uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png"
      };
      setPosts([newPost, ...posts]);
      toast.success(`${activeView === 'post' ? 'Post' : 'Announcement'} created successfully!`);
      setActiveView('feed');
      setPostContent('');
      setIsSticky(false);
    } else {
      toast.error("Please write something before posting.");
    }
  };

  const handleSendAndNotify = () => {
    if (postContent.trim()) {
      const newPost = {
        id: posts.length + 1,
        author: "Demo Instructor",
        content: postContent,
        timestamp: new Date(),
        liked: false,
        avatar: "/lovable-Uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png"
      };
      setPosts([newPost, ...posts]);
      toast.success(`${activeView === 'post' ? 'Post' : 'Announcement'} created and notification sent!`);
      setActiveView('feed');
      setPostContent('');
      setIsSticky(false);
    } else {
      toast.error("Please write something before posting.");
    }
  };

  const toggleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, liked: !post.liked } : post
    ));
  };

  return (
    <div className="w-full animate-fade-in flex">
      <div className="space-y-6 flex-1 pr-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{activeView === 'feed' ? 'News' : activeView === 'post' ? 'Create Post' : 'Create Announcement'}</h1>
          {activeView === 'feed' && (
            <div className="flex items-center space-x-2">
              <Button onClick={handlePostClick} className="flex items-center gap-1 hover:scale-105 transition-transform bg-blue-500 hover:bg-blue-600">
                <Plus className="h-4 w-4" /> Post
              </Button>
              <Button variant="outline" onClick={handleAnnouncementClick} className="flex items-center gap-1 hover:scale-105 transition-transform">
                <Megaphone className="h-4 w-4" /> Announcement
              </Button>
              <Button variant="outline" onClick={() => toast.info("RSS Feeds coming soon")} className="flex items-center gap-1 hover:scale-105 transition-transform">
                <Rss className="h-4 w-4" /> Subscribe
              </Button>
            </div>
          )}
        </div>

        {activeView === 'feed' ? (
          <div className="space-y-6">
            {posts.length > 0 ? (
              posts.map(post => (
                <Card key={post.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={post.avatar} />
                      <AvatarFallback>{post.author.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{post.author}</h3>
                        <span className="text-xs text-gray-500">{formatDistanceToNow(post.timestamp)} ago</span>
                      </div>
                      <p className="mt-2">{post.content}</p>
                      <div className="mt-4 flex items-center">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => toggleLike(post.id)}
                          className={`flex items-center gap-1 ${post.liked ? 'text-red-500' : 'text-gray-500'}`}
                        >
                          <Heart className={`h-4 w-4 ${post.liked ? 'fill-current' : ''}`} />
                          {post.liked ? 'Liked' : 'Like'}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 border-t pt-4">
                    <Input placeholder="Write a comment..." className="w-full" />
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-6 text-center">
                <p className="text-gray-500">No posts yet. Create the first post!</p>
                <Button onClick={handlePostClick} className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Post
                </Button>
              </Card>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <Card className="shadow-sm hover:shadow-md transition-all">
              <div className="p-4">
                <Textarea 
                  placeholder={`Write your ${activeView === 'post' ? 'post' : 'announcement'} here...`}
                  className="min-h-[200px] resize-none border-none focus-visible:ring-0 text-lg"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                />
                
                <div className="flex items-center mt-4">
                  <Checkbox 
                    id="sticky" 
                    checked={isSticky}
                    onCheckedChange={(checked) => setIsSticky(checked)}
                    className="mr-2"
                  />
                  <label htmlFor="sticky" className="text-sm cursor-pointer">Sticky?</label>
                </div>
                
                <div className="flex mt-6 justify-between">
                  <div>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                        <polyline points="14 2 14 8 20 8"/>
                      </svg>
                      File
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleCancel} className="flex items-center gap-1">
                      <X className="h-4 w-4" /> Cancel
                    </Button>
                    <Button variant="outline" onClick={handleSendAndNotify} className="flex items-center gap-1">
                      <Send className="h-4 w-4" /> Send & Notify
                    </Button>
                    <Button onClick={handleSend} className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600">
                      <Send className="h-4 w-4" /> Send
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      <div className="w-64 border-l pl-4 hidden lg:block">
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="space-y-6 pr-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BarChart2 className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-semibold">Activity</h3>
              </div>
              <p className="text-sm text-gray-500">No recent activity</p>
            </div>

            <Separator />

            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Megaphone className="h-5 w-5 text-blue-500 mr-2" />
                  Announcements
                </h3>
              </div>
              
              <div className="space-y-3">
                <div className="text-sm border-l-2 border-blue-500 pl-2">
                  <p><a href="#" className="text-blue-500 hover:underline">Join Us LIVE on YouTube!</a></p>
                  <p className="text-xs text-gray-500">Every Tuesday at 2pm</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Settings className="h-5 w-5 text-blue-500 mr-2" />
                  Admin
                </h3>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">16</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Style: instructor</p>
                  <p className="text-sm text-gray-500">May 14, 2025 - May 21, 2025</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Catalog: 
                    <Button variant="link" size="sm" className="h-auto p-0 ml-1 text-blue-500 hover:underline">
                      page configure
                    </Button>
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Not published</p>
                  <Button variant="link" size="sm" className="h-auto p-0 text-blue-500 hover:underline">publish</Button>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">No access code required</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Active learners: 0</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Enrollment: open</p>
                  <Button variant="link" size="sm" className="h-auto p-0 text-blue-500 hover:underline">close</Button>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Unlocked</p>
                  <Button variant="link" size="sm" className="h-auto p-0 text-blue-500 hover:underline">lock</Button>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Creator:</p>
                  <Button variant="link" size="sm" className="h-auto p-0 text-blue-500 hover:underline">demo instructor</Button>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default CourseNews;