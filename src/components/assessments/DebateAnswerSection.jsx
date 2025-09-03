import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MessageSquare, Clock } from 'lucide-react';

export const DebateAnswerSection = ({ debate, onSubmit }) => {
  const [answer, setAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmit(answer);
      setIsSubmitted(true);
    }
  };

  return (
    <Card className="mt-6 border-2 border-red-200 bg-red-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-700">
          <MessageSquare className="h-5 w-5" />
          Your Debate Response
        </CardTitle>
        <div className="text-sm text-gray-600 flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            Preparation Time: {debate.content.timeLimit} minutes
          </span>
          <span>Position: {debate.content.position === 'for' ? 'Supporting' : 'Opposing'}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="debate-answer">Write your debate argument:</Label>
          <Textarea
            id="debate-answer"
            placeholder="Present your argument clearly and persuasively. Support your position with evidence and logical reasoning..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="mt-2 min-h-[200px]"
            disabled={isSubmitted}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {answer.length} characters
          </div>
          <Button 
            onClick={handleSubmit}
            disabled={!answer.trim() || isSubmitted}
            className="bg-red-600 hover:bg-red-700"
          >
            {isSubmitted ? 'Submitted' : 'Submit Debate Response'}
          </Button>
        </div>
        
        {isSubmitted && (
          <div className="text-sm text-green-600 bg-green-50 p-3 rounded-md">
            ✓ Your debate response has been submitted successfully!
          </div>
        )}
      </CardContent>
    </Card>
  );
};