import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const Catalog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddCatalogOpen, setIsAddCatalogOpen] = useState(false);
  const [isEditCatalogOpen, setIsEditCatalogOpen] = useState(false);
  const [editingCatalog, setEditingCatalog] = useState(null);
  const [newCatalogName, setNewCatalogName] = useState('');
  const [newCatalogDescription, setNewCatalogDescription] = useState('');
  
  // Updated catalogs with course counts from the courses
  const [catalogs, setCatalogs] = useState([
    {
      id: 1,
      name: 'Insurance Fundamentals',
      description: 'Core insurance concepts, policies, and industry knowledge',
      imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=300&fit=crop&auto=format',
      courseCount: 2 // Banking Basics, Introduction to Financial Markets
    },
    {
      id: 2,
      name: 'Life Insurance Sales',
      description: 'Life insurance products, sales techniques, and customer engagement',
      imageUrl: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=300&fit=crop&auto=format',
      courseCount: 1 // Protecting Dreams: A Learning Journey with Rakshak Smart
    },
    {
      id: 3,
      name: 'Sales Training',
      description: 'Advanced sales methodologies and customer relationship management',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&auto=format',
      courseCount: 1 // Sales techniques and methodologies
    },
    {
      id: 4,
      name: 'Insurance Compliance',
      description: 'Regulatory requirements, legal frameworks, and compliance practices',
      imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop&auto=format',
      courseCount: 1 // Compliance and regulatory training
    },
    {
      id: 5,
      name: 'Financial Planning',
      description: 'Personal financial planning and wealth management strategies',
      imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&auto=format',
      courseCount: 1 // Financial planning fundamentals
    },
    {
      id: 6,
      name: 'Customer Service',
      description: 'Insurance customer service excellence and client satisfaction',
      imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=300&fit=crop&auto=format',
      courseCount: 1 // Customer service training
    }
  ]);

  // Filter catalogs based on search query
  const filteredCatalogs = catalogs.filter(catalog =>
    catalog.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    catalog.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCatalog = () => {
    if (newCatalogName.trim()) {
      const newCatalog = {
        id: Date.now(),
        name: newCatalogName,
        description: newCatalogDescription,
        imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&auto=format',
        courseCount: 0
      };
      setCatalogs([...catalogs, newCatalog]);
      setNewCatalogName('');
      setNewCatalogDescription('');
      setIsAddCatalogOpen(false);
      toast({
        title: "Catalog Created",
        description: `${newCatalogName} catalog has been created successfully.`,
      });
    }
  };

  const handleEditCatalog = (catalog) => {
    setEditingCatalog(catalog);
    setNewCatalogName(catalog.name);
    setNewCatalogDescription(catalog.description);
    setIsEditCatalogOpen(true);
  };

  const handleUpdateCatalog = () => {
    if (editingCatalog && newCatalogName.trim()) {
      setCatalogs(catalogs.map(catalog =>
        catalog.id === editingCatalog.id
          ? { ...catalog, name: newCatalogName, description: newCatalogDescription }
          : catalog
      ));
      setIsEditCatalogOpen(false);
      setEditingCatalog(null);
      setNewCatalogName('');
      setNewCatalogDescription('');
      toast({
        title: "Catalog Updated",
        description: `Catalog has been updated successfully.`,
      });
    }
  };

  const handleDeleteCatalog = (catalogId, catalogName) => {
    if (window.confirm(`Are you sure you want to delete "${catalogName}" catalog?`)) {
      setCatalogs(catalogs.filter(catalog => catalog.id !== catalogId));
      toast({
        title: "Catalog Deleted",
        description: `${catalogName} catalog has been deleted.`,
      });
    }
  };

  const handleCatalogClick = (catalog) => {
    navigate(`/catalog/${catalog.name.toLowerCase().replace(/\s+/g, '-')}`, {
      state: { catalog }
    });
  };

  return (
    <div className="container mx-auto p-6 animate-fade-in max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Course Catalog</h1>
          <p className="text-muted-foreground mt-2">
            Manage course categories and organize your learning content
          </p>
        </div>
        
        <Button onClick={() => setIsAddCatalogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Catalog
        </Button>
      </div>
      
      {/* Search Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search catalogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      {/* Catalogs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCatalogs.map((catalog) => (
          <Card 
            key={catalog.id}
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105 bg-white border border-gray-200 group"
          >
            <div 
              className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 relative overflow-hidden"
              onClick={() => handleCatalogClick(catalog)}
            >
              <img 
                src={catalog.imageUrl} 
                alt={catalog.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              
              {/* Management buttons - visible on hover */}
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditCatalog(catalog);
                  }}
                >
                  <Edit className="h-3 w-3" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCatalog(catalog.id, catalog.name);
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <CardContent className="p-6" onClick={() => handleCatalogClick(catalog)}>
              <CardTitle className="text-lg font-bold mb-2 text-gray-800 line-clamp-1">
                {catalog.name}
              </CardTitle>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {catalog.description}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-sm text-blue-600 font-medium">
                  {catalog.courseCount} courses
                </p>
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredCatalogs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No catalogs found matching your search.</p>
        </div>
      )}

      {/* Add Catalog Dialog */}
      <Dialog open={isAddCatalogOpen} onOpenChange={setIsAddCatalogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Catalog</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="catalogName">Catalog Name</Label>
              <Input
                id="catalogName"
                value={newCatalogName}
                onChange={(e) => setNewCatalogName(e.target.value)}
                placeholder="Enter catalog name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="catalogDescription">Description</Label>
              <Textarea
                id="catalogDescription"
                value={newCatalogDescription}
                onChange={(e) => setNewCatalogDescription(e.target.value)}
                placeholder="Enter catalog description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCatalogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCatalog} disabled={!newCatalogName.trim()}>
              Create Catalog
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Catalog Dialog */}
      <Dialog open={isEditCatalogOpen} onOpenChange={setIsEditCatalogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Catalog</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="editCatalogName">Catalog Name</Label>
              <Input
                id="editCatalogName"
                value={newCatalogName}
                onChange={(e) => setNewCatalogName(e.target.value)}
                placeholder="Enter catalog name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editCatalogDescription">Description</Label>
              <Textarea
                id="editCatalogDescription"
                value={newCatalogDescription}
                onChange={(e) => setNewCatalogDescription(e.target.value)}
                placeholder="Enter catalog description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditCatalogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateCatalog} disabled={!newCatalogName.trim()}>
              Update Catalog
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Catalog;