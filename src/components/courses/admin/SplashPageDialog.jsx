import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Image as ImageIcon,
  Undo,
  Redo
} from "lucide-react";

const SplashPageDialog = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [content, setContent] = useState("");
  const [wordCount, setWordCount] = useState(0);

  const handleSave = () => {
    toast({
      title: "Splash page saved",
      description: "Learner splash page has been successfully created",
      duration: 3000,
    });
    onOpenChange(false);
  };

  const handleContentChange = (e) => {
    const text = e.target.value;
    setContent(text);
    setWordCount(text.trim().split(/\s+/).filter(word => word.length > 0).length);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Learner splash page</DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="bg-gray-50 p-3 border-b">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <select className="px-2 py-1 border rounded text-sm">
                <option>File</option>
              </select>
              <select className="px-2 py-1 border rounded text-sm">
                <option>Edit</option>
              </select>
              <select className="px-2 py-1 border rounded text-sm">
                <option>View</option>
              </select>
              <select className="px-2 py-1 border rounded text-sm">
                <option>Insert</option>
              </select>
              <select className="px-2 py-1 border rounded text-sm">
                <option>Format</option>
              </select>
              <select className="px-2 py-1 border rounded text-sm">
                <option>Tools</option>
              </select>
              <select className="px-2 py-1 border rounded text-sm">
                <option>Table</option>
              </select>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button variant="ghost" size="sm">
                <Undo className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Redo className="h-4 w-4" />
              </Button>
              <Separator orientation="vertical" className="h-6" />

              <select className="px-2 py-1 border rounded text-sm">
                <option>Paragraph</option>
              </select>
              <select className="px-2 py-1 border rounded text-sm">
                <option>Poppins</option>
              </select>
              <select className="px-2 py-1 border rounded text-sm">
                <option>12pt</option>
              </select>

              <Separator orientation="vertical" className="h-6" />

              <Button variant="ghost" size="sm">
                <Bold className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Italic className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Underline className="h-4 w-4" />
              </Button>

              <Separator orientation="vertical" className="h-6" />

              <Button variant="ghost" size="sm">
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <AlignRight className="h-4 w-4" />
              </Button>

              <Separator orientation="vertical" className="h-6" />

              <Button variant="ghost" size="sm">
                <List className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <ListOrdered className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <ImageIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-4 bg-white">
            <textarea
              className="w-full h-full border-none outline-none resize-none text-lg"
              placeholder="Start typing your splash page content..."
              value={content}
              onChange={handleContentChange}
            />
          </div>

          {/* Footer */}
          <div className="border-t p-3 flex items-center justify-between bg-gray-50">
            <div className="text-sm text-gray-600">P</div>
            <div className="text-sm text-gray-600">{wordCount} WORDS</div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 p-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SplashPageDialog;
