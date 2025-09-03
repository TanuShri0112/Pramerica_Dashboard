import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Edit, Save, X, Clock, Target, Plus, Minus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const AssignmentOverviewTab = ({ assignment, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    ...assignment,
    instructions: assignment.instructions || [
      'Read the assignment requirements carefully before starting.',
      'You have 2 hours to complete this assignment once you begin.',
      'Submit your code files and documentation as required.',
      'Use proper coding standards and best practices.',
      'Test your implementation thoroughly before submission.',
      'Include comments to explain your code logic.',
      'Follow the project structure guidelines provided.',
      'You can attempt this assignment up to 3 times maximum.',
      'Late submissions will result in point deductions.',
      'Ensure all required files are included in your submission.'
    ]
  });

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      ...assignment,
      instructions: assignment.instructions || [
        'Read the assignment requirements carefully before starting.',
        'You have 2 hours to complete this assignment once you begin.',
        'Submit your code files and documentation as required.',
        'Use proper coding standards and best practices.',
        'Test your implementation thoroughly before submission.',
        'Include comments to explain your code logic.',
        'Follow the project structure guidelines provided.',
        'You can attempt this assignment up to 3 times maximum.',
        'Late submissions will result in point deductions.',
        'Ensure all required files are included in your submission.'
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

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const currentInstructions = editData.instructions || [
    'Read the assignment requirements carefully before starting.',
    'You have 2 hours to complete this assignment once you begin.',
    'Submit your code files and documentation as required.',
    'Use proper coding standards and best practices.',
    'Test your implementation thoroughly before submission.',
    'Include comments to explain your code logic.',
    'Follow the project structure guidelines provided.',
    'You can attempt this assignment up to 3 times maximum.',
    'Late submissions will result in point deductions.',
    'Ensure all required files are included in your submission.'
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Assignment Overview</h2>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit Assignment
          </Button>
        )}
      </div>

      {isEditing ? (
        <Card>
          <CardHeader>
            <CardTitle>Edit Assignment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Assignment Title</label>
              <Input
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                placeholder="Assignment title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Topic Name</label>
              <Input
                value={editData.topic}
                onChange={(e) => setEditData({ ...editData, topic: e.target.value })}
                placeholder="Assignment topic"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                placeholder="Assignment description"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Time Limit (minutes)</label>
                <Input
                  type="number"
                  value={editData.timeLimit}
                  onChange={(e) => setEditData({ ...editData, timeLimit: parseInt(e.target.value) })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Max Score</label>
                <Input
                  type="number"
                  value={editData.maxScore}
                  onChange={(e) => setEditData({ ...editData, maxScore: parseInt(e.target.value) })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Difficulty Level</label>
                <Select 
                  value={editData.difficulty} 
                  onValueChange={(value) => setEditData({ ...editData, difficulty: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium">Instructions</label>
                <Button onClick={addInstruction} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Instruction
                </Button>
              </div>
              {editData.instructions.map((instruction, index) => (
                <div key={index} className="flex items-start gap-3 mb-3">
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
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Assignment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{assignment.name}</h3>
                <p className="text-gray-600 text-sm">Assignment Title</p>
              </div>

              <div>
                <h4 className="font-medium">{assignment.topic}</h4>
                <p className="text-gray-600 text-sm">Topic Name</p>
              </div>

              <div>
                <p className="text-gray-700">{assignment.description}</p>
                <p className="text-gray-600 text-sm">Description</p>
              </div>

              <div className="flex items-center gap-2">
                <Badge className={getDifficultyColor(assignment.difficulty)}>
                  {assignment.difficulty}
                </Badge>
                <span className="text-gray-600 text-sm">Difficulty Level</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium">{assignment.timeLimit} minutes</p>
                    <p className="text-gray-600 text-xs">Time Limit</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium">{assignment.maxScore} points</p>
                    <p className="text-gray-600 text-xs">Max Score</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {currentInstructions.map((instruction, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-sm font-medium text-blue-600 min-w-[20px]">{index + 1}.</span>
                    <p className="text-gray-700">{instruction}</p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};