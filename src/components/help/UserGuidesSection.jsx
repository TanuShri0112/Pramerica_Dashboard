import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, ArrowRight, FileText, Video, Download } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';

export const UserGuidesSection = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  const guides = [
    {
      id: 1,
      title: t.gettingStartedGuide,
      description: t.gettingStartedDesc,
      icon: <BookOpen className="h-6 w-6 text-blue-600" />,
      type: 'PDF',
      size: '2.4 MB',
      link: '#'
    },
    {
      id: 2,
      title: t.videoTutorials,
      description: t.videoTutorialsDesc,
      icon: <Video className="h-6 w-6 text-purple-600" />,
      type: language === 'en' ? 'Video Series' : 'Série de Vídeos',
      length: '45 min',
      link: '#'
    },
    {
      id: 3,
      title: t.apiDocumentation,
      description: t.apiDocumentationDesc,
      icon: <FileText className="h-6 w-6 text-green-600" />,
      type: 'Web',
      link: '#'
    },
    {
      id: 4,
      title: t.keyboardShortcuts,
      description: t.keyboardShortcutsDesc,
      icon: <FileText className="h-6 w-6 text-yellow-600" />,
      type: language === 'en' ? 'Cheat Sheet' : 'Folha de Dicas',
      link: '#'
    }
  ];

  const categories = [
    {
      id: 'all',
      name: t.allGuides,
      count: 12
    },
    {
      id: 'getting-started',
      name: t.gettingStarted,
      count: 4
    },
    {
      id: 'features',
      name: t.features,
      count: 5
    },
    {
      id: 'troubleshooting',
      name: t.troubleshooting,
      count: 3
    }
  ];

  const [activeCategory, setActiveCategory] = React.useState('all');

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{t.userGuidesDocumentation}</h2>
        <p className="text-muted-foreground">
          {t.userGuidesDesc}
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
                    {t.viewGuide}
                  </a>
                </Button>
                <div className="text-xs text-muted-foreground">
                  {t.lastUpdated}: {new Date().toLocaleDateString()}
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
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{t.cantFindLooking}</h3>
              <p className="text-gray-600">{t.supportTeamReady}</p>
            </div>
            <Button variant="default">
              {t.contactSupport} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserGuidesSection;