import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, BookOpen, Video, FileText, MessageSquare, BarChart3, ArrowLeft, MoreHorizontal, Edit, CheckCircle, Lock, Play, Volume2 } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { toast } from "sonner";
import LessonContent from './LessonContent';

const CourseUnits = ({ showBackButton = false, onBack }) => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [units, setUnits] = useState([
    {
      id: 1,
      title: "Introduction to Programming Fundamentals",
      description: "Understanding the basic concepts of programming and software development.",
      completed: false,
      lessons: [
        {
          id: "1",
          title: "What is Programming?",
          description: "An introduction to programming concepts and methodologies",
          type: 'text',
          content: `Programming is the process of creating a set of instructions that tell a computer how to perform a task. Programming can be done using a variety of computer programming languages, such as JavaScript, Python, and C++.

Key Concepts:
- Algorithms: Step-by-step procedures for calculations, data processing, and automated reasoning tasks
- Data Structures: Ways of organizing and storing data so that they can be used efficiently
- Programming Paradigms: Different approaches to programming (procedural, object-oriented, functional)
- Debugging: The process of finding and resolving defects or problems within a computer program

Programming languages serve as a bridge between human thought and machine execution. Each language has its own syntax, semantics, and use cases, making some more suitable for particular types of projects than others.`,
          completed: true,
          locked: false,
          duration: "15 min"
        },
        {
          id: "2",
          title: "Variables and Data Types",
          description: "Understanding how to store and manipulate data in programs",
          type: 'video',
          content: `This video lesson covers the fundamental concepts of variables and data types in programming.

Topics covered:
- What are variables and why do we need them?
- Different data types: strings, numbers, booleans, arrays, objects
- Variable declaration and initialization
- Variable scope and lifetime
- Best practices for naming variables
- Type conversion and casting

Practical examples will be demonstrated using JavaScript, showing how variables work in real-world scenarios.`,
          videoUrl: "https://example.com/variables-video.mp4",
          completed: false,
          locked: false,
          duration: "25 min"
        },
        {
          id: "3",
          title: "Control Structures - Audio Lecture",
          description: "Audio lecture on loops, conditionals, and program flow control",
          type: 'audio',
          content: `Welcome to this audio lecture on control structures in programming.

Transcript:
Control structures are programming constructs that allow you to control the flow of execution in your programs. There are three main types of control structures:

1. Sequential: Instructions executed one after another in order
2. Selection: Decision-making structures (if-else statements, switch cases)
3. Iteration: Loops that repeat blocks of code (for loops, while loops, do-while loops)

Conditional statements allow programs to make decisions based on different conditions. The most common conditional statement is the if-else statement, which executes different blocks of code based on whether a condition is true or false.

Loops are essential for repeating tasks without having to write the same code multiple times. They help in processing collections of data, implementing algorithms, and creating interactive programs.

Understanding these concepts is crucial for writing efficient and logical programs.`,
          audioUrl: "https://example.com/control-structures-audio.mp3",
          completed: false,
          locked: false,
          duration: "30 min"
        }
      ]
    },
    {
      id: 2,
      title: "Web Development Basics",
      description: "Learn the foundations of modern web development with HTML, CSS, and JavaScript.",
      completed: false,
      lessons: [
        {
          id: "4",
          title: "HTML Structure and Semantics",
          description: "Building the foundation of web pages with proper HTML structure",
          type: 'text',
          content: `HTML (HyperText Markup Language) is the standard markup language for creating web pages. It provides the basic structure and content of a webpage.

Key HTML Concepts:
- Elements and Tags: Building blocks of HTML documents
- Semantic HTML: Using meaningful tags that describe content (header, nav, main, article, section, footer)
- Document Structure: DOCTYPE, html, head, and body elements
- Attributes: Additional information about elements (id, class, src, href, alt)
- Forms: Creating interactive user input interfaces
- Accessibility: Making web content accessible to all users

Best Practices:
- Use semantic HTML for better SEO and accessibility
- Validate your HTML code
- Write clean, readable code with proper indentation
- Use appropriate heading hierarchy (h1-h6)
- Include alt text for images
- Use descriptive link text`,
          completed: false,
          locked: false,
          duration: "20 min"
        },
        {
          id: "5",
          title: "CSS Styling and Layout",
          description: "Styling web pages with CSS and creating responsive layouts",
          type: 'video',
          content: `This comprehensive video tutorial covers CSS fundamentals and modern layout techniques.

What you'll learn:
- CSS syntax and selectors
- Box model: margin, padding, border, content
- Display properties: block, inline, inline-block, flex, grid
- Positioning: static, relative, absolute, fixed, sticky
- CSS Grid for complex layouts
- Flexbox for flexible layouts
- Responsive design with media queries
- CSS custom properties (variables)
- Modern CSS features and best practices

Hands-on examples will demonstrate how to create beautiful, responsive web layouts that work across all devices.`,
          videoUrl: "https://example.com/css-layout-video.mp4",
          completed: false,
          locked: false,
          duration: "45 min"
        },
        {
          id: "6",
          title: "JavaScript Fundamentals - Interactive Lesson",
          description: "Core JavaScript concepts explained through audio and practical examples",
          type: 'audio',
          content: `JavaScript Fundamentals - Audio Lesson Transcript

Welcome to this comprehensive audio lesson on JavaScript fundamentals. JavaScript is the programming language of the web, enabling interactive and dynamic web pages.

Core Topics Covered:

1. Variables and Data Types
JavaScript supports various data types including numbers, strings, booleans, objects, and arrays. Variables can be declared using var, let, or const keywords.

2. Functions
Functions are reusable blocks of code that perform specific tasks. They can accept parameters and return values, making code modular and maintainable.

3. Objects and Arrays
Objects store data in key-value pairs, while arrays store ordered lists of values. Both are essential for organizing and manipulating data.

4. DOM Manipulation
JavaScript can interact with HTML elements, allowing you to create dynamic, interactive web pages that respond to user actions.

5. Event Handling
Events like clicks, form submissions, and keyboard inputs can trigger JavaScript functions, creating interactive user experiences.

6. Asynchronous Programming
Modern JavaScript includes promises and async/await for handling operations that take time, such as API calls or file operations.

Practice exercises and coding challenges will help reinforce these concepts.`,
          audioUrl: "https://example.com/javascript-fundamentals-audio.mp3",
          completed: false,
          locked: false,
          duration: "50 min"
        }
      ]
    },
    {
      id: 3,
      title: "Advanced Web Technologies",
      description: "Exploring modern frameworks, APIs, and advanced web development concepts.",
      completed: false,
      lessons: [
        {
          id: "7",
          title: "React Framework Introduction",
          description: "Getting started with React for building user interfaces",
          type: 'video',
          content: `React is a popular JavaScript library for building user interfaces, particularly web applications.

This video covers:
- What is React and why use it?
- Component-based architecture
- JSX syntax and how it works
- Props and state management
- Event handling in React
- Component lifecycle
- Hooks: useState, useEffect, and custom hooks
- Building your first React application
- Best practices and common patterns

We'll build a practical example application to demonstrate these concepts in action.`,
          videoUrl: "https://example.com/react-intro-video.mp4",
          completed: false,
          locked: false,
          duration: "60 min"
        },
        {
          id: "8",
          title: "API Integration and Data Fetching",
          description: "Working with external APIs and managing application data",
          type: 'text',
          content: `API Integration is a crucial skill for modern web developers. This lesson covers how to work with external data sources and integrate them into your applications.

Topics Covered:

REST APIs:
- Understanding HTTP methods (GET, POST, PUT, DELETE)
- Request and response structure
- Status codes and error handling
- Authentication methods (API keys, tokens, OAuth)

Fetch API:
- Making HTTP requests with JavaScript
- Handling promises and async/await
- Processing JSON data
- Error handling and network issues

Data Management:
- State management for API data
- Caching strategies
- Loading states and user feedback
- Data validation and sanitization

Best Practices:
- API rate limiting and throttling
- Security considerations
- Testing API integrations
- Documentation and debugging tools

Practical Examples:
- Weather API integration
- User authentication system
- Real-time data updates
- File upload functionality`,
          completed: false,
          locked: false,
          duration: "35 min"
        }
      ]
    }
  ]);

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
  };

  const handleBackToUnits = () => {
    setSelectedLesson(null);
  };

  const handleAddUnit = () => {
    toast.success("Unit added successfully!");
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'text': return <FileText className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'audio': return <Volume2 className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'text': return 'bg-green-100 text-green-800';
      case 'video': return 'bg-blue-100 text-blue-800';
      case 'audio': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (selectedLesson) {
    return (
      <LessonContent 
        lesson={selectedLesson} 
        onBack={handleBackToUnits}
      />
    );
  }

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          {showBackButton && onBack && (
            <Button 
              onClick={onBack} 
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-bold">Course Units</h1>
            <p className="text-gray-600">Manage lessons and learning materials</p>
          </div>
        </div>
        <Button onClick={handleAddUnit} className="bg-ca-primary hover:bg-ca-secondary">
          <Plus className="h-4 w-4 mr-2" />
          Add Unit
        </Button>
      </div>

      <div className="space-y-6">
        {units.map((unit) => (
          <Card key={unit.id} className="overflow-hidden">
            <CardHeader className="bg-slate-50">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {unit.title}
                    {unit.completed && (
                      <Badge className="bg-green-100 text-green-800">
                        Completed
                      </Badge>
                    )}
                  </CardTitle>
                  <p className="text-gray-600 mt-1">{unit.description}</p>
                  <div className="mt-2">
                    <Badge variant="outline">
                      {unit.lessons.length} lessons
                    </Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Unit
                    </DropdownMenuItem>
                    <DropdownMenuItem>Add Lesson</DropdownMenuItem>
                    <DropdownMenuItem>Reorder Lessons</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Delete Unit</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {unit.lessons.map((lesson) => (
                  <div 
                    key={lesson.id}
                    className="p-4 hover:bg-slate-50 cursor-pointer transition-colors"
                    onClick={() => handleLessonClick(lesson)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <div className={`p-2 rounded-full ${getTypeColor(lesson.type)}`}>
                          {getTypeIcon(lesson.type)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-sm">{lesson.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {lesson.duration}
                          </Badge>
                          <Badge className={`text-xs ${getTypeColor(lesson.type)}`}>
                            {lesson.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 truncate">
                          {lesson.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {lesson.completed && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        {lesson.locked && (
                          <Lock className="h-4 w-4 text-gray-400" />
                        )}
                        {!lesson.locked && !lesson.completed && (
                          <Play className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseUnits;