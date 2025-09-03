import React from 'react';
import { useParams } from 'react-router-dom';
import { Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// This can be a simplified version of the original GroupDetail content, or a new overview.
// For now, a simple placeholder.
const GroupOverviewPage = () => {
  const { groupId } = useParams();

  // Mock data or fetch real data based on groupId
  const group = {
    id: groupId || "1",
    name: `Group ${groupId || "Details"} Overview`,
    description: "This is the overview page for the group.",
    members: 20,
    active: true,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-semibold">{group.name}</h1>
      <Card>
        <CardHeader>
          <CardTitle>Group Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{group.description}</p>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <p>{group.members} members</p>
          </div>
          <div className={`mt-2 px-3 py-1 inline-block rounded-full text-sm ${group.active ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            {group.active ? 'Active' : 'Inactive'}
          </div>
        </CardContent>
      </Card>
       <p className="mt-4 text-muted-foreground">Further details like student lists, assignments, etc., can be part of dedicated sections like 'Members' or 'Assignments'.</p>
    </div>
  );
};

export default GroupOverviewPage;