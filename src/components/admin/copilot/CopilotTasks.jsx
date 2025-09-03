import React from 'react';

export const CopilotTasks = () => {
  const tasks = [
    { name: 'Add a course', count: 23, users: 2, credits: 19473 },
    { name: 'Generate quiz', count: 45, users: 5, credits: 5678 },
    { name: 'Create lesson', count: 32, users: 3, credits: 8765 },
    { name: 'Generate summary', count: 12, users: 1, credits: 2345 },
    { name: 'Create assignment', count: 18, users: 4, credits: 3456 },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-medium mb-6">Tasks</h2>
      
      <div className="bg-gray-50 rounded-md shadow-sm">
        <div className="grid grid-cols-4 border-b">
          <div className="font-medium p-4">Task</div>
          <div className="font-medium p-4">Count</div>
          <div className="font-medium p-4">Users</div>
          <div className="font-medium p-4">Credits</div>
        </div>
        
        {tasks.map((task, index) => (
          <div key={index} className="grid grid-cols-4 border-b last:border-b-0">
            <div className="p-4">{task.name}</div>
            <div className="p-4">{task.count}</div>
            <div className="p-4">{task.users}</div>
            <div className="p-4">{task.credits.toLocaleString()}</div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        Showing {tasks.length} of {tasks.length} tasks
      </div>
    </div>
  );
};

export default CopilotTasks;