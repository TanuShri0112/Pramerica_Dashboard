import React from 'react';
import { Settings } from 'lucide-react';

export const CopilotUsers = () => {
  const users = [
    {
      name: 'PaulMichael Rowland',
      tasks: 12,
      maxCredits: 50000,
      creditsUsed: 12345,
      creditsLeft: 37655
    },
    {
      name: 'Samir Kumar',
      tasks: 8,
      maxCredits: 30000,
      creditsUsed: 5678,
      creditsLeft: 24322
    },
    {
      name: 'John Doe',
      tasks: 5,
      maxCredits: 20000,
      creditsUsed: 3456,
      creditsLeft: 16544
    },
    {
      name: 'Jane Smith',
      tasks: 3,
      maxCredits: 10000,
      creditsUsed: 1234,
      creditsLeft: 8766
    }
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-medium mb-6">Users</h2>
      
      <div className="bg-gray-50 rounded-md shadow-sm overflow-x-auto">
        <div className="grid grid-cols-6 border-b min-w-[800px]">
          <div className="font-medium p-4 whitespace-nowrap">User</div>
          <div className="font-medium p-4 whitespace-nowrap">Tasks</div>
          <div className="font-medium p-4 whitespace-nowrap">Max credits</div>
          <div className="font-medium p-4 whitespace-nowrap">Credits used</div>
          <div className="font-medium p-4 whitespace-nowrap">Credits left</div>
          <div className="font-medium p-4 whitespace-nowrap">Details</div>
        </div>
        
        {users.map((user, index) => (
          <div key={index} className="grid grid-cols-6 border-b min-w-[800px]">
            <div className="p-4 text-primary hover:underline cursor-pointer whitespace-nowrap">{user.name}</div>
            <div className="p-4 whitespace-nowrap">{user.tasks}</div>
            <div className="p-4 whitespace-nowrap">{user.maxCredits.toLocaleString()}</div>
            <div className="p-4 whitespace-nowrap">{user.creditsUsed.toLocaleString()}</div>
            <div className="p-4 whitespace-nowrap">{user.creditsLeft.toLocaleString()}</div>
            <div className="p-4 whitespace-nowrap">
              <Settings className="h-5 w-5 text-gray-500 cursor-pointer hover:text-primary" />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        Showing {users.length} of {users.length} users
      </div>
    </div>
  );
};

export default CopilotUsers;