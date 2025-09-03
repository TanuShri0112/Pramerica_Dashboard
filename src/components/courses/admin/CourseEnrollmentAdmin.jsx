import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import EditEnrollmentDialog from "./EditEnrollmentDialog";
import AddAccessActionDialog from "./AddAccessActionDialog";
import SelectCertificateDialog from "./SelectCertificateDialog";
import InactivitySettingsDialog from "./InactivitySettingsDialog";

const CourseEnrollmentAdmin = () => {
  const [editEnrollmentDialog, setEditEnrollmentDialog] = useState(false);
  const [addEnrollmentActionDialog, setAddEnrollmentActionDialog] = useState(false);
  const [addUnenrollmentActionDialog, setAddUnenrollmentActionDialog] = useState(false);
  const [addReenrollmentActionDialog, setAddReenrollmentActionDialog] = useState(false);
  const [selectCertificateDialog, setSelectCertificateDialog] = useState(false);
  const [inactivitySettingsDialog, setInactivitySettingsDialog] = useState(false);

  const [enrollmentEnabled, setEnrollmentEnabled] = useState(true);
  const [openEnrollment, setOpenEnrollment] = useState(false);

  const handleAddPrerequisite = () => {
    setSelectCertificateDialog(true);
  };

  const handleEditInactivity = () => {
    setInactivitySettingsDialog(true);
  };

  return (
    <div className="space-y-6">
      {/* Enrollment Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Enrollment
            <Button variant="outline" size="sm" onClick={() => setEditEnrollmentDialog(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="enrollment-enabled" className="text-sm font-medium">
              Allow learners to enroll
            </Label>
            <Switch
              id="enrollment-enabled"
              checked={enrollmentEnabled}
              onCheckedChange={setEnrollmentEnabled}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="open-enrollment" className="text-sm font-medium">
              Open enrollment
            </Label>
            <Switch
              id="open-enrollment"
              checked={openEnrollment}
              onCheckedChange={setOpenEnrollment}
            />
          </div>
        </CardContent>
      </Card>

      {/* Prerequisites */}
      <Card>
        <CardHeader>
          <CardTitle>Prerequisites</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-600 mb-4">There are no prerequisites.</p>
          <Button onClick={handleAddPrerequisite}>
            <Plus className="mr-2 h-4 w-4" />
            Add
          </Button>
        </CardContent>
      </Card>

      {/* Enrollment actions */}
      <Card>
        <CardHeader>
          <CardTitle>Enrollment actions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="mb-4">
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Added</TableHead>
                <TableHead className="w-[100px]">Edit</TableHead>
                <TableHead className="w-[100px]">Remove</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>📧 Send the canned message: 'enrollment'</TableCell>
                <TableCell>May 14, 2025</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button onClick={() => setAddEnrollmentActionDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add
          </Button>
        </CardContent>
      </Card>

      {/* Unenrollment actions */}
      <Card>
        <CardHeader>
          <CardTitle>Unenrollment actions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="mb-4">
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Added</TableHead>
                <TableHead className="w-[100px]">Edit</TableHead>
                <TableHead className="w-[100px]">Remove</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>📧 Send the canned message: 'unenrollment'</TableCell>
                <TableCell>May 14, 2025</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button onClick={() => setAddUnenrollmentActionDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add
          </Button>
        </CardContent>
      </Card>

      {/* Reenrollment actions */}
      <Card>
        <CardHeader>
          <CardTitle>Reenrollment actions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="mb-4">
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Added</TableHead>
                <TableHead className="w-[100px]">Edit</TableHead>
                <TableHead className="w-[100px]">Remove</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>📧 Send the canned message: 'reenrollment'</TableCell>
                <TableCell>May 14, 2025</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button onClick={() => setAddReenrollmentActionDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add
          </Button>
        </CardContent>
      </Card>

      {/* Inactivity actions */}
      <Card>
        <CardHeader>
          <CardTitle>Inactivity actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Feature</p>
                <p className="text-sm text-gray-600">
                  Number of days of not visiting the course before learner is considered inactive: Disable
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={handleEditInactivity}>
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-blue-600">There are no actions.</p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <EditEnrollmentDialog
        open={editEnrollmentDialog}
        onOpenChange={setEditEnrollmentDialog}
      />

      <AddAccessActionDialog
        open={addEnrollmentActionDialog}
        onOpenChange={setAddEnrollmentActionDialog}
        title="Add enrollment action"
      />

      <AddAccessActionDialog
        open={addUnenrollmentActionDialog}
        onOpenChange={setAddUnenrollmentActionDialog}
        title="Add unenrollment action"
      />

      <AddAccessActionDialog
        open={addReenrollmentActionDialog}
        onOpenChange={setAddReenrollmentActionDialog}
        title="Add reenrollment action"
      />

      <SelectCertificateDialog
        open={selectCertificateDialog}
        onOpenChange={setSelectCertificateDialog}
      />

      <InactivitySettingsDialog
        open={inactivitySettingsDialog}
        onOpenChange={setInactivitySettingsDialog}
      />
    </div>
  );
};

export default CourseEnrollmentAdmin;
