import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Clock, User, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const CategoryDetail = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get catalog data from navigation state or fallback to mock data
  const catalogFromState = location.state?.catalog;
  
  // Comprehensive course data mapped to catalogs
  const getCatalogCourses = () => {
    const catalogMap = {
      'web-development': {
        title: 'Web Development',
        description: 'Frontend and backend web development courses',
        courses: [
          {
            id: '1',
            title: 'Advanced JavaScript',
            imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop&auto=format',
            description: 'Master modern JavaScript concepts and ES6+ features',
            duration: '8 weeks',
            instructor: 'John Smith',
            level: 'Advanced',
            modules: 4,
            assessments: 8
          },
          {
            id: '2',
            title: 'React Development',
            imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop&auto=format',
            description: 'Build modern web applications with React',
            duration: '10 weeks',
            instructor: 'Jane Doe',
            level: 'Intermediate',
            modules: 6,
            assessments: 12
          },
          {
            id: '3',
            title: 'Node.js Backend',
            imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop&auto=format',
            description: 'Server-side development with Node.js and Express',
            duration: '6 weeks',
            instructor: 'Mike Johnson',
            level: 'Intermediate',
            modules: 3,
            assessments: 6
          },
          {
            id: '9',
            title: 'Full Stack Development',
            imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&auto=format',
            description: 'Complete web development from frontend to backend',
            duration: '16 weeks',
            instructor: 'Sarah Wilson',
            level: 'Advanced',
            modules: 8,
            assessments: 16
          }
        ]
      },
      'data-science': {
        title: 'Data Science',
        description: 'Data analysis, machine learning, and AI courses',
        courses: [
          {
            id: '4',
            title: 'Python for Data Science',
            imageUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop&auto=format',
            description: 'Data analysis and machine learning with Python',
            duration: '12 weeks',
            instructor: 'Dr. Sarah Wilson',
            level: 'Beginner',
            modules: 5,
            assessments: 10
          },
          {
            id: '5',
            title: 'Machine Learning Fundamentals',
            imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop&auto=format',
            description: 'Introduction to machine learning algorithms and techniques',
            duration: '10 weeks',
            instructor: 'Prof. David Chen',
            level: 'Intermediate',
            modules: 6,
            assessments: 8
          }
        ]
      },
      'mobile-development': {
        title: 'Mobile Development',
        description: 'iOS and Android app development',
        courses: [
          {
            id: '6',
            title: 'React Native Development',
            imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop&auto=format',
            description: 'Build cross-platform mobile apps with React Native',
            duration: '8 weeks',
            instructor: 'Alex Rodriguez',
            level: 'Advanced',
            modules: 4,
            assessments: 6
          },
          {
            id: '10',
            title: 'iOS Development with Swift',
            imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop&auto=format',
            description: 'Build native iOS applications using Swift and Xcode',
            duration: '12 weeks',
            instructor: 'Emma Thompson',
            level: 'Intermediate',
            modules: 5,
            assessments: 10
          }
        ]
      },
      'devops': {
        title: 'DevOps',
        description: 'Cloud computing, deployment, and infrastructure',
        courses: [
          {
            id: '7',
            title: 'Cloud Computing with AWS',
            imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop&auto=format',
            description: 'Deploy and manage applications on Amazon Web Services',
            duration: '8 weeks',
            instructor: 'Tom Anderson',
            level: 'Advanced',
            modules: 4,
            assessments: 8
          },
          {
            id: '8',
            title: 'Docker & Kubernetes',
            imageUrl: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=300&fit=crop&auto=format',
            description: 'Containerization and orchestration fundamentals',
            duration: '6 weeks',
            instructor: 'Lisa Park',
            level: 'Intermediate',
            modules: 3,
            assessments: 6
          }
        ]
      },
      'cybersecurity': {
        title: 'Cybersecurity',
        description: 'Information security and cybersecurity practices',
        courses: [
          {
            id: '11',
            title: 'Cybersecurity Fundamentals',
            imageUrl: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&h=300&fit=crop&auto=format',
            description: 'Learn essential cybersecurity principles and practices',
            duration: '10 weeks',
            instructor: 'Robert Martinez',
            level: 'Beginner',
            modules: 4,
            assessments: 8
          }
        ]
      },
      'database-management': {
        title: 'Database Management',
        description: 'Database design, administration, and optimization',
        courses: [
          {
            id: '12',
            title: 'Database Design & SQL',
            imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop&auto=format',
            description: 'Comprehensive database design and SQL programming',
            duration: '8 weeks',
            instructor: 'Maria Garcia',
            level: 'Beginner',
            modules: 4,
            assessments: 6
          }
        ]
      }
    };

    // Use data from state if available, otherwise use mock data
    if (catalogFromState) {
      return {
        title: catalogFromState.name,
        description: catalogFromState.description,
        courses: catalogMap[categoryId]?.courses || []
      };
    }

    return catalogMap[categoryId] || {
      title: 'Unknown Catalog',
      description: 'Catalog information',
      courses: []
    };
  };

  const catalogData = getCatalogCourses();

  // Filter courses based on search query
  const filteredCourses = catalogData.courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCourseClick = (courseId) => {
    navigate(`/courses/view/${courseId}`);
  };

  const handleAddCourse = () => {
    navigate('/courses', { state: { openAddDialog: true } });
  };

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" onClick={() => navigate('/catalog')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">{catalogData.title}</h1>
          <p className="text-slate-500">{catalogData.description}</p>
        </div>
        <Button onClick={handleAddCourse}>
          <Plus className="h-4 w-4 mr-2" />
          Add Course
        </Button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Input
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
        {searchQuery && (
          <Button 
            variant="ghost" 
            onClick={() => setSearchQuery('')}
            className="text-sm"
          >
            Clear
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card 
            key={course.id} 
            className="overflow-hidden h-full flex flex-col transition-all hover:shadow-md cursor-pointer"
            onClick={() => handleCourseClick(course.id)}
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img 
                src={course.imageUrl || '/placeholder.svg'} 
                alt={course.title} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
              />
              <div className="absolute top-2 left-2">
                <span className="bg-white/90 text-xs px-2 py-1 rounded font-medium">
                  {course.level}
                </span>
              </div>
            </div>
            
            <CardContent className="flex flex-col flex-grow p-4">
              <h3 className="text-lg font-medium mb-2">{course.title}</h3>
              
              {course.description && (
                <p className="text-sm text-slate-600 mb-3 flex-grow">{course.description}</p>
              )}
              
              <div className="space-y-2 mt-auto">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <div className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-3.5 w-3.5 mr-1 text-slate-400" />
                    <span>{course.instructor}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{course.modules} modules</span>
                  <span>{course.assessments} assessments</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <p className="text-slate-500">No courses found matching "{searchQuery}".</p>
        </div>
      )}

      {catalogData.courses.length === 0 && !searchQuery && (
        <div className="text-center py-12">
          <p className="text-slate-500 mb-4">No courses in this catalog yet.</p>
          <Button onClick={handleAddCourse}>
            <Plus className="h-4 w-4 mr-2" />
            Add First Course
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryDetail;