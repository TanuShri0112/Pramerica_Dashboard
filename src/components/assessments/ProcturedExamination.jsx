import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Camera, Mic, Monitor, Shield, Eye, Wifi } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ProcturedExamination = () => {
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes
  const [startTime] = useState(Date.now());
  const [isCompleted, setIsCompleted] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [completionTime, setCompletionTime] = useState(0);

  useEffect(() => {
    if (examStarted) {
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
    }
  }, [examStarted]);

  const examDetails = {
    title: "Proctored Examination Setup",
    duration: "30 minutes",
    questions: "10 questions",
    type: "Multiple Choice",
    attempts: "1 attempt only"
  };

  const systemRequirements = [
    {
      icon: Camera,
      label: "Camera Access",
      status: "Enabled",
      description: "Webcam required for identity verification",
      statusColor: "text-green-600 bg-green-100"
    },
    {
      icon: Eye,
      label: "Face Detection",
      status: "Active",
      description: "Continuous face monitoring during exam",
      statusColor: "text-green-600 bg-green-100"
    },
    {
      icon: Mic,
      label: "Microphone Access",
      status: "Enabled",
      description: "Audio monitoring for exam integrity",
      statusColor: "text-green-600 bg-green-100"
    },
    {
      icon: Shield,
      label: "Browser Security",
      status: "Verified",
      description: "Secure browser environment confirmed",
      statusColor: "text-green-600 bg-green-100"
    },
    {
      icon: Monitor,
      label: "Screen Sharing",
      status: "Enabled",
      description: "Desktop monitoring during examination",
      statusColor: "text-green-600 bg-green-100"
    },
    {
      icon: Wifi,
      label: "Network Stability",
      status: "Good",
      description: "Stable internet connection detected",
      statusColor: "text-green-600 bg-green-100"
    }
  ];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartExam = () => {
    setExamStarted(true);
  };

  const handleCompleteExam = () => {
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    setCompletionTime(timeTaken);
    setIsCompleted(true);
  };

  const handleRestart = () => {
    setExamStarted(false);
    setIsCompleted(false);
    setTimeRemaining(1800);
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center p-8">
            <CardContent>
              <h1 className="text-3xl font-bold mb-4 text-green-600">Exam Submitted!</h1>
              <p className="text-lg mb-4">
                Your proctored examination has been successfully submitted and recorded
              </p>
              <p className="text-md mb-6 text-gray-600">
                Time taken: {formatTime(completionTime)}
              </p>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-blue-700">
                  <span className="font-medium">Note:</span> Your exam session has been recorded and will be reviewed by our proctoring team for verification.
                </p>
              </div>
              <div className="space-y-4">
                <Button onClick={handleRestart} className="w-full bg-blue-600 hover:bg-blue-700">
                  New Exam Session
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

  if (examStarted) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Proctored Exam Header */}
          <div className="bg-red-600 text-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Shield className="h-6 w-6" />
                <div>
                  <h1 className="text-2xl font-bold">PROCTORED EXAMINATION IN PROGRESS</h1>
                  <p className="text-red-100">You are being monitored • Do not leave this page</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="font-mono text-xl">{formatTime(timeRemaining)}</span>
              </div>
            </div>
          </div>

          {/* Monitoring Status */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <Card className="border-green-200">
              <CardContent className="p-4 text-center">
                <Camera className="h-6 w-6 mx-auto mb-2 text-green-600" />
                <div className="text-sm font-medium">Camera</div>
                <div className="text-xs text-green-600">Recording</div>
              </CardContent>
            </Card>
            <Card className="border-green-200">
              <CardContent className="p-4 text-center">
                <Mic className="h-6 w-6 mx-auto mb-2 text-green-600" />
                <div className="text-sm font-medium">Audio</div>
                <div className="text-xs text-green-600">Monitoring</div>
              </CardContent>
            </Card>
            <Card className="border-green-200">
              <CardContent className="p-4 text-center">
                <Monitor className="h-6 w-6 mx-auto mb-2 text-green-600" />
                <div className="text-sm font-medium">Screen</div>
                <div className="text-xs text-green-600">Sharing</div>
              </CardContent>
            </Card>
          </div>

          {/* Exam Content Placeholder */}
          <Card className="mb-6">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Examination in Progress</h2>
              <p className="text-gray-600 mb-8">
                This is a demonstration of the proctored exam interface. In a real exam, questions would appear here.
              </p>

              <div className="bg-yellow-50 p-6 rounded-lg mb-6 text-left">
                <h3 className="font-semibold mb-4">Proctoring Rules:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Keep your face visible to the camera at all times</li>
                  <li>• Do not look away from the screen for extended periods</li>
                  <li>• No talking or external communication allowed</li>
                  <li>• Do not use any unauthorized materials</li>
                  <li>• Keep your hands visible when not typing</li>
                </ul>
              </div>

              <Button onClick={handleCompleteExam} className="bg-red-600 hover:bg-red-700">
                Submit Exam
              </Button>
            </CardContent>
          </Card>

          {/* Warnings */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-700">
              <Shield className="h-4 w-4" />
              <span className="font-medium">Security Notice:</span>
            </div>
            <p className="text-red-600 text-sm mt-1">
              Any suspicious activity will be flagged and may result in exam termination.
            </p>
          </div>
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
              <Button onClick={() => navigate('/courses/modules/1/assessments')} variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Proctored Examination</h1>
                <p className="text-gray-600">Question 1 of 10</p>
                <Badge className="bg-red-100 text-red-800">Demo Mode</Badge>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-4 w-4" />
              <span className="font-mono">30:00</span>
            </div>
          </div>
        </div>

        {/* Exam Details */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold">{examDetails.title}</h2>
              </div>
              <Badge className="bg-blue-100 text-blue-800">Secure Environment</Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <Clock className="h-5 w-5 mx-auto mb-2 text-gray-500" />
                <div className="font-medium">Duration</div>
                <div className="text-sm text-gray-600">{examDetails.duration}</div>
              </div>
              <div className="text-center">
                <Shield className="h-5 w-5 mx-auto mb-2 text-gray-500" />
                <div className="font-medium">Questions</div>
                <div className="text-sm text-gray-600">{examDetails.questions}</div>
              </div>
              <div className="text-center">
                <Eye className="h-5 w-5 mx-auto mb-2 text-gray-500" />
                <div className="font-medium">Type</div>
                <div className="text-sm text-gray-600">{examDetails.type}</div>
              </div>
              <div className="text-center">
                <Camera className="h-5 w-5 mx-auto mb-2 text-gray-500" />
                <div className="font-medium">Attempts</div>
                <div className="text-sm text-gray-600">{examDetails.attempts}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Requirements Check */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Monitor className="h-5 w-5 mr-2 text-green-600" />
              System Requirements Check
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {systemRequirements.map((requirement, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <requirement.icon className="h-5 w-5 text-gray-600" />
                    <div>
                      <div className="font-medium">{requirement.label}</div>
                      <div className="text-sm text-gray-500">{requirement.description}</div>
                    </div>
                  </div>
                  <Badge className={requirement.statusColor}>
                    {requirement.status}
                  </Badge>
                </div>
              ))}
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-green-700 mb-2">
                <Shield className="h-4 w-4" />
                <span className="font-medium">All Systems Ready</span>
              </div>
              <p className="text-green-600 text-sm">
                Your system meets all requirements for proctored examination.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Important Information */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 text-red-700">Important Proctoring Information</h3>
            <div className="bg-red-50 p-4 rounded-lg mb-4">
              <ul className="space-y-2 text-sm text-red-700">
                <li>• Your exam session will be recorded via webcam and screen sharing</li>
                <li>• An AI proctor will monitor your behavior throughout the exam</li>
                <li>• Any suspicious activity will be flagged for manual review</li>
                <li>• You must remain visible to the camera at all times</li>
                <li>• No external materials or communication is permitted</li>
                <li>• Browser switching or tab changes are prohibited</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-700">
                <span className="font-medium">Privacy Notice:</span> Recorded sessions are used solely for exam integrity verification and are deleted after 30 days.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Start Exam */}
        <div className="text-center">
          <Button onClick={handleStartExam} className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg">
            <Shield className="h-5 w-5 mr-2" />
            Start Proctored Exam
          </Button>
          <p className="text-sm text-gray-500 mt-2">
            By starting this exam, you consent to being monitored and recorded
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcturedExamination;
