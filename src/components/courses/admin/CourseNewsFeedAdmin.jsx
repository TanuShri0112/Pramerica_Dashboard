import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";
import AddActionDialog from "./AddActionDialog";

const CourseNewsFeedAdmin = () => {
  const [addPostActionDialog, setAddPostActionDialog] = useState(false);
  const [addReplyActionDialog, setAddReplyActionDialog] = useState(false);

  const [newsFeedSettings, setNewsFeedSettings] = useState([
    { id: "allowPosts", label: "Allow learners to post to news feed", checked: true },
    { id: "allowComments", label: "Allow comments on news feed announcements", checked: true },
    { id: "rssFeeds", label: "RSS feeds", checked: true },
    { id: "announceAssessment", label: "Announce to the news feed when a new assessment is given", checked: true },
    { id: "announceModule", label: "Announce module to the news feed when it becomes current", checked: true }
  ]);

  const handleSettingToggle = (id) => {
    setNewsFeedSettings(prev =>
      prev.map(setting =>
        setting.id === id ? { ...setting, checked: !setting.checked } : setting
      )
    );
  };

  return (
    <div className="space-y-8">
      {/* News Feed Settings */}
      <section>
        <h2 className="text-2xl font-bold mb-4">News feed</h2>
        <Card>
          <CardHeader>
            <CardTitle>Feature</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {newsFeedSettings.map((setting) => (
                <div key={setting.id} className="flex items-center justify-between">
                  <label htmlFor={setting.id} className="text-sm font-medium cursor-pointer flex-1">
                    {setting.label}
                  </label>
                  <Checkbox
                    id={setting.id}
                    checked={setting.checked}
                    onCheckedChange={() => handleSettingToggle(setting.id)}
                    className="ml-4"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Post Actions */}
      <section>
        <h3 className="text-xl font-bold mb-2">Post actions</h3>
        <p className="text-gray-600 mb-4">
          Add actions here that should be performed when a user who is not a moderator posts to the news feed.
        </p>
        <Button 
          onClick={() => setAddPostActionDialog(true)}
          className="bg-blue-500 hover:bg-blue-600"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add
        </Button>
        <AddActionDialog 
          open={addPostActionDialog} 
          onOpenChange={setAddPostActionDialog}
          title="Add action"
        />
      </section>

      {/* Reply Actions */}
      <section>
        <h3 className="text-xl font-bold mb-2">Reply actions</h3>
        <p className="text-gray-600 mb-4">
          Add actions here that should be performed when a user who is not a moderator replies to the news feed.
        </p>
        <Button 
          onClick={() => setAddReplyActionDialog(true)}
          className="bg-blue-500 hover:bg-blue-600"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add
        </Button>
        <AddActionDialog 
          open={addReplyActionDialog} 
          onOpenChange={setAddReplyActionDialog}
          title="Add action"
        />
      </section>
    </div>
  );
};

export default CourseNewsFeedAdmin;

