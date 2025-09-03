import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  CheckSquare,
  CheckCircle,
  Link,
  ToggleLeft
} from 'lucide-react';

export const KnowledgeCheckTypeDialog = ({ open, onOpenChange, onSelectType }) => {
  const [selectedMultipleChoice, setSelectedMultipleChoice] = useState('second');
  const [multipleResponseChecked, setMultipleResponseChecked] = useState({
    first: true,
    second: true,
    third: false
  });
  const [fillInBlank, setFillInBlank] = useState('blue');
  const [trueFalse, setTrueFalse] = useState('true');

  const handleTypeSelect = (type) => {
    onSelectType(type);
    onOpenChange(false);
  };

  const MultipleChoicePreview = () => (
    <div className="bg-white rounded-lg border p-4 space-y-3">
      <h4 className="font-medium text-gray-900 mb-3">Multiple choice</h4>
      <RadioGroup value={selectedMultipleChoice} onValueChange={setSelectedMultipleChoice}>
        <div className="flex items-center space-x-3">
          <RadioGroupItem value="first" id="first" />
          <label htmlFor="first" className="text-gray-600">First choice</label>
        </div>
        <div className="flex items-center space-x-3">
          <RadioGroupItem value="second" id="second" />
          <label htmlFor="second" className="text-gray-600">Second choice</label>
        </div>
        <div className="flex items-center space-x-3">
          <RadioGroupItem value="third" id="third" />
          <label htmlFor="third" className="text-gray-600">Third choice</label>
        </div>
      </RadioGroup>
    </div>
  );

  const MultipleResponsePreview = () => (
    <div className="bg-white rounded-lg border p-4 space-y-3">
      <h4 className="font-medium text-gray-900 mb-3">Multiple response</h4>
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <Checkbox
            checked={multipleResponseChecked.first}
            onCheckedChange={(checked) =>
              setMultipleResponseChecked(prev => ({ ...prev, first: !!checked }))
            }
          />
          <label className="text-gray-600">This is correct</label>
        </div>
        <div className="flex items-center space-x-3">
          <Checkbox
            checked={multipleResponseChecked.second}
            onCheckedChange={(checked) =>
              setMultipleResponseChecked(prev => ({ ...prev, second: !!checked }))
            }
          />
          <label className="text-gray-600">This is also correct</label>
        </div>
        <div className="flex items-center space-x-3">
          <Checkbox
            checked={multipleResponseChecked.third}
            onCheckedChange={(checked) =>
              setMultipleResponseChecked(prev => ({ ...prev, third: !!checked }))
            }
          />
          <label className="text-gray-600">Wrong</label>
        </div>
      </div>
    </div>
  );

  const FillInBlankPreview = () => (
    <div className="bg-white rounded-lg border p-4 space-y-3">
      <h4 className="font-medium text-gray-900 mb-3">Fill in the blank</h4>
      <div className="text-gray-600">
        <p>The sky is the color{' '}
          <Input
            value={fillInBlank}
            onChange={(e) => setFillInBlank(e.target.value)}
            className="inline-block w-20 h-8 text-center mx-1"
            placeholder="____"
          />
          {' '}on a sunny day.
        </p>
      </div>
    </div>
  );

  const TrueFalsePreview = () => (
    <div className="bg-white rounded-lg border p-4 space-y-3">
      <h4 className="font-medium text-gray-900 mb-3">True/False</h4>
      <p className="text-gray-600 mb-3">The Earth is round.</p>
      <RadioGroup value={trueFalse} onValueChange={setTrueFalse}>
        <div className="flex items-center space-x-3">
          <RadioGroupItem value="true" id="true" />
          <label htmlFor="true" className="text-gray-600">True</label>
        </div>
        <div className="flex items-center space-x-3">
          <RadioGroupItem value="false" id="false" />
          <label htmlFor="false" className="text-gray-600">False</label>
        </div>
      </RadioGroup>
    </div>
  );

  const knowledgeCheckTypes = [
    {
      id: 'multiple-choice',
      title: 'Multiple Choice',
      description: 'Single correct answer from multiple options',
      icon: <CheckCircle className="h-5 w-5" />,
      preview: <MultipleChoicePreview />
    },
    {
      id: 'multiple-response',
      title: 'Multiple Response',
      description: 'Multiple correct answers can be selected',
      icon: <CheckSquare className="h-5 w-5" />,
      preview: <MultipleResponsePreview />
    },
    {
      id: 'fill-in-blank',
      title: 'Fill in the Blank',
      description: 'Complete the sentence with missing words',
      icon: <Link className="h-5 w-5" />,
      preview: <FillInBlankPreview />
    },
    {
      id: 'true-false',
      title: 'True/False',
      description: 'Simple true or false question',
      icon: <ToggleLeft className="h-5 w-5" />,
      preview: <TrueFalsePreview />
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Choose Knowledge Check Type</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {knowledgeCheckTypes.map((type) => (
            <div key={type.id} className="space-y-4">
              <Button
                variant="outline"
                className="w-full h-auto p-4 flex flex-col items-start space-y-2 hover:border-blue-300 hover:bg-blue-50"
                onClick={() => handleTypeSelect(type.id)}
              >
                <div className="flex items-center space-x-3 w-full">
                  <div className="text-blue-600">{type.icon}</div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-gray-900">{type.title}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 text-left w-full">
                  {type.description}
                </div>
              </Button>
              {type.preview}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
