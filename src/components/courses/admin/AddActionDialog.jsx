import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Users, MoreHorizontal } from "lucide-react";

const AddActionDialog = ({ open, onOpenChange, title }) => {
  const [activeTab, setActiveTab] = useState("Awards");

  const tabs = ["Awards", "Membership", "Other"];

  const awards = [
    {
      icon: <Shield className="h-12 w-12 text-blue-500" />,
      title: "Award badge",
      description: "Award a badge to the user",
      action: () => console.log("Award badge clicked")
    },
    {
      icon: (
        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
            <div className="h-4 w-4 rounded-full bg-white"></div>
          </div>
        </div>
      ),
      title: "Award certificate",
      description: "Award a certificate to the user",
      action: () => console.log("Award certificate clicked")
    },
    {
      icon: (
        <div className="h-12 w-12 flex items-center justify-center">
          <svg className="h-12 w-12 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      ),
      title: "Award points",
      description: "Award points to the user",
      action: () => console.log("Award points clicked")
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {title}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-6 w-6"
            >
              ×
            </Button>
          </DialogTitle>
        </DialogHeader>

        {/* Tab Navigation */}
        <div className="flex space-x-4 border-b">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "ghost"}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-6 py-2 ${
                activeTab === tab
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Awards Content */}
        {activeTab === "Awards" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
            {awards.map((award, index) => (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
                onClick={award.action}
              >
                <div className="flex justify-center mb-4">{award.icon}</div>
                <h3 className="font-semibold mb-2">{award.title}</h3>
                <p className="text-sm text-gray-600">{award.description}</p>
              </Card>
            ))}
          </div>
        )}

        {/* Membership Content */}
        {activeTab === "Membership" && (
          <div className="py-6 text-center text-gray-500">
            <Users className="h-12 w-12 mx-auto mb-4" />
            <p>Membership actions will be available here</p>
          </div>
        )}

        {/* Other Content */}
        {activeTab === "Other" && (
          <div className="py-6 text-center text-gray-500">
            <MoreHorizontal className="h-12 w-12 mx-auto mb-4" />
            <p>Other actions will be available here</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddActionDialog;
