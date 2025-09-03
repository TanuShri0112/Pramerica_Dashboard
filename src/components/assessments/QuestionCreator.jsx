import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X, Upload, Image } from 'lucide-react';

export const QuestionCreator = ({ questionType, editingQuestion, onSave, onCancel }) => {
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [correctAnswers, setCorrectAnswers] = useState([0]);
  const [questionImage, setQuestionImage] = useState(null);
  const [matchingPairs, setMatchingPairs] = useState([
    { left: '', right: '' },
    { left: '', right: '' }
  ]);

  useEffect(() => {
    if (editingQuestion) {
      setQuestionTitle(editingQuestion.title || '');
      setQuestionText(editingQuestion.text || '');
      setQuestionImage(editingQuestion.image || null);
      setOptions(editingQuestion.options?.length > 0 ? editingQuestion.options : ['', '']);
      setCorrectAnswers(editingQuestion.correctAnswers || [0]);
      setMatchingPairs(editingQuestion.matchingPairs?.length > 0 ? editingQuestion.matchingPairs : [{ left: '', right: '' }, { left: '', right: '' }]);
    } else {
      setQuestionTitle('');
      setQuestionText('');
      setOptions(['', '']);
      setCorrectAnswers([0]);
      setQuestionImage(null);
      setMatchingPairs([{ left: '', right: '' }, { left: '', right: '' }]);
    }
  }, [editingQuestion]);

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
      setCorrectAnswers(correctAnswers.filter(answer => answer !== index));
    }
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCorrectAnswerChange = (index, isChecked) => {
    if (questionType === 'multiple-choice' || questionType === 'true-false') {
      setCorrectAnswers([index]);
    } else if (questionType === 'multiple-response') {
      if (isChecked) {
        setCorrectAnswers([...correctAnswers, index]);
      } else {
        setCorrectAnswers(correctAnswers.filter(answer => answer !== index));
      }
    }
  };

  const addMatchingPair = () => {
    setMatchingPairs([...matchingPairs, { left: '', right: '' }]);
  };

  const removeMatchingPair = (index) => {
    if (matchingPairs.length > 2) {
      setMatchingPairs(matchingPairs.filter((_, i) => i !== index));
    }
  };

  const updateMatchingPair = (index, side, value) => {
    const newPairs = [...matchingPairs];
    newPairs[index][side] = value;
    setMatchingPairs(newPairs);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setQuestionImage(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setQuestionImage(null);
  };

  const isFormValid = () => {
    if (!questionText.trim()) return false;

    if (questionType === 'multiple-choice' || questionType === 'multiple-response') {
      const filledOptions = options.filter(option => option.trim() !== '');
      if (filledOptions.length < 2) return false;
      if (correctAnswers.length === 0) return false;
    }

    if (questionType === 'true-false' && correctAnswers.length === 0) {
      return false;
    }

    if (questionType === 'matching') {
      const validPairs = matchingPairs.filter(pair => pair.left.trim() !== '' && pair.right.trim() !== '');
      if (validPairs.length < 2) return false;
    }

    if (questionType === 'fill-blank' && !questionText.includes('___BLANK___')) {
      return false;
    }

    return true;
  };

  const handleSave = () => {
    const question = {
      id: editingQuestion ? editingQuestion.id : Date.now(),
      title: questionTitle || 'New Question',
      type: questionType,
      text: questionText,
      image: questionImage,
      options: ['multiple-choice', 'multiple-response'].includes(questionType) ? options : undefined,
      correctAnswers: ['multiple-choice', 'multiple-response', 'true-false'].includes(questionType) ? correctAnswers : undefined,
      matchingPairs: questionType === 'matching' ? matchingPairs : undefined
    };
    onSave(question);
  };

  const getQuestionTypeTitle = () => {
    const isEditing = editingQuestion ? 'Edit ' : '';
    switch (questionType) {
      case 'multiple-choice': return `${isEditing}Multiple Choice Question`;
      case 'multiple-response': return `${isEditing}Multiple Response Question`;
      case 'true-false': return `${isEditing}True/False Question`;
      case 'fill-blank': return `${isEditing}Fill in the Blank Question`;
      case 'matching': return `${isEditing}Matching Question`;
      default: return `${isEditing}New Question`;
    }
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      <div className="flex-shrink-0 p-6 border-b border-gray-200 bg-white">
        <h1 className="text-2xl font-bold text-gray-900">{getQuestionTypeTitle()}</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question Title
            </label>
            <Input
              value={questionTitle}
              onChange={(e) => setQuestionTitle(e.target.value)}
              placeholder="Enter question title..."
              className="text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question Text *
            </label>
            <Textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Enter your question here..."
              className={`min-h-[120px] ${!questionText.trim() ? 'border-red-300' : ''}`}
            />
            {!questionText.trim() && (
              <p className="text-sm text-red-600 mt-1">Question text is required</p>
            )}
          </div>

          {questionType !== 'matching' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Image (Optional)
              </label>
              {!questionImage ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <div className="flex flex-col items-center space-y-2">
                    <Image className="h-8 w-8 text-gray-400" />
                    <div className="text-sm text-gray-600">
                      <label className="cursor-pointer text-blue-600 hover:text-blue-700">
                        Click to upload an image
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={questionImage}
                    alt="Question"
                    className="max-w-full h-auto rounded-lg border border-gray-200"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={removeImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {(questionType === 'multiple-choice' || questionType === 'multiple-response') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Answer Options *
              </label>
              <div className="space-y-3">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type={questionType === 'multiple-choice' ? 'radio' : 'checkbox'}
                      name={questionType === 'multiple-choice' ? 'correct-answer' : `correct-answer-${index}`}
                      checked={correctAnswers.includes(index)}
                      onChange={(e) => handleCorrectAnswerChange(index, e.target.checked)}
                      className="mt-1"
                    />
                    <Input
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder={`Option ${index + 1} *`}
                      className={`flex-1 ${!option.trim() ? 'border-red-300' : ''}`}
                    />
                    {options.length > 2 && (
                      <Button variant="ghost" size="icon" onClick={() => removeOption(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" onClick={addOption} className="mt-2">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Option
                </Button>
              </div>
              {options.filter(option => option.trim() !== '').length < 2 && (
                <p className="text-sm text-red-600 mt-1">At least 2 options are required</p>
              )}
              {correctAnswers.length === 0 && (
                <p className="text-sm text-red-600 mt-1">Please select at least one correct answer</p>
              )}
            </div>
          )}

          {questionType === 'true-false' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correct Answer *
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="tf-answer"
                    checked={correctAnswers.includes(1)}
                    onChange={() => setCorrectAnswers([1])}
                  />
                  <span>True</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="tf-answer"
                    checked={correctAnswers.includes(0)}
                    onChange={() => setCorrectAnswers([0])}
                  />
                  <span>False</span>
                </label>
              </div>
              {correctAnswers.length === 0 && (
                <p className="text-sm text-red-600 mt-1">Please select the correct answer</p>
              )}
            </div>
          )}

          {questionType === 'matching' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Matching Pairs *
              </label>
              <div className="space-y-3">
                {matchingPairs.map((pair, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Input
                      value={pair.left}
                      onChange={(e) => updateMatchingPair(index, 'left', e.target.value)}
                      placeholder={`Item ${index + 1} *`}
                      className={`flex-1 ${!pair.left.trim() ? 'border-red-300' : ''}`}
                    />
                    <span className="text-gray-400">→</span>
                    <Input
                      value={pair.right}
                      onChange={(e) => updateMatchingPair(index, 'right', e.target.value)}
                      placeholder={`Match ${index + 1} *`}
                      className={`flex-1 ${!pair.right.trim() ? 'border-red-300' : ''}`}
                    />
                    {matchingPairs.length > 2 && (
                      <Button variant="ghost" size="icon" onClick={() => removeMatchingPair(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" onClick={addMatchingPair} className="mt-2">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Pair
                </Button>
              </div>
              {matchingPairs.filter(pair => pair.left.trim() !== '' && pair.right.trim() !== '').length < 2 && (
                <p className="text-sm text-red-600 mt-1">At least 2 complete matching pairs are required</p>
              )}
            </div>
          )}

          {questionType === 'fill-blank' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instructions
              </label>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700">
                  Use ___BLANK___ in your question text where you want students to fill in answers.
                  Example: "The capital of France is ___BLANK___"
                </p>
              </div>
              {questionText && !questionText.includes('___BLANK___') && (
                <p className="text-sm text-red-600 mt-2">Question must include ___BLANK___ for students to fill in</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex-shrink-0 p-6 border-t border-gray-200 bg-white">
        <div className="flex gap-4">
          <Button onClick={handleSave} className="px-8" disabled={!isFormValid()}>
            {editingQuestion ? 'Update Question' : 'Save Question'}
          </Button>
          <Button variant="outline" onClick={onCancel} className="px-8">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
