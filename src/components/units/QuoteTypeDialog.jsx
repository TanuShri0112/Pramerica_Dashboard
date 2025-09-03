import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Quote, User, Upload, Image } from 'lucide-react';

// Valid quoteType values: 'circular-centerpiece', 'vertical-spotlight', 'side-by-side', 'gray-panel', 'visual-highlight'
const quoteTypes = [
  {
    id: 'circular-centerpiece',
    name: 'Quote A: Circular Centerpiece',
    description: 'Large quotation mark with centered author image',
    icon: <Quote className="h-6 w-6" />,
    preview: (
      <div className="bg-white p-4 rounded border text-center">
        <div className="text-4xl text-gray-400 mb-2">"</div>
        <blockquote className="text-sm text-gray-700 mb-3">
          "This is an inspiring quote with circular centerpiece design."
        </blockquote>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-gray-300 rounded-full mb-2"></div>
          <cite className="text-xs text-gray-600">— Author Name</cite>
        </div>
      </div>
    )
  },
  {
    id: 'vertical-spotlight',
    name: 'Quote B: Vertical Spotlight',
    description: 'Author image at top with caps quote below',
    icon: <User className="h-6 w-6" />,
    preview: (
      <div className="bg-white p-4 rounded border text-center">
        <div className="w-10 h-10 bg-gray-300 rounded-full mx-auto mb-3"></div>
        <blockquote className="text-xs text-gray-900 font-bold uppercase mb-2">
          "INSPIRING QUOTE HERE"
        </blockquote>
        <cite className="text-xs text-gray-500">Author Name</cite>
      </div>
    )
  },
  {
    id: 'side-by-side',
    name: 'Quote C: Side-by-Side',
    description: 'Square image with quote in bordered card',
    icon: <Image className="h-6 w-6" />,
    preview: (
      <div className="bg-white p-3 rounded border-2 border-gray-200">
        <div className="flex gap-3">
          <div className="w-12 h-12 bg-gray-300 rounded flex-shrink-0"></div>
          <div className="flex-1">
            <blockquote className="text-xs text-gray-700 mb-1">
              "Quote and author stacked vertically"
            </blockquote>
            <cite className="text-xs text-gray-500">— Author Name</cite>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'gray-panel',
    name: 'Quote D: Gray Panel',
    description: 'Light gray panel with right-aligned author image',
    icon: <Quote className="h-6 w-6" />,
    preview: (
      <div className="bg-gray-100 p-3 rounded">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <blockquote className="text-xs text-gray-700 mb-1">
              "Quote in gray panel layout"
            </blockquote>
            <cite className="text-xs text-gray-600">— Author Name</cite>
          </div>
          <div className="w-10 h-10 bg-gray-300 rounded-full ml-3"></div>
        </div>
      </div>
    )
  },
  {
    id: 'visual-highlight',
    name: 'Quote E: Visual Highlight',
    description: 'Hero style with background image overlay',
    icon: <Image className="h-6 w-6" />,
    preview: (
      <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded text-white">
        <blockquote className="text-sm font-bold text-center mb-4">
          "Large bold quote over background"
        </blockquote>
        <div className="flex items-center justify-end">
          <div className="w-6 h-6 bg-white/30 rounded-full mr-2"></div>
          <cite className="text-xs">Author Name</cite>
        </div>
      </div>
    )
  }
];

const QuoteTypeDialog = ({ open, onOpenChange, onSelectType, currentContent, onSave }) => {
  const [selectedType, setSelectedType] = useState(currentContent?.quoteType || 'circular-centerpiece');
  const [text, setText] = useState(currentContent?.text || 'Enter your inspiring quote here.');
  const [author, setAuthor] = useState(currentContent?.author || 'Author Name');
  const [authorImage, setAuthorImage] = useState(currentContent?.authorImage || '');
  const [backgroundImage, setBackgroundImage] = useState(currentContent?.backgroundImage || '');

  useEffect(() => {
    if (currentContent) {
      setSelectedType(currentContent.quoteType || 'circular-centerpiece');
      setText(currentContent.text || 'Enter your inspiring quote here.');
      setAuthor(currentContent.author || 'Author Name');
      setAuthorImage(currentContent.authorImage || '');
      setBackgroundImage(currentContent.backgroundImage || '');
    }
  }, [currentContent]);

  const handleSelectType = (type) => {
    setSelectedType(type);
    if (onSelectType && !currentContent) {
      onSelectType(type);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        quoteType: selectedType,
        text,
        author,
        authorImage,
        backgroundImage
      });
    }
  };

  const handleAuthorImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        setAuthorImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        setBackgroundImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderPreview = () => {
    const quoteText = text || 'Enter your inspiring quote here.';
    const authorName = author || 'Author Name';

    switch (selectedType) {
      case 'circular-centerpiece':
        return (
          <div className="bg-white p-6 rounded-lg border text-center">
            <div className="text-6xl text-gray-300 mb-4">"</div>
            <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed">
              {quoteText}
            </blockquote>
            <div className="flex flex-col items-center">
              {authorImage ? (
                <img 
                  src={authorImage} 
                  alt={authorName} 
                  className="w-16 h-16 rounded-full mb-3 object-cover"
                  onError={(e) => {
                    console.log('Image failed to load:', authorImage);
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div className={`w-16 h-16 bg-gray-300 rounded-full mb-3 ${authorImage ? 'hidden' : ''}`}></div>
              <cite className="text-sm text-gray-600 not-italic font-medium">— {authorName}</cite>
            </div>
          </div>
        );

      case 'vertical-spotlight':
        return (
          <div className="bg-white p-6 rounded-lg border text-center">
            {authorImage ? (
              <img 
                src={authorImage} 
                alt={authorName} 
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                onError={(e) => {
                  console.log('Image failed to load:', authorImage);
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className={`w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4 ${authorImage ? 'hidden' : ''}`}></div>
            <blockquote className="text-lg text-gray-900 font-bold uppercase mb-3 tracking-wide">
              "{quoteText}"
            </blockquote>
            <cite className="text-sm text-gray-500 not-italic">{authorName}</cite>
          </div>
        );

      case 'side-by-side':
        return (
          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <div className="flex gap-6 items-start">
              {authorImage ? (
                <img 
                  src={authorImage} 
                  alt={authorName} 
                  className="w-20 h-20 rounded object-cover flex-shrink-0"
                  onError={(e) => {
                    console.log('Image failed to load:', authorImage);
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div className={`w-20 h-20 bg-gray-300 rounded flex-shrink-0 ${authorImage ? 'hidden' : ''}`}></div>
              <div className="flex-1">
                <blockquote className="text-lg text-gray-700 mb-3 leading-relaxed">
                  "{quoteText}"
                </blockquote>
                <cite className="text-sm text-gray-600 not-italic font-medium">— {authorName}</cite>
              </div>
            </div>
          </div>
        );

      case 'gray-panel':
        return (
          <div className="bg-gray-100 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-6">
                <blockquote className="text-lg text-gray-700 mb-2 leading-relaxed">
                  "{quoteText}"
                </blockquote>
                <cite className="text-sm text-gray-600 not-italic font-medium">— {authorName}</cite>
              </div>
              {authorImage ? (
                <img 
                  src={authorImage} 
                  alt={authorName} 
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  onError={(e) => {
                    console.log('Image failed to load:', authorImage);
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div className={`w-16 h-16 bg-gray-300 rounded-full flex-shrink-0 ${authorImage ? 'hidden' : ''}`}></div>
            </div>
          </div>
        );

      case 'visual-highlight':
        return (
          <div 
            className="relative p-8 rounded-lg text-white min-h-[200px] flex flex-col justify-center"
            style={{
              backgroundImage: backgroundImage 
                ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${backgroundImage})` 
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <blockquote className="text-2xl font-bold text-center mb-8 leading-relaxed drop-shadow-lg">
              "{quoteText}"
            </blockquote>
            <div className="absolute bottom-4 right-4 flex items-center">
              {authorImage ? (
                <img 
                  src={authorImage} 
                  alt={authorName} 
                  className="w-12 h-12 rounded-full mr-3 object-cover border-2 border-white"
                  onError={(e) => {
                    console.log('Image failed to load:', authorImage);
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div className={`w-12 h-12 bg-white/30 rounded-full mr-3 border-2 border-white ${authorImage ? 'hidden' : ''}`}></div>
              <cite className="text-sm not-italic font-medium drop-shadow">{authorName}</cite>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white p-6 rounded-lg border">
            <blockquote className="text-lg text-gray-700">"{quoteText}"</blockquote>
            <cite className="text-sm text-gray-600 mt-2 block">— {authorName}</cite>
          </div>
        );
    }
  };

  // If we have currentContent, show the editor interface
  if (currentContent && onSave) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Edit Quote</DialogTitle>
          </DialogHeader>

          <ScrollArea className="flex-1 max-h-[calc(90vh-140px)] overflow-y-auto">
            <div className="space-y-6 p-1 pr-4">
              <div>
                <Label>Quote Style</Label>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  {quoteTypes.map((type) => (
                    <Button
                      key={type.id}
                      variant={selectedType === type.id ? "default" : "outline"}
                      onClick={() => handleSelectType(type.id)}
                      className="justify-start text-left h-auto p-3"
                    >
                      <div className="flex items-center space-x-3 w-full">
                        <div className="text-blue-600">{type.icon}</div>
                        <div className="flex-1">
                          <div className="font-medium">{type.name}</div>
                          <div className="text-xs text-gray-500">{type.description}</div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label>Quote Text</Label>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter your inspiring quote here..."
                  rows={3}
                />
              </div>

              <div>
                <Label>Author Name</Label>
                <Input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Enter author name"
                />
              </div>

              <div>
                <Label>Author Image</Label>
                <div className="space-y-2">
                  <Input
                    value={authorImage}
                    onChange={(e) => setAuthorImage(e.target.value)}
                    placeholder="Enter image URL or upload from computer"
                  />
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAuthorImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <Button variant="outline" size="sm" className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Author Image
                    </Button>
                  </div>
                </div>
              </div>

              {selectedType === 'visual-highlight' && (
                <div>
                  <Label>Background Image</Label>
                  <div className="space-y-2">
                    <Input
                      value={backgroundImage}
                      onChange={(e) => setBackgroundImage(e.target.value)}
                      placeholder="Enter background image URL or upload from computer"
                    />
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleBackgroundImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <Button variant="outline" size="sm" className="w-full">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Background Image
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Label>Preview</Label>
                <div className="mt-2">
                  {renderPreview()}
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="flex justify-end space-x-3 pt-4 border-t flex-shrink-0">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Original type selection interface
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Choose Quote Style</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-[calc(90vh-140px)]">
            <div className="grid gap-4 py-4 pr-4">
              {quoteTypes.map((type) => (
                <Button
                  key={type.id}
                  variant="outline"
                  className="h-auto p-4 justify-start text-left hover:bg-blue-50"
                  onClick={() => handleSelectType(type.id)}
                >
                  <div className="flex items-start gap-4 w-full">
                    <div className="text-blue-600 mt-1 flex-shrink-0">
                      {type.icon}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-gray-900">{type.name}</div>
                        <div className="text-sm text-gray-500">{type.description}</div>
                      </div>
                      <div className="border-t pt-3">
                        {type.preview}
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { QuoteTypeDialog };