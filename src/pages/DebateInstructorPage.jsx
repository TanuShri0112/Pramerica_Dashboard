import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { DebateInstructorDashboard } from '@/components/assessments/DebateInstructorDashboard';

// Sample debate data
const sampleDebates = [
  {
    id: 'debate-1',
    title: "Debate 1: Technology's Impact on Society",
    description: 'Discuss whether technology has done more harm than good to modern society.',
    topic: 'Technology has done more harm than good to society',
    maxScore: 50,
    difficulty: 'Medium',
    format: 'Class discussion',
    participants: [
      {
        id: 'user-1',
        name: 'John Smith',
        email: 'john@example.com',
        avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png',
        team: 'for',
        status: 'completed',
      },
      {
        id: 'user-2',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png',
        team: 'against',
        status: 'pending',
      },
      {
        id: 'user-3',
        name: 'Mike Wilson',
        email: 'mike@example.com',
        avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png',
        team: 'for',
        status: 'not-attempted',
      },
      {
        id: 'user-4',
        name: 'Emily Davis',
        email: 'emily@example.com',
        avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png',
        team: 'against',
        status: 'completed',
      },
      {
        id: 'user-5',
        name: 'Robert Brown',
        email: 'robert@example.com',
        avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png',
        status: 'not-attempted',
      },
    ],
    forUsers: ['user-1', 'user-3'],
    againstUsers: ['user-2', 'user-4'],
    submissions: [
      {
        id: 'sub-1',
        userId: 'user-1',
        userName: 'John Smith',
        position: 'for',
        response:
          'Technology has revolutionized healthcare, education, and communication, making our lives significantly better. The benefits far outweigh the drawbacks.',
        score: 42,
        submittedAt: '2024-01-15T10:30:00Z',
        feedback: 'Great points about healthcare and education benefits!',
      },
      {
        id: 'sub-2',
        userId: 'user-2',
        userName: 'Sarah Johnson',
        position: 'against',
        response:
          'While technology has benefits, it has also led to social isolation, job displacement, and privacy concerns that are harming society.',
        submittedAt: '2024-01-15T11:15:00Z',
      },
      {
        id: 'sub-3',
        userId: 'user-4',
        userName: 'Emily Davis',
        position: 'against',
        response:
          'Technology addiction is real and affecting mental health, especially among young people.',
        score: 38,
        submittedAt: '2024-01-16T09:20:00Z',
      },
    ],
  },
];

const DebateInstructorPage = () => {
  const { moduleId, debateId } = useParams();
  const navigate = useNavigate();
  const [debate, setDebate] = useState(
    sampleDebates.find(d => d.id === debateId) || sampleDebates[0]
  );

  const handleBack = () => {
    navigate(`/courses/modules/${moduleId}/assessments`);
  };

  const handleDebateUpdate = updatedDebate => {
    setDebate(updatedDebate);
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-auto">
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button onClick={handleBack} variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Assessments
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Debate Instructor Dashboard</h1>
            <p className="text-gray-600">Manage and evaluate debate activities</p>
          </div>
        </div>

        <DebateInstructorDashboard
          open={true}
          onOpenChange={() => {}}
          debate={debate}
          onUpdate={handleDebateUpdate}
          isFullPage={true}
        />
      </div>
    </div>
  );
};

export default DebateInstructorPage;
