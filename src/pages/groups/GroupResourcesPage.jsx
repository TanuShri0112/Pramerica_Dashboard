import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MinusCircle, FileText, Upload, Download, Trash2, ExternalLink, Plus } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AddResourceModal } from '@/components/groups/AddResourceModal';

const GroupResourcesPage = () => {
  const [selectedResources, setSelectedResources] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [resourceToDelete, setResourceToDelete] = useState(null);
  
  const [resources, setResources] = useState([
    { 
      id: 1, 
      name: 'Project Guidelines Document', 
      type: 'PDF', 
      dateAdded: '2025-03-15',
      size: '1.2 MB',
      description: 'Comprehensive guidelines for project development and submission requirements.'
    },
    { 
      id: 2, 
      name: 'React Best Practices', 
      type: 'Link', 
      dateAdded: '2025-03-10',
      size: 'N/A',
      description: 'External resource covering React development best practices.',
      isLink: true,
      url: 'https://react.dev/learn'
    },
    { 
      id: 3, 
      name: 'Assignment Template', 
      type: 'DOCX', 
      dateAdded: '2025-03-08',
      size: '856 KB',
      description: 'Standard template for assignment submissions.'
    }
  ]);

  const handleSelectResource = (id, checked) => {
    if (checked) {
      setSelectedResources(prev => [...prev, id]);
    } else {
      setSelectedResources(prev => prev.filter(resourceId => resourceId !== id));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedResources(resources.map(r => r.id));
    } else {
      setSelectedResources([]);
    }
  };

  const handleRemove = () => {
    if (selectedResources.length === 0) {
      toast.error("Please select resources to remove");
      return;
    }
    
    setResources(prev => prev.filter(r => !selectedResources.includes(r.id)));
    toast.success(`${selectedResources.length} resource(s) removed`);
    setSelectedResources([]);
  };

  const handleExport = () => {
    if (selectedResources.length === 0) {
      toast.error("Please select resources to export");
      return;
    }
    toast.success(`Exporting ${selectedResources.length} resource(s)`);
  };

  const handleAddResource = (resourceData) => {
    const newResource = {
      id: Date.now(),
      name: resourceData.title,
      type: resourceData.type === 'link' ? 'Link' : 'FILE',
      dateAdded: new Date().toLocaleDateString('en-CA'),
      size: resourceData.type === 'link' ? 'N/A' : '0 KB',
      description: resourceData.description,
      isLink: resourceData.type === 'link',
      url: resourceData.type === 'link' ? resourceData.content : undefined
    };
    
    setResources(prev => [newResource, ...prev]);
    toast.success(`Resource "${resourceData.title}" added successfully`);
  };

  const handleDeleteResource = (resource) => {
    setResourceToDelete(resource);
  };

  const confirmDelete = () => {
    if (resourceToDelete) {
      setResources(prev => prev.filter(r => r.id !== resourceToDelete.id));
      setSelectedResources(prev => prev.filter(id => id !== resourceToDelete.id));
      toast.success(`"${resourceToDelete.name}" has been removed`);
      setResourceToDelete(null);
    }
  };

  const getFileTypeIcon = (type, isLink = false) => {
    if (isLink) return <ExternalLink className="h-5 w-5 text-blue-500" />;
    return <FileText className="h-5 w-5 text-blue-500" />;
  };

  const getFileTypeBadge = (type, isLink = false) => {
    if (isLink) return <Badge variant="outline" className="bg-blue-50 text-blue-700">Link</Badge>;
    return <Badge variant="secondary">{type}</Badge>;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 mb-6">
        <h1 className="text-2xl font-semibold">Resources</h1>
        <p className="text-muted-foreground">
          Use this area to share resources with your other members of this group.
          <br />
          You can reuse existing resources from our library or contribute your own.
        </p>
      </div>
      
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRemove} disabled={selectedResources.length === 0}>
            <MinusCircle className="mr-2 h-4 w-4" /> 
            Remove ({selectedResources.length})
          </Button>
          <Button variant="outline" onClick={handleExport} disabled={selectedResources.length === 0}>
            <Download className="mr-2 h-4 w-4" /> 
            Export ({selectedResources.length})
          </Button>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> 
          Add Resource
        </Button>
      </div>

      {/* Select All */}
      {resources.length > 0 && (
        <div className="flex items-center gap-2 pb-2 border-b">
          <Checkbox 
            checked={selectedResources.length > 0 && selectedResources.length === resources.length}
            onCheckedChange={(checked) => handleSelectAll(checked)}
          />
          <span className="text-sm text-muted-foreground">
            Select all {resources.length} resource(s)
          </span>
          {selectedResources.length > 0 && (
            <span className="text-sm font-medium text-blue-600 ml-2">
              {selectedResources.length} selected
            </span>
          )}
        </div>
      )}
      
      {/* Resources Grid */}
      {resources.length === 0 ? (
        <Card className="py-12">
          <CardContent className="text-center">
            <div className="text-muted-foreground">
              <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No resources available</p>
              <p className="text-sm">Click "Add Resource" to upload a new resource or add a link.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {resources.map(resource => (
            <Card key={resource.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      checked={selectedResources.includes(resource.id)}
                      onCheckedChange={(checked) => handleSelectResource(resource.id, checked)}
                    />
                    {getFileTypeIcon(resource.type, resource.isLink)}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteResource(resource)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium text-sm leading-tight">
                    {resource.isLink ? (
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {resource.name}
                      </a>
                    ) : (
                      resource.name
                    )}
                  </h3>
                  
                  {resource.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {resource.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    {getFileTypeBadge(resource.type, resource.isLink)}
                    <div className="text-xs text-muted-foreground">
                      {resource.size}
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Added: {resource.dateAdded}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Resource Modal */}
      <AddResourceModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onAddResource={handleAddResource}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!resourceToDelete} onOpenChange={() => setResourceToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Resource</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove <strong>"{resourceToDelete?.name}"</strong>? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Remove Resource
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default GroupResourcesPage;