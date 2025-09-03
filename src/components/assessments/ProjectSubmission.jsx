import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ArrowLeft,
  Clock,
  Calendar,
  Users,
  FileText,
  CheckCircle,
  Circle,
  Upload
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const ProjectSubmission = () => {
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes
  const [startTime] = useState(Date.now());
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [repositoryUrl, setRepositoryUrl] = useState('');
  const [liveDemoUrl, setLiveDemoUrl] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [completionTime, setCompletionTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
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

  const projectDetails = {
    title: 'Full-Stack Web Application Development',
    description:
      'Build a complete web application with authentication, database integration, and responsive design',
    duration: '4 weeks',
    dueDate: 'April 30, 2024',
    teamSize: '2-4 members',
    deliverables: '5 Deliverables'
  };

  const projectTasks = [
    { id: '1', title: 'Project Proposal', dueDate: 'Week 1', status: 'completed' },
    { id: '2', title: 'Wireframes & Database Design', dueDate: 'Week 2', status: 'in-progress' },
    { id: '3', title: 'MVP (Minimum Viable Product)', dueDate: 'Week 3', status: 'pending' },
    { id: '4', title: 'Final Submission', dueDate: 'Week 4', status: 'pending' },
    { id: '5', title: 'Presentation', dueDate: 'Week 4', status: 'pending' }
  ];

  const projectRequirements = [
    'Frontend using React.js or Vue.js with responsive design',
    'Backend API using Node.js, Python, or PHP',
    'Database integration (SQL or NoSQL)',
    'User authentication and authorization',
    'At least 5 core features/pages',
    'Deployment to cloud platform',
    'Comprehensive documentation',
    'Unit and integration tests'
  ];

  const currentDeliverable = {
    title: 'Wireframes & Database Design',
    requirements: [
      'UI/UX wireframes for all main pages',
      'Database schema with relationships',
      'API endpoint documentation',
      'Technology stack justification'
    ]
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const handleSubmit = () => {
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    setCompletionTime(timeTaken);
    setIsCompleted(true);
  };

  const handleRestart = () => {
    setUploadedFiles([]);
    setRepositoryUrl('');
    setLiveDemoUrl('');
    setIsCompleted(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in-progress':
        return <Circle className="h-5 w-5 text-orange-500 fill-current" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'in-progress':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const completedTasks = projectTasks.filter((task) => task.status === 'completed').length;
  const progressPercentage = (completedTasks / projectTasks.length) * 100;

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center p-8">
            <CardContent>
              <h1 className="text-3xl font-bold mb-4 text-green-600">Project Submitted!</h1>
              <p className="text-lg mb-4">
                Your project deliverable has been successfully submitted
              </p>
              <p className="text-md mb-6 text-gray-600">
                Time taken: {formatTime(completionTime)}
              </p>
              <div className="space-y-4">
                <Button onClick={handleRestart} className="w-full bg-blue-600 hover:bg-blue-700">
                  New Submission
                </Button>
                <Button
                  onClick={() => navigate('/courses/modules/1/assessments')}
                  variant="outline"
                  className="w-full"
                >
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
                <h1 className="text-2xl font-bold">Project Submission</h1>
                <p className="text-gray-600">Question 1 of 1</p>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  Demo Mode
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-4 w-4" />
              <span className="font-mono">{formatTime(timeRemaining)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Section */}
          <div className="lg:col-span-2">
            {/* Project Overview */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-blue-600 mb-2">
                      {projectDetails.title}
                    </h2>
                    <p className="text-gray-700 mb-4">{projectDetails.description}</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Team Project</Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Duration: {projectDetails.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Due: {projectDetails.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Team: {projectDetails.teamSize}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{projectDetails.deliverables}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Project Progress</h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm text-gray-600">
                    {completedTasks}/{projectTasks.length} Completed
                  </span>
                </div>
                <Progress value={progressPercentage} className="mb-6" />

                <div className="space-y-4">
                  {projectTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {getStatusIcon(task.status)}
                        <div>
                          <p className="font-medium">{task.title}</p>
                          <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(task.status)}>
                        {task.status === 'in-progress'
                          ? 'In Progress'
                          : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Deliverable */}
            <Card className="border-l-4 border-l-yellow-500">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-yellow-600" />
                  Current Deliverable: {currentDeliverable.title}
                </h3>

                <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                  <h4 className="font-medium mb-3">What to Submit:</h4>
                  <ul className="space-y-2">
                    {currentDeliverable.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Upload Section */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                  <h4 className="font-medium mb-2">Upload your design documents</h4>
                  <p className="text-sm text-gray-500 mb-4">PDF, PNG, JPG, ZIP files accepted</p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="deliverable-upload"
                    accept=".pdf,.png,.jpg,.jpeg,.zip"
                  />
                  <Button asChild variant="outline">
                    <label htmlFor="deliverable-upload" className="cursor-pointer">
                      Choose Files
                    </label>
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Repository URL</label>
                    <Input
                      placeholder="https://github.com/username/project"
                      value={repositoryUrl}
                      onChange={(e) => setRepositoryUrl(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Live Demo URL</label>
                    <Input
                      placeholder="https://yourproject.netlify.app"
                      value={liveDemoUrl}
                      onChange={(e) => setLiveDemoUrl(e.target.value)}
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={uploadedFiles.length === 0}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Submit Wireframes & Database Design
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Project Requirements</h3>
                <ul className="space-y-3 text-sm">
                  {projectRequirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Demo Mode:</h4>
              <p className="text-sm text-blue-700">
                This is a demonstration of project-based assessment. In a real scenario, students
                would have weeks to complete their projects with regular check-ins and milestone
                submissions.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button variant="outline" disabled>
            Previous
          </Button>

          <span className="text-sm text-gray-500">Auto-save enabled</span>

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

export default ProjectSubmission;
