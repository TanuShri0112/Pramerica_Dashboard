import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Clock, ChevronRight, Plus } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const getTasksData = (language) => {
  const tasksData = {
    en: [
      {
        id: 1,
        title: 'Review Database Conversion Requirements',
        dueDate: '2023-07-10',
        completed: false,
        priority: 'high'
      },
      {
        id: 2,
        title: 'Complete Technical Support Training Module',
        dueDate: '2023-07-12',
        completed: false,
        priority: 'medium'
      },
      {
        id: 3,
        title: 'Confirm Data Center Hosting Configuration',
        dueDate: '2023-07-15',
        completed: true,
        priority: 'high'
      },
      {
        id: 4,
        title: 'Update Legislative Management Module Access',
        dueDate: '2023-07-08',
        completed: false,
        priority: 'low'
      }
    ],
    pt: [
      {
        id: 1,
        title: 'Revisar Requisitos de Conversão de Banco de Dados',
        dueDate: '2023-07-10',
        completed: false,
        priority: 'high'
      },
      {
        id: 2,
        title: 'Concluir Módulo de Treinamento de Suporte Técnico',
        dueDate: '2023-07-12',
        completed: false,
        priority: 'medium'
      },
      {
        id: 3,
        title: 'Confirmar Configuração de Hospedagem do Data Center',
        dueDate: '2023-07-15',
        completed: true,
        priority: 'high'
      },
      {
        id: 4,
        title: 'Atualizar Acesso ao Módulo de Gestão Legislativa',
        dueDate: '2023-07-08',
        completed: false,
        priority: 'low'
      }
    ]
  };
  return tasksData[language] || tasksData.en;
};

export function TaskListSection() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const initialTasks = getTasksData(language);
  const [tasks, setTasks] = useState(initialTasks);
  
  // Update tasks when language changes
  React.useEffect(() => {
    setTasks(getTasksData(language));
  }, [language]);

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
            {language === 'en' ? 'My Tasks' : 'Minhas Tarefas'}
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8"
            onClick={handleAddTask}
          >
            <Plus className="h-4 w-4 mr-1" /> {language === 'en' ? 'Add' : 'Adicionar'}
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
                      {language === 'en' ? 'Due' : 'Vencimento'} {formatDueDate(task.dueDate)}
                      <span className={`h-2 w-2 rounded-full ml-2 ${getPriorityColor(task.priority)}`} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              {language === 'en' ? 'No pending tasks. Great job!' : 'Nenhuma tarefa pendente. Ótimo trabalho!'}
            </div>
          )}
        </div>

        {completedTasks.length > 0 && (
          <div className="border-t">
            <div className="p-3 text-xs font-medium text-muted-foreground">
              {language === 'en' ? 'Recently Completed' : 'Concluídas Recentemente'}
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
          {language === 'en' ? 'View All Tasks' : 'Ver Todas as Tarefas'}
        </Button>
      </CardContent>
    </Card>
  );
}

export default TaskListSection;
