import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'; // Note: Textarea is imported but not used in the original code.
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { X, Plus } from 'lucide-react';

/**
 * JSDoc type definitions for clarity and editor support.
 */

/**
 * @typedef {object} LibraryContent
 * @property {string} type
 * @property {string} scope
 * @property {boolean} favorite
 */

/**
 * @typedef {object} MetadataContent
 * @property {string} creator
 * @property {string} created
 * @property {string[]} tags
 */

/**
 * @typedef {object} ResourceContent
 * @property {LibraryContent} [library]
 * @property {MetadataContent} [metadata]
 * @property {any[]} [skills] // Assuming skills might exist based on the previous component
 */

/**
 * @typedef {object} ResourceType
 * @property {string} title
 * @property {string} author
 * @property {string} date
 * @property {string} type
 * @property {ResourceContent} [content]
 */

/**
 * @typedef {object} FormValues
 * @property {string} title
 * @property {string} author
 * @property {string} date
 * @property {string[]} tags
 * @property {string} creator
 * @property {string} libraryType
 * @property {string} libraryScope
 * @property {boolean} favorite
 */

/**
 * A dialog for editing a resource's details.
 * @param {object} props
 * @param {ResourceType | null} props.resource - The resource to be edited.
 * @param {boolean} props.open - Controls if the dialog is visible.
 * @param {() => void} props.onClose - Function to close the dialog.
 * @param {(updatedResource: ResourceType) => void} props.onSave - Callback with the updated resource data.
 */
export function EditResourceDialog({ resource, open, onClose, onSave }) {
  const [newTag, setNewTag] = useState('');
  
  const form = useForm({
    defaultValues: {
      title: '',
      author: '',
      date: '',
      tags: [],
      creator: '',
      libraryType: '',
      libraryScope: '',
      favorite: false,
    },
  });

  useEffect(() => {
    if (resource) {
      form.reset({
        title: resource.title,
        author: resource.author,
        date: resource.date,
        tags: resource.content?.metadata?.tags || [],
        creator: resource.content?.metadata?.creator || '',
        libraryType: resource.content?.library?.type || '',
        libraryScope: resource.content?.library?.scope || '',
        favorite: resource.content?.library?.favorite || false,
      });
    }
  }, [resource, form]);

  /** @param {FormValues} values */
  const handleSubmit = (values) => {
    if (!resource) return;

    const updatedResource = {
      ...resource,
      title: values.title,
      author: values.author,
      date: values.date,
      content: {
        ...resource.content,
        metadata: {
          ...resource.content?.metadata,
          creator: values.creator,
          created: values.date, // Assuming the 'created' date should be updated with the form's date
          tags: values.tags,
        },
        library: {
          ...resource.content?.library,
          type: values.libraryType,
          scope: values.libraryScope,
          favorite: values.favorite,
        },
      },
    };

    onSave(updatedResource);
    toast.success('Resource updated successfully');
    onClose();
  };

  const addTag = () => {
    if (newTag.trim()) {
      const currentTags = form.getValues('tags') || [];
      if (!currentTags.includes(newTag.trim())) {
        form.setValue('tags', [...currentTags, newTag.trim()]);
      }
      setNewTag('');
    }
  };

  /** @param {string} tagToRemove */
  const removeTag = (tagToRemove) => {
    const currentTags = form.getValues('tags') || [];
    form.setValue('tags', currentTags.filter(tag => tag !== tagToRemove));
  };

  if (!resource) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Resource</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Title:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter title" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Author:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter author" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Date:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter date" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="creator"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Creator:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter creator" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="libraryType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Library Type:</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter library type" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="libraryScope"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Library Scope:</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter library scope" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="favorite"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                  </FormControl>
                  <FormLabel className="font-medium !mt-0">Mark as Favorite</FormLabel>
                </FormItem>
              )}
            />

            <div>
              <FormLabel className="font-medium">Tags:</FormLabel>
              <div className="flex gap-2 mt-2 mb-3">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <Button type="button" onClick={addTag} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(form.watch('tags') || []).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-green-600 hover:text-green-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}