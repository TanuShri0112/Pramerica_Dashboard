import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Plus, Trash2, Save, FileText, ArrowLeft, Eye } from 'lucide-react';
import AssessmentLearnerPreview from './AssessmentLearnerPreview';

const QuestionBuilder = ({ 
  assessmentType, 
  onSave, 
  onPublish,
  onCancel,
  initialQuestions = [],
  initialTimeLimit = 15
}) => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(initialTimeLimit);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({
    type: assessmentType,
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    points: 1,
    timeLimit: 60,
    explanation: ''
  });

  useEffect(() => {
    setQuestions(initialQuestions);
    setTimeLimitMinutes(initialTimeLimit);
  }, [initialQuestions, initialTimeLimit]);

  const addOption = () => {
    if (currentQuestion.options && currentQuestion.options.length < 6) {
      setCurrentQuestion(prev => ({
        ...prev,
        options: [...(prev.options || []), '']
      }));
    }
  };

  const removeOption = (index) => {
    if (currentQuestion.options && currentQuestion.options.length > 2) {
      setCurrentQuestion(prev => ({
        ...prev,
        options: prev.options?.filter((_, i) => i !== index)
      }));
    }
  };

  const updateOption = (index, value) => {
    setCurrentQuestion(prev => ({
      ...prev,
      options: prev.options?.map((opt, i) => i === index ? value : opt)
    }));
  };

  const addQuestion = () => {
    if (currentQuestion.question) {
      const newQuestion = {
        id: Date.now().toString(),
        type: currentQuestion.type || assessmentType,
        question: currentQuestion.question,
        options: currentQuestion.options?.filter(opt => opt.trim() !== ''),
        correctAnswer: currentQuestion.correctAnswer,
        points: currentQuestion.points || 1,
        timeLimit: currentQuestion.timeLimit,
        explanation: currentQuestion.explanation
      };

      setQuestions(prev => [...prev, newQuestion]);
      setCurrentQuestion({
        type: assessmentType,
        question: '',
        options: ['', '', '', ''],
        correctAnswer: '',
        points: 1,
        timeLimit: 60,
        explanation: ''
      });
    }
  };

  const deleteQuestion = (questionId) => {
    setQuestions(prev => prev.filter(q => q.id !== questionId));
  };

  const handlePreview = () => {
    if (questions.length === 0) {
      alert('Please add at least one question before previewing');
      return;
    }
    setIsPreviewOpen(true);
  };

  const previewAssessment = {
    title: `${assessmentType} Preview`,
    description: 'This is a preview of your assessment as learners will see it.',
    assessmentType,
    questions,
    timeLimitMinutes,
    status: 'draft',
    passingScore: 70
  };

  const renderQuestionForm = () => {
    switch (assessmentType.toLowerCase()) {
      case 'multiple choice quiz':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="question">Question</Label>
              <Textarea
                id="question"
                value={currentQuestion.question}
                onChange={(e) => setCurrentQuestion(prev => ({...prev, question: e.target.value}))}
                placeholder="Enter your question here..."
              />
            </div>

            <div>
              <Label>Answer Options</Label>
              <div className="space-y-2">
                {currentQuestion.options?.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeOption(index)}
                      disabled={currentQuestion.options?.length === 2}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addOption}
                  disabled={currentQuestion.options?.length === 6}
                >
                  <Plus className="h-4 w-4" /> Add Option
                </Button>
              </div>
            </div>

            <div>
              <Label>Correct Answer</Label>
              <RadioGroup
                value={currentQuestion.correctAnswer}
                onValueChange={(value) => setCurrentQuestion(prev => ({...prev, correctAnswer: value}))}
              >
                {currentQuestion.options?.map((option, index) => (
                  option.trim() && (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`}>{option}</Label>
                    </div>
                  )
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case 'true/false test':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="question">Statement</Label>
              <Textarea
                id="question"
                value={currentQuestion.question}
                onChange={(e) => setCurrentQuestion(prev => ({...prev, question: e.target.value}))}
                placeholder="Enter the statement to evaluate..."
              />
            </div>

            <div>
              <Label>Correct Answer</Label>
              <RadioGroup
                value={currentQuestion.correctAnswer}
                onValueChange={(value) => setCurrentQuestion(prev => ({...prev, correctAnswer: value}))}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="true" />
                  <Label htmlFor="true">True</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="false" />
                  <Label htmlFor="false">False</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 'fill in the blanks':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="question">Question Text</Label>
              <Textarea
                id="question"
                value={currentQuestion.question}
                onChange={(e) => setCurrentQuestion(prev => ({...prev, question: e.target.value}))}
                placeholder="Enter the text with blanks marked as [blank] or ___"
              />
              <p className="text-sm text-gray-500 mt-1">
                Use [blank] or ___ to mark where students should fill in answers
              </p>
            </div>

            <div>
              <Label htmlFor="correctAnswer">Correct Answers (comma separated)</Label>
              <Input
                id="correctAnswer"
                value={currentQuestion.correctAnswer}
                onChange={(e) => setCurrentQuestion(prev => ({...prev, correctAnswer: e.target.value}))}
                placeholder="answer1, answer2, answer3"
              />
            </div>
          </div>
        );

      case 'essay writing':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="question">Essay Prompt</Label>
              <Textarea
                id="question"
                value={currentQuestion.question}
                onChange={(e) => setCurrentQuestion(prev => ({...prev, question: e.target.value}))}
                placeholder="Enter the essay question or prompt..."
                className="min-h-[100px]"
              />
            </div>

            <div>
              <Label htmlFor="wordLimit">Word Limit (optional)</Label>
              <Input
                id="wordLimit"
                type="number"
                placeholder="e.g., 500"
              />
            </div>

            <div>
              <Label htmlFor="rubric">Grading Rubric</Label>
              <Textarea
                id="rubric"
                placeholder="Define grading criteria and point distribution..."
              />
            </div>
          </div>
        );

      case 'assignment upload':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="question">Assignment Instructions</Label>
              <Textarea
                id="question"
                value={currentQuestion.question}
                onChange={(e) => setCurrentQuestion(prev => ({...prev, question: e.target.value}))}
                placeholder="Provide detailed instructions for the assignment..."
                className="min-h-[120px]"
              />
            </div>

            <div>
              <Label htmlFor="fileTypes">Allowed File Types</Label>
              <Input
                id="fileTypes"
                placeholder="e.g., pdf, doc, docx, txt"
              />
            </div>

            <div>
              <Label htmlFor="maxFileSize">Maximum File Size (MB)</Label>
              <Input
                id="maxFileSize"
                type="number"
                placeholder="e.g., 10"
              />
            </div>
          </div>
        );

      case 'project submission':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="question">Project Requirements</Label>
              <Textarea
                id="question"
                value={currentQuestion.question}
                onChange={(e) => setCurrentQuestion(prev => ({...prev, question: e.target.value}))}
                placeholder="Describe the project requirements and deliverables..."
                className="min-h-[120px]"
              />
            </div>

            <div>
              <Label htmlFor="deliverables">Required Deliverables</Label>
              <Textarea
                placeholder="List the required project deliverables..."
              />
            </div>

            <div>
              <Label htmlFor="submissionFormat">Submission Format</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select submission format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zip">ZIP Archive</SelectItem>
                  <SelectItem value="folder">Folder Structure</SelectItem>
                  <SelectItem value="individual">Individual Files</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'live proctored exam':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="question">Exam Instructions</Label>
              <Textarea
                id="question"
                value={currentQuestion.question}
                onChange={(e) => setCurrentQuestion(prev => ({...prev, question: e.target.value}))}
                placeholder="Provide exam instructions and guidelines..."
                className="min-h-[120px]"
              />
            </div>

            <div>
              <Label htmlFor="proctorRequirements">Proctoring Requirements</Label>
              <Textarea
                placeholder="Specify proctoring requirements (camera, microphone, screen recording, etc.)"
              />
            </div>

            <div>
              <Label htmlFor="examDuration">Exam Duration (minutes)</Label>
              <Input
                id="examDuration"
                type="number"
                placeholder="e.g., 120"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="question">Question</Label>
              <Textarea
                id="question"
                value={currentQuestion.question}
                onChange={(e) => setCurrentQuestion(prev => ({...prev, question: e.target.value}))}
                placeholder="Enter your question here..."
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Assessment Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="assessmentTimeLimit">Assessment Time Limit (minutes)</Label>
              <Input
                id="assessmentTimeLimit"
                type="number"
                value={timeLimitMinutes}
                onChange={(e) => setTimeLimitMinutes(parseInt(e.target.value) || 15)}
                min="1"
                max="180"
              />
              <p className="text-sm text-gray-500 mt-1">
                Total time allowed for the entire assessment
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Create New Question - {assessmentType}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {renderQuestionForm()}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="points">Points</Label>
              <Input
                id="points"
                type="number"
                value={currentQuestion.points}
                onChange={(e) => setCurrentQuestion(prev => ({...prev, points: parseInt(e.target.value) || 1}))}
                min="1"
              />
            </div>
            <div>
              <Label htmlFor="timeLimit">Time Limit (seconds)</Label>
              <Input
                id="timeLimit"
                type="number"
                value={currentQuestion.timeLimit}
                onChange={(e) => setCurrentQuestion(prev => ({...prev, timeLimit: parseInt(e.target.value) || 60}))}
                min="10"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="explanation">Explanation (optional)</Label>
            <Textarea
              id="explanation"
              value={currentQuestion.explanation}
              onChange={(e) => setCurrentQuestion(prev => ({...prev, explanation: e.target.value}))}
              placeholder="Provide explanation for the correct answer..."
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={addQuestion}>
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </div>
        </CardContent>
      </Card>

      {questions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Questions Added ({questions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {questions.map((question, index) => (
                <div key={question.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">Question {index + 1}</h4>
                    <p className="text-sm text-gray-600 truncate">{question.question}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                      <span>{question.points} points</span>
                      <span>{question.timeLimit}s</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteQuestion(question.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={onCancel} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Details
        </Button>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handlePreview} 
            disabled={questions.length === 0}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            Preview Assessment
          </Button>
          <Button 
            variant="outline" 
            onClick={() => onSave(questions, timeLimitMinutes)} 
            disabled={questions.length === 0}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Save as Draft
          </Button>
          {onPublish && (
            <Button 
              onClick={() => onPublish(questions, timeLimitMinutes)} 
              disabled={questions.length === 0}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Publish Assessment
            </Button>
          )}
        </div>
      </div>

      <AssessmentLearnerPreview
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        assessment={previewAssessment}
      />
    </div>
  );
};

export default QuestionBuilder;