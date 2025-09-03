import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, CheckCircle, Calendar, Clock, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const TaskManagement = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Review Insurance Sales Materials',
      description: 'Review and update insurance sales training materials for new agents',
      deadline: 'Today',
      priority: 'high',
      status: 'pending',
      category: 'Sales Training'
    },
    {
      id: 2,
      title: 'Grade Sales Technique Assessments',
      description: 'Evaluate recent sales technique assessments and provide feedback',
      deadline: 'Tomorrow',
      priority: 'medium',
      status: 'in-progress',
      category: 'Assessment'
    },
    {
      id: 3,
      title: 'Prepare Insurance License Quiz',
      description: 'Create quiz questions for upcoming insurance license preparation',
      deadline: 'Next week',
      priority: 'high',
      status: 'pending',
      category: 'Assessment'
    },
    {
      id: 4,
      title: 'Update Sales Training Syllabus',
      description: 'Make necessary updates to insurance sales training syllabus',
      deadline: 'In 2 weeks',
      priority: 'medium',
      status: 'pending',
      category: 'Planning'
    },
    {
      id: 5,
      title: 'Schedule Sales Coaching Sessions',
      description: 'Set up coaching schedule for sales agents',
      deadline: 'Next month',
      priority: 'low',
      status: 'completed',
      category: 'Administration'
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: 'medium',
    status: 'pending',
    category: 'Sales Training'
  });

  const addTask = () => {
    if (!newTask.title.trim() || !newTask.deadline.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const task = {
      id: Math.max(...tasks.map(t => t.id)) + 1,
      title: newTask.title,
      description: newTask.description,
      deadline: newTask.deadline,
      priority: newTask.priority,
      status: newTask.status,
      category: newTask.category
    };

    setTasks([...tasks, task]);
    setNewTask({ title: '', description: '', deadline: '', priority: 'medium', status: 'pending', category: 'Sales Training' });
    setIsAddDialogOpen(false);
    toast.success('Task added successfully');
  };

  const updateTask = () => {
    if (!editingTask?.title.trim() || !editingTask?.deadline.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setTasks(tasks.map(task => 
      task.id === editingTask.id ? editingTask : task
    ));
    setEditingTask(null);
    toast.success('Task updated successfully');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast.success('Task deleted successfully');
  };

  const toggleTaskStatus = (id) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
        : task
    ));
    
    const task = tasks.find(t => t.id === id);
    if (task) {
      toast.success(task.status === 'completed' ? 'Task marked as pending' : 'Task completed');
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-50 text-green-700 border-green-200';
      case 'in-progress': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'pending': return 'bg-gray-50 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const priorities = ['high', 'medium', 'low'];
  const statuses = ['pending', 'in-progress', 'completed'];
  const categories = ['Sales Training', 'Assessment', 'Planning', 'Administration', 'Compliance'];

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          onClick={handleBackToHome}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
          <p className="text-gray-600 mt-2">Organize and track your tasks efficiently</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Task title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
              <Textarea
                placeholder="Task description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                rows={3}
              />
              <Input
                placeholder="Deadline (e.g., Today, Tomorrow, Next week)"
                value={newTask.deadline}
                onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
              />
              <Select value={newTask.priority} onValueChange={(value) => setNewTask({ ...newTask, priority: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map(priority => (
                    <SelectItem key={priority} value={priority}>
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={newTask.status} onValueChange={(value) => setNewTask({ ...newTask, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={newTask.category} onValueChange={(value) => setNewTask({ ...newTask, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button onClick={addTask} className="flex-1">Add Task</Button>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1">Cancel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            All Tasks ({tasks.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`bg-white p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all ${
                  task.status === 'completed' ? 'opacity-75' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle
                        className={`h-5 w-5 cursor-pointer transition-colors ${
                          task.status === 'completed' ? 'text-green-600' : 'text-gray-300 hover:text-slate-500'
                        }`}
                        onClick={() => toggleTaskStatus(task.id)}
                      />
                      <h3 className={`font-semibold text-lg ${
                        task.status === 'completed' ? 'line-through text-gray-500' : 'text-slate-700'
                      }`}>
                        {task.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-3 ml-8">{task.description}</p>
                    <div className="flex items-center gap-2 ml-8">
                      <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                        {task.priority} priority
                      </Badge>
                      <Badge className={`text-xs ${getStatusColor(task.status)}`}>
                        {task.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {task.category}
                      </Badge>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="inline h-3 w-3 mr-1" />
                        {task.deadline}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingTask(task)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTask(task.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Task Dialog */}
      <Dialog open={!!editingTask} onOpenChange={() => setEditingTask(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          {editingTask && (
            <div className="space-y-4">
              <Input
                placeholder="Task title"
                value={editingTask.title}
                onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
              />
              <Textarea
                placeholder="Task description"
                value={editingTask.description}
                onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                rows={3}
              />
              <Input
                placeholder="Deadline"
                value={editingTask.deadline}
                onChange={(e) => setEditingTask({ ...editingTask, deadline: e.target.value })}
              />
              <Select value={editingTask.priority} onValueChange={(value) => setEditingTask({ ...editingTask, priority: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map(priority => (
                    <SelectItem key={priority} value={priority}>
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={editingTask.status} onValueChange={(value) => setEditingTask({ ...editingTask, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={editingTask.category} onValueChange={(value) => setEditingTask({ ...editingTask, category: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button onClick={updateTask} className="flex-1">Update Task</Button>
                <Button variant="outline" onClick={() => setEditingTask(null)} className="flex-1">Cancel</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskManagement;