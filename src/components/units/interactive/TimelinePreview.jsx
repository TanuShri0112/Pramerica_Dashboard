import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const TimelinePreview = ({ timelineEvents }) => {
  if (!timelineEvents || timelineEvents.length === 0) {
    return (
      <div className="p-4 border rounded-lg bg-gray-50">
        <p className="text-gray-500">No timeline events configured</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-200"></div>
      
      <div className="space-y-6">
        {timelineEvents.map((event, index) => (
          <div key={index} className="relative flex items-start space-x-6">
            {/* Timeline dot */}
            <div className="relative">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm z-10 relative">
                {index + 1}
              </div>
            </div>
            
            {/* Event content */}
            <Card className="flex-1">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-blue-600 mb-1">
                      {event.date || 'Date not set'}
                    </div>
                    <h4 className="font-semibold mb-2">
                      {event.title || `Event ${index + 1}`}
                    </h4>
                    <p className="text-gray-700 text-sm mb-3">
                      {event.description || 'No description set'}
                    </p>
                    
                    {/* Audio player */}
                    {event.audioUrl && (
                      <div className="mb-3">
                        <audio controls className="w-full max-w-sm">
                          <source src={event.audioUrl} type="audio/wav" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    )}
                  </div>
                  
                  {/* Event image */}
                  {event.image && (
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelinePreview;