import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const getEventsData = (language) => {
  const eventsData = {
    en: [
      {
        id: 1,
        title: 'Executive Branch System Training',
        time: '10:00 AM - 12:00 PM',
        date: 'Today',
        type: 'lecture',
      },
      {
        id: 2,
        title: 'Legislative Platform Workshop',
        time: '12:00 PM - 1:00 PM',
        date: 'Today',
        type: 'meeting',
      },
      {
        id: 3,
        title: 'Database Conversion Review',
        time: '2:00 PM - 4:00 PM',
        date: 'Today',
        type: 'office-hours',
      },
    ],
    pt: [
      {
        id: 1,
        title: 'Treinamento do Sistema do Poder Executivo',
        time: '10:00 - 12:00',
        date: 'Hoje',
        type: 'lecture',
      },
      {
        id: 2,
        title: 'Workshop da Plataforma Legislativa',
        time: '12:00 - 13:00',
        date: 'Hoje',
        type: 'meeting',
      },
      {
        id: 3,
        title: 'Revisão de Conversão de Banco de Dados',
        time: '14:00 - 16:00',
        date: 'Hoje',
        type: 'office-hours',
      },
    ]
  };
  return eventsData[language] || eventsData.en;
};

export function CalendarSection() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const events = getEventsData(language);

  const getEventTypeStyles = (type) => {
    switch (type) {
      case 'lecture':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'meeting':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'office-hours':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };
  
  const handleViewCalendar = () => {
    navigate('/calendar');
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between pb-3 pt-4 px-4 bg-slate-50 border-b border-gray-100">
        <CardTitle className="text-lg font-semibold text-slate-700">
          {language === 'en' ? 'Calendar' : 'Calendário'}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <ScrollArea className="h-[220px] pr-3">
          {events.length > 0 ? (
            <div className="space-y-3 mt-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white p-3 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm text-slate-700">{event.title}</h3>
                      <p className="text-xs text-gray-600">{event.time}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-md border ${getEventTypeStyles(event.type)}`}>
                      {event.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-24 text-gray-500">
              <CalendarIcon className="h-8 w-8 mb-2 text-gray-400" />
              <p className="text-sm">{language === 'en' ? 'No upcoming events' : 'Sem eventos próximos'}</p>
            </div>
          )}
        </ScrollArea>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-4 hover:bg-slate-50 transition-colors border-gray-200"
          onClick={handleViewCalendar}
        >
          {language === 'en' ? 'View Calendar' : 'Ver Calendário'}
        </Button>
      </CardContent>
    </Card>
  );
}