import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Bed, UtensilsCrossed, Building2, Users, Search, Download, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const AccommodationManagement = () => {
  const navigate = useNavigate();
  
  const [trainingBatches, setTrainingBatches] = useState([
    {
      id: 1,
      name: 'DepEd Leadership Training - Batch 1',
      date: '2024-02-15',
      venue: 'Manila Hotel',
      participants: [
        { id: 1, name: 'John Doe', email: 'john@example.com', roomNumber: '101', roomType: 'Single', mealPlan: 'Full Board' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', roomNumber: '102', roomType: 'Single', mealPlan: 'Full Board' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', roomNumber: '201', roomType: 'Double', mealPlan: 'Breakfast Only' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', roomNumber: '201', roomType: 'Double', mealPlan: 'Breakfast Only' }
      ]
    },
    {
      id: 2,
      name: 'Teacher Development - Batch 2',
      date: '2024-02-20',
      venue: 'SMX Convention Center',
      participants: [
        { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', roomNumber: '301', roomType: 'Single', mealPlan: 'Full Board' },
        { id: 6, name: 'Diana Lee', email: 'diana@example.com', roomNumber: '302', roomType: 'Single', mealPlan: 'Half Board' }
      ]
    }
  ]);

  const [selectedBatch, setSelectedBatch] = useState(trainingBatches[0]?.id || null);
  const [isRoomDialogOpen, setIsRoomDialogOpen] = useState(false);
  const [isMealDialogOpen, setIsMealDialogOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const currentBatch = trainingBatches.find(b => b.id === selectedBatch);

  const mealPlans = ['Full Board', 'Half Board', 'Breakfast Only', 'Lunch Only', 'Dinner Only', 'No Meals'];
  const roomTypes = ['Single', 'Double', 'Triple', 'Suite'];

  const allocateRoom = (participantId, roomData) => {
    setTrainingBatches(prev => prev.map(batch => ({
      ...batch,
      participants: batch.participants.map(p => 
        p.id === participantId 
          ? { ...p, ...roomData }
          : p
      )
    })));
    setIsRoomDialogOpen(false);
    toast.success('Room allocated successfully');
  };

  const updateMealPlan = (participantId, mealPlan) => {
    setTrainingBatches(prev => prev.map(batch => ({
      ...batch,
      participants: batch.participants.map(p => 
        p.id === participantId 
          ? { ...p, mealPlan }
          : p
      )
    })));
    setIsMealDialogOpen(false);
    toast.success('Meal plan updated successfully');
  };

  const getRoomUtilization = () => {
    if (!currentBatch) return { total: 0, allocated: 0, available: 0 };
    const allocatedRooms = new Set(currentBatch.participants.map(p => p.roomNumber));
    return {
      total: 50, // Mock total rooms
      allocated: allocatedRooms.size,
      available: 50 - allocatedRooms.size
    };
  };

  const getMealStatistics = () => {
    if (!currentBatch) return [];
    const mealCounts = mealPlans.map(plan => ({
      name: plan,
      value: currentBatch.participants.filter(p => p.mealPlan === plan).length
    }));
    return mealCounts.filter(m => m.value > 0);
  };

  const exportParticipantList = () => {
    if (!currentBatch) {
      toast.error('Please select a training batch');
      return;
    }

    // Create CSV content
    const headers = ['Name', 'Email', 'Room Number', 'Room Type', 'Meal Plan'];
    const rows = currentBatch.participants.map(p => [
      p.name,
      p.email,
      p.roomNumber || 'Not Allocated',
      p.roomType || 'N/A',
      p.mealPlan || 'Not Assigned'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentBatch.name.replace(/\s+/g, '-')}-participants.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
    toast.success('Participant list exported successfully');
  };

  const filteredParticipants = currentBatch?.participants.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.roomNumber && p.roomNumber.includes(searchTerm))
  ) || [];

  const roomUtilization = getRoomUtilization();
  const mealStats = getMealStatistics();

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button onClick={() => navigate('/')} variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Accommodation & Meal Tracking</h1>
            <p className="text-gray-600 mt-2">Manage hotel room allocation and meal consumption per training batch</p>
          </div>
        </div>
        {currentBatch && (
          <Button onClick={exportParticipantList} className="flex items-center gap-2">
            <Download className="h-4 w-4" /> Export Participants
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <Select value={selectedBatch?.toString()} onValueChange={(value) => setSelectedBatch(parseInt(value))}>
          <SelectTrigger>
            <SelectValue placeholder="Select Training Batch" />
          </SelectTrigger>
          <SelectContent>
            {trainingBatches.map(batch => (
              <SelectItem key={batch.id} value={batch.id.toString()}>
                {batch.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {currentBatch && (
        <Tabs defaultValue="participants" className="space-y-4">
          <TabsList>
            <TabsTrigger value="participants">Room Allocation ({currentBatch.participants.length})</TabsTrigger>
            <TabsTrigger value="meals">Meal Tracking</TabsTrigger>
            <TabsTrigger value="analytics">Analytics & Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="participants" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Participants & Room Allocation</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search participants..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 w-64"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Participant</TableHead>
                      <TableHead>Room Number</TableHead>
                      <TableHead>Room Type</TableHead>
                      <TableHead>Meal Plan</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredParticipants.map((participant) => (
                      <TableRow key={participant.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{participant.name}</div>
                            <div className="text-sm text-gray-500">{participant.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {participant.roomNumber ? (
                            <Badge variant="outline">{participant.roomNumber}</Badge>
                          ) : (
                            <span className="text-gray-400">Not Allocated</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {participant.roomType ? (
                            <Badge variant="secondary">{participant.roomType}</Badge>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {participant.mealPlan ? (
                            <Badge>{participant.mealPlan}</Badge>
                          ) : (
                            <span className="text-gray-400">Not Assigned</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedParticipant(participant);
                                setIsRoomDialogOpen(true);
                              }}
                            >
                              <Bed className="h-4 w-4 mr-1" /> Room
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedParticipant(participant);
                                setIsMealDialogOpen(true);
                              }}
                            >
                              <UtensilsCrossed className="h-4 w-4 mr-1" /> Meal
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

          <TabsContent value="meals" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Meal Plan Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={mealStats}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {mealStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Meal Consumption Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mealPlans.map((plan) => {
                      const count = currentBatch.participants.filter(p => p.mealPlan === plan).length;
                      if (count === 0) return null;
                      return (
                        <div key={plan} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium">{plan}</span>
                          <Badge>{count} participants</Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" /> Venue Utilization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Total Rooms</span>
                      <span className="font-semibold">{roomUtilization.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Allocated</span>
                      <span className="font-semibold text-green-600">{roomUtilization.allocated}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Available</span>
                      <span className="font-semibold text-blue-600">{roomUtilization.available}</span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between">
                        <span>Utilization Rate</span>
                        <span className="font-semibold">
                          {((roomUtilization.allocated / roomUtilization.total) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bed className="h-5 w-5" /> Room Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={[
                      { name: 'Allocated', value: roomUtilization.allocated },
                      { name: 'Available', value: roomUtilization.available }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" /> Participants
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{currentBatch.participants.length}</div>
                  <p className="text-sm text-gray-600 mt-2">Total participants in this batch</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>With Room:</span>
                      <span className="font-medium">
                        {currentBatch.participants.filter(p => p.roomNumber).length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>With Meal Plan:</span>
                      <span className="font-medium">
                        {currentBatch.participants.filter(p => p.mealPlan).length}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Logistics Summary for BAC Audit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{currentBatch.participants.length}</div>
                    <div className="text-sm text-gray-600">Total Participants</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{roomUtilization.allocated}</div>
                    <div className="text-sm text-gray-600">Rooms Allocated</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {currentBatch.participants.filter(p => p.mealPlan && p.mealPlan !== 'No Meals').length}
                    </div>
                    <div className="text-sm text-gray-600">Meal Plans Active</div>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{currentBatch.venue}</div>
                    <div className="text-sm text-gray-600">Venue</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Room Allocation Dialog */}
      <Dialog open={isRoomDialogOpen} onOpenChange={setIsRoomDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Allocate Room - {selectedParticipant?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Room Number (e.g., 101)"
              value={selectedParticipant?.roomNumber || ''}
              onChange={(e) => setSelectedParticipant({ ...selectedParticipant, roomNumber: e.target.value })}
            />
            <Select
              value={selectedParticipant?.roomType || ''}
              onValueChange={(value) => setSelectedParticipant({ ...selectedParticipant, roomType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Room Type" />
              </SelectTrigger>
              <SelectContent>
                {roomTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                onClick={() => allocateRoom(selectedParticipant?.id, {
                  roomNumber: selectedParticipant?.roomNumber,
                  roomType: selectedParticipant?.roomType
                })}
                className="flex-1"
              >
                Allocate Room
              </Button>
              <Button variant="outline" onClick={() => setIsRoomDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Meal Plan Dialog */}
      <Dialog open={isMealDialogOpen} onOpenChange={setIsMealDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Meal Plan - {selectedParticipant?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Select
              value={selectedParticipant?.mealPlan || ''}
              onValueChange={(value) => updateMealPlan(selectedParticipant?.id, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Meal Plan" />
              </SelectTrigger>
              <SelectContent>
                {mealPlans.map(plan => (
                  <SelectItem key={plan} value={plan}>{plan}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => setIsMealDialogOpen(false)} className="w-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AccommodationManagement;

