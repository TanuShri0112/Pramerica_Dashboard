import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, FileText, CheckCircle, ArrowRight } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

export const AssessmentPreviewModal = ({ isOpen, onClose, assessmentData }) => {
  const [currentView, setCurrentView] = useState('overview');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [draggedItem, setDraggedItem] = useState(null);

  if (!assessmentData) return null;

  React.useEffect(() => {
    if (currentView === 'assessment' && assessmentData.settings?.timeLimitMinutes) {
      setTimeRemaining(assessmentData.settings.timeLimitMinutes * 60);
    }
  }, [currentView, assessmentData.settings?.timeLimitMinutes]);

  React.useEffect(() => {
    let interval;
    if (currentView === 'assessment' && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setCurrentView('completed');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentView, timeRemaining]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartAssessment = () => {
    setCurrentView('assessment');
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (assessmentData.blocks?.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitAssessment = () => {
    setCurrentView('completed');
  };

  const handleDragStart = (e, type, index, content) => {
    setDraggedItem({ type, index, content });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetType, targetIndex, questionId) => {
    e.preventDefault();
    if (!draggedItem) return;

    if (draggedItem.type === 'right' && targetType === 'left') {
      const currentMatches = answers[questionId] || {};
      const newMatches = {
        ...currentMatches,
        [targetIndex]: draggedItem.index
      };
      handleAnswerChange(questionId, newMatches);
    }

    setDraggedItem(null);
  };

  const handleRemoveMatch = (questionId, leftIndex) => {
    const currentMatches = answers[questionId] || {};
    const newMatches = { ...currentMatches };
    delete newMatches[leftIndex];
    handleAnswerChange(questionId, newMatches);
  };

  const renderQuestion = (block, index) => {
    const questionId = block.id;
    const userAnswer = answers[questionId];

    return (
      <Card key={block.id} className="border">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-semibold text-lg">Question {index + 1}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                {block.content?.points || 1} pts
              </span>
            </div>
          </div>
          
          <p className="text-gray-900 mb-6 text-lg">{block.content?.question}</p>
          
          {(block.type === 'mcq' || block.type === 'scq') && block.content?.options && (
            <div className="space-y-3">
              {block.type === 'scq' ? (
                <RadioGroup
                  value={userAnswer?.toString() || ''}
                  onValueChange={(value) => handleAnswerChange(questionId, parseInt(value))}
                >
                  {block.content.options.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-3 p-3 border rounded hover:bg-gray-50">
                      <RadioGroupItem value={idx.toString()} id={`${questionId}-${idx}`} />
                      <Label htmlFor={`${questionId}-${idx}`} className="flex-1 cursor-pointer">
                        <span className="font-medium">{String.fromCharCode(65 + idx)}.</span> {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <div className="space-y-3">
                  {block.content.options.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-3 p-3 border rounded hover:bg-gray-50">
                      <Checkbox
                        id={`${questionId}-${idx}`}
                        checked={userAnswer?.includes(idx) || false}
                        onCheckedChange={(checked) => {
                          const currentAnswers = userAnswer || [];
                          if (checked) {
                            handleAnswerChange(questionId, [...currentAnswers, idx]);
                          } else {
                            handleAnswerChange(questionId, currentAnswers.filter(a => a !== idx));
                          }
                        }}
                      />
                      <Label htmlFor={`${questionId}-${idx}`} className="flex-1 cursor-pointer">
                        <span className="font-medium">{String.fromCharCode(65 + idx)}.</span> {option}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {block.type === 'truefalse' && (
            <RadioGroup
              value={userAnswer?.toString() || ''}
              onValueChange={(value) => setAnswers(prev => ({...prev, [questionId]: value === 'true'}))}
            >
              <div className="flex items-center space-x-3 p-3 border rounded hover:bg-gray-50">
                <RadioGroupItem value="true" id={`${questionId}-true`} />
                <Label htmlFor={`${questionId}-true`} className="cursor-pointer">True</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded hover:bg-gray-50">
                <RadioGroupItem value="false" id={`${questionId}-false`} />
                <Label htmlFor={`${questionId}-false`} className="cursor-pointer">False</Label>
              </div>
            </RadioGroup>
          )}

          {block.type === 'fillup' && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">Your Answer:</Label>
              <Input
                placeholder="Enter your answer here"
                value={userAnswer || ''}
                onChange={(e) => handleAnswerChange(questionId, e.target.value)}
              />
            </div>
          )}

          {block.type === 'matching' && block.content?.leftColumn && block.content?.rightColumn && (
            <div className="space-y-4">
              <div className="text-sm text-gray-600 mb-4 p-3 bg-blue-50 rounded-lg">
                <strong>Instructions:</strong> Drag items from the right column and drop them on the corresponding items in the left column to create matches.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-3">Items to Match</div>
                  <div className="space-y-2">
                    {block.content.leftColumn.map((item, idx) => {
                      const matchedRightIndex = userAnswer?.[idx];
                      const matchedItem = matchedRightIndex !== undefined ? block.content.rightColumn[matchedRightIndex] : null;
                      
                      return (
                        <div
                          key={idx}
                          className="relative p-4 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50 min-h-[60px] transition-colors hover:border-blue-400"
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, 'left', idx, questionId)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-medium text-blue-800">{idx + 1}.</span>
                              <span className="ml-2 text-gray-700">{item}</span>
                            </div>
                          </div>
                          
                          {matchedItem && (
                            <div className="mt-2 p-2 bg-green-100 border border-green-300 rounded flex items-center justify-between">
                              <div className="text-sm">
                                <span className="font-medium text-green-800">Matched with:</span>
                                <span className="ml-1 text-gray-700">{matchedItem}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveMatch(questionId, idx)}
                                className="text-red-600 hover:text-red-800 h-6 w-6 p-0"
                              >
                                ×
                              </Button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-700 mb-3">Drag to Match</div>
                  <div className="space-y-2">
                    {block.content.rightColumn.map((match, idx) => {
                      const isUsed = Object.values(userAnswer || {}).includes(idx);
                      
                      return (
                        <div
                          key={idx}
                          draggable
                          onDragStart={(e) => handleDragStart(e, 'right', idx, match)}
                          className={`p-4 rounded-lg cursor-move transition-all ${
                            isUsed 
                              ? 'bg-gray-100 border-2 border-gray-300 opacity-50' 
                              : 'bg-green-50 border-2 border-green-300 hover:bg-green-100 hover:border-green-400'
                          }`}
                        >
                          <span className="font-medium text-green-800">{String.fromCharCode(65 + idx)}.</span>
                          <span className="ml-2 text-gray-700">{match}</span>
                          {isUsed && <span className="text-xs text-gray-500 ml-2">(Used)</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {block.type === 'oneword' && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">Your Answer:</Label>
              <Input
                placeholder="Enter one word answer"
                value={userAnswer || ''}
                onChange={(e) => handleAnswerChange(questionId, e.target.value)}
              />
            </div>
          )}

          {block.type === 'descriptive' && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Your Answer ({block.content.minWords || 50}-{block.content.maxWords || 500} words):
              </Label>
              <Textarea
                placeholder="Enter your detailed answer here"
                value={userAnswer || ''}
                onChange={(e) => handleAnswerChange(questionId, e.target.value)}
                rows={6}
              />
              <div className="text-sm text-gray-500">
                Word count: {userAnswer ? userAnswer.split(' ').filter(w => w.length > 0).length : 0}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Assessment Preview - {assessmentData.title}
          </DialogTitle>
        </DialogHeader>

        {currentView === 'overview' && (
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{assessmentData.title}</h1>
                <p className="text-gray-700 text-lg mb-6">{assessmentData.description}</p>
                
                <div className="flex items-center justify-center gap-8 text-sm bg-white/60 rounded-lg p-4">
                  {assessmentData.settings?.timeLimitMinutes && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">{assessmentData.settings.timeLimitMinutes} minutes</span>
                    </div>
                  )}
                  {assessmentData.blocks && (
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">{assessmentData.blocks.length} questions</span>
                    </div>
                  )}
                  {assessmentData.settings?.passingScore && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Passing: {assessmentData.settings.passingScore}%</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {assessmentData.instructions && assessmentData.instructions.length > 0 && (
              <div className="space-y-4">
                {assessmentData.instructions.map((instruction, index) => (
                  <Card key={instruction.id || index} className={`border-l-4 border-l-blue-500 ${instruction.backgroundColor || 'bg-blue-50'}`}>
                    <CardContent className="p-6">
                      <h2 className={`font-bold text-xl mb-4 ${instruction.textColor || 'text-blue-900'}`}>
                        {instruction.title}
                      </h2>
                      <div className="space-y-4">
                        <ol className={`${instruction.textColor || 'text-blue-800'} text-sm leading-relaxed space-y-2`}>
                          {instruction.points && instruction.points.map((point, pointIndex) => (
                            <li key={pointIndex} className="flex items-start gap-2">
                              <span className="text-current mt-1 font-medium">{pointIndex + 1}.</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {(!assessmentData.instructions || assessmentData.instructions.length === 0) && (
              <Card className="border-dashed border-2 border-yellow-300 bg-yellow-50">
                <CardContent className="p-8 text-center">
                  <FileText className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">No instructions provided</h3>
                  <p className="text-yellow-700">Please read each question carefully and provide your best answer.</p>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-center pt-6">
              <Button 
                onClick={handleStartAssessment}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold"
                disabled={!assessmentData.blocks || assessmentData.blocks.length === 0}
              >
                <ArrowRight className="h-5 w-5 mr-2" />
                Start Assessment
              </Button>
            </div>

            {(!assessmentData.blocks || assessmentData.blocks.length === 0) && (
              <Card className="border-dashed border-2 border-gray-300">
                <CardContent className="p-8 text-center">
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No questions added</h3>
                  <p className="text-gray-600">Add questions to enable the assessment.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {currentView === 'assessment' && assessmentData.blocks && assessmentData.blocks.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">
                  Question {currentQuestionIndex + 1} of {assessmentData.blocks.length}
                </span>
                <div className="w-48 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / assessmentData.blocks.length) * 100}%` }}
                  />
                </div>
              </div>
              {timeRemaining > 0 && (
                <div className="flex items-center gap-2 text-orange-600 font-medium">
                  <Clock className="h-4 w-4" />
                  {formatTime(timeRemaining)}
                </div>
              )}
            </div>

            {renderQuestion(assessmentData.blocks[currentQuestionIndex], currentQuestionIndex)}

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              
              <div className="flex gap-2">
                {currentQuestionIndex < assessmentData.blocks.length - 1 ? (
                  <Button onClick={handleNextQuestion}>
                    Next Question
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmitAssessment}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Submit Assessment
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {currentView === 'completed' && (
          <div className="space-y-6">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-green-900 mb-4">Assessment Submitted!</h2>
                <p className="text-green-700 text-lg mb-6">
                  Your assessment has been submitted successfully. Thank you for your participation.
                </p>
                <div className="bg-white/60 rounded-lg p-4 inline-block">
                  <p className="text-sm text-green-800">
                    <strong>Questions Answered:</strong> {Object.keys(answers).length} / {assessmentData.blocks?.length || 0}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-4 border-t">
          {currentView === 'overview' && (
            <Button variant="outline" onClick={onClose}>
              Close Preview
            </Button>
          )}
          {(currentView === 'assessment' || currentView === 'completed') && (
            <>
              <Button 
                variant="outline" 
                onClick={() => {
                  setCurrentView('overview');
                  setCurrentQuestionIndex(0);
                  setAnswers({});
                }}
              >
                Back to Overview
              </Button>
              <Button variant="outline" onClick={onClose}>
                Close Preview
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};