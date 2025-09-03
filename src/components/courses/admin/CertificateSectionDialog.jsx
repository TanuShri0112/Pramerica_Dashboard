import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CertificateSectionDialog = ({ open, onOpenChange }) => {
  const [sectionTitle, setSectionTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCertificate, setSelectedCertificate] = useState("");

  const handleSave = () => {
    onOpenChange(false);
    setSectionTitle("");
    setDescription("");
    setSelectedCertificate("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Certificate Section</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="sectionTitle">Section Title</Label>
            <Input
              id="sectionTitle"
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              placeholder="Enter section title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="certificateSelect">Select Certificate</Label>
            <Select
              value={selectedCertificate}
              onValueChange={setSelectedCertificate}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a certificate" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cert1">Web Development Certificate</SelectItem>
                <SelectItem value="cert2">JavaScript Mastery Certificate</SelectItem>
                <SelectItem value="cert3">React Developer Certificate</SelectItem>
                <SelectItem value="cert4">Full Stack Certificate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter section description"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!sectionTitle || !selectedCertificate}
          >
            Add Section
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateSectionDialog;
