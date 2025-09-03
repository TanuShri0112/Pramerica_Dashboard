import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Search, Filter, Plus, Compass } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/shared/PageHeader';
import { AddGroupDialog } from '@/components/groups/AddGroupDialog';
import { GroupEditDialog } from '@/components/groups/GroupEditDialog';
import { GroupOptionsMenu } from '@/components/groups/GroupOptionsMenu';
import { GroupProvider, useGroup } from '@/contexts/GroupContext';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';

/**
 * @typedef {object} Group
 * @property {number} id
 * @property {string} name
 * @property {number} members
 * @property {string} type
 * @property {string} image
 */

const GroupsContent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false);
  const [isEditGroupOpen, setIsEditGroupOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const navigate = useNavigate();
  
  const { groups, updateGroup, deleteGroup, addGroup } = useGroup();

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  /** @param {number} id */
  const handleViewGroup = (id) => {
    navigate(`/groups/view/${id}`);
  };
  
  const handleDiscoverGroups = () => {
    navigate('/groups/catalog');
  };

  /** @param {Group} group */
  const handleEditGroup = (group) => {
    setSelectedGroup(group);
    setIsEditGroupOpen(true);
  };

  /** @param {number} groupId */
  const handleDeleteGroup = (groupId) => {
    deleteGroup(groupId);
  };

  /** 
   * @param {number} groupId 
   * @param {Partial<Group>} updatedData 
   */
  const handleSaveGroup = (groupId, updatedData) => {
    updateGroup(groupId, updatedData);
  };

  /** @param {object} groupData - Data from the add group form. */
  const handleAddGroup = (groupData) => {
    const newGroup = {
      name: groupData.name,
      members: 0,
      type: 'Study group', // Default type
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&auto=format' // Default image
    };
    addGroup(newGroup);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="My Groups" 
        description="Manage and participate in your enrolled groups"
        action={{
          label: "Create Group",
          onClick: () => setIsAddGroupOpen(true)
        }}
      />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={handleDiscoverGroups}
            className="flex items-center gap-2"
          >
            <Compass className="h-4 w-4" />
            Discover Groups
          </Button>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            className="pl-9" 
            placeholder="Search my groups..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="interest">Interest groups</SelectItem>
              <SelectItem value="study">Study groups</SelectItem>
              <SelectItem value="business">Business groups</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="flex gap-1 items-center">
            <Filter className="h-4 w-4" /> More filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredGroups.map((group) => (
          <Card key={group.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <div className="h-40 overflow-hidden relative">
              <img 
                src={group.image} 
                alt={group.name} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                  Enrolled
                </Badge>
                <div className="bg-white/90 rounded-md">
                  <GroupOptionsMenu 
                    groupId={group.id} 
                    groupName={group.name}
                    onEdit={() => handleEditGroup(group)}
                    onDelete={() => handleDeleteGroup(group.id)}
                  />
                </div>
              </div>
            </div>
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                {group.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{group.type}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Members</span>
                  <span className="font-medium">{group.members}</span>
                </div>
                <Button 
                  variant="default" 
                  className="w-full bg-blue-500 hover:bg-blue-600 transition-colors"
                  onClick={() => handleViewGroup(group.id)}
                >
                  Open Group
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AddGroupDialog 
        open={isAddGroupOpen} 
        onOpenChange={setIsAddGroupOpen}
        onSave={handleAddGroup}
      />

      <GroupEditDialog
        open={isEditGroupOpen}
        onOpenChange={setIsEditGroupOpen}
        group={selectedGroup}
        onSave={handleSaveGroup}
      />
    </div>
  );
};

const Groups = () => {
  return (
    <GroupProvider>
      <GroupsContent />
    </GroupProvider>
  );
};

export default Groups;