import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';

export const KnowledgeCheckEditor = ({ open, onOpenChange, content, onSave }) => {
  const [questionType, setQuestionType] = useState(content?.knowledgeCheckType || 'multiple-choice');
  const [question, setQuestion] = useState(content?.question || '');
  const [explanation, setExplanation] = useState(content?.explanation || '');
  const [options, setOptions] = useState(content?.options || ['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(content?.correctAnswer || 0);
  const [correctAnswers, setCorrectAnswers] = useState(content?.correctAnswers || []);
  const [trueFalseAnswer, setTrueFalseAnswer] = useState(content?.correctAnswer !== undefined ? content.correctAnswer : true);
  const [text, setText] = useState(content?.text || '');
  const [blanks, setBlanks] = useState(content?.blanks || []);
  const [leftItems, setLeftItems] = useState(content?.leftItems || ['', '', '']);
  const [rightItems, setRightItems] = useState(content?.rightItems || ['', '', '']);
  const [correctMatches, setCorrectMatches] = useState(content?.correctMatches || []);

  useEffect(() => {
    if (content) {
      setQuestionType(content.knowledgeCheckType || 'multiple-choice');
      setQuestion(content.question || '');
      setExplanation(content.explanation || '');
      setOptions(content.options || ['', '', '', '']);
      setCorrectAnswer(content.correctAnswer || 0);
      setCorrectAnswers(content.correctAnswers || []);
      setTrueFalseAnswer(content.correctAnswer !== undefined ? content.correctAnswer : true);
      setText(content.text || '');
      setBlanks(content.blanks || []);
      setLeftItems(content.leftItems || ['', '', '']);
      setRightItems(content.rightItems || ['', '', '']);
      setCorrectMatches(content.correctMatches || []);
    }
  }, [content]);

  const handleSave = () => {
    let updatedContent = {
      knowledgeCheckType: questionType,
      question,
      explanation
    };

    switch (questionType) {
      case 'multiple-choice':
        updatedContent = {
          ...updatedContent,
          options: options.filter(opt => opt.trim()),
          correctAnswer
        };
        break;
      case 'multiple-response':
        updatedContent = {
          ...updatedContent,
          options: options.filter(opt => opt.trim()),
          correctAnswers
        };
        break;
      case 'true-false':
        updatedContent = {
          ...updatedContent,
          correctAnswer: trueFalseAnswer
        };
        break;
      case 'fill-in-blank':
        updatedContent = {
          ...updatedContent,
          text,
          blanks
        };
        break;
      case 'matching':
        updatedContent = {
          ...updatedContent,
          leftItems: leftItems.filter(item => item.trim()),
          rightItems: rightItems.filter(item => item.trim()),
          correctMatches
        };
        break;
    }

    onSave(updatedContent);
    onOpenChange(false);
  };

  const addOption = () => setOptions([...options, '']);
  const removeOption = (index) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
      if (correctAnswer >= index) setCorrectAnswer(Math.max(0, correctAnswer - 1));
      setCorrectAnswers(correctAnswers.filter(ans => ans !== index).map(ans => (ans > index ? ans - 1 : ans)));
    }
  };
  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const toggleCorrectAnswer = (index) => {
    if (correctAnswers.includes(index)) {
      setCorrectAnswers(correctAnswers.filter(ans => ans !== index));
    } else {
      setCorrectAnswers([...correctAnswers, index]);
    }
  };

  const addBlank = () => {
    setBlanks([...blanks, {
      id: Date.now(),
      position: text.length,
      correctAnswers: [''],
      placeholder: '____'
    }]);
  };

  const removeBlank = (index) => {
    setBlanks(blanks.filter((_, i) => i !== index));
  };

  const updateBlank = (index, field, value) => {
    const newBlanks = [...blanks];
    newBlanks[index] = { ...newBlanks[index], [field]: value };
    setBlanks(newBlanks);
  };

  const addLeftItem = () => {
    setLeftItems([...leftItems, '']);
    setRightItems([...rightItems, '']);
  };

  const removeMatchingPair = (index) => {
    if (leftItems.length > 1) {
      setLeftItems(leftItems.filter((_, i) => i !== index));
      setRightItems(rightItems.filter((_, i) => i !== index));
      setCorrectMatches(correctMatches.filter(match => match.left !== index && match.right !== index));
    }
  };

  const updateLeftItem = (index, value) => {
    const items = [...leftItems];
    items[index] = value;
    setLeftItems(items);
  };

  const updateRightItem = (index, value) => {
    const items = [...rightItems];
    items[index] = value;
    setRightItems(items);
  };

  const renderQuestionTypeFields = () => {
    switch (questionType) {
      case 'multiple-choice':
        return (
          <div className="space-y-4">
            <Label className="text-sm font-medium mb-2 block">Options</Label>
            <RadioGroup value={correctAnswer.toString()} onValueChange={val => setCorrectAnswer(parseInt(val))}>
              {options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Input
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="flex-1"
                  />
                  {options.length > 2 && (
                    <Button type="button" variant="outline" size="icon" onClick={() => removeOption(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </RadioGroup>
            <Button type="button" variant="outline" onClick={addOption} className="mt-2">
              <Plus className="h-4 w-4 mr-2" />
              Add Option
            </Button>
          </div>
        );

      case 'multiple-response':
        return (
          <div className="space-y-4">
            <Label className="text-sm font-medium mb-2 block">Options (Select multiple correct answers)</Label>
            {options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <Checkbox
                  checked={correctAnswers.includes(index)}
                  onCheckedChange={() => toggleCorrectAnswer(index)}
                />
                <Input
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  className="flex-1"
                />
                {options.length > 2 && (
                  <Button type="button" variant="outline" size="icon" onClick={() => removeOption(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addOption} className="mt-2">
              <Plus className="h-4 w-4 mr-2" />
              Add Option
            </Button>
          </div>
        );

      case 'true-false':
        return (
          <div className="space-y-4">
            <Label className="text-sm font-medium mb-2 block">Correct Answer</Label>
            <RadioGroup value={trueFalseAnswer.toString()} onValueChange={(val) => setTrueFalseAnswer(val === 'true')}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="true" />
                <label htmlFor="true">True</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="false" />
                <label htmlFor="false">False</label>
              </div>
            </RadioGroup>
          </div>
        );

      case 'fill-in-blank':
        return (
          <div className="space-y-4">
            <Label htmlFor="text" className="text-sm font-medium">Text with blanks</Label>
            <Textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your text here. Use ____ for blanks."
              className="mt-1"
            />
            <Label className="text-sm font-medium mb-2 block">Blanks</Label>
            {blanks.map((blank, index) => (
              <div key={blank.id} className="flex items-center space-x-2 mb-2">
                <Input
                  value={blank.correctAnswers.join(', ')}
                  onChange={(e) => updateBlank(index, 'correctAnswers', e.target.value.split(', '))}
                  placeholder="Correct answers (comma separated)"
                  className="flex-1"
                />
                <Button type="button" variant="outline" size="icon" onClick={() => removeBlank(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addBlank}>
              <Plus className="h-4 w-4 mr-2" />
              Add Blank
            </Button>
          </div>
        );

      case 'matching':
        return (
          <div className="space-y-4">
            <Label className="text-sm font-medium mb-2 block">Matching Pairs</Label>
            {leftItems.map((leftItem, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <Input
                  value={leftItem}
                  onChange={(e) => updateLeftItem(index, e.target.value)}
                  placeholder={`Left item ${index + 1}`}
                  className="flex-1"
                />
                <span className="text-gray-500">↔</span>
                <Input
                  value={rightItems[index] || ''}
                  onChange={(e) => updateRightItem(index, e.target.value)}
                  placeholder={`Right item ${index + 1}`}
                  className="flex-1"
                />
                {leftItems.length > 1 && (
                  <Button type="button" variant="outline" size="icon" onClick={() => removeMatchingPair(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addLeftItem}>
              <Plus className="h-4 w-4 mr-2" />
              Add Pair
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Knowledge Check</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          <div>
            <Label htmlFor="questionType" className="text-sm font-medium">Question Type</Label>
            <Select value={questionType} onValueChange={setQuestionType}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                <SelectItem value="multiple-response">Multiple Response</SelectItem>
                <SelectItem value="true-false">True/False</SelectItem>
                <SelectItem value="fill-in-blank">Fill in the Blank</SelectItem>
                <SelectItem value="matching">Matching</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="question" className="text-sm font-medium">Question</Label>
            <Textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question here"
              className="mt-1"
            />
          </div>

          {renderQuestionTypeFields()}

          <div>
            <Label htmlFor="explanation" className="text-sm font-medium">Explanation</Label>
            <Textarea
              id="explanation"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Explain the correct answer"
              className="mt-1"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
