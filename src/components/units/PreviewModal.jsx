import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight, Play, Pause, Volume2, Download } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

// Expected props shape: { isOpen: boolean, onClose: function, unitData: any (optional) }
const PreviewModal = ({ isOpen, onClose, unitData }) => {
  const [previewData, setPreviewData] = React.useState(null);
  const [currentImageIndex, setCurrentImageIndex] = React.useState({});
  const [audioPlaying, setAudioPlaying] = React.useState({});
  const [speakingBlocks, setSpeakingBlocks] = React.useState({});
  const [voices, setVoices] = React.useState([]);
  const [selectedLang, setSelectedLang] = React.useState('en-US');
  const [selectedVoiceURI, setSelectedVoiceURI] = React.useState('');
  const [trainerAudioUrl, setTrainerAudioUrl] = React.useState('');
  const trainerAudioRef = React.useRef(null);
  const [autoTranslate, setAutoTranslate] = React.useState(false);
  const [translatedByBlock, setTranslatedByBlock] = React.useState({});
  const [translateStatus, setTranslateStatus] = React.useState('idle'); // idle|loading|done|error
  const languageOptions = React.useMemo(() => ([
    { code: 'en-US', label: 'English (US)' },
    { code: 'hi-IN', label: 'हिन्दी (Hindi)' },
    { code: 'mr-IN', label: 'मराठी (Marathi)' },
    { code: 'bn-IN', label: 'বাংলা (Bengali)' },
    { code: 'ta-IN', label: 'தமிழ் (Tamil)' },
    { code: 'te-IN', label: 'తెలుగు (Telugu)' },
    { code: 'gu-IN', label: 'ગુજરાતી (Gujarati)' },
    { code: 'kn-IN', label: 'ಕನ್ನಡ (Kannada)' },
    { code: 'ml-IN', label: 'മലയാളം (Malayalam)' },
    { code: 'pa-IN', label: 'ਪੰਜਾਬੀ (Punjabi)' },
    { code: 'or-IN', label: 'ଓଡ଼ିଆ (Odia)' },
    { code: 'ur-PK', label: 'اُردُو (Urdu)' }
  ]), []);

  const uiText = React.useMemo(() => {
    const map = {
      'en': { preview: 'Preview', language: 'Language', voice: 'Voice', listen: 'Listen', stop: 'Stop', download: 'Download' },
      'hi': { preview: 'पूर्वावलोकन', language: 'भाषा', voice: 'आवाज़', listen: 'सुनें', stop: 'रोकें', download: 'डाउनलोड' },
      'mr': { preview: 'पूर्वावलोकन', language: 'भाषा', voice: 'आवाज', listen: 'ऐका', stop: 'थांबवा', download: 'डाउनलोड' },
      'bn': { preview: 'পূর্বরূপ', language: 'ভাষা', voice: 'কণ্ঠ', listen: 'শুনুন', stop: 'বন্ধ', download: 'ডাউনলোড' },
      'ta': { preview: 'முன்னோட்டம்', language: 'மொழி', voice: 'குரல்', listen: 'கேட்க', stop: 'நிறுத்து', download: 'பதிவிறக்க' },
      'te': { preview: 'ప్రివ్యూ', language: 'భాష', voice: 'గొంతు', listen: 'వినండి', stop: 'ఆపు', download: 'డౌన్‌లోడ్' },
      'gu': { preview: 'પૂર્વાવલોકન', language: 'ભાષા', voice: 'આવાજ', listen: 'સાંભળો', stop: 'બંધ કરો', download: 'ડાઉનલોડ' },
      'kn': { preview: 'ಪೂರ್ವ ದೃಷ್ಠಿ', language: 'ಭಾಷೆ', voice: 'ಧ್ವನಿ', listen: 'ಕೆಳಿ', stop: 'ನಿಲ್ಲಿಸಿ', download: 'ಡೌನ್‌ಲೋಡ್' },
      'ml': { preview: 'പ്രിവ്യൂ', language: 'ഭാഷ', voice: 'ശബ്ദം', listen: 'ശ്രദ്ധിക്കുക', stop: 'നിർത്തുക', download: 'ഡൗൺലോഡ്' },
      'pa': { preview: 'ਝਲਕ', language: 'ਭਾਸ਼ਾ', voice: 'ਆਵਾਜ਼', listen: 'ਸੁਣੋ', stop: 'ਰੋਕੋ', download: 'ਡਾਊਨਲੋਡ' },
      'or': { preview: 'ପ୍ରିଭ୍ୟୁ', language: 'ଭାଷା', voice: 'କଣ୍ଠସ୍ବର', listen: 'ଶୁଣନ୍ତୁ', stop: 'ବନ୍ଦ', download: 'ଡାଉନଲୋଡ୍' },
      'ur': { preview: 'پری ویو', language: 'زبان', voice: 'آواز', listen: 'سنیں', stop: 'روکیں', download: 'ڈاؤن لوڈ' }
    };
    const key = (selectedLang || 'en-US').split('-')[0];
    return map[key] || map['en'];
  }, [selectedLang]);

  React.useEffect(() => {
    if (isOpen) {
      if (unitData) {
        setPreviewData(unitData);
      } else if (typeof window.getPreviewContent === 'function') {
        const data = window.getPreviewContent();
        setPreviewData(data);
      }
    }
    return () => {
      // Stop any ongoing speech when closing
      try {
        window.speechSynthesis?.cancel();
      } catch {}
    };
  }, [isOpen, unitData]);

  React.useEffect(() => {
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

  const langToLT = (code) => {
    const key = (code || 'en-US').split('-')[0];
    const map = { en: 'en', hi: 'hi', mr: 'mr', bn: 'bn', ta: 'ta', te: 'te', gu: 'gu', kn: 'kn', ml: 'ml', pa: 'pa', or: 'or', ur: 'ur' };
    return map[key] || 'en';
  };

  const translateText = async (text, target) => {
    if (!text) return '';
    const targetCode = langToLT(target);
    if (targetCode === 'en') return text;
    const endpoints = [
      'https://libretranslate.de/translate',
      'https://translate.argosopentech.com/translate'
    ];
    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ q: text, source: 'auto', target: targetCode, format: 'text' })
        });
        if (!res.ok) throw new Error('translate failed');
        const data = await res.json();
        if (data?.translatedText) return data.translatedText;
      } catch {}
    }
    return text;
  };

  React.useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (!autoTranslate || !previewData?.blocks) {
        setTranslatedByBlock({});
        setTranslateStatus('idle');
        return;
      }
      setTranslateStatus('loading');
      const results = await Promise.all(
        previewData.blocks.map(async (block, idx) => {
          if (!block.type.startsWith('text')) return [idx, null];
          const { text, heading, subheading } = block.content || {};
          const [t1, t2, t3] = await Promise.all([
            translateText(text, selectedLang),
            translateText(heading, selectedLang),
            translateText(subheading, selectedLang)
          ]);
          return [idx, { text: t1, heading: t2, subheading: t3 }];
        })
      );
      if (cancelled) return;
      const map = {};
      results.forEach(([i, val]) => { if (val) map[i] = val; });
      setTranslatedByBlock(map);
      setTranslateStatus(Object.keys(map).length ? 'done' : 'error');
    };
    run();
    return () => { cancelled = true; };
  }, [autoTranslate, selectedLang, previewData]);

  React.useEffect(() => {
    // Auto-enable translation when language is switched away from English
    const isEnglish = (selectedLang || 'en-US').startsWith('en');
    if (!isEnglish && !autoTranslate) setAutoTranslate(true);
  }, [selectedLang]);

  const handleSpeakToggle = (blockKey, text) => {
    if (!text) return;
    const synth = window.speechSynthesis;
    // If Trainer voice selected, use uploaded audio playback instead of TTS
    if (selectedVoiceURI === '__trainer__' && trainerAudioUrl) {
      const audioEl = trainerAudioRef.current || new Audio();
      if (!trainerAudioRef.current) trainerAudioRef.current = audioEl;
      const isPlaying = speakingBlocks[blockKey] || false;
      if (isPlaying) {
        try { audioEl.pause(); audioEl.currentTime = 0; } catch {}
        setSpeakingBlocks(prev => ({ ...prev, [blockKey]: false }));
        return;
      }
      try {
        audioEl.src = trainerAudioUrl;
        audioEl.onended = () => setSpeakingBlocks(prev => ({ ...prev, [blockKey]: false }));
        setSpeakingBlocks(prev => ({ ...prev, [blockKey]: true }));
        audioEl.play();
      } catch {}
      return;
    }
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

  const renderBlockContent = (block, index) => {
    const { type, content } = block;

    // Multimedia blocks
    if (type.startsWith('multimedia-')) {
      const { multimediaType, title, url, description, duration, alt, fileSize, fileName, embedCode, fileType } = content;
      const blockKey = `multimedia-${index}`;
      
      switch (multimediaType) {
        case 'audio':
          const isPlaying = audioPlaying[blockKey] || false;
          return (
            <div className="my-8">
              {title && <h4 className="font-semibold text-gray-900 mb-3 text-lg">{title}</h4>}
              {description && (
                <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
              )}
              <div className="bg-gray-50 rounded-lg p-6 border">
                <div className="flex items-center gap-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-shrink-0"
                    onClick={() => setAudioPlaying(prev => ({
                      ...prev,
                      [blockKey]: !isPlaying
                    }))}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full transition-all duration-300" 
                        style={{ width: isPlaying ? '45%' : '0%' }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{isPlaying ? '01:23' : '00:00'}</span>
                      <span>{duration || '03:45'}</span>
                    </div>
                  </div>
                  
                  <Volume2 className="h-4 w-4 text-gray-400 flex-shrink-0" />
                </div>
              </div>
            </div>
          );
        
        case 'video':
          return (
            <div className="my-8">
              {title && <h4 className="font-semibold text-gray-900 mb-3 text-lg">{title}</h4>}
              {description && (
                <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
              )}
              <div className="bg-black rounded-lg aspect-video flex items-center justify-center">
                {url ? (
                  <video controls className="w-full h-full rounded-lg">
                    <source src={url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="text-center text-white">
                    <Play className="h-12 w-12 mx-auto mb-2 opacity-70" />
                    <p className="text-sm opacity-70">Video player</p>
                  </div>
                )}
              </div>
            </div>
          );
        
        case 'embedded':
          return (
            <div className="my-8">
              {title && <h4 className="font-semibold text-gray-900 mb-3 text-lg">{title}</h4>}
              {description && (
                <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
              )}
              <div className="rounded-lg border overflow-hidden">
                {embedCode || url ? (
                  <div 
                    className="w-full min-h-[300px] rounded-lg"
                    dangerouslySetInnerHTML={{ __html: embedCode || `<iframe src="${url}" width="100%" height="300" frameborder="0"></iframe>` }}
                  />
                ) : (
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-2"></div>
                      <p className="text-sm">Embedded content placeholder</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        
        case 'attachment':
          return (
            <div className="my-6 space-y-3">
              {title && <h4 className="font-semibold text-gray-900 text-lg">{title}</h4>}
              {description && (
                <p className="text-gray-600 leading-relaxed">{description}</p>
              )}
              {fileType?.includes('pdf') ? (
                <div className="rounded border overflow-hidden">
                  <iframe
                    src={url}
                    title={fileName || 'PDF preview'}
                    className="w-full h-[480px]"
                  />
                </div>
              ) : null}
              <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Download className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{fileName || title || 'Attachment'}</p>
                    {fileSize && (
                      <p className="text-xs text-gray-500">{fileSize}</p>
                    )}
                  </div>
                </div>
                <a href={url} download={fileName || true}>
                <Button size="sm" variant="outline">
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
                </a>
              </div>
            </div>
          );
        
        case 'image':
          return (
            <div className="my-8">
              {title && <h4 className="font-semibold text-gray-900 mb-3 text-lg">{title}</h4>}
              {description && (
                <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
              )}
              <div className="rounded-lg overflow-hidden">
                {url ? (
                  <img 
                    src={url} 
                    alt={alt || 'Content image'} 
                    className="w-full h-auto object-cover"
                  />
                ) : (
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-2"></div>
                      <p className="text-sm">Image placeholder</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        
        case 'document':
          return (
            <div className="my-6">
              {title && <h4 className="font-semibold text-gray-900 mb-3 text-lg">{title}</h4>}
              {description && (
                <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
              )}
              <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Download className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{title || 'Document.pdf'}</p>
                    {fileSize && (
                      <p className="text-xs text-gray-500">{fileSize}</p>
                    )}
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          );
        
        default:
          return (
            <div className="my-8 text-center text-gray-600">
              <p className="font-medium">{multimediaType}</p>
              <p className="text-sm">Multimedia content preview</p>
            </div>
          );
      }
    }

    // Text blocks
    if (type.startsWith('text')) {
      const { textType, text, heading, subheading, tableData, backgroundVideoUrl, backgroundVideoLoop, backgroundVideoMuted, backgroundOverlay } = content;
      const ttsKey = `tts-${index}`;
      const tx = translatedByBlock[index];
      const displayHeading = autoTranslate && tx?.heading ? tx.heading : heading;
      const displaySubheading = autoTranslate && tx?.subheading ? tx.subheading : subheading;
      const displayText = autoTranslate && tx?.text ? tx.text : text;
      const ttsText = [displayHeading, displaySubheading, displayText].filter(Boolean).join('. ');
      
      switch (textType) {
        case 'paragraph':
          return (
            <div className="my-6 space-y-3">
              <div className="flex items-center justify-end">
                <Button size="sm" variant="outline" className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100" onClick={() => handleSpeakToggle(ttsKey, ttsText)}>
                  {speakingBlocks[ttsKey] ? <Pause className="h-3 w-3 mr-2" /> : <Play className="h-3 w-3 mr-2" />}
                  {speakingBlocks[ttsKey] ? uiText.stop : uiText.listen}
                </Button>
              </div>
              {backgroundVideoUrl ? (
                <div className="relative rounded-lg overflow-hidden min-h-[320px] md:min-h-[420px]">
                  <video
                    src={backgroundVideoUrl}
                    autoPlay
                    muted={backgroundVideoMuted !== false}
                    loop={backgroundVideoLoop !== false}
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {backgroundOverlay !== false && <div className="absolute inset-0 bg-black/40" />}
                  <div className="relative p-6">
                    <p className="text-white leading-relaxed text-base">{displayText || 'Sample paragraph text goes here.'}</p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 leading-relaxed text-base">{displayText || 'Sample paragraph text goes here.'}</p>
              )}
            </div>
          );
        case 'heading-paragraph':
          return (
            <div className="my-8 space-y-3">
              <div className="flex items-center justify-end">
                <Button size="sm" variant="outline" className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100" onClick={() => handleSpeakToggle(ttsKey, ttsText)}>
                  {speakingBlocks[ttsKey] ? <Pause className="h-3 w-3 mr-2" /> : <Play className="h-3 w-3 mr-2" />}
                  {speakingBlocks[ttsKey] ? uiText.stop : uiText.listen}
                </Button>
              </div>
              {backgroundVideoUrl ? (
                <div className="relative rounded-lg overflow-hidden min-h-[320px] md:min-h-[420px]">
                  <video
                    src={backgroundVideoUrl}
                    autoPlay
                    muted={backgroundVideoMuted !== false}
                    loop={backgroundVideoLoop !== false}
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {backgroundOverlay !== false && <div className="absolute inset-0 bg-black/40" />}
                  <div className="relative p-6">
                    <h2 className="text-2xl font-bold mb-4 text-white">{displayHeading || 'Main Heading'}</h2>
                    <p className="text-white leading-relaxed text-base">{displayText || 'Content for this section goes here.'}</p>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">{displayHeading || 'Main Heading'}</h2>
                  <p className="text-gray-700 leading-relaxed text-base">{displayText || 'Content for this section goes here.'}</p>
                </>
              )}
            </div>
          );
        case 'subheading-paragraph':
          return (
            <div className="my-6 space-y-3">
              <div className="flex items-center justify-end">
                <Button size="sm" variant="outline" className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100" onClick={() => handleSpeakToggle(ttsKey, ttsText)}>
                  {speakingBlocks[ttsKey] ? <Pause className="h-3 w-3 mr-2" /> : <Play className="h-3 w-3 mr-2" />}
                  {speakingBlocks[ttsKey] ? uiText.stop : uiText.listen}
                </Button>
              </div>
              {backgroundVideoUrl ? (
                <div className="relative rounded-lg overflow-hidden min-h-[320px] md:min-h-[420px]">
                  <video
                    src={backgroundVideoUrl}
                    autoPlay
                    muted={backgroundVideoMuted !== false}
                    loop={backgroundVideoLoop !== false}
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {backgroundOverlay !== false && <div className="absolute inset-0 bg-black/40" />}
                  <div className="relative p-6">
                    <h3 className="text-xl font-semibold mb-3 text-white">{displaySubheading || 'Subheading'}</h3>
                    <p className="text-white leading-relaxed text-base">{displayText || 'Content for this section goes here.'}</p>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{displaySubheading || 'Subheading'}</h3>
                  <p className="text-gray-700 leading-relaxed text-base">{displayText || 'Content for this section goes here.'}</p>
                </>
              )}
            </div>
          );
        case 'table':
          if (!tableData?.headers || !tableData?.rows) {
            return <div className="my-6 text-gray-500 text-center">Sample table would appear here</div>;
          }
          return (
            <div className="my-8 overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    {tableData.headers.map((header, i) => (
                      <th key={i} className="border border-gray-300 px-4 py-2 text-left font-medium">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="border border-gray-300 px-4 py-2">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        default:
          return <div className="my-6 text-gray-500">Text content preview</div>;
      }
    }

    // List blocks
    if (type.startsWith('list')) {
      const { listType, items } = content;
      
      if (!items || items.length === 0) {
        return <div className="my-6 text-gray-500">No list items</div>;
      }

      switch (listType) {
        case 'bullet':
          return (
            <div className="my-6">
              <ul className="space-y-3">
                {items.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        case 'numbered':
          return (
            <div className="my-6">
              <ol className="space-y-3">
                {items.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="bg-blue-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 font-medium">
                      {i + 1}
                    </span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          );
        case 'checklist':
          return (
            <div className="my-6">
              <ul className="space-y-3">
                {items.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-5 h-5 border-2 border-green-500 rounded mr-3 mt-0.5 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        default:
          return <div className="my-6 text-gray-500">List content preview</div>;
      }
    }

    // Quote blocks
    if (type.startsWith('quote')) {
      const { quoteType, text, author, source } = content;
      
      switch (quoteType) {
        case 'simple':
          return (
            <div className="my-8">
              <blockquote className="border-l-4 border-blue-500 pl-6 py-2">
                <p className="text-lg italic text-gray-700 leading-relaxed">
                  "{text || 'Sample quote text goes here.'}"
                </p>
                {author && (
                  <footer className="mt-3 text-sm text-gray-600">
                    — {author}
                    {source && <span>, {source}</span>}
                  </footer>
                )}
              </blockquote>
            </div>
          );
        case 'highlighted':
          return (
            <div className="my-8">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <p className="text-lg text-blue-900 leading-relaxed font-medium">
                  "{text || 'Sample highlighted quote text goes here.'}"
                </p>
                {author && (
                  <footer className="mt-4 text-sm text-blue-700">
                    — {author}
                    {source && <span>, {source}</span>}
                  </footer>
                )}
              </div>
            </div>
          );
        default:
          return <div className="my-6 text-gray-500">Quote content preview</div>;
      }
    }

    // Callout blocks
    if (type.startsWith('callout')) {
      const { calloutType, title, text } = content;
      
      const calloutStyles = {
        info: 'bg-blue-50 border-blue-200 text-blue-900',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
        success: 'bg-green-50 border-green-200 text-green-900',
        error: 'bg-red-50 border-red-200 text-red-900'
      };
      
      const style = calloutStyles[calloutType] || calloutStyles.info;
      
      return (
        <div className="my-8">
          <div className={`border-l-4 p-6 rounded-r-lg ${style}`}>
            {title && (
              <h4 className="font-semibold text-lg mb-2">{title}</h4>
            )}
            <p className="leading-relaxed">
              {text || 'Sample callout text goes here.'}
            </p>
          </div>
        </div>
      );
    }

    // Default fallback
    return (
      <div className="my-6 text-gray-500 text-center">
        <p>Content block preview</p>
      </div>
    );
  };

  if (!previewData) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Preview</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500">No content to preview</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="pb-4 border-b">
          <div className="flex items-center justify-between gap-3">
            <DialogTitle className="text-xl font-bold flex items-center gap-3 min-w-0">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm">👁️</span>
              <span className="truncate">{previewData.title || previewData.settings?.title || uiText.preview}</span>
            </DialogTitle>
            <div className="flex items-center gap-2 flex-wrap bg-gray-50 border rounded-lg px-3 py-2">
              <label className="text-xs text-gray-600" title={uiText.language}>
                {uiText.language}
              </label>
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="border rounded px-2 py-1 text-sm h-8"
                title={uiText.language}
              >
                {languageOptions.map(opt => (
                  <option key={opt.code} value={opt.code}>{opt.label}</option>
                ))}
              </select>
              <label className="text-xs text-gray-600" title="Auto-translate preview to selected language">
                Auto-translate
              </label>
              <input
                type="checkbox"
                className="h-4 w-4 accent-blue-600"
                checked={autoTranslate}
                onChange={(e) => setAutoTranslate(e.target.checked)}
              />
              <label className="text-xs text-gray-600">
                {uiText.voice}
              </label>
              <select
                value={selectedVoiceURI}
                onChange={(e) => setSelectedVoiceURI(e.target.value)}
                className="border rounded px-2 py-1 text-sm h-8 max-w-[260px]"
                title={uiText.voice}
              >
                <option value="__trainer__">Trainer (uploaded)</option>
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
              {selectedVoiceURI === '__trainer__' && (
                <>
                  <input
                    id="trainer-audio-input"
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) setTrainerAudioUrl(URL.createObjectURL(f));
                    }}
                  />
                  <Button variant="outline" size="sm" className="h-8" onClick={() => document.getElementById('trainer-audio-input')?.click()}>
                    {trainerAudioUrl ? 'Replace Audio' : 'Upload Audio'}
                  </Button>
                </>
              )}
              <Button variant="outline" size="sm" className="h-8" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 max-h-[calc(90vh-120px)]">
          <div className="py-8 px-2">
            <article className="prose prose-lg max-w-none">
              {previewData.blocks && previewData.blocks.length > 0 ? (
                previewData.blocks.map((block, index) => (
                  <div key={block.id || index}>
                    {renderBlockContent(block, index)}
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-lg">No content blocks added yet.</p>
                  <p className="text-sm mt-2">Add some content blocks to see the preview.</p>
                </div>
              )}
              {autoTranslate && (
                <div className="text-right text-xs text-gray-500 mt-4">
                  {translateStatus === 'loading' && 'Translating…'}
                  {translateStatus === 'error' && 'Translation unavailable; showing original text.'}
                </div>
              )}
            </article>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export { PreviewModal };