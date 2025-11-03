import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import AddModuleDialog from './AddModuleDialog';
import ModuleCard from './ModuleCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EditModuleDialog from './EditModuleDialog';

const CourseModules = () => {
  console.log('Rendering CourseModules');
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const courseType = searchParams.get('type') || 'open';
  
  const [modules, setModules] = useState([]);
  const [isAddModuleDialogOpen, setIsAddModuleDialogOpen] = useState(false);
  const [isPublishedCourse, setIsPublishedCourse] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [moduleToEdit, setModuleToEdit] = useState(null);

  // Load modules data based on courseId
  useEffect(() => {
    const loadModulesData = () => {
      setLoading(true);
      
      const publishedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
      const publishedCourse = publishedCourses.find(course => course.id === courseId);
      
      if (publishedCourse) {
        setIsPublishedCourse(true);
        
        if (publishedCourse.modules && publishedCourse.modules.length > 0) {
          const imageMap = {
            'Module 1: K-12 Curriculum Overview for Grades 2 & 3': 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            'Module 2: Grade 2 & 3 Teaching Methodologies': 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            'Module 3: Assessment & Learning Outcomes': 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            'Module 1: Grade 5 Curriculum Foundations': 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            'Module 2: Subject Integration & Cross-curricular Learning': 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            'Module 3: Grade 5 Performance Standards': 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            'Module 1: Grade 8 K-12 Curriculum Framework': 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            'Module 2: Advanced Teaching Strategies for Grade 8': 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            'Module 3: Grade 8 Learner Assessment System': 'https://aiiteducation.com/assets_web1/img/courses.jpg'
          };
          const courseModules = publishedCourse.modules.map((module, index) => ({
            id: module.id,
            title: module.title,
            description: module.description,
            units: module.units?.length || 0,
            assessments: module.assessments?.length || 0,
            duration: module.duration || `${Math.max(1, (module.units?.length || 0) + (module.assessments?.length || 0))} hours`,
            completed: false,
            locked: courseType === 'sequential' && index > 0,
            image: module.image || imageMap[module.title]
          }));
          setModules(courseModules);
        } else {
          setModules([]);
        }
      } else {
        setIsPublishedCourse(false);
        // Course-specific modules based on courseId
        const getCourseModules = (courseId) => {
          const courseModules = {
            '1': [ // K-12 Grades 2 & 3 Training
              {
                id: 1,
                title: "Module 1: K-12 Curriculum Overview for Grades 2 & 3",
                description: "Introduction to revised K-12 curriculum framework and learning standards",
                units: 6,
                assessments: 1,
                duration: "3 hours",
                completed: false,
                locked: false,
              },
              {
                id: 2,
                title: "Module 2: Grade 2 & 3 Teaching Methodologies",
                description: "Effective instructional strategies and classroom management techniques",
                units: 8,
                assessments: 2,
                duration: "4 hours",
                completed: false,
                locked: courseType === 'sequential',
              },
              {
                id: 3,
                title: "Module 3: Assessment & Learning Outcomes",
                description: "Implementing assessment frameworks and measuring student progress",
                units: 7,
                assessments: 2,
                duration: "3.5 hours",
                completed: false,
                locked: courseType === 'sequential',
              }
            ],
            '2': [ // Grade 5 Training
              {
                id: 1,
                title: "Module 1: Grade 5 Curriculum Foundations",
                description: "Core competencies and learning standards for intermediate level",
                units: 7,
                assessments: 2,
                duration: "3.5 hours",
                completed: false,
                locked: false,
              },
              {
                id: 2,
                title: "Module 2: Subject Integration & Cross-curricular Learning",
                description: "Integrated teaching approaches for Grade 5 subjects",
                units: 9,
                assessments: 3,
                duration: "5 hours",
                completed: false,
                locked: courseType === 'sequential',
              },
              {
                id: 3,
                title: "Module 3: Grade 5 Performance Standards",
                description: "Evaluating student performance and continuous improvement strategies",
                units: 6,
                assessments: 2,
                duration: "4 hours",
                completed: false,
                locked: courseType === 'sequential',
              }
            ],
            '3': [ // Grade 8 Training
              {
                id: 1,
                title: "Module 1: Grade 8 K-12 Curriculum Framework",
                description: "Junior high school curriculum structure and learning competencies",
                units: 8,
                assessments: 2,
                duration: "4 hours",
                completed: false,
                locked: false,
              },
              {
                id: 2,
                title: "Module 2: Advanced Teaching Strategies for Grade 8",
                description: "Student-centered learning and 21st-century skills integration",
                units: 9,
                assessments: 3,
                duration: "5 hours",
                completed: false,
                locked: courseType === 'sequential',
              },
              {
                id: 3,
                title: "Module 3: Grade 8 Learner Assessment System",
                description: "Comprehensive assessment tools and performance evaluation",
                units: 7,
                assessments: 2,
                duration: "4.5 hours",
                completed: false,
                locked: courseType === 'sequential',
              }
            ]
          };
          
          return courseModules[courseId] || courseModules['1']; // Default to Grades 2 & 3
        };
        
        const defaultModules = getCourseModules(courseId).map((m) => {
          const titleToImage = {
            'Module 1: K-12 Curriculum Overview for Grades 2 & 3': 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            'Module 2: Grade 2 & 3 Teaching Methodologies': 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            'Module 3: Assessment & Learning Outcomes': 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            'Module 1: Grade 5 Curriculum Foundations': 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            'Module 2: Subject Integration & Cross-curricular Learning': 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            'Module 3: Grade 5 Performance Standards': 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            'Module 1: Grade 8 K-12 Curriculum Framework': 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            'Module 2: Advanced Teaching Strategies for Grade 8': 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            'Module 3: Grade 8 Learner Assessment System': 'https://aiiteducation.com/assets_web1/img/courses.jpg'
          };
          return { ...m, image: titleToImage[m.title] };
        });
        setModules(defaultModules);
      }
      
      setLoading(false);
    };

    loadModulesData();
  }, [courseId, courseType]);

  useEffect(() => {
    if (isPublishedCourse) {
      const publishedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
      const courseIndex = publishedCourses.findIndex(course => course.id === courseId);
      if (courseIndex !== -1) {
        publishedCourses[courseIndex].modules = modules;
        localStorage.setItem('courses', JSON.stringify(publishedCourses));
      }
    }
  }, [modules, isPublishedCourse, courseId]);

  const handleAddModule = useCallback(() => {
    setIsAddModuleDialogOpen(true);
  }, []);

  const handleModuleAdd = useCallback((newModule) => {
    setModules(prev => [...prev, newModule]);
  }, []);

  const handleModuleDelete = useCallback((moduleId) => {
    setModules(prev => prev.filter(module => module.id !== moduleId));
  }, []);

  const handleModuleUpdate = useCallback((updatedModule) => {
    setModules(prev => prev.map(module => 
      module.id === updatedModule.id ? { ...module, ...updatedModule } : module
    ));
  }, []);

  const handleModuleComplete = useCallback((moduleId) => {
    setModules(prev => prev.map((module, index) => {
      if (module.id === moduleId) {
        const nextModule = prev[index + 1];
        const updatedModules = [...prev];
        updatedModules[index] = { ...module, completed: true };
        if (nextModule && courseType === 'sequential') {
          updatedModules[index + 1] = { ...nextModule, locked: false };
        }
        return updatedModules[index];
      }
      return module;
    }));
    toast.success('Module completed! Next module unlocked.');
  }, [courseType]);

  const handleEditModule = useCallback((module) => {
    setModuleToEdit(module);
    setIsEditDialogOpen(true);
  }, []);

  if (loading) {
    return (
      <div className="p-6 animate-fade-in">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2">Loading modules...</span>
        </div>
      </div>
    );
  }

  if (isPublishedCourse && modules.length === 0) {
    return (
      <div className="p-6 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => navigate('/courses')} 
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Courses
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Course Modules</h1>
              <p className="text-gray-600">No modules found for this course</p>
            </div>
          </div>
          <Button onClick={handleAddModule} className="bg-ca-primary hover:bg-ca-secondary">
            <Plus className="h-4 w-4 mr-2" />
            Add Module
          </Button>
        </div>

        <Card className="max-w-md mx-auto mt-8">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 bg-gray-100 rounded-full p-6 w-20 h-20 flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-gray-400" />
            </div>
            <CardTitle className="text-xl">No Modules Found</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">
              This course doesn't have any modules yet. Create your first module to get started.
            </p>
            <Button onClick={handleAddModule} className="w-full bg-ca-primary hover:bg-ca-secondary">
              <Plus className="h-4 w-4 mr-2" />
              Create First Module
            </Button>
          </CardContent>
        </Card>

        <AddModuleDialog
          open={isAddModuleDialogOpen}
          onOpenChange={setIsAddModuleDialogOpen}
          onModuleAdd={handleModuleAdd}
        />
      </div>
    );
  }

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button 
            onClick={() => navigate('/courses')} 
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Course Modules</h1>
            <p className="text-gray-600">
              {courseType === 'sequential' 
                ? 'Complete modules in order to unlock the next one' 
                : 'Access modules in any order'}
              {isPublishedCourse && ' • Published Course'}
            </p>
          </div>
        </div>
        <Button onClick={handleAddModule} className="bg-ca-primary hover:bg-ca-secondary">
          <Plus className="h-4 w-4 mr-2" />
          Add Module
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            courseId={courseId}
            onDelete={handleModuleDelete}
            onUpdate={handleModuleUpdate}
            onComplete={handleModuleComplete}
            courseType={courseType}
            onEdit={handleEditModule}
          />
        ))}
      </div>

      <AddModuleDialog
        open={isAddModuleDialogOpen}
        onOpenChange={setIsAddModuleDialogOpen}
        onModuleAdd={handleModuleAdd}
      />

      {moduleToEdit && (
        <EditModuleDialog
          open={isEditDialogOpen}
          onOpenChange={(open) => {
            setIsEditDialogOpen(open);
            if (!open) setModuleToEdit(null);
          }}
          module={moduleToEdit}
          onUpdate={handleModuleUpdate}
        />
      )}
    </div>
  );
};

export default CourseModules;