import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MessageSquare, UserPlus, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { MessageUsersDialog } from '@/components/users/MessageUsersDialog';
import { AddAdminDialog } from '@/components/groups/AddAdminDialog';
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

const GroupAdminsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAdmins, setSelectedAdmins] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [isAddAdminDialogOpen, setIsAddAdminDialogOpen] = useState(false);
  const [adminToRemove, setAdminToRemove] = useState(null);
  
  const [admins, setAdmins] = useState([
    { 
      id: 1, 
      name: 'Admin, Graham', 
      email: 'graham.admin@example.com',
      avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png',
      role: ['administrator'],
      lastVisited: 'Never',
      groups: 6
    },
    { 
      id: 2, 
      name: 'Arya, Mayank',
      email: 'mayank.arya@example.com',
      avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png',
      role: ['administrator'],
      lastVisited: '2 days ago',
      groups: 4
    },
    { 
      id: 3, 
      name: 'Cantiller, Jevah', 
      email: 'jevah.cantiller@example.com',
      avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png',
      role: ['administrator'],
      lastVisited: '1 week ago',
      groups: 3
    },
    { 
      id: 4, 
      name: 'Creditor, counselor',
      email: 'counselor.creditor@example.com',
      avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png',
      role: ['administrator'],
      lastVisited: '3 days ago',
      groups: 2
    },
    { 
      id: 5, 
      name: 'Garrido, Ryan',
      email: 'ryan.garrido@example.com',
      avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png',
      role: ['administrator'],
      lastVisited: '5 days ago',
      groups: 5
    },
    { 
      id: 6, 
      name: 'Gharfalkar, Jay',
      email: 'jay.gharfalkar@example.com',
      avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png',
      role: ['administrator'],
      lastVisited: '1 day ago',
      groups: 3
    },
    { 
      id: 7, 
      name: 'Jagadeesh, Tharani',
      email: 'tharani.jagadeesh@example.com',
      avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png',
      role: ['administrator'],
      lastVisited: '4 hours ago',
      groups: 7
    },
    { 
      id: 8, 
      name: 'Javed, Farah',
      email: 'farah.javed@example.com',
      avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png',
      role: ['administrator'],
      lastVisited: '2 weeks ago',
      groups: 2
    },
    { 
      id: 9, 
      name: 'Kumar, Nikhil',
      email: 'nikhil.kumar@example.com',
      avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png',
      role: ['administrator'],
      lastVisited: '6 days ago',
      groups: 4
    },
    { 
      id: 10, 
      name: 'Kumar, Samir',
      email: 'samir.kumar@example.com',
      avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png',
      role: ['administrator'],
      lastVisited: '12 hours ago',
      groups: 6
    }
  ]);
  
  const filteredAdmins = admins.filter(admin => 
    admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.role.some(r => r.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const selectedAdminData = admins.filter(a => selectedAdmins.includes(a.id));

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedAdmins(filteredAdmins.map(a => a.id));
    } else {
      setSelectedAdmins([]);
    }
  };

  const handleSelectAdmin = (id, checked) => {
    if (checked) {
      setSelectedAdmins(prev => [...prev, id]);
    } else {
      setSelectedAdmins(prev => prev.filter(adminId => adminId !== id));
      setSelectAll(false);
    }
  };

  const handleMessage = () => {
    if (selectedAdmins.length === 0) {
      toast.error("Please select admins to message");
      return;
    }
    setIsMessageDialogOpen(true);
  };

  const handleRemoveAdmin = (admin) => {
    setAdminToRemove(admin);
  };

  const confirmRemoveAdmin = () => {
    if (adminToRemove) {
      setAdmins(prev => prev.filter(a => a.id !== adminToRemove.id));
      setSelectedAdmins(prev => prev.filter(id => id !== adminToRemove.id));
      toast.success(`${adminToRemove.name} has been removed from admin role`);
      setAdminToRemove(null);
    }
  };

  const handleAddAdmin = (adminData) => {
    const newAdmin = {
      id: Date.now(),
      name: adminData.name,
      email: adminData.email,
      avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png',
      role: ['administrator'],
      lastVisited: 'Never',
      groups: 0
    };
    setAdmins(prev => [...prev, newAdmin]);
    toast.success(`${adminData.name} has been added as an administrator`);
  };

  const clearSelection = () => {
    setSelectedAdmins([]);
    setSelectAll(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Search and Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Admins ({admins.length})</h1>
        
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
            <Button variant="outline" onClick={handleMessage} disabled={selectedAdmins.length === 0}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Message ({selectedAdmins.length})
            </Button>
            <Button onClick={() => setIsAddAdminDialogOpen(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Admin
            </Button>
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedAdmins.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-blue-800">
                  {selectedAdmins.length} admin{selectedAdmins.length > 1 ? 's' : ''} selected
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
          onCheckedChange={(checked) => handleSelectAll(!!checked)}
        />
        <span className="text-sm text-muted-foreground">
          Select all {filteredAdmins.length} administrators
        </span>
      </div>
      
      {/* Admins Table */}
      {filteredAdmins.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Administrator</TableHead>
                  <TableHead>Last Visited</TableHead>
                  <TableHead>Groups</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdmins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedAdmins.includes(admin.id)}
                        onCheckedChange={(checked) => handleSelectAdmin(admin.id, !!checked)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={admin.avatar} alt={admin.name} />
                            <AvatarFallback className="text-sm">
                              {admin.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          {admin.name === 'Admin, Graham' && (
                            <div className="absolute -top-1 -right-1 text-yellow-500 text-lg">
                              👑
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{admin.name}</p>
                          <p className="text-xs text-muted-foreground">{admin.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {admin.lastVisited}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {admin.groups}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveAdmin(admin)}
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
              <p className="text-lg font-medium mb-2">No administrators found</p>
              <p className="text-sm">
                {searchQuery ? 'Try adjusting your search criteria' : 'No administrators in this group yet'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Message Dialog */}
      <MessageUsersDialog
        open={isMessageDialogOpen}
        onOpenChange={setIsMessageDialogOpen}
        selectedUsers={selectedAdminData}
        onClearSelection={clearSelection}
      />

      {/* Add Admin Dialog */}
      <AddAdminDialog
        open={isAddAdminDialogOpen}
        onOpenChange={setIsAddAdminDialogOpen}
        onAddAdmin={handleAddAdmin}
      />

      {/* Remove Confirmation Dialog */}
      <AlertDialog open={!!adminToRemove} onOpenChange={() => setAdminToRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Administrator</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove <strong>{adminToRemove?.name}</strong> from the administrator role? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRemoveAdmin} className="bg-red-600 hover:bg-red-700">
              Remove Administrator
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default GroupAdminsPage;