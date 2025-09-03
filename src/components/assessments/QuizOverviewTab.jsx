import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Edit, Save, X, Clock, RotateCcw, Target, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';

export const QuizOverviewTab = ({ quiz, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    ...quiz,
    instructions: quiz.instructions || [
      'Read all questions carefully before answering.',
      'Answer all questions to the best of your ability.',
      'Take your time to think about each question before responding.',
      'Ensure you complete the quiz within the given time limit.',
      'Submit your responses only when you are satisfied with your answers.'
    ]
  });

  const handleSave = () => {
    const updatedQuiz = {
      ...quiz,
      ...editData
    };
    onUpdate(updatedQuiz);
    setIsEditing(false);
    toast.success('Quiz details updated successfully!');
  };

  const handleCancel = () => {
    setEditData({
      ...quiz,
      instructions: quiz.instructions || [
        'Read all questions carefully before answering.',
        'Answer all questions to the best of your ability.',
        'Take your time to think about each question before responding.',
        'Ensure you complete the quiz within the given time limit.',
        'Submit your responses only when you are satisfied with your answers.'
      ]
    });
    setIsEditing(false);
  };

  const addInstruction = () => {
    setEditData({
      ...editData,
      instructions: [...editData.instructions, '']
    });
  };

  const removeInstruction = (index) => {
    setEditData({
      ...editData,
      instructions: editData.instructions.filter((_, i) => i !== index)
    });
  };

  const updateInstruction = (index, value) => {
    const newInstructions = [...editData.instructions];
    newInstructions[index] = value;
    setEditData({
      ...editData,
      instructions: newInstructions
    });
  };

  const currentInstructions = editData.instructions || [
    'Read all questions carefully before answering.',
    'Answer all questions to the best of your ability.',
    'Take your time to think about each question before responding.',
    'Ensure you complete the quiz within the given time limit.',
    'Submit your responses only when you are satisfied with your answers.'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Quiz Overview</h3>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit Quiz Details
          </Button>
        )}
      </div>

      {/* Quiz Details Card */}
      <Card>
        <CardHeader>
          <CardTitle>Quiz Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Quiz Title</label>
                <Input
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  placeholder="Enter quiz title"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  placeholder="Enter quiz description"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Time Limit (minutes)</label>
                  <Input
                    type="number"
                    value={editData.timeLimit}
                    onChange={(e) => setEditData({ ...editData, timeLimit: parseInt(e.target.value) })}
                    placeholder="30"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Number of Attempts</label>
                  <Input
                    value={editData.attempts}
                    onChange={(e) => setEditData({ ...editData, attempts: e.target.value })}
                    placeholder="unlimited or number"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Minimum Score</label>
                  <Input
                    type="number"
                    value={editData.minScore}
                    onChange={(e) => setEditData({ ...editData, minScore: parseInt(e.target.value) })}
                    placeholder="60"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Maximum Score</label>
                  <Input
                    type="number"
                    value={editData.maxScore}
                    onChange={(e) => setEditData({ ...editData, maxScore: parseInt(e.target.value) })}
                    placeholder="100"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button onClick={handleCancel} variant="outline">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">{quiz.title}</h4>
                <p className="text-gray-600 mt-1">{quiz.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Time Limit</p>
                    <p className="text-sm text-gray-600">{quiz.timeLimit} minutes</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Attempts</p>
                    <p className="text-sm text-gray-600">{quiz.attempts}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium">Questions</p>
                    <p className="text-sm text-gray-600">{quiz.questions}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div>
                    <p className="text-sm font-medium">Score Range</p>
                    <p className="text-sm text-gray-600">{quiz.minScore || 60} - {quiz.maxScore || 100}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge className={quiz.type === 'final' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}>
                  {quiz.type === 'final' ? 'Final Quiz' : 'General Quiz'}
                </Badge>
                <Badge className="bg-gray-100 text-gray-800">{quiz.difficulty}</Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Instructions Section */}
      <Card>
        <CardHeader>
          <CardTitle>Quiz Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-medium">Instructions</h5>
                <Button onClick={addInstruction} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Instruction
                </Button>
              </div>
              {editData.instructions.map((instruction, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-sm font-medium text-gray-500 mt-2 min-w-[20px]">{index + 1}.</span>
                  <Textarea
                    value={instruction}
                    onChange={(e) => updateInstruction(index, e.target.value)}
                    placeholder="Enter instruction"
                    rows={2}
                    className="flex-1"
                  />
                  <Button
                    onClick={() => removeInstruction(index)}
                    variant="outline"
                    size="sm"
                    className="mt-1 text-red-600 hover:text-red-700"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <ol className="space-y-3">
              {currentInstructions.map((instruction, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-sm font-medium text-blue-600 min-w-[20px]">{index + 1}.</span>
                  <p className="text-gray-700">{instruction}</p>
                </li>
              ))}
            </ol>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
