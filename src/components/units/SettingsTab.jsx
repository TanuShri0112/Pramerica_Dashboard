import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SettingsTab = ({ settings, onUpdateSettings }) => {
  const themes = [
    { value: 'modern', label: 'Modern' },
    { value: 'classic', label: 'Classic' },
    { value: 'minimal', label: 'Minimal' },
    { value: 'creative', label: 'Creative' }
  ];

  const fonts = [
    { value: 'Inter', label: 'Inter' },
    { value: 'Roboto', label: 'Roboto' },
    { value: 'Open Sans', label: 'Open Sans' },
    { value: 'Poppins', label: 'Poppins' },
    { value: 'Lato', label: 'Lato' }
  ];

  const colors = [
    { value: '#3b82f6', label: 'Blue', color: '#3b82f6' },
    { value: '#10b981', label: 'Green', color: '#10b981' },
    { value: '#f59e0b', label: 'Orange', color: '#f59e0b' },
    { value: '#ef4444', label: 'Red', color: '#ef4444' },
    { value: '#8b5cf6', label: 'Purple', color: '#8b5cf6' },
    { value: '#06b6d4', label: 'Cyan', color: '#06b6d4' }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Lesson Settings</h3>
        <p className="text-xs text-gray-600">Customize your lesson appearance and details</p>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-6 pb-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Lesson Title</Label>
                  <Input
                    id="title"
                    value={settings.title}
                    onChange={(e) => onUpdateSettings({ title: e.target.value })}
                    placeholder="Enter lesson title"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={settings.description}
                    onChange={(e) => onUpdateSettings({ description: e.target.value })}
                    placeholder="Enter lesson description"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Appearance */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Appearance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select value={settings.theme} onValueChange={(value) => onUpdateSettings({ theme: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      {themes.map((theme) => (
                        <SelectItem key={theme.value} value={theme.value}>
                          {theme.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="font">Font Family</Label>
                  <Select value={settings.fontFamily} onValueChange={(value) => onUpdateSettings({ fontFamily: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                      {fonts.map((font) => (
                        <SelectItem key={font.value} value={font.value}>
                          <span style={{ fontFamily: font.value }}>{font.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Primary Color</Label>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => onUpdateSettings({ primaryColor: color.value })}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          settings.primaryColor === color.value 
                            ? 'border-gray-800 scale-110' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        style={{ backgroundColor: color.color }}
                        title={color.label}
                      />
                    ))}
                  </div>
                  <Input
                    value={settings.primaryColor}
                    onChange={(e) => onUpdateSettings({ primaryColor: e.target.value })}
                    placeholder="Custom color (e.g., #3b82f6)"
                    className="text-xs"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 border rounded-lg bg-gray-50">
                  <h3 
                    className="text-lg font-semibold mb-2"
                    style={{ 
                      fontFamily: settings.fontFamily,
                      color: settings.primaryColor 
                    }}
                  >
                    {settings.title || 'Sample Lesson Title'}
                  </h3>
                  <p 
                    className="text-gray-600 text-sm"
                    style={{ fontFamily: settings.fontFamily }}
                  >
                    {settings.description || 'This is how your lesson description will appear to students.'}
                  </p>
                  <div 
                    className="mt-3 px-3 py-2 rounded text-white text-sm inline-block"
                    style={{ backgroundColor: settings.primaryColor }}
                  >
                    Sample Button
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
