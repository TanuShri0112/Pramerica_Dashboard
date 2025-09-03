import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Edit2, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  FileText, 
  Quote, 
  List, 
  Video, 
  Image,
  Brain,
  CheckCircle,
  CheckSquare,
  ToggleLeft,
  Link as LinkIcon,
  BarChart3,
  PieChart,
  TrendingUp,
  Minus,
  Italic,
  Bold,
  Type,
  AlertCircle,
  Upload,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { KnowledgeCheckEditor } from './KnowledgeCheckEditor';
import { ChartEditor } from './ChartEditor';
import { DividerEditor } from './DividerEditor';
import { MultimediaEditor } from './MultimediaEditor';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart, Line, Pie } from 'recharts';
import { InteractiveEditor } from './InteractiveEditor';
import { TextTypeDialog } from './TextTypeDialog';
import { ListTypeDialog } from './ListTypeDialog';
import { GalleryTypeDialog } from './GalleryTypeDialog';
import { StatementTypeDialog } from './StatementTypeDialog';
import { QuoteTypeDialog } from './QuoteTypeDialog';
import { AccordionPreview } from './interactive/AccordionPreview';
import { TabsPreview } from './interactive/TabsPreview';
import { LabeledGraphicPreview } from './interactive/LabeledGraphicPreview';
import { ProcessPreview } from './interactive/ProcessPreview';
import FlashcardPreview from './interactive/FlashcardPreview';
import { TimelinePreview } from './interactive/TimelinePreview';
import { KVLPreview } from './interactive/KVLPreview';
import { ImageTypeDialog } from './ImageTypeDialog';
import { ImageEditor } from './ImageEditor';
import FlashcardGridPreview from './interactive/FlashcardGridPreview';
import { SortingActivityPreview } from './interactive/SortingActivityPreview';
import { ScenarioPreview } from './interactive/ScenarioPreview';

