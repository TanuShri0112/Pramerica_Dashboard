import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, Languages, ChevronDown, ChevronUp } from 'lucide-react';

const VoiceInteraction = () => {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [response, setResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const recognitionRef = useRef(null);
  const synthesisRef = useRef(null);

  // Language options
  const languageOptions = [
    { code: 'en-US', label: 'English', flag: '🇺🇸' },
    { code: 'hi-IN', label: 'हिन्दी', flag: '🇮🇳' },
    { code: 'mr-IN', label: 'मराठी', flag: '🇮🇳' }
  ];

  // Response mappings for different languages
  const responseMap = {
    'en-US': {
      'flexibility': 'Flexibility means choosing your policy terms, premium payment options, and modes that fit your goals.',
      'benefits': 'Benefits include life cover, guaranteed income, savings booster, and tax savings.',
      'assurance': 'Assurance provides guaranteed returns and financial security for your family\'s future.',
      'default': 'Sorry, I can only answer about Flexibility, Benefits, or Assurance right now.'
    },
    'hi-IN': {
      'flexibility': 'लचीलापन का मतलब है अपनी पॉलिसी की शर्तें, प्रीमियम भुगतान विकल्प और अपने लक्ष्यों के अनुरूप मोड चुनना।',
      'benefits': 'लाभों में जीवन कव्हर, हमी दिलेली उत्पन्न, बचत बूस्टर आणि कर बचत समाविष्ट आहेत.',
      'assurance': 'आश्वासन आपके परिवार के भविष्य के लिए गारंटीड रिटर्न और वित्तीय सुरक्षा प्रदान करता है।',
      'default': 'क्षमा करें, मैं केवल लचीलापन, लाभ या आश्वासन के बारे में जवाब दे सकता हूं।'
    },
    'mr-IN': {
      'flexibility': 'लवचिकता म्हणजे तुमच्या ध्येयांना अनुरूप पॉलिसीच्या अटी, प्रीमियम पेमेंट पर्याय आणि मोड निवडणे.',
      'benefits': 'लाभांमध्ये जीवन कव्हर, हमी दिलेली उत्पन्न, बचत बूस्टर आणि कर बचत समाविष्ट आहेत.',
      'assurance': 'आश्वासन तुमच्या कुटुंबाच्या भविष्यासाठी हमी दिलेले परतावे आणि आर्थिक सुरक्षा प्रदान करते.',
      'default': 'माफ करा, मी फक्त लवचिकता, लाभ किंवा आश्वासनाबद्दल उत्तर देऊ शकतो.'
    }
  };

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = selectedLanguage;
      
      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setIsProcessing(true);
      };
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setRecognizedText(transcript);
        processVoiceCommand(transcript);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setIsProcessing(false);
        setResponse('Sorry, there was an error with voice recognition.');
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
        setIsProcessing(false);
      };
    }

    // Initialize speech synthesis
    synthesisRef.current = window.speechSynthesis;
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthesisRef.current) {
        synthesisRef.current.cancel();
      }
    };
  }, [selectedLanguage]);

  const processVoiceCommand = (transcript) => {
    let responseText = '';
    
    if (transcript.includes('flexibility') || transcript.includes('लचीलापन') || transcript.includes('लवचिकता')) {
      responseText = responseMap[selectedLanguage]['flexibility'];
    } else if (transcript.includes('benefits') || transcript.includes('लाभ') || transcript.includes('लाभां')) {
      responseText = responseMap[selectedLanguage]['benefits'];
    } else if (transcript.includes('assurance') || transcript.includes('आश्वासन')) {
      responseText = responseMap[selectedLanguage]['assurance'];
    } else {
      responseText = responseMap[selectedLanguage]['default'];
    }
    
    setResponse(responseText);
    speakResponse(responseText);
  };

  const speakResponse = (text) => {
    if (synthesisRef.current) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage;
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      synthesisRef.current.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setRecognizedText('');
      setResponse('');
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setSelectedLanguage(newLanguage);
    if (recognitionRef.current) {
      recognitionRef.current.lang = newLanguage;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-xl shadow-md p-6">
        {/* Compact Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Voice Assistant</h2>
            <p className="text-sm text-gray-600">Ask about policy features</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-gray-700"
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </Button>
        </div>

        {/* Language Selection */}
        <div className="flex items-center mb-4">
          <Languages className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-xs text-gray-600 mr-2">Language:</span>
          <div className="flex gap-1">
            {languageOptions.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`px-2 py-1 rounded-md text-xs transition-all ${
                  selectedLanguage === lang.code
                    ? 'bg-indigo-100 text-indigo-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {lang.flag} {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Voice Interaction Area */}
        <div className="space-y-4">
          {/* Microphone Button */}
          <div className="flex justify-center">
            <button
              onClick={isListening ? stopListening : startListening}
              disabled={isProcessing}
              className={`w-16 h-16 rounded-full transition-all duration-200 flex items-center justify-center ${
                isListening
                  ? 'bg-red-500 shadow-inner animate-pulse'
                  : 'bg-indigo-600 hover:bg-indigo-700 shadow-md'
              }`}
            >
              {isListening ? (
                <MicOff className="h-6 w-6 text-white" />
              ) : (
                <Mic className="h-6 w-6 text-white" />
              )}
            </button>
          </div>

          {/* Status Indicators */}
          <div className="text-center">
            {isListening && (
              <p className="text-xs text-red-600 font-medium animate-pulse">Listening...</p>
            )}
            
            {isProcessing && !isListening && (
              <p className="text-xs text-indigo-600 font-medium">Processing...</p>
            )}

            {!isListening && !isProcessing && (
              <p className="text-xs text-gray-500">Try: "Benefits", "Flexibility", or "Assurance"</p>
            )}
          </div>

          {/* Recognized Text Display */}
          {recognizedText && (
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <p className="text-sm text-gray-700">"{recognizedText}"</p>
            </div>
          )}

          {/* Response Display */}
          {response && (
            <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-200">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-medium text-indigo-700">Answer:</span>
                <Button
                  onClick={() => speakResponse(response)}
                  disabled={isSpeaking}
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100"
                >
                  <Volume2 className="h-3 w-3 mr-1" />
                  <span className="text-xs">{isSpeaking ? 'Speaking...' : 'Replay'}</span>
                </Button>
              </div>
              <p className="text-sm text-gray-800">{response}</p>
            </div>
          )}
        </div>

        {/* Expandable Help Section */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="text-xs font-semibold text-gray-700 mb-2">How to use:</h4>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="space-y-1">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-blue-600 text-sm">🎤</span>
                </div>
                <p className="text-xs text-gray-600">Click mic</p>
              </div>
              <div className="space-y-1">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-blue-600 text-sm">💬</span>
                </div>
                <p className="text-xs text-gray-600">Ask question</p>
              </div>
              <div className="space-y-1">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-blue-600 text-sm">🔊</span>
                </div>
                <p className="text-xs text-gray-600">Hear answer</p>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-xs text-gray-500 text-center">
                Try asking about: <span className="font-medium">Benefits</span>,{' '}
                <span className="font-medium">Flexibility</span>, or{' '}
                <span className="font-medium">Assurance</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceInteraction;