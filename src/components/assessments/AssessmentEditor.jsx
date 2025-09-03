import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, Upload, Edit, BarChart, MessageSquare, ArrowRight, ArrowUp, ArrowDown, Trash2, Link } from 'lucide-react';
import  QuestionEditModal  from './QuestionEditModal';
import { SubmissionBlockEditModal } from './SubmissionBlockEditModal';
import { DebateEditModal } from './DebateEditModal';
import { DebateAnswerSection } from './DebateAnswerSection';
import { AssessmentInstructionsEditor } from './AssessmentInstructionsEditor';

export const AssessmentEditor = ({ 
  onSave, 
  onPreview, 
  settings, 
  initialBlocks, 
  assessmentTitle, 
  onTitleChange,
  selectedType,
  onTypeSelect,
  activeTab,
  instructions: initialInstructions = [],
  onUpdateInstructions
}) => {
  const [blocks, setBlocks] = useState(initialBlocks);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSubmission, setEditingSubmission] = useState(null);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [editingDebate, setEditingDebate] = useState(null);
  const [isDebateModalOpen, setIsDebateModalOpen] = useState(false);
  const [instructions, setInstructions] = useState(initialInstructions);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showQuestions, setShowQuestions] = useState(false);

  useEffect(() => {
    setBlocks(initialBlocks);
  }, [initialBlocks]);

  useEffect(() => {
    setInstructions(initialInstructions);
  }, [initialInstructions]);

  useEffect(() => {
    if (selectedType === 'quiz' || selectedType === 'assignment' || selectedType === 'survey' || selectedType === 'essay' || selectedType === 'debate') {
      setShowInstructions(true);
      setShowQuestions(false);
    }
  }, [selectedType]);

  const hasInstructions = instructions.length > 0;

  const handleUpdateInstructions = (newInstructions) => {
    setInstructions(newInstructions);
    if (onUpdateInstructions) {
      onUpdateInstructions(newInstructions);
    }
  };

  useEffect(() => {
    window.addAssessmentBlock = (blockType) => {
      if (blockType === 'submission') {
        const hasSubmission = blocks.some(block => block.type === 'submission');
        if (hasSubmission) {
          const submissionBlock = blocks.find(block => block.type === 'submission');
          if (submissionBlock) {
            const index = blocks.findIndex(block => block.type === 'submission');
            setEditingSubmission({ ...submissionBlock, index });
            setIsSubmissionModalOpen(true);
          }
          return;
        }
      }
      
      const newBlock = {
        id: `block_${Date.now()}`,
        type: blockType,
        content: getDefaultContent(blockType),
        order: blocks.length
      };
      
      const updatedBlocks = [...blocks, newBlock];
      setBlocks(updatedBlocks);
      onSave(updatedBlocks, assessmentTitle);
    };

    window.hasSubmissionBlock = () => {
      return blocks.some(block => block.type === 'submission');
    };

    window.editSubmissionBlock = () => {
      const submissionBlock = blocks.find(block => block.type === 'submission');
      if (submissionBlock) {
        const index = blocks.findIndex(block => block.type === 'submission');
        setEditingSubmission({ ...submissionBlock, index });
        setIsSubmissionModalOpen(true);
      }
    };

    window.editInstructions = () => {
      setShowInstructions(true);
      setShowQuestions(false);
    };

    window.getCurrentPreviewData = () => {
      if (showInstructions) {
        return {
          title: assessmentTitle,
          description: settings.description,
          instructions: instructions,
          settings: settings,
          isInstructionsOnly: true
        };
      } else {
        return {
          title: assessmentTitle,
          description: settings.description,
          blocks: blocks,
          settings: settings,
          isInstructionsOnly: false
        };
      }
    };

    return () => {
      delete window.addAssessmentBlock;
      delete window.hasSubmissionBlock;
      delete window.editSubmissionBlock;
      delete window.editInstructions;
      delete window.getCurrentPreviewData;
    };
  }, [blocks, assessmentTitle, onSave, instructions, settings, showInstructions]);

  const handleMoveUp = (index) => {
    if (index > 0) {
      const newBlocks = [...blocks];
      [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]];
      setBlocks(newBlocks);
      onSave(newBlocks, assessmentTitle);
    }
  };

  const handleMoveDown = (index) => {
    if (index < blocks.length - 1) {
      const newBlocks = [...blocks];
      [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
      setBlocks(newBlocks);
      onSave(newBlocks, assessmentTitle);
    }
  };

  const handleEdit = (index) => {
    const blockToEdit = blocks[index];
    
    if (blockToEdit.type === 'submission') {
      setEditingSubmission({ ...blockToEdit, index });
      setIsSubmissionModalOpen(true);
    } else if (blockToEdit.type === 'debate') {
      setEditingDebate({ ...blockToEdit, index });
      setIsDebateModalOpen(true);
    } else {
      setEditingQuestion({ ...blockToEdit, index });
      setIsEditModalOpen(true);
    }
  };

  const handleSaveEditedQuestion = (updatedQuestion) => {
    const newBlocks = [...blocks];
    newBlocks[updatedQuestion.index] = {
      ...updatedQuestion,
      index: undefined
    };
    setBlocks(newBlocks);
    onSave(newBlocks, assessmentTitle);
    setEditingQuestion(null);
  };

  const handleSaveEditedSubmission = (submissionData) => {
    const newBlocks = [...blocks];
    const submissionBlock = {
      ...newBlocks[editingSubmission.index],
      content: submissionData
    };
    newBlocks[editingSubmission.index] = submissionBlock;
    setBlocks(newBlocks);
    onSave(newBlocks, assessmentTitle);
    setEditingSubmission(null);
  };

  const handleSaveEditedDebate = (updatedDebate) => {
    const newBlocks = [...blocks];
    newBlocks[updatedDebate.index] = {
      ...updatedDebate,
      index: undefined
    };
    setBlocks(newBlocks);
    onSave(newBlocks, assessmentTitle);
    setEditingDebate(null);
  };

  const handleDebateAnswerSubmit = (answer) => {
    console.log('Debate answer submitted:', answer);
  };

  const handleDelete = (index) => {
    const newBlocks = blocks.filter((_, i) => i !== index);
    setBlocks(newBlocks);
    onSave(newBlocks, assessmentTitle);
  };

  const getDefaultContent = (blockType) => {
    switch (blockType) {
      case 'mcq':
        return {
          question: 'Enter your multiple choice question here',
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: [0],
          points: 1
        };
      case 'scq':
        return {
          question: 'Enter your single choice question here',
          options: ['Option A', 'Option B', 'Option C'],
          correctAnswer: 0,
          points: 1
        };
      case 'truefalse':
        return {
          question: 'Enter your true/false statement here',
          correctAnswer: true,
          points: 1
        };
      case 'fillup':
        return {
          question: 'Enter your question with _____ blanks',
          correctAnswers: ['answer'],
          points: 1
        };
      case 'matching':
        return {
          question: 'Match the following pairs',
          leftColumn: ['Item 1', 'Item 2'],
          rightColumn: ['Match A', 'Match B'],
          correctPairs: { '0': '0', '1': '1' },
          points: 2
        };
      case 'oneword':
        return {
          question: 'Enter your one-word question here',
          correctAnswer: 'answer',
          points: 1
        };
      case 'descriptive':
        return {
          question: 'Enter your descriptive question here',
          minWords: 50,
          maxWords: 200,
          points: 5
        };
      case 'submission':
        return {
          questionText: 'Upload your assignment files',
          submissionType: 'drive-link',
          driveLink: '',
          textSubmission: '',
          notes: ''
        };
      case 'debate':
        return {
          topic: 'Enter your debate topic here',
          description: 'Provide context and background for the debate',
          position: 'for',
          timeLimit: 30,
          points: 10
        };
      default:
        return {};
    }
  };

  const handleContinueToQuestions = () => {
    if (hasInstructions) {
      setShowInstructions(false);
      setShowQuestions(true);
    }
  };

  const assessmentTypes = [
    {
      id: 'quiz',
      title: 'Quiz Section',
      description: 'Test your knowledge with various question formats',
      icon: FileText,
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600'
    },
    {
      id: 'assignment',
      title: 'Assignment Section',
      description: 'Submit projects and practical assignments',
      icon: Upload,
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600'
    },
    {
      id: 'essay',
      title: 'Essay Section',
      description: 'Write detailed essays and analytical pieces',
      icon: Edit,
      color: 'bg-purple-50 border-purple-200',
      iconColor: 'text-purple-600'
    },
    {
      id: 'survey',
      title: 'Survey Section',
      description: 'Participate in course feedback and surveys',
      icon: BarChart,
      color: 'bg-yellow-50 border-yellow-200',
      iconColor: 'text-yellow-600'
    },
    {
      id: 'debate',
      title: 'Debate Section',
      description: 'Engage in structured debates and discussions',
      icon: MessageSquare,
      color: 'bg-red-50 border-red-200',
      iconColor: 'text-red-600'
    }
  ];

  const getInstructionContent = (type) => {
    const instructionMap = {
      assignment: {
        title: 'Assignment Section Instructions',
        content: 'Create assignments where students can submit projects and practical work. You can set file upload requirements, submission deadlines, and grading criteria.'
      },
      essay: {
        title: 'Essay Section Instructions', 
        content: 'Design essay questions that require detailed written responses. Set word limits, provide writing prompts, and establish evaluation criteria for comprehensive assessment.'
      },
      survey: {
        title: 'Survey Section Instructions',
        content: 'Build surveys to collect feedback and opinions from students. Create rating scales, opinion questions, and feedback forms to gather valuable insights.'
      },
      debate: {
        title: 'Debate Section Instructions',
        content: 'Facilitate structured debates and discussions. Set topics, assign positions, and create guidelines for constructive academic discourse and critical thinking.'
      }
    };

    return instructionMap[type] || { title: 'Instructions', content: 'Select an assessment type to get started.' };
  };

  const renderBlockContent = (block, index) => {
    if (block.type === 'submission') {
      return (
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-500">Submission Block</span>
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
              SUBMISSION
            </span>
          </div>
          <p className="text-gray-900 font-medium mb-2">{block.content.questionText}</p>
          {block.content.submissionType === 'drive-link' && block.content.driveLink && (
            <div className="text-sm text-blue-600 flex items-center gap-1 mb-2">
              <Link className="h-4 w-4" />
              <span>Drive Link: {block.content.driveLink}</span>
            </div>
          )}
          {block.content.submissionType === 'text-submission' && (
            <div className="text-sm text-gray-600 mb-2">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                <div className="text-sm text-gray-500 text-center">
                  Text submission area
                </div>
              </div>
            </div>
          )}
          {block.content.notes && (
            <div className="text-sm text-gray-600 mt-2">
              <strong>Notes:</strong> {block.content.notes}
            </div>
          )}
        </div>
      );
    }

    if (block.type === 'debate') {
      return (
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-500">Debate {index + 1}</span>
            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
              DEBATE
            </span>
          </div>
          <p className="text-gray-900 font-medium mb-2">{block.content.topic}</p>
          {block.content.description && (
            <div className="text-sm text-gray-600 mb-2">
              {block.content.description}
            </div>
          )}
          <div className="text-sm text-gray-600">
            <strong>Position:</strong> {block.content.position === 'for' ? 'Supporting' : 'Opposing'}
          </div>
          <div className="text-sm text-gray-600">
            <strong>Preparation Time:</strong> {block.content.timeLimit} minutes
          </div>
        </div>
      );
    }

    const questionBlocks = blocks.filter(b => b.type !== 'submission');
    const questionIndex = questionBlocks.findIndex(b => b.id === block.id);
    const questionNumber = questionIndex + 1;

    const renderQuestionPreview = () => {
      switch (block.type) {
        case 'mcq':
          return (
            <div className="mt-3 space-y-2">
              {block.content.options?.map((option, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Checkbox disabled className="h-4 w-4" />
                  <span className="text-sm text-gray-700">{option}</span>
                </div>
              ))}
            </div>
          );

        case 'scq':
          return (
            <div className="mt-3 space-y-2">
              {block.content.options?.map((option, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded-full bg-white"></div>
                  <span className="text-sm text-gray-700">{option}</span>
                </div>
              ))}
            </div>
          );

        case 'truefalse':
          return (
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-gray-300 rounded-full bg-white"></div>
                <span className="text-sm text-gray-700">True</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-gray-300 rounded-full bg-white"></div>
                <span className="text-sm text-gray-700">False</span>
              </div>
            </div>
          );

        case 'fillup':
          const questionWithBlanks = block.content.question?.replace(/____+/g, '_____') || block.content.question;
          return (
            <div className="mt-3">
              <div className="text-sm text-gray-700 mb-2">
                {questionWithBlanks?.split('_____').map((part, idx, arr) => (
                  <span key={idx}>
                    {part}
                    {idx < arr.length - 1 && (
                      <span className="inline-block border-b-2 border-blue-500 min-w-[80px] mx-1 pb-1"></span>
                    )}
                  </span>
                ))}
              </div>
              {block.content.correctAnswers && (
                <div className="text-xs text-gray-500">
                  Expected: {block.content.correctAnswers.join(', ')}
                </div>
              )}
            </div>
          );

        case 'matching':
          return (
            <div className="mt-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-medium text-gray-500 mb-2">Items to Match</div>
                  <div className="space-y-2">
                    {block.content.leftColumn?.map((item, idx) => (
                      <div key={idx} className="text-sm text-gray-700 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <span className="font-medium">{idx + 1}.</span> {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-500 mb-2">Match Options</div>
                  <div className="space-y-2">
                    {block.content.rightColumn?.map((match, idx) => (
                      <div key={idx} className="text-sm text-gray-700 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <span className="font-medium">{String.fromCharCode(65 + idx)}.</span> {match}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-gray-600">
                <strong>Instructions:</strong> Match each item on the left with the correct option on the right
              </div>
            </div>
          );

        case 'oneword':
          return (
            <div className="mt-3">
              <Input 
                placeholder="Type your answer here" 
                disabled 
                className="bg-gray-50 text-gray-500"
              />
              {block.content.correctAnswer && (
                <div className="text-xs text-gray-500 mt-1">
                  Expected: {block.content.correctAnswer}
                </div>
              )}
            </div>
          );

        case 'descriptive':
          return (
            <div className="mt-3">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                <div className="text-sm text-gray-500 text-center">
                  Multi-line answer area
                </div>
                <div className="text-xs text-gray-400 text-center mt-1">
                  {block.content.minWords && block.content.maxWords 
                    ? `${block.content.minWords} - ${block.content.maxWords} words`
                    : 'Descriptive answer expected'}
                </div>
              </div>
            </div>
          );

        default:
          return (
            <div className="mt-3 space-y-1">
              {block.content.options?.map((option, idx) => (
                <div key={idx} className="text-sm text-gray-600">
                  {String.fromCharCode(65 + idx)}. {option}
                </div>
              ))}
            </div>
          );
      }
    };

    return (
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium text-gray-500">Question {questionNumber}</span>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
            {block.type.toUpperCase()}
          </span>
        </div>
        <p className="text-gray-900 font-medium mb-2">{block.content.question}</p>
        {renderQuestionPreview()}
      </div>
    );
  };

  if (activeTab === 'types' && !selectedType) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Assessment</h2>
          <p className="text-gray-600">Choose the type of assessment you want to create</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assessmentTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Card 
                key={type.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${type.color}`}
                onClick={() => onTypeSelect(type.id)}
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center ${type.iconColor}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg mb-2">{type.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{type.description}</p>
                      <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                        Get Started <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  if (activeTab === 'instructions' && selectedType && selectedType !== 'quiz' && selectedType !== 'assignment' && selectedType !== 'survey' && selectedType !== 'essay' && selectedType !== 'debate') {
    const instruction = getInstructionContent(selectedType);
    return (
      <div className="max-w-4xl mx-auto py-8 px-6">
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{instruction.title}</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">{instruction.content}</p>
              <Button 
                onClick={() => {
                  alert(`${selectedType} assessment type selected! Feature implementation coming soon.`);
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Continue Setup
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if ((selectedType === 'quiz' || selectedType === 'assignment' || selectedType === 'survey' || selectedType === 'essay' || selectedType === 'debate') && showInstructions) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-6 space-y-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {selectedType === 'quiz' ? 'Quiz' : selectedType === 'assignment' ? 'Assignment' : selectedType === 'essay' ? 'Essay' : selectedType === 'debate' ? 'Debate' : 'Survey'} Instructions
          </h2>
          <p className="text-gray-600">
            Add instructions for your {selectedType}
          </p>
        </div>

        <AssessmentInstructionsEditor
          instructions={instructions}
          onUpdateInstructions={handleUpdateInstructions}
        />

        <div className="flex justify-end">
          <Button 
            onClick={handleContinueToQuestions}
            disabled={!hasInstructions}
            className={hasInstructions ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}
            title={!hasInstructions ? "Please add at least one instruction before proceeding" : ""}
          >
            Continue to Questions
          </Button>
        </div>
      </div>
    );
  }

  if ((selectedType === 'quiz' || selectedType === 'assignment' || selectedType === 'survey' || selectedType === 'essay' || selectedType === 'debate') && showQuestions) {
    return (
      <>
        <div className="max-w-4xl mx-auto py-8 px-6 space-y-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {selectedType === 'quiz' ? 'Quiz' : selectedType === 'assignment' ? 'Assignment' : selectedType === 'essay' ? 'Essay' : selectedType === 'debate' ? 'Debate' : 'Survey'} Builder
            </h2>
            <p className="text-gray-600">
              Add questions to your {selectedType} using the sidebar
            </p>
          </div>

          {blocks.length === 0 ? (
            <Card className="border-dashed border-2 border-gray-300">
              <CardContent className="p-12 text-center">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No {selectedType === 'debate' ? 'debates' : 'questions'} added yet</h3>
                <p className="text-gray-600">
                  Use the sidebar to add {selectedType === 'debate' ? 'debate topics' : 'different types of questions'} to your {selectedType}.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {selectedType === 'quiz' ? 'Quiz' : selectedType === 'assignment' ? 'Assignment' : selectedType === 'essay' ? 'Essay' : selectedType === 'debate' ? 'Debate' : 'Survey'} {selectedType === 'debate' ? 'Topics' : 'Questions'}
              </h3>
              {blocks.map((block, index) => (
                <div key={block.id}>
                  <Card className="border border-gray-200 group hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        {renderBlockContent(block, index)}
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-gray-500 mr-4">
                            {block.content.points || 1} pts
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleMoveUp(index)}
                              disabled={index === 0}
                              className="h-8 w-8"
                              title="Move Up"
                            >
                              <ArrowUp className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleMoveDown(index)}
                              disabled={index === blocks.length - 1}
                              className="h-8 w-8"
                              title="Move Down"
                            >
                              <ArrowDown className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(index)}
                              className="h-8 w-8"
                              title="Edit"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(index)}
                              className="h-8 w-8 text-red-600 hover:text-red-700"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {block.type === 'debate' && (
                    <DebateAnswerSection 
                      debate={block}
                      onSubmit={handleDebateAnswerSubmit}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <QuestionEditModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingQuestion(null);
          }}
          question={editingQuestion}
          onSave={handleSaveEditedQuestion}
        />

        <SubmissionBlockEditModal
          isOpen={isSubmissionModalOpen}
          onClose={() => {
            setIsSubmissionModalOpen(false);
            setEditingSubmission(null);
          }}
          onSave={handleSaveEditedSubmission}
          initialData={editingSubmission?.content}
        />

        <DebateEditModal
          isOpen={isDebateModalOpen}
          onClose={() => {
            setIsDebateModalOpen(false);
            setEditingDebate(null);
          }}
          debate={editingDebate}
          onSave={handleSaveEditedDebate}
        />
      </>
    );
  }

  if (selectedType && selectedType !== 'quiz' && selectedType !== 'assignment' && selectedType !== 'survey' && selectedType !== 'essay' && selectedType !== 'debate') {
    return (
      <div className="max-w-4xl mx-auto py-8 px-6 space-y-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Builder</h2>
          <p className="text-gray-600">Configure your {selectedType} assessment</p>
        </div>

        <AssessmentInstructionsEditor
          instructions={instructions}
          onUpdateInstructions={handleUpdateInstructions}
        />

        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-12 text-center">
            <div className="text-gray-500">
              <p className="mb-2">{selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} configuration coming soon</p>
              <p className="text-sm">Continue building your assessment instructions above</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};