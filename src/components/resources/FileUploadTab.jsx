import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, File, X, Search, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';

export function FileUploadTab() {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileArray = Array.from(e.dataTransfer.files);
      setFiles((prevFiles) => [...prevFiles, ...fileArray]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const fileArray = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...fileArray]);
    }
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
    setSelectedFiles(selectedFiles.filter(i => i !== index));
  };

  const handleUpload = () => {
    if (files.length === 0) {
      toast.error("Please select files to upload");
      return;
    }
    
    toast.success(`${files.length} files uploaded successfully`);
    setFiles([]);
    setSelectedFiles([]);
  };

  const handleDelete = () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select files to delete");
      return;
    }
    
    setFiles(files.filter((_, index) => !selectedFiles.includes(index)));
    toast.success(`${selectedFiles.length} files deleted`);
    setSelectedFiles([]);
  };

  const handleSelectFile = (index, checked) => {
    if (checked) {
      setSelectedFiles(prev => [...prev, index]);
    } else {
      setSelectedFiles(prev => prev.filter(i => i !== index));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedFiles(files.map((_, index) => index));
    } else {
      setSelectedFiles([]);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 mb-6">
        <h1 className="text-2xl font-semibold">Upload Files</h1>
        <p className="text-muted-foreground">
          Click on a file to access it. You can upload multiple files at once.
        </p>
      </div>

      <div className="flex gap-2 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search..." 
            className="pl-10"
          />
        </div>
        <Button variant="outline" onClick={handleDelete} disabled={selectedFiles.length === 0}>
          <Trash2 className="mr-2 h-4 w-4" /> Delete
        </Button>
        <div className="ml-auto">
          <label className="cursor-pointer">
            <Input 
              type="file" 
              className="hidden" 
              onChange={handleChange} 
              multiple
            />
            <Button>
              <Upload className="mr-2 h-4 w-4" /> Upload
            </Button>
          </label>
        </div>
      </div>

      {files.length === 0 ? (
        <div 
          className={`border-2 border-dashed rounded-lg p-10 text-center ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <Upload className="h-12 w-12 text-gray-400" />
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Drag files here or click to upload</h3>
              <p className="text-sm text-gray-500">
                Support for document, image, video and audio files
              </p>
            </div>
            <label className="cursor-pointer">
              <Input 
                type="file" 
                className="hidden" 
                onChange={handleChange} 
                multiple
              />
              <Button type="button" variant="outline">Select files</Button>
            </label>
          </div>
        </div>
      ) : (
        <div className="border rounded-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="w-10 p-3 text-left">
                  <Checkbox 
                    checked={selectedFiles.length > 0 && selectedFiles.length === files.length}
                    onCheckedChange={(checked) => handleSelectAll(!!checked)}
                  />
                </th>
                <th className="p-3 text-left font-medium">#</th>
                <th className="p-3 text-left font-medium">Filename</th>
                <th className="p-3 text-left font-medium">Size</th>
                <th className="p-3 text-left font-medium">Created</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr key={index} className="border-t hover:bg-muted/10">
                  <td className="p-3">
                    <Checkbox 
                      checked={selectedFiles.includes(index)}
                      onCheckedChange={(checked) => handleSelectFile(index, !!checked)}
                    />
                  </td>
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <File className="h-5 w-5 text-blue-500" />
                      {file.name}
                    </div>
                  </td>
                  <td className="p-3">{(file.size / 1024).toFixed(2)} KB</td>
                  <td className="p-3">{new Date().toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}