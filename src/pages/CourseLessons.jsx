import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronUp, User, Plus, Edit, Trash2, FileText, Video, Volume2, Play, ArrowLeft } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const CourseLessons = () => {
  const { courseId, moduleId, unitId } = useParams();
  const navigate = useNavigate();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [newLesson, setNewLesson] = useState({
    title: '',
    description: '',
    type: 'text',
    content: '',
    duration: '',
    instructor: 'John Doe'
  });
  
  // Mock data for lessons with different content types
  const [lessons, setLessons] = useState([
    { 
      id: 'lesson-1', 
      title: 'Introduction to Business Trust Fundamentals',
      description: 'Comprehensive overview of business trust concepts and their applications in modern commerce.',
      date: 'May 20, 2026',
      type: 'text',
      duration: '15 min',
      instructor: { name: 'Mehra, Akshat', avatar: '/placeholder.svg' }
    },
    { 
      id: 'lesson-2', 
      title: 'Business Trust Video Tutorial',
      description: 'Visual explanation of how business trusts operate in real-world scenarios.',
      date: 'May 22 - May 22, 2026',
      type: 'video',
      duration: '25 min',
      instructor: { name: 'Kumar Singh, Ajay', avatar: '/placeholder.svg' }
    },
    { 
      id: 'lesson-3', 
      title: 'Legal Framework Audio Lecture',
      description: 'Audio lecture covering the legal aspects and regulatory framework of business trusts.',
      date: 'May 22 - May 22, 2026',
      type: 'audio',
      duration: '30 min',
      instructor: { name: 'Dr. Sarah Wilson', avatar: '/placeholder.svg' }
    },
    { 
      id: 'lesson-4', 
      title: 'Case Studies in Business Trust Implementation',
      description: 'Real-world examples and case studies of successful business trust implementations.',
      date: 'May 22 - May 22, 2026',
      type: 'text',
      duration: '20 min',
      instructor: { name: 'Kumar Singh, Ajay', avatar: '/placeholder.svg' }
    }
  ]);
  
  // Get unit title
  const getUnitTitle = (id) => {
    const unitMap = {
      'unit-1': 'Introduction to Business Trust'
    };
    
    return unitMap[id] || 'Unit';
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'text': return <FileText className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'audio': return <Volume2 className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'text': return 'bg-green-100 text-green-800';
      case 'video': return 'bg-blue-100 text-blue-800';
      case 'audio': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddLesson = () => {
    const lesson = {
      id: `lesson-${Date.now()}`,
      title: newLesson.title,
      description: newLesson.description,
      type: newLesson.type,
      duration: newLesson.duration,
      date: new Date().toLocaleDateString(),
      instructor: { name: newLesson.instructor, avatar: '/placeholder.svg' }
    };
    
    setLessons([...lessons, lesson]);
    setNewLesson({
      title: '',
      description: '',
      type: 'text',
      content: '',
      duration: '',
      instructor: 'John Doe'
    });
    setIsAddDialogOpen(false);
    toast({
      title: "Lesson Added",
      description: "New lesson has been created successfully.",
    });
  };

  const handleEditLesson = (lesson) => {
    setEditingLesson(lesson);
    setNewLesson({
      title: lesson.title,
      description: lesson.description,
      type: lesson.type,
      content: '',
      duration: lesson.duration,
      instructor: lesson.instructor.name
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateLesson = () => {
    setLessons(lessons.map(lesson => 
      lesson.id === editingLesson.id 
        ? {
            ...lesson,
            title: newLesson.title,
            description: newLesson.description,
            instructor: { ...lesson.instructor, name: newLesson.instructor }
          }
        : lesson
    ));
    setIsEditDialogOpen(false);
    setEditingLesson(null);
    toast({
      title: "Lesson Updated",
      description: "Lesson has been updated successfully.",
    });
  };

  const handleDeleteLesson = (lessonId) => {
    if (window.confirm('Are you sure you want to delete this lesson?')) {
      setLessons(lessons.filter(lesson => lesson.id !== lessonId));
      toast({
        title: "Lesson Deleted",
        description: "Lesson has been deleted successfully.",
      });
    }
  };

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main content area */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => navigate(-1)} 
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <h1 className="text-2xl font-bold">Unit Lessons</h1>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Lesson
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {lessons.map((lesson) => (
              <Card 
                key={lesson.id}
                className="overflow-hidden hover:shadow-md transition-shadow group"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getTypeColor(lesson.type)}>
                          {getTypeIcon(lesson.type)}
                          <span className="ml-1 capitalize">{lesson.type}</span>
                        </Badge>
                        <Badge variant="outline">{lesson.duration}</Badge>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 cursor-pointer hover:text-blue-600" 
                          onClick={() => navigate(`/catalog/${courseId}/${moduleId}/${unitId}/${lesson.id}`)}>
                        {lesson.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">{lesson.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="outline" onClick={() => handleEditLesson(lesson)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDeleteLesson(lesson.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      When: {lesson.date}
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage src={lesson.instructor.avatar} alt={lesson.instructor.name} />
                          <AvatarFallback>{lesson.instructor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{lesson.instructor.name}</span>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => navigate(`/catalog/${courseId}/${moduleId}/${unitId}/${lesson.id}`)}
                        className="ml-4"
                      >
                        <Play className="h-3 w-3 mr-1" />
                        Start
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="w-full lg:w-80 bg-white p-6 rounded-lg border">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              className="flex items-center mb-4 text-lg font-semibold w-full justify-start" 
              onClick={() => navigate(`/courses/modules/${moduleId}/units`)}
            >
              <ChevronUp className="mr-2 h-5 w-5" />
              {getUnitTitle(unitId || '')}
            </Button>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <div className="bg-white border rounded-md px-4 py-2 flex items-center justify-between">
                  <span>{getUnitTitle(unitId || '')}</span>
                  <ChevronUp className="h-4 w-4" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Content Type</label>
                <div className="bg-white border rounded-md px-4 py-2 flex items-center justify-between">
                  <span>All Types</span>
                  <ChevronUp className="h-4 w-4" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Instructor</label>
                <div className="bg-white border rounded-md px-4 py-2 flex items-center justify-between">
                  <span>All</span>
                  <ChevronUp className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Lesson Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Lesson</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Lesson Title</Label>
              <Input
                id="title"
                value={newLesson.title}
                onChange={(e) => setNewLesson(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter lesson title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newLesson.description}
                onChange={(e) => setNewLesson(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter lesson description"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Content Type</Label>
              <Select value={newLesson.type} onValueChange={(value) => setNewLesson(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={newLesson.duration}
                onChange={(e) => setNewLesson(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="e.g., 15 min"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddLesson} disabled={!newLesson.title.trim()}>
              Add Lesson
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Lesson Dialog - SIMPLIFIED */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Lesson</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="editTitle">Lesson Title</Label>
              <Input
                id="editTitle"
                value={newLesson.title}
                onChange={(e) => setNewLesson(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter lesson title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editDescription">Description</Label>
              <Textarea
                id="editDescription"
                value={newLesson.description}
                onChange={(e) => setNewLesson(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter lesson description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateLesson} disabled={!newLesson.title.trim()}>
              Update Lesson
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseLessons;