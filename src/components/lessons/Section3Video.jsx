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
        'DepED Apayao K-12 Curriculum Training - Overview\n' +
        'Program Overview\n' +
        'Training of School Leaders on the Revised K to 12 Curriculum Phase 2 Implementation ' +
        'covering comprehensive curriculum guidelines for Grades 2, 3, 5, and 8.\n' +
        'Training Components\n' +
        '✔ Curriculum Implementation Strategies\n' +
        '✔ Grade-level Specific Teaching Methodologies\n' +
        '✔ Assessment and Evaluation Frameworks\n' +
        '✔ Learning Resource Management\n' +
        'Catering Services Included\n' +
        '• Breakfast, Lunch, and Dinner provided daily\n' +
        '• Mid-morning and afternoon snacks\n' +
        '• Accommodation for out-of-town participants\n' +
        'Support & Resources\n' +
        'Complete training materials, venue facilities, and logistics support are provided. ' +
        'All meals and accommodation needs are fully covered during the training period.'
      ),
      hi: (
        'DepED Apayao K-12 पाठ्यक्रम प्रशिक्षण - अवलोकन\n' +
        'कार्यक्रम अवलोकन\n' +
        'स्कूल नेताओं के लिए संशोधित K से 12 पाठ्यक्रम चरण 2 कार्यान्वयन पर प्रशिक्षण ' +
        'ग्रेड 2, 3, 5, और 8 के लिए व्यापक पाठ्यक्रम दिशानिर्देशों को कवर करना।\n' +
        'प्रशिक्षण घटक\n' +
        '✔ पाठ्यक्रम कार्यान्वयन रणनीतियाँ\n' +
        '✔ ग्रेड-स्तर विशिष्ट शिक्षण विधियाँ\n' +
        '✔ मूल्यांकन और मूल्यांकन रूपरेखा\n' +
        '✔ शिक्षण संसाधन प्रबंधन\n' +
        'खानपान सेवाएं शामिल\n' +
        '• नाश्ता, दोपहर का भोजन और रात का खाना प्रतिदिन प्रदान किया जाता है\n' +
        '• सुबह और दोपहर के नाश्ते\n' +
        '• बाहर से आने वाले प्रतिभागियों के लिए आवास\n' +
        'सहायता और संसाधन\n' +
        'पूर्ण प्रशिक्षण सामग्री, स्थल सुविधाएं और रसद सहायता प्रदान की जाती है। ' +
        'प्रशिक्षण अवधि के दौरान सभी भोजन और आवास की जरूरतें पूरी तरह से कवर की जाती हैं।'
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
    link.download = 'DepEDApayao_K12_Training_Materials.pdf';
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
            onClick={() => handleSpeakToggle('main-content', 'Empowering School Leaders. K-12 Curriculum Phase 2 Implementation Training for Grades 2, 3, 5 & 8.')}
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
            Empowering School Leaders
          </h2>
          
          {/* Sub-heading */}
          <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 max-w-3xl leading-relaxed animate-fade-in animation-delay-200">
            K-12 Curriculum Phase 2 Implementation Training for Grades 2, 3, 5 & 8
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
              Training Materials & Curriculum Guides
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Access comprehensive K-12 curriculum implementation resources for Grades 2, 3, 5 & 8.
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
              title="K-12 Training Materials PDF"
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
