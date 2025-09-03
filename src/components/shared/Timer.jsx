import React, { useState, useEffect, useRef } from 'react';
import { Clock } from 'lucide-react';

const Timer = ({ 
  isRunning, 
  timeLimitMinutes, 
  onTimeUpdate, 
  onTimeUp, 
  onComplete, 
  className = '' 
}) => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const timeLimitSeconds = timeLimitMinutes ? timeLimitMinutes * 60 : null;

  useEffect(() => {
    if (isRunning && !intervalRef.current) {
      startTimeRef.current = Date.now();
      intervalRef.current = setInterval(() => {
        const currentTime = Date.now();
        const elapsed = Math.floor((currentTime - (startTimeRef.current || currentTime)) / 1000);
        setTimeElapsed(elapsed);
        
        const remaining = timeLimitSeconds ? timeLimitSeconds - elapsed : 0;
        onTimeUpdate?.(elapsed, remaining);

        // Auto-submit when time runs out
        if (timeLimitSeconds && elapsed >= timeLimitSeconds) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          onTimeUp?.();
        }
      }, 1000);
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      if (timeElapsed > 0) {
        onComplete?.(timeElapsed);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, onTimeUpdate, onComplete, onTimeUp, timeElapsed, timeLimitSeconds]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDisplayTime = () => {
    if (timeLimitSeconds) {
      const remaining = Math.max(0, timeLimitSeconds - timeElapsed);
      return formatTime(remaining);
    }
    return formatTime(timeElapsed);
  };

  const getTimerColor = () => {
    if (!timeLimitSeconds) return 'text-gray-600';
    
    const remaining = timeLimitSeconds - timeElapsed;
    const percentage = remaining / timeLimitSeconds;
    
    if (percentage <= 0.1) return 'text-red-600';
    if (percentage <= 0.25) return 'text-orange-600';
    return 'text-gray-600';
  };

  return (
    <div className={`flex items-center gap-2 ${getTimerColor()} ${className}`}>
      <Clock className="h-4 w-4" />
      <span className="font-mono text-lg font-semibold">{getDisplayTime()}</span>
      {timeLimitSeconds && (
        <span className="text-sm text-gray-500">
          / {formatTime(timeLimitSeconds)}
        </span>
      )}
    </div>
  );
};

export default Timer;