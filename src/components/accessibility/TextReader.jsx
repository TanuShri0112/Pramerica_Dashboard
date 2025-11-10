import React from 'react';
import { Volume2, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';

const TextReader = ({ text, label = 'Read content aloud', className = '' }) => {
  const { speak, cancel, isSpeaking, isSupported } = useTextToSpeech();

  if (!isSupported) {
    return null;
  }

  const handleToggle = () => {
    if (isSpeaking) {
      cancel();
    } else {
      speak(text);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm font-medium text-emerald-700">Listen</span>
      <Button
        type="button"
        variant="outline"
        size="sm"
        aria-label={isSpeaking ? 'Stop reading' : label}
        onClick={handleToggle}
        className={`border-emerald-300 text-emerald-700 hover:bg-emerald-50 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${
          isSpeaking ? 'bg-emerald-600 text-white hover:bg-emerald-600' : ''
        }`}
      >
        {isSpeaking ? <Square className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </Button>
      <span className="text-xs text-gray-500" aria-live="polite">
        {isSpeaking ? 'Reading...' : ''}
      </span>
    </div>
  );
};

export default TextReader;

