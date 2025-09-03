import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const EditEnrollmentDialog = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    allowEnroll: true,
    openEnrollment: false,
    allowRetake: false,
    maxActiveLearners: '',
    maxSeats: '',
    notifyInstructors: false,
    notifyManagers: false,
    notifyAdministrators: false,
    automaticWaitlist: false,
    waitlistAfterLimit: false,
    allowUnenroll: false,
    deleteHistoryOnUnenroll: false,
    inactivityDays: ''
  });

  const handleSave = () => {
    toast({
      title: "Enrollment settings updated",
      description: "Enrollment settings have been successfully updated",
      duration: 3000,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Enrollment Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Enrollment Section */}
          <div className="space-y-4">
            <h3 className="font-semibold">Enrollment</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allowEnroll"
                  checked={formData.allowEnroll}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, allowEnroll: !!checked })
                  }
                />
                <label htmlFor="allowEnroll" className="text-sm">Allow learners to enroll</label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="openEnrollment"
                  checked={formData.openEnrollment}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, openEnrollment: !!checked })
                  }
                />
                <label htmlFor="openEnrollment" className="text-sm">Open enrollment</label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allowRetake"
                  checked={formData.allowRetake}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, allowRetake: !!checked })
                  }
                />
                <label htmlFor="allowRetake" className="text-sm">Allow learners to retake the course</label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxActive">Max active learners</Label>
                  <Input
                    id="maxActive"
                    type="number"
                    placeholder="Unlimited"
                    value={formData.maxActiveLearners}
                    onChange={(e) =>
                      setFormData({ ...formData, maxActiveLearners: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxSeats">Max seats</Label>
                  <Input
                    id="maxSeats"
                    type="number"
                    placeholder="Unlimited"
                    value={formData.maxSeats}
                    onChange={(e) =>
                      setFormData({ ...formData, maxSeats: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Notifications</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="notifyInstructors"
                      checked={formData.notifyInstructors}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, notifyInstructors: !!checked })
                      }
                    />
                    <label htmlFor="notifyInstructors" className="text-sm">
                      Notify instructors of enrollments
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="notifyManagers"
                      checked={formData.notifyManagers}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, notifyManagers: !!checked })
                      }
                    />
                    <label htmlFor="notifyManagers" className="text-sm">
                      Notify managers of enrollments
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="notifyAdministrators"
                      checked={formData.notifyAdministrators}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, notifyAdministrators: !!checked })
                      }
                    />
                    <label htmlFor="notifyAdministrators" className="text-sm">
                      Notify administrators of enrollments
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Waitlist Section */}
          <div className="space-y-4">
            <h3 className="font-semibold">Waitlist</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="automaticWaitlist"
                  checked={formData.automaticWaitlist}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, automaticWaitlist: !!checked })
                  }
                />
                <label htmlFor="automaticWaitlist" className="text-sm">
                  Automatically put learners onto waitlist when they enroll
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="waitlistAfterLimit"
                  checked={formData.waitlistAfterLimit}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, waitlistAfterLimit: !!checked })
                  }
                />
                <label htmlFor="waitlistAfterLimit" className="text-sm">
                  Add learners onto waitlist after enrollment limit is reached
                </label>
              </div>
            </div>
          </div>

          {/* Unenrollment Section */}
          <div className="space-y-4">
            <h3 className="font-semibold">Unenrollment</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allowUnenroll"
                  checked={formData.allowUnenroll}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, allowUnenroll: !!checked })
                  }
                />
                <label htmlFor="allowUnenroll" className="text-sm">Allow learners to unenroll</label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="deleteHistoryOnUnenroll"
                  checked={formData.deleteHistoryOnUnenroll}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, deleteHistoryOnUnenroll: !!checked })
                  }
                />
                <label htmlFor="deleteHistoryOnUnenroll" className="text-sm">
                  Delete history on unenrollment
                </label>
              </div>
            </div>
          </div>

          {/* Inactivity Section */}
          <div className="space-y-4">
            <h3 className="font-semibold">Inactivity</h3>
            <div className="space-y-2">
              <Label htmlFor="inactivityDays">
                Number of days of not visiting the course before learner is considered inactive
              </Label>
              <Input
                id="inactivityDays"
                type="number"
                placeholder="30"
                value={formData.inactivityDays}
                onChange={(e) =>
                  setFormData({ ...formData, inactivityDays: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditEnrollmentDialog;
