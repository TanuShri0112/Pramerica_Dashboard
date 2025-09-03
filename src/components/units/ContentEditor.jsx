import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ContentBlock } from './ContentBlock';

export const ContentEditor = ({ 
  onSave, 
  onPreview, 
  settings, 
  initialBlocks = [],
  unitTitle,
  onTitleChange,
  onTemplateSelect
}) => {
  const [blocks, setBlocks] = useState(initialBlocks);
  const [blockCount, setBlockCount] = useState(initialBlocks.length);

  useEffect(() => {
    if (initialBlocks.length > 0) {
      setBlocks(initialBlocks);
      setBlockCount(initialBlocks.length);
    }
  }, [initialBlocks]);

  useEffect(() => {
    if (blocks.length > 0 || initialBlocks.length > 0) {
      onSave(blocks, unitTitle);
    }
  }, [blocks, unitTitle]);

  useEffect(() => {
    window.addBlockToEditor = addBlock;
    window.loadTemplate = loadTemplate;
    window.getPreviewContent = () => ({ blocks, unitTitle, settings });
  }, [blockCount, blocks.length, blocks, unitTitle, settings]);

  const addBlock = (type) => {
    const newBlock = {
      id: `block_${Date.now()}`,
      type,
      content: getDefaultContent(type),
      order: blocks.length
    };
    setBlocks([...blocks, newBlock]);
    setBlockCount(blockCount + 1);
  };

  const loadTemplate = (templateBlocks) => {
    const processedBlocks = templateBlocks.map((block, index) => ({
      ...block,
      id: `block_${Date.now()}_${index}`,
      order: index
    }));
    setBlocks(processedBlocks);
    setBlockCount(processedBlocks.length);
    if (onTemplateSelect) {
      onTemplateSelect(processedBlocks);
    }
  };

  const getDefaultContent = (type) => {
    if (type.startsWith('image-')) {
      const imageType = type.replace('image-', '');
      
      switch (imageType) {
        case 'centered':
          return {
            imageType: 'centered',
            url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
            alt: 'Centered image',
            caption: 'Add your image description here'
          };
        case 'image-text':
          return {
            imageType: 'image-text',
            url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
            alt: 'Image with text',
            text: 'Add your text content here. This text will appear on the right side of the image.'
          };
        case 'text-on-image':
          return {
            imageType: 'text-on-image',
            url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
            alt: 'Background image',
            overlayText: 'Add your overlay text here'
          };
        default:
          return {
            imageType: 'centered',
            url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
            alt: 'Image description',
            caption: 'Add your image description here'
          };
      }
    }

    if (type.startsWith('multimedia-')) {
      const multimediaType = type.replace('multimedia-', '');
      
      switch (multimediaType) {
        case 'audio':
          return {
            multimediaType: 'audio',
            title: 'Audio Title',
            url: '',
            description: 'Audio description',
            duration: '00:00'
          };
        case 'video':
          return {
            multimediaType: 'video',
            title: 'Video Title',
            url: '',
            description: 'Video description',
            duration: '00:00'
          };
        case 'embedded':
          return {
            multimediaType: 'embedded',
            title: 'Embedded Content',
            url: '',
            description: 'Embedded content description',
            embedCode: ''
          };
        case 'attachment':
          return {
            multimediaType: 'attachment',
            title: 'Attachment Title',
            url: '',
            description: 'Attachment description',
            fileSize: '',
            fileName: ''
          };
      }
    }

    if (type.startsWith('chart-')) {
      const chartType = type.replace('chart-', '');
      return {
        chartType,
        title: 'Chart Title',
        data: [
          { label: 'Item 1', value: 30 },
          { label: 'Item 2', value: 50 },
          { label: 'Item 3', value: 20 }
        ]
      };
    }

    if (type.startsWith('divider-')) {
      const dividerType = type.replace('divider-', '');
      
      switch (dividerType) {
        case 'continue':
          return {
            dividerType: 'continue',
            buttonText: 'Continue'
          };
        case 'divider':
          return {
            dividerType: 'divider'
          };
        case 'number-divider':
          return {
            dividerType: 'number-divider',
            numberLabel: '1'
          };
        case 'space':
          return {
            dividerType: 'space',
            spacing: 'medium'
          };
        default:
          return { 
            dividerType, 
            buttonText: 'Continue' 
          };
      }
    }

    if (type.startsWith('knowledge-check-')) {
      const knowledgeCheckType = type.replace('knowledge-check-', '');
      
      switch (knowledgeCheckType) {
        case 'multiple-choice':
          return {
            knowledgeCheckType: 'multiple-choice',
            question: 'What is the correct answer?',
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correctAnswer: 0,
            explanation: 'This explains why the answer is correct.'
          };
        
        case 'multiple-response':
          return {
            knowledgeCheckType: 'multiple-response',
            question: 'Select all correct answers:',
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correctAnswers: [0, 2],
            explanation: 'These options are correct because...'
          };
        
        case 'fill-in-blank':
          return {
            knowledgeCheckType: 'fill-in-blank',
            question: 'Complete the sentence:',
            text: 'The sky is the color _____ on a sunny day.',
            blanks: [
              { id: 1, position: 19, correctAnswers: ['blue', 'azure'], placeholder: '____' }
            ],
            explanation: 'The sky appears blue due to light scattering.'
          };
        
        case 'matching':
          return {
            knowledgeCheckType: 'matching',
            question: 'Match the items on the left with the items on the right:',
            leftItems: ['Item 1', 'Item 2', 'Item 3'],
            rightItems: ['Match A', 'Match B', 'Match C'],
            correctMatches: [
              { left: 0, right: 0 },
              { left: 1, right: 1 },
              { left: 2, right: 2 }
            ],
            explanation: 'The correct matches are...'
          };
        
        case 'true-false':
          return {
            knowledgeCheckType: 'true-false',
            question: 'True or False: This statement is correct.',
            correctAnswer: true,
            explanation: 'This is true/false because...'
          };
        
        default:
          return { 
            knowledgeCheckType, 
            question: 'Enter your question here',
            explanation: 'Provide an explanation for the answer.'
          };
      }
    }

    if (type.startsWith('interactive-')) {
      const interactiveType = type.replace('interactive-', '');
      
      switch (interactiveType) {
        case 'accordion':
          return {
            interactiveType: 'accordion',
            sections: [
              { 
                title: 'Section 1', 
                content: 'Content for the first accordion section.',
                expanded: true,
                contentType: 'text'
              },
              { 
                title: 'Section 2', 
                content: 'Content for the second accordion section.',
                expanded: false,
                contentType: 'text'
              }
            ]
          };
        
        case 'tabs':
          return {
            interactiveType: 'tabs',
            activeTab: 0,
            tabs: [
              { 
                title: 'Tab 1', 
                description: 'Description for the first tab.',
                contentType: 'text'
              },
              { 
                title: 'Tab 2', 
                description: 'Description for the second tab.',
                contentType: 'text'
              }
            ]
          };

        case 'labeled-graphic':
          return {
            interactiveType: 'labeled-graphic',
            backgroundImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
            hotspots: [
              { 
                id: 'hotspot_1', 
                x: 25, 
                y: 35, 
                label: 'Mountain Peak',
                description: 'A majestic mountain peak rising above the clouds, showcasing nature\'s grandeur and beauty.'
              },
              { 
                id: 'hotspot_2', 
                x: 75, 
                y: 25, 
                label: 'Forest Valley',
                description: 'A lush green valley filled with dense forest, providing a serene and peaceful landscape.'
              }
            ]
          };
        
        case 'process':
          return {
            interactiveType: 'process',
            currentStep: 0,
            steps: [
              {
                title: 'Step 1',
                content: 'Description of the first step in the process.',
                stepNumber: 1,
                contentType: 'text'
              },
              {
                title: 'Step 2',
                content: 'Description of the second step in the process.',
                stepNumber: 2,
                contentType: 'text'
              }
            ]
          };
        
        case 'scenario':
          return {
            interactiveType: 'scenario',
            scenarioQuestion: 'What would you do in this situation?',
            scenarioImage: '',
            scenarioOptions: [
              { text: 'Option A', feedback: 'Feedback for option A', isCorrect: true },
              { text: 'Option B', feedback: 'Feedback for option B', isCorrect: false }
            ]
          };
        
        case 'flashcard':
          return {
            interactiveType: 'flashcard',
            currentCard: 0,
            flashcards: [
              { 
                front: 'Front of card 1', 
                back: 'Back of card 1', 
                frontType: 'text',
                backType: 'text',
                frontImage: '', 
                backImage: ''
              },
              { 
                front: 'Front of card 2', 
                back: 'Back of card 2', 
                frontType: 'text',
                backType: 'text',
                frontImage: '', 
                backImage: ''
              }
            ]
          };
        
        case 'timeline':
          return {
            interactiveType: 'timeline',
            timelineEvents: [
              { 
                title: 'Event 1', 
                date: '2024', 
                description: 'Description of the first event',
                image: ''
              },
              { 
                title: 'Event 2', 
                date: '2025', 
                description: 'Description of the second event',
                image: ''
              }
            ]
          };
        
        case 'kvl':
          return {
            interactiveType: 'kvl',
            kvlQuestion: 'What is the correct answer to this question?',
            kvlOptions: ['Option A', 'Option B', 'Option C', 'Option D'],
            kvlCorrectAnswer: 0,
            kvlExplanation: 'This explains why the answer is correct.'
          };
        
        default:
          return { interactiveType, content: `Default content for ${interactiveType}` };
      }
    }

    if (type.startsWith('quote-')) {
      const quoteType = type.replace('quote-', '');
      
      switch (quoteType) {
        case 'circular-centerpiece':
          return {
            quoteType: 'circular-centerpiece',
            text: 'The only way to do great work is to love what you do.',
            author: 'Steve Jobs',
            authorImage: ''
          };
        case 'vertical-spotlight':
          return {
            quoteType: 'vertical-spotlight',
            text: 'Innovation distinguishes between a leader and a follower.',
            author: 'Steve Jobs',
            authorImage: ''
          };
        case 'side-by-side':
          return {
            quoteType: 'side-by-side',
            text: 'Stay hungry, stay foolish.',
            author: 'Steve Jobs',
            authorImage: ''
          };
        case 'gray-panel':
          return {
            quoteType: 'gray-panel',
            text: 'Your work is going to fill a large part of your life.',
            author: 'Steve Jobs',
            authorImage: ''
          };
        case 'visual-highlight':
          return {
            quoteType: 'visual-highlight',
            text: 'The future belongs to those who believe in the beauty of their dreams.',
            author: 'Eleanor Roosevelt',
            authorImage: '',
            backgroundImage: ''
          };
        default:
          return {
            quoteType: 'circular-centerpiece',
            text: 'The only way to do great work is to love what you do.',
            author: 'Steve Jobs',
            authorImage: ''
          };
      }
    }

    switch (type) {
      case 'text-paragraph':
        return { 
          text: 'Enter your paragraph text here. You can format and style this content.',
          textType: 'paragraph'
        };
      case 'text-heading-paragraph':
        return { 
          heading: 'Main Heading',
          text: 'Enter your content here. This appears below the main heading.',
          textType: 'heading-paragraph'
        };
      case 'text-subheading-paragraph':
        return { 
          subheading: 'Subheading',
          text: 'Enter your content here. This appears below the subheading.',
          textType: 'subheading-paragraph'
        };
      case 'text-table':
        return { 
          headers: ['Column 1', 'Column 2', 'Column 3'],
          rows: [
            ['Data 1', 'Data 2', 'Data 3'],
            ['Data 4', 'Data 5', 'Data 6']
          ],
          textType: 'table'
        };
      
      case 'list-bullet':
        return { 
          items: ['List item 1', 'List item 2', 'List item 3'],
          listType: 'bullet'
        };
      case 'list-numbered':
        return { 
          items: ['First item', 'Second item', 'Third item'],
          listType: 'numbered'
        };
      case 'list-checklist':
        return { 
          items: [
            { text: 'Task 1', checked: false },
            { text: 'Task 2', checked: false },
            { text: 'Task 3', checked: true }
          ],
          listType: 'checklist'
        };
      
      case 'statement-italic':
        return { 
          text: 'This is an important statement in italic style.',
          statementType: 'italic'
        };
      case 'statement-bold':
        return { 
          text: 'This is an important statement in bold style.',
          statementType: 'bold'
        };
      case 'statement-uppercase':
        return { 
          text: 'THIS IS AN IMPORTANT STATEMENT IN UPPERCASE.',
          statementType: 'uppercase'
        };
      case 'statement-highlighted':
        return { 
          text: 'This is an important highlighted statement.',
          statementType: 'highlighted'
        };

      case 'gallery-carousel':
        return {
          images: [
            { url: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400', caption: 'Sample Image 1' },
            { url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400', caption: 'Sample Image 2' },
            { url: 'https://images.unsplash.com/photo-1518770660439-47ba02777815?w=400', caption: 'Sample Image 3' }
          ],
          galleryType: 'carousel'
        };
      case 'gallery-grid-2':
        return {
          images: [
            { url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400', caption: 'Grid Image 1' },
            { url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400', caption: 'Grid Image 2' },
            { url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400', caption: 'Grid Image 3' }
          ],
          galleryType: 'grid-2'
        };
      case 'gallery-grid-3':
        return {
          images: [
            { url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400', caption: 'Grid Image 1' },
            { url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400', caption: 'Grid Image 2' },
            { url: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400', caption: 'Grid Image 3' },
            { url: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400', caption: 'Grid Image 4' },
            { url: 'https://images.unsplash.com/photo-1473091534298-4245e9b90334?w=400', caption: 'Grid Image 5' },
            { url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400', caption: 'Grid Image 6' }
          ],
          galleryType: 'grid-3'
        };
      case 'gallery-grid-4':
        return {
          images: [
            { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400', caption: 'Grid Image 1' },
            { url: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400', caption: 'Grid Image 2' },
            { url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400', caption: 'Grid Image 3' },
            { url: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400', caption: 'Grid Image 4' },
            { url: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400', caption: 'Grid Image 5' },
            { url: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=400', caption: 'Grid Image 6' },
            { url: 'https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=400', caption: 'Grid Image 7' },
            { url: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400', caption: 'Grid Image 8' }
          ],
          galleryType: 'grid-4'
        };

      case 'text':
        return { text: 'Enter your text here. You can format it using the toolbar above.' };
      case 'statement':
        return { text: 'This is an important statement.', type: 'info' };
      case 'quote':
        return { quote: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' };
      case 'list':
        return { items: ['List item...', 'List item...', 'List item...'] };
      case 'video':
        return { url: '', title: 'Video Title', description: '' };
      case 'image':
        return { url: '', alt: 'Image description', description: '' };
      case 'multimedia':
        return { url: '', title: 'Media Title', description: '', fileType: '' };
      case 'link':
        return { url: '', title: 'External Link', description: 'Link description' };
      case 'timer':
        return { duration: 300, title: 'Timer' };
      case 'calculator':
        return { type: 'basic', title: 'Calculator' };
      case 'chart':
        return { type: 'bar', title: 'Chart', data: [] };
      default:
        return {};
    }
  };

  const updateBlock = (id, content) => {
    const updatedBlocks = blocks.map(block => 
      block.id === id ? { ...block, content } : block
    );
    setBlocks(updatedBlocks);
  };

  const deleteBlock = (id) => {
    setBlocks(blocks.filter(block => block.id !== id));
  };

  const moveBlock = (id, direction) => {
    const blockIndex = blocks.findIndex(block => block.id === id);
    if (blockIndex === -1) return;

    const newBlocks = [...blocks];
    if (direction === 'up' && blockIndex > 0) {
      [newBlocks[blockIndex], newBlocks[blockIndex - 1]] = [newBlocks[blockIndex - 1], newBlocks[blockIndex]];
    } else if (direction === 'down' && blockIndex < blocks.length - 1) {
      [newBlocks[blockIndex], newBlocks[blockIndex + 1]] = [newBlocks[blockIndex + 1], newBlocks[blockIndex]];
    }

    newBlocks.forEach((block, index) => {
      block.order = index;
    });

    setBlocks(newBlocks);
  };

  const handleAddBlock = () => {
    addBlock('text');
  };

  const handleSave = () => {
    onSave(blocks, unitTitle);
  };

  if (blocks.length === 0) {
    return (
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-lg p-8 border-2 border-dashed border-gray-300">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Start Building Your Lesson</h3>
              <p className="text-gray-600 mb-6">Choose content blocks from the sidebar to create engaging learning content.</p>
              <Button onClick={handleAddBlock} className="inline-flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add Text Block
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto space-y-4">
        {blocks
          .sort((a, b) => a.order - b.order)
          .map((block, index) => (
            <ContentBlock
              key={block.id}
              block={block}
              onUpdate={(content) => updateBlock(block.id, content)}
              onDelete={() => deleteBlock(block.id)}
              onMoveUp={() => moveBlock(block.id, 'up')}
              onMoveDown={() => moveBlock(block.id, 'down')}
              canMoveUp={index > 0}
              canMoveDown={index < blocks.length - 1}
              settings={settings}
            />
          ))}
      </div>
    </div>
  );
};