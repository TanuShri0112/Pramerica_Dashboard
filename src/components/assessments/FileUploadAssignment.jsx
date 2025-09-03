import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Clock, Upload, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const FileUploadAssignment = () => {
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes
  const [startTime] = useState(Date.now());
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [completionTime, setCompletionTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const assignmentDetails = {
    title: "Web Development Project Report",
    description: "Submit your completed project report including analysis, code documentation, and deployment instructions. Your submission should include:",
    requirements: [
      "Project overview and objectives",
      "Technical implementation details", 
      "Challenges faced and solutions",
      "Future improvements and scalability considerations",
      "Source code (if applicable)"
    ],
    dueDate: "March 15, 2024 at 11:59 PM",
    lateSubmission: "-10% per day",
    maxAttempts: "3 submissions allowed"
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleRemoveFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    setCompletionTime(timeTaken);
    setIsCompleted(true);
  };

  const handleRestart = () => {
    setUploadedFiles([]);
    setSubmissionNotes('');
    setIsCompleted(false);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center p-8">
            <CardContent>
              <h1 className="text-3xl font-bold mb-4 text-green-600">Assignment Submitted!</h1>
              <p className="text-lg mb-4">Your assignment has been successfully submitted for review</p>
              <p className="text-md mb-6 text-gray-600">
                Time taken: {formatTime(completionTime)}
              </p>
              <div className="space-y-4">
                <Button onClick={handleRestart} className="w-full bg-blue-600 hover:bg-blue-700">
                  New Submission
                </Button>
                <Button onClick={() => navigate('/courses/modules/1/assessments')} variant="outline" className="w-full">
                  Back to Assessments
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
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
                <h1 className="text-2xl font-bold">File Upload Assignment</h1>
                <p className="text-gray-600">Question 1 of 1</p>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Demo Mode</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-4 w-4" />
              <span className="font-mono">{formatTime(timeRemaining)}</span>
            </div>
          </div>
        </div>

        {/* Assignment Details */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Assignment Submission
                </h2>
                <h3 className="font-semibold mb-2">Assignment: {assignmentDetails.title}</h3>
                <p className="text-gray-700 mb-4">{assignmentDetails.description}</p>
              </div>
            </div>

            <ul className="space-y-2 mb-6">
              {assignmentDetails.requirements.map((requirement, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* File Upload Section */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Choose File</h3>
              <p className="text-sm text-gray-500 mb-4">
                Supported formats: .pdf, .doc, .docx, .ppt, .pptx, .zip, .rar | Max size: 10MB
              </p>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.zip,.rar"
              />
              <Button asChild variant="outline">
                <label htmlFor="file-upload" className="cursor-pointer">
                  Choose Files
                </label>
              </Button>
            </div>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">Uploaded Files:</h4>
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <Button 
                      onClick={() => handleRemoveFile(index)}
                      variant="ghost" 
                      size="sm"
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submission Notes */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="font-medium mb-4">Submission Notes (Optional)</h3>
            <Textarea
              placeholder="Add any additional notes about your submission..."
              value={submissionNotes}
              onChange={(e) => setSubmissionNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </CardContent>
        </Card>

        {/* Assignment Info */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <span className="font-medium">Due Date:</span>
                <p className="text-gray-600">{assignmentDetails.dueDate}</p>
              </div>
              <div>
                <span className="font-medium">Late Submission:</span>
                <p className="text-gray-600">{assignmentDetails.lateSubmission}</p>
              </div>
              <div>
                <span className="font-medium">Max Attempts:</span>
                <p className="text-gray-600">{assignmentDetails.maxAttempts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button variant="outline" disabled>
            Previous
          </Button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Auto-save enabled</span>
          </div>
          
          <Button 
            onClick={handleSubmit}
            disabled={uploadedFiles.length === 0}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Complete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadAssignment;
