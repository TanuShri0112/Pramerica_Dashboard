import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Settings, BookOpen, X } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const ImmersiveReader = ({ content, isOpen, onClose, title = "Immersive Reader" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [theme, setTheme] = useState('light');
  const [showSettings, setShowSettings] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedLang, setSelectedLang] = useState(typeof navigator !== 'undefined' ? (navigator.language || 'en-US') : 'en-US');
  const [selectedVoiceURI, setSelectedVoiceURI] = useState('');
  const [translatedContent, setTranslatedContent] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [showOriginal, setShowOriginal] = useState(true);
  
  const speechSynthRef = useRef(null);
  const intervalRef = useRef(null);
  // Load available voices (browser dependent)
  useEffect(() => {
    const updateVoices = () => {
      const list = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
      setVoices(list);
      // Pick a default voice for the selected language
      const defaultVoice = list.find(v => v.lang?.toLowerCase() === selectedLang?.toLowerCase());
      if (defaultVoice && !selectedVoiceURI) {
        setSelectedVoiceURI(defaultVoice.voiceURI);
      }
    };
    updateVoices();
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [selectedLang, selectedVoiceURI]);

  // Auto-select a matching voice whenever language changes
  useEffect(() => {
    if (!voices.length || !selectedLang) return;
    const match = voices.find(v => v.lang?.toLowerCase() === selectedLang.toLowerCase());
    if (match && match.voiceURI !== selectedVoiceURI) {
      setSelectedVoiceURI(match.voiceURI);
    }
  }, [selectedLang, voices]);

  
  // Choose source text and tokenize preserving whitespace/newlines
  const chosenContent = showOriginal || !translatedContent ? content : translatedContent;
  const rawTokens = chosenContent ? chosenContent.split(/(\s+)/) : [];
  const tokens = rawTokens.map(t => ({ text: t, isWord: !/^\s+$/.test(t) && t.length > 0 }));
  const words = tokens.filter(t => t.isWord).map(t => t.text);
  
  useEffect(() => {
    return () => {
      if (speechSynthRef.current) {
        speechSynthesis.cancel();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handlePlay = () => {
    if (isPlaying) {
      handlePause();
      return;
    }

    setIsPlaying(true);
    
    // Create speech synthesis
    const utterance = new SpeechSynthesisUtterance(chosenContent);
    utterance.rate = speed;
    utterance.volume = isMuted ? 0 : volume;
    utterance.pitch = 1;
    utterance.lang = selectedLang || 'en-US';
    const voice = voices.find(v => v.voiceURI === selectedVoiceURI) || voices.find(v => v.lang?.toLowerCase() === selectedLang?.toLowerCase());
    if (voice) utterance.voice = voice;
    
    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentWordIndex(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };

    speechSynthRef.current = utterance;
    speechSynthesis.speak(utterance);

    // Simulate word highlighting synchronization
    const wordsPerMinute = 150 * speed; // Average reading speed adjusted by playback speed
    const millisecondsPerWord = (60 / wordsPerMinute) * 1000;
    
    intervalRef.current = setInterval(() => {
      setCurrentWordIndex((prev) => {
        if (prev >= words.length - 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          return prev;
        }
        return prev + 1;
      });
    }, millisecondsPerWord);
  };

  const handlePause = () => {
    setIsPlaying(false);
    speechSynthesis.cancel();
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleRestart = () => {
    handlePause();
    setCurrentWordIndex(0);
  };

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed[0]);
    if (isPlaying) {
      handlePause();
      setTimeout(() => handlePlay(), 100);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume[0]);
    if (speechSynthRef.current) {
      speechSynthRef.current.volume = isMuted ? 0 : newVolume[0];
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (speechSynthRef.current) {
      speechSynthRef.current.volume = !isMuted ? 0 : volume;
    }
  };

  const renderHighlightedText = () => {
    let wIndex = -1;
    return tokens.map((tok, i) => {
      if (!tok.isWord) {
        return <span key={`ws-${i}`}>{tok.text}</span>;
      }
      wIndex += 1;
      return (
        <span
          key={`w-${i}`}
          className={`${wIndex === currentWordIndex ? 'bg-blue-200 text-blue-900 font-semibold' : ''} ${wIndex < currentWordIndex ? 'text-gray-500' : ''} transition-all duration-200`}
        >
          {tok.text}
        </span>
      );
    });
  };

  const themes = {
    light: 'bg-white text-gray-900',
    dark: 'bg-gray-900 text-white',
    sepia: 'bg-yellow-50 text-yellow-900'
  };

  const uniqueLangs = Array.from(new Set(voices.map(v => v.lang))).filter(Boolean).sort();
  const fallbackLangs = [
    'en-US','en-GB','es-ES','fr-FR','de-DE','pt-BR','ru-RU','ar-SA','zh-CN','ja-JP',
    // India
    'hi-IN','bn-IN','ta-IN','te-IN','mr-IN','gu-IN','kn-IN','ml-IN','pa-IN','ur-IN',
    'or-IN','as-IN','sa-IN','sd-IN','ks-IN','ne-IN'
  ];
  const languageOptions = uniqueLangs.length ? uniqueLangs : fallbackLangs;

  const langLabel = (lang) => {
    const labels = {
      'en-US': 'English (United States)', 'en-GB': 'English (United Kingdom)',
      'es-ES': 'Spanish (Spain)', 'fr-FR': 'French (France)', 'de-DE': 'German (Germany)',
      'pt-BR': 'Portuguese (Brazil)', 'ru-RU': 'Russian',
      'hi-IN': 'Hindi (India)', 'bn-IN': 'Bengali (India)', 'ta-IN': 'Tamil (India)', 'te-IN': 'Telugu (India)',
      'mr-IN': 'Marathi (India)', 'gu-IN': 'Gujarati (India)', 'kn-IN': 'Kannada (India)', 'ml-IN': 'Malayalam (India)',
      'pa-IN': 'Punjabi (India)', 'ur-IN': 'Urdu (India)', 'or-IN': 'Odia (India)', 'as-IN': 'Assamese (India)',
      'sa-IN': 'Sanskrit (India)', 'sd-IN': 'Sindhi (India)', 'ks-IN': 'Kashmiri (India)', 'ne-IN': 'Nepali (India)',
      'ar-SA': 'Arabic (Saudi Arabia)', 'zh-CN': 'Chinese (Simplified)', 'ja-JP': 'Japanese'
    };
    return labels[lang] || lang;
  };

  // Map BCP-47 -> LibreTranslate ISO codes
  const ltCode = (lang) => {
    const map = {
      'en-US': 'en', 'en-GB': 'en', 'es-ES': 'es', 'fr-FR': 'fr', 'de-DE': 'de', 'pt-BR': 'pt', 'ru-RU': 'ru',
      'hi-IN': 'hi', 'bn-IN': 'bn', 'ta-IN': 'ta', 'te-IN': 'te', 'mr-IN': 'mr', 'gu-IN': 'gu', 'kn-IN': 'kn', 'ml-IN': 'ml', 'pa-IN': 'pa', 'ur-IN': 'ur',
      'or-IN': 'or', 'as-IN': 'as', 'sa-IN': 'sa', 'sd-IN': 'sd', 'ks-IN': 'ks', 'ne-IN': 'ne',
      'ar-SA': 'ar', 'zh-CN': 'zh', 'ja-JP': 'ja'
    };
    return map[lang] || (lang?.split('-')[0] || 'en');
  };

  const translateText = async (text, targetLang) => {
    const target = ltCode(targetLang);
    const payload = { q: text, source: 'auto', target };
    const opts = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) };
    const endpoints = ['https://libretranslate.de/translate', 'https://translate.astian.org/translate'];
    for (const url of endpoints) {
      try {
        const res = await fetch(url, opts);
        if (!res.ok) continue;
        const data = await res.json();
        if (data?.translatedText) return data.translatedText;
      } catch (_) { /* try next */ }
    }
    throw new Error('Translation failed');
  };

  // Auto-translate when language changes (except English-to-English)
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (!content || !selectedLang) return;
      // If still English target and browser locale English, keep original
      if (ltCode(selectedLang) === ltCode('en-US')) { setTranslatedContent(''); setShowOriginal(true); return; }
      setIsTranslating(true);
      try {
        const t = await translateText(content, selectedLang);
        if (!cancelled) { setTranslatedContent(t); setShowOriginal(false); }
      } catch (_) {
        if (!cancelled) { setTranslatedContent(''); setShowOriginal(true); }
      } finally {
        if (!cancelled) setIsTranslating(false);
      }
    };
    run();
    return () => { cancelled = true; };
  }, [content, selectedLang]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-full max-h-[95vh] overflow-auto rounded-3xl border-0 bg-white shadow-2xl">
        <DialogHeader className="pb-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-3 text-2xl font-semibold text-gray-800">
              <div className="p-2 bg-blue-50 rounded-xl">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              {title}
            </DialogTitle>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                className="border-gray-200 hover:bg-gray-50 text-gray-700"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowOriginal(!showOriginal)}
                className="border-gray-200 hover:bg-gray-50 text-gray-700"
              >
                {showOriginal ? 'Show Translated' : 'Show Original'}
              </Button>
            </div>
          </div>
        </DialogHeader>

        {showSettings && (
          <Card className="mb-4">
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Reading Speed</label>
                  <Slider
                    value={[speed]}
                    onValueChange={handleSpeedChange}
                    min={0.5}
                    max={2}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 mt-1">{speed}x</div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Font Size</label>
                  <Slider
                    value={[fontSize]}
                    onValueChange={(value) => setFontSize(value[0])}
                    min={12}
                    max={24}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 mt-1">{fontSize}px</div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Line Height</label>
                  <Slider
                    value={[lineHeight]}
                    onValueChange={(value) => setLineHeight(value[0])}
                    min={1.2}
                    max={2.4}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 mt-1">{lineHeight}</div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Language</label>
                  <Select value={selectedLang} onValueChange={setSelectedLang}>
                    <SelectTrigger className="max-w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 overflow-y-auto">
                      {languageOptions.map((lang) => (
                        <SelectItem key={lang} value={lang}>{langLabel(lang)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Voice</label>
                  <Select value={selectedVoiceURI} onValueChange={setSelectedVoiceURI}>
                    <SelectTrigger className="max-w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 overflow-y-auto">
                      {(voices.filter(v => !selectedLang || v.lang?.toLowerCase() === selectedLang.toLowerCase()).length ?
                        voices.filter(v => !selectedLang || v.lang?.toLowerCase() === selectedLang.toLowerCase()) : voices
                      ).map((v) => (
                        <SelectItem key={v.voiceURI} value={v.voiceURI}>{v.name} ({langLabel(v.lang)})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={theme === 'light' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('light')}
                >
                  Light
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('dark')}
                >
                  Dark
                </Button>
                <Button
                  variant={theme === 'sepia' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('sepia')}
                >
                  Sepia
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex items-center gap-2 py-2 border-b bg-gray-50/60 px-3 rounded-md mt-3">
          <Button
            onClick={isPlaying ? handlePause : handlePlay}
            className="flex items-center gap-2"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          
          <Button variant="outline" onClick={handleRestart}>
            <RotateCcw className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-2 ml-4">
            <Button variant="ghost" size="sm" onClick={toggleMute}>
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Slider
              value={[volume]}
              onValueChange={handleVolumeChange}
              min={0}
              max={1}
              step={0.1}
              className="w-20"
            />
          </div>

          <div className="ml-auto flex items-center gap-3 w-2/5 min-w-[180px]">
            {isTranslating && <Badge variant="outline">Translating…</Badge>}
            <div className="w-full h-2 rounded bg-gray-200 overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all"
                style={{ width: `${words.length ? Math.round((currentWordIndex / words.length) * 100) : 0}%` }}
              />
            </div>
            <Badge variant="outline">
              {words.length ? Math.round((currentWordIndex / words.length) * 100) : 0}%
            </Badge>
          </div>
        </div>

        <div 
          className={`
            overflow-y-auto p-8 transition-colors duration-300
            ${themes[theme]}
          `}
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: lineHeight,
            maxHeight: 'calc(65vh - 200px)',
            whiteSpace: 'pre-wrap'
          }}
        >
          <div className="max-w-none prose prose-lg" style={{ whiteSpace: 'inherit' }}>
            {renderHighlightedText()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};