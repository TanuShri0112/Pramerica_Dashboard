import React from 'react';
import { MoreVertical, Edit, Trash2, Image, Archive, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

export const CourseOptionsMenu = ({ 
  courseId, 
  courseName, 
  onEdit, 
  onArchive, 
  onDelete, 
  onRestore,
  isDeleted = false 
}) => {
  const navigate = useNavigate();

  const handleUpdate = () => {
    if (onEdit) {
      onEdit(courseId, courseName);
    } else {
      navigate(`/courses/edit/${courseId}`);
      toast({
        title: "Edit Course",
        description: `Opening edit page for ${courseName}`,
      });
    }
  };

  const handleUpdateImage = () => {
    toast({
      title: "Update Image",
      description: `Opening image editor for ${courseName}`,
    });
  };

  const handleArchive = () => {
    if (onArchive && window.confirm(`Are you sure you want to archive "${courseName}"?`)) {
      onArchive(courseId, courseName);
    }
  };

  const handleDelete = () => {
    if (onDelete && window.confirm(`Are you sure you want to delete "${courseName}"?`)) {
      onDelete(courseId, courseName);
    }
  };

  const handleRestore = () => {
    if (onRestore && window.confirm(`Are you sure you want to restore "${courseName}"?`)) {
      onRestore(courseId, courseName);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white border shadow-md">
        {isDeleted ? (
          <DropdownMenuItem onClick={handleRestore} className="text-green-600">
            <RotateCcw className="mr-2 h-4 w-4" />
            Restore Course
          </DropdownMenuItem>
        ) : (
          <>
            <DropdownMenuItem onClick={handleUpdate}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Course
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleUpdateImage}>
              <Image className="mr-2 h-4 w-4" />
              Update Image
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleArchive}>
              <Archive className="mr-2 h-4 w-4" />
              Archive Course
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete} className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Course
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CourseOptionsMenu;