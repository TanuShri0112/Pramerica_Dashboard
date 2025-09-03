import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from '@/components/ui/accordion';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import {
  Trash2,
  Plus,
  Move,
  Book,
  BookOpen,
  File,
  Clock,
  CheckCircle,
  Save,
  FileText,
  Puzzle,
  ArrowLeft,
  FileImage,
  FileVideo,
  Video,
  PaperclipIcon,
  Layers
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const initialCourseData = {
  id: 'new-123456',
  title: 'Legal Studies Fundamentals',
  description: 'A comprehensive introduction to legal principles and practices in the United States.',
  price: '49.99',
  modules: []
};

const CourseBuilder = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(initialCourseData);
  const [autoSaveStatus, setAutoSaveStatus] = useState('saved');
  const [draggedModule, setDraggedModule] = useState(null);
  const [draggedUnit, setDraggedUnit] = useState(null);
  const [draggedLesson, setDraggedLesson] = useState(null);
  const [expandedModules, setExpandedModules] = useState([]);
  const [expandedUnits, setExpandedUnits] = useState([]);
  
  const moduleCount = course.modules.length;
  const unitCount = course.modules.reduce((total, module) => total + module.units.length, 0);
  const lessonCount = course.modules.reduce((moduleTotal, module) => 
    moduleTotal + module.units.reduce((unitTotal, unit) => 
      unitTotal + unit.lessons.length, 0), 0);

  React.useEffect(() => {
    if (course.modules.length > 0) {
      const timer = setTimeout(() => {
        handleAutoSave();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [course]);

  const handleAutoSave = () => {
    setAutoSaveStatus('saving');
    
    setTimeout(() => {
      console.log('Auto-saving course:', course);
      setAutoSaveStatus('saved');
    }, 1000);
  };

  const handleAddModule = () => {
    const newModuleId = `module-${Date.now()}`;
    setCourse(prev => ({
      ...prev,
      modules: [
        ...prev.modules,
        {
          id: newModuleId,
          title: 'New Module',
          description: 'Module description',
          duration: '1 hour',
          units: []
        }
      ]
    }));
    
    setExpandedModules(prev => [...prev, newModuleId]);
  };

  const handleDeleteModule = (moduleId) => {
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.filter(module => module.id !== moduleId)
    }));
    toast({
      title: "Module Deleted",
      description: "The module has been removed."
    });
  };

  const handleModuleChange = (moduleId, field, value) => {
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.map(module => 
        module.id === moduleId ? { ...module, [field]: value } : module
      )
    }));
    setAutoSaveStatus('saving');
  };

  const handleAddUnit = (moduleId) => {
    const newUnitId = `unit-${Date.now()}`;
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.map(module => 
        module.id === moduleId 
          ? { 
              ...module, 
              units: [
                ...module.units, 
                {
                  id: newUnitId,
                  title: 'New Unit',
                  description: 'Unit description',
                  duration: '30 minutes',
                  lessons: []
                }
              ] 
            } 
          : module
      )
    }));
    
    setExpandedUnits(prev => [...prev, newUnitId]);
  };

  const handleDeleteUnit = (moduleId, unitId) => {
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.map(module => 
        module.id === moduleId 
          ? { 
              ...module, 
              units: module.units.filter(unit => unit.id !== unitId)
            } 
          : module
      )
    }));
    toast({
      title: "Unit Deleted",
      description: "The unit has been removed."
    });
  };

  const handleUnitChange = (moduleId, unitId, field, value) => {
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.map(module => 
        module.id === moduleId 
          ? { 
              ...module, 
              units: module.units.map(unit =>
                unit.id === unitId
                  ? { ...unit, [field]: value }
                  : unit
              )
            } 
          : module
      )
    }));
    setAutoSaveStatus('saving');
  };

  const handleAddLesson = (moduleId, unitId) => {
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.map(module => 
        module.id === moduleId 
          ? { 
              ...module, 
              units: module.units.map(unit =>
                unit.id === unitId
                  ? {
                      ...unit,
                      lessons: [
                        ...unit.lessons,
                        {
                          id: `lesson-${Date.now()}`,
                          title: 'New Lesson',
                          type: 'Article',
                          duration: '15 minutes',
                          completed: false,
                          attachments: []
                        }
                      ]
                    }
                  : unit
              )
            } 
          : module
      )
    }));
  };

  const handleDeleteLesson = (moduleId, unitId, lessonId) => {
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.map(module => 
        module.id === moduleId 
          ? { 
              ...module, 
              units: module.units.map(unit =>
                unit.id === unitId
                  ? {
                      ...unit,
                      lessons: unit.lessons.filter(lesson => lesson.id !== lessonId)
                    }
                  : unit
              )
            } 
          : module
      )
    }));
    toast({
      title: "Lesson Deleted",
      description: "The lesson has been removed."
    });
  };

  const handleLessonChange = (moduleId, unitId, lessonId, field, value) => {
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.map(module => 
        module.id === moduleId 
          ? { 
              ...module, 
              units: module.units.map(unit =>
                unit.id === unitId
                  ? {
                      ...unit,
                      lessons: unit.lessons.map(lesson =>
                        lesson.id === lessonId
                          ? { ...lesson, [field]: value }
                          : lesson
                      )
                    }
                  : unit
              )
            } 
          : module
      )
    }));
    setAutoSaveStatus('saving');
  };

  const handleAddAttachment = (moduleId, unitId, lessonId, file) => {
    const attachmentId = `attachment-${Date.now()}`;
    const attachment = {
      id: attachmentId,
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type
    };
    
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.map(module => 
        module.id === moduleId 
          ? { 
              ...module, 
              units: module.units.map(unit =>
                unit.id === unitId
                  ? {
                      ...unit,
                      lessons: unit.lessons.map(lesson =>
                        lesson.id === lessonId
                          ? { 
                              ...lesson, 
                              attachments: [...(lesson.attachments || []), attachment]
                            }
                          : lesson
                      )
                    }
                  : unit
              )
            } 
          : module
      )
    }));
  };

  const handleDeleteAttachment = (moduleId, unitId, lessonId, attachmentId) => {
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.map(module => 
        module.id === moduleId 
          ? { 
              ...module, 
              units: module.units.map(unit =>
                unit.id === unitId
                  ? {
                      ...unit,
                      lessons: unit.lessons.map(lesson =>
                        lesson.id === lessonId && lesson.attachments
                          ? { 
                              ...lesson, 
                              attachments: lesson.attachments.filter(att => att.id !== attachmentId)
                            }
                          : lesson
                      )
                    }
                  : unit
              )
            } 
          : module
      )
    }));
  };

  const handleModuleToggle = (moduleId) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleUnitToggle = (unitId) => {
    setExpandedUnits(prev => 
      prev.includes(unitId) 
        ? prev.filter(id => id !== unitId)
        : [...prev, unitId]
    );
  };

  const handleDragStart = (e, moduleId, unitId, lessonId) => {
    if (lessonId && unitId) {
      setDraggedLesson({ moduleId, unitId, lessonId });
    } else if (unitId) {
      setDraggedUnit({ moduleId, unitId });
    } else {
      setDraggedModule(moduleId);
    }
  };

  const handleModuleDrop = (e, targetModuleId) => {
    e.preventDefault();
    if (draggedModule && draggedModule !== targetModuleId) {
      const modulesCopy = [...course.modules];
      const moduleIndex = modulesCopy.findIndex(m => m.id === draggedModule);
      const targetIndex = modulesCopy.findIndex(m => m.id === targetModuleId);
      
      const [movedModule] = modulesCopy.splice(moduleIndex, 1);
      modulesCopy.splice(targetIndex, 0, movedModule);
      
      setCourse(prev => ({
        ...prev,
        modules: modulesCopy
      }));
    }
    setDraggedModule(null);
    setDraggedUnit(null);
    setDraggedLesson(null);
  };

  const handleUnitDrop = (e, targetModuleId, targetUnitId) => {
    e.preventDefault();
    if (draggedUnit) {
      if (draggedUnit.moduleId === targetModuleId && draggedUnit.unitId !== targetUnitId) {
        const module = course.modules.find(m => m.id === targetModuleId);
        if (module) {
          const unitsCopy = [...module.units];
          const unitIndex = unitsCopy.findIndex(u => u.id === draggedUnit.unitId);
          const targetIndex = unitsCopy.findIndex(u => u.id === targetUnitId);
          
          const [movedUnit] = unitsCopy.splice(unitIndex, 1);
          unitsCopy.splice(targetIndex, 0, movedUnit);
          
          setCourse(prev => ({
            ...prev,
            modules: prev.modules.map(m =>
              m.id === targetModuleId
                ? { ...m, units: unitsCopy }
                : m
            )
          }));
        }
      } else if (draggedUnit.moduleId !== targetModuleId) {
        const sourceModule = course.modules.find(m => m.id === draggedUnit.moduleId);
        const unitToMove = sourceModule?.units.find(u => u.id === draggedUnit.unitId);
        
        if (sourceModule && unitToMove) {
          setCourse(prev => ({
            ...prev,
            modules: prev.modules.map(module => {
              if (module.id === draggedUnit.moduleId) {
                return {
                  ...module,
                  units: module.units.filter(u => u.id !== draggedUnit.unitId)
                };
              }
              if (module.id === targetModuleId) {
                return {
                  ...module,
                  units: [...module.units, unitToMove]
                };
              }
              return module;
            })
          }));
        }
      }
    }
    setDraggedUnit(null);
  };

  const handleLessonDrop = (e, targetModuleId, targetUnitId, targetLessonId) => {
    e.preventDefault();
    if (draggedLesson) {
      if (draggedLesson.moduleId === targetModuleId && 
          draggedLesson.unitId === targetUnitId && 
          draggedLesson.lessonId !== targetLessonId) {
        const module = course.modules.find(m => m.id === targetModuleId);
        const unit = module?.units.find(u => u.id === targetUnitId);
        
        if (module && unit) {
          const lessonsCopy = [...unit.lessons];
          const lessonIndex = lessonsCopy.findIndex(l => l.id === draggedLesson.lessonId);
          const targetIndex = lessonsCopy.findIndex(l => l.id === targetLessonId);
          
          const [movedLesson] = lessonsCopy.splice(lessonIndex, 1);
          lessonsCopy.splice(targetIndex, 0, movedLesson);
          
          setCourse(prev => ({
            ...prev,
            modules: prev.modules.map(m =>
              m.id === targetModuleId
                ? { 
                    ...m, 
                    units: m.units.map(u => 
                      u.id === targetUnitId
                        ? { ...u, lessons: lessonsCopy }
                        : u
                    )
                  }
                : m
            )
          }));
        }
      } else if (draggedLesson.moduleId === targetModuleId && draggedLesson.unitId !== targetUnitId) {
        const module = course.modules.find(m => m.id === targetModuleId);
        const sourceUnit = module?.units.find(u => u.id === draggedLesson.unitId);
        const lessonToMove = sourceUnit?.lessons.find(l => l.id === draggedLesson.lessonId);
        
        if (module && sourceUnit && lessonToMove) {
          setCourse(prev => ({
            ...prev,
            modules: prev.modules.map(m =>
              m.id === targetModuleId
                ? { 
                    ...m, 
                    units: m.units.map(u => {
                      if (u.id === draggedLesson.unitId) {
                        return {
                          ...u,
                          lessons: u.lessons.filter(l => l.id !== draggedLesson.lessonId)
                        };
                      }
                      if (u.id === targetUnitId) {
                        return {
                          ...u,
                          lessons: [...u.lessons, lessonToMove]
                        };
                      }
                      return u;
                    })
                  }
                : m
            )
          }));
        }
      }
    }
    setDraggedLesson(null);
  };

  const handleCourseChange = (field, value) => {
    setCourse(prev => ({
      ...prev,
      [field]: value
    }));
    setAutoSaveStatus('saving');
  };

  const handlePublish = () => {
    if (course.modules.length === 0) {
      toast({
        title: "Cannot Publish",
        description: "Please add at least one module before publishing.",
        variant: "destructive"
      });
      return;
    }
    
    for (const module of course.modules) {
      if (module.units.length === 0) {
        toast({
          title: "Cannot Publish",
          description: `Module "${module.title}" has no units. Please add at least one unit to each module.`,
          variant: "destructive"
        });
        return;
      }
      
      for (const unit of module.units) {
        if (unit.lessons.length === 0) {
          toast({
            title: "Cannot Publish",
            description: `Unit "${unit.title}" in module "${module.title}" has no lessons. Please add at least one lesson to each unit.`,
            variant: "destructive"
          });
          return;
        }
      }
    }
    
    console.log('Publishing course:', course);
    
    toast({
      title: "Course Published",
      description: "Your course has been successfully published."
    });
  };

  const getLessonTypeIcon = (type) => {
    switch (type) {
      case 'Video':
        return <Video className="h-4 w-4" />;
      case 'Quiz':
        return <Puzzle className="h-4 w-4" />;
      case 'Assignment':
        return <FileText className="h-4 w-4" />;
      case 'Article':
      default:
        return <Book className="h-4 w-4" />;
    }
  };

  const getAttachmentIcon = (type) => {
    if (type.startsWith('video/')) {
      return <FileVideo className="h-4 w-4 text-blue-500" />;
    } else if (type.startsWith('image/')) {
      return <FileImage className="h-4 w-4 text-green-500" />;
    } else if (type.startsWith('application/pdf')) {
      return <FileText className="h-4 w-4 text-red-500" />;
    } else {
      return <PaperclipIcon className="h-4 w-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <a href="/courses">
              <ArrowLeft className="h-4 w-4" />
            </a>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold">{course.title}</h1>
              {course.price && (
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  ${parseFloat(course.price).toFixed(2)}
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">{course.description}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {autoSaveStatus === 'saving' ? 'Saving...' : autoSaveStatus === 'saved' ? 'All changes saved' : 'Error saving'}
          </span>
          <Button variant="outline" onClick={handleAutoSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button onClick={handlePublish} className="bg-ca-primary hover:bg-ca-secondary">
            <CheckCircle className="h-4 w-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>
      
      <Card className="shadow-sm border-slate-200">
        <CardHeader className="bg-slate-50">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg">Course Structure</CardTitle>
              <CardDescription>Build your course by adding modules, units, and lessons</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Price:</label>
                <div className="relative">
                  <Input 
                    type="number"
                    min="0"
                    step="0.01"
                    value={course.price || ''}
                    onChange={(e) => handleCourseChange('price', e.target.value)}
                    placeholder="0.00"
                    className="w-24 pl-6"
                  />
                  <span className="absolute left-2 top-1/2 -translate-y-1/2">$</span>
                </div>
              </div>
              <Badge variant="outline" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                {moduleCount} {moduleCount === 1 ? 'Module' : 'Modules'}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Layers className="h-4 w-4" />
                {unitCount} {unitCount === 1 ? 'Unit' : 'Units'}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <File className="h-4 w-4" />
                {lessonCount} {lessonCount === 1 ? 'Lesson' : 'Lessons'}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {course.modules.length === 0 ? (
            <div className="text-center py-10">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-slate-300" />
              <h3 className="text-lg font-medium mb-2">No modules yet</h3>
              <p className="text-muted-foreground mb-4">Start building your course by adding modules, units, and lessons.</p>
              <Button onClick={handleAddModule}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Module
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {course.modules.map((module, moduleIndex) => (
                <Card 
                  key={module.id} 
                  className={`border border-slate-200 shadow-sm ${draggedModule === module.id ? 'opacity-50' : ''}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, module.id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleModuleDrop(e, module.id)}
                >
                  <Collapsible 
                    open={expandedModules.includes(module.id)} 
                    onOpenChange={() => handleModuleToggle(module.id)}
                    className="w-full"
                  >
                    <div className="flex items-center p-4">
                      <Move className="h-5 w-5 text-slate-400 cursor-move mr-2" />
                      <div className="flex-1">
                        <Input
                          value={module.title}
                          onChange={(e) => handleModuleChange(module.id, 'title', e.target.value)}
                          className="font-medium text-lg border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                          placeholder="Module Title"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Layers className="h-3 w-3" />
                          {module.units.length} {module.units.length === 1 ? 'Unit' : 'Units'}
                        </Badge>
                        <CollapsibleTrigger asChild>
                          <Button variant="outline" size="sm">
                            {expandedModules.includes(module.id) ? 'Collapse' : 'Expand'}
                          </Button>
                        </CollapsibleTrigger>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteModule(module.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <CollapsibleContent className="px-4 pb-4">
                      <div className="space-y-4 mb-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-1 block">Module Description</label>
                            <Textarea
                              value={module.description}
                              onChange={(e) => handleModuleChange(module.id, 'description', e.target.value)}
                              placeholder="Enter module description"
                              className="resize-none"
                              rows={3}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1 block">Estimated Duration</label>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                              <Input
                                value={module.duration}
                                onChange={(e) => handleModuleChange(module.id, 'duration', e.target.value)}
                                placeholder="e.g., 1 hour, 45 minutes"
                                className="max-w-xs"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="border-t pt-4">
                          <h4 className="text-sm font-semibold mb-2">Units</h4>
                          
                          {module.units.length === 0 ? (
                            <div className="text-center py-6 border border-dashed rounded-md">
                              <Layers className="h-10 w-10 mx-auto mb-2 text-slate-300" />
                              <p className="text-muted-foreground">No units added to this module yet</p>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {module.units.map((unit, unitIndex) => (
                                <Card 
                                  key={unit.id} 
                                  className={`border border-slate-200 shadow-sm ${draggedUnit?.unitId === unit.id ? 'opacity-50' : ''}`}
                                  draggable
                                  onDragStart={(e) => handleDragStart(e, module.id, unit.id)}
                                  onDragOver={(e) => e.preventDefault()}
                                  onDrop={(e) => handleUnitDrop(e, module.id, unit.id)}
                                >
                                  <Collapsible 
                                    open={expandedUnits.includes(unit.id)}
                                    onOpenChange={() => handleUnitToggle(unit.id)}
                                    className="w-full"
                                  >
                                    <div className="flex items-center p-3 bg-slate-50">
                                      <Move className="h-4 w-4 text-slate-400 cursor-move mr-2" />
                                      <div className="flex-1">
                                        <Input
                                          value={unit.title}
                                          onChange={(e) => handleUnitChange(module.id, unit.id, 'title', e.target.value)}
                                          className="font-medium border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                          placeholder="Unit Title"
                                        />
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="flex items-center gap-1">
                                          <File className="h-3 w-3" />
                                          {unit.lessons.length} {unit.lessons.length === 1 ? 'Lesson' : 'Lessons'}
                                        </Badge>
                                        <CollapsibleTrigger asChild>
                                          <Button variant="outline" size="sm">
                                            {expandedUnits.includes(unit.id) ? 'Collapse' : 'Expand'}
                                          </Button>
                                        </CollapsibleTrigger>
                                        <Button 
                                          variant="outline" 
                                          size="icon" 
                                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                          onClick={() => handleDeleteUnit(module.id, unit.id)}
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                    
                                    <CollapsibleContent className="px-3 pb-3">
                                      <div className="space-y-4 mb-4">
                                        <div className="grid grid-cols-2 gap-4 pt-3">
                                          <div>
                                            <label className="text-sm font-medium mb-1 block">Unit Description</label>
                                            <Textarea
                                              value={unit.description}
                                              onChange={(e) => handleUnitChange(module.id, unit.id, 'description', e.target.value)}
                                              placeholder="Enter unit description"
                                              className="resize-none"
                                              rows={2}
                                            />
                                          </div>
                                          <div>
                                            <label className="text-sm font-medium mb-1 block">Estimated Duration</label>
                                            <div className="flex items-center">
                                              <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                                              <Input
                                                value={unit.duration}
                                                onChange={(e) => handleUnitChange(module.id, unit.id, 'duration', e.target.value)}
                                                placeholder="e.g., 30 minutes"
                                                className="max-w-xs"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        
                                        <div className="border-t pt-3">
                                          <h4 className="text-sm font-semibold mb-2">Lessons</h4>
                                          
                                          {unit.lessons.length === 0 ? (
                                            <div className="text-center py-4 border border-dashed rounded-md">
                                              <File className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                                              <p className="text-muted-foreground">No lessons added to this unit yet</p>
                                            </div>
                                          ) : (
                                            <Accordion type="multiple" className="w-full">
                                              {unit.lessons.map((lesson, lessonIndex) => (
                                                <AccordionItem
                                                  key={lesson.id}
                                                  value={lesson.id}
                                                  className={`${draggedLesson?.lessonId === lesson.id ? 'opacity-50' : ''} border-slate-200`}
                                                  draggable
                                                  onDragStart={(e) => handleDragStart(e, module.id, unit.id, lesson.id)}
                                                  onDragOver={(e) => e.preventDefault()}
                                                  onDrop={(e) => handleLessonDrop(e, module.id, unit.id, lesson.id)}
                                                >
                                                  <AccordionTrigger className="py-2 hover:no-underline">
                                                    <div className="flex items-center text-left">
                                                      <Move className="h-4 w-4 text-slate-400 cursor-move mr-2" />
                                                      <div className="flex-1">
                                                        <span className="font-medium">{lesson.title}</span>
                                                      </div>
                                                      <div className="flex items-center gap-2 mr-2">
                                                        <Badge className="flex items-center gap-1">
                                                          {getLessonTypeIcon(lesson.type)}
                                                          {lesson.type}
                                                        </Badge>
                                                        <span className="text-xs text-muted-foreground flex items-center">
                                                          <Clock className="h-3 w-3 mr-1" />
                                                          {lesson.duration}
                                                        </span>
                                                      </div>
                                                      <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        className="h-6 w-6 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                        onClick={(e) => {
                                                          e.stopPropagation();
                                                          handleDeleteLesson(module.id, unit.id, lesson.id);
                                                        }}
                                                      >
                                                        <Trash2 className="h-3 w-3" />
                                                      </Button>
                                                    </div>
                                                  </AccordionTrigger>
                                                  <AccordionContent className="pl-8">
                                                    <div className="grid grid-cols-1 gap-4 pb-2">
                                                      <div>
                                                        <label className="text-sm font-medium mb-1 block">Lesson Title</label>
                                                        <Input
                                                          value={lesson.title}
                                                          onChange={(e) => handleLessonChange(module.id, unit.id, lesson.id, 'title', e.target.value)}
                                                          placeholder="Enter lesson title"
                                                        />
                                                      </div>
                                                      
                                                      <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                          <label className="text-sm font-medium mb-1 block">Lesson Type</label>
                                                          <select
                                                            value={lesson.type}
                                                            onChange={(e) => handleLessonChange(module.id, unit.id, lesson.id, 'type', e.target.value)}
                                                            className="w-full rounded-md border border-slate-200 p-2"
                                                          >
                                                            <option value="Video">Video</option>
                                                            <option value="Article">Article</option>
                                                            <option value="Quiz">Quiz</option>
                                                            <option value="Assignment">Assignment</option>
                                                          </select>
                                                        </div>
                                                        <div>
                                                          <label className="text-sm font-medium mb-1 block">Duration</label>
                                                          <div className="flex items-center">
                                                            <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                                                            <Input
                                                              value={lesson.duration}
                                                              onChange={(e) => handleLessonChange(module.id, unit.id, lesson.id, 'duration', e.target.value)}
                                                              placeholder="e.g., 15 minutes"
                                                            />
                                                          </div>
                                                        </div>
                                                      </div>
                                                      
                                                      <div className="space-y-4 border-t pt-4">
                                                        <div className="flex items-center justify-between">
                                                          <h5 className="text-sm font-medium">Lesson Content</h5>
                                                        </div>
                                                        
                                                        <div className="border rounded-md p-4">
                                                          <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                                                            <Book className="h-4 w-4" />
                                                            Text Content
                                                          </label>
                                                          <Textarea
                                                            value={lesson.content || ''}
                                                            onChange={(e) => handleLessonChange(module.id, unit.id, lesson.id, 'content', e.target.value)}
                                                            placeholder="Write lesson content here..."
                                                            className="min-h-[150px] resize-none"
                                                          />
                                                        </div>
                                                        
                                                        <div className="border rounded-md p-4">
                                                          <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                                                            <Video className="h-4 w-4" />
                                                            Video Content
                                                          </label>
                                                          <div className="space-y-4">
                                                            <div className="flex items-center gap-2">
                                                              <FileVideo className="h-4 w-4 text-muted-foreground" />
                                                              <Input 
                                                                value={lesson.videoUrl || ''}
                                                                onChange={(e) => handleLessonChange(module.id, unit.id, lesson.id, 'videoUrl', e.target.value)}
                                                                placeholder="Enter video URL (YouTube, Vimeo, etc.)"
                                                              />
                                                            </div>
                                                            
                                                            <div className="text-center">
                                                              <p className="text-sm text-muted-foreground mb-2">Or upload video file</p>
                                                              <div className="flex justify-center">
                                                                <Input 
                                                                  type="file" 
                                                                  accept="video/*"
                                                                  onChange={(e) => {
                                                                    if (e.target.files && e.target.files[0]) {
                                                                      const fileUrl = URL.createObjectURL(e.target.files[0]);
                                                                      handleLessonChange(module.id, unit.id, lesson.id, 'videoUrl', fileUrl);
                                                                    }
                                                                  }}
                                                                  className="max-w-sm"
                                                                />
                                                              </div>
                                                            </div>
                                                            
                                                            {lesson.videoUrl && (
                                                              <div className="mt-4 p-2 bg-slate-50 rounded-md">
                                                                <p className="text-sm font-medium mb-1">Preview:</p>
                                                                <div className="aspect-video bg-slate-100 rounded flex items-center justify-center">
                                                                  {lesson.videoUrl.includes('youtube.com') || lesson.videoUrl.includes('youtu.be') ? (
                                                                    <iframe 
                                                                      src={lesson.videoUrl.replace('watch?v=', 'embed/')} 
                                                                      className="w-full h-full" 
                                                                      allowFullScreen
                                                                      title="Video preview"
                                                                    />
                                                                  ) : (
                                                                    <div className="flex items-center justify-center gap-2 text-slate-500">
                                                                      <Video className="h-8 w-8" />
                                                                      <span>Video Preview</span>
                                                                    </div>
                                                                  )}
                                                                </div>
                                                              </div>
                                                            )}
                                                          </div>
                                                        </div>
                                                        
                                                        {lesson.type === 'Quiz' && (
                                                          <div className="border border-dashed rounded-md p-4 text-center">
                                                            <Puzzle className="h-10 w-10 mx-auto mb-2 text-slate-300" />
                                                            <p className="text-sm text-muted-foreground">Quiz builder coming soon...</p>
                                                          </div>
                                                        )}
                                                        
                                                        {lesson.type === 'Assignment' && (
                                                          <div className="border rounded-md p-4">
                                                            <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                                                              <FileText className="h-4 w-4" />
                                                              Assignment Instructions
                                                            </label>
                                                            <div className="space-y-4">
                                                              <Textarea
                                                                value={lesson.content || ''}
                                                                onChange={(e) => handleLessonChange(module.id, unit.id, lesson.id, 'content', e.target.value)}
                                                                placeholder="Write assignment instructions here..."
                                                                className="min-h-[150px] resize-none"
                                                              />
                                                            </div>
                                                          </div>
                                                        )}
                                                        
                                                        <div className="border rounded-md p-4">
                                                          <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                                                            <PaperclipIcon className="h-4 w-4" />
                                                            Attachments
                                                          </label>
                                                          {lesson.attachments && lesson.attachments.length > 0 ? (
                                                            <div className="space-y-2 mb-4">
                                                              {lesson.attachments.map(attachment => (
                                                                <div key={attachment.id} className="flex items-center justify-between bg-slate-50 p-2 rounded">
                                                                  <div className="flex items-center gap-2">
                                                                    {getAttachmentIcon(attachment.type)}
                                                                    <span className="text-sm">{attachment.name}</span>
                                                                  </div>
                                                                  <Button 
                                                                    variant="ghost" 
                                                                    size="icon"
                                                                    className="h-7 w-7 text-red-500"
                                                                    onClick={() => handleDeleteAttachment(module.id, unit.id, lesson.id, attachment.id)}
                                                                  >
                                                                    <Trash2 className="h-4 w-4" />
                                                                  </Button>
                                                                </div>
                                                              ))}
                                                            </div>
                                                          ) : (
                                                            <p className="text-sm text-slate-500 mb-3">No attachments added</p>
                                                          )}
                                                          
                                                          <Input 
                                                            type="file"
                                                            accept="*/*"  
                                                            onChange={(e) => {
                                                              if (e.target.files && e.target.files[0]) {
                                                                handleAddAttachment(module.id, unit.id, lesson.id, e.target.files[0]);
                                                                e.target.value = '';
                                                              }
                                                            }}
                                                          />
                                                          <p className="text-xs text-slate-400 mt-2">
                                                            Add any type of file: documents, images, videos, etc.
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </AccordionContent>
                                                </AccordionItem>
                                              ))}
                                            </Accordion>
                                          )}
                                          
                                          <Button 
                                            variant="outline" 
                                            className="mt-4 w-full border-dashed"
                                            onClick={() => handleAddLesson(module.id, unit.id)}
                                          >
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add Lesson
                                          </Button>
                                        </div>
                                      </div>
                                    </CollapsibleContent>
                                  </Collapsible>
                                </Card>
                              ))}
                            </div>
                          )}
                          
                          <Button 
                            variant="outline" 
                            className="mt-4 w-full border-dashed"
                            onClick={() => handleAddUnit(module.id)}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Unit
                          </Button>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
              
              <Button 
                variant="outline" 
                className="w-full border-dashed"
                onClick={handleAddModule}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Module
              </Button>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="bg-slate-50 border-t flex justify-between">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">{moduleCount}</span> {moduleCount === 1 ? 'module' : 'modules'} / 
            <span className="font-medium"> {unitCount}</span> {unitCount === 1 ? 'unit' : 'units'} /
            <span className="font-medium"> {lessonCount}</span> {lessonCount === 1 ? 'lesson' : 'lessons'} added
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleAutoSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button onClick={handlePublish} className="bg-ca-primary hover:bg-ca-secondary">
              <CheckCircle className="h-4 w-4 mr-2" />
              Publish Course
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CourseBuilder;