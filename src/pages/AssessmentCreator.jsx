import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { AssessmentBlocksSidebar } from '@/components/assessments/AssessmentBlocksSidebar';
import { AssessmentEditor } from '@/components/assessments/AssessmentEditor';
import { AssessmentPreviewModal } from '@/components/assessments/AssessmentPreviewModal';
import { AssessmentSettingsTab } from '@/components/assessments/AssessmentSettingsTab';
import { UnsavedChangesModal } from '@/components/assessments/UnsavedChangesModal';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';
import { useSidebar } from '@/contexts/SidebarContext';
import { useCourseSidebar } from '@/contexts/CourseSidebarContext';

const AssessmentCreator = () => {
  const navigate = useNavigate();
  const { courseId, moduleId, assessmentId } = useParams();
  const [activeTab, setActiveTab] = useState('types');
  const [showPreview, setShowPreview] = useState(false);
  const [showUnsavedChangesModal, setShowUnsavedChangesModal] = useState(false);
  const [pendingTypeSwitch, setPendingTypeSwitch] = useState(null);
  const [assessmentTitle, setAssessmentTitle] = useState('New Assessment');
  const [selectedAssessmentType, setSelectedAssessmentType] = useState(null);
  const [assessmentSettings, setAssessmentSettings] = useState({
    title: 'New Assessment',
    description: 'Assessment description',
    timeLimitMinutes: 30,
    passingScore: 70,
    attemptsAllowed: 3,
    shuffleQuestions: false
  });
  const [blocks, setBlocks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [instructions, setInstructions] = useState([]);
  const [hasBeenSaved, setHasBeenSaved] = useState(false);
  const { setMainCollapsed } = useSidebar();
  const { setCourseSidebarOpen } = useCourseSidebar();

  useEffect(() => {
    setMainCollapsed(true);
    setCourseSidebarOpen(false);
    const timer = setTimeout(() => setMainCollapsed(true), 100);
    return () => {
      clearTimeout(timer);
      setMainCollapsed(false);
    };
  }, [setMainCollapsed, setCourseSidebarOpen]);

  useEffect(() => {
    if (assessmentId && assessmentId !== 'creator') {
      const saved = JSON.parse(localStorage.getItem('assessments') || '[]');
      const existing = saved.find(a => a.id === assessmentId);
      if (existing) {
        setAssessmentTitle(existing.title);
        setAssessmentSettings(existing.settings);
        setBlocks(existing.blocks);
        setInstructions(existing.instructions || []);
        setSelectedAssessmentType(existing.type);
        setIsEditing(true);
        setHasBeenSaved(true);
        setActiveTab('questions');
      }
    }
  }, [assessmentId]);

  const hasInstructions = instructions.length > 0;
  const hasUnsavedChanges = () => blocks.length > 0 || instructions.length > 0;

  const handleSaveAssessment = (assessmentBlocks, title) => {
    setBlocks(assessmentBlocks);
    if (!hasBeenSaved || isEditing) {
      const id = isEditing ? assessmentId : `assessment_${Date.now()}`;
      const data = {
        id,
        title,
        description: assessmentSettings.description,
        type: selectedAssessmentType || 'quiz',
        status: 'draft',
        duration: `${assessmentSettings.timeLimitMinutes} min`,
        blocks: assessmentBlocks,
        instructions,
        settings: { ...assessmentSettings, title }
      };
      const saved = JSON.parse(localStorage.getItem('assessments') || '[]');
      if (isEditing) {
        const updated = saved.map(a => (a.id === assessmentId ? data : a));
        localStorage.setItem('assessments', JSON.stringify(updated));
      } else {
        const idx = saved.findIndex(a => a.title === title && a.type === selectedAssessmentType);
        if (idx >= 0) saved[idx] = data;
        else saved.push(data);
        localStorage.setItem('assessments', JSON.stringify(saved));
        setHasBeenSaved(true);
      }
      if (assessmentBlocks.length) {
        toast({ title: isEditing ? "Assessment Updated" : "Assessment Saved as Draft", description: isEditing ? "Your changes have been saved." : "Saved as draft." });
      }
    }
  };

  const handlePublishAssessment = () => {
    handleSaveAssessment(blocks, assessmentTitle);
    const id = isEditing ? assessmentId : `assessment_${Date.now()}`;
    const publishData = {
      id,
      title: assessmentTitle,
      description: assessmentSettings.description,
      type: selectedAssessmentType || 'quiz',
      status: 'published',
      duration: `${assessmentSettings.timeLimitMinutes} min`,
      blocks,
      instructions,
      settings: { ...assessmentSettings, title: assessmentTitle }
    };
    const saved = JSON.parse(localStorage.getItem('assessments') || '[]');
    const idx = saved.findIndex(a => a.title === assessmentTitle && a.type === selectedAssessmentType);
    if (idx >= 0) saved[idx] = publishData;
    else saved.push(publishData);
    localStorage.setItem('assessments', JSON.stringify(saved));
    setHasBeenSaved(true);
    toast({ title: "Assessment Published", description: "Published successfully." });
    navigate(`/courses/builder/${courseId}/modules/${moduleId}/assessments`);
  };

  const handlePreview = () => {
    console.log('Preview', { instructions, blocks, settings: assessmentSettings });
    setShowPreview(true);
  };

  const updateAssessmentSettings = newSettings => {
    setAssessmentSettings(prev => ({ ...prev, ...newSettings }));
    if (newSettings.title) setAssessmentTitle(newSettings.title);
  };

  const getCurrentAssessmentData = () => ({ title: assessmentTitle, description: assessmentSettings.description, blocks, instructions, settings: assessmentSettings });

  const handleAssessmentTypeSelect = type => {
    if (selectedAssessmentType && selectedAssessmentType !== type && hasUnsavedChanges()) {
      setPendingTypeSwitch(type);
      setShowUnsavedChangesModal(true);
      return;
    }
    setSelectedAssessmentType(type);
    setActiveTab(['quiz','assignment','survey','essay','debate'].includes(type) ? 'questions' : 'instructions');
  };

  const handleUnsavedChangesCancel = () => {
    setShowUnsavedChangesModal(false);
    setPendingTypeSwitch(null);
  };

  const handlePublishAndSwitch = () => {
    handlePublishAssessment();
    if (pendingTypeSwitch) {
      setSelectedAssessmentType(pendingTypeSwitch);
      setActiveTab(['quiz','assignment','survey','essay','debate'].includes(pendingTypeSwitch) ? 'questions' : 'instructions');
      setBlocks([]);
      setInstructions([]);
      setAssessmentTitle('New Assessment');
      setAssessmentSettings({
        title: 'New Assessment',
        description: 'Assessment description',
        timeLimitMinutes: 30,
        passingScore: 70,
        attemptsAllowed: 3,
        shuffleQuestions: false
      });
      setHasBeenSaved(false);
    }
    setShowUnsavedChangesModal(false);
    setPendingTypeSwitch(null);
  };

  return (
    <div className="h-screen w-full flex bg-gray-50 overflow-hidden">
      <div className="fixed left-16 top-16 w-80 bg-white border-r border-gray-200 flex flex-col h-[calc(100vh-4rem)] z-10 shadow-lg">
        <div className="p-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Assessment Builder</h2>
          <p className="text-sm text-gray-600">Create and manage your assessment</p>
        </div>

        <div className="border-b border-gray-100 flex-shrink-0">
          <div className="flex">
            <button onClick={() => setActiveTab('types')} className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${ activeTab==='types' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700' }`}>Types</button>
            {['quiz','assignment','survey','essay','debate'].includes(selectedAssessmentType) && (
              <button onClick={() => setActiveTab('questions')} disabled={!hasInstructions} className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${ activeTab==='questions' ? 'border-blue-500 text-blue-600' : hasInstructions ? 'border-transparent text-gray-500 hover:text-gray-700' : 'border-transparent text-gray-300 cursor-not-allowed' }`} title={!hasInstructions ? "Add instruction first" : ""}>Questions</button>
            )}
            <button onClick={() => setActiveTab('settings')} className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${ activeTab==='settings' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700' }`}>Settings</button>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <AssessmentBlocksSidebar
            activeTab={activeTab}
            selectedType={selectedAssessmentType}
            onTypeSelect={handleAssessmentTypeSelect}
            settings={assessmentSettings}
            onUpdateSettings={updateAssessmentSettings}
          />
        </ScrollArea>
      </div>

      <div className="fixed top-16 left-96 right-0 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm z-20">
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <Button variant="ghost" size="icon" onClick={() => navigate(`/courses/builder/${courseId}/modules/${moduleId}/assessments`)} className="hover:bg-gray-100 flex-shrink-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1 min-w-0">
            <input value={assessmentTitle} onChange={e => setAssessmentTitle(e.target.value)} className="text-lg font-semibold bg-transparent border-none outline-none focus:bg-gray-50 px-2 py-1 rounded w-full" style={{ color: '#3b82f6' }} />
          </div>
        </div>

        <div className="flex items-center space-x-3 flex-shrink-0">
          <Button variant="outline" size="sm" onClick={() => handleSaveAssessment(blocks, assessmentTitle)}>Save as Draft</Button>
          <Button variant="outline" size="sm" onClick={handlePreview}>Preview</Button>
          <Button size="sm" onClick={handlePublishAssessment} style={{ backgroundColor: '#3b82f6' }}>{isEditing ? 'Update' : 'Publish'}</Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden ml-96 mt-16">
        <ScrollArea className="flex-1 pt-4">
          <AssessmentEditor
            onSave={handleSaveAssessment}
            onPreview={handlePreview}
            settings={assessmentSettings}
            initialBlocks={blocks}
            assessmentTitle={assessmentTitle}
            onTitleChange={setAssessmentTitle}
            selectedType={selectedAssessmentType}
            onTypeSelect={handleAssessmentTypeSelect}
            activeTab={activeTab}
            instructions={instructions}
            onUpdateInstructions={setInstructions}
          />
        </ScrollArea>
      </div>

      <AssessmentPreviewModal isOpen={showPreview} onClose={() => setShowPreview(false)} assessmentData={getCurrentAssessmentData()} />

      <UnsavedChangesModal
        isOpen={showUnsavedChangesModal}
        onClose={() => setShowUnsavedChangesModal(false)}
        currentType={selectedAssessmentType}
        newType={pendingTypeSwitch}
        onCancel={handleUnsavedChangesCancel}
        onPublishAndSwitch={handlePublishAndSwitch}
      />
    </div>
  );
};

export default AssessmentCreator;
