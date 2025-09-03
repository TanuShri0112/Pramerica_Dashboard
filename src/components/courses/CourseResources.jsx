import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, File, Wrench, Globe, Folder, Library } from 'lucide-react';

const CourseResources = () => {
  const resourceTypes = [
    {
      icon: File,
      title: "File",
      description: "A file from your computer such as a document or video",
      color: "text-blue-500"
    },
    {
      icon: FileText,
      title: "Page",
      description: "Plain text or HTML",
      color: "text-green-500"
    },
    {
      icon: Wrench,
      title: "Tool",
      description: "A provisioned tool provider",
      color: "text-orange-500"
    },
    {
      icon: Globe,
      title: "Web resource",
      description: "A link to a resource on the web",
      color: "text-purple-500"
    },
    {
      icon: Folder,
      title: "Folder",
      description: "A folder that can hold resources",
      color: "text-yellow-600"
    },
    {
      icon: Library,
      title: "Library",
      description: "Resources from a library or your favorites",
      color: "text-indigo-500"
    }
  ];

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-4">Resources</h1>
        <p className="text-blue-600 mb-4">
          There are no resources in this area. Click on the kind of resource to add:
        </p>
      </div>

      <div className="space-y-3">
        {resourceTypes.map((resource) => (
          <Card 
            key={resource.title}
            className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-transparent hover:border-l-blue-500"
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <resource.icon className={`h-5 w-5 mt-0.5 ${resource.color}`} />
                <div className="flex-1">
                  <h3 className={`font-medium ${resource.color} hover:underline cursor-pointer`}>
                    {resource.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {resource.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseResources;