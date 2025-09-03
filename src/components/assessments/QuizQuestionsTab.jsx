import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, ChevronDown, ChevronUp, Save, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

const sampleQuestions = [
  {
    id: '1',
    type: 'mcq',
    question: 'What is the correct way to declare a variable in JavaScript?',
    options: ['var x = 5;', 'variable x = 5;', 'v x = 5;', 'declare x = 5;'],
    correctAnswer: 0,
    points: 10,
    difficulty: 'Easy'
  },
  {
    id: '2',
    type: 'scq',
    question: 'Which of the following is a JavaScript framework?',
    options: ['React', 'HTML', 'CSS', 'SQL'],
    correctAnswer: 0,
    points: 10,
    difficulty: 'Medium'
  },
  {
    id: '3',
    type: 'true-false',
    question: 'JavaScript is a compiled programming language.',
    correctAnswer: false,
    points: 5,
    difficulty: 'Easy'
  },
  {
    id: '4',
    type: 'fill-blank',
    question: 'The _____ method is used to add elements to the end of an array.',
    correctAnswer: 'push',
    points: 5,
    difficulty: 'Easy'
  },
  {
    id: '5',
    type: 'descriptive',
    question: 'Explain the difference between let, const, and var in JavaScript.',
    sampleAnswer: 'let and const are block-scoped while var is function-scoped...',
    points: 15,
    difficulty: 'Hard'
  }
];

