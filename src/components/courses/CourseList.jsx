import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Users, Lock, Edit, Trash2, Archive } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

const CourseList = ({ courses, onCourseClick, onCourseEdit, onCourseDelete, onCourseArchive, courseType = 'open' }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch(status) {
      case 'Published': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const handleRowClick = (courseId, title) => {
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

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-slate-50">
            <th className="py-3 px-4 text-left font-medium text-slate-500">Title</th>
            <th className="py-3 px-4 text-left font-medium text-slate-500">Category</th>
            <th className="py-3 px-4 text-left font-medium text-slate-500">Status</th>
            <th className="py-3 px-4 text-left font-medium text-slate-500">Students</th>
            <th className="py-3 px-4 text-left font-medium text-slate-500">Access Type</th>
            <th className="py-3 px-4 text-left font-medium text-slate-500">Last Updated</th>
            <th className="py-3 px-4 text-left font-medium text-slate-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="border-b hover:bg-slate-50 cursor-pointer" onClick={() => handleRowClick(course.id, course.title)}>
              <td className="py-3 px-4">
                <div className="font-medium text-blue-600">{course.title}</div>
                <div className="text-xs text-gray-500">Created {course.createdAt}</div>
              </td>
              <td className="py-3 px-4 text-slate-600">{course.category}</td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded text-xs ${getStatusColor(course.status)}`}>
                  {course.status}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-slate-500" />
                  <span>{course.students}</span>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center">
                  {courseType === 'sequential' ? (
                    <>
                      <Lock className="h-4 w-4 mr-1 text-orange-500" />
                      <Badge variant="outline" className="text-orange-600 border-orange-300">
                        Sequential
                      </Badge>
                    </>
                  ) : (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      Open Access
                    </Badge>
                  )}
                </div>
              </td>
              <td className="py-3 px-4 text-slate-600">{course.lastUpdated}</td>
              <td className="py-3 px-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseList;