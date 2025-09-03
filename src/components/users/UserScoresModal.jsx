import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { X } from 'lucide-react';

export const UserScoresModal = ({ open, onOpenChange, selectedUsers }) => {
  const mockScores = [
    {
      title: 'Legal Terminology Quiz',
      course: 'Introduction to Legal Studies',
      status: 'COMPLETED',
      score: '85/100',
      percentage: 85,
      due: '2024-12-20'
    },
    {
      title: 'Constitutional Law Essay',
      course: 'Constitutional Law',
      status: 'COMPLETED',
      score: '92/100',
      percentage: 92,
      due: '2024-12-18'
    },
    {
      title: 'Criminal Law Assignment',
      course: 'Criminal Law Fundamentals',
      status: 'COMPLETED',
      score: '78/100',
      percentage: 78,
      due: '2024-12-15'
    },
    {
      title: 'Practice Test',
      course: 'Legal Research Methods',
      status: 'IN PROGRESS',
      score: 'Not completed',
      percentage: 0,
      due: '2024-12-25'
    }
  ];

  const handleClose = () => {
    onOpenChange(false);
  };

  const user = selectedUsers[0];
  const overallAverage = 85;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto" hideCloseButton>
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-xl font-semibold">User Scores</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="h-6 w-6 rounded-sm opacity-70 hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{user?.name}</h3>
              <p className="text-gray-600 text-sm">{user?.email}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{overallAverage}%</div>
              <div className="text-sm text-gray-600">Overall Average</div>
            </div>
          </div>

          <div className="space-y-4">
            {mockScores.map((item, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{item.title}</h4>
                      <Badge 
                        variant={item.status === 'COMPLETED' ? 'default' : 'secondary'}
                        className={item.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{item.course}</p>
                    <p className="text-xs text-gray-500">Due: {item.due}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-lg">
                      {item.status === 'COMPLETED' ? item.score : item.score}
                    </div>
                    {item.status === 'COMPLETED' && (
                      <div className="text-sm text-gray-600">{item.percentage}%</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Overall Progress</span>
              <span className="font-semibold">{overallAverage}%</span>
            </div>
            <Progress value={overallAverage} className="h-2" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
