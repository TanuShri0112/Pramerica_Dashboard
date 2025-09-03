import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MessageSquare, MinusCircle, UserPlus, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { MessageUsersDialog } from '@/components/users/MessageUsersDialog';
import { AddMemberDialog } from '@/components/groups/AddMemberDialog';
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

const GroupMembersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(null);
  
  const [members, setMembers] = useState([
    { id: 1, name: 'Aberin, David', email: 'david.aberin@example.com', avatar: '/lovable-uploads/2e656932-0755-44b1-807b-2b0a175c1d9b.png', role: ['learner'], lastVisited: '2 days ago', groups: 3 },
    { id: 2, name: 'Adams, Anthony', email: 'anthony.adams@example.com', avatar: '/lovable-uploads/a9e707a6-09a6-4f71-83fa-dfdc4e52cb13.png', role: ['learner'], lastVisited: '15 days ago', groups: 3 },
    { id: 3, name: 'Adlaon, Ann', email: 'ann.adlaon@example.com', avatar: '/lovable-uploads/172887ec-721f-41fe-8b85-47de3f4e0499.png', role: ['instructor'], lastVisited: '1 week ago', groups: 2 },
    { id: 4, name: 'Admin, Graham', email: 'graham.admin@example.com', avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png', role: ['administrator'], lastVisited: 'Never', groups: 6 },
    { id: 5, name: 'admin, Test', email: 'test.admin@example.com', avatar: '/lovable-uploads/9fce6a44-d177-48aa-848b-8454dfa6ca7e.png', role: ['administrator'], lastVisited: '28 minutes ago', groups: 3 },
    { id: 6, name: 'Aliomar, Alfonzo', email: 'alfonzo.aliomar@example.com', avatar: '/lovable-uploads/dc27ec74-b2e9-4467-8adc-6a66a52eb520.png', role: ['learner'], lastVisited: '11 hours ago', groups: 3 },
    { id: 7, name: 'Allen, Jade', email: 'jade.allen@example.com', avatar: '/lovable-uploads/99489061-8ed9-41d2-84f2-9f76fec2a9a0.png', role: ['instructor'], lastVisited: '1 day ago', groups: 3 },
    { id: 8, name: 'Alonso, Juan', email: 'juan.alonso@example.com', avatar: '/lovable-uploads/2e656932-0755-44b1-807b-2b0a175c1d9b.png', role: ['learner'], lastVisited: '27 days ago', groups: 4 },
    { id: 9, name: 'alsawy, Sarah', email: 'sarah.alsawy@example.com', avatar: '/lovable-uploads/dc27ec74-b2e9-4467-8adc-6a66a52eb520.png', role: ['learner'], lastVisited: '3 days ago', groups: 3 },
    { id: 10, name: 'Aman, Carlos', email: 'carlos.aman@example.com', avatar: '/lovable-uploads/172887ec-721f-41fe-8b85-47de3f4e0499.png', role: ['learner'], lastVisited: '1 day ago', groups: 3 }
  ]);
  
  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.some(r => r.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const selectedMemberData = members.filter(m => selectedMembers.includes(m.id));

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedMembers(filteredMembers.map(m => m.id));
    } else {
      setSelectedMembers([]);
    }
  };

  const handleSelectMember = (id, checked) => {
    if (checked) {
      setSelectedMembers(prev => [...prev, id]);
    } else {
      setSelectedMembers(prev => prev.filter(memberId => memberId !== id));
      setSelectAll(false);
    }
  };

  const handleMessage = () => {
    if (selectedMembers.length === 0) {
      toast.error("Please select members to message");
      return;
    }
    setIsMessageDialogOpen(true);
  };

  const handleRemoveMember = (member) => {
    setMemberToRemove(member);
  };

  const confirmRemoveMember = () => {
    if (memberToRemove) {
      setMembers(prev => prev.filter(m => m.id !== memberToRemove.id));
      setSelectedMembers(prev => prev.filter(id => id !== memberToRemove.id));
      toast.success(`${memberToRemove.name} has been removed from the group`);
      setMemberToRemove(null);
    }
  };

  const handleAddMember = (memberData) => {
    const newMember = {
      id: Date.now(),
      name: memberData.name,
      email: memberData.email,
      avatar: '/lovable-uploads/2e656932-0755-44b1-807b-2b0a175c1d9b.png', // Default avatar
      role: [memberData.role === 'admin' ? 'administrator' : memberData.role],
      lastVisited: 'Never',
      groups: 1
    };
    setMembers(prev => [...prev, newMember]);
    toast.success(`${memberData.name} has been added to the group`);
  };

  const clearSelection = () => {
    setSelectedMembers([]);
    setSelectAll(false);
  };

  const getRoleBadge = (roles) => {
    const primaryRole = roles[0];
    switch (primaryRole) {
      case 'administrator':
        return <Badge variant="destructive" className="text-xs">🛠️ Admin</Badge>;
      case 'instructor':
        return <Badge variant="default" className="text-xs bg-blue-100 text-blue-800">🧑‍🏫 Instructor</Badge>;
      case 'learner':
        return <Badge variant="secondary" className="text-xs">🧑‍🎓 Learner</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">{primaryRole}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Search and Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Group Members ({members.length})</h1>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name, email, or role..." 
              className="pl-8" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleMessage} disabled={selectedMembers.length === 0}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Message ({selectedMembers.length})
            </Button>
            <Button onClick={() => setIsAddMemberDialogOpen(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedMembers.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-blue-800">
                  {selectedMembers.length} member{selectedMembers.length > 1 ? 's' : ''} selected
                </span>
                <Button variant="ghost" size="sm" onClick={clearSelection} className="text-blue-600">
                  Clear selection
                </Button>
              </div>
              <Button variant="outline" size="sm" onClick={handleMessage}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Message Selected
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Select All Checkbox */}
      <div className="flex items-center gap-2 pb-2 border-b">
        <Checkbox 
          checked={selectAll} 
          onCheckedChange={(checked) => handleSelectAll(checked)}
        />
        <span className="text-sm text-muted-foreground">
          Select all {filteredMembers.length} members
        </span>
      </div>
      
      {/* Members Table */}
      {filteredMembers.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Member</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Last Visited</TableHead>
                  <TableHead>Groups</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedMembers.includes(member.id)}
                        onCheckedChange={(checked) => handleSelectMember(member.id, checked)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback className="text-sm">
                              {member.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          {member.name === 'Admin, Graham' && (
                            <div className="absolute -top-1 -right-1 text-yellow-500 text-lg">
                              👑
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getRoleBadge(member.role)}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {member.lastVisited}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {member.groups}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveMember(member)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card className="py-12">
          <CardContent className="text-center">
            <div className="text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No members found</p>
              <p className="text-sm">
                {searchQuery ? 'Try adjusting your search criteria' : 'No members in this group yet'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Message Dialog */}
      <MessageUsersDialog
        open={isMessageDialogOpen}
        onOpenChange={setIsMessageDialogOpen}
        selectedUsers={selectedMemberData}
        onClearSelection={clearSelection}
      />

      {/* Add Member Dialog */}
      <AddMemberDialog
        open={isAddMemberDialogOpen}
        onOpenChange={setIsAddMemberDialogOpen}
        onAddMember={handleAddMember}
      />

      {/* Remove Confirmation Dialog */}
      <AlertDialog open={!!memberToRemove} onOpenChange={() => setMemberToRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove <strong>{memberToRemove?.name}</strong> from this group? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRemoveMember} className="bg-red-600 hover:bg-red-700">
              Remove Member
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default GroupMembersPage;