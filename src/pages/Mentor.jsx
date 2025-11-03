import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Mentor = () => {
  return (
    <div className="space-y-6 p-6 animate-fade-in">
      <h1 className="text-2xl font-bold">Mentor</h1>
      <Card>
        <CardHeader><CardTitle>Assigned Mentees</CardTitle></CardHeader>
        <CardContent className="text-sm text-gray-600">No mentees assigned yet.</CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Sessions</CardTitle></CardHeader>
        <CardContent className="text-sm text-gray-600">Upcoming and past sessions will appear here.</CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Reflections & Feedback</CardTitle></CardHeader>
        <CardContent className="text-sm text-gray-600">Reflections and feedback summaries will appear here.</CardContent>
      </Card>
    </div>
  );
};

export default Mentor;


