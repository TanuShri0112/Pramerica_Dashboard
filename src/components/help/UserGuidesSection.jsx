import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, ArrowRight, FileText, Video, Download } from 'lucide-react';

export const UserGuidesSection = () => {
  const guides = [
    {
      id: 1,
      title: 'Getting Started Guide',
      description: 'Learn how to set up your account and navigate the platform with our comprehensive guide.',
      icon: <BookOpen className="h-6 w-6 text-blue-600" />,
      type: 'PDF',
      size: '2.4 MB',
      link: '#'
    },
    {
      id: 2,
      title: 'Video Tutorials',
      description: 'Watch step-by-step video tutorials to master all the features of our platform.',
      icon: <Video className="h-6 w-6 text-purple-600" />,
      type: 'Video Series',
      length: '45 min',
      link: '#'
    },
    {
      id: 3,
      title: 'API Documentation',
      description: 'Technical documentation for integrating with our API and building custom solutions.',
      icon: <FileText className="h-6 w-6 text-green-600" />,
      type: 'Web',
      link: '#'
    },
    {
      id: 4,
      title: 'Keyboard Shortcuts',
      description: 'Boost your productivity with these handy keyboard shortcuts for common actions.',
      icon: <FileText className="h-6 w-6 text-yellow-600" />,
      type: 'Cheat Sheet',
      link: '#'
    }
  ];

  const categories = [
    {
      id: 'all',
      name: 'All Guides',
      count: 12
    },
    {
      id: 'getting-started',
      name: 'Getting Started',
      count: 4
    },
    {
      id: 'features',
      name: 'Features',
      count: 5
    },
    {
      id: 'troubleshooting',
      name: 'Troubleshooting',
      count: 3
    }
  ];

  const [activeCategory, setActiveCategory] = React.useState('all');

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">User Guides & Documentation</h2>
        <p className="text-muted-foreground">
          Find helpful guides, tutorials, and documentation to get the most out of our platform.
        </p>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap ${
              activeCategory === category.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            {category.name} ({category.count})
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {guides.map((guide) => (
          <Card key={guide.id} className="h-full flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                    {guide.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{guide.title}</CardTitle>
                    <div className="text-sm text-muted-foreground mt-1">
                      {guide.type} • {guide.size || guide.length}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-8">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-4">
                {guide.description}
              </p>
              <div className="flex justify-between items-center mt-auto">
                <Button variant="outline" size="sm" asChild>
                  <a href={guide.link} target="_blank" rel="noopener noreferrer">
                    View Guide
                  </a>
                </Button>
                <div className="text-xs text-muted-foreground">
                  Last updated: {new Date().toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Can't find what you're looking for?</h3>
              <p className="text-gray-600">Our support team is always ready to help with any questions you might have.</p>
            </div>
            <Button variant="default">
              Contact Support <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserGuidesSection;