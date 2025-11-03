import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, FileText, Download, X } from 'lucide-react';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const ImportParticipantsDialog = ({ open, onOpenChange, onImport }) => {
  const [importedData, setImportedData] = useState([]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) return;

    if (!uploadedFile.name.endsWith('.csv') && !uploadedFile.name.endsWith('.xlsx')) {
      toast.error('Please upload a CSV or Excel file');
      return;
    }

    setFile(uploadedFile);

    // Simulate file parsing (in real app, use a library like Papa Parse or xlsx)
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(h => h.trim());
      
      const parsed = lines.slice(1).map((line, index) => {
        const values = line.split(',').map(v => v.trim());
        return {
          id: `import-${index}`,
          name: values[0] || '',
          email: values[1] || '',
          role: values[2] || 'Participant',
          school: values[3] || '',
          isValid: values[0] && values[1] // Basic validation
        };
      }).filter(row => row.isValid);

      setPreview(parsed);
      toast.success(`Parsed ${parsed.length} participants from file`);
    };

    reader.readAsText(uploadedFile);
  };

  const handleImport = () => {
    if (preview.length === 0) {
      toast.error('No valid participants to import');
      return;
    }

    onImport(preview);
    setPreview([]);
    setFile(null);
    onOpenChange(false);
    toast.success(`Successfully imported ${preview.length} participants`);
  };

  const downloadTemplate = () => {
    const template = `Name,Email,Role,School
John Doe,john.doe@example.com,Participant,Sample School 1
Jane Smith,jane.smith@example.com,Facilitator,Sample School 2
Bob Johnson,bob.johnson@example.com,Participant,Sample School 1`;

    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'participants-import-template.csv';
    link.click();
    window.URL.revokeObjectURL(url);
    toast.success('Template downloaded');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Import Participants</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-sm text-gray-600 mb-4">
              Upload a CSV or Excel file with participant details
            </p>
            <input
              type="file"
              accept=".csv,.xlsx"
              onChange={handleFileUpload}
              className="hidden"
              id="participant-file-upload"
            />
            <div className="flex gap-2 justify-center">
              <Button
                variant="outline"
                onClick={() => document.getElementById('participant-file-upload')?.click()}
              >
                <FileText className="h-4 w-4 mr-2" />
                Choose File
              </Button>
              <Button variant="outline" onClick={downloadTemplate}>
                <Download className="h-4 w-4 mr-2" />
                Download Template
              </Button>
            </div>
            {file && (
              <div className="mt-4 flex items-center justify-center gap-2">
                <FileText className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">{file.name}</span>
                <button
                  onClick={() => {
                    setFile(null);
                    setPreview([]);
                  }}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {preview.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Preview ({preview.length} participants)</h3>
                <Badge variant="outline">{preview.length} ready to import</Badge>
              </div>
              <div className="border rounded-lg overflow-hidden max-h-64 overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>School</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {preview.map((participant) => (
                      <TableRow key={participant.id}>
                        <TableCell>{participant.name}</TableCell>
                        <TableCell>{participant.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{participant.role}</Badge>
                        </TableCell>
                        <TableCell>{participant.school}</TableCell>
                        <TableCell>
                          {participant.isValid ? (
                            <Badge className="bg-green-100 text-green-800">Valid</Badge>
                          ) : (
                            <Badge variant="destructive">Invalid</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleImport} className="flex-1">
                  Import {preview.length} Participants
                </Button>
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportParticipantsDialog;

