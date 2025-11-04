import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Plus, Filter, Mail, Lock, RotateCcw, Pencil, Trash, ArrowUpDown, Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader } from '@/components/shared/PageHeader';
import { Pagination } from '@/components/shared/Pagination';
import { UserFilterMenu } from '@/components/users/UserFilterMenu';
import { AddUserDialog } from '@/components/users/AddUserDialog';
import { MessageUsersDialog } from '@/components/users/MessageUsersDialog';
import { EditUserDialog } from '@/components/users/EditUserDialog';
import { ResetPasswordModal } from '@/components/users/ResetPasswordModal';
import { ResendLoginModal } from '@/components/users/ResendLoginModal';
import { UserScoresModal } from '@/components/users/UserScoresModal';
import { GiveAwardModal } from '@/components/users/GiveAwardModal';
import { useUserFilter } from '@/contexts/UserFilterContext';
import { toast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { UserDetailDialog } from '@/components/users/UserDetailDialog';
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
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';

/**
 * @typedef {import('@/contexts/UserFilterContext').User} User
 * @typedef {import('@/contexts/UserFilterContext').UserRole} UserRole
 */

const UsersPage = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  /**
   * @type {Record<UserRole, string>}
   */
  const roleDisplayNames = {
    all: t.all,
    administrator: t.administrators,
    learner: t.learners,
    friends: language === 'en' ? 'Friends' : 'Amigos',
    archived: t.archived,
    manager: t.manager,
    instructor: t.instructors,
  };
  const { 
    filteredUsers, 
    selectedRole, 
    setSelectedRole, 
    isFilterMenuOpen, 
    setIsFilterMenuOpen,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    totalPages,
    users,
    removeUsers,
    updateUser
  } = useUserFilter();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState('');
  const [userDetailDialogOpen, setUserDetailDialogOpen] = useState(false);
  const [selectedUserForDetail, setSelectedUserForDetail] = useState(null);
  const [resendLoginModalOpen, setResendLoginModalOpen] = useState(false);
  const [userScoresModalOpen, setUserScoresModalOpen] = useState(false);
  const [giveAwardModalOpen, setGiveAwardModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [removeConfirmOpen, setRemoveConfirmOpen] = useState(false);

  // Get current users for pagination
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  
  // Filter users by search query
  const searchFilteredUsers = filteredUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const currentUsers = searchFilteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const selectedUserObjects = users.filter(user => selectedUsers.includes(user.id));

  const handleSelectAll = () => {
    if (selectedUsers.length === currentUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(currentUsers.map(user => user.id));
    }
  };

  /** @param {number} id */
  const handleSelectUser = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter(userId => userId !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  /** @param {string} field */
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  /** @param {string} action */
  const handleAction = (action) => {
    if (selectedUsers.length === 0) {
      toast({
        title: "No users selected",
        description: "Please select at least one user to perform this action.",
        variant: "destructive"
      });
      return;
    }
    
    if (action === 'Message') {
      setMessageDialogOpen(true);
      return;
    }
    
    if (action === 'Passwords') {
      setResetPasswordModalOpen(true);
      return;
    }
    
    if (action === 'Resend login') {
      setResendLoginModalOpen(true);
      return;
    }
    
    if (action === 'Scores') {
      setUserScoresModalOpen(true);
      return;
    }
    
    if (action === 'Award') {
      setGiveAwardModalOpen(true);
      return;
    }
    
    if (action === 'Remove') {
      setRemoveConfirmOpen(true);
      return;
    }
    
    if (action === 'Edit' && selectedUsers.length === 1) {
      const user = users.find(u => u.id === selectedUsers[0]);
      if (user) {
        setEditingUser(user);
        setEditDialogOpen(true);
      }
      return;
    }
    
    toast({
      title: `${action} successful`,
      description: `Action performed on ${selectedUsers.length} users.`
    });
    
    setSelectedUsers([]);
  };

  const handleRemoveUsers = () => {
    if (selectedUsers.length === 0) return;
    
    removeUsers(selectedUsers);
    
    toast({
      title: "Users removed",
      description: `${selectedUsers.length} user(s) have been successfully removed.`,
    });
    
    setSelectedUsers([]);
    setRemoveConfirmOpen(false);
  };

  /** @param {number} userId */
  const handleEditUser = (userId) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setEditingUser(user);
      setEditDialogOpen(true);
    }
  };

  /** @param {number} userId */
  const handleDeleteUser = (userId) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setUserToDelete(user);
      setDeleteConfirmOpen(true);
    }
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      removeUsers([userToDelete.id]);
      
      toast({
        title: "User deleted",
        description: `${userToDelete.name} has been successfully deleted.`,
      });
      
      setUserToDelete(null);
      setDeleteConfirmOpen(false);
    }
  };

  /** @param {User} updatedUser */
  const handleSaveUser = (updatedUser) => {
    updateUser(updatedUser);
  };

  /** @param {User} user */
  const handleUserClick = (user) => {
    setSelectedUserForDetail(user);
    setUserDetailDialogOpen(true);
  };

  const getColumns = () => {
    const baseColumns = [
      { key: 'name', label: t.name },
      { key: 'lastVisited', label: t.lastVisited }
    ];
    
    switch (selectedRole) {
      case 'learner':
        return [
          ...baseColumns.slice(0, 1),
          { key: 'courses', label: t.courses },
          { key: 'completed', label: t.completed },
          { key: 'deactivated', label: t.deactivated },
          { key: 'groups', label: t.groups },
          { key: 'awards', label: t.awards },
          baseColumns[1]
        ];
      case 'instructor':
        return [
          ...baseColumns.slice(0, 1),
          { key: 'courses', label: t.courses },
          { key: 'archived', label: t.archived },
          { key: 'groups', label: t.groups },
          baseColumns[1]
        ];
      case 'administrator':
        return [
          ...baseColumns.slice(0, 1),
          { key: 'superAdmin', label: t.superAdmin },
          { key: 'contactMessages', label: t.contactMessages },
          { key: 'groups', label: t.groups },
          baseColumns[1]
        ];
      default:
        return [
          ...baseColumns.slice(0, 1),
          { key: 'learner', label: t.learners },
          { key: 'instructor', label: language === 'en' ? 'Instructor' : 'Instrutor' },
          { key: 'administrator', label: language === 'en' ? 'Administrator' : 'Administrador' },
          baseColumns[1]
        ];
    }
  };

  const getActionButtons = () => {
    const baseActions = [
      { label: t.message, icon: <Mail className="h-4 w-4 mr-2" /> },
      { label: t.edit, icon: <Pencil className="h-4 w-4 mr-2" /> },
      { label: t.remove, icon: <Trash className="h-4 w-4 mr-2" /> }
    ];
    
    switch (selectedRole) {
      case 'learner':
        return [
          { label: t.message, icon: <Mail className="h-4 w-4 mr-2" /> },
          { label: t.scores, icon: <ArrowUpDown className="h-4 w-4 mr-2" /> },
          { label: t.passwords, icon: <Lock className="h-4 w-4 mr-2" /> },
          { label: t.resendLogin, icon: <RotateCcw className="h-4 w-4 mr-2" /> },
          { label: t.award, icon: <Check className="h-4 w-4 mr-2" /> },
          { label: t.edit, icon: <Pencil className="h-4 w-4 mr-2" /> },
          { label: t.remove, icon: <Trash className="h-4 w-4 mr-2" /> },
          { label: t.archive, icon: <Filter className="h-4 w-4 mr-2" /> }
        ];
      case 'instructor':
      case 'administrator':
        return [
          { label: t.message, icon: <Mail className="h-4 w-4 mr-2" /> }
        ];
      default:
        return baseActions;
    }
  };

  /** @param {string} value */
  const handleRoleTabChange = (value) => {
    setSelectedRole(value);
    setCurrentPage(1);
    setSelectedUsers([]);
    setSearchQuery('');
  };

  const getUserCounts = () => {
    return {
      all: users.length,
      learner: users.filter(user => user.role.includes('learner')).length,
      instructor: users.filter(user => user.role.includes('instructor')).length,
      administrator: users.filter(user => user.role.includes('administrator')).length,
      friends: users.filter(user => user.role.includes('friends')).length,
      archived: users.filter(user => user.role.includes('archived')).length
    };
  };

  const columns = getColumns();
  const actionButtons = getActionButtons();
  const userCounts = getUserCounts();

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title={t.usersTitle} 
        action={{
          label: t.addUser,
          onClick: () => setDialogOpen(true)
        }}
      />

      <div className="bg-white rounded-lg shadow-sm border">
        {/* Role Tabs */}
        <div className="flex overflow-x-auto pb-3 pt-6 px-6">
          <Tabs
            value={selectedRole}
            onValueChange={handleRoleTabChange}
            className="w-full"
          >
            <TabsList className="bg-transparent p-0 w-full justify-start gap-2">
              <TabsTrigger 
                value="all"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-full px-4 py-2 border border-gray-200 hover:border-blue-300 transition-colors"
              >
                {t.all} <span className="ml-2 px-2 py-0.5 bg-gray-100 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800 text-xs rounded-full">
                  {userCounts.all}
                </span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="learner"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-full px-4 py-2 border border-gray-200 hover:border-blue-300 transition-colors"
              >
                {t.learners} <span className="ml-2 px-2 py-0.5 bg-gray-100 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800 text-xs rounded-full">
                  {userCounts.learner}
                </span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="instructor"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-full px-4 py-2 border border-gray-200 hover:border-blue-300 transition-colors"
              >
                {t.instructors} <span className="ml-2 px-2 py-0.5 bg-gray-100 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800 text-xs rounded-full">
                  {userCounts.instructor}
                </span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="administrator"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-full px-4 py-2 border border-gray-200 hover:border-blue-300 transition-colors"
              >
                {t.administrators} <span className="ml-2 px-2 py-0.5 bg-gray-100 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800 text-xs rounded-full">
                  {userCounts.administrator}
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 px-6 py-4 border-t border-b bg-gray-50/50">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              className="pl-9 bg-white border-gray-200" 
              placeholder={t.searchUsers} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            {actionButtons.map((action, index) => (
              <Button 
                key={index} 
                variant="outline" 
                size="sm" 
                className="text-sm border-gray-200 hover:bg-gray-50"
                onClick={() => handleAction(action.label)}
                disabled={action.label === 'Edit' && selectedUsers.length !== 1}
              >
                {action.icon}
                {action.label}
              </Button>
            ))}
          </div>
        </div>
        
        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b bg-gray-50/50">
                <th className="p-4 w-10">
                  <Checkbox
                    checked={selectedUsers.length === currentUsers.length && currentUsers.length > 0}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all"
                  />
                </th>
                <th className="p-4 w-10 text-sm font-medium text-gray-600">#</th>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="p-4 cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-900"
                    onClick={() => handleSort(column.key)}
                  >
                    <div className="flex items-center">
                      {column.label}
                      {sortField === column.key && (
                        <span className="ml-1 text-blue-600">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
                <th className="p-4 text-sm font-medium text-gray-600">{t.actions}</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {currentUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-b hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="p-4">
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={() => handleSelectUser(user.id)}
                        aria-label={`Select ${user.name}`}
                      />
                    </td>
                    <td className="p-4 text-sm text-gray-600">{indexOfFirstUser + index + 1}</td>
                    
                    {/* User Info Column */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img 
                            src={user.avatar} 
                            alt={user.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <span 
                            className="text-blue-600 font-medium hover:text-blue-800 cursor-pointer"
                            onClick={() => handleUserClick(user)}
                          >
                            {user.name}
                          </span>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    
                    {/* Role-specific columns */}
                    {selectedRole === 'all' && (
                      <>
                        <td className="p-4">{user.role.includes('learner') && <Check className="h-4 w-4 text-green-500" />}</td>
                        <td className="p-4">{user.role.includes('instructor') && <Check className="h-4 w-4 text-green-500" />}</td>
                        <td className="p-4">{user.role.includes('administrator') && <Check className="h-4 w-4 text-green-500" />}</td>
                      </>
                    )}
                    
                    {selectedRole === 'learner' && (
                      <>
                        <td className="p-4 text-sm">{user.courses || 0}</td>
                        <td className="p-4 text-sm">-</td>
                        <td className="p-4 text-sm">-</td>
                        <td className="p-4 text-sm">{user.groups || 0}</td>
                        <td className="p-4 text-sm">-</td>
                      </>
                    )}
                    
                    {selectedRole === 'instructor' && (
                      <>
                        <td className="p-4 text-sm">{user.courses || '-'}</td>
                        <td className="p-4 text-sm">-</td>
                        <td className="p-4 text-sm">{user.groups || 0}</td>
                      </>
                    )}
                    
                    {selectedRole === 'administrator' && (
                      <>
                        <td className="p-4">{user.superAdmin && <Check className="h-4 w-4 text-blue-500" />}</td>
                        <td className="p-4 text-sm">{user.contactMessages || 4}</td>
                        <td className="p-4 text-sm">{user.groups || 0}</td>
                      </>
                    )}
                    
                    <td className="p-4 text-sm text-gray-600">{user.lastVisited}</td>
                    
                    {/* Actions Column */}
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditUser(user.id)}
                          className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t bg-gray-50/50">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(searchFilteredUsers.length / itemsPerPage)}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
      
      <AddUserDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <MessageUsersDialog 
        open={messageDialogOpen} 
        onOpenChange={setMessageDialogOpen}
        selectedUsers={selectedUserObjects}
        onClearSelection={() => setSelectedUsers([])}
      />
      <EditUserDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        user={editingUser}
        onSave={handleSaveUser}
      />
      <ResetPasswordModal
        open={resetPasswordModalOpen}
        onOpenChange={setResetPasswordModalOpen}
        selectedUsers={selectedUserObjects}
      />
      <ResendLoginModal
        open={resendLoginModalOpen}
        onOpenChange={setResendLoginModalOpen}
        selectedUsers={selectedUserObjects}
      />
      <UserScoresModal
        open={userScoresModalOpen}
        onOpenChange={setUserScoresModalOpen}
        selectedUsers={selectedUserObjects}
      />
      <GiveAwardModal
        open={giveAwardModalOpen}
        onOpenChange={setGiveAwardModalOpen}
        selectedUsers={selectedUserObjects}
      />
      <UserFilterMenu />
      
      <UserDetailDialog
        open={userDetailDialogOpen}
        onOpenChange={setUserDetailDialogOpen}
        user={selectedUserForDetail}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.deleteUser}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.deleteUserConfirm} <strong>{userToDelete?.name}</strong>? 
              {t.deleteUserDesc}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteUser} className="bg-red-600 hover:bg-red-700">
              {t.deleteUserButton}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Remove Confirmation Dialog */}
      <AlertDialog open={removeConfirmOpen} onOpenChange={setRemoveConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.removeUsers}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.removeUsersConfirm} {selectedUsers.length} {language === 'en' ? 'selected user' : 'usuário'}{selectedUsers.length > 1 ? (language === 'en' ? 's' : 's selecionados') : (language === 'en' ? '' : ' selecionado')}? 
              {t.removeUsersDesc}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveUsers} className="bg-red-600 hover:bg-red-700">
              {t.removeUsers}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UsersPage;