import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export const LabeledGraphicPreview = ({ backgroundImage, hotspots }) => {
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  const defaultImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23f3f4f6'/%3E%3Ctext x='400' y='200' text-anchor='middle' dy='0.3em' font-family='sans-serif' font-size='24' fill='%23374151'%3EPlaceholder Image%3C/text%3E%3C/svg%3E";
  const imageUrl = backgroundImage || defaultImage;

  if (!hotspots || hotspots.length === 0) {
    return (
      <div className="relative">
        <img 
          src={imageUrl} 
          alt="Labeled graphic" 
          className="w-full h-64 object-cover rounded-lg"
          onError={(e) => {
            e.currentTarget.src = defaultImage;
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
          <p className="text-white text-center">No hotspots configured</p>
        </div>
      </div>
    );
  }

  const selectedHotspotData = hotspots.find(h => h.id === selectedHotspot);

  return (
    <div className="space-y-4">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt="Labeled graphic" 
          className="w-full h-64 object-cover rounded-lg"
          onError={(e) => {
            e.currentTarget.src = defaultImage;
          }}
        />
        
        {/* Hotspots */}
        {hotspots.map((hotspot) => (
          <button
            key={hotspot.id}
            onClick={() => setSelectedHotspot(hotspot.id === selectedHotspot ? null : hotspot.id)}
            className="absolute w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-all duration-300 hover:scale-110 transform hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-50"
            style={{
              left: `${hotspot.x}%`,
              top: `${hotspot.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            title={hotspot.label}
          >
            <Plus className="w-5 h-5" />
            <div className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-75"></div>
          </button>
        ))}

        {/* Overlay for selected hotspot */}
        {selectedHotspot && selectedHotspotData && (
          <div
            className="absolute bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-xs z-10"
            style={{
              left: `${selectedHotspotData.x}%`,
              top: `${selectedHotspotData.y}%`,
              transform: 'translate(-50%, calc(-100% - 20px))',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <h3 className="font-semibold text-orange-900 mb-2">
                {selectedHotspotData.label}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {selectedHotspotData.description}
              </p>
              {/* Arrow pointing down to hotspot */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
              </div>
            </div>
          </div>
        )}

        {/* Click outside to close overlay */}
        {selectedHotspot && (
          <div
            className="fixed inset-0 z-5"
            onClick={() => setSelectedHotspot(null)}
          />
        )}
      </div>
    </div>
  );
};

export default LabeledGraphicPreview;