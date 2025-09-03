import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CreatePostDialog } from '@/components/groups/CreatePostDialog';
import { PostCard } from '@/components/groups/PostCard';
import { useToast } from '@/hooks/use-toast';

const GroupNewsPage = () => {
  const { toast } = useToast();
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [createAnnouncementOpen, setCreateAnnouncementOpen] = useState(false);
  
  // Sample news data with enhanced structure
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Weekly Update",
      content: "This week we'll be focusing on improving our collaboration skills and reviewing the latest project proposals.",
      author: "John Doe",
      date: "2025-05-20",
      comments: 5,
      likes: 12,
      shares: 3,
      type: "post"
    },
    {
      id: 2,
      title: "Important Announcement",
      content: "Please remember to submit your quarterly reports by Friday. The management team will review them next week.",
      author: "Jane Smith",
      date: "2025-05-19",
      comments: 3,
      likes: 8,
      shares: 1,
      important: true,
      type: "announcement"
    }
  ]);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleUpdatePost = (postId, updates) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, ...updates } : post
    ));
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">News Feed</h1>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <Button 
          onClick={() => setCreatePostOpen(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Post
        </Button>
        <Button 
          onClick={() => setCreateAnnouncementOpen(true)}
          variant="outline"
          className="border-orange-300 text-orange-600 hover:bg-orange-50"
        >
          Announcement
        </Button>
      </div>

      {/* Posts List */}
      {posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard 
              key={post.id} 
              post={post} 
              onUpdatePost={handleUpdatePost}
            />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-muted-foreground">
          <p className="text-lg">No posts yet</p>
          <p className="text-sm">Be the first to share something with the group!</p>
        </div>
      )}

      {/* Create Post Dialog */}
      <CreatePostDialog
        open={createPostOpen}
        onOpenChange={setCreatePostOpen}
        type="post"
        onPostCreated={handlePostCreated}
      />

      {/* Create Announcement Dialog */}
      <CreatePostDialog
        open={createAnnouncementOpen}
        onOpenChange={setCreateAnnouncementOpen}
        type="announcement"
        onPostCreated={handlePostCreated}
      />
    </div>
  );
};

export default GroupNewsPage;