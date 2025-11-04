import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import AddModuleDialog from './AddModuleDialog';
import ModuleCard from './ModuleCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EditModuleDialog from './EditModuleDialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';

const CourseModules = () => {
  console.log('Rendering CourseModules');
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const courseType = searchParams.get('type') || 'open';
  const { language } = useLanguage();
  const t = translations[language];
  
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
          const enTranslations = translations.en;
          const ptTranslations = translations.pt;
          const imageMap = {
            // English titles
            'Module 1: Executive Branch System Overview': 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            'Module 2: Administrative Operations Management': 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            'Module 3: Executive Reporting & Analytics': 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            // Portuguese titles
            [enTranslations.module1Title]: 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            [enTranslations.module2Title]: 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            [enTranslations.module3Title]: 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            [ptTranslations.module1Title]: 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            [ptTranslations.module2Title]: 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            [ptTranslations.module3Title]: 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            // Other modules
            'Module 1: Legislative Platform Introduction': 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            'Module 2: Council Management & Workflow': 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            'Module 3: Legislative Document Management': 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            'Module 1: Database Architecture & Planning': 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            'Module 2: Data Migration & Conversion Services': 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            'Module 3: Technical Support & Maintenance': 'https://aiiteducation.com/assets_web1/img/courses.jpg'
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
            '1': [ // Public Management System - Executive Branch
              {
                id: 1,
                title: t.module1Title,
                description: t.module1Description,
                units: 6,
                assessments: 1,
                duration: "3 hours",
                completed: false,
                locked: false,
              },
              {
                id: 2,
                title: t.module2Title,
                description: t.module2Description,
                units: 8,
                assessments: 2,
                duration: "4 hours",
                completed: false,
                locked: courseType === 'sequential',
              },
              {
                id: 3,
                title: t.module3Title,
                description: t.module3Description,
                units: 7,
                assessments: 2,
                duration: "3.5 hours",
                completed: false,
                locked: courseType === 'sequential',
              }
            ],
            '2': [ // Legislative Management Platform
              {
                id: 1,
                title: "Module 1: Legislative Platform Introduction",
                description: "Understanding legislative management system and council operations",
                units: 7,
                assessments: 2,
                duration: "3.5 hours",
                completed: false,
                locked: false,
              },
              {
                id: 2,
                title: "Module 2: Council Management & Workflow",
                description: "Managing legislative sessions, voting processes, and documentation",
                units: 9,
                assessments: 3,
                duration: "5 hours",
                completed: false,
                locked: courseType === 'sequential',
              },
              {
                id: 3,
                title: "Module 3: Legislative Document Management",
                description: "Creating, tracking, and archiving legislative documents and resolutions",
                units: 6,
                assessments: 2,
                duration: "4 hours",
                completed: false,
                locked: courseType === 'sequential',
              }
            ],
            '3': [ // Database Management & Technical Support
              {
                id: 1,
                title: "Module 1: Database Architecture & Planning",
                description: "Understanding database structure and planning migration strategies",
                units: 8,
                assessments: 2,
                duration: "4 hours",
                completed: false,
                locked: false,
              },
              {
                id: 2,
                title: "Module 2: Data Migration & Conversion Services",
                description: "Executing database conversion and ensuring data integrity",
                units: 9,
                assessments: 3,
                duration: "5 hours",
                completed: false,
                locked: courseType === 'sequential',
              },
              {
                id: 3,
                title: "Module 3: Technical Support & Maintenance",
                description: "System maintenance, user training, and data center hosting services",
                units: 7,
                assessments: 2,
                duration: "4.5 hours",
                completed: false,
                locked: courseType === 'sequential',
              }
            ]
          };
          
          return courseModules[courseId] || courseModules['1']; // Default to Public Management
        };
        
        const defaultModules = getCourseModules(courseId).map((m) => {
          const enTranslations = translations.en;
          const ptTranslations = translations.pt;
          const titleToImage = {
            // English titles
            'Module 1: Executive Branch System Overview': 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            'Module 2: Administrative Operations Management': 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            'Module 3: Executive Reporting & Analytics': 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            // Portuguese titles
            [enTranslations.module1Title]: 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            [enTranslations.module2Title]: 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            [enTranslations.module3Title]: 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            [ptTranslations.module1Title]: 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            [ptTranslations.module2Title]: 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            [ptTranslations.module3Title]: 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            // Other modules
            'Module 1: Legislative Platform Introduction': 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            'Module 2: Council Management & Workflow': 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            'Module 3: Legislative Document Management': 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            'Module 1: Database Architecture & Planning': 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            'Module 2: Data Migration & Conversion Services': 'https://aiiteducation.com/assets_web1/img/courses.jpg',
            'Module 3: Technical Support & Maintenance': 'https://aiiteducation.com/assets_web1/img/courses.jpg'
          };
          return { ...m, image: titleToImage[m.title] };
        });
        setModules(defaultModules);
      }
      
      setLoading(false);
    };

    loadModulesData();
  }, [courseId, courseType, language]);

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
           <span className="ml-2">{language === 'en' ? 'Loading modules...' : 'Carregando módulos...'}</span>
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
             {t.backToCourses}
           </Button>
           <div>
             <h1 className="text-2xl font-bold">{t.courseModules}</h1>
             <p className="text-gray-600">{language === 'en' ? 'No modules found for this course' : 'Nenhum módulo encontrado para este curso'}</p>
           </div>
         </div>
         <Button onClick={handleAddModule} className="bg-ca-primary hover:bg-ca-secondary">
           <Plus className="h-4 w-4 mr-2" />
           {t.addModule}
         </Button>
        </div>

        <Card className="max-w-md mx-auto mt-8">
           <CardHeader className="text-center">
             <div className="mx-auto mb-4 bg-gray-100 rounded-full p-6 w-20 h-20 flex items-center justify-center">
               <BookOpen className="h-8 w-8 text-gray-400" />
             </div>
             <CardTitle className="text-xl">{language === 'en' ? 'No Modules Found' : 'Nenhum Módulo Encontrado'}</CardTitle>
           </CardHeader>
           <CardContent className="text-center">
             <p className="text-gray-600 mb-6">
               {language === 'en' 
                 ? "This course doesn't have any modules yet. Create your first module to get started."
                 : "Este curso ainda não possui módulos. Crie seu primeiro módulo para começar."}
             </p>
             <Button onClick={handleAddModule} className="w-full bg-ca-primary hover:bg-ca-secondary">
               <Plus className="h-4 w-4 mr-2" />
               {language === 'en' ? 'Create First Module' : 'Criar Primeiro Módulo'}
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
             {t.backToCourses}
           </Button>
           <div>
             <h1 className="text-2xl font-bold">{t.courseModules}</h1>
             <p className="text-gray-600">
               {courseType === 'sequential' 
                 ? t.completeModulesInOrder
                 : t.accessModulesAnyOrder}
               {isPublishedCourse && ` • ${t.publishedCourse}`}
             </p>
           </div>
         </div>
         <Button onClick={handleAddModule} className="bg-ca-primary hover:bg-ca-secondary">
           <Plus className="h-4 w-4 mr-2" />
           {t.addModule}
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