export const ContentBlock = ({ 
  block, 
  onUpdate, 
  onDelete, 
  onMoveUp, 
  onMoveDown, 
  canMoveUp, 
  canMoveDown,
  settings 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showKnowledgeCheckEditor, setShowKnowledgeCheckEditor] = useState(false);
  const [showChartEditor, setShowChartEditor] = useState(false);
  const [showDividerEditor, setShowDividerEditor] = useState(false);
  const [showInteractiveEditor, setShowInteractiveEditor] = useState(false);
  const [showMultimediaEditor, setShowMultimediaEditor] = useState(false);
  const [showTextTypeDialog, setShowTextTypeDialog] = useState(false);
  const [showListTypeDialog, setShowListTypeDialog] = useState(false);
  const [showGalleryTypeDialog, setShowGalleryTypeDialog] = useState(false);
  const [showStatementTypeDialog, setShowStatementTypeDialog] = useState(false);
  const [showQuoteTypeDialog, setShowQuoteTypeDialog] = useState(false);
  const [showImageEditor, setShowImageEditor] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        handleSave({ ...block.content, url: result, alt: file.name });
      };
      reader.readAsDataURL(file);
    }
  };

  const getBlockIcon = () => {
    if (block.type.startsWith('multimedia')) return <Video className="h-4 w-4" />;
    if (block.type.startsWith('chart')) return <BarChart3 className="h-4 w-4" />;
    if (block.type.startsWith('knowledge-check')) return <Brain className="h-4 w-4" />;
    if (block.type.startsWith('divider')) return <Minus className="h-4 w-4" />;
    if (block.type.startsWith('text')) return <FileText className="h-4 w-4" />;
    if (block.type.startsWith('statement')) {
      const typeMap = {
        'italic': <Italic className="h-4 w-4" />,
        'bold': <Bold className="h-4 w-4" />,
        'uppercase': <Type className="h-4 w-4" />,
        'highlighted': <AlertCircle className="h-4 w-4" />
      };
      return typeMap[block.content?.statementType] || <AlertCircle className="h-4 w-4" />;
    }
    if (block.type.startsWith('quote')) return <Quote className="h-4 w-4" />;
    if (block.type.startsWith('list')) return <List className="h-4 w-4" />;
    if (block.type.startsWith('gallery')) return <Image className="h-4 w-4" />;
    if (block.type === 'video' || block.type === 'multimedia') return <Video className="h-4 w-4" />;
    if (block.type === 'image') return <Image className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  const getBlockTitle = () => {
    if (block.type.startsWith('multimedia')) {
      const typeMap = {
        'audio': 'Audio',
        'video': 'Video',
        'embedded': 'Embedded Content',
        'attachment': 'Attachment'
      };
      return typeMap[block.content?.multimediaType] || 'Media';
    }
    
    if (block.type.startsWith('chart')) {
      const typeMap = {
        'bar': 'Bar Chart',
        'pie': 'Pie Chart',
        'line': 'Line Chart'
      };
      return typeMap[block.content?.chartType] || 'Chart';
    }
    
    if (block.type.startsWith('knowledge-check')) {
      const typeMap = {
        'multiple-choice': 'Multiple Choice',
        'multiple-response': 'Multiple Response', 
        'true-false': 'True/False',
        'fill-in-blank': 'Fill in the Blank',
        'matching': 'Matching'
      };
      return typeMap[block.content?.knowledgeCheckType] || 'Knowledge Check';
    }

    if (block.type.startsWith('divider')) {
      const typeMap = {
        'continue': 'Continue Button',
        'divider': 'Divider Line',
        'number-divider': 'Number Divider',
        'space': 'Vertical Space'
      };
      return typeMap[block.content?.dividerType] || 'Divider';
    }

    if (block.type.startsWith('text')) {
      const typeMap = {
        'paragraph': 'Paragraph',
        'heading-paragraph': 'Heading + Paragraph',
        'subheading-paragraph': 'Subheading + Paragraph',
        'table': 'Table'
      };
      return typeMap[block.content?.textType] || 'Text';
    }

    if (block.type.startsWith('statement')) {
      const typeMap = {
        'italic': 'Statement Style 1',
        'bold': 'Statement Style 2',
        'uppercase': 'Statement Style 3',
        'highlighted': 'Statement Style 4'
      };
      return typeMap[block.content?.statementType] || 'Statement';
    }

    if (block.type.startsWith('quote')) {
      const typeMap = {
        'simple': 'Simple Quote',
        'italic': 'Italic Quote',
        'bold': 'Bold Quote',
        'with-author': 'Quote with Author'
      };
      return typeMap[block.content?.quoteType] || 'Quote';
    }
    
    if (block.type.startsWith('list')) {
      const typeMap = {
        'bullet': 'Bullet List',
        'numbered': 'Numbered List',
        'checklist': 'Checklist'
      };
      return typeMap[block.content?.listType] || 'List';
    }

    if (block.type.startsWith('gallery')) {
      const typeMap = {
        'carousel': 'Image Carousel',
        'grid-2': '2 Column Grid',
        'grid-3': '3 Column Grid',
        'grid-4': '4 Column Grid'
      };
      return typeMap[block.content?.galleryType] || 'Gallery';
    }
    
    if (block.type === 'video') return 'Video';
    if (block.type === 'image') {
      const typeMap = {
        'centered': 'Image Centered',
        'image-text': 'Image and Text',
        'text-on-image': 'Text on Image'
      };
      return typeMap[block.content?.imageType] || 'Image';
    }
    if (block.type === 'multimedia') return 'Media';
    return 'Content Block';
  };

  const handleEdit = () => {
    if (block.type.startsWith('multimedia')) {
      setShowMultimediaEditor(true);
    } else if (block.type.startsWith('chart')) {
      setShowChartEditor(true);
    } else if (block.type.startsWith('knowledge-check')) {
      setShowKnowledgeCheckEditor(true);
    } else if (block.type.startsWith('divider')) {
      setShowDividerEditor(true);
    } else if (block.type.startsWith('interactive')) {
      setShowInteractiveEditor(true);
    } else if (block.type.startsWith('text')) {
      setShowTextTypeDialog(true);
    } else if (block.type.startsWith('list')) {
      setShowListTypeDialog(true);
    } else if (block.type.startsWith('gallery')) {
      setShowGalleryTypeDialog(true);
    } else if (block.type.startsWith('statement')) {
      setShowStatementTypeDialog(true);
    } else if (block.type.startsWith('quote')) {
      setShowQuoteTypeDialog(true);
    } else if (block.type.startsWith('image')) {
      setShowImageEditor(true);
    } else {
      setIsEditing(true);
    }
  };

  const handleSave = (content) => {
    onUpdate(content);
    setIsEditing(false);
  };

  const handleKnowledgeCheckSave = (content) => {
    onUpdate(content);
    setShowKnowledgeCheckEditor(false);
  };

  const handleChartSave = (content) => {
    onUpdate(content);
    setShowChartEditor(false);
  };

  const handleDividerSave = (content) => {
    onUpdate(content);
    setShowDividerEditor(false);
  };

  const handleInteractiveSave = (content) => {
    onUpdate(content);
    setShowInteractiveEditor(false);
  };

  const handleMultimediaSave = (content) => {
    onUpdate(content);
    setShowMultimediaEditor(false);
  };

  const handleImageSave = (content) => {
    onUpdate(content);
    setShowImageEditor(false);
  };

  const handleTextTypeSelect = (textType) => {
    const newContent = { ...block.content, textType };
    onUpdate(newContent);
    setShowTextTypeDialog(false);
  };

  const handleListSave = (content) => {
    onUpdate(content);
    setShowListTypeDialog(false);
  };

  const handleGallerySave = (content) => {
    onUpdate(content);
    setShowGalleryTypeDialog(false);
  };

  const handleStatementTypeSelect = (statementType) => {
    const newContent = { ...block.content, statementType };
    onUpdate(newContent);
    setShowStatementTypeDialog(false);
  };

  const handleQuoteTypeSelect = (quoteType) => {
    const newContent = { ...block.content, quoteType };
    onUpdate(newContent);
    setShowQuoteTypeDialog(false);
  };

  const renderListContent = () => {
    const { listType, items } = block.content;
    
    if (!items || items.length === 0) {
      return (
        <div className="text-gray-500 p-4 text-center">
          No list items added yet
        </div>
      );
    }

    switch (listType) {
      case 'bullet':
        return (
          <ul className="space-y-2 pl-6">
            {items.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
      
      case 'numbered':
        return (
          <ol className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="w-6 h-6 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        );
      
      case 'checklist':
        return (
          <div className="space-y-2">
            {items.map((item, index) => (
              <div key={index} className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={item.checked || false}
                  onChange={() => {
                    const newItems = [...items];
                    newItems[index] = { 
                      ...newItems[index], 
                      checked: !newItems[index].checked 
                    };
                    onUpdate({ ...block.content, items: newItems });
                  }}
                  className="mr-3 rounded" 
                />
                <span className={item.checked ? 'line-through text-gray-500' : ''}>
                  {typeof item === 'string' ? item : item.text || item}
                </span>
              </div>
            ))}
          </div>
        );
      
      default:
        return (
          <div className="text-gray-500 p-4 text-center">
            Unknown list type
          </div>
        );
    }
  };

  const renderGalleryContent = () => {
    const { galleryType, images } = block.content;
    
    if (!images || images.length === 0) {
      return (
        <div className="text-gray-500 p-4 text-center border-2 border-dashed border-gray-300 rounded-lg">
          No images added to gallery yet
        </div>
      );
    }

    switch (galleryType) {
      case 'carousel':
        const currentImage = images[currentImageIndex] || images[0];
        return (
          <div className="relative bg-gray-50 rounded-lg overflow-hidden">
            <div className="aspect-video bg-white flex items-center justify-center">
              <img 
                src={currentImage.url}
                alt={currentImage.caption || 'Gallery image'}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOWNhM2FmIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
                }}
              />
            </div>
            
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : images.length - 1)}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setCurrentImageIndex(prev => prev < images.length - 1 ? prev + 1 : 0)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
            
            {currentImage.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-white font-medium">{currentImage.caption}</p>
                {currentImage.description && (
                  <p className="text-white/80 text-sm mt-1">{currentImage.description}</p>
                )}
              </div>
            )}
          </div>
        );
      
      case 'grid-2':
      case 'grid-3':
      case 'grid-4':
        const columns = parseInt(galleryType.split('-')[1]);
        const gridClass = `grid grid-cols-${columns} gap-4`;
        return (
          <div className={gridClass}>
            {images.map((image, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  <img 
                    src={image.url}
                    alt={image.caption || `Image ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOWNhM2FmIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
                    }}
                  />
                </div>
                {(image.caption || image.description) && (
                  <div className="p-3">
                    {image.caption && (
                      <h4 className="font-medium text-gray-900 text-sm">{image.caption}</h4>
                    )}
                    {image.description && (
                      <p className="text-gray-600 text-xs mt-1">{image.description}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      
      default:
        return (
          <div className="text-gray-500 p-4 text-center">
            Unknown gallery type
          </div>
        );
    }
  };

  const renderChart = () => {
    const { chartType, title, data } = block.content;
    const colors = ['#3b82f6', '#1d4ed8', '#1e40af', '#2563eb', '#60a5fa', '#93c5fd'];

    if (!data || data.length === 0) {
      return (
        <div className="text-gray-500 p-8 text-center">
          No chart data available
        </div>
      );
    }

    return (
      <div className="w-full">
        <h3 className="text-lg font-semibold text-center mb-4">{title}</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'bar' ? (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill={colors[0]} />
              </BarChart>
            ) : chartType === 'pie' ? (
              <RechartsPieChart>
                <Pie 
                  data={data} 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={80} 
                  fill="#8884d8" 
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            ) : chartType === 'line' ? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke={colors[0]} strokeWidth={2} />
              </LineChart>
            ) : null}
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const renderChartSummary = () => {
    const { chartType, title, data } = block.content;
    
    const getChartIcon = () => {
      switch (chartType) {
        case 'bar': return <BarChart3 className="h-4 w-4" />;
        case 'pie': return <PieChart className="h-4 w-4" />;
        case 'line': return <TrendingUp className="h-4 w-4" />;
        default: return <BarChart3 className="h-4 w-4" />;
      }
    };

    return (
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          {getChartIcon()}
          <Badge variant="secondary" className="text-xs">
            {getBlockTitle()}
          </Badge>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">
            {title || 'Untitled Chart'}
          </h4>
          <div className="text-sm text-gray-600">
            {data?.length || 0} data points
          </div>
        </div>
      </div>
    );
  };

  const renderKnowledgeCheckSummary = () => {
    const { knowledgeCheckType, question, options, correctAnswer, correctAnswers } = block.content;
    
    const getTypeIcon = () => {
      switch (knowledgeCheckType) {
        case 'multiple-choice': return <CheckCircle className="h-4 w-4" />;
        case 'multiple-response': return <CheckSquare className="h-4 w-4" />;
        case 'true-false': return <ToggleLeft className="h-4 w-4" />;
        case 'fill-in-blank': return <LinkIcon className="h-4 w-4" />;
        case 'matching': return <CheckSquare className="h-4 w-4" />;
        default: return <Brain className="h-4 w-4" />;
      }
    };

    return (
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          {getTypeIcon()}
          <Badge variant="secondary" className="text-xs">
            {getBlockTitle()}
          </Badge>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">
            {question || 'No question set'}
          </h4>
          
          {knowledgeCheckType === 'multiple-choice' && options && (
            <div className="space-y-1">
              {options.slice(0, 3).map((option, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <span className={`w-2 h-2 rounded-full ${index === correctAnswer ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                  <span className={index === correctAnswer ? 'font-medium' : 'text-gray-600'}>
                    {option || `Option ${index + 1}`}
                  </span>
                </div>
              ))}
              {options.length > 3 && (
                <div className="text-xs text-gray-500">+{options.length - 3} more options</div>
              )}
            </div>
          )}
          
          {knowledgeCheckType === 'multiple-response' && options && (
            <div className="space-y-1">
              {options.slice(0, 3).map((option, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <span className={`w-2 h-2 rounded-sm ${correctAnswers?.includes(index) ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                  <span className={correctAnswers?.includes(index) ? 'font-medium' : 'text-gray-600'}>
                    {option || `Option ${index + 1}`}
                  </span>
                </div>
              ))}
              {options.length > 3 && (
                <div className="text-xs text-gray-500">+{options.length - 3} more options</div>
              )}
            </div>
          )}
          
          {knowledgeCheckType === 'true-false' && (
            <div className="text-sm">
              <span className="text-gray-600">Correct answer: </span>
              <span className="font-medium">{block.content.correctAnswer ? 'True' : 'False'}</span>
            </div>
          )}
          
          {knowledgeCheckType === 'fill-in-blank' && (
            <div className="text-sm text-gray-600">
              {block.content.text || 'No text set'}
            </div>
          )}
          
          {knowledgeCheckType === 'matching' && (
            <div className="text-sm text-gray-600">
              {block.content.leftItems?.length || 0} matching pairs
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderDivider = () => {
    const { dividerType, buttonText, numberLabel, spacing } = block.content;

    switch (dividerType) {
      case 'continue':
        return (
          <div className="flex justify-center py-6">
            <Button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium">
              {buttonText || 'Continue'}
            </Button>
          </div>
        );
      
      case 'divider':
        return (
          <div className="flex justify-center py-6">
            <div className="w-full max-w-md h-px bg-gray-300"></div>
          </div>
        );
      
      case 'number-divider':
        return (
          <div className="flex justify-center items-center py-6 space-x-4">
            <div className="w-20 h-px bg-gray-300"></div>
            <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
              {numberLabel || '1'}
            </div>
            <div className="w-20 h-px bg-gray-300"></div>
          </div>
        );
      
      case 'space':
        const spaceHeight = spacing === 'small' ? 'h-8' : spacing === 'large' ? 'h-24' : 'h-16';
        return <div className={`w-full ${spaceHeight}`}></div>;
      
      default:
        return (
          <div className="flex justify-center py-6">
            <div className="w-full max-w-md h-px bg-gray-300"></div>
          </div>
        );
    }
  };

  const renderDividerSummary = () => {
    const { dividerType, buttonText, numberLabel, spacing } = block.content;
    
    return (
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Minus className="h-4 w-4" />
          <Badge variant="secondary" className="text-xs">
            {getBlockTitle()}
          </Badge>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-sm text-gray-600">
            {dividerType === 'continue' &&`Button: "${buttonText || 'Continue'}"`}
            {dividerType === 'divider' && 'Simple horizontal line'}
            {dividerType === 'number-divider' &&`Number: "${numberLabel || '1'}"`}
            {dividerType === 'space' &&`Spacing: ${spacing || 'medium'}`}
          </div>
        </div>
      </div>
    );
  };

  const renderInteractive = () => {
    const { interactiveType } = block.content;

    switch (interactiveType) {
      case 'scenario':
        const scenarioData = {
          interactiveType: 'scenario',
          title: block.content.title || 'Scenario',
          description: block.content.description || 'Interactive scenario',
          backgroundImage: block.content.backgroundImage,
          avatarImage: block.content.avatarImage,
          scenes: block.content.scenes || []
        };
        return (
          <ScenarioPreview 
            data={scenarioData}
          />
        );
      
      case 'accordion':
        return (
          <AccordionPreview 
            sections={block.content.sections || []}
          />
        );
      
      case 'tabs':
        return (
          <TabsPreview 
            tabs={block.content.tabs || []}
          />
        );
      
      case 'labeled-graphic':
        return (
          <LabeledGraphicPreview 
            backgroundImage={block.content.backgroundImage}
            hotspots={block.content.hotspots || []}
          />
        );
      
      case 'process':
        return (
          <ProcessPreview 
            steps={block.content.steps || []}
          />
        );
      
      case 'flashcard':
        const displayMode = block.content.displayMode || 'stack';
        if (displayMode === 'grid') {
          return (
            <FlashcardGridPreview 
              flashcards={block.content.flashcards || []}
            />
          );
        } else {
          return (
            <FlashcardPreview 
              flashcards={block.content.flashcards || []}
            />
          );
        }

      case 'sorting-activity':
        return (
          <SortingActivityPreview 
            title={block.content.title}
            instructions={block.content.instructions}
            items={block.content.items || []}
            onEdit={() => setShowInteractiveEditor(true)}
          />
        );
      
      case 'timeline':
        return (
          <TimelinePreview 
            timelineEvents={block.content.timelineEvents || []}
          />
        );
      
      case 'kvl':
        return (
          <KVLPreview 
            kvlQuestion={block.content.kvlQuestion}
            kvlOptions={block.content.kvlOptions}
            kvlCorrectAnswer={block.content.kvlCorrectAnswer}
            kvlFeedback={block.content.kvlFeedback}
          />
        );
      
      default:
        return (
          <div className="text-gray-500 p-4 text-center">
            Interactive component preview not available
          </div>
        );
    }
  };

  const renderInteractiveSummary = () => {
    const { interactiveType, title, sections, tabs, hotspots, steps, flashcards, timelineEvents, kvlQuestion, items, scenes } = block.content;
    
    const getTypeTitle = () => {
      switch (interactiveType) {
        case 'scenario': return 'Scenario';
        case 'accordion': return 'Accordion';
        case 'tabs': return 'Tabs';
        case 'labeled-graphic': return 'Labeled Graphic';
        case 'process': return 'Process';
        case 'flashcard': return 'Flashcard';
        case 'flashcard-grid': return 'Flashcard Grid';
        case 'sorting-activity': return 'Sorting Activity';
        case 'timeline': return 'Timeline';
        case 'kvl': return 'KVL (Knowledge Validation)';
        default: return 'Interactive Component';
      }
    };

    return (
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="text-xs">
            {getTypeTitle()}
          </Badge>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">
            {title || getTypeTitle()}
          </h4>
          
          <div className="text-sm text-gray-600">
            {interactiveType === 'scenario' &&`${scenes?.length || 0} scenes`}
            {interactiveType === 'accordion' &&`${sections?.length || 0} sections`}
            {interactiveType === 'tabs' &&`${tabs?.length || 0} tabs`}
            {interactiveType === 'labeled-graphic' &&`${hotspots?.length || 0} hotspots`}
            {interactiveType === 'process' &&`${steps?.length || 0} steps`}
            {interactiveType === 'flashcard' &&`${flashcards?.length || 0} flashcards`}
            {interactiveType === 'flashcard-grid' &&`${flashcards?.length || 0} flashcards`}
            {interactiveType === 'sorting-activity' &&`${items?.length || 0} sortable cards`}
            {interactiveType === 'timeline' &&`${timelineEvents?.length || 0} events`}
            {interactiveType === 'kvl' && kvlQuestion ? 'Quiz question configured' : 'No question set'}
          </div>
        </div>
      </div>
    );
  };

  const renderTextContent = () => {
    const { textType, text, heading, subheading, tableData, backgroundVideoUrl, backgroundVideoMuted, backgroundVideoLoop, backgroundOverlay } = block.content;

    switch (textType) {
      case 'paragraph':
        return backgroundVideoUrl ? (
          <div className="relative rounded-lg overflow-hidden min-h-[320px] md:min-h-[420px]">
            <video
              src={backgroundVideoUrl}
              autoPlay
              muted={backgroundVideoMuted !== false}
              loop={backgroundVideoLoop !== false}
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            {backgroundOverlay !== false && (
              <div className="absolute inset-0 bg-black/40" />
            )}
            <div className="relative p-6">
              <div className="prose max-w-none">
                <p className="text-white leading-relaxed">{text || 'Enter your paragraph text here.'}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{text || 'Enter your paragraph text here.'}</p>
          </div>
        );
      
      case 'heading-paragraph':
        return backgroundVideoUrl ? (
          <div className="relative rounded-lg overflow-hidden min-h-[320px] md:min-h-[420px]">
            <video
              src={backgroundVideoUrl}
              autoPlay
              muted={backgroundVideoMuted !== false}
              loop={backgroundVideoLoop !== false}
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            {backgroundOverlay !== false && (
              <div className="absolute inset-0 bg-black/40" />
            )}
            <div className="relative p-6">
              <div className="prose max-w-none">
                <h3 className="text-xl font-bold mb-3 text-white">{heading || 'Main Heading'}</h3>
                <p className="text-white leading-relaxed">{text || 'Enter your content here.'}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="prose max-w-none">
            <h3 className="text-xl font-bold mb-3 text-gray-900">{heading || 'Main Heading'}</h3>
            <p className="text-gray-700 leading-relaxed">{text || 'Enter your content here.'}</p>
          </div>
        );
      
      case 'subheading-paragraph':
        return backgroundVideoUrl ? (
          <div className="relative rounded-lg overflow-hidden min-h-[320px] md:min-h-[420px]">
            <video
              src={backgroundVideoUrl}
              autoPlay
              muted={backgroundVideoMuted !== false}
              loop={backgroundVideoLoop !== false}
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            {backgroundOverlay !== false && (
              <div className="absolute inset-0 bg-black/40" />
            )}
            <div className="relative p-6">
              <div className="prose max-w-none">
                <h4 className="text-lg font-semibold mb-2 text-white">{subheading || 'Subheading'}</h4>
                <p className="text-white leading-relaxed">{text || 'Enter your content here.'}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="prose max-w-none">
            <h4 className="text-lg font-semibold mb-2 text-gray-800">{subheading || 'Subheading'}</h4>
            <p className="text-gray-700 leading-relaxed">{text || 'Enter your content here.'}</p>
          </div>
        );
      
      case 'table':
        if (!tableData?.headers || !tableData?.rows) {
          return (
            <div className="text-gray-500 p-4 text-center border rounded">
              No table data configured
            </div>
          );
        }
        return (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  {tableData.headers.map((header, index) => (
                    <th key={index} className="border border-gray-300 px-4 py-2 text-left font-medium">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border border-gray-300 px-4 py-2">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      
      default:
        return (
          <div className="text-gray-500 p-4 text-center">
            Configure text content
          </div>
        );
    }
  };

  const renderStatementContent = () => {
    const { statementType, text } = block.content;
    const content = text || 'This is an important statement.';

    switch (statementType) {
      case 'italic':
        return <span className="italic text-blue-700">{content}</span>;
      case 'bold':
        return <span className="font-bold text-gray-900">{content}</span>;
      case 'uppercase':
        return <span className="uppercase font-semibold text-gray-800 tracking-wide">{content}</span>;
      case 'highlighted':
        return <span className="bg-yellow-100 px-2 py-1 rounded border-l-4 border-yellow-500 text-gray-800">{content}</span>;
      default:
        return <span className="text-gray-700">{content}</span>;
    }
  };

  const renderQuoteContent = () => {
    const { quoteType, text, author, authorImage, backgroundImage } = block.content;
    const quoteText = text || 'Enter your quote here.';
    const authorName = author || 'Author Name';

    switch (quoteType) {
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
                />
              ) : (
                <div className="w-16 h-16 bg-gray-300 rounded-full mb-3"></div>
              )}
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
              />
            ) : (
              <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
            )}
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
                />
              ) : (
                <div className="w-20 h-20 bg-gray-300 rounded flex-shrink-0"></div>
              )}
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
                />
              ) : (
                <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0"></div>
              )}
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
                />
              ) : (
                <div className="w-12 h-12 bg-white/30 rounded-full mr-3 border-2 border-white"></div>
              )}
              <cite className="text-sm not-italic font-medium drop-shadow">{authorName}</cite>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-gray-50 p-4 rounded border-l-4 border-purple-500">
            <blockquote className="text-gray-700">"{quoteText}"</blockquote>
            <div className="flex items-center mt-3">
              {authorImage ? (
                <img src={authorImage} alt={authorName} className="w-8 h-8 rounded-full mr-3 object-cover" />
              ) : (
                <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
              )}
              <cite className="text-sm text-gray-600 not-italic">— {authorName}</cite>
            </div>
          </div>
        );
    }
  };

  const renderImageContent = () => {
    const { imageType, url, alt, caption, text, overlayText } = block.content;

    if (!url) {
      return (
        <div className="text-gray-500 p-4 text-center border-2 border-dashed border-gray-300 rounded-lg">
          No image selected
        </div>
      );
    }

    switch (imageType) {
      case 'centered':
        return (
          <div className="text-center space-y-3">
            <img
              src={url}
              alt={alt || 'Centered image'}
              className="max-w-full h-auto rounded-lg mx-auto"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
              }}
            />
            {caption && (
              <p className="text-sm text-gray-600 mt-2">{caption}</p>
            )}
          </div>
        );

      case 'image-text':
        return (
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="md:w-1/2">
              <img
                src={url}
                alt={alt || 'Image with text'}
                className="w-full h-auto rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
                }}
              />
            </div>
            <div className="md:w-1/2 flex items-center">
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {text || 'Enter your text content here...'}
                </p>
              </div>
            </div>
          </div>
        );

      case 'text-on-image':
        return (
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={url}
              alt={alt || 'Background image'}
              className="w-full h-64 object-cover"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white p-4">
                <p className="text-lg font-semibold">
                  {overlayText || 'Enter overlay text here...'}
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-gray-500 p-4 text-center">
            Unknown image type
          </div>
        );
    }
  };

  const renderEmbeddedContent = (url) => {
    if (!url) return null;

    if (url.includes('<iframe') && url.includes('</iframe>')) {
      return (
        <div 
          className="w-full"
          dangerouslySetInnerHTML={{ __html: url }}
        />
      );
    }

    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    if (youtubeMatch) {
      const videoId = youtubeMatch[1];
      return (
        <iframe
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="rounded-lg"
        />
      );
    }

    return (
      <iframe
        src={url}
        width="100%"
        height="315"
        frameBorder="0"
        title="Embedded content"
        className="rounded-lg"
      />
    );
  };

  const renderContent = () => {
    if (block.type.startsWith('list')) {
      return renderListContent();
    }

    if (block.type.startsWith('gallery')) {
      return renderGalleryContent();
    }

    if (block.type.startsWith('chart')) {
      return isEditing ? renderChartSummary() : renderChart();
    }

    if (block.type.startsWith('knowledge-check')) {
      return renderKnowledgeCheckSummary();
    }

    if (block.type.startsWith('divider')) {
      return isEditing ? renderDividerSummary() : renderDivider();
    }

    if (block.type.startsWith('interactive')) {
      return renderInteractive();
    }

    if (block.type.startsWith('text')) {
      return renderTextContent();
    }

    if (block.type.startsWith('statement')) {
      return (
        <div className="p-4">
          {renderStatementContent()}
        </div>
      );
    }

    if (block.type.startsWith('quote')) {
      return renderQuoteContent();
    }

    if (block.type.startsWith('image')) {
      return renderImageContent();
    }

    if (block.type.startsWith('multimedia')) {
      const { multimediaType, title, description, url } = block.content;
      
      if (!url) {
        return (
          <div className="text-gray-500 p-4 text-center border-2 border-dashed border-gray-300 rounded-lg">
            No {multimediaType} file selected
          </div>
        );
      }

      return (
        <div className="space-y-3">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900">{title || `${multimediaType} Title`}</h4>
            {description && (
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            )}
            <div className="mt-3">
              {multimediaType === 'audio' && (
                <audio controls className="w-full">
                  <source src={url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
              {multimediaType === 'video' && (
                <video controls className="w-full max-h-64">
                  <source src={url} type="video/mp4" />
                  Your browser does not support the video element.
                </video>
              )}
              {multimediaType === 'embedded' && renderEmbeddedContent(url)}
              {multimediaType === 'attachment' && (
                <div className="bg-white border rounded p-4 space-y-3">
                  {block.content.fileType?.includes('pdf') ? (
                    <div className="border rounded">
                      <iframe
                        src={url}
                        title={block.content.fileName || 'PDF attachment'}
                        className="w-full h-64 rounded"
                      />
                    </div>
                  ) : null}
                  <a href={url} download={block.content.fileName || true} className="text-blue-600 hover:text-blue-800">
                    {block.content.fileName || 'Download Attachment'}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (block.type === 'image' && block.content?.url) {
      return (
        <div className="text-center">
          <img
            src={block.content.url}
            alt={block.content.alt || 'Uploaded image'}
            className="max-w-full h-auto rounded-lg mx-auto"
            onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
            }}
          />
        </div>
      );
    }

    if (block.type === 'video' && block.content?.url) {
      return (
        <div className="text-center">
          <video
            src={block.content.url}
            controls
            className="max-w-full h-auto rounded-lg mx-auto"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }

    return (
      <div className="text-gray-500 p-4 text-center">
        {block.type === 'image' ? 'No image selected' : 
         block.type === 'video' ? 'No video selected' : 
         'Configure this content block'}
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {getBlockIcon()}
            <span className="font-medium text-gray-900">{getBlockTitle()}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={onMoveUp}
              disabled={!canMoveUp}
              className="h-8 w-8"
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onMoveDown}
              disabled={!canMoveDown}
              className="h-8 w-8"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleEdit}
              className="h-8 w-8"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onDelete}
              className="h-8 w-8 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {renderContent()}
      </CardContent>

      <KnowledgeCheckEditor
        open={showKnowledgeCheckEditor}
        onOpenChange={setShowKnowledgeCheckEditor}
        content={block.content}
        onSave={handleKnowledgeCheckSave}
      />

      <ChartEditor
        open={showChartEditor}
        onOpenChange={setShowChartEditor}
        content={block.content}
        onSave={handleChartSave}
      />

      <DividerEditor
        open={showDividerEditor}
        onOpenChange={setShowDividerEditor}
        content={block.content}
        onSave={handleDividerSave}
      />

      <InteractiveEditor
        open={showInteractiveEditor}
        onClose={() => setShowInteractiveEditor(false)}
        onOpenChange={setShowInteractiveEditor}
        content={block.content}
        onSave={handleInteractiveSave}
      />

      <MultimediaEditor
        open={showMultimediaEditor}
        onOpenChange={setShowMultimediaEditor}
        content={block.content}
        onSave={handleMultimediaSave}
      />

      <TextTypeDialog
        open={showTextTypeDialog}
        onOpenChange={setShowTextTypeDialog}
        onSelectType={handleTextTypeSelect}
        currentContent={block.content}
        onSave={(content) => {
          onUpdate(content);
          setShowTextTypeDialog(false);
        }}
      />

      <ListTypeDialog
        open={showListTypeDialog}
        onOpenChange={setShowListTypeDialog}
        currentContent={block.content}
        onSave={handleListSave}
      />

      <GalleryTypeDialog
        open={showGalleryTypeDialog}
        onOpenChange={setShowGalleryTypeDialog}
        currentContent={block.content}
        onSave={handleGallerySave}
      />

      <StatementTypeDialog
        open={showStatementTypeDialog}
        onOpenChange={setShowStatementTypeDialog}
        onSelectType={handleStatementTypeSelect}
        currentContent={block.content}
        onSave={(content) => {
          onUpdate(content);
          setShowStatementTypeDialog(false);
        }}
      />

      <QuoteTypeDialog
        open={showQuoteTypeDialog}
        onOpenChange={setShowQuoteTypeDialog}
        onSelectType={handleQuoteTypeSelect}
        currentContent={block.content}
        onSave={(content) => {
          onUpdate(content);
          setShowQuoteTypeDialog(false);
        }}
      />

      <ImageEditor
        open={showImageEditor}
        onOpenChange={setShowImageEditor}
        content={block.content}
        onSave={handleImageSave}
      />
    </Card>
  );
};