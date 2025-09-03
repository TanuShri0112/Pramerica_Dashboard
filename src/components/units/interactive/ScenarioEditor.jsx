import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Image as ImageIcon, User, MoreVertical, ArrowRight, X, ChevronDown, ChevronRight, GripVertical, ArrowLeft, Upload } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const avatarExpressions = ['Neutral', 'Happy', 'Concerned', 'Confident', 'Thoughtful', 'Disappointed', 'Excited', 'Confused'];

const backgroundImages = [
  '/lovable-Uploads/3baa3c5c-d5d2-4de5-985d-950a1bd028b8.png',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop'
];

const avatarImages = [
  '/lovable-Uploads/37199278-1810-4ac6-891f-e8c2843f45f1.png',
  '/lovable-Uploads/97a3471e-8afd-4382-9ceb-3579bb79cbd9.png',
  '/lovable-Uploads/dd305bcf-12fa-4d91-9db9-56b317dc9cfd.png'
];

export const ScenarioEditor = ({ isOpen, onClose, onSave, initialData }) => {
  const [currentView, setCurrentView] = useState('launch');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [avatarImage, setAvatarImage] = useState('');
  const [scenes, setScenes] = useState([]);
  const [selectedContentId, setSelectedContentId] = useState(null);
  const [selectedSceneId, setSelectedSceneId] = useState(null);
  const [customBackgroundImages, setCustomBackgroundImages] = useState([]);

  useEffect(() => {
    if (initialData && initialData.scenes) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setBackgroundImage(initialData.backgroundImage || backgroundImages[0]);
      setAvatarImage(initialData.avatarImage || avatarImages[0]);
      setScenes(initialData.scenes || []);
    } else {
      const defaultScenes = [
        {
          id: 'scene-1',
          title: 'Scene 1',
          order: 0,
          expanded: true,
          contents: [
            {
              id: 'content-1-1',
              title: 'Content 1.1',
              heading: 'Welcome to the scenario',
              avatarExpression: 'Happy',
              responses: [
                {
                  id: 'response-1',
                  text: 'Continue to learn more',
                  avatarReaction: 'Happy',
                  nextAction: 'next-content'
                }
              ],
              order: 0
            }
          ]
        }
      ];
      setScenes(defaultScenes);
      setSelectedContentId('content-1-1');
      setBackgroundImage(backgroundImages[0]);
      setAvatarImage(avatarImages[0]);
    }
  }, [initialData]);

  const handleContinue = () => {
    setCurrentView('editor');
  };

  const handleSave = () => {
    const scenarioData = {
      interactiveType: 'scenario',
      title,
      description,
      backgroundImage,
      avatarImage,
      scenes
    };
    onSave(scenarioData);
    onClose();
  };

  const addScene = () => {
    const newScene = {
      id: `scene-${Date.now()}`,
      title: `Scene ${scenes.length + 1}`,
      order: scenes.length,
      expanded: true,
      contents: [
        {
          id: `content-${Date.now()}-1`,
          title: `Content ${scenes.length + 1}.1`,
          heading: 'New content block',
          avatarExpression: 'Neutral',
          responses: [],
          order: 0
        }
      ]
    };
    setScenes([...scenes, newScene]);
  };

  const deleteScene = (sceneId) => {
    if (window.confirm('Are you sure you want to delete this scene?')) {
      setScenes(scenes.filter(s => s.id !== sceneId));
      if (selectedSceneId === sceneId) {
        setSelectedSceneId(null);
      }
    }
  };

  const deleteContent = (sceneId, contentId) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      setScenes(scenes.map(scene => 
        scene.id === sceneId 
          ? { ...scene, contents: scene.contents.filter(c => c.id !== contentId) }
          : scene
      ));
      if (selectedContentId === contentId) {
        setSelectedContentId(null);
      }
    }
  };

  const addContent = (sceneId) => {
    const scene = scenes.find(s => s.id === sceneId);
    if (!scene) return;

    const newContent = {
      id: `content-${Date.now()}`,
      title: `Content ${scene.order + 1}.${scene.contents.length + 1}`,
      heading: 'New content block',
      avatarExpression: 'Neutral',
      responses: [],
      order: scene.contents.length
    };

    setScenes(scenes.map(s => 
      s.id === sceneId 
        ? { ...s, contents: [...s.contents, newContent] }
        : s
    ));
  };

  const updateContent = (contentId, updates) => {
    setScenes(scenes.map(scene => ({
      ...scene,
      contents: scene.contents.map(content =>
        content.id === contentId ? { ...content, ...updates } : content
      )
    })));
  };

  const addResponse = (contentId) => {
    const newResponse = {
      id: `response-${Date.now()}`,
      text: 'Add response text...',
      avatarReaction: 'Neutral',
      nextAction: 'next-content'
    };

    setScenes(scenes.map(scene => ({
      ...scene,
      contents: scene.contents.map(content =>
        content.id === contentId
          ? { ...content, responses: [...content.responses, newResponse] }
          : content
      )
    })));
  };

  const updateResponse = (contentId, responseId, updates) => {
    setScenes(scenes.map(scene => ({
      ...scene,
      contents: scene.contents.map(content =>
        content.id === contentId
          ? {
              ...content,
              responses: content.responses.map(response =>
                response.id === responseId ? { ...response, ...updates } : response
              )
            }
          : content
      )
    })));
  };

  const removeResponse = (contentId, responseId) => {
    setScenes(scenes.map(scene => ({
      ...scene,
      contents: scene.contents.map(content =>
        content.id === contentId
          ? {
              ...content,
              responses: content.responses.filter(r => r.id !== responseId)
            }
          : content
      )
    })));
  };

  const toggleSceneExpanded = (sceneId) => {
    setScenes(scenes.map(scene =>
      scene.id === sceneId ? { ...scene, expanded: !scene.expanded } : scene
    ));
  };

  const handleContentSelect = (contentId) => {
    setSelectedContentId(contentId);
    setSelectedSceneId(null);
    setCurrentView('content-editor');
  };

  const handleSceneSelect = (sceneId) => {
    setSelectedSceneId(sceneId);
    setSelectedContentId(null);
    setCurrentView('scene-editor');
  };

  const handleBackToEditor = () => {
    setCurrentView('editor');
    setSelectedContentId(null);
    setSelectedSceneId(null);
  };

  const selectedContent = scenes
    .flatMap(scene => scene.contents)
    .find(content => content.id === selectedContentId);

  const selectedScene = scenes.find(scene => scene.id === selectedSceneId);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        setCustomBackgroundImages(prev => [...prev, result]);
        setBackgroundImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getAllContentBlocks = () => {
    const allContent = [];
    scenes.forEach(scene => {
      scene.contents.forEach(content => {
        allContent.push({
          id: content.id,
          title: content.title,
          sceneTitle: scene.title
        });
      });
    });
    return allContent;
  };

  if (!isOpen) return null;

  if (currentView === 'launch') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div 
          className="w-full h-full relative flex items-center justify-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30" />
          
          <div className="relative z-10 bg-white rounded-lg p-8 max-w-lg mx-4 text-center shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">{title || 'Scenario Title'}</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {description || 'Add text to explain the situation your scenario will address.'}
            </p>
            <Button 
              onClick={handleContinue}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold"
            >
              CONTINUE
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
      </div>
    );
  }

  if (currentView === 'content-editor' && selectedContent) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex">
        <div className="absolute top-0 left-0 right-0 h-16 bg-white border-b flex items-center justify-between px-6 z-20">
          <div className="flex items-center space-x-4">
            <Button 
              onClick={handleBackToEditor}
              variant="ghost"
              size="sm"
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Scenes
            </Button>
            <h1 className="text-xl font-semibold">Edit Content: {selectedContent.title}</h1>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              onClick={handleSave}
              className="bg-black text-white hover:bg-gray-800"
            >
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>

        <div className="w-80 bg-gray-50 border-r flex flex-col mt-16">
          <div className="p-4 border-b bg-white">
            <h3 className="font-semibold text-sm text-gray-600 uppercase tracking-wide mb-4">Content Structure</h3>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              {scenes.map((scene) => (
                <div key={scene.id} className="space-y-1">
                  <Collapsible open={scene.expanded} onOpenChange={() => toggleSceneExpanded(scene.id)}>
                    <CollapsibleTrigger asChild>
                      <div className="flex items-center p-3 rounded-lg border bg-white hover:bg-gray-50 cursor-pointer">
                        <GripVertical className="h-4 w-4 text-gray-400 mr-2" />
                        {scene.expanded ? (
                          <ChevronDown className="h-4 w-4 text-gray-500 mr-2" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-gray-500 mr-2" />
                        )}
                        <span className="text-lg mr-2">🎬</span>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{scene.title}</div>
                          <div className="text-xs text-gray-500">{scene.contents.length} content block(s)</div>
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent className="ml-6 mt-2 space-y-1">
                      {scene.contents.map((content) => (
                        <div
                          key={content.id}
                          className={`p-2 rounded-lg border cursor-pointer transition-colors ${
                            selectedContentId === content.id 
                              ? 'bg-blue-50 border-blue-200' 
                              : 'bg-white border-gray-200 hover:bg-gray-50'
                          }`}
                          onClick={() => handleContentSelect(content.id)}
                        >
                          <div className="flex items-center space-x-2">
                            <GripVertical className="h-3 w-3 text-gray-400" />
                            <span className="text-sm">💬</span>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-gray-900">{content.title}</div>
                              <div className="text-xs text-gray-500 truncate">{content.heading}</div>
                            </div>
                            <div className="text-xs text-gray-400">{content.responses.length}R</div>
                          </div>
                        </div>
                      ))}
                      
                      <Button
                        onClick={() => addContent(scene.id)}
                        variant="ghost"
                        size="sm"
                        className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Content
                      </Button>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 bg-white border-t space-y-2">
            <Button onClick={addScene} variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Scene
            </Button>
          </div>
        </div>

        <div className="flex-1 flex flex-col mt-16">
          <ScrollArea className="flex-1">
            <div className="p-6">
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-3">{selectedContent.title}</h2>
                  <p className="text-gray-600 text-lg">Configure this content block's settings, avatar expression, and response options.</p>
                </div>

                <div className="space-y-3 bg-white p-6 rounded-lg border shadow-sm">
                  <Label className="text-lg font-semibold flex items-center">
                    <span className="text-blue-600 mr-2">📝</span>
                    Content Heading
                  </Label>
                  <Input
                    value={selectedContent.heading}
                    onChange={(e) => updateContent(selectedContent.id, { heading: e.target.value })}
                    placeholder="Enter the main heading or instructions for this content"
                    className="text-lg py-3"
                  />
                  <p className="text-sm text-gray-500">This heading will be displayed to learners when they reach this content block.</p>
                </div>

                <div className="space-y-3 bg-white p-6 rounded-lg border shadow-sm">
                  <Label className="text-lg font-semibold flex items-center">
                    <span className="text-purple-600 mr-2">😊</span>
                    Avatar Expression
                  </Label>
                  <div className="flex items-center space-x-4">
                    <img 
                      src={avatarImage}
                      alt="Avatar"
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                    />
                    <Select 
                      value={selectedContent.avatarExpression} 
                      onValueChange={(value) => updateContent(selectedContent.id, { avatarExpression: value })}
                    >
                      <SelectTrigger className="w-64">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {avatarExpressions.map(expression => (
                          <SelectItem key={expression} value={expression}>{expression}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-sm text-gray-500">Choose how the avatar should appear when learners see this content.</p>
                </div>

                <div className="space-y-4 bg-white p-6 rounded-lg border shadow-sm">
                  <div className="flex items-center justify-between">
                    <Label className="text-lg font-semibold flex items-center">
                      <span className="text-green-600 mr-2">💬</span>
                      Response Options
                    </Label>
                    <Button 
                      onClick={() => addResponse(selectedContent.id)}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Response
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {selectedContent.responses.map((response, index) => (
                      <div key={response.id} className="border-2 border-gray-100 rounded-lg p-5 space-y-4 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <Label className="font-semibold text-gray-900">Response {index + 1}</Label>
                          <Button
                            onClick={() => removeResponse(selectedContent.id, response.id)}
                            size="sm"
                            variant="ghost"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-700">Response Text</Label>
                            <Textarea
                              value={response.text}
                              onChange={(e) => updateResponse(selectedContent.id, response.id, { text: e.target.value })}
                              className="mt-2"
                              rows={3}
                              placeholder="Enter what the learner can choose or say..."
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium text-gray-700">Avatar Reaction</Label>
                              <Select 
                                value={response.avatarReaction || 'Neutral'} 
                                onValueChange={(value) => updateResponse(selectedContent.id, response.id, { avatarReaction: value })}
                              >
                                <SelectTrigger className="mt-2">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {avatarExpressions.map(expression => (
                                    <SelectItem key={expression} value={expression}>{expression}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label className="text-sm font-medium text-gray-700">What Happens Next</Label>
                              <Select 
                                value={response.nextAction} 
                                onValueChange={(value) => updateResponse(selectedContent.id, response.id, { nextAction: value })}
                              >
                                <SelectTrigger className="mt-2">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="next-content">Next Content Block</SelectItem>
                                  <SelectItem value="next-scene">Next Scene</SelectItem>
                                  <SelectItem value="specific-content">Jump to Specific Content</SelectItem>
                                  <SelectItem value="end-scenario">End Scenario</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          {response.nextAction === 'specific-content' && (
                            <div>
                              <Label className="text-sm font-medium text-gray-700">Choose Target Content</Label>
                              <Select 
                                value={response.nextContentId || ''} 
                                onValueChange={(value) => updateResponse(selectedContent.id, response.id, { nextContentId: value })}
                              >
                                <SelectTrigger className="mt-2">
                                  <SelectValue placeholder="Select content block..." />
                                </SelectTrigger>
                                <SelectContent>
                                  {getAllContentBlocks()
                                    .filter(content => content.id !== selectedContent.id)
                                    .map((content) => (
                                      <SelectItem key={content.id} value={content.id}>
                                        {content.title} ({content.sceneTitle})
                                      </SelectItem>
                                    ))}
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {selectedContent.responses.length === 0 && (
                      <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                        <div className="text-4xl mb-4">💭</div>
                        <p className="text-lg mb-4 font-medium">No responses added yet</p>
                        <p className="text-sm mb-6">Add response options that learners can choose from.</p>
                        <Button onClick={() => addResponse(selectedContent.id)} className="bg-green-600 hover:bg-green-700">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Your First Response
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t">
                  <Button 
                    onClick={handleBackToEditor}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                  >
                    Save & Go Back
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    );
  }

  if (currentView === 'scene-editor' && selectedScene) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex">
        <div className="absolute top-0 left-0 right-0 h-16 bg-white border-b flex items-center justify-between px-6 z-20">
          <div className="flex items-center space-x-4">
            <Button 
              onClick={handleBackToEditor}
              variant="ghost"
              size="sm"
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Scenes
            </Button>
            <h1 className="text-xl font-semibold">Edit Scene: {selectedScene.title}</h1>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              onClick={handleSave}
              className="bg-black text-white hover:bg-gray-800"
            >
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>

        <div className="w-80 bg-gray-50 border-r flex flex-col mt-16">
          <div className="p-4 border-b bg-white">
            <h3 className="font-semibold text-sm text-gray-600 uppercase tracking-wide mb-4">Content Structure</h3>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              {scenes.map((scene) => (
                <div key={scene.id} className="space-y-1">
                  <Collapsible open={scene.expanded} onOpenChange={() => toggleSceneExpanded(scene.id)}>
                    <CollapsibleTrigger asChild>
                      <div className={`flex items-center p-3 rounded-lg border bg-white hover:bg-gray-50 cursor-pointer group ${
                        selectedSceneId === scene.id ? 'bg-blue-50 border-blue-200' : ''
                      }`}>
                        <GripVertical className="h-4 w-4 text-gray-400 mr-2" />
                        {scene.expanded ? (
                          <ChevronDown className="h-4 w-4 text-gray-500 mr-2" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-gray-500 mr-2" />
                        )}
                        <span className="text-lg mr-2">🎬</span>
                        <div 
                          className="flex-1 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSceneSelect(scene.id);
                          }}
                        >
                          <div className="text-sm font-medium text-gray-900">{scene.title}</div>
                          <div className="text-xs text-gray-500">{scene.contents.length} content block(s)</div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="opacity-0 group-hover:opacity-100 text-red-600 hover:text-red-700 hover:bg-red-50 p-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteScene(scene.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent className="ml-6 mt-2 space-y-1">
                      {scene.contents.map((content) => (
                        <div
                          key={content.id}
                          className={`p-2 rounded-lg border cursor-pointer transition-colors group ${
                            selectedContentId === content.id 
                              ? 'bg-blue-50 border-blue-200' 
                              : 'bg-white border-gray-200 hover:bg-gray-50'
                          }`}
                          onClick={() => handleContentSelect(content.id)}
                        >
                          <div className="flex items-center space-x-2">
                            <GripVertical className="h-3 w-3 text-gray-400" />
                            <span className="text-sm">💬</span>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-gray-900">{content.title}</div>
                              <div className="text-xs text-gray-500 truncate">{content.heading}</div>
                            </div>
                            <div className="text-xs text-gray-400">{content.responses.length}R</div>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="opacity-0 group-hover:opacity-100 text-red-600 hover:text-red-700 hover:bg-red-50 p-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteContent(scene.id, content.id);
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      <Button
                        onClick={() => addContent(scene.id)}
                        variant="ghost"
                        size="sm"
                        className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Content
                      </Button>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 bg-white border-t space-y-2">
            <Button onClick={addScene} variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Scene
            </Button>
          </div>
        </div>

        <div className="flex-1 flex flex-col mt-16">
          <ScrollArea className="flex-1">
            <div className="p-6">
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-3">{selectedScene.title}</h2>
                  <p className="text-gray-600 text-lg">Configure this scene's basic settings and appearance.</p>
                </div>

                <div className="space-y-3 bg-white p-6 rounded-lg border shadow-sm">
                  <Label className="text-lg font-semibold flex items-center">
                    <span className="text-blue-600 mr-2">🎬</span>
                    Scene Title
                  </Label>
                  <Input
                    value={selectedScene.title}
                    onChange={(e) => {
                      setScenes(scenes.map(scene =>
                        scene.id === selectedScene.id ? { ...scene, title: e.target.value } : scene
                      ));
                    }}
                    placeholder="Enter scene title"
                    className="text-lg py-3"
                  />
                  <p className="text-sm text-gray-500">This title helps organize your scenario structure.</p>
                </div>

                <div className="space-y-3 bg-white p-6 rounded-lg border shadow-sm">
                  <Label className="text-lg font-semibold flex items-center">
                    <span className="text-green-600 mr-2">🖼️</span>
                    Background Image
                  </Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="cursor-pointer rounded-lg overflow-hidden border-2 border-dashed border-gray-300 hover:border-gray-400 transition-all bg-gray-50 relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                      />
                      <div className="h-20 flex flex-col items-center justify-center text-gray-500 relative z-0">
                        <Upload className="h-6 w-6 mb-1" />
                        <span className="text-xs font-medium">Upload Background</span>
                      </div>
                    </div>
                    
                    {customBackgroundImages.map((image, index) => (
                      <div
                        key={`custom-${index}`}
                        className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                          backgroundImage === image ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setBackgroundImage(image)}
                      >
                        <img src={image} alt={`Custom Background ${index + 1}`} className="w-full h-20 object-cover" />
                      </div>
                    ))}
                    
                    {backgroundImages.map((image, index) => (
                      <div
                        key={index}
                        className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                          backgroundImage === image ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setBackgroundImage(image)}
                      >
                        <img src={image} alt={`Background ${index + 1}`} className="w-full h-20 object-cover" />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">Choose a background image for this scene or upload your own.</p>
                </div>

                <div className="space-y-3 bg-white p-6 rounded-lg border shadow-sm">
                  <Label className="text-lg font-semibold flex items-center">
                    <span className="text-purple-600 mr-2">👤</span>
                    Avatar Character
                  </Label>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-6">
                      <div
                        className={`cursor-pointer p-4 rounded-lg border-2 transition-all text-center ${
                          avatarImage === '/lovable-Uploads/37199278-1810-4ac6-891f-e8c2843f45f1.png' ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50' : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                        onClick={() => setAvatarImage('/lovable-Uploads/37199278-1810-4ac6-891f-e8c2843f45f1.png')}
                      >
                        <div className="mb-3 flex justify-center">
                          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                            <img 
                              src="/lovable-Uploads/37199278-1810-4ac6-891f-e8c2843f45f1.png" 
                              alt="Business Woman"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">Business Woman</span>
                      </div>

                      <div
                        className={`cursor-pointer p-4 rounded-lg border-2 transition-all text-center ${
                          avatarImage === '/lovable-Uploads/97a3471e-8afd-4382-9ceb-3579bb79cbd9.png' ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50' : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                        onClick={() => setAvatarImage('/lovable-Uploads/97a3471e-8afd-4382-9ceb-3579bb79cbd9.png')}
                      >
                        <div className="mb-3 flex justify-center">
                          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                            <img 
                              src="/lovable-Uploads/97a3471e-8afd-4382-9ceb-3579bb79cbd9.png" 
                              alt="Casual Woman"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">Casual Woman</span>
                      </div>

                      <div
                        className={`cursor-pointer p-4 rounded-lg border-2 transition-all text-center ${
                          avatarImage === '/lovable-Uploads/dd305bcf-12fa-4d91-9db9-56b317dc9cfd.png' ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50' : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                        onClick={() => setAvatarImage('/lovable-Uploads/dd305bcf-12fa-4d91-9db9-56b317dc9cfd.png')}
                      >
                        <div className="mb-3 flex justify-center">
                          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                            <img 
                              src="/lovable-Uploads/dd305bcf-12fa-4d91-9db9-56b317dc9cfd.png" 
                              alt="Teacher"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">Teacher</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Select the avatar character for this scene.</p>
                </div>

                <div className="flex justify-end pt-6 border-t">
                  <Button 
                    onClick={handleBackToEditor}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                  >
                    Save & Go Back
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-50 flex">
      <div className="absolute top-0 left-0 right-0 h-16 bg-white border-b flex items-center justify-between px-6 z-20">
        <h1 className="text-xl font-semibold">Scenario Editor</h1>
        <div className="flex items-center space-x-3">
          <Button 
            onClick={handleSave}
            className="bg-black text-white hover:bg-gray-800"
          >
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>

      <div className="w-80 bg-gray-50 border-r flex flex-col mt-16">
        <div className="p-4 border-b bg-white">
          <h3 className="font-semibold text-sm text-gray-600 uppercase tracking-wide mb-4">Content Structure</h3>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-2">
            {scenes.map((scene) => (
              <div key={scene.id} className="space-y-1">
                <Collapsible open={scene.expanded}>
                  <div className={`flex items-center p-3 rounded-lg border bg-white hover:bg-gray-50 group ${
                    selectedSceneId === scene.id ? 'bg-blue-50 border-blue-200' : ''
                  }`}>
                    <GripVertical className="h-4 w-4 text-gray-400 mr-2" />
                    <CollapsibleTrigger asChild>
                      <button 
                        className="flex items-center mr-2"
                        onClick={() => toggleSceneExpanded(scene.id)}
                      >
                        {scene.expanded ? (
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                    </CollapsibleTrigger>
                    <span className="text-lg mr-2">🎬</span>
                    <div 
                      className="flex-1 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSceneSelect(scene.id);
                      }}
                    >
                      <div className="text-sm font-medium text-gray-900">{scene.title}</div>
                      <div className="text-xs text-gray-500">{scene.contents.length} content block(s)</div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="opacity-0 group-hover:opacity-100 text-red-600 hover:text-red-700 hover:bg-red-50 p-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteScene(scene.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <CollapsibleContent className="ml-6 mt-2 space-y-1">
                    {scene.contents.map((content) => (
                      <div
                        key={content.id}
                        className={`p-2 rounded-lg border cursor-pointer transition-colors group ${
                          selectedContentId === content.id 
                            ? 'bg-blue-50 border-blue-200' 
                            : 'bg-white border-gray-200 hover:bg-gray-50'
                        }`}
                        onClick={() => handleContentSelect(content.id)}
                      >
                        <div className="flex items-center space-x-2">
                          <GripVertical className="h-3 w-3 text-gray-400" />
                          <span className="text-sm">💬</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900">{content.title}</div>
                            <div className="text-xs text-gray-500 truncate">{content.heading}</div>
                          </div>
                          <div className="text-xs text-gray-400">{content.responses.length}R</div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="opacity-0 group-hover:opacity-100 text-red-600 hover:text-red-700 hover:bg-red-50 p-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteContent(scene.id, content.id);
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    <Button
                      onClick={() => addContent(scene.id)}
                      variant="ghost"
                      size="sm"
                      className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Content
                    </Button>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 bg-white border-t space-y-2">
          <Button onClick={addScene} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Scene
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col mt-16">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500 max-w-md">
            <div className="text-6xl mb-6">🎬</div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">Select Content to Edit</h3>
            <p className="text-lg mb-6">Choose a scene or content block from the left sidebar to start editing.</p>
            <div className="text-sm text-gray-400">
              <p>💡 Tip: Click on a scene to edit its background and avatar, or click on content blocks to edit their responses.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};