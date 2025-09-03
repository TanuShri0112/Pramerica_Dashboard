import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X, Upload, Edit } from 'lucide-react';

export const LabeledGraphicEditor = ({ isOpen, onClose, onSave, initialData }) => {
  const [backgroundImage, setBackgroundImage] = useState(initialData?.backgroundImage || '/lovable-uploads/3a718759-c44f-45df-b009-e1676b03183e.png');
  const [hotspots, setHotspots] = useState(initialData?.hotspots || []);
  const [showingHotspotForm, setShowingHotspotForm] = useState(false);
  const [newHotspot, setNewHotspot] = useState({});
  const [editingHotspot, setEditingHotspot] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (result) {
          setBackgroundImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
    // Reset the input value to allow selecting the same file again
    event.target.value = '';
  };

  const handleAddHotspot = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Don't add hotspot if we're editing one
    if (editingHotspot) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const id = `hotspot_${Date.now()}`;
    setNewHotspot({
      id,
      x: Math.round(x * 100) / 100,
      y: Math.round(y * 100) / 100,
      label: '',
      description: ''
    });
    setShowingHotspotForm(true);
  };

  const handleEditHotspot = (hotspot, e) => {
    e.stopPropagation();
    setEditingHotspot({ ...hotspot });
    setShowingHotspotForm(false);
  };

  const saveHotspot = () => {
    if (newHotspot.label && newHotspot.description && newHotspot.id) {
      setHotspots([...hotspots, newHotspot]);
      setNewHotspot({});
      setShowingHotspotForm(false);
    }
  };

  const saveEditedHotspot = () => {
    if (editingHotspot) {
      setHotspots(prev => prev.map(h => 
        h.id === editingHotspot.id ? editingHotspot : h
      ));
      setEditingHotspot(null);
    }
  };

  const removeHotspot = (id) => {
    setHotspots(hotspots.filter(h => h.id !== id));
    if (editingHotspot?.id === id) {
      setEditingHotspot(null);
    }
  };

  const cancelEdit = () => {
    setEditingHotspot(null);
    setShowingHotspotForm(false);
    setNewHotspot({});
  };

  const handleSave = () => {
    onSave({
      interactiveType: 'labeled-graphic',
      backgroundImage,
      hotspots
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Labeled Graphic</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <Label htmlFor="background">Background Image</Label>
            <div className="flex space-x-2">
              <Input
                id="background"
                value={backgroundImage}
                onChange={(e) => setBackgroundImage(e.target.value)}
                placeholder="Enter image URL or upload a file"
              />
              <label className="relative cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button variant="outline" size="sm" type="button" asChild>
                  <span>
                    <Upload className="w-4 h-4 mr-1" />
                    Upload
                  </span>
                </Button>
              </label>
            </div>
          </div>

          <div>
            <Label>Interactive Image - Click to add hotspots</Label>
            <div 
              className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden cursor-crosshair border-2 border-dashed border-gray-300 hover:border-blue-400"
              style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              onClick={handleAddHotspot}
            >
              {!backgroundImage && (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2" />
                    <p>Upload an image and click to add hotspots</p>
                  </div>
                </div>
              )}
              
              {hotspots.map((hotspot, index) => (
                <div
                  key={hotspot.id}
                  className="absolute w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:bg-blue-700 border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${hotspot.x}%`,
                    top: `${hotspot.y}%`
                  }}
                  onClick={(e) => handleEditHotspot(hotspot, e)}
                  title={`${hotspot.label} - Click to edit`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Click on the image to add hotspots. Click on existing hotspots to edit them.
            </p>
          </div>

          {/* Edit Existing Hotspot Form */}
          {editingHotspot && (
            <div className="border p-4 rounded-lg bg-blue-50 border-blue-200">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Edit className="w-4 h-4" />
                Edit Hotspot
              </h4>
              <div className="space-y-3">
                <div>
                  <Label>Label</Label>
                  <Input
                    value={editingHotspot.label}
                    onChange={(e) => setEditingHotspot({...editingHotspot, label: e.target.value})}
                    placeholder="Hotspot label"
                  />
                </div>
                
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={editingHotspot.description}
                    onChange={(e) => setEditingHotspot({...editingHotspot, description: e.target.value})}
                    placeholder="Hotspot description"
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={saveEditedHotspot} size="sm" disabled={!editingHotspot.label || !editingHotspot.description}>
                    Save Changes
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={cancelEdit} 
                    size="sm"
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={() => removeHotspot(editingHotspot.id)} 
                    size="sm"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Add New Hotspot Form */}
          {showingHotspotForm && (
            <div className="border p-4 rounded-lg bg-gray-50">
              <h4 className="font-medium mb-3">Add Hotspot Content</h4>
              <div className="space-y-3">
                <div>
                  <Label>Label</Label>
                  <Input
                    value={newHotspot.label || ''}
                    onChange={(e) => setNewHotspot({...newHotspot, label: e.target.value})}
                    placeholder="Hotspot label"
                  />
                </div>
                
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={newHotspot.description || ''}
                    onChange={(e) => setNewHotspot({...newHotspot, description: e.target.value})}
                    placeholder="Hotspot description"
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={saveHotspot} size="sm" disabled={!newHotspot.label || !newHotspot.description}>
                    Add Hotspot
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={cancelEdit} 
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {hotspots.length > 0 && !editingHotspot && (
            <div>
              <h4 className="font-medium mb-3">Configured Hotspots</h4>
              <div className="space-y-2">
                {hotspots.map((hotspot, index) => (
                  <div key={hotspot.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div className="flex-1">
                      <span className="font-medium">{index + 1}. {hotspot.label}</span>
                      <p className="text-sm text-gray-600">{hotspot.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setEditingHotspot({ ...hotspot })}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => removeHotspot(hotspot.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LabeledGraphicEditor;