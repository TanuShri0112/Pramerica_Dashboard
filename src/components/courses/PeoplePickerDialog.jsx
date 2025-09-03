import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

const mockUsers = [
  { id: '1', name: 'Admin, Graham', avatar: '/placeholder.svg' },
  { id: '2', name: 'Arya, Mayank', avatar: '/placeholder.svg' },
  { id: '3', name: 'Garrido, Ryan', avatar: '/placeholder.svg' },
  { id: '4', name: 'Kumar, Samir', avatar: '/placeholder.svg' },
  { id: '5', name: 'Kumar Singh, Ajay', avatar: '/placeholder.svg' },
  { id: '6', name: 'Mallik, Navneen', avatar: '/placeholder.svg' },
  { id: '7', name: 'Mehra, Akshat', avatar: '/placeholder.svg' },
  { id: '8', name: 'Rowland, PaulMichael', avatar: '/placeholder.svg' },
];

export const PeoplePickerDialog = ({ open, onOpenChange, courseId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState('Instructor');

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserSelect = (user) => {
    if (!selectedUsers.find(u => u.id === user.id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleUserRemove = (userId) => {
    setSelectedUsers(selectedUsers.filter(u => u.id !== userId));
  };

  const handleAdd = () => {
    console.log('Adding users:', selectedUsers, 'as', selectedRole, 'to course:', courseId);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="flex items-center justify-between text-xl">
            Select users
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onOpenChange(false)}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Available Users */}
          <div className="flex-1 p-6">
            <div className="space-y-4">
              <div className="flex gap-4">
                <Input
                  placeholder="Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Instructor">Instructor</SelectItem>
                    <SelectItem value="Assistant">Assistant</SelectItem>
                    <SelectItem value="Observer">Observer</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Select groups" className="w-32" />
                <Input placeholder="Select courses" className="w-32" />
                <Input placeholder="Select organizations" className="w-32" />
              </div>
              
              <div className="border rounded-lg">
                <div className="bg-gray-50 p-3 border-b flex items-center justify-between">
                  <span className="font-medium">Matches</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="flex items-center gap-3 p-3 border-b last:border-b-0 hover:bg-gray-50">
                      <Checkbox />
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="bg-blue-500 text-white text-xs">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-blue-600 cursor-pointer" onClick={() => handleUserSelect(user)}>
                        {user.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Panel - Selected Users */}
          <div className="w-80 border-l p-6">
            <div className="space-y-4">
              <div className="border rounded-lg">
                <div className="bg-gray-50 p-3 border-b flex items-center justify-between">
                  <span className="font-medium">Selected</span>
                  <ChevronLeft className="h-4 w-4" />
                </div>
                <div className="p-4 min-h-40">
                  {selectedUsers.length === 0 ? (
                    <div className="text-center text-gray-500 mt-8">
                      <div className="text-4xl mb-2">📋</div>
                      <p className="text-sm">
                        Populate the Matches list by using the search filter. Then select items and use &gt; to move them to the Selected list.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {selectedUsers.map((user) => (
                        <div key={user.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="bg-blue-500 text-white text-xs">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="flex-1 text-sm">{user.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUserRemove(user.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-4xl mb-2">📋</div>
                <p className="text-sm text-gray-600">
                  Click Add to add the people in the Selected list.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t flex justify-end">
          <Button onClick={handleAdd} className="bg-blue-500 hover:bg-blue-600">
            Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PeoplePickerDialog;