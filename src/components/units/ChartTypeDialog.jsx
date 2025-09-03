import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { BarChart3, PieChart, TrendingUp } from 'lucide-react';

export const ChartTypeDialog = ({ open, onOpenChange, onSelectType }) => {
  const chartTypes = [
    {
      id: 'bar',
      title: 'Bar Chart',
      description: 'Compare values across categories',
      icon: <BarChart3 className="h-8 w-8" />,
      preview: (
        <div className="bg-gray-50 rounded-lg p-4 border-2 border-transparent hover:border-blue-300 transition-colors">
          <div className="text-sm font-medium text-gray-700 mb-3 text-center">Sample Bar Chart</div>
          <div className="flex items-end justify-center space-x-2 h-16">
            <div className="bg-orange-500 w-4 h-8 rounded-t"></div>
            <div className="bg-orange-500 w-4 h-12 rounded-t"></div>
            <div className="bg-orange-500 w-4 h-6 rounded-t"></div>
          </div>
          <div className="flex justify-center space-x-4 mt-2 text-xs text-gray-500">
            <span>Q1</span>
            <span>Q2</span>
            <span>Q3</span>
          </div>
        </div>
      )
    },
    {
      id: 'pie',
      title: 'Pie Chart',
      description: 'Show proportions of a whole',
      icon: <PieChart className="h-8 w-8" />,
      preview: (
        <div className="bg-gray-50 rounded-lg p-4 border-2 border-transparent hover:border-blue-300 transition-colors">
          <div className="text-sm font-medium text-gray-700 mb-3 text-center">Sample Pie Chart</div>
          <div className="flex justify-center">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full bg-orange-500" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 50%)' }}></div>
              <div className="absolute inset-0 rounded-full bg-yellow-400" style={{ clipPath: 'polygon(50% 50%, 100% 100%, 0% 100%, 0% 0%, 50% 0%, 50% 50%)' }}></div>
            </div>
          </div>
          <div className="flex justify-center mt-2 text-xs text-gray-500">
            <span>70% / 30%</span>
          </div>
        </div>
      )
    },
    {
      id: 'line',
      title: 'Line Chart',
      description: 'Show trends over time',
      icon: <TrendingUp className="h-8 w-8" />,
      preview: (
        <div className="bg-gray-50 rounded-lg p-4 border-2 border-transparent hover:border-blue-300 transition-colors">
          <div className="text-sm font-medium text-gray-700 mb-3 text-center">Sample Line Chart</div>
          <div className="flex items-end justify-center space-x-1 h-16 relative">
            <svg className="w-16 h-12" viewBox="0 0 60 40">
              <polyline
                points="5,30 20,20 35,25 50,15"
                fill="none"
                stroke="#f97316"
                strokeWidth="2"
              />
              <circle cx="5" cy="30" r="2" fill="#f97316" />
              <circle cx="20" cy="20" r="2" fill="#f97316" />
              <circle cx="35" cy="25" r="2" fill="#f97316" />
              <circle cx="50" cy="15" r="2" fill="#f97316" />
            </svg>
          </div>
          <div className="flex justify-center space-x-2 mt-2 text-xs text-gray-500">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
          </div>
        </div>
      )
    }
  ];

  const handleSelectType = (type) => {
    onSelectType(type);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Select Chart Type</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {chartTypes.map((type) => (
            <Button
              key={type.id}
              variant="outline"
              className="h-auto p-0 flex flex-col hover:shadow-lg transition-all duration-200"
              onClick={() => handleSelectType(type.id)}
            >
              <div className="p-6 w-full">
                <div className="flex items-center justify-center mb-4 text-blue-600">
                  {type.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{type.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{type.description}</p>
                {type.preview}
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChartTypeDialog;