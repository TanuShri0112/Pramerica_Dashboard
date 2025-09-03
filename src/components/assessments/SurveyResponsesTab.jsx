import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Eye, User } from 'lucide-react';

const sampleResponses = [
  {
    id: '1',
    student: {
      name: 'John Smith',
      email: 'john.smith@email.com',
      avatar: '/placeholder.svg'
    },
    submittedAt: '2024-01-15 10:30 AM',
    responses: {
      q1: {
        question: 'How would you rate the course content?',
        answer: 'Excellent',
        type: 'mcq'
      },
      q2: {
        question: 'What did you like most about this module?',
        answer: 'The practical examples and clear explanations helped me understand the concepts better.',
        type: 'descriptive'
      },
      q3: {
        question: 'Was the pace of the course appropriate?',
        answer: 'Yes',
        type: 'mcq'
      },
      q4: {
        question: 'Any suggestions for improvement?',
        answer: 'Maybe add more interactive exercises and real-world case studies.',
        type: 'descriptive'
      }
    }
  },
  {
    id: '2',
    student: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      avatar: '/placeholder.svg'
    },
    submittedAt: '2024-01-15 02:15 PM',
    responses: {
      q1: {
        question: 'How would you rate the course content?',
        answer: 'Good',
        type: 'mcq'
      },
      q2: {
        question: 'What did you like most about this module?',
        answer: 'The structured approach and step-by-step guidance.',
        type: 'descriptive'
      },
      q3: {
        question: 'Was the pace of the course appropriate?',
        answer: 'Too fast',
        type: 'mcq'
      },
      q4: {
        question: 'Any suggestions for improvement?',
        answer: 'Slow down the pace and provide more practice opportunities.',
        type: 'descriptive'
      }
    }
  }
];

const SurveyResponsesTab = ({ survey }) => {
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewResponse = (response) => {
    setSelectedResponse(response);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Survey Responses</h3>
          <p className="text-sm text-gray-600">View all student responses to this survey</p>
        </div>
        <Badge variant="outline">{sampleResponses.length} Responses</Badge>
      </div>

      <div className="grid gap-4">
        {sampleResponses.map((response) => (
          <Card key={response.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={response.student.avatar} alt={response.student.name} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{response.student.name}</h4>
                    <p className="text-sm text-gray-600">{response.student.email}</p>
                    <p className="text-xs text-gray-500">Submitted: {response.submittedAt}</p>
                  </div>
                </div>
                <Button
                  onClick={() => handleViewResponse(response)}
                  variant="outline"
                  size="sm"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Response
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Response Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {selectedResponse?.student.name} - Survey Response
            </DialogTitle>
          </DialogHeader>

          {selectedResponse && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={selectedResponse.student.avatar} alt={selectedResponse.student.name} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedResponse.student.name}</p>
                    <p className="text-sm text-gray-600">{selectedResponse.student.email}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">Submitted: {selectedResponse.submittedAt}</p>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Survey Responses</h4>
                {Object.entries(selectedResponse.responses).map(([key, response]) => (
                  <Card key={key} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h5 className="font-medium text-gray-900">{response.question}</h5>
                          <Badge className={response.type === 'mcq' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>
                            {response.type === 'mcq' ? 'Multiple Choice' : 'Descriptive'}
                          </Badge>
                        </div>
                        <div className="bg-gray-50 p-3 rounded border">
                          <p className="text-gray-800">{response.answer}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {sampleResponses.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-gray-500 mb-4">No responses submitted yet</p>
            <p className="text-sm text-gray-400">Responses will appear here once students submit the survey</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SurveyResponsesTab;
