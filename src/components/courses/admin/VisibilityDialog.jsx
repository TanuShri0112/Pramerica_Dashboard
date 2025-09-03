import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Calendar } from "lucide-react";

const VisibilityDialog = ({ open, onOpenChange }) => {
  const [fieldName, setFieldName] = useState("");
  const [operator, setOperator] = useState("");

  const handleSave = () => {
    onOpenChange(false);
    setFieldName("");
    setOperator("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Visibility</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center gap-2">
            <Select value={fieldName} onValueChange={setFieldName}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Name" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="department">Department</SelectItem>
                <SelectItem value="role">Role</SelectItem>
              </SelectContent>
            </Select>

            <Select value={operator} onValueChange={setOperator}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="equals" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="equals">equals</SelectItem>
                <SelectItem value="not_equals">not equals</SelectItem>
                <SelectItem value="contains">contains</SelectItem>
                <SelectItem value="starts_with">starts with</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon" className="bg-blue-500 text-white hover:bg-blue-600">
              <Plus className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button 
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VisibilityDialog;
