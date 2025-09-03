import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

/**
 * @typedef {object} Group
 * @property {number} id
 * @property {string} name
 * @property {number} members
 * @property {string} type
 * @property {string} image
 */

/**
 * @typedef {object} GroupEditFormData
 * @property {string} name
 * @property {string} type
 * @property {string} [description]
 */

/**
 * A dialog for editing an existing group.
 * @param {object} props
 * @param {boolean} props.open - Whether the dialog is open.
 * @param {(open: boolean) => void} props.onOpenChange - Function to handle dialog open/close state.
 * @param {Group | null} props.group - The group object to be edited.
 * @param {(groupId: number, updatedData: Partial<Group>) => void} props.onSave - Callback function to save the updated group data.
 */
export function GroupEditDialog({ open, onOpenChange, group, onSave }) {
  const form = useForm({
    defaultValues: {
      name: group?.name || "",
      type: group?.type || "",
      description: ""
    }
  });

  React.useEffect(() => {
    if (group) {
      form.reset({
        name: group.name,
        type: group.type,
        description: "" // Description is not part of the group model, so it resets to empty
      });
    }
  }, [group, form]);

  /**
   * @param {GroupEditFormData} data
   */
  const onSubmit = (data) => {
    if (!group) return;
    
    onSave(group.id, {
      name: data.name,
      type: data.type
    });
    
    toast({
      title: "Group updated",
      description: "The group has been updated successfully.",
    });
    
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Group</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter group name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter group type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter group description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}