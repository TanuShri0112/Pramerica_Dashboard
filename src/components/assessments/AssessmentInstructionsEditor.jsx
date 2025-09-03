import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

const predefinedColors = [
  { name: 'Blue', bg: 'bg-blue-50', text: 'text-blue-800', value: 'blue' },
  { name: 'Green', bg: 'bg-green-50', text: 'text-green-800', value: 'green' },
  { name: 'Yellow', bg: 'bg-yellow-50', text: 'text-yellow-800', value: 'yellow' },
  { name: 'Red', bg: 'bg-red-50', text: 'text-red-800', value: 'red' },
  { name: 'Purple', bg: 'bg-purple-50', text: 'text-purple-800', value: 'purple' },
  { name: 'Orange', bg: 'bg-orange-50', text: 'text-orange-800', value: 'orange' },
  { name: 'Gray', bg: 'bg-gray-50', text: 'text-gray-800', value: 'gray' },
];

export const AssessmentInstructionsEditor = ({ instructions, onUpdateInstructions }) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newInstruction, setNewInstruction] = useState({
    title: '',
    points: [''],
    backgroundColor: 'blue'
  });

  const handleAddPoint = () => {
    setNewInstruction({
      ...newInstruction,
      points: [...newInstruction.points, '']
    });
  };

  const handleRemovePoint = (index) => {
    if (newInstruction.points.length > 1) {
      const updatedPoints = newInstruction.points.filter((_, i) => i !== index);
      setNewInstruction({
        ...newInstruction,
        points: updatedPoints
      });
    }
  };

  const handlePointChange = (index, value) => {
    const updatedPoints = [...newInstruction.points];
    updatedPoints[index] = value;
    setNewInstruction({
      ...newInstruction,
      points: updatedPoints
    });
  };

  const handleAddInstruction = () => {
    if (newInstruction.title && newInstruction.points.some(point => point.trim())) {
      const selectedColor = predefinedColors.find(c => c.value === newInstruction.backgroundColor);
      const instruction = {
        id: `instruction_${Date.now()}`,
        title: newInstruction.title,
        points: newInstruction.points.filter(point => point.trim()),
        backgroundColor: selectedColor?.bg || 'bg-blue-50',
        textColor: selectedColor?.text || 'text-blue-800'
      };
      
      onUpdateInstructions([...instructions, instruction]);
      setNewInstruction({ title: '', points: [''], backgroundColor: 'blue' });
      setIsAddingNew(false);
    }
  };

  const handleUpdateInstruction = (id, updates) => {
    const updatedInstructions = instructions.map(inst => 
      inst.id === id ? { ...inst, ...updates } : inst
    );
    onUpdateInstructions(updatedInstructions);
    setEditingId(null);
  };

  const handleDeleteInstruction = (id) => {
    const updatedInstructions = instructions.filter(inst => inst.id !== id);
    onUpdateInstructions(updatedInstructions);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Assessment Instructions</h3>
        <Button 
          onClick={() => setIsAddingNew(true)} 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Instruction
        </Button>
      </div>

      {isAddingNew && (
        <Card className="border-2 border-dashed border-blue-300">
          <CardHeader>
            <CardTitle className="text-base">Add New Instruction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instruction Title
              </label>
              <Input
                value={newInstruction.title}
                onChange={(e) => setNewInstruction({ ...newInstruction, title: e.target.value })}
                placeholder="e.g., Assignment Requirements, Submission Format, Guidelines"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instruction Points
              </label>
              <div className="space-y-2">
                {newInstruction.points.map((point, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 w-6">{index + 1}.</span>
                    <Input
                      value={point}
                      onChange={(e) => handlePointChange(index, e.target.value)}
                      placeholder="Enter instruction point..."
                      className="flex-1"
                    />
                    {newInstruction.points.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemovePoint(index)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddPoint}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Point
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background Color
              </label>
              <Select
                value={newInstruction.backgroundColor}
                onValueChange={(value) => setNewInstruction({ ...newInstruction, backgroundColor: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {predefinedColors.map((color) => (
                    <SelectItem key={color.value} value={color.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded ${color.bg} border`}></div>
                        {color.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleAddInstruction}>
                <Save className="h-4 w-4 mr-2" />
                Add Instruction
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {instructions.map((instruction) => (
          <Card key={instruction.id} className={`${instruction.backgroundColor} border-l-4 border-l-blue-500`}>
            <CardContent className="p-4">
              {editingId === instruction.id ? (
                <EditInstructionForm
                  instruction={instruction}
                  onSave={(updates) => handleUpdateInstruction(instruction.id, updates)}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className={`font-semibold ${instruction.textColor} mb-2`}>
                      {instruction.title}
                    </h4>
                    <ol className={`${instruction.textColor} text-sm leading-relaxed space-y-1`}>
                      {instruction.points.map((point, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-current mt-1">{index + 1}.</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingId(instruction.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteInstruction(instruction.id)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {instructions.length === 0 && !isAddingNew && (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-8 text-center">
            <div className="text-gray-500">
              <p className="mb-2">No instructions added yet</p>
              <p className="text-sm">Add instructions to help students understand the assessment requirements</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const EditInstructionForm = ({ instruction, onSave, onCancel }) => {
  const [title, setTitle] = useState(instruction.title);
  const [points, setPoints] = useState(instruction.points);
  const [backgroundColor, setBackgroundColor] = useState(
    predefinedColors.find(c => c.bg === instruction.backgroundColor)?.value || 'blue'
  );

  const handleAddPoint = () => {
    setPoints([...points, '']);
  };

  const handleRemovePoint = (index) => {
    if (points.length > 1) {
      setPoints(points.filter((_, i) => i !== index));
    }
  };

  const handlePointChange = (index, value) => {
    const updatedPoints = [...points];
    updatedPoints[index] = value;
    setPoints(updatedPoints);
  };

  const handleSave = () => {
    const selectedColor = predefinedColors.find(c => c.value === backgroundColor);
    onSave({
      title,
      points: points.filter(point => point.trim()),
      backgroundColor: selectedColor?.bg || 'bg-blue-50',
      textColor: selectedColor?.text || 'text-blue-800'
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Instruction title"
          className="font-semibold"
        />
      </div>
      
      <div>
        <div className="space-y-2">
          {points.map((point, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-sm text-gray-500 w-6">{index + 1}.</span>
              <Input
                value={point}
                onChange={(e) => handlePointChange(index, e.target.value)}
                placeholder="Enter instruction point..."
                className="flex-1"
              />
              {points.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemovePoint(index)}
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddPoint}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Point
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Select value={backgroundColor} onValueChange={setBackgroundColor}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {predefinedColors.map((color) => (
              <SelectItem key={color.value} value={color.value}>
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded ${color.bg} border`}></div>
                  {color.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-2 ml-auto">
          <Button variant="outline" size="sm" onClick={onCancel}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};