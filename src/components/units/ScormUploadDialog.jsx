import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, File, X, Package, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const ScormUploadDialog = ({ isOpen, onClose, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [folderName, setFolderName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExtracted, setIsExtracted] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/zip' || file.name.endsWith('.zip')) {
        setSelectedFile(file);
        const nameWithoutExtension = file.name.replace(/\.zip$/i, '');
        setFolderName(nameWithoutExtension);
        setIsExtracted(false);
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please select a ZIP file containing a SCORM package.",
          variant: "destructive"
        });
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && (file.type === 'application/zip' || file.name.endsWith('.zip'))) {
      setSelectedFile(file);
      const nameWithoutExtension = file.name.replace(/\.zip$/i, '');
      setFolderName(nameWithoutExtension);
      setIsExtracted(false);
    } else {
      toast({
        title: "Invalid File Type",
        description: "Please select a ZIP file containing a SCORM package.",
        variant: "destructive"
      });
    }
  };

  const simulateExtraction = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsExtracted(true);

    toast({
      title: "SCORM Package Extracted",
      description: "Your SCORM package has been successfully extracted and is ready to use.",
    });
  };

  const handleUpload = async () => {
    if (!selectedFile || !folderName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please select a file and enter a folder name.",
        variant: "destructive"
      });
      return;
    }

    if (!isExtracted) {
      await simulateExtraction();
      return;
    }

    const scormData = {
      name: folderName.trim(),
      file: selectedFile
    };

    onUpload(scormData);

    setSelectedFile(null);
    setFolderName('');
    setIsExtracted(false);
    setIsProcessing(false);
  };

  const handleClose = () => {
    setSelectedFile(null);
    setFolderName('');
    setIsExtracted(false);
    setIsProcessing(false);
    onClose();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Add SCORM Package
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* File Upload Area */}
          <div className="space-y-2">
            <Label>Select SCORM Package (ZIP file)</Label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              {selectedFile ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-center">
                    {isExtracted ? (
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    ) : (
                      <File className="h-8 w-8 text-blue-500" />
                    )}
                  </div>
                  <p className="text-sm font-medium">{selectedFile.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(selectedFile.size)}</p>
                  {isExtracted && (
                    <p className="text-xs text-green-600">✓ Package extracted successfully</p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                  <p className="text-sm text-gray-600">
                    Drop your ZIP file here or click to browse
                  </p>
                  <p className="text-xs text-gray-500">
                    Only ZIP files containing SCORM packages are accepted
                  </p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept=".zip"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </div>

          {/* Folder Name Input */}
          {selectedFile && (
            <div className="space-y-2">
              <Label htmlFor="folderName">Folder Name</Label>
              <Input
                id="folderName"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="Enter folder name for the SCORM package"
                className="w-full"
              />
            </div>
          )}

          {/* Processing Status */}
          {isProcessing && (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-sm text-gray-600">Extracting SCORM package...</span>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleUpload} 
            disabled={!selectedFile || !folderName.trim() || isProcessing}
            className="bg-orange-600 hover:bg-orange-700"
          >
            {isProcessing ? 'Extracting...' : isExtracted ? 'Add to Units' : 'Extract Package'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
