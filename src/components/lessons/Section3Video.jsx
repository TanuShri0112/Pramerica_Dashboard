import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Pause, Download, Maximize2 } from 'lucide-react';

const Section3Video = () => {
  const [speakingBlocks, setSpeakingBlocks] = useState({});
  const [voices, setVoices] = useState([]);
  const [selectedLang, setSelectedLang] = useState('en-US');
  const [selectedVoiceURI, setSelectedVoiceURI] = useState('');

  // Language options
  const languageOptions = React.useMemo(() => ([
    { code: 'en-US', label: 'English (US)' },
    { code: 'hi-IN', label: 'हिन्दी (Hindi)' },
    { code: 'mr-IN', label: 'मराठी (Marathi)' }
  ]), []);

  // UI text based on selected language
  const uiText = React.useMemo(() => {
    const map = {
      'en': { listen: 'Listen', stop: 'Stop' },
      'hi': { listen: 'सुनें', stop: 'रोकें' },
      'mr': { listen: 'ऐका', stop: 'थांबवा' }
    };
    const key = (selectedLang || 'en-US').split('-')[0];
    return map[key] || map['en'];
  }, [selectedLang]);

  // Language aware narration for the PDF section
  const getPdfNarrationText = (langCode) => {
    const base = (langCode || 'en-US').split('-')[0];
    const texts = {
      en: (
        'Pramerica Rakshak Smart - One Page Overview\n' +
        'Overview\n' +
        'Pramerica Rakshak Smart is a life insurance savings plan designed to provide protection, ' +
        'guaranteed income, and long-term financial security for individuals and families.\n' +
        'Key Benefits\n' +
        '✔ Life Insurance cover during the policy term\n' +
        '✔ Guaranteed Income payouts\n' +
        '✔ Savings Booster at maturity\n' +
        '✔ Tax Savings under prevailing laws\n' +
        'Flexibility\n' +
        '• Policy terms: 10, 12, 15, or 20 years\n' +
        '• Premium payment terms: 5, 7, 10, or 12 years\n' +
        '• Payment modes: Annual, Semi-Annual, or Monthly\n' +
        'Assurance\n' +
        'As long as premiums are paid, benefits are guaranteed. No surprises – full clarity and ' +
        'financial strength for your loved ones.'
      ),
      hi: (
        'प्रमेरिका रक्षक स्मार्ट - एक पेज अवलोकन\n' +
        'अवलोकन\n' +
        'प्रमेरिका रक्षक स्मार्ट एक जीवन बीमा बचत योजना है, जो सुरक्षा,\n' +
        'गारंटीड आय और व्यक्तियों व परिवारों के लिए दीर्घकालिक वित्तीय स्थिरता प्रदान करने हेतु बनाई गई है।\n' +
        'मुख्य लाभ\n' +
        '✔ पॉलिसी अवधि के दौरान जीवन बीमा कवर\n' +
        '✔ गारंटीड आय के भुगतान\n' +
        '✔ परिपक्वता पर सेविंग्स बूस्टर\n' +
        '✔ प्रचलित कानूनों के अंतर्गत कर लाभ\n' +
        'लचीलापन\n' +
        '• पॉलिसी अवधि: 10, 12, 15 या 20 वर्ष\n' +
        '• प्रीमियम भुगतान अवधि: 5, 7, 10 या 12 वर्ष\n' +
        '• भुगतान मोड: वार्षिक, अर्द्ध-वार्षिक या मासिक\n' +
        'आश्वासन\n' +
        'जब तक प्रीमियम का भुगतान किया जाता है, लाभ सुनिश्चित हैं। कोई आश्चर्य नहीं – पूर्ण स्पष्टता और\n' +
        'आपके प्रियजनों के लिए वित्तीय मजबूती।'
      )
    };
    return texts[base] || texts.en;
  };

  // Load voices when component mounts
  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const load = () => {
      const v = synth.getVoices();
      setVoices(v);
      // Default selected voice for current lang
      const defaultVoice = v.find(voice => voice.lang === selectedLang) || v.find(voice => voice.lang?.startsWith(selectedLang.split('-')[0])) || v[0];
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
    const voice = voices.find(v => v.voiceURI === selectedVoiceURI) || voices.find(v => v.lang === selectedLang);
    if (voice) utter.voice = voice;
    utter.onend = () => setSpeakingBlocks(prev => ({ ...prev, [blockKey]: false }));
    setSpeakingBlocks(prev => ({ ...prev, [blockKey]: true }));
    synth.speak(utter);
  };

  const handleExploreMore = () => {
    // Add your navigation or action logic here
    console.log('Explore More clicked');
  };

  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/assets/Section.pdf';
    link.download = 'PramericaRakshakSmart.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFullscreenPDF = () => {
    window.open('/assets/Section.pdf', '_blank');
  };

  return (
    <div className="w-full">
      {/* Controls Section - Above the video */}
      <div className="bg-white rounded-t-2xl shadow-lg p-4 mb-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Language and Voice Controls */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">Language:</label>
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {languageOptions.map(opt => (
                <option key={opt.code} value={opt.code}>{opt.label}</option>
              ))}
            </select>
            
            <label className="text-sm font-medium text-gray-700">Voice:</label>
            <select
              value={selectedVoiceURI}
              onChange={(e) => setSelectedVoiceURI(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px]"
            >
              {voices
                .filter(v => v.lang === selectedLang || v.lang?.startsWith(selectedLang.split('-')[0]))
                .map(v => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              {voices.length === 0 && (
                <option value="">System default</option>
              )}
            </select>
          </div>

          {/* Listen Button */}
          <Button 
            size="sm" 
            variant="outline" 
            className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100" 
            onClick={() => handleSpeakToggle('main-content', 'Guaranteed Benefits, Zero Surprises. With Rakshak Smart, your family\'s future is always secure.')}
          >
            {speakingBlocks['main-content'] ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {speakingBlocks['main-content'] ? uiText.stop : uiText.listen}
          </Button>
        </div>
      </div>

      {/* Video Section */}
      <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-b-2xl">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/assets/Creditor_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 rounded-b-2xl"></div>
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 py-8">
          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 animate-fade-in">
            Guaranteed Benefits, Zero Surprises
          </h2>
          
          {/* Sub-heading */}
          <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 max-w-3xl leading-relaxed animate-fade-in animation-delay-200">
            With Rakshak Smart, your family's future is always secure.
          </p>
          
          {/* Call-to-Action Button */}
          <Button
            onClick={handleExploreMore}
            className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in animation-delay-400"
          >
            Explore More
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        
        {/* Additional Visual Elements */}
        <div className="absolute bottom-6 left-6 opacity-20">
          <div className="w-16 h-16 border-2 border-white rounded-full"></div>
        </div>
        
        <div className="absolute top-6 right-6 opacity-20">
          <div className="w-12 h-12 border-2 border-white rounded-full"></div>
        </div>
      </section>

      {/* Section 4: PDF Viewing Section */}
      <section className="max-w-6xl mx-auto mt-12 px-6">
        <div className="bg-gradient-to-r from-gray-50 to-indigo-50 rounded-2xl shadow-lg p-8">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Policy Details & Reference Material
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Review the official brochure and eligibility details.
            </p>
          </div>

          {/* PDF Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 bg-white rounded-xl p-4 shadow-md">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Document Controls:</span>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                onClick={() => handleSpeakToggle('pdf-section', getPdfNarrationText(selectedLang))}
                variant="outline"
                className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
              >
                {speakingBlocks['pdf-section'] ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {speakingBlocks['pdf-section'] ? uiText.stop : uiText.listen}
              </Button>
              <Button
                onClick={handleDownloadPDF}
                variant="outline"
                className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button
                onClick={handleFullscreenPDF}
                variant="outline"
                className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
              >
                <Maximize2 className="h-4 w-4 mr-2" />
                Fullscreen View
              </Button>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <iframe
              src="/assets/Section.pdf"
              className="w-full h-[500px] md:h-[600px] lg:h-[700px] border-0"
              title="Policy Details PDF"
              frameBorder="0"
            >
              <p className="p-4 text-gray-600">
                Your browser does not support PDF viewing. 
                <a 
                  href="/assets/Section.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline ml-2"
                >
                  Click here to view the PDF
                </a>
              </p>
            </iframe>
          </div>

          {/* PDF Fallback Info */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              If the PDF doesn't load properly, use the download button above or 
              <button 
                onClick={handleFullscreenPDF}
                className="text-blue-600 hover:text-blue-800 underline ml-1"
              >
                open in a new tab
              </button>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Section3Video;
