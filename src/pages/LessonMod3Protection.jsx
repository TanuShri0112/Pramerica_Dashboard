import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Volume2, Maximize2, Play, Pause, X, Heart, ExternalLink, FileDown } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const LessonMod3Protection = () => {
  const navigate = useNavigate();
  const [speakingBlocks, setSpeakingBlocks] = useState({});
  const [voices, setVoices] = useState([]);
  const [selectedLang, setSelectedLang] = useState('en-US');
  const [selectedVoiceURI, setSelectedVoiceURI] = useState('');
  const [isFullScreenModalOpen, setIsFullScreenModalOpen] = useState(false);
  const [audioLang, setAudioLang] = useState('en-US'); // Local state for audio section only
  const [quizAnswers, setQuizAnswers] = useState({}); // State for quiz answers
  const textRef = useRef(null);

  // Language options
  const languageOptions = React.useMemo(() => ([
    { code: 'en-US', label: 'English (US)' },
    { code: 'hi-IN', label: 'हिन्दी (Hindi)' },
    { code: 'mr-IN', label: 'मराठी (Marathi)' }
  ]), []);

  // UI text based on selected language
  const uiText = React.useMemo(() => {
    const map = {
      'en': { 
        backToModules: 'Back to Modules',
        module3: 'Module 3: Building Your Protection Plan',
        courseTitle: 'Protecting Dreams',
        description: 'Creating a comprehensive strategy for your family\'s security',
        complete: 'Complete Module'
      },
      'hi': { 
        backToModules: 'मॉड्यूल्स पर वापस जाएं',
        module3: 'मॉड्यूल 3: अपनी सुरक्षा योजना बनाना',
        courseTitle: 'सपनों की रक्षा',
        description: 'अपने परिवार की सुरक्षा के लिए एक व्यापक रणनीति बनाना',
        complete: 'मॉड्यूल पूरा करें'
      },
      'mr': { 
        backToModules: 'मॉड्यूल्सकडे परत जा',
        module3: 'मॉड्यूल 3: तुमची संरक्षण योजना तयार करणे',
        courseTitle: 'स्वप्नांचे संरक्षण',
        description: 'तुमच्या कुटुंबाच्या सुरक्षेसाठी एक व्यापक धोरण तयार करणे',
        complete: 'मॉड्यूल पूर्ण करा'
      }
    };
    const key = (selectedLang || 'en-US').split('-')[0];
    return map[key] || map['en'];
  }, [selectedLang]);

  const handleBackToModules = () => {
    navigate(-1);
  };

  // Load voices when component mounts
  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const load = () => {
      const v = synth.getVoices();
      setVoices(v);
      const defaultVoice = v.find(voice => voice.lang === selectedLang) || 
                          v.find(voice => voice.lang?.startsWith(selectedLang.split('-')[0])) || 
                          v[0];
      if (defaultVoice && !selectedVoiceURI) {
        setSelectedVoiceURI(defaultVoice.voiceURI);
      }
    };
    load();
    synth.onvoiceschanged = load;
    return () => {
      if (synth) synth.onvoiceschanged = null;
    };
  }, [selectedLang, selectedVoiceURI]);

  const handleSpeakToggle = (blockKey, text) => {
    if (!text) return;
    const synth = window.speechSynthesis;
    if (!synth) return;
    
    const isSpeaking = speakingBlocks[blockKey];
    if (isSpeaking) {
      synth.cancel();
      setSpeakingBlocks(prev => ({ ...prev, [blockKey]: false }));
      return;
    }
    
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = selectedLang;
    const voice = voices.find(v => v.voiceURI === selectedVoiceURI) || 
                  voices.find(v => v.lang === selectedLang);
    if (voice) utter.voice = voice;
    utter.onend = () => setSpeakingBlocks(prev => ({ ...prev, [blockKey]: false }));
    setSpeakingBlocks(prev => ({ ...prev, [blockKey]: true }));
    synth.speak(utter);
  };

  const handleFullScreen = () => {
    setIsFullScreenModalOpen(true);
  };

  const handleCompleteModule = () => {
    toast.success('Module completed successfully!');
    navigate(-1);
  };

  // Translation object for lesson content
  const t = React.useMemo(() => {
    const baseLang = (selectedLang || 'en-US').split('-')[0];
    
    if (baseLang === 'hi') {
      return {
        introTitle: 'पाठ 3: लाभ कार्य में – वास्तविक परिदृश्य',
        introSubtitle: 'रक्षक स्मार्ट वास्तविक जीवन में कैसे काम करता है',
        learnTitle: 'इस पाठ में आप क्या सीखेंगे',
        listen: 'सुनें',
        stop: 'रोकें',
        outcomesTitle: 'सीखने के परिणाम',
        toolsTitle: 'आपके द्वारा उपयोग किए जाने वाले उपकरण',
        paragraph: 'इस पाठ में, आप देखेंगे कि रक्षक स्मार्ट बीमा योजना वास्तविक जीवन में कैसे काम करती है। हम सुखदेव और दीपक के उदाहरणों के माध्यम से वार्षिक गारंटीड आय और परिपक्वता लाभ के बारे में जानेंगे।',
        outcomes: [
          'वास्तविक जीवन परिदृश्यों को समझना',
          'वार्षिक गारंटीड आय के लाभ',
          'परिवार की वित्तीय सुरक्षा',
          'मृत्यु लाभ का महत्व'
        ],
        tools: [
          'परिदृश्य वीडियो',
          'टाइमलाइन चार्ट',
          'नोट्स पैनल',
          'प्रतिबिंबित गतिविधि'
        ],
        hoverToFlip: 'फ्लिप करने हेतु होवर करें',
        summary: 'सारांश',
        studyKeyIdeas: 'मुख्य विचारों का अध्ययन करें'
      };
    }
    if (baseLang === 'mr') {
      return {
        introTitle: 'धडा 3: लाभ कृतीत – वास्तविक परिस्थिती',
        introSubtitle: 'रक्षक स्मार्ट वास्तविक जीवनात कसे काम करतो',
        learnTitle: 'या धड्यात तुम्ही काय शिकाल',
        listen: 'ऐका',
        stop: 'थांबवा',
        outcomesTitle: 'शिकण्याचे परिणाम',
        toolsTitle: 'तुम्ही वापराल ते साधने',
        paragraph: 'या धड्यात, तुम्ही पाहाल की रक्षक स्मार्ट विमा योजना वास्तविक जीवनात कशी काम करते. आम्ही सुखदेव आणि दीपक यांच्या उदाहरणांद्वारे वार्षिक हमी आय आणि परिपक्वता लाभाबद्दल जाणून घेणार आहोत.',
        outcomes: [
          'वास्तविक जीवन परिस्थिती समजून घेणे',
          'वार्षिक हमी आयेचे फायदे',
          'कुटुंबाची आर्थिक सुरक्षा',
          'मृत्यू लाभाचे महत्त्व'
        ],
        tools: [
          'परिस्थिती व्हिडिओ',
          'टाइमलाइन चार्ट',
          'नोट्स पॅनेल',
          'प्रतिबिंबित क्रियाकलाप'
        ],
        hoverToFlip: 'फ्लिपसाठी होवर करा',
        summary: 'सारांश',
        studyKeyIdeas: 'महत्त्वाच्या कल्पना अभ्यासा'
      };
    }
    return {
      introTitle: 'Lesson 3: Benefits in Action – Real Scenarios',
      introSubtitle: 'How Rakshak Smart works in real life',
      learnTitle: 'What You\'ll Learn in This Lesson',
      listen: 'Listen',
      stop: 'Stop',
      outcomesTitle: 'Learning Outcomes',
      toolsTitle: 'Tools You\'ll Use',
      paragraph: 'In this lesson, you will see how the Rakshak Smart insurance plan works in real life. We will learn about annual guaranteed income and maturity benefits through examples of Sukhdev and Deepak.',
      outcomes: [
        'Understand real-life scenarios',
        'Benefits of annual guaranteed income',
        'Family financial security',
        'Importance of death benefits'
      ],
      tools: [
        'Scenario videos',
        'Timeline charts',
        'Notes panel',
        'Reflective activities'
      ],
      hoverToFlip: 'Hover to flip',
      summary: 'Summary',
      studyKeyIdeas: 'Study key ideas'
    };
  }, [selectedLang]);

  // Study cards for carousel
  const studyCards = React.useMemo(() => {
    const baseLang = (selectedLang || 'en-US').split('-')[0];
    
    if (baseLang === 'hi') {
      return [
        {
          title: 'युवा पेशेवर का उदाहरण',
          front: ['25 वर्ष की आयु', 'एन्हांस्ड लाइफ ऑप्शन', '15 वर्ष की अवधि'],
          back: 'वार्षिक गारंटीड आय + परिपक्वता लाभ प्राप्त करता है।',
          color: 'from-blue-50 to-indigo-50 border-blue-100',
        },
        {
          title: 'परिवार के मुखिया का उदाहरण',
          front: ['35 वर्ष की आयु', 'लाइफ ऑप्शन', '20 वर्ष की अवधि'],
          back: 'मासिक आय और एकमुश्त भुगतान के साथ अपने परिवार को सुरक्षित करता है।',
          color: 'from-green-50 to-emerald-50 border-green-100',
        },
        {
          title: 'मृत्यु लाभ का महत्व',
          front: ['परिवार की वित्तीय स्थिरता', 'दुर्भाग्यपूर्ण घटनाओं में सुरक्षा', 'निरंतर आय'],
          back: 'मृत्यु लाभ यह सुनिश्चित करता है कि परिवार वित्तीय रूप से स्थिर रहे।',
          color: 'from-purple-50 to-violet-50 border-purple-100',
        },
      ];
    }
    if (baseLang === 'mr') {
      return [
        {
          title: 'तरुण व्यावसायिकाचे उदाहरण',
          front: ['25 वर्षांचे वय', 'एन्हांस्ड लाइफ ऑप्शन', '15 वर्षांचा कालावधी'],
          back: 'वार्षिक हमी आय + परिपक्वता लाभ मिळतो.',
          color: 'from-blue-50 to-indigo-50 border-blue-100',
        },
        {
          title: 'कुटुंब प्रमुखाचे उदाहरण',
          front: ['35 वर्षांचे वय', 'लाइफ ऑप्शन', '20 वर्षांचा कालावधी'],
          back: 'मासिक आय आणि एकदम भरणा सह त्यांच्या कुटुंबाला सुरक्षित करतो.',
          color: 'from-green-50 to-emerald-50 border-green-100',
        },
        {
          title: 'मृत्यू लाभाचे महत्त्व',
          front: ['कुटुंबाची आर्थिक स्थिरता', 'दुर्दैवी घटनांमध्ये संरक्षण', 'सतत आय'],
          back: 'मृत्यू लाभ हे सुनिश्चित करतो की कुटुंब आर्थिकदृष्ट्या स्थिर राहते.',
          color: 'from-purple-50 to-violet-50 border-purple-100',
        },
      ];
    }
    return [
      {
        title: 'Young Professional Example',
        front: ['Age 25', 'Enhanced Life Option', '15-year term'],
        back: 'Receives annual guaranteed income + maturity benefit.',
        color: 'from-blue-50 to-indigo-50 border-blue-100',
      },
      {
        title: 'Family Head Example',
        front: ['Age 35', 'Life Option', '20-year term'],
        back: 'Secures his family with monthly income & lump sum payout.',
        color: 'from-green-50 to-emerald-50 border-green-100',
      },
      {
        title: 'Death Benefit Importance',
        front: ['Family financial stability', 'Protection in unfortunate events', 'Continuous income'],
        back: 'Death benefit ensures family\'s financial stability even in unfortunate events.',
        color: 'from-purple-50 to-violet-50 border-purple-100',
      },
    ];
  }, [selectedLang]);

  const baseLang = (selectedLang || 'en-US').split('-')[0];
  
  const pdfUi = React.useMemo(() => {
    if (baseLang === 'hi') return { title: 'पीडीएफ दस्तावेज', open: 'खोलें', download: 'डाउनलोड' };
    if (baseLang === 'mr') return { title: 'PDF दस्तऐवज', open: 'उघडा', download: 'डाउनलोड' };
    return { title: 'PDF Document', open: 'Open', download: 'Download' };
  }, [baseLang]);
  const pdfUrl = '/assets/Lesson3Protection_Plan.pdf';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <Button 
            onClick={handleBackToModules} 
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {uiText.backToModules}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Section 1: Intro */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.introTitle}</h1>
            <p className="text-xl text-gray-600 leading-relaxed">{t.introSubtitle}</p>
          </div>

          {/* Study Card Carousel (Flipping cards) */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              {baseLang === 'hi' ? 'मुख्य विचारों का अध्ययन करें' : baseLang === 'mr' ? 'महत्त्वाच्या कल्पना अभ्यासा' : 'Study Key Ideas'}
            </h3>
            <div className="relative">
              <Carousel className="w-full">
                <CarouselContent>
                  {studyCards.map((card, idx) => (
                    <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                      <div className="group [perspective:1000px] h-64">
                        <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                          {/* Front */}
                          <div className="absolute inset-0 bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm [backface-visibility:hidden]">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">{card.title}</h3>
                            <ul className="text-sm text-gray-700 space-y-2">
                              {card.front.map((pt, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                                  <span>{pt}</span>
                                </li>
                              ))}
                            </ul>
                            <p className="text-xs text-gray-500 mt-4">{baseLang === 'hi' ? 'फ्लिप करने हेतु होवर करें' : baseLang === 'mr' ? 'फ्लिपसाठी होवर करा' : 'Hover to flip'}</p>
                          </div>
                          {/* Back */}
                          <div className="absolute inset-0 bg-white border border-gray-200 rounded-xl p-6 shadow-sm [transform:rotateY(180deg)] [backface-visibility:hidden]">
                            <h4 className="text-base font-semibold text-gray-900 mb-2">{baseLang === 'hi' ? 'सारांश' : baseLang === 'mr' ? 'सारांश' : 'Summary'}</h4>
                            <p className="text-sm text-gray-700 leading-relaxed">{card.back}</p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-4" />
                <CarouselNext className="-right-4" />
              </Carousel>
            </div>
          </div>

          {/* Section Description with TTS and Controls */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">{t.learnTitle}</h2>
              <div className="flex items-center gap-3">
                <select
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {languageOptions.map(opt => (
                    <option key={opt.code} value={opt.code}>{opt.label}</option>
                  ))}
                </select>
                <select
                  value={selectedVoiceURI}
                  onChange={(e) => setSelectedVoiceURI(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {voices
                    .filter(v => v.lang === selectedLang || v.lang?.startsWith(selectedLang.split('-')[0]))
                    .map(v => (
                      <option key={v.voiceURI} value={v.voiceURI}>{v.name} ({v.lang})</option>
                    ))}
                  {voices.length === 0 && <option value="">System default</option>}
                </select>
                <Button onClick={handleFullScreen} variant="outline" size="icon" className="p-2">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-end mb-3">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100" 
                  onClick={() => handleSpeakToggle('lesson-text', t.paragraph)}
                >
                  {speakingBlocks['lesson-text'] ? <Pause className="h-3 w-3 mr-2" /> : <Play className="h-3 w-3 mr-2" />}
                  {speakingBlocks['lesson-text'] ? t.stop : t.listen}
                </Button>
              </div>
              <p className="text-gray-700 leading-relaxed">{t.paragraph}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-2">{t.outcomesTitle}</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  {t.outcomes.map((line, i) => (<li key={i}>{line}</li>))}
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-2">{t.toolsTitle}</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  {t.tools.map((line, i) => (<li key={i}>{line}</li>))}
                </ul>
              </div>
            </div>
          </div>
        </section>

                 {/* Section 2: Video Scenarios */}
         <section className="max-w-4xl mx-auto mb-12">
           <div className="bg-white rounded-2xl shadow-lg p-8">
             <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
               {baseLang === 'hi' ? 'परिदृश्य वीडियो' : baseLang === 'mr' ? 'परिस्थिती व्हिडिओ' : 'Scenario Videos'}
             </h2>
             <p className="text-gray-600 text-center mb-8">
               {baseLang === 'hi' ? 'वास्तविक जीवन के उदाहरणों के माध्यम से रक्षक स्मार्ट के लाभों को देखें' : 
                baseLang === 'mr' ? 'वास्तविक जीवनातील उदाहरणांद्वारे रक्षक स्मार्टचे फायदे पहा' : 
                'See Rakshak Smart benefits through real-life examples'}
             </p>
            
                         <div className="rounded-lg overflow-hidden border bg-white">
               {/* Video Player */}
               <div className="w-full h-[60vh] bg-gray-100 flex items-center justify-center">
                 <div className="text-center">
                   <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                     <Play className="h-8 w-8 text-blue-600" />
                   </div>
                   <h3 className="text-lg font-semibold text-gray-800 mb-2">
                     {baseLang === 'hi' ? 'परिदृश्य वीडियो' : baseLang === 'mr' ? 'परिस्थिती व्हिडिओ' : 'Scenario Video'}
                   </h3>
                   <p className="text-gray-600 mb-4">
                     {baseLang === 'hi' ? 'वास्तविक जीवन के उदाहरण' : 
                      baseLang === 'mr' ? 'वास्तविक जीवनातील उदाहरणे' : 
                      'Real-life examples'}
                   </p>
                   <Button 
                     variant="outline" 
                     className="flex items-center gap-2 mx-auto"
                     onClick={() => window.open('/assets/Creditor_video.mp4', '_blank')}
                   >
                     <Play className="h-4 w-4" />
                     {baseLang === 'hi' ? 'वीडियो देखें' : baseLang === 'mr' ? 'व्हिडिओ पहा' : 'Watch Video'}
                   </Button>
                 </div>
               </div>
             </div>
            
                         {/* Video Actions */}
             <div className="mt-6 flex flex-wrap gap-3 justify-center">
               <Button 
                 variant="outline" 
                 className="flex items-center gap-2"
                 onClick={() => window.open('/assets/Creditor_video.mp4', '_blank')}
               >
                 <ExternalLink className="h-4 w-4" />
                 {baseLang === 'hi' ? 'नई टैब में खोलें' : baseLang === 'mr' ? 'नवीन टॅबमध्ये उघडा' : 'Open in New Tab'}
               </Button>
               <Button 
                 variant="outline" 
                 className="flex items-center gap-2"
                 onClick={() => {
                   const link = document.createElement('a');
                   link.href = '/assets/Creditor_video.mp4';
                   link.download = 'Rakshak_Smart_Scenarios.mp4';
                   link.click();
                 }}
               >
                 <FileDown className="h-4 w-4" />
                 {baseLang === 'hi' ? 'डाउनलोड करें' : baseLang === 'mr' ? 'डाउनलोड करा' : 'Download'}
               </Button>
             </div>
          </div>
        </section>

        {/* Section 3: Detailed Scenarios */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {baseLang === 'hi' ? 'विस्तृत परिदृश्य' : baseLang === 'mr' ? 'तपशीलवार परिस्थिती' : 'Detailed Scenarios'}
            </h2>
            
            <div className="space-y-8">
              {/* Scenario 1 */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {baseLang === 'hi' ? 'परिदृश्य 1: युवा पेशेवर' : baseLang === 'mr' ? 'परिस्थिती 1: तरुण व्यावसायिक' : 'Scenario 1: Young Professional'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {baseLang === 'hi' ? 
                        'एक 25 वर्षीय युवा पेशेवर जो अपने करियर की शुरुआत में है। वह अपने भविष्य के लिए एक सुरक्षित आधार बनाना चाहता है और अपने परिवार को वित्तीय सुरक्षा प्रदान करना चाहता है।' :
                        baseLang === 'mr' ?
                        'एक 25 वर्षांचा तरुण व्यावसायिक जो त्यांच्या करिअरच्या सुरुवातीला आहे. तो त्यांच्या भविष्यासाठी एक सुरक्षित पाया तयार करू इच्छितो आणि त्यांच्या कुटुंबाला आर्थिक सुरक्षा प्रदान करू इच्छितो.' :
                        'A 25-year-old young professional who is at the beginning of their career. They want to build a secure foundation for their future and provide financial security for their family.'
                      }
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">
                        {baseLang === 'hi' ? 'योजना विवरण' : baseLang === 'mr' ? 'योजना तपशील' : 'Plan Details'}
                      </h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• {baseLang === 'hi' ? 'एन्हांस्ड लाइफ ऑप्शन' : baseLang === 'mr' ? 'एन्हांस्ड लाइफ ऑप्शन' : 'Enhanced Life Option'}</li>
                        <li>• {baseLang === 'hi' ? '15 वर्ष की अवधि' : baseLang === 'mr' ? '15 वर्षांचा कालावधी' : '15-year term'}</li>
                        <li>• {baseLang === 'hi' ? 'वार्षिक गारंटीड आय' : baseLang === 'mr' ? 'वार्षिक हमी आय' : 'Annual guaranteed income'}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">25</span>
                      </div>
                      <p className="text-blue-800 font-semibold">
                        {baseLang === 'hi' ? 'वर्ष की आयु' : baseLang === 'mr' ? 'वर्षांचे वय' : 'Years Old'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scenario 2 */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {baseLang === 'hi' ? 'परिदृश्य 2: परिवार के मुखिया' : baseLang === 'mr' ? 'परिस्थिती 2: कुटुंब प्रमुख' : 'Scenario 2: Family Head'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {baseLang === 'hi' ? 
                        'एक 35 वर्षीय परिवार के मुखिया जो अपने परिवार की वित्तीय सुरक्षा सुनिश्चित करना चाहते हैं। उन्हें अपने बच्चों की शिक्षा और परिवार की दैनिक जरूरतों के लिए नियमित आय की आवश्यकता है।' :
                        baseLang === 'mr' ?
                        'एक 35 वर्षांचा कुटुंब प्रमुख जो त्यांच्या कुटुंबाची आर्थिक सुरक्षा सुनिश्चित करू इच्छितो. त्यांना त्यांच्या मुलांच्या शिक्षणासाठी आणि कुटुंबाच्या दैनंदिन गरजांसाठी नियमित आय हवी आहे.' :
                        'A 35-year-old family head who wants to ensure their family\'s financial security. They need regular income for their children\'s education and family\'s daily needs.'
                      }
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">
                        {baseLang === 'hi' ? 'योजना विवरण' : baseLang === 'mr' ? 'योजना तपशील' : 'Plan Details'}
                      </h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• {baseLang === 'hi' ? 'लाइफ ऑप्शन' : baseLang === 'mr' ? 'लाइफ ऑप्शन' : 'Life Option'}</li>
                        <li>• {baseLang === 'hi' ? '20 वर्ष की अवधि' : baseLang === 'mr' ? '20 वर्षांचा कालावधी' : '20-year term'}</li>
                        <li>• {baseLang === 'hi' ? 'मासिक आय + एकमुश्त भुगतान' : baseLang === 'mr' ? 'मासिक आय + एकदम भरणा' : 'Monthly income + lump sum payout'}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg p-6 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">35</span>
                      </div>
                      <p className="text-green-800 font-semibold">
                        {baseLang === 'hi' ? 'वर्ष की आयु' : baseLang === 'mr' ? 'वर्षांचे वय' : 'Years Old'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Video Content */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {baseLang === 'hi' ? 'वीडियो सामग्री' : baseLang === 'mr' ? 'व्हिडिओ सामग्री' : 'Video Content'}
            </h2>
            <p className="text-gray-600 text-center mb-8">
              {baseLang === 'hi' ? 'रक्षक स्मार्ट के लाभों को समझने के लिए इस वीडियो को देखें' : 
               baseLang === 'mr' ? 'रक्षक स्मार्टचे फायदे समजून घेण्यासाठी हे व्हिडिओ पहा' : 
               'Watch this video to understand Rakshak Smart benefits'}
            </p>
            
            <div className="rounded-lg overflow-hidden border bg-white">
              <div className="w-full h-[60vh] bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {baseLang === 'hi' ? 'रक्षक स्मार्ट गाइड' : baseLang === 'mr' ? 'रक्षक स्मार्ट मार्गदर्शक' : 'Rakshak Smart Guide'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {baseLang === 'hi' ? 'वीडियो देखने के लिए क्लिक करें' : 
                     baseLang === 'mr' ? 'व्हिडिओ पहण्यासाठी क्लिक करा' : 
                     'Click to watch video'}
                  </p>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 mx-auto"
                    onClick={() => window.open('/assets/Creditor_video.mp4', '_blank')}
                  >
                    <Play className="h-4 w-4" />
                    {baseLang === 'hi' ? 'वीडियो देखें' : baseLang === 'mr' ? 'व्हिडिओ पहा' : 'Watch Video'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Comparison Table */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {baseLang === 'hi' ? 'योजना तुलना' : baseLang === 'mr' ? 'योजना तुलना' : 'Plan Comparison'}
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-800">
                      {baseLang === 'hi' ? 'विशेषताएं' : baseLang === 'mr' ? 'वैशिष्ट्ये' : 'Features'}
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-blue-800">
                      {baseLang === 'hi' ? 'एन्हांस्ड लाइफ' : baseLang === 'mr' ? 'एन्हांस्ड लाइफ' : 'Enhanced Life'}
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-800">
                      {baseLang === 'hi' ? 'लाइफ ऑप्शन' : baseLang === 'mr' ? 'लाइफ ऑप्शन' : 'Life Option'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">
                      {baseLang === 'hi' ? 'वार्षिक आय' : baseLang === 'mr' ? 'वार्षिक आय' : 'Annual Income'}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-blue-600">✓</td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-green-600">✓</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">
                      {baseLang === 'hi' ? 'मासिक आय' : baseLang === 'mr' ? 'मासिक आय' : 'Monthly Income'}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-blue-600">-</td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-green-600">✓</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">
                      {baseLang === 'hi' ? 'परिपक्वता लाभ' : baseLang === 'mr' ? 'परिपक्वता लाभ' : 'Maturity Benefit'}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-blue-600">✓</td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-green-600">✓</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">
                      {baseLang === 'hi' ? 'मृत्यु लाभ' : baseLang === 'mr' ? 'मृत्यू लाभ' : 'Death Benefit'}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-blue-600">✓</td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-green-600">✓</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">
                      {baseLang === 'hi' ? 'न्यूनतम अवधि' : baseLang === 'mr' ? 'किमान कालावधी' : 'Minimum Term'}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-blue-600">15 {baseLang === 'hi' ? 'वर्ष' : baseLang === 'mr' ? 'वर्षे' : 'Years'}</td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-green-600">20 {baseLang === 'hi' ? 'वर्ष' : baseLang === 'mr' ? 'वर्षे' : 'Years'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 6: Interactive Quiz */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {baseLang === 'hi' ? 'ज्ञान परीक्षण' : baseLang === 'mr' ? 'ज्ञान चाचणी' : 'Knowledge Quiz'}
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  question: baseLang === 'hi' ? 'रक्षक स्मार्ट में कौन सा लाभ शामिल है?' : 
                           baseLang === 'mr' ? 'रक्षक स्मार्टमध्ये कोणता लाभ समाविष्ट आहे?' : 
                           'Which benefit is included in Rakshak Smart?',
                  options: [
                    baseLang === 'hi' ? 'केवल मृत्यु लाभ' : baseLang === 'mr' ? 'फक्त मृत्यू लाभ' : 'Only death benefit',
                    baseLang === 'hi' ? 'वार्षिक गारंटीड आय' : baseLang === 'mr' ? 'वार्षिक हमी आय' : 'Annual guaranteed income',
                    baseLang === 'hi' ? 'केवल बचत' : baseLang === 'mr' ? 'फक्त बचत' : 'Only savings',
                    baseLang === 'hi' ? 'केवल निवेश' : baseLang === 'mr' ? 'फक्त गुंतवणूक' : 'Only investment'
                  ],
                  correct: 1,
                  explanation: baseLang === 'hi' ? 'रक्षक स्मार्ट वार्षिक गारंटीड आय प्रदान करता है जो आपको नियमित आय सुनिश्चित करता है।' :
                               baseLang === 'mr' ? 'रक्षक स्मार्ट वार्षिक हमी आय देतो जी तुम्हाला नियमित आय सुनिश्चित करते.' :
                               'Rakshak Smart provides annual guaranteed income which ensures regular income for you.'
                },
                {
                  question: baseLang === 'hi' ? 'एन्हांस्ड लाइफ ऑप्शन की न्यूनतम अवधि क्या है?' : 
                           baseLang === 'mr' ? 'एन्हांस्ड लाइफ ऑप्शनचा किमान कालावधी काय आहे?' : 
                           'What is the minimum term for Enhanced Life Option?',
                  options: [
                    baseLang === 'hi' ? '10 वर्ष' : baseLang === 'mr' ? '10 वर्षे' : '10 years',
                    baseLang === 'hi' ? '15 वर्ष' : baseLang === 'mr' ? '15 वर्षे' : '15 years',
                    baseLang === 'hi' ? '20 वर्ष' : baseLang === 'mr' ? '20 वर्षे' : '20 years',
                    baseLang === 'hi' ? '25 वर्ष' : baseLang === 'mr' ? '25 वर्षे' : '25 years'
                  ],
                  correct: 1,
                  explanation: baseLang === 'hi' ? 'एन्हांस्ड लाइफ ऑप्शन की न्यूनतम अवधि 15 वर्ष है।' :
                               baseLang === 'mr' ? 'एन्हांस्ड लाइफ ऑप्शनचा किमान कालावधी 15 वर्षे आहे.' :
                               'The minimum term for Enhanced Life Option is 15 years.'
                }
              ].map((quiz, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-4">
                    {baseLang === 'hi' ? `प्रश्न ${idx + 1}:` : baseLang === 'mr' ? `प्रश्न ${idx + 1}:` : `Question ${idx + 1}:`} {quiz.question}
                  </h3>
                  <div className="space-y-3">
                    {quiz.options.map((option, optIdx) => (
                      <label key={optIdx} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name={`quiz-${idx}`}
                          value={optIdx}
                          className="text-blue-600"
                          onChange={(e) => {
                            const selectedAnswer = parseInt(e.target.value);
                            setQuizAnswers(prev => ({
                              ...prev,
                              [idx]: selectedAnswer
                            }));
                          }}
                        />
                        <span className={`text-gray-700 ${
                          quizAnswers[idx] !== undefined && optIdx === quiz.correct ? 'font-semibold text-green-600' : ''
                        } ${
                          quizAnswers[idx] !== undefined && optIdx === quizAnswers[idx] && optIdx !== quiz.correct ? 'font-semibold text-red-600' : ''
                        }`}>
                          {option}
                          {quizAnswers[idx] !== undefined && optIdx === quiz.correct && (
                            <span className="ml-2 text-green-600">✓</span>
                          )}
                          {quizAnswers[idx] !== undefined && optIdx === quizAnswers[idx] && optIdx !== quiz.correct && (
                            <span className="ml-2 text-red-600">✗</span>
                          )}
                        </span>
                      </label>
                    ))}
                  </div>
                  {quizAnswers[idx] !== undefined && (
                    <div className={`mt-4 p-3 rounded-lg ${
                      quizAnswers[idx] === quiz.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                    }`}>
                      <p className={`text-sm ${
                        quizAnswers[idx] === quiz.correct ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {quizAnswers[idx] === quiz.correct ?
                          (baseLang === 'hi' ? 'सही उत्तर! ' : baseLang === 'mr' ? 'बरोबर उत्तर! ' : 'Correct! ') :
                          (baseLang === 'hi' ? 'गलत उत्तर। ' : baseLang === 'mr' ? 'चुकीचे उत्तर। ' : 'Incorrect. ')
                        }
                        {quiz.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>



        {/* Section 8: Reflective Activity */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {baseLang === 'hi' ? 'प्रतिबिंबित गतिविधि' : baseLang === 'mr' ? 'प्रतिबिंबित क्रियाकलाप' : 'Reflective Activity'}
            </h2>
            <p className="text-gray-600 text-center mb-8">
              {baseLang === 'hi' ? 'यदि आपको एक योजना चुननी होती, तो आपके लिए कौन से कारक सबसे महत्वपूर्ण होते?' : 
               baseLang === 'mr' ? 'जर तुम्हाला एक योजना निवडायची असेल तर तुमच्यासाठी कोणते घटक सर्वात महत्त्वाचे आहेत?' : 
               'If you had to pick a plan, which factors matter most to you?'}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: baseLang === 'hi' ? 'वार्षिक आय' : baseLang === 'mr' ? 'वार्षिक आय' : 'Annual Income',
                  description: baseLang === 'hi' ? 'नियमित वार्षिक भुगतान' : baseLang === 'mr' ? 'नियमित वार्षिक भरणा' : 'Regular annual payments',
                  icon: '💰'
                },
                {
                  title: baseLang === 'hi' ? 'मासिक आय' : baseLang === 'mr' ? 'मासिक आय' : 'Monthly Income',
                  description: baseLang === 'hi' ? 'मासिक नियमित आय' : baseLang === 'mr' ? 'मासिक नियमित आय' : 'Monthly regular income',
                  icon: '📅'
                },
                {
                  title: baseLang === 'hi' ? 'परिपक्वता लाभ' : baseLang === 'mr' ? 'परिपक्वता लाभ' : 'Maturity Benefit',
                  description: baseLang === 'hi' ? 'अवधि के अंत में एकमुश्त राशि' : baseLang === 'mr' ? 'कालावधीच्या शेवटी एकदम रक्कम' : 'Lump sum at term end',
                  icon: '🎯'
                },
                {
                  title: baseLang === 'hi' ? 'परिवार सुरक्षा' : baseLang === 'mr' ? 'कुटुंब संरक्षण' : 'Family Protection',
                  description: baseLang === 'hi' ? 'मृत्यु लाभ के साथ सुरक्षा' : baseLang === 'mr' ? 'मृत्यू लाभासह संरक्षण' : 'Protection with death benefit',
                  icon: '🛡️'
                }
              ].map((factor, idx) => (
                <div key={idx} className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-center">
                    <div className="text-3xl mb-3">{factor.icon}</div>
                    <h3 className="font-semibold text-gray-800 mb-2">{factor.title}</h3>
                    <p className="text-sm text-gray-600">{factor.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 9: Plan Benefits Explained */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {baseLang === 'hi' ? 'योजना लाभों की व्याख्या' : baseLang === 'mr' ? 'योजना फायद्यांचे स्पष्टीकरण' : 'Plan Benefits Explained'}
            </h2>
            <p className="text-gray-600 text-center mb-8">
              {baseLang === 'hi' ? 'रक्षक स्मार्ट के लाभों को विस्तार से समझें' : 
               baseLang === 'mr' ? 'रक्षक स्मार्टचे फायदे तपशीलवार समजून घ्या' : 
               'Understand Rakshak Smart benefits in detail'}
            </p>
            
            <div className="space-y-6">
              {/* Language Selection */}
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">
                    {baseLang === 'hi' ? 'ऑडियो भाषा चुनें' : baseLang === 'mr' ? 'ऑडिओ भाषा निवडा' : 'Select Audio Language'}
                  </h3>
                  <div className="flex items-center gap-3">
                    <select
                      value={audioLang}
                      onChange={(e) => setAudioLang(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {languageOptions.map(opt => (
                        <option key={opt.code} value={opt.code}>{opt.label}</option>
                      ))}
                    </select>
                    <select
                      value={selectedVoiceURI}
                      onChange={(e) => setSelectedVoiceURI(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {voices
                        .filter(v => v.lang === audioLang || v.lang?.startsWith(audioLang.split('-')[0]))
                        .map(v => (
                          <option key={v.voiceURI} value={v.voiceURI}>{v.name} ({v.lang})</option>
                        ))}
                      {voices.length === 0 && <option value="">System default</option>}
                    </select>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {baseLang === 'hi' ? 'नोट: ऑडियो भाषा पूरे पेज की भाषा से अलग है' : 
                   baseLang === 'mr' ? 'टीप: ऑडिओ भाषा संपूर्ण पृष्ठाच्या भाषेपेक्षा वेगळी आहे' : 
                   'Note: Audio language is separate from the page language'}
                </p>
              </div>

              {/* Audio Content Blocks */}
              {[
                {
                  title: baseLang === 'hi' ? 'रक्षक स्मार्ट का परिचय' : baseLang === 'mr' ? 'रक्षक स्मार्टचा परिचय' : 'Introduction to Rakshak Smart',
                  content: {
                    en: 'Rakshak Smart is a comprehensive insurance plan that provides both protection and income benefits. It ensures your family\'s financial security while offering regular income during the policy term.',
                    hi: 'रक्षक स्मार्ट एक व्यापक बीमा योजना है जो सुरक्षा और आय दोनों लाभ प्रदान करती है। यह आपके परिवार की वित्तीय सुरक्षा सुनिश्चित करती है और पॉलिसी अवधि के दौरान नियमित आय प्रदान करती है।',
                    mr: 'रक्षक स्मार्ट हा एक व्यापक विमा योजना आहे जी संरक्षण आणि आय दोन्ही फायदे देतो. हे तुमच्या कुटुंबाची आर्थिक सुरक्षा सुनिश्चित करते आणि पॉलिसी कालावधी दरम्यान नियमित आय देतो.'
                  }
                },
                {
                  title: baseLang === 'hi' ? 'योजना के लाभ' : baseLang === 'mr' ? 'योजनेचे फायदे' : 'Plan Benefits',
                  content: {
                    en: 'The plan offers annual guaranteed income, maturity benefits, and death benefits. It provides financial security for your family in all circumstances.',
                    hi: 'योजना वार्षिक गारंटीड आय, परिपक्वता लाभ और मृत्यु लाभ प्रदान करती है। यह सभी परिस्थितियों में आपके परिवार को वित्तीय सुरक्षा प्रदान करती है।',
                    mr: 'योजना वार्षिक हमी आय, परिपक्वता लाभ आणि मृत्यू लाभ देतो. हे सर्व परिस्थितींमध्ये तुमच्या कुटुंबाला आर्थिक सुरक्षा देतो.'
                  }
                },
                {
                  title: baseLang === 'hi' ? 'योजना चयन' : baseLang === 'mr' ? 'योजना निवड' : 'Plan Selection',
                  content: {
                    en: 'Choose between Enhanced Life Option for annual income or Life Option for monthly income. Both options provide comprehensive protection for your family.',
                    hi: 'वार्षिक आय के लिए एन्हांस्ड लाइफ ऑप्शन या मासिक आय के लिए लाइफ ऑप्शन के बीच चुनें। दोनों विकल्प आपके परिवार को व्यापक सुरक्षा प्रदान करते हैं।',
                    mr: 'वार्षिक आयेसाठी एन्हांस्ड लाइफ ऑप्शन किंवा मासिक आयेसाठी लाइफ ऑप्शन निवडा. दोन्ही पर्याय तुमच्या कुटुंबाला व्यापक संरक्षण देतात.'
                  }
                }
              ].map((block, idx) => (
                <div key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">{block.title}</h3>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-blue-100 border-blue-300 text-blue-700 hover:bg-blue-200" 
                      onClick={() => handleSpeakToggle(`audio-block-${idx}`, block.content[audioLang.split('-')[0] || 'en'])}
                    >
                      {speakingBlocks[`audio-block-${idx}`] ? <Pause className="h-3 w-3 mr-2" /> : <Play className="h-3 w-3 mr-2" />}
                      {speakingBlocks[`audio-block-${idx}`] ? 
                        (baseLang === 'hi' ? 'रोकें' : baseLang === 'mr' ? 'थांबवा' : 'Stop') : 
                        (baseLang === 'hi' ? 'सुनें' : baseLang === 'mr' ? 'ऐका' : 'Listen')
                      }
                    </Button>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {block.content[audioLang.split('-')[0] || 'en']}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>



        {/* Section 11: Cultural Context */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {baseLang === 'hi' ? 'सांस्कृतिक संदर्भ' : baseLang === 'mr' ? 'सांस्कृतिक संदर्भ' : 'Cultural Context'}
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  culture: baseLang === 'hi' ? 'भारतीय परिवार' : baseLang === 'mr' ? 'भारतीय कुटुंब' : 'Indian Family',
                  description: baseLang === 'hi' ? 'भारतीय परिवारों में वित्तीय सुरक्षा का विशेष महत्व है। रक्षक स्मार्ट इस जरूरत को पूरा करता है।' :
                               baseLang === 'mr' ? 'भारतीय कुटुंबांमध्ये आर्थिक सुरक्षेचे विशेष महत्त्व आहे. रक्षक स्मार्ट ही गरज पूर्ण करतो.' :
                               'Financial security has special importance in Indian families. Rakshak Smart fulfills this need.',
                  icon: '👨‍👩‍👧‍👦'
                },
                {
                  culture: baseLang === 'hi' ? 'पारंपरिक मूल्य' : baseLang === 'mr' ? 'पारंपरिक मूल्ये' : 'Traditional Values',
                  description: baseLang === 'hi' ? 'परिवार की सुरक्षा और भविष्य की योजना भारतीय संस्कृति का महत्वपूर्ण हिस्सा है।' :
                               baseLang === 'mr' ? 'कुटुंबाचे संरक्षण आणि भविष्याची योजना ही भारतीय संस्कृतीचा महत्त्वाचा भाग आहे.' :
                               'Family protection and future planning are important parts of Indian culture.',
                  icon: '🏛️'
                },
                {
                  culture: baseLang === 'hi' ? 'आधुनिक जरूरतें' : baseLang === 'mr' ? 'आधुनिक गरजा' : 'Modern Needs',
                  description: baseLang === 'hi' ? 'आधुनिक जीवन की चुनौतियों के साथ, स्मार्ट वित्तीय योजना आवश्यक है।' :
                               baseLang === 'mr' ? 'आधुनिक जीवनाच्या आव्हानांसोबत, स्मार्ट आर्थिक योजना आवश्यक आहे.' :
                               'With modern life challenges, smart financial planning is essential.',
                  icon: '💼'
                }
              ].map((context, idx) => (
                <div key={idx} className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{context.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">{context.culture}</h3>
                      <p className="text-gray-700 leading-relaxed">{context.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      
      {/* Module Completion */}
      <div className="bg-white border-t mt-12">
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {baseLang === 'hi' ? 'मॉड्यूल पूरा करने के लिए तैयार हैं?' : 
               baseLang === 'mr' ? 'मॉड्यूल पूर्ण करण्यास तयार आहात?' : 
               'Ready to complete the module?'}
            </div>
            <Button 
              onClick={handleCompleteModule}
              className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white"
            >
              {uiText.complete}
            </Button>
          </div>
        </div>
      </div>

      {/* Full Screen Modal */}
      <Dialog open={isFullScreenModalOpen} onOpenChange={setIsFullScreenModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
          <DialogHeader className="pb-4 border-b">
            <div className="flex items-center justify-between gap-3">
              <DialogTitle className="text-xl font-bold flex items-center gap-3 min-w-0">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-pink-100 text-pink-700 text-sm">💡</span>
                <span className="truncate">{t.introTitle}</span>
              </DialogTitle>
              <div className="flex items-center gap-2 flex-wrap bg-gray-50 border rounded-lg px-3 py-2">
                <label className="text-xs text-gray-600">Language</label>
                <select
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value)}
                  className="border rounded px-2 py-1 text-sm h-8"
                >
                  {languageOptions.map(opt => (
                    <option key={opt.code} value={opt.code}>{opt.label}</option>
                  ))}
                </select>
                <label className="text-xs text-gray-600">Voice</label>
                <select
                  value={selectedVoiceURI}
                  onChange={(e) => setSelectedVoiceURI(e.target.value)}
                  className="border rounded px-2 py-1 text-sm h-8 max-w-[260px]"
                >
                  {voices
                    .filter(v => v.lang === selectedLang || v.lang?.startsWith(selectedLang.split('-')[0]))
                    .map(v => (
                      <option key={v.voiceURI} value={v.voiceURI}>{v.name} ({v.lang})</option>
                    ))}
                  {voices.length === 0 && (<option value="">System default</option>)}
                </select>
                <Button variant="outline" size="sm" className="h-8" onClick={() => setIsFullScreenModalOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>
          <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Modal Content - Same as main content but adapted for modal */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{t.introTitle}</h1>
                <p className="text-lg text-gray-600 leading-relaxed">{t.introSubtitle}</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">{t.learnTitle}</h2>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 leading-relaxed">{t.paragraph}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">{t.outcomesTitle}</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {t.outcomes.map((line, i) => (<li key={i}>{line}</li>))}
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">{t.toolsTitle}</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {t.tools.map((line, i) => (<li key={i}>{line}</li>))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LessonMod3Protection;
