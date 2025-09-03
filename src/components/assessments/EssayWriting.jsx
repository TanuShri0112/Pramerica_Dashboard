import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Clock, FileText, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const EssayWriting = () => {
  const navigate = useNavigate();
  const [essayContent, setEssayContent] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes

  const essayPrompt = {
    title: "The Future of Web Development: Emerging Technologies and Their Impact",
    description: "Write a comprehensive essay discussing the current trends in web development and how emerging technologies like AI, WebAssembly, and Progressive Web Apps are shaping the future of the industry.",
    requirements: [
      "Minimum 800 words, maximum 1200 words",
      "Include at least 3 specific technologies or frameworks",
      "Discuss both opportunities and challenges",
      "Provide concrete examples or case studies",
      "Maintain a clear argumentative structure with introduction, body, and conclusion"
    ],
    criteria: [
      "Technical accuracy and depth of knowledge (30%)",
      "Critical thinking and analysis (25%)",
      "Writing clarity and organization (20%)",
      "Use of examples and evidence (15%)",
      "Grammar and style (10%)"
    ]
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getWordCount = (text) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const getCharacterCount = (text) => {
    return text.length;
  };

  const handleSubmit = () => {
    setIsCompleted(true);
  };

  const handleRestart = () => {
    setEssayContent('');
    setIsCompleted(false);
    setTimeRemaining(3600);
  };

  if (isCompleted) {
    const wordCount = getWordCount(essayContent);
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center p-8">
            <CardContent>
              <h1 className="text-3xl font-bold mb-4 text-green-600">Essay Submitted!</h1>
              <p className="text-lg mb-4">Your essay has been successfully submitted for review</p>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-blue-700">
                  <span className="font-medium">Final word count:</span> {wordCount} words
                </p>
              </div>
              <div className="space-y-4">
                <Button onClick={handleRestart} className="w-full bg-blue-600 hover:bg-blue-700">
                  Write New Essay
                </Button>
                <Button onClick={() => navigate('/courses/modules/1/assessments')} variant="outline" className="w-full">
                  Back to Assessments
                </Button>
                <Button onClick={() => navigate('/courses/modules')} variant="outline" className="w-full">
                  Go to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const wordCount = getWordCount(essayContent);
  const characterCount = getCharacterCount(essayContent);
  const isValidLength = wordCount >= 800 && wordCount <= 1200;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => navigate('/courses/modules/1/assessments')} 
                variant="ghost"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Essay Writing</h1>
                <p className="text-gray-600">Question 1 of 1</p>
                <Badge className="bg-purple-100 text-purple-800">
                  <FileText className="h-3 w-3 mr-1" />
                  Long Form
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-4 w-4" />
              <span className="font-mono">{formatTime(timeRemaining)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Writing Area */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-6">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                  <h2 className="text-xl font-semibold">{essayPrompt.title}</h2>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {essayPrompt.description}
                </p>

                <div className="space-y-4">
                  <label className="block font-medium text-gray-700">
                    Your Essay:
                  </label>
                  <Textarea
                    placeholder="Begin writing your essay here..."
                    value={essayContent}
                    onChange={(e) => setEssayContent(e.target.value)}
                    className="min-h-[500px] text-base leading-relaxed"
                  />
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-6 text-sm">
                      <span className={`${
                        wordCount < 800 ? 'text-red-600' :
                        wordCount > 1200 ? 'text-red-600' :
                        'text-green-600'
                      }`}>
                        Words: {wordCount}
                      </span>
                      <span className="text-gray-500">
                        Characters: {characterCount}
                      </span>
                      <span className="text-gray-500">
                        Target: 800-1200 words
                      </span>
                    </div>
                    {isValidLength && (
                      <Badge className="bg-green-100 text-green-800">
                        Valid length
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-between items-center">
              <Button variant="outline" disabled>
                Previous
              </Button>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Auto-save enabled</span>
              </div>
              
              <Button 
                onClick={handleSubmit}
                disabled={wordCount < 100}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Submit Essay
              </Button>
            </div>
          </div>

          {/* Sidebar with Requirements */}
          <div className="space-y-6">
            {/* Requirements */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Essay Requirements
                </h3>
                <ul className="space-y-3 text-sm">
                  {essayPrompt.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Grading Criteria */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Grading Criteria</h3>
                <ul className="space-y-3 text-sm">
                  {essayPrompt.criteria.map((criterion, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>{criterion}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Writing Tips */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Writing Tips</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <p>• Start with a strong thesis statement</p>
                  <p>• Use topic sentences for each paragraph</p>
                  <p>• Support arguments with specific examples</p>
                  <p>• Maintain formal academic tone</p>
                  <p>• Proofread for grammar and clarity</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EssayWriting;