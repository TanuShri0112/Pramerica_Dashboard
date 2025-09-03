import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Users, ListChecks } from "lucide-react";

const steps = [
  {
    title: "Click Basics to set the name, description, picture, access permissions, style, and other settings.",
    icon: <Pencil className="w-10 h-10 text-primary mx-auto" />,
    details:
      "Use the Basics tab to update course information such as name, description, banner, permissions, and style.",
  },
  {
    title:
      "Click Features to select which features are enabled, and click Enrollment to set enrollment settings and associated automation actions.",
    icon: <Users className="w-10 h-10 text-teal-500 mx-auto" />,
    details:
      "Features lets you toggle available modules for your course. Enrollment lets you manage entry settings, invite students, or set automation.",
  },
  {
    title:
      "Click the other tabs to configure various miscellaneous settings.",
    icon: (
      <ListChecks className="w-10 h-10 text-amber-400 mx-auto" />
    ),
    details:
      "Other tabs cover advanced options, schedules, custom settings, and more. Explore for further configurations.",
  },
];

export default function AdminConfigureSteps() {
  const [openStep, setOpenStep] = useState(null);

  return (
    <div className="py-2">
      <p className="text-lg font-medium mb-3 text-gray-700">
        Your course is now ready to be configured!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step, idx) => (
          <Card
            key={idx}
            className={`flex flex-col md:flex-row items-center p-5 gap-5 ${
              openStep === idx ? "ring-2 ring-primary ring-offset-2" : ""
            } cursor-pointer transition-all`}
            onClick={() => setOpenStep(openStep === idx ? null : idx)}
          >
            <div className="mb-4 md:mb-0 flex-shrink-0">{step.icon}</div>
            <div className="flex-1 w-full text-left">
              <div className="flex items-center space-x-3 mb-1">
                <div className="w-7 h-7 bg-gray-100 text-primary rounded-full flex items-center justify-center font-medium text-base">
                  {idx + 1}
                </div>
                <span className="text-base font-semibold">
                  {step.title.split(".")[0] + "."}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                {step.title.split(". ").slice(1).join(". ")}
              </div>
              {openStep === idx && (
                <div className="bg-muted mt-4 rounded p-3 text-[0.97rem] text-gray-700">
                  {step.details}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
