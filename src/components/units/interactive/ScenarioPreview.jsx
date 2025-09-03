import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const ScenarioPreview = ({ data, onClose }) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [showStart, setShowStart] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentScene = data.scenes[currentSceneIndex];
  const currentContent = currentScene?.contents[currentContentIndex];

  const handleStart = () => {
    if (!data.scenes || data.scenes.length === 0) {
      toast({
        title: "No scenes added yet",
        description: "Please add at least one scene to begin the scenario.",
        variant: "destructive",
      });
      return;
    }

    const hasContent = data.scenes.some(scene => scene.contents && scene.contents.length > 0);
    if (!hasContent) {
      toast({
        title: "No scenes added yet",
        description: "Please add at least one scene to begin the scenario.",
        variant: "destructive",
      });
      return;
    }

    setShowStart(false);
  };

  const handleResponseClick = (response) => {
    setSelectedResponse(response.id);
    setShowFeedback(true);

    setTimeout(() => {
      handleNavigation(response);
    }, 1500);
  };

  const handleNavigation = (response) => {
    switch (response.nextAction) {
      case 'next-content':
        if (currentContentIndex < currentScene.contents.length - 1) {
          setCurrentContentIndex(currentContentIndex + 1);
        } else {
          if (currentSceneIndex < data.scenes.length - 1) {
            setCurrentSceneIndex(currentSceneIndex + 1);
            setCurrentContentIndex(0);
          } else {
            setIsComplete(true);
          }
        }
        break;
      case 'next-scene':
        if (currentSceneIndex < data.scenes.length - 1) {
          setCurrentSceneIndex(currentSceneIndex + 1);
          setCurrentContentIndex(0);
        } else {
          setIsComplete(true);
        }
        break;
      case 'specific-content':
        for (let sceneIdx = 0; sceneIdx < data.scenes.length; sceneIdx++) {
          const scene = data.scenes[sceneIdx];
          const contentIdx = scene.contents.findIndex(c => c.id === response.nextContentId);
          if (contentIdx !== -1) {
            setCurrentSceneIndex(sceneIdx);
            setCurrentContentIndex(contentIdx);
            break;
          }
        }
        break;
      case 'end-scenario':
        setIsComplete(true);
        break;
    }
    
    setSelectedResponse(null);
    setShowFeedback(false);
  };

  const handleRestart = () => {
    setCurrentSceneIndex(0);
    setCurrentContentIndex(0);
    setShowStart(true);
    setIsComplete(false);
    setSelectedResponse(null);
    setShowFeedback(false);
  };

  if (showStart) {
    return (
      <div 
        className="w-full h-full min-h-[400px] relative flex items-center justify-center rounded-lg overflow-hidden"
        style={{
          backgroundImage: `url(${data.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        
        <div className="relative z-10 bg-white rounded-lg p-8 max-w-lg mx-4 text-center shadow-2xl">
          <h2 className="text-2xl font-bold mb-4">{data.title}</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {data.description}
          </p>
          <Button 
            onClick={handleStart}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold"
          >
            START SCENARIO
          </Button>
        </div>

        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        )}
      </div>
    );
  }

  if (isComplete) {
    return (
      <div 
        className="w-full h-full min-h-[400px] relative flex items-center justify-center rounded-lg overflow-hidden"
        style={{
          backgroundImage: `url(${data.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        
        <div className="relative z-10 bg-white rounded-lg p-8 max-w-lg mx-4 text-center shadow-2xl">
          <h2 className="text-2xl font-bold mb-4">Scenario Complete!</h2>
          <p className="text-gray-600 mb-8">
            You have successfully completed the scenario. Great job!
          </p>
          <div className="space-y-3">
            <Button 
              onClick={handleRestart}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Restart Scenario
            </Button>
            {onClose && (
              <Button 
                onClick={onClose}
                variant="outline"
                className="w-full"
              >
                Close
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-full h-full min-h-[400px] relative flex rounded-lg overflow-hidden"
      style={{
        backgroundImage: `url(${data.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-20" />
      
      {data.avatarImage && (
        <div className="relative z-10 flex-shrink-0 w-1/3 flex items-end justify-center p-8">
          <img 
            src={data.avatarImage}
            alt="Scenario Avatar"
            className="max-h-full w-auto object-contain"
            style={{ maxHeight: '80%' }}
          />
        </div>
      )}
      
      <div className="relative z-10 flex-1 flex flex-col justify-center p-8">
        <div className="bg-white rounded-lg p-6 shadow-xl max-w-md">
          <div className="mb-4">
            <div className="text-xs text-gray-500 mb-2">
              Scene {currentSceneIndex + 1}.{currentContentIndex + 1} of {data.scenes.length} scenes
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ 
                  width: `${((currentSceneIndex * data.scenes[0].contents.length + currentContentIndex + 1) / 
                    (data.scenes.reduce((acc, scene) => acc + scene.contents.length, 0))) * 100}%` 
                }}
              />
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4">{currentContent?.heading}</h3>
          
          <div className="space-y-3">
            {currentContent?.responses.map((response) => (
              <Button
                key={response.id}
                onClick={() => handleResponseClick(response)}
                disabled={showFeedback}
                variant={selectedResponse === response.id ? "default" : "outline"}
                className={`w-full text-left justify-start h-auto p-4 transition-all ${
                  selectedResponse === response.id 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span>{response.text}</span>
                  {selectedResponse === response.id && showFeedback && (
                    <ArrowRight className="h-4 w-4 ml-auto" />
                  )}
                </div>
              </Button>
            ))}
          </div>

          {showFeedback && selectedResponse && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                Moving to next content...
              </p>
            </div>
          )}
        </div>
      </div>

      {onClose && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 z-20"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
      )}
    </div>
  );
};

export default ScenarioPreview;