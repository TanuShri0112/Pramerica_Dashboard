import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  GripVertical,
  Settings,
  Users,
  BookOpen,
  MessageSquare,
  Calendar
} from "lucide-react";
import { Reorder } from "framer-motion";

const defaultTabs = [
  { id: "dashboard", name: "Dashboard", enabled: false, icon: Settings },
  { id: "modules", name: "Modules", enabled: true, icon: BookOpen },
  { id: "news", name: "News", enabled: true, icon: MessageSquare },
  { id: "calendar", name: "Calendar", enabled: true, icon: Calendar },
  { id: "groups", name: "Groups", enabled: false, icon: Users },
  { id: "welcome", name: "Welcome", enabled: false, icon: Settings },
  { id: "assessments", name: "Assessments", enabled: true, icon: BookOpen },
  { id: "scores", name: "Scores", enabled: true, icon: BookOpen },
  { id: "mastery", name: "Mastery", enabled: true, icon: BookOpen },
  { id: "resources", name: "Resources", enabled: true, icon: BookOpen },
  { id: "learners", name: "Learners", enabled: true, icon: Users },
  { id: "instructors", name: "Instructors", enabled: true, icon: Users },
  { id: "forums", name: "Forums", enabled: false, icon: MessageSquare },
  { id: "attendance", name: "Attendance", enabled: false, icon: Calendar },
  { id: "gradebook", name: "Gradebook", enabled: false, icon: BookOpen },
  { id: "analytics", name: "Analytics", enabled: false, icon: Settings }
];

const CourseFeaturesAdmin = () => {
  const [tabs, setTabs] = useState(defaultTabs);
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [allowDiscussions, setAllowDiscussions] = useState(true);
  const [enableMobileAccess, setEnableMobileAccess] = useState(true);
  const [requireCompletionOrder, setRequireCompletionOrder] = useState(false);
  const [enableOfflineMode, setEnableOfflineMode] = useState(false);

  const handleToggle = (id) => {
    setTabs((curr) =>
      curr.map((tab) =>
        tab.id === id ? { ...tab, enabled: !tab.enabled } : tab
      )
    );
  };

  const handleReorder = (newOrder) => {
    setTabs(newOrder);
  };

  return (
    <div className="space-y-6">
      {/* Left tabs section */}
      <Card>
        <CardHeader>
          <CardTitle>Left tabs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-700">
            Click to enable/disable a tab, drag to reorder tabs.
          </p>
          <Reorder.Group
            as="div"
            axis="y"
            values={tabs}
            onReorder={handleReorder}
            className="bg-white/90 rounded-lg p-2 sm:p-4 shadow border"
          >
            <div className="overflow-x-auto">
              <table className="min-w-[375px] w-full rounded font-medium text-base">
                <thead>
                  <tr className="text-gray-500">
                    <th></th>
                    <th className="p-2 text-left">Icon</th>
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Enabled</th>
                  </tr>
                </thead>
                <tbody>
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <Reorder.Item
                        value={tab}
                        key={tab.id}
                        as="tr"
                        className="group transition border-b last:border-0 hover:bg-muted/60 cursor-pointer"
                      >
                        <td className="px-2 py-2 w-6 align-middle">
                          <GripVertical className="h-4 w-4 opacity-70 group-hover:opacity-100" />
                        </td>
                        <td className="p-2">
                          <IconComponent className="h-4 w-4 text-gray-600" />
                        </td>
                        <td className="p-2">{tab.name}</td>
                        <td className="p-2">
                          <Checkbox
                            checked={tab.enabled}
                            onCheckedChange={() => handleToggle(tab.id)}
                            aria-label={`Enable/disable ${tab.name}`}
                          />
                        </td>
                      </Reorder.Item>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Reorder.Group>
        </CardContent>
      </Card>

      {/* Course Features & Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Course Features & Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications" className="text-sm font-medium">
                  Enable Notifications
                </Label>
                <Switch
                  id="notifications"
                  checked={enableNotifications}
                  onCheckedChange={setEnableNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="discussions" className="text-sm font-medium">
                  Allow Discussions
                </Label>
                <Switch
                  id="discussions"
                  checked={allowDiscussions}
                  onCheckedChange={setAllowDiscussions}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="mobile" className="text-sm font-medium">
                  Mobile Access
                </Label>
                <Switch
                  id="mobile"
                  checked={enableMobileAccess}
                  onCheckedChange={setEnableMobileAccess}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="completion-order" className="text-sm font-medium">
                  Require Completion Order
                </Label>
                <Switch
                  id="completion-order"
                  checked={requireCompletionOrder}
                  onCheckedChange={setRequireCompletionOrder}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="offline" className="text-sm font-medium">
                  Offline Mode
                </Label>
                <Switch
                  id="offline"
                  checked={enableOfflineMode}
                  onCheckedChange={setEnableOfflineMode}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Features */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Content Library",
                desc: "Manage course resources and materials"
              },
              {
                title: "Progress Tracking",
                desc: "Monitor learner progress and completion"
              },
              {
                title: "Certificates",
                desc: "Issue completion certificates"
              },
              {
                title: "Gamification",
                desc: "Add badges and points system"
              },
              {
                title: "Integrations",
                desc: "Connect with external tools"
              },
              {
                title: "Advanced Analytics",
                desc: "Detailed learning analytics"
              }
            ].map((item) => (
              <div
                key={item.title}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h4 className="font-medium text-sm mb-2">{item.title}</h4>
                <p className="text-xs text-gray-600 mb-3">{item.desc}</p>
                <Button variant="outline" size="sm" className="w-full">
                  Configure
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseFeaturesAdmin;
