import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";

const CourseDeactivationAdmin = () => {
  const [maxDays, setMaxDays] = useState("");
  const [isEditingMaxDays, setIsEditingMaxDays] = useState(false);

  const [deactivationSettings, setDeactivationSettings] = useState([
    {
      id: "allowCompleted",
      label: "Allow learners to be deactivated even if they have completed the course",
      checked: false,
    },
    {
      id: "allowAccess",
      label: "Allow deactivated learners to access course",
      checked: true,
    },
    {
      id: "deleteHistory",
      label: "Delete history on reactivation",
      checked: false,
    },
  ]);

  const handleSettingToggle = (id) => {
    setDeactivationSettings((prev) =>
      prev.map((setting) =>
        setting.id === id ? { ...setting, checked: !setting.checked } : setting
      )
    );
  };

  const handleMaxDaysEdit = () => {
    setIsEditingMaxDays(true);
  };

  const handleMaxDaysSave = () => {
    setIsEditingMaxDays(false);
    console.log("Max days saved:", maxDays);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Deactivation</h2>

      <Card>
        <CardHeader>
          <CardTitle>Feature</CardTitle>
          <Button variant="outline" size="sm" className="ml-auto">
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Max Days Setting */}
            <div className="flex items-center justify-between py-4 border-b">
              <div className="flex-1">
                <span className="text-sm font-medium">
                  Max days before learner is deactivated
                </span>
                {isEditingMaxDays && (
                  <div className="mt-2 flex items-center space-x-2">
                    <Input
                      type="number"
                      value={maxDays}
                      onChange={(e) => setMaxDays(e.target.value)}
                      placeholder="Enter number of days"
                      className="w-40"
                    />
                    <Button size="sm" onClick={handleMaxDaysSave}>
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsEditingMaxDays(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
              {!isEditingMaxDays && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleMaxDaysEdit}
                  className="ml-4"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Checkbox Settings */}
            <div className="space-y-4">
              {deactivationSettings.map((setting) => (
                <div key={setting.id} className="flex items-center justify-between">
                  <label
                    htmlFor={setting.id}
                    className="text-sm font-medium cursor-pointer flex-1 pr-4"
                  >
                    {setting.label}
                  </label>
                  <Checkbox
                    id={setting.id}
                    checked={setting.checked}
                    onCheckedChange={() => handleSettingToggle(setting.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseDeactivationAdmin;
