import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Eye, Play, FileText, Video, Package } from 'lucide-react';

export const UnitCard = ({ unit, index, onEdit, onDelete, onPreview, onView }) => {
  const getTypeIcon = () => {
    switch (unit.type) {
      case 'scorm':
        return <Package className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow group cursor-pointer" onClick={() => onView(unit.id)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-2">
                {getTypeIcon()}
                <span className="text-sm font-medium text-gray-600">Lesson {index + 1}</span>
              </div>
              <Badge className={getStatusColor(unit.status)}>
                {unit.status}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {unit.duration}
              </Badge>
            </div>
            
            <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600">
              {unit.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {unit.description}
            </p>
            
            <div className="text-xs text-gray-500">
              {unit.blocks?.length || 0} content blocks
            </div>
          </div>
          
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => onPreview(unit.id, e)}
              className="h-8 w-8 p-0"
            >
              <Eye className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(unit.id);
              }}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(unit.id);
              }}
              className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};