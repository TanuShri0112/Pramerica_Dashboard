import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const CourseModulesAdmin = () => {
  const { toast } = useToast();

  const [currentModuleSettings, setCurrentModuleSettings] = useState({
    onlyShowUpToCurrent: false,
    hideIfNoCurrentLesson: false,
    autoSetCurrentByDate: false
  });

  const [layoutSettings, setLayoutSettings] = useState({
    moduleDescriptions: true,
    autoNumberModules: true,
    quickNavigation: false
  });

  const [dripContentEnabled, setDripContentEnabled] = useState(false);

  const handleCurrentModuleChange = (key, value) => {
    setCurrentModuleSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Setting updated",
      description: `Current module setting has been ${value ? 'enabled' : 'disabled'}`,
      duration: 2000,
    });
  };

  const handleLayoutChange = (key, value) => {
    setLayoutSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Layout updated",
      description: `Layout setting has been ${value ? 'enabled' : 'disabled'}`,
      duration: 2000,
    });
  };

  const handleEnableDripContent = () => {
    setDripContentEnabled(true);
    toast({
      title: "Drip content enabled",
      description: "Modules will now unlock on a preset schedule",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Current Module Section */}
      <Card>
        <CardHeader>
          <CardTitle>Current module</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <span className="font-medium text-sm">Feature</span>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="showUpToCurrent"
                  checked={currentModuleSettings.onlyShowUpToCurrent}
                  onCheckedChange={(checked) =>
                    handleCurrentModuleChange('onlyShowUpToCurrent', !!checked)
                  }
                />
                <label htmlFor="showUpToCurrent" className="text-sm leading-relaxed">
                  Only show modules up to the current lesson to learners
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="hideIfNoLesson"
                  checked={currentModuleSettings.hideIfNoCurrentLesson}
                  onCheckedChange={(checked) =>
                    handleCurrentModuleChange('hideIfNoCurrentLesson', !!checked)
                  }
                />
                <label htmlFor="hideIfNoLesson" className="text-sm leading-relaxed">
                  Hide (instead of showing) all modules if no current lesson is set
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="autoSetByDate"
                  checked={currentModuleSettings.autoSetCurrentByDate}
                  onCheckedChange={(checked) =>
                    handleCurrentModuleChange('autoSetCurrentByDate', !!checked)
                  }
                />
                <label htmlFor="autoSetByDate" className="text-sm leading-relaxed">
                  Automatically set current module by date
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Drip Content Section */}
      <Card>
        <CardHeader>
          <CardTitle>Drip content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Enable this feature to unlock modules on a preset schedule.
          </p>
          <Button
            onClick={handleEnableDripContent}
            className="bg-blue-500 hover:bg-blue-600 text-white"
            disabled={dripContentEnabled}
          >
            + Enable
          </Button>
          {dripContentEnabled && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-800">
                Drip content is now enabled. Configure schedule settings in the Schedule tab.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Layout Section */}
      <Card>
        <CardHeader>
          <CardTitle>Layout</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <span className="font-medium text-sm">Feature</span>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="moduleDescriptions"
                  checked={layoutSettings.moduleDescriptions}
                  onCheckedChange={(checked) =>
                    handleLayoutChange('moduleDescriptions', !!checked)
                  }
                />
                <label htmlFor="moduleDescriptions" className="text-sm leading-relaxed">
                  Module descriptions
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="autoNumberModules"
                  checked={layoutSettings.autoNumberModules}
                  onCheckedChange={(checked) =>
                    handleLayoutChange('autoNumberModules', !!checked)
                  }
                />
                <label htmlFor="autoNumberModules" className="text-sm leading-relaxed">
                  Automatically number modules
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="quickNavigation"
                  checked={layoutSettings.quickNavigation}
                  onCheckedChange={(checked) =>
                    handleLayoutChange('quickNavigation', !!checked)
                  }
                />
                <label htmlFor="quickNavigation" className="text-sm leading-relaxed">
                  Quick navigation shortcuts (/content/)
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseModulesAdmin;
