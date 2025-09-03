import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function ResourceFormDialog({ resourceType, open, onClose }) {
  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
      number: '',
      library: 'personal',
    },
  });

  const handleSubmit = (values) => {
    console.log(values);
    toast.success(`${resourceType} created successfully`);
    form.reset();
    onClose();
  };

  const getTitle = () => {
    const formattedType = resourceType.charAt(0).toUpperCase() + resourceType.slice(1);
    return `Add ${formattedType}`;
  };

  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>{getTitle()}</DialogTitle>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Name:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Description:</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter description" {...field} className="min-h-[100px]" />
                  </FormControl>
                </FormItem>
              )}
            />
            
            {resourceType === 'certificate' && (
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Number: *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="library"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Library:</FormLabel>
                  <FormControl>
                    <RadioGroup 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      className="flex space-x-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="personal" id="personal" />
                        <Label htmlFor="personal">Personal</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="organization" id="organization" />
                        <Label htmlFor="organization">Organization</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="business" id="business" />
                        <Label htmlFor="business">Business</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="mt-4">
              <p className="text-sm text-gray-500">* Optional</p>
            </div>

            <DialogFooter>
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>

      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Resource Details: {/* selectedResource?.title */}</DialogTitle>
          </DialogHeader>
          <div>
            <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
              {/* {JSON.stringify(selectedResource, null, 2)} */}
            </pre>
            {/* You can replace the above with a more user-friendly details view if desired */}
          </div>
          <DialogFooter>
            <Button onClick={() => setShowDetailsDialog(false)} className="bg-blue-500 hover:bg-blue-600">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}