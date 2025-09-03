import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import AddRuleDialog from "./AddRuleDialog";
import AddCourseTimeDialog from "./AddCourseTimeDialog";

const CourseScheduleAdmin = () => {
  const [addCourseTimeDialog, setAddCourseTimeDialog] = useState(false);
  const [attendanceSetting, setAttendanceSetting] = useState("Disabled");
  const [addStartRule, setAddStartRule] = useState(false);
  const [addFinishRule, setAddFinishRule] = useState(false);

  return (
    <div className="flex flex-col gap-10">
      {/* Schedule */}
      <section>
        <h2 className="font-bold text-xl mb-2">Schedule</h2>
        <Card className="mb-3">
          <CardContent className="py-6">
            <div>
              There is currently no schedule.
              <Button className="ml-4" onClick={() => setAddCourseTimeDialog(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add course time
              </Button>
            </div>
          </CardContent>
        </Card>
        <AddCourseTimeDialog
          open={addCourseTimeDialog}
          onOpenChange={setAddCourseTimeDialog}
        />
      </section>

      {/* Attendance */}
      <section>
        <h2 className="font-bold text-xl mb-2">Attendance</h2>
        <Card>
          <CardContent className="py-6">
            <p>At least one schedule must be set in order for this option to take effect.</p>
            <div className="bg-gray-100 rounded-lg mt-4 px-2 md:px-6 py-3 flex flex-wrap items-center gap-4 justify-between text-base sm:text-sm">
              <span>
                Automatically add a blank attendance column the specified number of days before a scheduled module
              </span>
              <Select value={attendanceSetting} onValueChange={setAttendanceSetting}>
                <SelectTrigger className="w-[140px] ml-3">
                  <SelectValue placeholder="Disabled" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Disabled">Disabled</SelectItem>
                  <SelectItem value="1">1 day before</SelectItem>
                  <SelectItem value="2">2 days before</SelectItem>
                  <SelectItem value="3">3 days before</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Start actions */}
      <section>
        <h2 className="font-bold text-xl mt-8 mb-2">Start actions</h2>
        <p>Specify a time before/after this course starts that a set of actions should be taken.</p>
        <Button onClick={() => setAddStartRule(true)} className="mt-3">
          <Plus className="mr-2 h-4 w-4" /> Add rule
        </Button>
        <AddRuleDialog open={addStartRule} onOpenChange={setAddStartRule} type="start" />
      </section>

      {/* Finish actions */}
      <section>
        <h2 className="font-bold text-xl mt-8 mb-2">Finish actions</h2>
        <p>Specify a time before/after this course finishes that a set of actions should be taken.</p>
        <Button onClick={() => setAddFinishRule(true)} className="mt-3">
          <Plus className="mr-2 h-4 w-4" /> Add rule
        </Button>
        <AddRuleDialog open={addFinishRule} onOpenChange={setAddFinishRule} type="finish" />
      </section>
    </div>
  );
};

export default CourseScheduleAdmin;
