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
            'Module 1: Understanding Your Dreams': 'https://feedingonjesus.com/wp-content/uploads/2020/02/dream-journal.jpg',
            'Module 2: Foundations of Life Insurance': 'https://img-c.udemycdn.com/course/750x422/3001538_f89d_9.jpg',
            'Module 3: Building Your Protection Plan': 'https://img.etimg.com/thumb/height-360,width-480,imgsize-444020,msid-64589551/buying-insurance-with-a-home-loan-is-not-compulsory-should-you-still-get-it.jpg',
            'Module 1: Path to Financial Independence': 'https://wealthnation.io/wp-content/uploads/2023/09/financial-independence.webp',
            'Module 2: Investment Strategies': 'https://d32ijn7u0aqfv4.cloudfront.net/wp/wp-content/uploads/raw/financialcharts-investing-chalkboard-laptop_SOIN19142_1180273_st_1560x880.jpg',
            'Module 3: Retirement Planning': 'https://smartasset.com/wp-content/uploads/sites/2/2024/06/iStock-1887469204-modified-273b351e-da1d-4cc8-954d-3fbe9dfea2f6.jpg',
            'Module 1: Family Protection Basics': 'https://static.vecteezy.com/system/resources/previews/007/117/153/non_2x/happy-prosperous-family-in-flowers-mother-father-daughter-son-cuddling-together-near-family-protection-family-conflict-flat-modern-design-illustration-vector.jpg',
            'Module 2: Health Insurance Essentials': 'https://media.assettype.com/outlookmoney/2025-08-30/dky5i6oy/Health-Insurance-Essentials.png?w=640',
            'Module 3: Estate Planning': 'https://agamalaw.in/wp-content/uploads/2024/02/09df9b4c-33d0-47c3-a817-bede2f3bb96d.gif'
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
            '1': [ // Protecting Dreams Course
              {
                id: 1,
                title: "Module 1: Understanding Your Dreams",
                description: "Discover what financial security means for your family's future",
                units: 5,
                assessments: 1,
                duration: "2 hours",
                completed: false,
                locked: false,
              },
              {
                id: 2,
                title: "Module 2: Foundations of Life Insurance",
                description: "Understanding the basics and why protection matters",
                units: 8,
                assessments: 2,
                duration: "4 hours",
                completed: false,
                locked: courseType === 'sequential',
              },
              {
                id: 3,
                title: "Module 3: Building Your Protection Plan",
                description: "Creating a comprehensive strategy for your family's security",
                units: 6,
                assessments: 2,
                duration: "3 hours",
                completed: false,
                locked: courseType === 'sequential',
              }
            ],
            '2': [ // Financial Freedom Course
              {
                id: 1,
                title: "Module 1: Path to Financial Independence",
                description: "Understanding wealth building and financial planning",
                units: 7,
                assessments: 2,
                duration: "3 hours",
                completed: false,
                locked: false,
              },
              {
                id: 2,
                title: "Module 2: Investment Strategies",
                description: "Smart investment choices for long-term growth",
                units: 9,
                assessments: 3,
                duration: "5 hours",
                completed: false,
                locked: courseType === 'sequential',
              },
              {
                id: 3,
                title: "Module 3: Retirement Planning",
                description: "Securing your golden years with proper planning",
                units: 6,
                assessments: 2,
                duration: "4 hours",
                completed: false,
                locked: courseType === 'sequential',
              }
            ],
            '3': [ // Family Security Course
              {
                id: 1,
                title: "Module 1: Family Protection Basics",
                description: "Essential concepts for protecting your loved ones",
                units: 6,
                assessments: 1,
                duration: "2.5 hours",
                completed: false,
                locked: false,
              },
              {
                id: 2,
                title: "Module 2: Health Insurance Essentials",
                description: "Understanding health coverage and medical protection",
                units: 8,
                assessments: 2,
                duration: "4 hours",
                completed: false,
                locked: courseType === 'sequential',
              },
              {
                id: 3,
                title: "Module 3: Estate Planning",
                description: "Planning for the future and legacy protection",
                units: 7,
                assessments: 2,
                duration: "3.5 hours",
                completed: false,
                locked: courseType === 'sequential',
              }
            ]
          };
          
          return courseModules[courseId] || courseModules['1']; // Default to Protecting Dreams
        };
        
        const defaultModules = getCourseModules(courseId).map((m) => {
          const titleToImage = {
            'Module 1: Understanding Your Dreams': 'https://feedingonjesus.com/wp-content/uploads/2020/02/dream-journal.jpg',
            'Module 2: Foundations of Life Insurance': 'https://img-c.udemycdn.com/course/750x422/3001538_f89d_9.jpg',
            'Module 3: Building Your Protection Plan': 'https://img.etimg.com/thumb/height-360,width-480,imgsize-444020,msid-64589551/buying-insurance-with-a-home-loan-is-not-compulsory-should-you-still-get-it.jpg',
            'Module 1: Path to Financial Independence': 'https://wealthnation.io/wp-content/uploads/2023/09/financial-independence.webp',
            'Module 2: Investment Strategies': 'https://d32ijn7u0aqfv4.cloudfront.net/wp/wp-content/uploads/raw/financialcharts-investing-chalkboard-laptop_SOIN19142_1180273_st_1560x880.jpg',
            'Module 3: Retirement Planning': 'https://smartasset.com/wp-content/uploads/sites/2/2024/06/iStock-1887469204-modified-273b351e-da1d-4cc8-954d-3fbe9dfea2f6.jpg',
            'Module 1: Family Protection Basics': 'https://static.vecteezy.com/system/resources/previews/007/117/153/non_2x/happy-prosperous-family-in-flowers-mother-father-daughter-son-cuddling-together-near-family-protection-family-conflict-flat-modern-design-illustration-vector.jpg',
            'Module 2: Health Insurance Essentials': 'https://media.assettype.com/outlookmoney/2025-08-30/dky5i6oy/Health-Insurance-Essentials.png?w=640',
            'Module 3: Estate Planning': 'https://agamalaw.in/wp-content/uploads/2024/02/09df9b4c-33d0-47c3-a817-bede2f3bb96d.gif'
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