const QuizQuestionsTab = ({ quiz, onUpdate }) => {
  const [questions, setQuestions] = useState(sampleQuestions);
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editData, setEditData] = useState({});
  const [newQuestion, setNewQuestion] = useState({
    type: 'mcq',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    points: 10,
    difficulty: 'Medium'
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const questionTypes = [
    { value: 'mcq', label: 'Multiple Choice (MCQ)' },
    { value: 'scq', label: 'Single Choice (SCQ)' },
    { value: 'true-false', label: 'True/False' },
    { value: 'fill-blank', label: 'Fill in the Blanks' },
    { value: 'descriptive', label: 'Descriptive' },
    { value: 'matching', label: 'Matching' },
    { value: 'one-word', label: 'One Word Answer' }
  ];

  const getQuestionTypeColor = (type) => {
    const colors = {
      'mcq': 'bg-blue-100 text-blue-800',
      'scq': 'bg-green-100 text-green-800',
      'true-false': 'bg-indigo-100 text-indigo-800',
      'fill-blank': 'bg-purple-100 text-purple-800',
      'descriptive': 'bg-orange-100 text-orange-800',
      'matching': 'bg-pink-100 text-pink-800',
      'one-word': 'bg-yellow-100 text-yellow-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddQuestion = () => {
    const questionId = (questions.length + 1).toString();
    setQuestions([...questions, { ...newQuestion, id: questionId }]);
    setNewQuestion({
      type: 'mcq',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      points: 10,
      difficulty: 'Medium'
    });
    setShowAddForm(false);
  };

  const handleDeleteQuestion = (questionId) => {
    setQuestions(questions.filter(q => q.id !== questionId));
  };

  const handleEditQuestion = (questionId) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      setEditData({ ...question });
      setEditingQuestion(questionId);
    }
  };

  const handleSaveEdit = (questionId) => {
    setQuestions(questions.map(q => q.id === questionId ? editData : q));
    setEditingQuestion(null);
    setEditData({});
  };

  const handleCancelEdit = () => {
    setEditingQuestion(null);
    setEditData({});
  };

  const toggleExpanded = (questionId) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
  };

  const renderQuestionContent = (question) => {
    if (editingQuestion === question.id) {
      return renderEditForm(question);
    }

    switch (question.type) {
      case 'mcq':
      case 'scq':
        return (
          <div className="space-y-2">
            <p className="font-medium">{question.question}</p>
            <div className="space-y-1">
              {question.options.map((option, index) => (
                <div key={index} className={`p-2 rounded border ${index === question.correctAnswer ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
                  <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                  {index === question.correctAnswer && <Badge className="ml-2 bg-green-100 text-green-800">Correct</Badge>}
                </div>
              ))}
            </div>
          </div>
        );
      case 'true-false':
        return (
          <div className="space-y-2">
            <p className="font-medium">{question.question}</p>
            <div className="flex gap-4">
              <div className={`p-2 rounded border ${question.correctAnswer === true ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
                <span className="font-medium">True</span>
                {question.correctAnswer === true && <Badge className="ml-2 bg-green-100 text-green-800">Correct</Badge>}
              </div>
              <div className={`p-2 rounded border ${question.correctAnswer === false ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
                <span className="font-medium">False</span>
                {question.correctAnswer === false && <Badge className="ml-2 bg-green-100 text-green-800">Correct</Badge>}
              </div>
            </div>
          </div>
        );
      case 'fill-blank':
        return (
          <div className="space-y-2">
            <p className="font-medium">{question.question}</p>
            <div className="p-2 bg-green-50 border border-green-200 rounded">
              <span className="text-sm text-green-700">Correct Answer: </span>
              <span className="font-medium">{question.correctAnswer}</span>
            </div>
          </div>
        );
      case 'descriptive':
        return (
          <div className="space-y-2">
            <p className="font-medium">{question.question}</p>
            {question.sampleAnswer && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                <p className="text-sm text-blue-700 font-medium mb-1">Sample Answer:</p>
                <p className="text-sm">{question.sampleAnswer}</p>
              </div>
            )}
          </div>
        );
      default:
        return <p className="font-medium">{question.question}</p>;
    }
  };

  const renderEditForm = (question) => (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Question Type</label>
        <Select value={editData.type} onValueChange={(value) => setEditData({ ...editData, type: value })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {questionTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Question</label>
        <Textarea
          value={editData.question}
          onChange={(e) => setEditData({ ...editData, question: e.target.value })}
          rows={3}
        />
      </div>

      {(editData.type === 'mcq' || editData.type === 'scq') && (
        <div>
          <label className="text-sm font-medium mb-2 block">Options</label>
          <div className="space-y-2">
            {editData.options?.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...editData.options];
                    newOptions[index] = e.target.value;
                    setEditData({ ...editData, options: newOptions });
                  }}
                />
                <Button
                  type="button"
                  variant={editData.correctAnswer === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => setEditData({ ...editData, correctAnswer: index })}
                >
                  Correct
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {editData.type === 'true-false' && (
        <div>
          <label className="text-sm font-medium mb-2 block">Correct Answer</label>
          <div className="flex gap-4">
            <Button
              type="button"
              variant={editData.correctAnswer === true ? "default" : "outline"}
              onClick={() => setEditData({ ...editData, correctAnswer: true })}
            >
              True
            </Button>
            <Button
              type="button"
              variant={editData.correctAnswer === false ? "default" : "outline"}
              onClick={() => setEditData({ ...editData, correctAnswer: false })}
            >
              False
            </Button>
          </div>
        </div>
      )}

      {editData.type === 'fill-blank' && (
        <div>
          <label className="text-sm font-medium mb-2 block">Correct Answer</label>
          <Input
            value={editData.correctAnswer}
            onChange={(e) => setEditData({ ...editData, correctAnswer: e.target.value })}
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Points</label>
          <Input
            type="number"
            value={editData.points}
            onChange={(e) => setEditData({ ...editData, points: parseInt(e.target.value) })}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Difficulty</label>
          <Select value={editData.difficulty} onValueChange={(value) => setEditData({ ...editData, difficulty: value })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={() => handleSaveEdit(question.id)} className="bg-green-600 hover:bg-green-700">
          <Save className="h-4 w-4 mr-2" /> Save Changes
        </Button>
        <Button onClick={handleCancelEdit} variant="outline">
          <X className="h-4 w-4 mr-2" /> Cancel
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Quiz Questions</h3>
          <p className="text-sm text-gray-600">Manage all questions for this quiz</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" /> Add Question
        </Button>
      </div>

      {/* Add Question Form */}
      {showAddForm && (
        <Card className="border-blue-200">
          <CardHeader><CardTitle>Add New Question</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Question Type</label>
                <Select value={newQuestion.type} onValueChange={(value) => setNewQuestion({ ...newQuestion, type: value })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {questionTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Points</label>
                <Input
                  type="number"
                  value={newQuestion.points}
                  onChange={(e) => setNewQuestion({ ...newQuestion, points: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Difficulty</label>
                <Select value={newQuestion.difficulty} onValueChange={(value) => setNewQuestion({ ...newQuestion, difficulty: value })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Question</label>
              <Textarea
                value={newQuestion.question}
                onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                rows={3}
              />
            </div>

            {(newQuestion.type === 'mcq' || newQuestion.type === 'scq') && (
              <div>
                <label className="text-sm font-medium mb-2 block">Options</label>
                <div className="space-y-2">
                  {newQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...newQuestion.options];
                          newOptions[index] = e.target.value;
                          setNewQuestion({ ...newQuestion, options: newOptions });
                        }}
                      />
                      <Button
                        type="button"
                        variant={newQuestion.correctAnswer === index ? "default" : "outline"}
                        size="sm"
                        onClick={() => setNewQuestion({ ...newQuestion, correctAnswer: index })}
                      >
                        Correct
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={handleAddQuestion} className="bg-green-600 hover:bg-green-700">Add Question</Button>
              <Button onClick={() => setShowAddForm(false)} variant="outline">Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {questions.map((question, index) => (
          <Card key={question.id} className="border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold text-gray-700">Q{index + 1}</span>
                  <Badge className={getQuestionTypeColor(question.type)}>
                    {questionTypes.find(t => t.value === question.type)?.label}
                  </Badge>
                  <Badge className={getDifficultyColor(question.difficulty)}>
                    {question.difficulty}
                  </Badge>
                  <Badge variant="outline">{question.points} points</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditQuestion(question.id)}
                    disabled={editingQuestion === question.id}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDeleteQuestion(question.id)}
                    disabled={editingQuestion === question.id}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(question.id)}
                  >
                    {expandedQuestion === question.id ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            {expandedQuestion === question.id && (
              <CardContent className="pt-0">
                <Separator className="mb-4" />
                {renderQuestionContent(question)}
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {questions.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-gray-500 mb-4">No questions added yet</p>
            <Button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" /> Add First Question
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuizQuestionsTab;
