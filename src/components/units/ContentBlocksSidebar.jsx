import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  FileText, List, Video, Image, Film, ChevronDown, ChevronRight,
  MessageSquare, Images, Cog, BarChart3, Minus, Quote
} from 'lucide-react';
import { TextTypeDialog } from './TextTypeDialog';
import { ListTypeDialog } from './ListTypeDialog';
import { StatementTypeDialog } from './StatementTypeDialog';
import { QuoteTypeDialog } from './QuoteTypeDialog';
import { GalleryTypeDialog } from './GalleryTypeDialog';
import { InteractiveTypeDialog } from './InteractiveTypeDialog';
import { ChartTypeDialog } from './ChartTypeDialog';
import { DividerTypeDialog } from './DividerTypeDialog';
import { MultimediaTypeDialog } from './MultimediaTypeDialog';
import { ImageTypeDialog } from './ImageTypeDialog';

export const ContentBlocksSidebar = () => {
  const [openSections, setOpenSections] = useState(['text']);
  const [showTextDialog, setShowTextDialog] = useState(false);
  const [showListDialog, setShowListDialog] = useState(false);
  const [showStatementDialog, setShowStatementDialog] = useState(false);
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);
  const [showGalleryDialog, setShowGalleryDialog] = useState(false);
  const [showInteractiveDialog, setShowInteractiveDialog] = useState(false);
  const [showChartDialog, setShowChartDialog] = useState(false);
  const [showDividerDialog, setShowDividerDialog] = useState(false);
  const [showMultimediaDialog, setShowMultimediaDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);

  const toggleSection = (section) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const addBlock = (type, content = {}) => {
    if (window.addBlockToEditor) {
      window.addBlockToEditor(type, content);
    }
  };

  const blockCategories = [
    {
      id: 'text',
      title: 'Text',
      icon: <FileText className="h-4 w-4" />,
      items: [
        { id: 'text-paragraph', title: 'Paragraph', description: 'Simple text paragraph' },
        { id: 'text-heading-paragraph', title: 'Heading + Paragraph', description: 'Heading with text content' },
        { id: 'text-subheading-paragraph', title: 'Subheading + Paragraph', description: 'Subheading with text content' },
        { id: 'text-table', title: 'Table', description: 'Data in table format' }
      ]
    },
    {
      id: 'statement',
      title: 'Statement',
      icon: <MessageSquare className="h-4 w-4" />,
      items: [
        { id: 'statement-italic', title: 'Statement (Italic)', description: 'Emphasized statement in italic' },
        { id: 'statement-bold', title: 'Statement (Bold)', description: 'Strong statement in bold' },
        { id: 'statement-uppercase', title: 'Statement (Uppercase)', description: 'Statement in all caps' },
        { id: 'statement-highlighted', title: 'Statement (Highlighted)', description: 'Highlighted statement box' }
      ]
    },
    {
      id: 'quote',
      title: 'Quote',
      icon: <Quote className="h-4 w-4" />,
      items: []
    },
    {
      id: 'list',
      title: 'List',
      icon: <List className="h-4 w-4" />,
      items: [
        { id: 'list-bullet', title: 'Bullet List', description: 'Unordered list with bullets' },
        { id: 'list-numbered', title: 'Numbered List', description: 'Ordered list with numbers' },
        { id: 'list-checklist', title: 'Checklist', description: 'Interactive checklist' }
      ]
    },
    {
      id: 'gallery',
      title: 'Gallery',
      icon: <Images className="h-4 w-4" />,
      items: [
        { id: 'gallery-carousel', title: 'Carousel', description: 'Sliding image carousel' },
        { id: 'gallery-grid-2', title: '2 Column Grid', description: 'Two column image grid' },
        { id: 'gallery-grid-3', title: '3 Column Grid', description: 'Three column image grid' },
        { id: 'gallery-grid-4', title: '4 Column Grid', description: 'Four column image grid' }
      ]
    },
    {
      id: 'interactive',
      title: 'Interactive',
      icon: <Cog className="h-4 w-4" />,
      items: []
    },
    {
      id: 'media',
      title: 'Media',
      icon: <Video className="h-4 w-4" />,
      items: [
        { id: 'image', title: 'Image', description: 'Single image with caption' },
        { id: 'multimedia', title: 'Multimedia', description: 'Video, audio, or image files' }
      ]
    },
    {
      id: 'charts',
      title: 'Charts',
      icon: <BarChart3 className="h-4 w-4" />,
      items: []
    },
    {
      id: 'divider',
      title: 'Divider',
      icon: <Minus className="h-4 w-4" />,
      items: []
    }
  ];

  const handleCategoryClick = (categoryId) => {
    switch (categoryId) {
      case 'text':
        setShowTextDialog(true);
        break;
      case 'list':
        setShowListDialog(true);
        break;
      case 'statement':
        setShowStatementDialog(true);
        break;
      case 'quote':
        setShowQuoteDialog(true);
        break;
      case 'gallery':
        setShowGalleryDialog(true);
        break;
      case 'interactive':
        setShowInteractiveDialog(true);
        break;
      case 'charts':
        setShowChartDialog(true);
        break;
      case 'divider':
        setShowDividerDialog(true);
        break;
      default:
        toggleSection(categoryId);
    }
  };

  const handleItemClick = (itemId) => {
    if (itemId === 'multimedia') {
      setShowMultimediaDialog(true);
    } else if (itemId === 'image') {
      setShowImageDialog(true);
    } else {
      addBlock(itemId);
    }
  };

  const handleTextSelect = (type) => {
    const content = { textType: type };
    addBlock(`text-${type}`, content);
    setShowTextDialog(false);
  };

  const handleListSelect = (type) => {
    const defaultItems = type === 'checklist' 
      ? [
          { text: 'First task', checked: false },
          { text: 'Second task', checked: false },
          { text: 'Third task', checked: false }
        ]
      : ['First item', 'Second item', 'Third item'];
    
    const content = { 
      listType: type,
      items: defaultItems
    };
    addBlock(`list-${type}`, content);
    setShowListDialog(false);
  };

  const handleStatementSelect = (type) => {
    const content = { 
      statementType: type,
      text: 'This is an important statement that stands out from regular text.'
    };
    addBlock(`statement-${type}`, content);
    setShowStatementDialog(false);
  };

  const handleQuoteSelect = (type) => {
    const content = { 
      quoteType: type,
      text: 'The only way to do great work is to love what you do.',
      author: 'Steve Jobs',
      authorImage: '',
      backgroundImage: type === 'visual-highlight' ? '' : undefined
    };
    addBlock(`quote-${type}`, content);
    setShowQuoteDialog(false);
  };

  const handleGallerySelect = (type) => {
    const defaultImages = [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
        caption: 'Beautiful landscape',
        description: 'A stunning mountain landscape with clear blue skies'
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df5?w=400&h=300&fit=crop',
        caption: 'City skyline',
        description: 'Modern city architecture against the sunset'
      },
      {
        id: '3',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df6?w=400&h=300&fit=crop',
        caption: 'Nature close-up',
        description: 'Macro photography of natural elements'
      }
    ];

    const content = { 
      galleryType: type,
      images: defaultImages
    };
    addBlock(`gallery-${type}`, content);
    setShowGalleryDialog(false);
  };

  const handleInteractiveSelect = (type) => {
    addBlock(`interactive-${type}`);
    setShowInteractiveDialog(false);
  };

  const handleChartSelect = (type) => {
    addBlock(`chart-${type}`);
    setShowChartDialog(false);
  };

  const handleDividerSelect = (type) => {
    addBlock(`divider-${type}`);
    setShowDividerDialog(false);
  };

  const handleMultimediaSelect = (type) => {
    let content = {};
    
    switch (type) {
      case 'audio':
        content = {
          multimediaType: 'audio',
          title: 'Audio Title',
          url: '',
          description: 'Audio description'
        };
        break;
      case 'video':
        content = {
          multimediaType: 'video',
          title: 'Video Title',
          url: '',
          description: 'Video description'
        };
        break;
      case 'embedded':
        content = {
          multimediaType: 'embedded',
          title: 'Embedded Content',
          url: '',
          description: 'Embedded content description'
        };
        break;
      case 'attachment':
        content = {
          multimediaType: 'attachment',
          title: 'Attachment Title',
          url: '',
          description: 'Attachment description',
          fileName: '',
          fileType: ''
        };
        break;
    }
    
    addBlock(`multimedia-${type}`, content);
    setShowMultimediaDialog(false);
  };

  const handleImageSelect = (type) => {
    let content = {};
    
    switch (type) {
      case 'centered':
        content = {
          imageType: 'centered',
          url: '',
          alt: 'Centered image',
          caption: ''
        };
        break;
      case 'image-text':
        content = {
          imageType: 'image-text',
          url: '',
          alt: 'Image with text',
          caption: '',
          text: 'Enter your text content here...'
        };
        break;
      case 'text-on-image':
        content = {
          imageType: 'text-on-image',
          url: '',
          alt: 'Background image',
          overlayText: 'Enter overlay text here...',
          textPosition: 'center'
        };
        break;
    }
    
    addBlock(`image-${type}`, content);
    setShowImageDialog(false);
  };

  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1">
        <div className="px-4 py-4 space-y-2">
          {blockCategories.map((category) => (
            <div key={category.id}>
              {['text', 'list', 'statement', 'quote', 'gallery', 'interactive', 'charts', 'divider'].includes(category.id) ? (
                <Button
                  variant="outline"
                  className="w-full justify-start h-auto p-3 border-2 hover:border-blue-300 hover:bg-blue-50"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <div className="flex items-center space-x-3 w-full">
                    <div className="text-blue-600">{category.icon}</div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-gray-900">{category.title}</div>
                      <div className="text-sm text-gray-500">
                        {category.id === 'text' && 'Paragraph, headings, tables'}
                        {category.id === 'list' && 'Bullets, numbers, checklists'}
                        {category.id === 'statement' && 'Highlighted statements'}
                        {category.id === 'quote' && 'Inspiring quotes with layouts'}
                        {category.id === 'gallery' && 'Image galleries and grids'}
                        {category.id === 'interactive' && 'Interactive components'}
                        {category.id === 'charts' && 'Bar charts, pie charts, line graphs'}
                        {category.id === 'divider' && 'Buttons, lines, numbered steps, spacing'}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </Button>
              ) : (
                <Collapsible 
                  open={openSections.includes(category.id)} 
                  onOpenChange={() => toggleSection(category.id)}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start h-auto p-3 border-2 hover:border-blue-300 hover:bg-blue-50"
                    >
                      <div className="flex items-center space-x-3 w-full">
                        <div className="text-blue-600">{category.icon}</div>
                        <div className="flex-1 text-left">
                          <div className="font-medium text-gray-900">{category.title}</div>
                        </div>
                        {openSections.includes(category.id) ? (
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </Button>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="space-y-1 mt-2 ml-4">
                    <ScrollArea className="h-[150px]">
                      <div className="space-y-1 pr-4">
                        {category.items.map((item) => (
                          <Button
                            key={item.id}
                            variant="ghost"
                            className="w-full justify-start text-left h-auto p-3 hover:bg-gray-100"
                            onClick={() => handleItemClick(item.id)}
                          >
                            <div>
                              <div className="font-medium text-sm">{item.title}</div>
                              <div className="text-xs text-gray-500">{item.description}</div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </ScrollArea>
                  </CollapsibleContent>
                </Collapsible>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <TextTypeDialog 
        open={showTextDialog} 
        onOpenChange={setShowTextDialog}
        onSelectType={handleTextSelect}
      />
      <ListTypeDialog 
        open={showListDialog} 
        onOpenChange={setShowListDialog}
        onSelectType={handleListSelect}
      />
      <StatementTypeDialog 
        open={showStatementDialog} 
        onOpenChange={setShowStatementDialog}
        onSelectType={handleStatementSelect}
      />
      <QuoteTypeDialog 
        open={showQuoteDialog} 
        onOpenChange={setShowQuoteDialog}
        onSelectType={handleQuoteSelect}
      />
      <GalleryTypeDialog 
        open={showGalleryDialog} 
        onOpenChange={setShowGalleryDialog}
        onSelectType={handleGallerySelect}
      />
      <InteractiveTypeDialog 
        open={showInteractiveDialog} 
        onOpenChange={setShowInteractiveDialog}
        onSelectType={handleInteractiveSelect}
      />
      <ChartTypeDialog 
        open={showChartDialog} 
        onOpenChange={setShowChartDialog}
        onSelectType={handleChartSelect}
      />
      <DividerTypeDialog 
        open={showDividerDialog} 
        onOpenChange={setShowDividerDialog}
        onSelectType={handleDividerSelect}
      />
      <MultimediaTypeDialog 
        open={showMultimediaDialog} 
        onOpenChange={setShowMultimediaDialog}
        onSelectType={handleMultimediaSelect}
      />
      <ImageTypeDialog 
        open={showImageDialog} 
        onOpenChange={setShowImageDialog}
        onSelectType={handleImageSelect}
      />
    </div>
  );
};