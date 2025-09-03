import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export const AssignmentQuestionsTab = ({ assignment, onUpdate }) => {
  const [questions, setQuestions] = useState([
    { id: '1', text: 'Analyze the financial ratios for Company XYZ and provide insights on liquidity.', points: 15, type: 'Essay' },
    { id: '2', text: 'Calculate the working capital and explain its significance.', points: 10, type: 'Calculation' },
    { id: '3', text: 'Compare the debt-to-equity ratios of the past three years and analyze trends.', points: 20, type: 'Analysis' },
    { id: '4', text: 'Identify potential red flags in the cash flow statement.', points: 15, type: 'Essay' },
    { id: '5', text: 'Propose three recommendations to improve the company\'s financial position.', points: 25, type: 'Essay' },
    { id: '6', text: 'Calculate the return on investment (ROI) for the given data.', points: 10, type: 'Calculation' },
    { id: '7', text: 'Evaluate the effectiveness of the company\'s inventory management.', points: 15, type: 'Analysis' },
    { id: '8', text: 'Assess the impact of economic factors on the company\'s performance.', points: 20, type: 'Essay' }
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [newQuestion, setNewQuestion] = useState({ text: '', points: 10 });

  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

  const handleAddQuestion = () => {
    const question = {
      id: Date.now().toString(),
      text: newQuestion.text,
      points: newQuestion.points,
      type: 'Essay'
    };
    setQuestions([...questions, question]);
    setNewQuestion({ text: '', points: 10 });
    setIsDialogOpen(false);
    
    // Update assignment with new question count
    const updatedAssignment = { ...assignment, totalQuestions: questions.length + 1 };
    onUpdate(updatedAssignment);
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setNewQuestion({ text: question.text, points: question.points });
    setIsDialogOpen(true);
  };

  const handleUpdateQuestion = () => {
    if (editingQuestion) {
      setQuestions(questions.map(q => 
        q.id === editingQuestion.id 
          ? { ...q, text: newQuestion.text, points: newQuestion.points }
          : q
      ));
      setEditingQuestion(null);
      setNewQuestion({ text: '', points: 10 });
      setIsDialogOpen(false);
    }
  };

  const handleDeleteQuestion = (questionId) => {
    setQuestions(questions.filter(q => q.id !== questionId));
    
    // Update assignment with new question count
    const updatedAssignment = { ...assignment, totalQuestions: questions.length - 1 };
    onUpdate(updatedAssignment);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Assignment Questions</h2>
          <p className="text-gray-600">Total Points: {totalPoints} / {assignment.maxScore}</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingQuestion ? 'Edit Question' : 'Add New Question'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Question Text</label>
                <Textarea
                  value={newQuestion.text}
                  onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                  placeholder="Enter the question text..."
                  rows={4}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Points</label>
                <Input
                  type="number"
                  value={newQuestion.points}
                  onChange={(e) => setNewQuestion({ ...newQuestion, points: parseInt(e.target.value) })}
                  min={1}
                  max={50}
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={editingQuestion ? handleUpdateQuestion : handleAddQuestion}
                  disabled={!newQuestion.text.trim()}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {editingQuestion ? 'Update' : 'Add'} Question
                </Button>
                <Button 
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingQuestion(null);
                    setNewQuestion({ text: '', points: 10 });
                  }} 
                  variant="outline"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {questions.map((question, index) => (
          <Card key={question.id} className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">Question {index + 1}</span>
                    <span className="text-sm text-gray-600">({question.points} points)</span>
                  </div>
                  <p className="text-gray-700">{question.text}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button 
                    onClick={() => handleEditQuestion(question)}
                    variant="outline" 
                    size="sm"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    onClick={() => handleDeleteQuestion(question.id)}
                    variant="outline" 
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPoints !== assignment.maxScore && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <p className="text-yellow-800">
              <strong>Warning:</strong> Total points ({totalPoints}) doesn't match assignment max score ({assignment.maxScore}).
              Please adjust question points or assignment max score.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};