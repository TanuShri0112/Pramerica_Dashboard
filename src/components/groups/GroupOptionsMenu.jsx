import React, { useState } from 'react';
import { MoreVertical, Edit, Trash2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

/**
 * Renders a dropdown menu with options for a group (Edit, Manage Members, Delete).
 * @param {object} props
 * @param {number} props.groupId - The ID of the group.
 * @param {string} props.groupName - The name of the group.
 * @param {() => void} props.onEdit - Callback function to trigger when the edit option is selected.
 * @param {() => void} props.onDelete - Callback function to trigger when the delete option is confirmed.
 */
export const GroupOptionsMenu = ({ groupId, groupName, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleUpdate = () => {
    onEdit();
  };

  const handleDelete = () => {
    onDelete();
    setShowDeleteDialog(false);
    toast({
      title: "Group Deleted",
      description: `${groupName} has been deleted successfully.`,
    });
  };

  const handleManageMembers = () => {
    navigate(`/groups/view/${groupId}/members`);
    toast({
      title: "Manage Members",
      description: `Opening member management for ${groupName}`,
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={handleUpdate}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Group
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleManageMembers}>
            <Users className="mr-2 h-4 w-4" />
            Manage Members
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setShowDeleteDialog(true)} 
            className="text-red-600 focus:text-red-600 focus:bg-red-50"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Group
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Group</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{groupName}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};