import React, { useEffect } from 'react';
import { useParams, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useCourseSidebar } from '@/contexts/CourseSidebarContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CourseModules from '@/components/courses/CourseModules';
import CourseAssessments from '@/components/courses/CourseAssessments';
import CourseNews from '@/components/courses/CourseNews';
import CourseInstructors from '@/components/courses/CourseInstructors';
import CourseForums from '@/components/courses/CourseForums';
import CourseAutomation from '@/components/courses/CourseAutomation';
import CourseLearners from '@/components/courses/CourseLearners';
import CourseScores from '@/components/courses/CourseScores';
import CourseCalendar from '@/components/courses/CourseCalendar';
import CourseAdmin from '@/components/courses/CourseAdmin';
import QuizInstructorPage from '@/pages/QuizInstructorPage';
import SurveyInstructorPage from '@/pages/SurveyInstructorPage';
import { Button } from '@/components/ui/button';
import { useDialog } from '@/hooks/useDialog';
import { useSidebar } from '@/contexts/SidebarContext';

// Dictionary of course titles keyed by ID
const courseTitles = {
  '1757539': 'Advanced Credit Analysis',
  'nodejs101': 'Node.js Fundamentals',
  'reactjs202': 'React.js Advanced',
  'ml506': 'Machine Learning',
  'data345': 'Data Analysis'
};

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { setCourseTitle, isCourseSidebarOpen } = useCourseSidebar();
  const { isDialogOpen, openDialog, closeDialog } = useDialog();
  const { setMainCollapsed } = useSidebar();
  
  useEffect(() => {
    if (courseId) {
      // First check if it's a published course from localStorage
      const publishedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
      const publishedCourse = publishedCourses.find(course => course.id === courseId);
      
      if (publishedCourse) {
        setCourseTitle(publishedCourse.title);
      } else if (courseTitles[courseId]) {
        // Use predefined course titles for existing courses
        setCourseTitle(courseTitles[courseId]);
      } else {
        setCourseTitle('Course');
      }
    }
    
    // If we're at the base course URL and sidebar is open, show the course dialog
    if (location.pathname === `/courses/view/${courseId}` && isCourseSidebarOpen) {
      openDialog('course-details');
    } else {
      closeDialog();
    }
  }, [courseId, setCourseTitle, location.pathname, isCourseSidebarOpen, openDialog, closeDialog]);

  // Handle sidebar collapsing for unit creator and builder - keep main sidebar collapsed in course section
  useEffect(() => {
    const isInUnitCreator = location.pathname.includes('/units/creator') || 
                           location.pathname.includes('/unit_') ||
                           location.pathname.includes('/courses/builder');
    
    const isInCourseSection = location.pathname.includes('/courses/view/');
    
    console.log('Current path:', location.pathname, 'Should collapse:', isInUnitCreator || isInCourseSection);
    
    // Keep main sidebar collapsed when in course section or unit creator
    if (isInUnitCreator || isInCourseSection) {
      setMainCollapsed(true);
    } else {
      setMainCollapsed(false);
    }
  }, [location.pathname, setMainCollapsed]);
  
  // Handle specific section routes
  if (location.pathname.endsWith('/modules')) {
    return <CourseModules />;
  }

  if (location.pathname.endsWith('/assessments')) {
    return <CourseAssessments />;
  }
  
  if (location.pathname.endsWith('/news')) {
    return <CourseNews />;
  }
  
  if (location.pathname.endsWith('/calendar')) {
    return <CourseCalendar />;
  }
  
  if (location.pathname.endsWith('/instructors')) {
    return <CourseInstructors />;
  }

  if (location.pathname.endsWith('/learners')) {
    return <CourseLearners />;
  }

  if (location.pathname.endsWith('/forums')) {
    return <CourseForums />;
  }

  if (location.pathname.endsWith('/automation')) {
    return <CourseAutomation />;
  }

  if (location.pathname.endsWith('/scores')) {
    return <CourseScores />;
  }

  if (location.pathname.endsWith('/admin')) {
    return <CourseAdmin />;
  }

  // Handle quiz instructor routes
  if (location.pathname.includes('/quizzes/')) {
    return <QuizInstructorPage />;
  }

  // Handle survey instructor routes - Updated to match new routing pattern
  if (location.pathname.includes('/surveys/')) {
    return <SurveyInstructorPage />;
  }

  // Course options for the dialog
  const courseOptions = [
    { name: "Catalog", onClick: () => navigate('/catalog') },
    { name: "List", onClick: () => navigate('/courses') },
    { name: "Enroll", onClick: () => navigate('/courses') },
    { name: "Add", onClick: () => navigate('/courses/create') }
  ];

  // If we're at the base course URL, show the modules
  if (location.pathname === `/courses/view/${courseId}`) {
    return <CourseModules />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        if (!open) navigate('/courses');
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Course Options</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 py-4">
            {courseOptions.map((option) => (
              <Button 
                key={option.name}
                onClick={option.onClick}
                variant="outline"
                className="w-full justify-center py-6"
              >
                {option.name}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      <Outlet />
    </div>
  );
};

export default CourseDetail;