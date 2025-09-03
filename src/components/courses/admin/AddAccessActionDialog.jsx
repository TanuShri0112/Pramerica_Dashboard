import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Lock, Unlock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AddAccessActionDialog = ({ open, onOpenChange, title = "Add action" }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("Access");

  const tabs = ["Access", "Awards", "Membership", "Other"];

  const accessActions = [
    {
      icon: <Lock className="h-12 w-12 text-blue-500" />,
      title: "Lock module",
      description: "Lock a module",
      action: () => {
        toast({
          title: "Action Selected",
          description: "Lock module action configured",
          duration: 2000,
        });
        onOpenChange(false);
      }
    },
    {
      icon: <Unlock className="h-12 w-12 text-blue-500" />,
      title: "Unlock module",
      description: "Unlock a module",
      action: () => {
        toast({
          title: "Action Selected",
          description: "Unlock module action configured",
          duration: 2000,
        });
        onOpenChange(false);
      }
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {title}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-6 w-6"
            >
              ×
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        {/* Tab Navigation */}
        <div className="flex space-x-4 border-b">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "ghost"}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-6 py-2 ${
                activeTab === tab 
                  ? "bg-cyan-500 text-white hover:bg-cyan-600" 
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Access Content */}
        {activeTab === "Access" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
            {accessActions.map((action, index) => (
              <Card 
                key={index}
                className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer bg-gray-50 hover:bg-gray-100"
                onClick={action.action}
              >
                <div className="flex justify-center mb-4">
                  {action.icon}
                </div>
                <h3 className="font-semibold mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </Card>
            ))}
          </div>
        )}

        {/* Other tabs content */}
        {activeTab !== "Access" && (
          <div className="py-6 text-center text-gray-500">
            <p>{activeTab} actions will be available here</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddAccessActionDialog;
