import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Users, Globe, Lock } from 'lucide-react';
import { GroupOptionsMenu } from '@/components/groups/GroupOptionsMenu';
import { GroupEditDialog } from '@/components/groups/GroupEditDialog';
import { useToast } from '@/hooks/use-toast';

/**
 * @typedef {object} Group
 * @property {number} id
 * @property {string} name
 * @property {string} type
 * @property {number} members
 * @property {string} [image]
 * @property {string} [description]
 * @property {string} [privacy]
 * @property {string} [category]
 */

const GroupCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editingGroup, setEditingGroup] = useState(null);
  const { toast } = useToast();

  /** @type {Group[]} */
  const mockGroups = [
    {
      id: 1,
      name: 'JavaScript Developers',
      type: 'Study Group',
      members: 45,
      image: '/placeholder.svg',
      description: 'A group for JavaScript enthusiasts to share knowledge and projects.',
      privacy: 'Public',
      category: 'Technology'
    },
    {
      id: 2,
      name: 'Project Phoenix Team',
      type: 'Project Team',
      members: 12,
      image: '/placeholder.svg',
      description: 'The core team for Project Phoenix.',
      privacy: 'Private',
      category: 'Business'
    },
    {
      id: 3,
      name: 'Weekend Hikers',
      type: 'Social Club',
      members: 78,
      image: '/placeholder.svg',
      description: 'A social group for planning weekend hiking trips.',
      privacy: 'Public',
      category: 'Social'
    },
    {
      id: 4,
      name: 'React Study Buddies',
      type: 'Study Group',
      members: 23,
      image: '/placeholder.svg',
      description: 'Learning and mastering React together.',
      privacy: 'Public',
      category: 'Technology'
    },
  ];

  const categories = ['All', 'Study Groups', 'Project Teams', 'Social', 'Technology', 'Business'];

  const filteredGroups = mockGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (group.description && group.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || group.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  /** @param {Group} group */
  const handleEditGroup = (group) => {
    setEditingGroup(group);
  };

  /** @param {number} groupId */
  const handleDeleteGroup = (groupId) => {
    // In a real app, you would filter the state here
    toast({
      title: "Group deleted",
      description: "The group has been successfully deleted.",
    });
  };

  /** 
   * @param {number} groupId 
   * @param {Partial<Group>} updatedData 
   */
  const handleSaveGroup = (groupId, updatedData) => {
    // In a real app, you would update the state here
    console.log("Updating group:", groupId, updatedData);
    toast({
      title: "Group updated",
      description: "The group has been successfully updated.",
    });
    setEditingGroup(null);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Group Catalog</h1>
          <p className="text-muted-foreground">Discover and join groups that match your interests.</p>
        </div>
        <Button>Create Group</Button>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-10"
            placeholder="Search for groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Group Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group) => (
          <Card key={group.id} className="hover:shadow-lg transition-shadow flex flex-col">
            <CardContent className="p-6 flex-grow flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{group.name}</h3>
                    <p className="text-gray-600 text-sm">{group.type}</p>
                  </div>
                </div>
                <GroupOptionsMenu
                  groupId={group.id}
                  groupName={group.name}
                  onEdit={() => handleEditGroup(group)}
                  onDelete={() => handleDeleteGroup(group.id)}
                />
              </div>

              <div className="space-y-3 flex-grow flex flex-col">
                <p className="text-sm text-muted-foreground flex-grow">{group.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Members</span>
                  <Badge variant="secondary">{group.members}</Badge>
                </div>
                
                <div className="flex items-center space-x-2">
                  {group.privacy === 'Public' ? (
                    <Globe className="h-4 w-4 text-green-500" />
                  ) : (
                    <Lock className="h-4 w-4 text-gray-500" />
                  )}
                  <span className="text-sm text-gray-600">{group.privacy}</span>
                </div>

                <Button className="w-full mt-auto" variant="outline">
                  Join Group
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <GroupEditDialog
        open={!!editingGroup}
        onOpenChange={(open) => !open && setEditingGroup(null)}
        group={editingGroup}
        onSave={handleSaveGroup}
      />
    </div>
  );
};

export default GroupCatalog;