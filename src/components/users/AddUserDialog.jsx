import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { useUserFilter } from "@/contexts/UserFilterContext";
import { Plus, Trash2, Upload } from "lucide-react";

export function AddUserDialog({ open, onOpenChange }) {
  const { addUser, selectedRole, users } = useUserFilter();
  const [activeTab, setActiveTab] = useState("single");

  const singleUserForm = useForm({
    defaultValues: {}
  });

  const bulkUserForm = useForm({
    defaultValues: {
      users: [{ name: "", email: "", phone: "" }],
      autoGeneratePasswords: true,
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: bulkUserForm.control,
    name: "users"
  });

  const handleSingleUserSubmit = (data) => {
    const existingUser = users.find(user => user.email.toLowerCase() === data.email.toLowerCase());
    if (existingUser) {
      toast({
        title: "Email already exists",
        description: `A user with email ${data.email} already exists.`,
        variant: "destructive"
      });
      return;
    }

    const newUser = {
      name: data.name,
      email: data.email,
      role: ["learner"],
      avatar: "/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png",
      lastVisited: "Just added",
      groups: 0,
      courses: 0,
    };

    addUser(newUser);

    toast({
      title: "User created",
      description: `${data.name} has been added as a learner.`,
    });

    singleUserForm.reset();
    onOpenChange(false);
  };

  const handleBulkUserSubmit = (data) => {
    const validUsers = data.users.filter(user => user.name && user.email);

    if (validUsers.length === 0) {
      toast({
        title: "No valid users",
        description: "Please provide at least one user with name and email.",
        variant: "destructive"
      });
      return;
    }

    const emails = validUsers.map(user => user.email.toLowerCase());
    const duplicateEmails = emails.filter((email, index) => emails.indexOf(email) !== index);

    if (duplicateEmails.length > 0) {
      toast({
        title: "Duplicate emails found",
        description: `Duplicate emails in form: ${duplicateEmails.join(", ")}`,
        variant: "destructive"
      });
      return;
    }

    const existingEmails = validUsers
      .map(user => user.email.toLowerCase())
      .filter(email => users.some(existingUser => existingUser.email.toLowerCase() === email));

    if (existingEmails.length > 0) {
      toast({
        title: "Email(s) already exist",
        description: `These emails already exist: ${existingEmails.join(", ")}`,
        variant: "destructive"
      });
      return;
    }

    validUsers.forEach(userData => {
      const newUser = {
        name: userData.name,
        email: userData.email,
        role: ["learner"],
        avatar: "/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png",
        lastVisited: "Just added",
        groups: 0,
        courses: 0,
      };
      addUser(newUser);
    });

    toast({
      title: "Users created successfully",
      description: `${validUsers.length} learner${validUsers.length > 1 ? 's' : ''} created successfully!`,
    });

    bulkUserForm.reset({
      users: [{ name: "", email: "", phone: "" }],
      autoGeneratePasswords: true,
    });
    onOpenChange(false);
  };

  const addUserRow = () => {
    append({ name: "", email: "", phone: "" });
  };

  const removeUserRow = (index) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const handleCSVUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      const lines = text.split('\n').filter(line => line.trim());

      const dataLines = lines.slice(1);

      const csvUsers = dataLines.map(line => {
        const [name, email, , phone] = line.split(',').map(item => item.trim());
        return {
          name: name || "",
          email: email || "",
          phone: phone || ""
        };
      }).filter(user => user.name && user.email);

      if (csvUsers.length > 0) {
        bulkUserForm.setValue("users", csvUsers);
        toast({
          title: "CSV uploaded",
          description: `${csvUsers.length} users loaded from CSV.`,
        });
      }
    };
    reader.readAsText(file);

    event.target.value = '';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Learner(s)</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={value => setActiveTab(value)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="single">Single Learner</TabsTrigger>
            <TabsTrigger value="multiple">Multiple Learners</TabsTrigger>
          </TabsList>

          {/* Single Learner Tab */}
          <TabsContent value="single" className="space-y-4">
            <Form {...singleUserForm}>
              <form onSubmit={singleUserForm.handleSubmit(handleSingleUserSubmit)} className="space-y-4">
                <FormField
                  control={singleUserForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={singleUserForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Role:</strong> Learner (default)
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    All new users will be added as learners.
                  </p>
                </div>
                <FormField
                  control={singleUserForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Learner</Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>

          {/* Multiple Learners Tab */}
          <TabsContent value="multiple" className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <label htmlFor="csv-upload" className="cursor-pointer">
                  <div className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                    <Upload className="h-4 w-4" />
                    Upload CSV file (Name, Email, Phone)
                  </div>
                </label>
                <input
                  id="csv-upload"
                  type="file"
                  accept=".csv"
                  onChange={handleCSVUpload}
                  className="hidden"
                />
              </div>
            </div>

            <Form {...bulkUserForm}>
              <form onSubmit={bulkUserForm.handleSubmit(handleBulkUserSubmit)} className="space-y-4">
                <FormField
                  control={bulkUserForm.control}
                  name="autoGeneratePasswords"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Auto-generate passwords</FormLabel>
                        <FormDescription>
                          Automatically generate secure passwords for new learners
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Learners to Add</h4>
                    <Button type="button" onClick={addUserRow} size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Row
                    </Button>
                  </div>

                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {fields.map((field, index) => (
                      <div key={field.id} className="grid grid-cols-10 gap-2 items-end p-3 border rounded-lg">
                        <div className="col-span-4">
                          <FormField
                            control={bulkUserForm.control}
                            name={`users.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                {index === 0 && <FormLabel className="text-xs">Name</FormLabel>}
                                <FormControl>
                                  <Input placeholder="Full name" {...field} className="text-sm" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="col-span-4">
                          <FormField
                            control={bulkUserForm.control}
                            name={`users.${index}.email`}
                            render={({ field }) => (
                              <FormItem>
                                {index === 0 && <FormLabel className="text-xs">Email</FormLabel>}
                                <FormControl>
                                  <Input type="email" placeholder="Email" {...field} className="text-sm" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="col-span-1">
                          {fields.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeUserRow(index)}
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Add {
                      fields.filter(f =>
                        bulkUserForm.getValues(`users.${fields.indexOf(f)}.name`) &&
                        bulkUserForm.getValues(`users.${fields.indexOf(f)}.email`)
                      ).length
                    } Learner(s)
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
