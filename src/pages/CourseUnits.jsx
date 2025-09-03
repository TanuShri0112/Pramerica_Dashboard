import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronUp } from 'lucide-react';

const CourseUnits = () => {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();
  
  // Mock data for units
  const units = [
    { id: 'unit-1', title: 'UNIT 1', imageUrl: '/placeholder.svg', itemCount: 8 }
  ];
  
  // Get module title
  const getModuleTitle = (id) => {
    const moduleMap = {
      'module-1': 'MODULE 1'
    };
    
    return moduleMap[id] || 'Module';
  };

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Main content area */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-6">{getModuleTitle(moduleId || '')}</h1>
          
          <div className="mb-6">
            <Button variant="default" className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-8">
              Courses
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
            {units.map((unit) => (
              <Card 
                key={unit.id}
                className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/catalog/${courseId}/${moduleId}/${unit.id}`)}
              >
                <div className="h-40 bg-blue-50">
                  <img 
                    src={unit.imageUrl} 
                    alt={unit.title}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{unit.title}</h3>
                  <p className="text-sm text-gray-500">{unit.itemCount} items</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="w-full md:w-80 lg:w-96 bg-white p-6 rounded-lg border">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              className="flex items-center mb-4 text-lg font-semibold w-full justify-start" 
              onClick={() => navigate(`/catalog/${courseId}`)}
            >
              <ChevronUp className="mr-2 h-5 w-5" />
              {moduleId ? getModuleTitle(moduleId) : 'Module'}
            </Button>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <div className="bg-white border rounded-md px-4 py-2 flex items-center justify-between">
                  <span>{moduleId ? 'UNIT 1' : 'Module'}</span>
                  <ChevronUp className="h-4 w-4" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Style</label>
                <div className="bg-white border rounded-md px-4 py-2 flex items-center justify-between">
                  <span>All</span>
                  <ChevronUp className="h-4 w-4" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Language</label>
                <div className="bg-white border rounded-md px-4 py-2 flex items-center justify-between">
                  <span>All</span>
                  <ChevronUp className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseUnits;