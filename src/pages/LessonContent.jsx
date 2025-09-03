import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Volume2, FileText, Video, Headphones, ArrowLeft, Edit, Save, X, Trash2, BookOpen, FileDown, ExternalLink, FileType2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { ImmersiveReader } from '@/components/shared/ImmersiveReader';
import { useSidebar } from '@/contexts/SidebarContext';

const LessonContent = () => {
  const { courseId, moduleId, unitId, lessonId } = useParams();
  const navigate = useNavigate();
  const { setMainCollapsed } = useSidebar();
  const [isEditing, setIsEditing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showImmersiveReader, setShowImmersiveReader] = useState(false);

  // Mock lesson data - in real app this would come from API based on lessonId
  const [lesson, setLesson] = useState({
    id: lessonId,
    title: 'Introduction to Business Trust Fundamentals',
    type: 'text',
    content: `Business trusts are legal entities that hold and manage assets for the benefit of beneficiaries. They operate under specific legal frameworks and provide various advantages for business operations.

Key Concepts:
- Legal Structure: Business trusts are formed under state law and provide a flexible structure for business operations
- Fiduciary Duties: Trustees have legal obligations to manage assets in the best interests of beneficiaries
- Tax Advantages: Business trusts can provide certain tax benefits depending on their structure and jurisdiction
- Asset Protection: Properly structured trusts can offer protection from creditors and legal claims

Applications in Modern Commerce:
Business trusts are commonly used in various industries including real estate investment, equipment leasing, and natural resource development. They provide a means for multiple investors to pool resources while maintaining professional management oversight.

The regulatory framework governing business trusts varies by jurisdiction, with some states providing more favorable legal environments than others. Understanding these regulatory differences is crucial for anyone considering the formation or investment in a business trust.`,
    duration: '15 minutes',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    audioUrl: '',
    description: 'Comprehensive overview of business trust concepts and their practical applications in modern commerce.',
    pdfUrl: '',
    heroImage: 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?w=1600&h=900&fit=crop&auto=format',
    gallery: []
  });

  const [editForm, setEditForm] = useState({
    title: lesson.title,
    type: lesson.type,
    content: lesson.content,
    duration: lesson.duration,
    description: lesson.description,
    videoUrl: lesson.videoUrl,
    audioUrl: lesson.audioUrl,
    pdfUrl: lesson.pdfUrl,
    heroImage: lesson.heroImage
  });

  // Collapse sidebar on mount for immersive reading
  useEffect(() => {
    setMainCollapsed(true);
  }, [setMainCollapsed]);

  // Update lesson content based on moduleId + lessonId
  React.useEffect(() => {
    if (!lessonId) return;
    const moduleMap = {
      '1': {
        '1': {
          title: 'Bank Accounts 101: Checking vs Savings',
          type: 'text',
          content: `# Module 1 • Banking Basics\n\nOverview:\n- Checking Accounts: daily transactions, debit cards, fees\n- Savings Accounts: interest accrual, withdrawal limits\n\nGood Fit:\n• Customers needing everyday payments (checking)\n• Customers saving for goals (savings)\n\nSecurity Practices:`,
          duration: '12 minutes',
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          audioUrl: '/placeholder-audio.mp3',
          pdfUrl: '/placeholder.pdf',
          description: 'Differentiate core account types and match to customer needs.',
          heroImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&h=900&fit=crop&auto=format',
          gallery: []
        },
        '2': {
          title: 'Deposits & Lending: How Banks Earn',
          type: 'video',
          content: `This short explainer covers net interest margin and the deposit-to-loan engine.`,
          duration: '9 minutes',
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          audioUrl: '',
          pdfUrl: '/placeholder.pdf',
          description: 'Understand the basic business model: deposits fund loans.',
          heroImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&h=900&fit=crop&auto=format',
          gallery: []
        },
        '3': {
          title: 'Fraud Prevention: Everyday Best Practices',
          type: 'audio',
          content: `TRANSCRIPT:\nDetect anomalies, verify identity, and educate customers on phishing.`,
          duration: '10 minutes',
          audioUrl: '/placeholder-audio.mp3',
          pdfUrl: '/placeholder.pdf',
          description: 'Core techniques to reduce fraud exposure at branches and online.',
          heroImage: 'https://images.unsplash.com/photo-1518085250887-2f903c200fee?w=1600&h=900&fit=crop&auto=format',
          gallery: []
        }
      },
      '2': {
        '1': {
          title: 'KYC & Onboarding Flow',
          type: 'text',
          content: `# Module 2 • Retail Banking\n\nSteps:\n1. Capture ID & proof of address\n2. Risk profiling & screening\n3. Consent & disclosures\n\nCustomer Tips:`,
          duration: '14 minutes',
          videoUrl: '',
          audioUrl: '',
          pdfUrl: '/placeholder.pdf',
          description: 'A practical walkthrough of customer onboarding requirements.',
          heroImage: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&h=900&fit=crop&auto=format',
          gallery: []
        },
        '2': {
          title: 'Branch Interaction: Teller-to-Advisor Handoff',
          type: 'video',
          content: `Observe how a teller identifies a need and smoothly hands off to an advisor.`,
          duration: '7 minutes',
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          audioUrl: '',
          pdfUrl: '',
          description: 'Improve conversion by choreographing the handoff moment.',
          heroImage: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=1600&h=900&fit=crop&auto=format',
          gallery: []
        },
        '3': {
          title: 'Service Recovery & Complaint Handling',
          type: 'text',
          content: `Framework:\n- Listen, Acknowledge, Apologize\n- Diagnose root cause\n- Offer options and confirm satisfaction`,
          duration: '11 minutes',
          videoUrl: '',
          audioUrl: '/placeholder-audio.mp3',
          pdfUrl: '/placeholder.pdf',
          description: 'Turn a negative moment into loyalty with a structured approach.',
          heroImage: 'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=1600&h=900&fit=crop&auto=format',
          gallery: []
        }
      },
      '3': {
        '1': {
          title: 'Money vs Capital Markets',
          type: 'text',
          content: `# Module 3 • Markets\n\nMoney Markets: short-term funding, T-bills, CP\nCapital Markets: equities, bonds, long-term financing\n\nUse Cases:`,
          duration: '13 minutes',
          videoUrl: '',
          audioUrl: '',
          pdfUrl: '/placeholder.pdf',
          description: 'Get a crisp mental model of the two market layers.',
          heroImage: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1600&h=900&fit=crop&auto=format',
          gallery: []
        },
        '2': {
          title: 'Yield, Duration, and Risk',
          type: 'video',
          content: `Why rates move, how duration amplifies changes, and practical hedges.`,
          duration: '8 minutes',
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          audioUrl: '',
          pdfUrl: '',
          description: 'Visual explainer with simple examples and scenarios.',
          heroImage: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1600&h=900&fit=crop&auto=format',
          gallery: []
        },
        '3': {
          title: 'Glossary & Quick Reference (PDF)',
          type: 'pdf',
          content: `Download the quick-reference for common market terms and formulas.`,
          duration: '6 minutes',
          pdfUrl: '/placeholder.pdf',
          description: 'A handy cheat sheet to reinforce learning.',
          heroImage: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=1600&h=900&fit=crop&auto=format',
          gallery: []
        }
      }
    };

    const lessonsForModule = moduleMap[moduleId] || moduleMap['1'];
    const selected = lessonsForModule[lessonId] || lessonsForModule['1'];
    setLesson(prev => ({ ...prev, ...selected, id: lessonId }));
    setEditForm(prev => ({ ...prev, ...selected }));
  }, [moduleId, lessonId]);

  const scrollTo = (elementId) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const extractTextHeadings = () => {
    if (!lesson.content) return [];
    const lines = lesson.content.split('\n');
    const headings = [];
    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return;
      const isColonHeading = trimmed.endsWith(':') && !trimmed.startsWith('-');
      const isMdHeading = /^#{1,3}\s+/.test(trimmed);
      if (isColonHeading || isMdHeading) {
        const text = isMdHeading ? trimmed.replace(/^#{1,3}\s+/, '') : trimmed.replace(/:$/, '');
        headings.push({ id: `h-${idx}`, text });
      }
    });
    return headings;
  };

  const renderTextContent = () => {
    if (!lesson.content) return null;
    const lines = lesson.content.split('\n');
    return (
      <div className="space-y-3">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={idx} className="h-2" />;
          const isColonHeading = trimmed.endsWith(':') && !trimmed.startsWith('-');
          const isMdHeading = /^#{1,3}\s+/.test(trimmed);
          if (isColonHeading || isMdHeading) {
            const text = isMdHeading ? trimmed.replace(/^#{1,3}\s+/, '') : trimmed.replace(/:$/, '');
            return (
              <h4 key={idx} id={`h-${idx}`} className="text-lg font-semibold mt-6">
                {text}
              </h4>
            );
          }
          return (
            <p key={idx} className="text-slate-700 leading-relaxed">
              {line}
            </p>
          );
        })}
      </div>
    );
  };

  const handleSave = () => {
    setLesson(prev => ({ ...prev, ...editForm }));
    setIsEditing(false);
    toast({
      title: "Lesson Updated",
      description: "Lesson content has been saved successfully.",
    });
  };

  const handleCancel = () => {
    setEditForm({
      title: lesson.title,
      type: lesson.type,
      content: lesson.content,
      duration: lesson.duration,
      description: lesson.description,
      videoUrl: lesson.videoUrl,
      audioUrl: lesson.audioUrl,
      pdfUrl: lesson.pdfUrl
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this lesson?')) {
      toast({
        title: "Lesson Deleted",
        description: "Lesson has been deleted successfully.",
      });
      navigate(`/courses/modules/${moduleId}/units`);
    }
  };

  const renderContent = () => {
      return (
      <div className="space-y-10">
        {lesson.content && (
          <section id="section-text" aria-label="Text">
            <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium">Text Content</h3>
              <Button onClick={() => setShowImmersiveReader(true)} variant="outline" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" /> Immersive Reader
            </Button>
          </div>
          <div className="prose prose-slate max-w-none">
            {isEditing ? (
                <Textarea value={editForm.content} onChange={(e) => setEditForm(prev => ({ ...prev, content: e.target.value }))} className="min-h-[300px] w-full" />
              ) : (
                renderTextContent()
            )}
          </div>
          </section>
        )}

        {lesson.videoUrl && (
          <section id="section-video" aria-label="Video">
          <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden">
              <video controls className="w-full h-full" poster="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=450&fit=crop&auto=format">
                <source src={lesson.videoUrl} type="video/mp4" />
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
              </video>
                </div>
          </section>
        )}

        {lesson.audioUrl && (
          <section id="section-audio" aria-label="Audio">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-full">
                  <Headphones className="h-8 w-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-slate-800">Audio Lesson</h4>
                  <p className="text-sm text-slate-600">Duration: {lesson.duration}</p>
                </div>
                  <Button onClick={() => setIsPlaying(!isPlaying)} className="bg-blue-600 hover:bg-blue-700">
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
              </div>
                <div className="mt-4">
                  <audio controls className="w-full">
                    <source src={lesson.audioUrl} type="audio/mpeg" />
                  </audio>
              </div>
            </CardContent>
          </Card>
          </section>
        )}

        {lesson.pdfUrl && (
          <section id="section-pdf" aria-label="PDF">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">PDF Document</h3>
              <div className="flex items-center gap-2">
                <Button asChild variant="outline" size="sm">
                  <a href={lesson.pdfUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" /> Open
                  </a>
                </Button>
                <Button asChild size="sm">
                  <a href={lesson.pdfUrl} download className="flex items-center gap-2">
                    <FileDown className="h-4 w-4" /> Download
                  </a>
              </Button>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border">
              <iframe src={lesson.pdfUrl} title="PDF Viewer" className="w-full h-[70vh] bg-white" />
          </div>
            {lesson.gallery && lesson.gallery.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {lesson.gallery.map((src, idx) => (
                  <img key={idx} src={src} alt={`lesson-${idx}`} className="rounded-lg w-full h-40 object-cover" />
                ))}
            </div>
            )}
          </section>
          )}
        </div>
      );
  };

  const getTypeIcon = () => {
    switch (lesson.type) {
      case 'text': return <FileText className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'audio': return <Volume2 className="h-4 w-4" />;
      case 'pdf': return <FileType2 className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = () => {
    switch (lesson.type) {
      case 'text': return 'bg-green-100 text-green-800';
      case 'video': return 'bg-blue-100 text-blue-800';
      case 'audio': return 'bg-purple-100 text-purple-800';
      case 'pdf': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="container mx-auto p-6 lg:p-8 animate-fade-in max-w-screen-2xl">
      {/* Hero header with background image */}
      <div
        className="relative mb-6 overflow-hidden rounded-2xl h-44 md:h-56"
        style={{ backgroundImage: `url(${lesson.heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex items-end p-4">
          <h2 className="text-white text-2xl md:text-3xl font-bold drop-shadow">{lesson.title}</h2>
        </div>
      </div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            {isEditing ? (
              <Input
                value={editForm.title}
                onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                className="text-2xl font-bold border-none p-0 h-auto focus-visible:ring-0"
              />
            ) : (
              <h1 className="text-2xl font-bold">{lesson.title}</h1>
            )}
            <div className="flex items-center gap-2 mt-2">
              {isEditing ? (
                <Select value={editForm.type} onValueChange={(value) => setEditForm(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge className={getTypeColor()}>
                  {getTypeIcon()}
                  <span className="ml-1 capitalize">{lesson.type}</span>
                </Badge>
              )}
              {isEditing ? (
                <Input
                  value={editForm.duration}
                  onChange={(e) => setEditForm(prev => ({ ...prev, duration: e.target.value }))}
                  className="w-32"
                  placeholder="Duration"
                />
              ) : (
                <Badge variant="outline">
                  {lesson.duration}
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <Card className="shadow-xl border-0 rounded-2xl">
          <CardContent className="p-6 lg:p-8">
            {renderContent()}
          </CardContent>
        </Card>

        <div className="lg:sticky lg:top-6 lg:h-fit lg:overflow-visible lg:z-10">
          {(lesson.content || lesson.videoUrl || lesson.audioUrl || lesson.pdfUrl) && (
            <Card className="border-0 shadow-md rounded-2xl">
              <CardHeader>
                <CardTitle className="text-base">Quick links</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700 space-y-2">
                {lesson.content && (
                  <button onClick={() => scrollTo('section-text')} className="block text-left w-full hover:text-blue-600">Text</button>
                )}
                {lesson.videoUrl && (
                  <button onClick={() => scrollTo('section-video')} className="block text-left w-full hover:text-blue-600">Video</button>
                )}
                {lesson.audioUrl && (
                  <button onClick={() => scrollTo('section-audio')} className="block text-left w-full hover:text-blue-600">Audio</button>
                )}
                {lesson.pdfUrl && (
                  <button onClick={() => scrollTo('section-pdf')} className="block text-left w-full hover:text-blue-600">PDF</button>
                )}
              </CardContent>
            </Card>
          )}

          {lesson.content && (
            <Card className="border-0 shadow-md rounded-2xl mt-4">
              <CardHeader>
                <CardTitle className="text-base">On this page</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700 space-y-2">
                {extractTextHeadings().map((h) => (
                  <button key={h.id} onClick={() => scrollTo(h.id)} className="block text-left w-full hover:text-blue-600">{h.text}</button>
                ))}
                <div className="pt-3">
                  <Button onClick={() => setShowImmersiveReader(true)} variant="outline" className="w-full flex items-center gap-2">
                    <BookOpen className="h-4 w-4" /> Immersive Reader
              </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {lesson.pdfUrl && (
            <Card className="border-0 shadow-md rounded-2xl mt-4">
              <CardHeader>
                <CardTitle className="text-base">Document</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-slate-600">Use the controls to open or download.</p>
                <div className="flex gap-2">
                  <Button asChild variant="outline" className="flex-1">
                    <a href={lesson.pdfUrl} target="_blank" rel="noreferrer"><ExternalLink className="h-4 w-4 mr-2" /> Open</a>
                  </Button>
                  <Button asChild className="flex-1">
                    <a href={lesson.pdfUrl} download><FileDown className="h-4 w-4 mr-2" /> Download</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <ImmersiveReader
        content={lesson.content}
        isOpen={showImmersiveReader}
        onClose={() => setShowImmersiveReader(false)}
        title={lesson.title}
      />
      </div>
    </div>
  );
};

export default LessonContent;