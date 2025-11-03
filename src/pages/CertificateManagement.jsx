import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Award, Download, Edit, Eye, ArrowLeft, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const CertificateManagement = () => {
  const navigate = useNavigate();
  
  const [certificates, setCertificates] = useState([
    {
      id: 1,
      userId: 101,
      userName: 'John Doe',
      userEmail: 'john@example.com',
      trainingProgram: 'DepEd Leadership Training',
      completionDate: new Date('2024-02-15'),
      issuedDate: new Date('2024-02-16'),
      template: 'DepEd Theme',
      certificateNumber: 'CERT-2024-001',
      status: 'issued',
      downloadUrl: '#'
    },
    {
      id: 2,
      userId: 102,
      userName: 'Jane Smith',
      userEmail: 'jane@example.com',
      trainingProgram: 'Teacher Development Program',
      completionDate: new Date('2024-02-20'),
      issuedDate: new Date('2024-02-21'),
      template: 'Athena Theme',
      certificateNumber: 'CERT-2024-002',
      status: 'issued',
      downloadUrl: '#'
    }
  ]);

  const [templates, setTemplates] = useState([
    { id: 1, name: 'DepEd Theme', description: 'Official DepEd certificate template', isDefault: true },
    { id: 2, name: 'Athena Theme', description: 'Modern Athena certificate template', isDefault: false }
  ]);

  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    theme: 'deped'
  });

  const [pendingCertificates, setPendingCertificates] = useState([
    {
      userId: 103,
      userName: 'Bob Johnson',
      userEmail: 'bob@example.com',
      trainingProgram: 'DepEd Leadership Training',
      completionDate: new Date('2024-02-18'),
      eligible: true
    }
  ]);

  const createTemplate = () => {
    if (!newTemplate.name.trim()) {
      toast.error('Template name is required');
      return;
    }

    const template = {
      id: Math.max(...templates.map(t => t.id), 0) + 1,
      ...newTemplate,
      isDefault: false
    };

    setTemplates([...templates, template]);
    setNewTemplate({ name: '', description: '', theme: 'deped' });
    setIsTemplateDialogOpen(false);
    toast.success('Certificate template created successfully');
  };

  const generateCertificate = (pendingCert, templateId) => {
    const template = templates.find(t => t.id === templateId);
    if (!template) {
      toast.error('Please select a template');
      return;
    }

    const certificate = {
      id: Math.max(...certificates.map(c => c.id), 0) + 1,
      userId: pendingCert.userId,
      userName: pendingCert.userName,
      userEmail: pendingCert.userEmail,
      trainingProgram: pendingCert.trainingProgram,
      completionDate: pendingCert.completionDate,
      issuedDate: new Date(),
      template: template.name,
      certificateNumber: `CERT-${new Date().getFullYear()}-${String(certificates.length + 1).padStart(3, '0')}`,
      status: 'issued',
      downloadUrl: '#'
    };

    setCertificates([...certificates, certificate]);
    setPendingCertificates(pendingCertificates.filter(c => c.userId !== pendingCert.userId));
    setIsGenerateDialogOpen(false);
    toast.success(`Certificate generated for ${pendingCert.userName}`);
  };

  const autoGenerateCertificates = () => {
    const newCertificates = pendingCertificates.map((cert, index) => ({
      id: Math.max(...certificates.map(c => c.id), 0) + index + 1,
      userId: cert.userId,
      userName: cert.userName,
      userEmail: cert.userEmail,
      trainingProgram: cert.trainingProgram,
      completionDate: cert.completionDate,
      issuedDate: new Date(),
      template: templates.find(t => t.isDefault)?.name || 'DepEd Theme',
      certificateNumber: `CERT-${new Date().getFullYear()}-${String(certificates.length + index + 1).padStart(3, '0')}`,
      status: 'issued',
      downloadUrl: '#'
    }));

    setCertificates([...certificates, ...newCertificates]);
    setPendingCertificates([]);
    toast.success(`${newCertificates.length} certificate(s) auto-generated successfully`);
  };

  const downloadCertificate = (certificate) => {
    // In real app, this would download the PDF
    toast.success(`Downloading certificate: ${certificate.certificateNumber}`);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button onClick={() => navigate('/')} variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Certificate Generation System</h1>
            <p className="text-gray-600 mt-2">Auto-generate and manage training completion certificates</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Edit className="h-4 w-4" /> Template Editor
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Certificate Template</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Template Name *"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                />
                <Textarea
                  placeholder="Description"
                  value={newTemplate.description}
                  onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                  rows={3}
                />
                <Select value={newTemplate.theme} onValueChange={(value) => setNewTemplate({ ...newTemplate, theme: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="deped">DepEd Theme</SelectItem>
                    <SelectItem value="athena">Athena Theme</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Button onClick={createTemplate} className="flex-1">Create Template</Button>
                  <Button variant="outline" onClick={() => setIsTemplateDialogOpen(false)} className="flex-1">Cancel</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">
            Pending ({pendingCertificates.length})
          </TabsTrigger>
          <TabsTrigger value="issued">Issued ({certificates.length})</TabsTrigger>
          <TabsTrigger value="templates">Templates ({templates.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Certificates Pending Generation</CardTitle>
                {pendingCertificates.length > 0 && (
                  <Button onClick={autoGenerateCertificates} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" /> Auto-Generate All
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {pendingCertificates.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Participant</TableHead>
                      <TableHead>Training Program</TableHead>
                      <TableHead>Completion Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingCertificates.map((cert) => (
                      <TableRow key={cert.userId}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{cert.userName}</div>
                            <div className="text-sm text-gray-500">{cert.userEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell>{cert.trainingProgram}</TableCell>
                        <TableCell>{format(cert.completionDate, 'PPP')}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedTemplate(cert);
                              setIsGenerateDialogOpen(true);
                            }}
                          >
                            <Award className="h-4 w-4 mr-1" /> Generate Certificate
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No pending certificates. All eligible participants have been issued certificates.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issued" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Issued Certificates</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Certificate Number</TableHead>
                    <TableHead>Participant</TableHead>
                    <TableHead>Training Program</TableHead>
                    <TableHead>Template</TableHead>
                    <TableHead>Issued Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {certificates.map((certificate) => (
                    <TableRow key={certificate.id}>
                      <TableCell className="font-medium">{certificate.certificateNumber}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{certificate.userName}</div>
                          <div className="text-sm text-gray-500">{certificate.userEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>{certificate.trainingProgram}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{certificate.template}</Badge>
                      </TableCell>
                      <TableCell>{format(certificate.issuedDate, 'PPP')}</TableCell>
                      <TableCell>
                        <Badge variant="default">{certificate.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => downloadCertificate(certificate)}
                          >
                            <Download className="h-4 w-4 mr-1" /> Download
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{template.name}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                    </div>
                    {template.isDefault && (
                      <Badge>Default</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="p-8 bg-gray-100 rounded-lg border-2 border-dashed text-center mb-4">
                    <FileText className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Certificate Preview</p>
                    <p className="text-xs text-gray-500 mt-1">Template: {template.name}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" /> Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Generate Certificate Dialog */}
      <Dialog open={isGenerateDialogOpen} onOpenChange={setIsGenerateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Certificate for {selectedTemplate?.userName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Select onValueChange={(value) => generateCertificate(selectedTemplate, parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Select Template" />
              </SelectTrigger>
              <SelectContent>
                {templates.map(template => (
                  <SelectItem key={template.id} value={template.id.toString()}>
                    {template.name} {template.isDefault && '(Default)'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => setIsGenerateDialogOpen(false)} className="w-full">
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CertificateManagement;

