import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Mail, MoreHorizontal } from 'lucide-react';
import { AddCoInstructorsDialog } from './AddCoInstructorsDialog';
import { EditInstructorDialog } from './EditInstructorDialog';
import { MessageUserDialog } from '@/components/users/MessageUserDialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

/**
 * @typedef {object} Instructor
 * @property {string} id
 * @property {string} name
 * @property {string} [avatar]
 * @property {boolean} isOwner
 * @property {string} lastVisited
 * @property {string} [role]
 */

const CourseInstructors = () => {
  const { courseId } = useParams();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [selectedInstructors, setSelectedInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  
  /** @type {[Instructor[], React.Dispatch<React.SetStateAction<Instructor[]>>]} */
  const [instructors, setInstructors] = useState([
    {
      id: '1',
      name: 'Instructor, Demo',
      avatar: '/placeholder.svg',
      isOwner: true,
      lastVisited: '1 minute ago',
      role: 'Lead Instructor'
    }
  ]);
  const { toast } = useToast();

  /**
   * Handles adding a new instructor to the course.
   * @param {{ name: string; role: string }} newInstructor - The new instructor's details.
   */
  const handleInstructorAdded = (newInstructor) => {
    const instructor = {
      id: Date.now().toString(),
      name: newInstructor.name,
      isOwner: false,
      lastVisited: 'Just added',
      role: newInstructor.role
    };
    
    setInstructors(prev => [...prev, instructor]);
    toast({
      title: "Instructor added",
      description: `${newInstructor.name} has been added as ${newInstructor.role}`,
    });
  };

  /**
   * Handles updating an existing instructor's details.
   * @param {Instructor} updatedInstructor - The instructor object with updated data.
   */
  const handleInstructorUpdated = (updatedInstructor) => {
    setInstructors(prev => 
      prev.map(instructor => 
        instructor.id === updatedInstructor.id ? updatedInstructor : instructor
      )
    );
  };

  /**
   * Toggles the selection of a single instructor.
   * @param {string} instructorId - The ID of the instructor to select/deselect.
   */
  const handleSelectInstructor = (instructorId) => {
    if (selectedInstructors.includes(instructorId)) {
      setSelectedInstructors(prev => prev.filter(id => id !== instructorId));
    } else {
      setSelectedInstructors(prev => [...prev, instructorId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedInstructors.length === instructors.length) {
      setSelectedInstructors([]);
    } else {
      setSelectedInstructors(instructors.map(instructor => instructor.id));
    }
  };

  const handleMessageClick = () => {
    if (selectedInstructors.length === 0) {
      toast({
        title: "No instructors selected",
        description: "Please select at least one instructor to send a message.",
        variant: "destructive"
      });
      return;
    }
    setMessageDialogOpen(true);
  };

  /**
   * Removes an instructor from the course.
   * @param {string} instructorId - The ID of the instructor to remove.
   */
  const handleDeleteInstructor = (instructorId) => {
    setInstructors(prev => prev.filter(instructor => instructor.id !== instructorId));
    setSelectedInstructors(prev => prev.filter(id => id !== instructorId));
    toast({
      title: "Instructor removed",
      description: "The instructor has been removed from the course.",
    });
  };

  /**
   * Opens the edit dialog for a specific instructor.
   * @param {Instructor} instructor - The instructor object to edit.
   */
  const handleEditInstructor = (instructor) => {
    setSelectedInstructor(instructor);
    setEditDialogOpen(true);
  };

  // Note: This finds the first selected instructor to pass to the message dialog.
  const selectedInstructorData = instructors.find(instructor => 
    selectedInstructors.includes(instructor.id)
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Instructors</h1>
        <Button 
          onClick={() => setAddDialogOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>

      <Card className="p-4">
        <div className="mb-4 flex items-center gap-4">
          <Badge variant="default" className="bg-blue-500 text-white rounded-full px-4 py-1">
            Active {instructors.length}
          </Badge>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={handleMessageClick}
          >
            <Mail className="h-4 w-4" />
            Message
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox 
                  checked={selectedInstructors.length === instructors.length && instructors.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Owner?</TableHead>
              <TableHead>Last visited</TableHead>
              <TableHead>More</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {instructors.map((instructor) => (
              <TableRow key={instructor.id}>
                <TableCell>
                  <Checkbox 
                    checked={selectedInstructors.includes(instructor.id)}
                    onCheckedChange={() => handleSelectInstructor(instructor.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={instructor.avatar} />
                      <AvatarFallback className="bg-blue-500 text-white">
                        {instructor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="text-blue-600 font-medium">{instructor.name}</span>
                      {instructor.role && (
                        <div className="text-xs text-gray-500">{instructor.role}</div>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {instructor.isOwner && (
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  )}
                </TableCell>
                <TableCell className="text-gray-600">
                  {instructor.lastVisited}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleEditInstructor(instructor)}>
                        Edit
                      </DropdownMenuItem>
                      {!instructor.isOwner && (
                        <DropdownMenuItem 
                          onClick={() => handleDeleteInstructor(instructor.id)}
                          className="text-red-600 focus:text-red-600 focus:bg-red-50"
                        >
                          Remove
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <AddCoInstructorsDialog 
        open={addDialogOpen} 
        onOpenChange={setAddDialogOpen}
        courseId={courseId || ''}
        onInstructorAdded={handleInstructorAdded}
      />

      <EditInstructorDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        instructor={selectedInstructor}
        onSave={handleInstructorUpdated}
      />

      <MessageUserDialog
        open={messageDialogOpen}
        onOpenChange={setMessageDialogOpen}
        user={selectedInstructorData ? {
          id: selectedInstructorData.id,
          name: selectedInstructorData.name,
          email: `${selectedInstructorData.name.toLowerCase().replace(/,?\s+/g, '.')}@example.com`,
          avatar: selectedInstructorData.avatar,
          role: selectedInstructorData.role || 'Instructor',
          status: 'active',
          lastLogin: selectedInstructorData.lastVisited
        } : null}
      />
    </div>
  );
};

export default CourseInstructors;