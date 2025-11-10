import { useCallback, useEffect, useRef, useState } from 'react';

export function useTextToSpeech() {
  const synthRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null);
  const utteranceRef = useRef(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported] = useState(Boolean(synthRef.current));

  const cancel = useCallback(() => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    setIsSpeaking(false);
  }, []);

  const speak = useCallback(
    (text) => {
      if (!synthRef.current || !text) return;
      cancel();

      utteranceRef.current = new SpeechSynthesisUtterance(text);
      utteranceRef.current.onend = () => setIsSpeaking(false);
      utteranceRef.current.onerror = () => setIsSpeaking(false);

      synthRef.current.speak(utteranceRef.current);
      setIsSpeaking(true);
    },
    [cancel]
  );

  useEffect(() => cancel, [cancel]);

  return { speak, cancel, isSpeaking, isSupported };
}

