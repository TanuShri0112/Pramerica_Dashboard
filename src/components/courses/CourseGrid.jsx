import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarClock, Clock, Users, Lock, MoreVertical, Edit, Trash2, Archive } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

const CourseGrid = ({ courses, onCourseClick, onCourseEdit, onCourseDelete, onCourseArchive, courseType = 'open' }) => {
  const navigate = useNavigate();

  const handleCourseClick = (courseId, title, event) => {
    // Prevent navigation if clicking on dropdown trigger
    if ((event.target).closest('[data-dropdown-trigger]')) {
      return;
    }
    
    // Navigate directly to course modules with course type parameter
    navigate(`/courses/view/${courseId}/modules?type=${courseType}`);
  };

  const handleCourseEdit = (courseId, title) => {
    if (onCourseEdit) {
      onCourseEdit(courseId, title);
    }
  };

  const handleCourseDelete = (courseId, title) => {
    if (onCourseDelete && window.confirm(`Are you sure you want to delete "${title}"?`)) {
      onCourseDelete(courseId, title);
    }
  };

  const handleCourseArchive = (courseId, title) => {
    if (onCourseArchive && window.confirm(`Are you sure you want to archive "${title}"?`)) {
      onCourseArchive(courseId, title);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Published': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {courses.map((course) => (
        <Card 
          key={course.id} 
          className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          onClick={(e) => handleCourseClick(course.id, course.title, e)}
        >
          <div className="relative h-40 bg-gray-100">
            <img 
              src={course.thumbnail || "/placeholder.svg"} 
              alt={course.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2">
              <span className={`px-2 py-1 rounded text-xs ${getStatusColor(course.status)}`}>
                {course.status}
              </span>
            </div>
            {/* Access Type Indicator */}
            <div className="absolute top-2 left-2">
              {courseType === 'sequential' ? (
                <Badge variant="outline" className="text-orange-600 border-orange-300 bg-white/90">
                  <Lock className="h-3 w-3 mr-1" />
                  Sequential
                </Badge>
              ) : (
                <Badge className="bg-green-500 text-white border-green-400">
                  Open Access
                </Badge>
              )}
            </div>
          </div>
          
          <CardContent className="pt-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-lg text-blue-600">{course.title}</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild data-dropdown-trigger>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white border shadow-md">
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    handleCourseEdit(course.id, course.title);
                  }}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Course
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    handleCourseArchive(course.id, course.title);
                  }}>
                    <Archive className="h-4 w-4 mr-2" />
                    Archive Course
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCourseDelete(course.id, course.title);
                    }} 
                    className="text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Course
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <p className="text-sm text-gray-500 mb-2">{course.category}</p>
            
            <div className="flex items-center text-xs text-gray-500 mb-1">
              <Users className="h-3 w-3 mr-1" />
              <span>{course.students} Students</span>
            </div>
            
            {course.endDate && (
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="h-3 w-3 mr-1" />
                <span>Ends {course.endDate}</span>
              </div>
            )}

            {courseType === 'sequential' && (
              <div className="mt-2 p-2 bg-orange-50 rounded-md">
                <p className="text-xs text-orange-700">
                  Modules unlock sequentially after completion
                </p>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="pt-0 pb-4 px-4">
            <div className="w-full flex justify-between items-center text-xs text-gray-500">
              <div className="flex items-center">
                <CalendarClock className="h-3 w-3 mr-1" />
                <span>Updated {course.lastUpdated}</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CourseGrid;