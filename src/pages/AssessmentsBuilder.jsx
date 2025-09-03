import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Eye, Edit, Trash2, FileText, Clock, CheckCircle, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import AssessmentCreator from '@/components/courses/AssessmentCreator';
import AssessmentPreview from '@/components/courses/AssessmentPreview';
import AssessmentLearnerPreview from '@/components/courses/AssessmentLearnerPreview';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const AssessmentsBuilder = () => {
  const navigate = useNavigate();
  const { courseId, moduleId } = useParams();

  const [assessments, setAssessments] = useState([]);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isLearnerPreviewOpen, setIsLearnerPreviewOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [editingAssessment, setEditingAssessment] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [assessmentToDelete, setAssessmentToDelete] = useState(null);

  useEffect(() => {
    const loadAssessments = () => {
      const saved = JSON.parse(localStorage.getItem('assessments') || '[]');
      const filtered = saved.filter(a => !a.moduleId || a.moduleId === moduleId);
      setAssessments(filtered);
    };

    loadAssessments();
    const interval = setInterval(loadAssessments, 1000);
    return () => clearInterval(interval);
  }, [moduleId]);

  const getAssessmentTypeColor = type => {
    const map = {
      quiz: 'bg-blue-100 text-blue-800',
      assignment: 'bg-green-100 text-green-800',
      survey: 'bg-yellow-100 text-yellow-800',
      essay: 'bg-purple-100 text-purple-800',
      debate: 'bg-red-100 text-red-800',
    };
    return map[type] || 'bg-gray-100 text-gray-800';
  };

  const transformAssessmentForPreview = a => ({
    id: parseInt(a.id.replace(/\D/g, '')) || 0,
    title: a.title,
    description: a.description,
    assessmentType: a.type,
    questions: (a.blocks || []).map(b => ({
      id: b.id,
      type: b.type,
      question: b.content?.question || '',
      options: b.content?.options || [],
      correctAnswer: b.content?.correctAnswer,
      points: b.content?.points || 1,
      explanation: b.content?.explanation,
    })),
    timeLimitMinutes: a.settings?.timeLimitMinutes || 30,
    status: a.status,
    createdAt: a.createdAt,
  });

  const handleAdd = () =>
    navigate(`/courses/builder/${courseId}/modules/${moduleId}/assessments/creator`);

  const handleEdit = a =>
    navigate(`/courses/builder/${courseId}/modules/${moduleId}/assessments/creator/${a.id}`);

  const handlePreview = a => {
    setSelectedAssessment(transformAssessmentForPreview(a));
    setIsPreviewOpen(true);
  };

  const handleLearnerPreview = a => {
    setSelectedAssessment(transformAssessmentForPreview(a));
    setIsLearnerPreviewOpen(true);
  };

  const handleDelete = a => {
    setAssessmentToDelete(a);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!assessmentToDelete) return;
    const saved = JSON.parse(localStorage.getItem('assessments') || '[]');
    const updated = saved.filter(a => a.id !== assessmentToDelete.id);
    localStorage.setItem('assessments', JSON.stringify(updated));
    setAssessments(updated.filter(a => !a.moduleId || a.moduleId === moduleId));
    toast({
      title: 'Assessment Deleted',
      description: `"${assessmentToDelete.title}" has been removed.`,
    });
    setAssessmentToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleSave = creatorData => {
    const assessment = {
      id: creatorData.id.toString(),
      title: creatorData.title,
      description: creatorData.description,
      type: creatorData.assessmentType,
      status: creatorData.status,
      duration: `${creatorData.timeLimitMinutes} min`,
      blocks: (creatorData.questions || []).map((q, i) => ({
        id: q.id || `question_${i}`,
        type: q.type,
        content: {
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          points: q.points || 1,
          explanation: q.explanation,
        },
        order: i,
      })),
      settings: {
        title: creatorData.title,
        description: creatorData.description,
        timeLimitMinutes: creatorData.timeLimitMinutes,
        passingScore: creatorData.passingScore,
        attemptsAllowed: creatorData.attemptsAllowed,
        shuffleQuestions: false,
      },
      createdAt: creatorData.createdAt || new Date().toISOString(),
      moduleId,
    };

    const saved = JSON.parse(localStorage.getItem('assessments') || '[]');
    const exists = editingAssessment
      ? saved.map(a => (a.id === editingAssessment.id.toString() ? assessment : a))
      : [...saved, assessment];

    localStorage.setItem('assessments', JSON.stringify(exists));
    setAssessments(exists.filter(a => !a.moduleId || a.moduleId === moduleId));
    setIsCreatorOpen(false);
    setEditingAssessment(null);
  };

  const formatDate = d => new Date(d).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });

  return (
    <div className="container mx-auto py-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => navigate(`/courses/builder/${courseId}`)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">Assessments Builder</h1>
            <p className="text-muted-foreground">Module {moduleId} - Create and manage assessments</p>
          </div>
        </div>
        <Button onClick={handleAdd} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Assessment
        </Button>
      </div>

      {assessments.length > 0 ? (
        ['quiz', 'assignment', 'survey', 'essay', 'debate'].map(type => {
          const byType = assessments.filter(a =>
            a.type.toLowerCase() === type
          );
          if (byType.length === 0) return null;
          return (
            <div key={type} className="space-y-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold capitalize">{type} Section</h2>
                <Badge className="bg-blue-100 text-blue-800">{byType.length} items</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {byType.map(a => (
                  <Card key={a.id} className="hover:shadow-md transition-shadow cursor-pointer group border border-gray-200"
                        onClick={() => handleEdit(a)}
                  >
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                              <FileText className="h-4 w-4 text-blue-600" />
                            </div>
                            <span className="text-sm text-blue-600 font-medium">{a.type}</span>
                          </div>
                          <Badge className={a.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                            {a.status === 'published' ? 'Published' : 'Draft'}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {a.title}
                        </h3>
                        <p className="text-sm text-gray-600">{a.description || 'No description provided'}</p>
                        {a.createdAt && (
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Calendar className="h-4 w-4" />
                            <span>Created {formatDate(a.createdAt)}</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Questions: {a.blocks?.length || 0}</span>
                          <span>Time: {a.settings?.timeLimitMinutes || 30}m</span>
                        </div>
                        <div className="flex items-center justify-between pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="outline" size="sm" onClick={e => { e.stopPropagation(); handleLearnerPreview(a); }}>
                            <Eye className="h-3 w-3" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" onClick={e => { e.stopPropagation(); handleEdit(a); }}>
                            <Edit className="h-3 w-3" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" onClick={e => { e.stopPropagation(); handleDelete(a); }}
                                  className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <Card className="border-dashed border-2">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No assessments yet</h3>
            <p className="text-muted-foreground mb-4">Create your first assessment to evaluate student learning.</p>
            <Button onClick={handleAdd} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create First Assessment
            </Button>
          </CardContent>
        </Card>
      )}

      <AssessmentCreator
        open={isCreatorOpen}
        onOpenChange={setIsCreatorOpen}
        onSave={handleSave}
        editingAssessment={editingAssessment}
      />

      <AssessmentPreview
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        assessment={selectedAssessment}
      />

      <AssessmentLearnerPreview
        open={isLearnerPreviewOpen}
        onOpenChange={setIsLearnerPreviewOpen}
        assessment={selectedAssessment}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Assessment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{assessmentToDelete?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AssessmentsBuilder;
