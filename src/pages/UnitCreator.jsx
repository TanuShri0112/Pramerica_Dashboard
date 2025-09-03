import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ContentBlocksSidebar } from '@/components/units/ContentBlocksSidebar';
import { ContentEditor } from '@/components/units/ContentEditor';
import { PreviewModal } from '@/components/units/PreviewModal';
import { TemplatesTab } from '@/components/units/TemplatesTab';
import { SettingsTab } from '@/components/units/SettingsTab';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';
import { useSidebar } from '@/contexts/SidebarContext';
import { useCourseSidebar } from '@/contexts/CourseSidebarContext';

const UnitCreator = () => {
  const navigate = useNavigate();
  const { courseId, moduleId, unitId } = useParams();
  const [activeTab, setActiveTab] = useState('blocks');
  const [showPreview, setShowPreview] = useState(false);
  const [unitTitle, setUnitTitle] = useState('New Lesson');
  const [courseSettings, setCourseSettings] = useState({
    title: 'New Lesson',
    description: 'Course description',
    theme: 'Modern',
    fontFamily: 'Inter',
    primaryColor: '#3b82f6'
  });
  const [blocks, setBlocks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const { setMainCollapsed } = useSidebar();
  const { setCourseSidebarOpen } = useCourseSidebar();

  // Force collapse main sidebar and close course sidebar when entering unit creator
  useEffect(() => {
    console.log('UnitCreator mounted, forcing main sidebar collapse');
    setMainCollapsed(true);
    setCourseSidebarOpen(false);
    
    const timer = setTimeout(() => {
      setMainCollapsed(true);
    }, 100);
    
    return () => {
      console.log('UnitCreator unmounted, expanding main sidebar');
      clearTimeout(timer);
      setMainCollapsed(false);
    };
  }, [setMainCollapsed, setCourseSidebarOpen]);

  // Additional effect to ensure sidebar stays collapsed
  useEffect(() => {
    setMainCollapsed(true);
  }, [setMainCollapsed]);

  // Check if we're editing an existing unit
  useEffect(() => {
    if (unitId && unitId !== 'creator') {
      const savedUnits = JSON.parse(localStorage.getItem('units') || '[]');
      const existingUnit = savedUnits.find(unit => unit.id === unitId);
      
      if (existingUnit) {
        setUnitTitle(existingUnit.title);
        setCourseSettings(existingUnit.settings);
        setBlocks(existingUnit.blocks);
        setIsEditing(true);
      }
    }
  }, [unitId]);

  const handleSaveUnit = (unitBlocks, title) => {
    // Update current blocks state
    setBlocks(unitBlocks);
    
    const unitData = {
      id: isEditing ? unitId : `unit_${Date.now()}`,
      title: title,
      description: courseSettings.description,
      type: 'lesson',
      status: 'draft',
      duration: '10 min',
      blocks: unitBlocks,
      settings: {
        ...courseSettings,
        title: title
      }
    };

    const savedUnits = JSON.parse(localStorage.getItem('units') || '[]');
    
    if (isEditing) {
      const updatedUnits = savedUnits.map(unit => 
        unit.id === unitId ? unitData : unit
      );
      localStorage.setItem('units', JSON.stringify(updatedUnits));
    } else {
      savedUnits.push(unitData);
      localStorage.setItem('units', JSON.stringify(savedUnits));
    }

    // Only show toast for explicit save actions
    if (unitBlocks.length > 0) {
      toast({
        title: isEditing ? "Unit Updated" : "Unit Saved as Draft",
        description: isEditing ? "Your changes have been saved." : "Your unit has been saved as a draft.",
      });
    }
  };

  const handlePublishUnit = () => {
    const unitData = {
      id: isEditing ? unitId : `unit_${Date.now()}`,
      title: unitTitle,
      description: courseSettings.description,
      type: 'lesson',
      status: 'published',
      duration: `${Math.max(1, blocks.length * 2)} min`,
      blocks: blocks,
      settings: {
        ...courseSettings,
        title: unitTitle
      }
    };

    const savedUnits = JSON.parse(localStorage.getItem('units') || '[]');
    
    if (isEditing) {
      const updatedUnits = savedUnits.map(unit => 
        unit.id === unitId ? unitData : unit
      );
      localStorage.setItem('units', JSON.stringify(updatedUnits));
    } else {
      savedUnits.push(unitData);
      localStorage.setItem('units', JSON.stringify(savedUnits));
    }

    if (window.saveLesson) {
      window.saveLesson();
    }

    toast({
      title: "Unit Published",
      description: "Your unit has been published successfully and is now available in the Units Builder.",
    });
    
    navigate(`/courses/builder/${courseId}/modules/${moduleId}/units`);
  };

  const handlePreview = () => {
    const currentUnitData = {
      title: unitTitle,
      description: courseSettings.description,
      blocks: blocks,
      settings: courseSettings
    };
    setShowPreview(true);
  };

  const updateCourseSettings = (newSettings) => {
    setCourseSettings(prev => ({ ...prev, ...newSettings }));
    if (newSettings.title) {
      setUnitTitle(newSettings.title);
    }
  };

  const handleUseTemplate = (templateBlocks) => {
    if (window.loadTemplate) {
      window.loadTemplate(templateBlocks);
    }
    setActiveTab('blocks');
  };

  const getCurrentUnitData = () => ({
    title: unitTitle,
    description: courseSettings.description,
    blocks: blocks,
    settings: courseSettings
  });

  return (
    <div className="h-screen w-full flex bg-gray-50 overflow-hidden">
      {/* Content Blocks Sidebar */}
      <div className="fixed left-16 top-16 w-80 bg-white border-r border-gray-200 flex flex-col h-[calc(100vh-4rem)] z-10 shadow-lg">
        <div className="p-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Content Blocks</h2>
          <p className="text-sm text-gray-600">Click blocks to add them to your lesson</p>
        </div>
        
        <div className="border-b border-gray-100 flex-shrink-0">
          <div className="flex">
            <button
              onClick={() => setActiveTab('blocks')}
              className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'blocks' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Blocks
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'templates' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Templates
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'settings' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Settings
            </button>
          </div>
        </div>

        <ScrollArea className="flex-1">
          {activeTab === 'blocks' && <ContentBlocksSidebar />}
          {activeTab === 'templates' && <TemplatesTab onUseTemplate={handleUseTemplate} />}
          {activeTab === 'settings' && (
            <SettingsTab 
              settings={courseSettings}
              onUpdateSettings={updateCourseSettings}
            />
          )}
        </ScrollArea>
      </div>

      {/* Secondary Navigation Bar */}
      <div className="fixed top-16 left-96 right-0 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm z-20">
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(`/courses/builder/${courseId}/modules/${moduleId}/units`)}
            className="hover:bg-gray-100 flex-shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex-1 min-w-0">
            <input 
              type="text"
              value={unitTitle}
              onChange={(e) => setUnitTitle(e.target.value)}
              className="text-lg font-semibold bg-transparent border-none outline-none focus:bg-gray-50 px-2 py-1 rounded w-full"
              style={{ 
                fontFamily: courseSettings.fontFamily,
                color: courseSettings.primaryColor 
              }}
            />
          </div>
        </div>

        <div className="flex items-center space-x-3 flex-shrink-0">
          <Button 
            variant="outline" 
            onClick={() => handleSaveUnit(blocks, unitTitle)}
            className="px-4 py-2 text-sm font-medium"
            size="sm"
          >
            Save as Draft
          </Button>
          <Button 
            variant="outline" 
            onClick={handlePreview}
            className="px-4 py-2 text-sm font-medium"
            size="sm"
          >
            Preview
          </Button>
          <Button 
            onClick={handlePublishUnit}
            className="px-4 py-2 text-sm font-medium"
            size="sm"
            style={{ backgroundColor: courseSettings.primaryColor }}
          >
            {isEditing ? 'Update' : 'Publish'}
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden ml-96 mt-16">
        <ScrollArea className="flex-1 pt-4">
          <ContentEditor 
            onSave={handleSaveUnit}
            onPreview={handlePreview}
            settings={courseSettings}
            initialBlocks={blocks}
            unitTitle={unitTitle}
            onTitleChange={setUnitTitle}
          />
        </ScrollArea>
      </div>

      <PreviewModal 
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        unitData={getCurrentUnitData()}
      />
    </div>
  );
};

export default UnitCreator;