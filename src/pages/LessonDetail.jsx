import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const LessonDetail = () => {
  const { courseId, moduleId, unitId, lessonId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('about');
  
  // Lesson data (could come from an API in a real application)
  const lesson = {
    id: 'lesson-1',
    title: 'LESSON 1: IS THERE REALLY A REMEDY? (PPT)',
    description: 'Detailed exploration of topic 6.1: IS THERE REALLY A REMEDY?.',
    content: 'Understand and apply knowledge of IS THERE REALLY A REMEDY?.',
    date: 'May 20, 2026',
    timezone: 'Pacific Time (US & Canada)',
    style: 'Blended',
    moduleCount: 1,
    category: 'UNIT 1',
    instructor: {
      name: 'Akshat Mehra',
      avatar: '/placeholder.svg'
    },
    modules: [
      {
        id: 'content-1',
        title: '1. IS THERE REALLY A REMEDY? (PPT)',
        type: 'ppt'
      }
    ]
  };
  
  // Access requirements
  const accessRequired = false;
  
  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="bg-blue-500 text-white p-6 rounded-md mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-6">
            <img 
              src="/placeholder.svg" 
              alt={lesson.title}
              className="w-40 h-40 object-cover rounded-md" 
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">{lesson.title}</h1>
            <Button variant="outline" className="text-white border-white hover:bg-blue-600">
              Course
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Main content area */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Avatar className="h-12 w-12 mr-3">
                <AvatarImage src={lesson.instructor.avatar} alt={lesson.instructor.name} />
                <AvatarFallback>{lesson.instructor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-lg">{lesson.instructor.name}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-gray-100 px-4 py-2 rounded-md">
                No access code required
              </div>
              <Button className="bg-blue-500 hover:bg-blue-600">
                Enroll
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="about" className="mb-6" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="about" className={activeTab === 'about' ? 'bg-blue-500 text-white' : ''}>About</TabsTrigger>
              <TabsTrigger value="modules" className={activeTab === 'modules' ? 'bg-blue-500 text-white' : ''}>Modules</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about">
              <div className="space-y-4 mt-4">
                <p>{lesson.description}</p>
                <p>{lesson.content}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="modules">
              <div className="mt-4">
                <h3 className="font-semibold mb-4">Here is the course outline:</h3>
                {lesson.modules.map((module) => (
                  <div key={module.id} className="border rounded-md p-4 mb-4">
                    <h4 className="font-medium mb-2">{module.title}</h4>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                      {module.type.toUpperCase()}
                    </div>
                  </div>
                ))}
                <div className="mt-4">
                  <p className="text-right text-gray-500">1 section</p>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <h3 className="font-semibold mb-2">Contact</h3>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar */}
        <div className="w-full md:w-80 lg:w-96 bg-white p-6 rounded-lg border">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              className="flex items-center mb-4 text-lg font-semibold w-full justify-start" 
              onClick={() => navigate(`/catalog/${courseId}/${moduleId}/${unitId}`)}
            >
              <ChevronUp className="mr-2 h-5 w-5" />
              UNIT 1
            </Button>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Info</h3>
              
              <div className="flex items-center text-sm mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>
                <span>{lesson.date}</span>
              </div>
              
              <div className="flex items-center text-sm mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.07" y2="4.93"/></svg>
                <span>Time zone: {lesson.timezone}</span>
              </div>
              
              <div className="flex items-center text-sm mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg>
                <span>Style: {lesson.style}</span>
              </div>
              
              <div className="flex items-center text-sm mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                <span>Modules: {lesson.moduleCount}</span>
              </div>
              
              <div className="flex items-center text-sm mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect width="14" height="14" x="5" y="5" rx="2"/><path d="M5 10h14"/><path d="M10 5v14"/></svg>
                <span>Category: <a href={`/catalog/${courseId}/${moduleId}/${unitId}`} className="text-blue-500">{lesson.category}</a></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetail;