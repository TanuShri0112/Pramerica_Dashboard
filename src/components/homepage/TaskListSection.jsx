import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Clock, ChevronRight, Plus } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';

export function TaskListSection() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Complete Insurance Sales Assignment',
      dueDate: '2023-07-10',
      completed: false,
      priority: 'high'
    },
    {
      id: 2,
      title: 'Review Life Insurance Documentation',
      dueDate: '2023-07-12',
      completed: false,
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Submit Sales Proposal',
      dueDate: '2023-07-15',
      completed: true,
      priority: 'high'
    },
    {
      id: 4,
      title: 'Watch Lecture on Sales Techniques',
      dueDate: '2023-07-08',
      completed: false,
      priority: 'low'
    }
  ]);

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleAddTask = () => {
    navigate('/tasks');
  };

  const handleViewAllTasks = () => {
    navigate('/tasks');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDueDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const pendingTasks = tasks.filter(task => !task.completed).slice(0, 5);
  const completedTasks = tasks.filter(task => task.completed).slice(0, 3);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Check className="h-5 w-5 text-primary" />
            My Tasks
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8"
            onClick={handleAddTask}
          >
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {pendingTasks.length > 0 ? (
            pendingTasks.map((task) => (
              <div key={task.id} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    id={`task-${task.id}`} 
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                  />
                  <div className="flex-1 min-w-0">
                    <label
                      htmlFor={`task-${task.id}`}
                      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                        task.completed ? 'line-through text-muted-foreground' : ''
                      }`}
                    >
                      {task.title}
                    </label>
                    <div className="flex items-center mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      Due {formatDueDate(task.dueDate)}
                      <span className={`h-2 w-2 rounded-full ml-2 ${getPriorityColor(task.priority)}`} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No pending tasks. Great job!
            </div>
          )}
        </div>

        {completedTasks.length > 0 && (
          <div className="border-t">
            <div className="p-3 text-xs font-medium text-muted-foreground">
              Recently Completed
            </div>
            <div className="divide-y">
              {completedTasks.map((task) => (
                <div key={`completed-${task.id}`} className="p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm line-through text-muted-foreground">
                      {task.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full rounded-none border-t"
          onClick={handleViewAllTasks}
        >
          View All Tasks
        </Button>
      </CardContent>
    </Card>
  );
}

export default TaskListSection;
