import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Edit, Play, Users, CheckCircle, X } from 'lucide-react';

// Expected template shape: { id: string, name: string, description: string, icon: ReactNode, color: string, blockCount: number, category: string }
const TemplateDetailModal = ({ template, isOpen, onClose, onUseTemplate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTemplate, setEditedTemplate] = useState(null);

  React.useEffect(() => {
    if (template) {
      setEditedTemplate({ ...template });
    }
  }, [template]);

  if (!template) return null;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save template changes
    console.log('Saving template changes:', editedTemplate);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTemplate({ ...template });
  };

  const getTemplateContent = (templateId) => {
    switch (templateId) {
      case 'welcome-course':
        return [
          {
            type: 'header',
            title: 'Welcome to Our Learning Platform! 🎉',
            description: 'Get ready for an amazing learning experience that will transform your skills and knowledge.'
          },
          {
            type: 'info',
            title: 'Let\'s begin your journey together!',
            content: 'This course is designed to help you succeed. Take your time, engage with the content, and don\'t hesitate to reach out if you need help.'
          },
          {
            type: 'video',
            title: 'Welcome Video',
            description: 'A warm welcome from your instructor'
          },
          {
            type: 'quiz',
            title: 'What are you most excited to learn in this course?',
            options: ['New technical skills', 'Professional development', 'Industry best practices', 'All of the above!']
          }
        ];
      case 'compliance-training':
        return [
          {
            type: 'header',
            title: '🛡️ Compliance Training Module',
            description: 'This module covers essential policies and procedures that ensure workplace safety and regulatory compliance.'
          },
          {
            type: 'info',
            title: 'Compliance is everyone\'s responsibility. Understanding these policies protects both you and the organization.',
            content: ''
          },
          {
            type: 'section',
            title: '📋 Policy Overview',
            expandable: true
          },
          {
            type: 'section',
            title: '⚠️ Safety Procedures',
            expandable: true
          }
        ];
      case 'product-training':
        return [
          {
            type: 'header',
            title: '🚀 Product Overview',
            description: 'Discover the amazing features and benefits of our latest product innovation.'
          },
          {
            type: 'video',
            title: 'Product Demo Video',
            description: 'Watch a comprehensive demonstration of key features'
          },
          {
            type: 'image',
            title: 'Product Dashboard',
            description: 'Overview of the main interface'
          }
        ];
      case 'skills-development':
        return [
          {
            type: 'header',
            title: '🎓 Skills Development Module',
            description: 'A practical learning approach designed to build real-world competencies.'
          },
          {
            type: 'steps',
            title: 'Learning Path',
            steps: [
              { number: 1, title: '📚 Learn', description: 'Understand core concepts and theory through interactive content' },
              { number: 2, title: '🔨 Practice', description: 'Apply knowledge through hands-on exercises and simulations' },
              { number: 3, title: '✅ Validate', description: 'Demonstrate mastery through assessments and projects' }
            ]
          }
        ];
      case 'innovation-workshop':
        return [
          {
            type: 'header',
            title: '💡 Innovation Workshop',
            description: 'Unlock your creative potential and learn to think outside the box.'
          },
          {
            type: 'quote',
            quote: 'Innovation distinguishes between a leader and a follower.',
            author: 'Steve Jobs'
          },
          {
            type: 'cards',
            title: 'Workshop Overview',
            description: 'Interactive sessions designed to boost creativity'
          }
        ];
      default:
        return [];
    }
  };

  const templateContent = getTemplateContent(template.id);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gray-50">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${template.color} flex items-center justify-center text-white`}>
                {template.icon}
              </div>
              <div>
                {isEditing ? (
                  <Input
                    value={editedTemplate?.name || ''}
                    onChange={(e) => setEditedTemplate(prev => prev ? { ...prev, name: e.target.value } : null)}
                    className="text-lg font-semibold"
                  />
                ) : (
                  <DialogTitle className="text-lg font-semibold">{template.name}</DialogTitle>
                )}
                <Badge className="mt-1">{template.blockCount} blocks</Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={handleEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button onClick={() => onUseTemplate(template.id)}>
                  Use Template
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            {isEditing && (
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={editedTemplate?.description || ''}
                  onChange={(e) => setEditedTemplate(prev => prev ? { ...prev, description: e.target.value } : null)}
                  rows={2}
                />
              </div>
            )}

            {/* Template Preview */}
            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Template Preview</h3>
              <div className="space-y-4">
                {templateContent.map((block, index) => (
                  <div key={index} className="relative">
                    {block.type === 'header' && (
                      <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-4 text-blue-600">{block.title}</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">{block.description}</p>
                      </div>
                    )}
                    
                    {block.type === 'info' && (
                      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white text-sm">ℹ</span>
                          </div>
                          <p className="text-blue-900 font-medium">{block.title}</p>
                        </div>
                      </div>
                    )}

                    {block.type === 'video' && (
                      <div className="bg-white border rounded-lg p-4">
                        <h3 className="font-semibold mb-2">{block.title}</h3>
                        <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center mb-2">
                          <Play className="h-12 w-12 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-600">{block.description}</p>
                      </div>
                    )}

                    {block.type === 'quiz' && (
                      <div className="bg-white border rounded-lg p-6">
                        <h3 className="font-semibold mb-4">{block.title}</h3>
                        <div className="space-y-2">
                          {block.options?.map((option, optIndex) => (
                            <div key={optIndex} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                              <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                              <span className="text-sm">{option}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {block.type === 'section' && (
                      <div className="bg-white border rounded-lg">
                        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
                          <span className="font-medium">{block.title}</span>
                          <span className="text-gray-400">▼</span>
                        </div>
                      </div>
                    )}

                    {block.type === 'image' && (
                      <div className="bg-white border rounded-lg p-4">
                        <h3 className="font-semibold mb-2">{block.title}</h3>
                        <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center mb-2">
                          <span className="text-gray-400">🖼️ Image</span>
                        </div>
                        <p className="text-sm text-gray-600">{block.description}</p>
                      </div>
                    )}

                    {block.type === 'steps' && (
                      <div className="space-y-4">
                        <h3 className="font-semibold text-center">{block.title}</h3>
                        <div className="flex justify-center space-x-8">
                          {block.steps?.map((step, stepIndex) => (
                            <div key={stepIndex} className="text-center max-w-xs">
                              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3 mx-auto">
                                {step.number}
                              </div>
                              <h4 className="font-semibold mb-2">{step.title}</h4>
                              <p className="text-sm text-gray-600">{step.description}</p>
                              {block.steps && stepIndex < block.steps.length - 1 && (
                                <div className="hidden md:block absolute top-8 left-full w-8 h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {block.type === 'quote' && (
                      <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                        <blockquote className="text-lg italic text-purple-900 mb-2">
                          "{block.quote}"
                        </blockquote>
                        <cite className="text-purple-700 font-medium">— {block.author}</cite>
                      </div>
                    )}

                    {isEditing && (
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateDetailModal;