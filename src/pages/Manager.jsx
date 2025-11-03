import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Manager = () => {
  return (
    <div className="space-y-6 p-6 animate-fade-in">
      <h1 className="text-2xl font-bold">Regional/Training Centre Manager</h1>
      <Card>
        <CardHeader><CardTitle>Centers in Region</CardTitle></CardHeader>
        <CardContent className="text-sm text-gray-600">Centers overview will appear here.</CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Mentor & Mentee Participation</CardTitle></CardHeader>
        <CardContent className="text-sm text-gray-600">Participation metrics will appear here.</CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Schedule Face-to-Face Trainings</CardTitle></CardHeader>
        <CardContent className="text-sm text-gray-600">Scheduling tools will appear here.</CardContent>
      </Card>
    </div>
  );
};

export default Manager;


