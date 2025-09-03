import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  MoreHorizontal,
  GripVertical,
  Edit,
  Trash2,
  Copy
} from 'lucide-react';

const QuestionOrderEditor = ({
  questions,
  onAddQuestion,
  onUpdateQuestion,
  onDeleteQuestion,
  onEditQuestion,
  onDuplicateQuestion,
  assessmentTitle
}) => {
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (e, questionId) => {
    setDraggedItem(questionId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();

    if (draggedItem === null) return;

    const draggedIndex = questions.findIndex((q) => q.id === draggedItem);
    if (draggedIndex === -1 || draggedIndex === dropIndex) return;

    // Add your reordering logic here (this is just a placeholder log)
    console.log(`Moving question from index ${draggedIndex} to ${dropIndex}`);

    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleEdit = (question) => {
    console.log('Edit question:', question);
    onEditQuestion(question);
  };

  const handleDuplicate = (question) => {
    console.log('Duplicate question:', question);
    onDuplicateQuestion(question);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {questions.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Your First Question</h2>
            <p className="text-gray-600 mb-8">
              Get started by selecting a question type from the sidebar. You can choose from multiple choice,
              true/false, short answer, essay, and fill in the blank questions.
            </p>
            <div className="text-sm text-gray-500">
              <p>👈 Select a question type from the sidebar to begin</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="p-8 border-b border-gray-200">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">QUESTION ORDER</h2>
              <div className="w-24 h-1 bg-gray-900 mb-6"></div>

              <div className="space-y-3">
                {questions.map((question, index) => (
                  <Card
                    key={question.id}
                    className="border border-gray-200"
                    draggable
                    onDragStart={(e) => handleDragStart(e, question.id)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={handleDragEnd}
                  >
                    <CardContent className="p-0">
                      <div className="flex items-center">
                        <div className="p-4 border-r border-gray-200 cursor-grab active:cursor-grabbing">
                          <GripVertical className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="flex-1 p-4">
                          <Input
                            value={question.title}
                            onChange={(e) => onUpdateQuestion(question.id, e.target.value)}
                            className="border-0 p-0 text-base font-normal focus-visible:ring-0 bg-transparent"
                            placeholder="Enter a question title here..."
                          />
                        </div>
                        <div className="p-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-5 w-5 text-gray-400" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEdit(question)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => onDeleteQuestion(question.id)}>
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDuplicate(question)}>
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 p-8">
            <div className="text-center text-gray-500">
              <p className="text-sm">Select a question to edit or add a new one</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default QuestionOrderEditor;
