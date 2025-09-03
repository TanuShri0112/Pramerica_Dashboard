import React from 'react';
import { Button } from '@/components/ui/button';

export const ImagePreview = ({ content, onEdit, onDelete, showActions = true }) => {
  const { imageType, url, alt, caption, text, overlayText } = content;

  const renderImageContent = () => {
    switch (imageType) {
      case 'centered':
        return (
          <div className="text-center space-y-3">
            <img 
              src={url} 
              alt={alt || 'Centered image'} 
              className="max-w-full h-64 object-cover rounded-lg mx-auto shadow-sm"
              onError={(e) => {
                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23f3f4f6'/%3E%3Ctext x='200' y='100' text-anchor='middle' dy='0.3em' font-family='sans-serif' font-size='16' fill='%23374151'%3EImage not found%3C/text%3E%3C/svg%3E";
              }}
            />
            {caption && (
              <p className="text-gray-600 text-sm italic max-w-2xl mx-auto">
                {caption}
              </p>
            )}
          </div>
        );

      case 'image-text':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div>
              <img 
                src={url} 
                alt={alt || 'Image with text'} 
                className="w-full h-48 object-cover rounded-lg shadow-sm"
                onError={(e) => {
                  e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f3f4f6'/%3E%3Ctext x='150' y='100' text-anchor='middle' dy='0.3em' font-family='sans-serif' font-size='14' fill='%23374151'%3EImage not found%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
            <div className="space-y-3">
              <div className="prose prose-sm">
                {text?.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        );

      case 'text-on-image':
        return (
          <div className="relative">
            <img 
              src={url} 
              alt={alt || 'Background image'} 
              className="w-full h-64 object-cover rounded-lg shadow-sm"
              onError={(e) => {
                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300' viewBox='0 0 600 300'%3E%3Crect width='600' height='300' fill='%23f3f4f6'/%3E%3Ctext x='300' y='150' text-anchor='middle' dy='0.3em' font-family='sans-serif' font-size='18' fill='%23374151'%3EBackground Image%3C/text%3E%3C/svg%3E";
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
              <div className="text-center px-6">
                {overlayText?.split('\n').map((line, index) => (
                  <p key={index} className="text-white text-lg font-semibold leading-relaxed drop-shadow-lg">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center">
            <img 
              src={url} 
              alt={alt || 'Image'} 
              className="max-w-full h-64 object-cover rounded-lg mx-auto shadow-sm"
              onError={(e) => {
                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23f3f4f6'/%3E%3Ctext x='200' y='100' text-anchor='middle' dy='0.3em' font-family='sans-serif' font-size='16' fill='%23374151'%3EImage not found%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {renderImageContent()}
      
      {showActions && (onEdit || onDelete) && (
        <div className="flex justify-center gap-2">
          {onEdit && (
            <Button variant="outline" size="sm" onClick={onEdit}>
              Edit
            </Button>
          )}
          {onDelete && (
            <Button variant="outline" size="sm" onClick={onDelete}>
              Delete
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ImagePreview;