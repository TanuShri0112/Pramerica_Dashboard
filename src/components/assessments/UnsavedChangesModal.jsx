import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, X } from 'lucide-react';

export const UnsavedChangesModal = ({
  isOpen,
  onClose,
  currentType,
  newType,
  onCancel,
  onPublishAndSwitch
}) => {
  const getTypeDisplayName = (type) => {
    switch (type) {
      case 'quiz': return 'Quiz';
      case 'assignment': return 'Assignment';
      case 'survey': return 'Survey';
      case 'essay': return 'Essay';
      case 'debate': return 'Debate';
      default: return type;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white rounded-2xl border-0 shadow-2xl p-0 overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-10 rounded-full p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-8 text-center">
          {/* Warning icon */}
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Unsaved Changes Warning
          </h2>

          {/* Content */}
          <div className="space-y-4 mb-8">
            <p className="text-gray-700 text-lg leading-relaxed">
              You're currently building a <span className="font-semibold text-gray-900">{getTypeDisplayName(currentType)}</span>.
            </p>

            <p className="text-gray-600 leading-relaxed">
              If you switch to <span className="font-semibold text-gray-900">{getTypeDisplayName(newType)}</span> now, your current progress will be lost.
            </p>

            <div className="bg-orange-50 px-4 py-3 rounded-lg border-l-4 border-orange-400 mt-6">
              <p className="text-orange-700 font-medium text-sm">
                Please publish your current {getTypeDisplayName(currentType).toLowerCase()} before moving to a new assessment type.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1 h-11 bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 font-medium rounded-lg transition-all duration-200"
            >
              Cancel
            </Button>
            <Button
              onClick={onPublishAndSwitch}
              className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              ✓ Publish & Switch
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UnsavedChangesModal;
