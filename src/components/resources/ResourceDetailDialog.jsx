import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, List, Calendar, User, Tag } from 'lucide-react';

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
 * @typedef {object} SkillCategory
 * @property {string} category
 * @property {string[]} items
 */

/**
 * @typedef {object} ResourceContent
 * @property {LibraryContent} [library]
 * @property {MetadataContent} [metadata]
 * @property {SkillCategory[]} [skills]
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
 * Displays the detailed view of a resource in a dialog.
 * @param {object} props
 * @param {ResourceType | null} props.resource - The resource object to display.
 * @param {boolean} props.open - Whether the dialog is open.
 * @param {() => void} props.onClose - Function to call when the dialog should close.
 * @param {() => void} props.onEdit - Function to call when the edit button is clicked.
 */
export function ResourceDetailDialog({ resource, open, onClose, onEdit }) {
  if (!resource) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" />
            {resource.title} - Detailed View
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Basic Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Title:</span>
                    <span>{resource.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Author:</span>
                    <span>{resource.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Date:</span>
                    <span>{resource.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <List className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Type:</span>
                    <span className="capitalize">{resource.type}</span>
                  </div>
                </div>
              </div>

              {resource.content?.library && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Library Information</h4>
                  <div className="space-y-1 text-sm">
                    <div><span className="font-medium">Type:</span> {resource.content.library.type}</div>
                    <div><span className="font-medium">Scope:</span> {resource.content.library.scope}</div>
                    <div><span className="font-medium">Favorite:</span> {resource.content.library.favorite ? 'Yes' : 'No'}</div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {resource.content?.metadata && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">Metadata</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium">Creator:</span>
                      <p className="text-blue-600">{resource.content.metadata.creator}</p>
                    </div>
                    <div>
                      <span className="font-medium">Created:</span>
                      <p>{resource.content.metadata.created}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Tag className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">Tags:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {resource.content.metadata.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="bg-green-100 text-green-800">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Skills Section */}
          {resource.content?.skills && (
            <div>
              <h3 className="font-semibold text-lg mb-4">Skills & Competencies</h3>
              <div className="space-y-4">
                {resource.content.skills.map((skillCategory, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-medium text-blue-600 mb-3">
                      {index + 1}. {skillCategory.category}
                    </h4>
                    <ul className="space-y-2">
                      {skillCategory.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600" onClick={onEdit}>
              Edit Resource
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}