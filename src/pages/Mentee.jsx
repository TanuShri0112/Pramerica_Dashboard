import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Mentee = () => {
  return (
    <div className="space-y-6 p-6 animate-fade-in">
      <h1 className="text-2xl font-bold">Mentee</h1>
      <Card>
        <CardHeader><CardTitle>Personalized Learning Path</CardTitle></CardHeader>
        <CardContent className="text-sm text-gray-600">Your learning path will appear here.</CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Upcoming Sessions & Deadlines</CardTitle></CardHeader>
        <CardContent className="text-sm text-gray-600">Calendar items will appear here.</CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Course Progress & Badges</CardTitle></CardHeader>
        <CardContent className="text-sm text-gray-600">Progress and badges will appear here.</CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Reflection Journal</CardTitle></CardHeader>
        <CardContent className="text-sm text-gray-600">Your reflections will appear here.</CardContent>
      </Card>
    </div>
  );
};

export default Mentee;


