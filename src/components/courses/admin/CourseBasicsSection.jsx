import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import EditOverviewDialog from "./EditOverviewDialog";
import EditStyleDialog from "./EditStyleDialog";
import EditSettingsDialog from "./EditSettingsDialog";
import SplashPageDialog from "./SplashPageDialog";
import WelcomePopupDialog from "./WelcomePopupDialog";
import ChangePictureDialog from "./ChangePictureDialog";
import { useToast } from "@/hooks/use-toast";

const initialCourse = {
  name: "vljsdfbgs",
  shortDescription: "",
  longDescription: "",
  style: "Instructor",
  duration: "May 14, 2025 .. May 21, 2025",
  access: "No access code is required to join this course.",
  settings: {
    courseCode: "",
    sectionCode: "",
    location: "",
    credits: "",
    language: "English (US)",
    timeZone: "Pacific Time (US & Canada)",
  },
  splash: null,
  welcome: null,
  learnerLanding: "Modules",
  instructorLanding: "Modules",
};

export default function CourseBasicsSection() {
  const { toast } = useToast();
  const [learnerLanding, setLearnerLanding] = useState(initialCourse.learnerLanding);
  const [instructorLanding, setInstructorLanding] = useState(initialCourse.instructorLanding);

  const [dialogs, setDialogs] = useState({
    overview: false,
    picture: false,
    style: false,
    settings: false,
    splash: false,
    welcome: false,
  });

  const openDialog = (dialogName) => {
    setDialogs((prev) => ({ ...prev, [dialogName]: true }));
  };

  const closeDialog = (dialogName) => {
    setDialogs((prev) => ({ ...prev, [dialogName]: false }));
  };

  const handleRequireAccessCode = () => {
    toast({
      title: "Access code required",
      description: "Access code requirement has been enabled for this course",
      duration: 3000,
    });
  };

  const handleLearnerLandingChange = (value) => {
    setLearnerLanding(value);
    toast({
      title: "Learner landing page updated",
      description: `Learner landing page set to: ${value}`,
      duration: 2000,
    });
  };

  const handleInstructorLandingChange = (value) => {
    setInstructorLanding(value);
    toast({
      title: "Instructor landing page updated",
      description: `Instructor landing page set to: ${value}`,
      duration: 2000,
    });
  };

  return (
    <div className="space-y-8 pt-2">
      {/* Overview */}
      <div>
        <h2 className="font-bold text-2xl mt-1 mb-4">Overview</h2>
        <Card className="p-6 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="text-sm text-gray-600">Name:</span>
              <div className="font-medium">{initialCourse.name}</div>
            </div>
            <div>
              <span className="text-sm text-gray-600">Short description:</span>
              <div className="text-gray-400">✗</div>
            </div>
            <div>
              <span className="text-sm text-gray-600">Long description:</span>
              <div className="text-gray-400">✗</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            <Button variant="outline" onClick={() => openDialog("overview")}>Edit</Button>
            <Button variant="outline" onClick={() => openDialog("picture")}>Change picture</Button>
          </div>
        </Card>
      </div>

      {/* Style */}
      <div>
        <h2 className="font-bold text-xl mb-3">Style</h2>
        <Card className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[320px] border-separate border-spacing-y-3">
              <thead>
                <tr className="text-gray-500 text-left">
                  <th className="font-semibold text-sm">Name</th>
                  <th className="font-semibold text-sm">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-sm">Type</td>
                  <td className="font-medium">{initialCourse.style}</td>
                </tr>
                <tr>
                  <td className="text-sm">Duration</td>
                  <td className="font-medium text-sm">{initialCourse.duration}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <Button variant="outline" onClick={() => openDialog("style")}>Edit</Button>
          </div>
        </Card>
      </div>

      {/* Access */}
      <div>
        <h2 className="font-bold text-xl mb-3">Access</h2>
        <Card className="p-6">
          <p className="text-sm mb-4">{initialCourse.access}</p>
          <Button onClick={handleRequireAccessCode}>+ Require access code</Button>
        </Card>
      </div>

      {/* Settings */}
      <div>
        <h2 className="font-bold text-xl mb-3">Settings</h2>
        <Card className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[320px] border-separate border-spacing-y-3">
              <thead>
                <tr className="text-gray-500 text-left">
                  <th className="font-semibold text-sm">Name</th>
                  <th className="font-semibold text-sm">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="text-sm">Course code</td><td className="text-sm">-</td></tr>
                <tr><td className="text-sm">Section code</td><td className="text-sm">-</td></tr>
                <tr><td className="text-sm">Location</td><td className="text-sm">-</td></tr>
                <tr><td className="text-sm">Credits</td><td className="text-sm">-</td></tr>
                <tr><td className="text-sm">Language</td><td className="text-sm">English (US)</td></tr>
                <tr><td className="text-sm">Time zone</td><td className="text-sm">Pacific Time (US & Canada)</td></tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <Button variant="outline" onClick={() => openDialog("settings")}>Edit</Button>
          </div>
        </Card>
      </div>

      {/* Splash */}
      <div>
        <h2 className="font-bold text-xl mb-3">Learner splash page</h2>
        <Card className="p-6">
          <p className="text-sm mb-4">No splash page is set.</p>
          <Button onClick={() => openDialog("splash")}>+ Add</Button>
        </Card>
      </div>

      {/* Welcome */}
      <div>
        <h2 className="font-bold text-xl mb-3">Welcome pop-up for learners</h2>
        <Card className="p-6">
          <p className="text-sm mb-4">This course does not have a welcome pop-up box.</p>
          <Button onClick={() => openDialog("welcome")}>+ Add</Button>
        </Card>
      </div>

      {/* Learner landing */}
      <div>
        <h2 className="font-bold text-xl mb-3">Learner landing page</h2>
        <Card className="p-6">
          <div className="space-y-4">
            <div className="text-sm text-gray-600 mb-3">Select the default landing page for learners:</div>
            <RadioGroup value={learnerLanding} onValueChange={handleLearnerLandingChange} className="space-y-3">
              {["News", "Modules", "Current module", "Current module, or first module if never visited before", "Agenda"].map((option, idx) => (
                <div className="flex items-center space-x-3" key={idx}>
                  <RadioGroupItem value={option} id={`learner-${option.toLowerCase().replace(/ /g, '-')}`} />
                  <Label htmlFor={`learner-${option.toLowerCase().replace(/ /g, '-')}`} className="text-sm cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </Card>
      </div>

      {/* Instructor landing */}
      <div>
        <h2 className="font-bold text-xl mb-3">Instructor landing page</h2>
        <Card className="p-6">
          <div className="space-y-4">
            <div className="text-sm text-gray-600 mb-3">Select the default landing page for instructors:</div>
            <RadioGroup value={instructorLanding} onValueChange={handleInstructorLandingChange} className="space-y-3">
              {["News", "Modules", "Current module", "Agenda", "Scores"].map((option, idx) => (
                <div className="flex items-center space-x-3" key={idx}>
                  <RadioGroupItem value={option} id={`inst-${option.toLowerCase().replace(/ /g, '-')}`} />
                  <Label htmlFor={`inst-${option.toLowerCase().replace(/ /g, '-')}`} className="text-sm cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </Card>
      </div>

      {/* Dialogs */}
      <EditOverviewDialog open={dialogs.overview} onOpenChange={(open) => !open && closeDialog("overview")} />
      <ChangePictureDialog open={dialogs.picture} onOpenChange={(open) => !open && closeDialog("picture")} />
      <EditStyleDialog open={dialogs.style} onOpenChange={(open) => !open && closeDialog("style")} />
      <EditSettingsDialog open={dialogs.settings} onOpenChange={(open) => !open && closeDialog("settings")} />
      <SplashPageDialog open={dialogs.splash} onOpenChange={(open) => !open && closeDialog("splash")} />
      <WelcomePopupDialog open={dialogs.welcome} onOpenChange={(open) => !open && closeDialog("welcome")} />
    </div>
  );
}
