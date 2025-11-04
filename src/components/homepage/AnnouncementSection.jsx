import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const getAnnouncementsData = (language) => {
  const announcementsData = {
    en: [
      {
        id: 1,
        title: 'System Update: Legislative Module Enhancement',
        source: 'IT Department',
        time: '2 hours ago',
        content: 'The Legislative Management Platform will receive new features next Monday. Database conversion and technical support services will be available during the transition.',
      },
      {
        id: 2,
        title: 'Data Center Migration Completed',
        source: 'Infrastructure Team',
        time: '1 day ago',
        content: 'All municipal data has been successfully migrated to the new data center. Hosting services are now fully operational with enhanced security protocols.',
      },
      {
        id: 3,
        title: 'User Training Sessions - Executive Branch',
        source: 'Training Coordinator',
        time: '3 days ago',
        content: 'Mandatory training sessions for Executive Branch staff on the Public Management System modules. Please confirm your attendance by end of week.',
      },
    ],
    pt: [
      {
        id: 1,
        title: 'Atualização do Sistema: Melhoria do Módulo Legislativo',
        source: 'Departamento de TI',
        time: 'há 2 horas',
        content: 'A Plataforma de Gestão Legislativa receberá novos recursos na próxima segunda-feira. Serviços de conversão de banco de dados e suporte técnico estarão disponíveis durante a transição.',
      },
      {
        id: 2,
        title: 'Migração do Data Center Concluída',
        source: 'Equipe de Infraestrutura',
        time: 'há 1 dia',
        content: 'Todos os dados municipais foram migrados com sucesso para o novo data center. Os serviços de hospedagem agora estão totalmente operacionais com protocolos de segurança aprimorados.',
      },
      {
        id: 3,
        title: 'Sessões de Treinamento de Usuários - Poder Executivo',
        source: 'Coordenador de Treinamento',
        time: 'há 3 dias',
        content: 'Sessões de treinamento obrigatórias para funcionários do Poder Executivo sobre os módulos do Sistema de Gestão Pública. Confirme sua presença até o final da semana.',
      },
    ]
  };
  return announcementsData[language] || announcementsData.en;
};

export function AnnouncementSection() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const announcements = getAnnouncementsData(language);

  const handleViewAllAnnouncements = () => {
    navigate('/announcements');
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between pb-3 pt-4 px-4 bg-slate-50 border-b border-gray-100">
        <CardTitle className="text-lg font-semibold text-slate-700">
          {language === 'en' ? 'Announcements' : 'Anúncios'}
        </CardTitle>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full hover:bg-slate-200 transition-colors">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notification settings</span>
        </Button>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <ScrollArea className="h-[220px] pr-3">
          {announcements.length > 0 ? (
            <div className="space-y-3 mt-4">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="bg-white p-3 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-sm text-slate-700">{announcement.title}</h3>
                    <span className="text-xs text-gray-500">{announcement.time}</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{announcement.source}</p>
                  <p className="text-xs text-gray-700 line-clamp-2">{announcement.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-24 text-gray-500">
              <p className="text-sm">{language === 'en' ? 'No announcements' : 'Sem anúncios'}</p>
            </div>
          )}
        </ScrollArea>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-4 hover:bg-slate-50 transition-colors border-gray-200"
          onClick={handleViewAllAnnouncements}
        >
          {language === 'en' ? 'View All Announcements' : 'Ver Todos os Anúncios'}
        </Button>
      </CardContent>
    </Card>
  );
}