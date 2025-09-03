import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Calendar, Users, Clock } from 'lucide-react';
import { format } from 'date-fns';

/**
 * @typedef {object} AttendanceSession
 * @property {number} id
 * @property {string} date
 * @property {string} topic
 * @property {number} totalStudents
 * @property {number} present
 * @property {number} absent
 * @property {number} late
 * @property {string} [sessionLink]
 * @property {string} [duration]
 * @property {string} [location]
 */

/**
 * A dialog to display the details of a specific attendance session.
 * @param {object} props
 * @param {boolean} props.open - Whether the dialog is open.
 * @param {(open: boolean) => void} props.onOpenChange - Function to handle dialog open/close state.
 * @param {AttendanceSession | null} props.session - The session object to display details for.
 */
export const SessionDetailsDialog = ({ open, onOpenChange, session }) => {
  if (!session) return null;

  /**
   * Opens the given link in a new browser tab.
   * @param {string} link - The URL to open.
   */
  const handleLinkClick = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  // Generate mock session link if not provided
  const sessionLink = session.sessionLink || `https://zoom.us/j/meeting-${session.id}`;
  const duration = session.duration || '1 hour 30 minutes';
  const location = session.location || 'Virtual Meeting Room';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Session Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Session Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-blue-500" />
              <div>
                <div className="font-medium">{format(new Date(session.date), 'PPP')}</div>
                <div className="text-sm text-gray-500">{session.topic}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-blue-500" />
              <div>
                <div className="font-medium">Duration</div>
                <div className="text-sm text-gray-500">{duration}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <div className="font-medium">Location</div>
                <div className="text-sm text-gray-500">{location}</div>
              </div>
            </div>
          </div>

          {/* Session Link */}
          <div className="border rounded-lg p-4 bg-blue-50">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-blue-900">Session Link</div>
                <div className="text-sm text-blue-700 break-all">{sessionLink}</div>
              </div>
              <Button
                onClick={() => handleLinkClick(sessionLink)}
                size="sm"
                className="bg-blue-500 hover:bg-blue-600 text-white shrink-0 ml-3"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open
              </Button>
            </div>
          </div>

          {/* Attendance Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">{session.totalStudents}</div>
              <div className="text-xs text-gray-500">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{session.present}</div>
              <div className="text-xs text-gray-500">Present</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{session.absent}</div>
              <div className="text-xs text-gray-500">Absent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{session.late}</div>
              <div className="text-xs text-gray-500">Late</div>
            </div>
          </div>

          {/* Attendance Rate */}
          <div className="flex items-center justify-center">
            <Badge className="bg-blue-100 text-blue-800 text-base px-4 py-2">
              Attendance Rate: {Math.round((session.present / session.totalStudents) * 100)}%
            </Badge>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} variant="outline">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};