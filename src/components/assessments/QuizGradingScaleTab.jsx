import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Edit, Save, X, Plus, Trash2 } from 'lucide-react';

const defaultGradingScale = [
  { grade: 'A+', minScore: 95, maxScore: 100, color: 'bg-green-100 text-green-800' },
  { grade: 'A', minScore: 90, maxScore: 94, color: 'bg-green-100 text-green-800' },
  { grade: 'A-', minScore: 85, maxScore: 89, color: 'bg-green-100 text-green-800' },
  { grade: 'B+', minScore: 80, maxScore: 84, color: 'bg-blue-100 text-blue-800' },
  { grade: 'B', minScore: 75, maxScore: 79, color: 'bg-blue-100 text-blue-800' },
  { grade: 'B-', minScore: 70, maxScore: 74, color: 'bg-blue-100 text-blue-800' },
  { grade: 'C+', minScore: 65, maxScore: 69, color: 'bg-yellow-100 text-yellow-800' },
  { grade: 'C', minScore: 60, maxScore: 64, color: 'bg-yellow-100 text-yellow-800' },
  { grade: 'C-', minScore: 55, maxScore: 59, color: 'bg-yellow-100 text-yellow-800' },
  { grade: 'D', minScore: 50, maxScore: 54, color: 'bg-orange-100 text-orange-800' },
  { grade: 'F', minScore: 0, maxScore: 49, color: 'bg-red-100 text-red-800' }
];

const QuizGradingScaleTab = ({ quiz, onUpdate }) => {
  const [gradingScale, setGradingScale] = useState(defaultGradingScale);
  const [isEditing, setIsEditing] = useState(false);
  const [editingScale, setEditingScale] = useState(defaultGradingScale);
  const [newGrade, setNewGrade] = useState({ grade: '', minScore: 0, maxScore: 0 });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSave = () => {
    setGradingScale(editingScale);
    setIsEditing(false);
    onUpdate?.({ ...quiz, gradingScale: editingScale }); // optional update
  };

  const handleCancel = () => {
    setEditingScale(gradingScale);
    setIsEditing(false);
  };

  const handleAddGrade = () => {
    const newEntry = {
      ...newGrade,
      color: 'bg-gray-100 text-gray-800'
    };
    setEditingScale([...editingScale, newEntry]);
    setNewGrade({ grade: '', minScore: 0, maxScore: 0 });
    setShowAddForm(false);
  };

  const handleDeleteGrade = (index) => {
    setEditingScale(editingScale.filter((_, i) => i !== index));
  };

  const updateGradeEntry = (index, field, value) => {
    const updated = editingScale.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setEditingScale(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Grading Scale</h3>
          <p className="text-sm text-gray-600">Configure grade boundaries</p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit Grading Scale
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Grade Boundaries</CardTitle>
            {isEditing && (
              <div className="flex gap-2">
                <Button onClick={() => setShowAddForm(true)} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Grade
                </Button>
                <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button onClick={handleCancel} size="sm" variant="outline">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {showAddForm && (
            <Card className="mb-4 border-blue-200">
              <CardContent className="p-4">
                <div className="grid grid-cols-4 gap-4">
                  <Input
                    placeholder="Grade (e.g., A+)"
                    value={newGrade.grade}
                    onChange={(e) => setNewGrade({ ...newGrade, grade: e.target.value })}
                  />
                  <Input
                    type="number"
                    placeholder="Min Score"
                    value={newGrade.minScore}
                    onChange={(e) => setNewGrade({ ...newGrade, minScore: parseInt(e.target.value) })}
                  />
                  <Input
                    type="number"
                    placeholder="Max Score"
                    value={newGrade.maxScore}
                    onChange={(e) => setNewGrade({ ...newGrade, maxScore: parseInt(e.target.value) })}
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleAddGrade} size="sm" className="bg-green-600 hover:bg-green-700">
                      Add
                    </Button>
                    <Button onClick={() => setShowAddForm(false)} size="sm" variant="outline">
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-3 font-semibold">Grade</th>
                  <th className="text-left p-3 font-semibold">Score Range</th>
                  {isEditing && <th className="text-left p-3 font-semibold">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {(isEditing ? editingScale : gradingScale).map((scale, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="p-3">
                      {isEditing ? (
                        <Input
                          value={scale.grade}
                          onChange={(e) => updateGradeEntry(index, 'grade', e.target.value)}
                          className="w-20"
                        />
                      ) : (
                        <span className={`px-2 py-1 rounded text-sm ${scale.color}`}>{scale.grade}</span>
                      )}
                    </td>
                    <td className="p-3">
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={scale.minScore}
                            onChange={(e) => updateGradeEntry(index, 'minScore', parseInt(e.target.value))}
                            className="w-20"
                          />
                          <span>-</span>
                          <Input
                            type="number"
                            value={scale.maxScore}
                            onChange={(e) => updateGradeEntry(index, 'maxScore', parseInt(e.target.value))}
                            className="w-20"
                          />
                        </div>
                      ) : (
                        <span>{scale.minScore}% - {scale.maxScore}%</span>
                      )}
                    </td>
                    {isEditing && (
                      <td className="p-3">
                        <Button
                          onClick={() => handleDeleteGrade(index)}
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizGradingScaleTab;
