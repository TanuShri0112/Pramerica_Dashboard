import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from 'lucide-react';

const CourseAutomation = () => {
  const [activeTab, setActiveTab] = useState('course');

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-6">Automation</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="course" className="px-6 py-2">Course</TabsTrigger>
            <TabsTrigger value="modules" className="px-6 py-2">Modules</TabsTrigger>
          </TabsList>
          
          <TabsContent value="course">
            <div className="space-y-8">
              {/* Enrollment actions */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Enrollment actions</h2>
                  
                  <Table className="mb-4">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Action</TableHead>
                        <TableHead>Added</TableHead>
                        <TableHead className="w-[100px]">Edit</TableHead>
                        <TableHead className="w-[100px]">Remove</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>📧 Send the canned message: 'enrollment'</TableCell>
                        <TableCell>May 14, 2025</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </CardContent>
              </Card>

              {/* Unenrollment actions */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Unenrollment actions</h2>
                  
                  <Table className="mb-4">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Action</TableHead>
                        <TableHead>Added</TableHead>
                        <TableHead className="w-[100px]">Edit</TableHead>
                        <TableHead className="w-[100px]">Remove</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>📧 Send the canned message: 'unenrollment'</TableCell>
                        <TableCell>May 14, 2025</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </CardContent>
              </Card>

              {/* Reenrollment actions */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Reenrollment actions</h2>
                  
                  <Table className="mb-4">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Action</TableHead>
                        <TableHead>Added</TableHead>
                        <TableHead className="w-[100px]">Edit</TableHead>
                        <TableHead className="w-[100px]">Remove</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>📧 Send the canned message: 'reenrollment'</TableCell>
                        <TableCell>May 14, 2025</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </CardContent>
              </Card>

              {/* Inactivity actions */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Inactivity actions</h2>
                  <p className="text-blue-600 mb-4">There are no actions.</p>
                  
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </CardContent>
              </Card>

              {/* Completion actions */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Completion actions</h2>
                  
                  <Table className="mb-4">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Action</TableHead>
                        <TableHead>Added</TableHead>
                        <TableHead className="w-[100px]">Edit</TableHead>
                        <TableHead className="w-[100px]">Remove</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>📧 Send the canned message: 'course completion' (Popup)</TableCell>
                        <TableCell>May 14, 2025</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="modules">
            <Card>
              <CardContent className="p-6">
                <p className="text-blue-600">Module automation settings coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CourseAutomation;