import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const SEODialog = ({ open, onOpenChange }) => {
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");

  const handleSave = () => {
    onOpenChange(false);
    setDescription("");
    setKeywords("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Meta description and meta keywords</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description:</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter meta description"
              rows={6}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords (separate by commas):</Label>
            <Textarea
              id="keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Enter keywords separated by commas"
              rows={4}
              className="w-full"
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button 
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SEODialog;
