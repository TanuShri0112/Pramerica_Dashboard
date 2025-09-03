import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, BookOpen, ClipboardList, Edit, Trash2, Save, Upload } from 'lucide-react';
import AddModuleDialog from '@/components/courses/AddModuleDialog';
import EditModuleDialog from '@/components/courses/EditModuleDialog';
import { toast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const CourseBuilder = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template');
  
  const [isAddModuleOpen, setIsAddModuleOpen] = useState(false);
  const [isEditModuleOpen, setIsEditModuleOpen] = useState(false);
  const [editingModule, setEditingModule] = useState(null);
  const [modules, setModules] = useState([
    {
      id: 1,
      title: 'Personal Finance Basics',
      description: 'Foundations of money management, goals, and financial planning',
      units: 3,
      assessments: 1,
      duration: '2 hours',
    },
  ]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUnits = JSON.parse(localStorage.getItem('units') || '[]');
    const savedAssessments = JSON.parse(localStorage.getItem('assessments') || '[]');
    
    // Update module counts based on saved data
    setModules(prevModules => 
      prevModules.map(module => {
        const moduleUnits = savedUnits.filter(unit => unit.moduleId === module.id);
        const moduleAssessments = savedAssessments.filter(assessment => assessment.moduleId === module.id);
        
        return {
          ...module,
          units: moduleUnits.length,
          assessments: moduleAssessments.length,
          duration: `${Math.max(1, moduleUnits.length + moduleAssessments.length)} hours`
        };
      })
    );
  }, []);

  const handleAddModule = (moduleData) => {
    const newModule = {
      id: modules.length + 1,
      title: moduleData.title,
      description: moduleData.description,
      units: 0,
      assessments: 0,
      duration: "0 hours"
    };
    setModules([...modules, newModule]);
    setIsAddModuleOpen(false);
    toast({
      title: "Module Added",
      description: `${moduleData.title} has been added to your course.`,
    });
  };

  const handleEditModule = (moduleId) => {
    const module = modules.find(m => m.id === moduleId);
    if (module) {
      setEditingModule(module);
      setIsEditModuleOpen(true);
    }
  };

  const handleUpdateModule = (updatedModule) => {
    setModules(modules.map(m => m.id === updatedModule.id ? updatedModule : m));
    setEditingModule(null);
  };

  const handleDeleteModule = (moduleId) => {
    const module = modules.find(m => m.id === moduleId);
    if (module && window.confirm(`Are you sure you want to delete "${module.title}"?`)) {
      setModules(modules.filter(m => m.id !== moduleId));
      
      // Also remove associated units and assessments
      const savedUnits = JSON.parse(localStorage.getItem('units') || '[]');
      const savedAssessments = JSON.parse(localStorage.getItem('assessments') || '[]');
      
      const filteredUnits = savedUnits.filter(unit => unit.moduleId !== moduleId);
      const filteredAssessments = savedAssessments.filter(assessment => assessment.moduleId !== moduleId);
      
      localStorage.setItem('units', JSON.stringify(filteredUnits));
      localStorage.setItem('assessments', JSON.stringify(filteredAssessments));
      
      toast({
        title: "Module Deleted",
        description: `"${module.title}" and all its content have been removed.`,
      });
    }
  };

  const handleCreateUnits = (moduleId, moduleName) => {
    navigate(`/courses/builder/${courseId}/modules/${moduleId}/units`);
  };

  const handleCreateAssessments = (moduleId, moduleName) => {
    navigate(`/courses/builder/${courseId}/modules/${moduleId}/assessments`);
  };

  const handleSaveDraft = () => {
    const courseData = {
      id: courseId,
      title: `Course ${courseId}`,
      category: 'General',
      status: 'Draft',
      students: 0,
      lastUpdated: new Date().toLocaleDateString(),
      createdAt: new Date().toLocaleDateString(),
      description: 'Draft course',
      modules: modules
    };

    const existingCourses = JSON.parse(localStorage.getItem('draftCourses') || '[]');
    const courseIndex = existingCourses.findIndex(course => course.id === courseId);
    
    if (courseIndex >= 0) {
      existingCourses[courseIndex] = courseData;
    } else {
      existingCourses.push(courseData);
    }
    
    localStorage.setItem('draftCourses', JSON.stringify(existingCourses));
    
    toast({
      title: "Course Saved",
      description: "Your course has been saved as a draft.",
    });
  };

  const handlePublishCourse = () => {
    // Get units and assessments from localStorage
    const savedUnits = JSON.parse(localStorage.getItem('units') || '[]');
    const savedAssessments = JSON.parse(localStorage.getItem('assessments') || '[]');
    
    // Create course data with modules, units, and assessments
    const courseData = {
      id: courseId,
      title: `Course ${courseId}`,
      category: 'General',
      status: 'Published',
      students: 0,
      lastUpdated: new Date().toLocaleDateString(),
      createdAt: new Date().toLocaleDateString(),
      description: 'Published course with all content',
      modules: modules.map(module => ({
        ...module,
        units: savedUnits.filter(unit => unit.moduleId === module.id),
        assessments: savedAssessments.filter(assessment => assessment.moduleId === module.id)
      })),
      publishedAt: new Date().toISOString()
    };

    // Save to main courses list
    const existingCourses = JSON.parse(localStorage.getItem('courses') || '[]');
    const courseIndex = existingCourses.findIndex(course => course.id === courseId);
    
    if (courseIndex >= 0) {
      existingCourses[courseIndex] = courseData;
    } else {
      existingCourses.push(courseData);
    }
    
    localStorage.setItem('courses', JSON.stringify(existingCourses));

    // Remove from draft courses if exists
    const draftCourses = JSON.parse(localStorage.getItem('draftCourses') || '[]');
    const filteredDrafts = draftCourses.filter(course => course.id !== courseId);
    localStorage.setItem('draftCourses', JSON.stringify(filteredDrafts));

    toast({
      title: "Course Published",
      description: "Your course has been published and is now available in the courses section.",
    });
    navigate('/courses');
  };

  return (
    <div className="container mx-auto py-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => navigate('/courses')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">Course Builder</h1>
            <p className="text-muted-foreground">
              {templateId ? `Building from template ${templateId}` : 'Building from scratch'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleSaveDraft}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={() => setIsAddModuleOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Module
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {modules.map((module) => (
          <Card key={module.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl">{module.title}</CardTitle>
                  <p className="text-muted-foreground mt-2">{module.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEditModule(module.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDeleteModule(module.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="outline">{module.units} Lessons</Badge>
                <Badge variant="outline">{module.assessments} Assessments</Badge>
                <Badge variant="outline">{module.duration}</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2"
                  onClick={() => handleCreateUnits(module.id, module.title)}
                >
                  <BookOpen className="h-6 w-6" />
                  <span>Create Lessons</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2"
                  onClick={() => handleCreateAssessments(module.id, module.title)}
                >
                  <ClipboardList className="h-6 w-6" />
                  <span>Create Assessments</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {modules.length === 0 && (
          <Card className="border-dashed border-2">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No modules yet</h3>
              <p className="text-muted-foreground mb-4">Start building your course by adding your first module.</p>
              <Button onClick={() => setIsAddModuleOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Module
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Course Publishing Section */}
      {modules.length > 0 && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Upload className="h-5 w-5" />
              Publish Your Course
            </CardTitle>
            <p className="text-green-700">
              Ready to launch? Publish your course to make it available to students.
            </p>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Publish Course
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Publish Course</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to publish this course? Once published, it will be available to students and you won't be able to make major structural changes.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handlePublishCourse}>
                    Publish Course
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      )}

      <AddModuleDialog
        open={isAddModuleOpen}
        onOpenChange={setIsAddModuleOpen}
        onModuleAdd={handleAddModule}
      />

      {editingModule && (
        <EditModuleDialog
          open={isEditModuleOpen}
          onOpenChange={setIsEditModuleOpen}
          module={editingModule}
          onUpdate={handleUpdateModule}
        />
      )}
    </div>
  );
};

export default CourseBuilder;