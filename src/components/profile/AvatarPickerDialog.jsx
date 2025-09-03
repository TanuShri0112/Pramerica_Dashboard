import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Upload, Camera, FolderOpen, CheckCircle2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const svgAvatars = [
  { 
    id: 'm1', 
    gender: 'male', 
    src: '/lovable-Uploads/0c96d83d-7486-46fd-80f4-a1e3408bd6ab.png'
  },
  { 
    id: 'm2', 
    gender: 'male', 
    src: '/lovable-Uploads/e0862546-5da6-40d4-93c3-3cbb248a6bc4.png'
  },
  { 
    id: 'm3', 
    gender: 'male', 
    src: '/lovable-Uploads/216892d0-518a-4b5b-a2cc-1f1f20c1f495.png'
  },
  { 
    id: 'm4', 
    gender: 'male', 
    src: '/lovable-Uploads/228d329f-76f7-42a3-b829-27cf5544a3e3.png'
  },
  { 
    id: 'm5', 
    gender: 'male', 
    src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGZpbGw9IiNmNGZkZmYiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjQ1IiByPSIyMCIgZmlsbD0iI2ZkYjI4ZiIvPjxlbGxpcHNlIGN4PSI1MCIgY3k9IjMwIiByeD0iMTgiIHJ5PSIxNSIgZmlsbD0iIzMzMzMzMyIvPjxjaXJjbGUgY3g9IjQ0IiBjeT0iNDAiIHI9IjIiIGZpbGw9IiMyNTI1MjUiLz48Y2lyY2xlIGN4PSI1NiIgY3k9IjQwIiByPSIyIiBmaWxsPSIjMjUyNTI1Ii8+PHBhdGggZD0iTTQ1IDUwIFE1MCA1MyA1NSA1MCIgc3Ryb2tlPSIjMzMzMzMzIiBzdHJva2Utd2lkdGg9IjEuNSIgZmlsbD0ibm9uZSIvPjxyZWN0IHg9IjM1IiB5PSI3MCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiByeD0iNSIgZmlsbD0iIzMzNjZmZiIvPjxwYXRoIGQ9Ik0zOCAzMCBRNDUgMjUgNTAgMjUgUTU1IDI1IDYyIDMwIFE2MCAzNSA1MCAzNyBRNDAgMzUgMzggMzAgWiIgZmlsbD0iIzMzMzMzMyIvPjwvc3ZnPg=='
  },
  { 
    id: 'm6', 
    gender: 'male', 
    src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGZpbGw9IiNmrator 0C4Y2V0aGlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGZpbGw9IiNmZmY0ZWIiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjQ1IiByPSIyMCIgZmlsbD0iI2Y1OWU0YiIvPjxlbGxpcHNlIGN4PSI1MCIgY3k9IjMwIiByeD0iMTgiIHJ5PSIxNSIgZmlsbD0iIzk3NzE0ZCIvPjxjaXJjbGUgY3g9IjQ0IiBjeT0iNDAiIHI9IjIiIGZpbGw9IiMyNTI1MjUiLz48Y2lyY2xlIGN4PSI1NiIgY3k9IjQwIiByPSIyIiBmaWxsPSIjMjUyNTI1Ii8+PHBhdGggZD0iTTQ1IDUwIFE1MCA1MyA1NSA1MCIgc3Ryb2tlPSIjMzMzMzMzIiBzdHJva2Utd2lkdGg9IjEuNSIgZmlsbD0ibm9uZSIvPjxyZWN0IHg9IjM1IiB5PSI3MCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiByeD0iNSIgZmlsbD0iIzAwY2M2NiIvPjxwYXRoIGQ9Ik0zOCAzMCBRNDMgMjYgNTAgMjYgUTU3IDI2IDYyIDMwIFE2MCAzNSA1MCAzNyBRNDAgMzUgMzggMzAgWiIgZmlsbD0iIzk3NzE0ZCIvPjxyZWN0IHg9IjQ0IiB5PSI0NyIgd2lkdGg9IjEyIiBoZWlnaHQ9IjMiIHJ4PSIxLjUiIGZpbGw9IiMzMzMzMzMiLz48L3N2Zz4='
  },
  { 
    id: 'f1', 
    gender: 'female', 
    src: '/lovable-Uploads/852855a7-30e1-46fa-b9e4-b69fedc63e55.png'
  },
  { 
    id: 'f2', 
    gender: 'female', 
    src: '/lovable-Uploads/af6c4d62-07d4-41df-8923-e78d42e4c07f.png'
  },
  { 
    id: 'f3', 
    gender: 'female', 
    src: '/lovable-Uploads/97909f7a-2d51-435e-b1c0-06727dcc03f2.png'
  },
  { 
    id: 'f4', 
    gender: 'female', 
    src: '/lovable-Uploads/bd7232ed-a80d-489b-8433-3712b475e2b6.png'
  },
  { 
    id: 'f5', 
    gender: 'female', 
    src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGZpbGw9IiNmMGZkZjQiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjQ1IiByPSIyMCIgZmlsbD0iI2ZkYjI4ZiIvPjxlbGxpcHNlIGN4PSI1MCIgY3k9IjI2IiByeD0iMjIiIHJ5PSIxOCIgZmlsbD0iIzZkMjgxNCIvPjxjaXJjbGUgY3g9IjQ0IiBjeT0iNDAiIHI9IjIuNSIgZmlsbD0iIzI1MjUyNSIvPjxjaXJjbGUgY3g9IjU2IiBjeT0iNDAiIHI9IjIuNSIgZmlsbD0iIzI1MjUyNSIvPjxwYXRoIGQ9Ik00NSA1MiBRNTAgNTUgNTUgNTIiIHN0cm9rZT0iI2ZmNjk5NiIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+PHJlY3QgeD0iMzUiIHk9IjcwIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHJ4PSI1IiBmaWxsPSIjZmY2NjAwIi8+PHBhdGggZD0iTTMwIDI0IFE0MiAxNSA1MCAxNSBRNTggMTUgNzAgMjQgUTY1IDM2IDUwIDM4IFEzNSAzNiAzMCAyNCBaIiBmaWxsPSIjNmQyODE0Ii8+PGVsbGlwc2UgY3g9IjM4IiBjeT0iNDYiIHJ4PSI0IiByeT0iMyIgZmlsbD0iI2ZmOTllYyIvPjxlbGxpcHNlIGN4PSI2MiIgY3k9IjQ2IiByeD0iNCIgcnk9IjMiIGZpbGw9IiNmZjk5ZWMiLz48L3N2Zz4='
  },
  { 
    id: 'f6', 
    gender: 'female', 
    src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGZpbGw9IiNmZmY0ZWIiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjQ1IiByPSIyMCIgZmlsbD0iI2ZkYjI4ZiIvPjxlbGxpcHNlIGN4PSI1MCIgY3k9IjI2IiByeD0iMjIiIHJ5PSIxOCIgZmlsbD0iIzkyNDAwZCIvPjxjaXJjbGUgY3g9IjQ0IiBjeT0iNDAiIHI9IjIuNSIgZmlsbD0iIzI1MjUyNSIvPjxjaXJjbGUgY3g9IjU2IiBjeT0iNDAiIHI9IjIuNSIgZmlsbD0iIzI1MjUyNSIvPjxwYXRoIGQ9Ik00NSA1MiBRNTAgNTUgNTUgNTIiIHN0cm9rZT0iI2ZmNjk5NiIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+PHJlY3QgeD0iMzUiIHk9IjcwIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHJ4PSI1IiBmaWxsPSIjMzM5OWZmIi8+PHBhdGggZD0iTTMwIDI0IFE0MiAxNSA1MCAxNSBRNTggMTUgNzAgMjQgUTY1IDM2IDUwIDM4IFEzNSAzNiAzMCAyNCBaIiBmaWxsPSIjOTI0MDBkIi8+PGVsbGlwc2UgY3g9IjM4IiBjeT0iNDYiIHJ4PSI0IiByeT0iMyIgZmlsbD0iI2ZmOTllYyIvPjxlbGxpcHNlIGN4PSI2MiIgY3k9IjQ2IiByeD0iNCIgcnk9IjMiIGZpbGw9IiNmZjk5ZWMiLz48L3N2Zz4='
  },
  { 
    id: 'f7', 
    gender: 'female', 
    src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGZpbGw9IiNmNGY5ZmYiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjQ1IiByPSIyMCIgZmlsbD0iI2Y0YTI2MSIvPjxlbGxpcHNlIGN4PSI1MCIgY3k9IjI2IiByeD0iMjIiIHJ5PSIxOCIgZmlsbD0iIzMzMzMzMyIvPjxjaXJjbGUgY3g9IjQ0IiBjeT0iNDAiIHI9IjIuNSIgZmlsbD0iIzI1MjUyNSIvPjxjaXJjbGUgY3g9IjU2IiBjeT0iNDAiIHI9IjIuNSIgZmlsbD0iIzI1MjUyNSIvPjxwYXRoIGQ9Ik00NSA1MiBRNTAgNTUgNTUgNTIiIHN0cm9rZT0iI2ZmNjk5NiIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+PHJlY3QgeD0iMzUiIHk9IjcwIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHJ4PSI1IiBmaWxsPSIjMDBjYzY2Ii8+PHBhdGggZD0iTTMwIDI0IFE0MiAxNSA1MCAxNSBRNTggMTUgNzAgMjQgUTY1IDM2IDUwIDM4IFEzNSAzNiAzMCAyNCBaIiBmaWxsPSIjMzMzMzMzIi8+PGVsbGlwc2UgY3g9IjM4IiBjeT0iNDYiIHJ4PSI0IiByeT0iMyIgZmlsbD0iI2ZmOTllYyIvPjxlbGxpcHNlIGN4PSI2MiIgY3k9IjQ2IiByeD0iNCIgcnk9IjMiIGZpbGw9IiNmZjk5ZWMiLz48L3N2Zz4='
  },
  { 
    id: 'f8', 
    gender: 'female', 
    src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JoxD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGZpbGw9IiNmZGY0ZmYiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjQ1IiByPSIyMCIgZmlsbD0iI2ZlZGJhOCIvPjxlbGxpcHNlIGN4PSI1MCIgY3k9IjI2IiByeD0iMjIiIHJ5PSIxOCIgZmlsbD0iI2ZmZDcwMCIvPjxjaXJjbGUgY3g9IjQ0IiBjeT0iNDAiIHI9IjIuNSIgZmlsbD0iIzI1MjUyNSIvPjxjaXJjbGUgY3g9IjU2IiBjeT0iNDAiIHI9IjIuNSIgZmlsbD0iIzI1MjUyNSIvPjxwYXRoIGQ9Ik00NSA1MiBRNTAgNTUgNTUgNTIiIHN0cm9rZT0iI2ZmNjk5NiIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+PHJlY3QgeD0iMzUiIHk9IjcwIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHJ4PSI1IiBmaWxsPSIjZmYzMzk5Ii8+PHBhdGggZD0iTTI4IDI2IFE0MiAxMiA1MCAxMiBRNTggMTIgNzIgMjYgUTY1IDM2IDUwIDM4IFEzNSAzNiAyOCAyNiBaIiBmaWxsPSIjZmZkNzAwIi8+PGNpcmNsZSBjeD0iNDIiIGN5PSIzMCIgcj0iMyIgZmlsbD0iI2ZmZDcwMCIvPjxjaXJjbGUgY3g9IjU4IiBjeT0iMzAiIHI9IjMiIGZpbGw9IiNmZmQ3MDAiLz48ZWxsaXBzZSBjeD0iMzgiIGN5PSI0NiIgcng9IjQiIHJ5PSIzIiBmaWxsPSIjZmY5OWVjIi8+PGVsbGlwc2UgY3g9IjYyIiBjeT0iNDYiIHJ4PSI0IiByeT0iMyIgZmlsbD0iI2ZmOTllYyIvPjwvc3ZnPg=='
  },
  { 
    id: 'f9', 
    gender: 'female', 
    src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGZpbGw9IiNmMGZkZjQiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjQ1IiByPSIyMCIgZmlsbD0iI2Y1OWU0YiIvPjxlbGxpcHNlIGN4PSI1MCIgY3k9IjI2IiByeD0iMjIiIHJ5PSIxOCIgZmlsbD0iIzM3MjUxNyIvPjxjaXJjbGUgY3g9IjQ0IiBjeT0iNDAiIHI9IjIuNSIgZmlsbD0iIzI1MjUyNSIvPjxjaXJjbGUgY3g9IjU2IiBjeT0iNDAiIHI9IjIuNSIgZmlsbD0iIzI1MjUyNSIvPjxwYXRoIGQ9Ik00NSA1MiBRNTAgNTUgNTUgNTIiIHN0cm9rZT0iI2ZmNjk5NiIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+PHJlY3QgeD0iMzUiIHk9IjcwIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHJ4PSI1IiBmaWxsPSIjNjY2NmZmIi8+PHBhdGggZD0iTTMwIDI0IFE0MiAxNSA1MCAxNSBRNTggMTUgNzAgMjQgUTY1IDM2IDUwIDM4IFEzNSAzNiAzMCAyNCBaIiBmaWxsPSIjMzcyNTE3Ii8+PGNpcmNsZSBjeD0iNDAiIGN5PSIzMCIgcj0iMiIgZmlsbD0iIzM3MjUxNyIvPjxjaXJjbGUgY3g9IjYwIiBjeT0iMzAiIHI9IjIiIGZpbGw9IiMzNzI1MTciLz48ZWxsaXBzZSBjeD0iMzgiIGN5PSI0NiIgcng9IjQiIHJ5PSIzIiBmaWxsPSIjZmY5OWVjIi8+PGVsbGlwc2UgY3g9IjYyIiBjeT0iNDYiIHJ4PSI0IiByeT0iMyIgZmlsbD0iI2ZmOTllYyIvPjwvc3ZnPg=='
  },
  { 
    id: 'f10', 
    gender: 'female', 
    src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGZpbGw9IiNmZmY0ZWIiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjQ1IiByPSIyMCIgZmlsbD0iI2ZkYjI4ZiIvPjxlbGxpcHNlIGN4PSI1MCIgY3k9IjI2IiByeD0iMjIiIHJ5PSIxOCIgZmlsbD0iIzk3NzE0ZCIvPjxjaXJjbGUgY3g9IjQ0IiBjeT0iNDAiIHI9IjIuNSIgZmlsbD0iIzI1MjUyNSIvPjxjaXJjbGUgY3g9IjU2IiBjeT0iNDAiIHI9IjIuNSIgZmlsbD0iIzI1MjUyNSIvPjxwYXRoIGQ9Ik00NSA1MiBRNTAgNTUgNTUgNTIiIHN0cm9rZT0iI2ZmNjk5NiIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+PHJlY3QgeD0iMzUiIHk9IjcwIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHJ4PSI1IiBmaWxsPSIjZmY2NjAwIi8+PHBhdGggZD0iTTMwIDI0IFE0MiAxNSA1MCAxNSBRNTggMTUgNzAgMjQgUTY1IDM2IDUwIDM4IFEzNSAzNiAzMCAyNCBaIiBmaWxsPSIjOTc3MTRkIi8+PGVsbGlwc2UgY3g9IjM4IiBjeT0iNDYiIHJ4PSI0IiByeT0iMyIgZmlsbD0iI2ZmOTllYyIvPjxlbGxpcHNlIGN4PSI2MiIgY3k9IjQ2IiByeD0iNCIgcnk9IjMiIGZpbGw9IiNmZjk5ZWMiLz48L3N2Zz4='
  }
];

const AvatarPickerDialog = ({ isOpen, onClose, onSave, currentAvatar }) => {
  const [activeTab, setActiveTab] = useState('upload');
  const [genderFilter, setGenderFilter] = useState('all');
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [saveClicked, setSaveClicked] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isOpen && currentAvatar) {
      setSelectedAvatar(currentAvatar);
    }
  }, [isOpen, currentAvatar]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        setUploadedImage(result);
        setSelectedAvatar(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 }, 
          height: { ideal: 480 },
          facingMode: 'user'
        } 
      });
      
      setCameraStream(stream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
        };
        setIsCapturing(true);
      }

      toast({
        title: "Camera started",
        description: "Position yourself in the frame and click capture when ready.",
      });
    } catch (error) {
      console.error('Camera error:', error);
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions and try again.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCapturing(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        setUploadedImage(imageData);
        setSelectedAvatar(imageData);
        stopCamera();
        
        toast({
          title: "Photo captured successfully!",
          description: "Your photo has been captured and is ready to save.",
        });
      }
    }
  };

  const handleSave = () => {
    if (selectedAvatar) {
      setSaveClicked(true);
      setTimeout(() => {
        onSave(selectedAvatar);
        toast({
          title: "Profile picture updated",
          description: "Your profile picture has been updated successfully.",
        });
        onClose();
        setSaveClicked(false);
        setUploadedImage(null);
        stopCamera();
      }, 800);
    } else {
      toast({
        title: "No image selected",
        description: "Please select or upload an image first.",
        variant: "destructive",
      });
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const filteredSvgAvatars = genderFilter === 'all' 
    ? svgAvatars 
    : svgAvatars.filter(avatar => avatar.gender === genderFilter);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center">
            <span className="bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
              Change profile picture
            </span>
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Upload a photo or select an avatar.
          </p>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-4">
            <TabsTrigger value="upload" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Upload</TabsTrigger>
            <TabsTrigger value="svg" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">SVG Avatars</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="py-4 space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <p className="text-center text-sm text-muted-foreground">Choose how to add your picture</p>
              
              {!isCapturing && (
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                  <Button 
                    onClick={startCamera} 
                    className="flex items-center gap-2 flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  >
                    <Camera className="h-4 w-4" />
                    Camera
                  </Button>
                  
                  <Button 
                    onClick={triggerFileUpload} 
                    className="flex items-center gap-2 flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    <FolderOpen className="h-4 w-4" />
                    This PC
                  </Button>
                </div>
              )}

              {isCapturing && (
                <div className="space-y-4 w-full max-w-md">
                  <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden">
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline
                      muted
                      className="w-full h-64 object-cover rounded-lg border-2 border-dashed border-gray-300"
                      style={{ transform: 'scaleX(-1)' }}
                    />
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      LIVE
                    </div>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <Button 
                      onClick={capturePhoto} 
                      className="bg-red-600 hover:bg-red-700 text-white px-6"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Capture Photo
                    </Button>
                    <Button onClick={stopCamera} variant="outline">
                      Cancel
                    </Button>
                  </div>
                  <p className="text-xs text-center text-muted-foreground">
                    Position yourself in the center and click capture when ready
                  </p>
                </div>
              )}

              {uploadedImage && !isCapturing && (
                <div className="space-y-2 w-full max-w-md">
                  <p className="text-sm font-medium text-center">Preview</p>
                  <div className="flex justify-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary shadow-lg">
                      <img
                        src={uploadedImage}
                        alt="Uploaded preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
              
              <canvas ref={canvasRef} className="hidden" />
            </div>
          </TabsContent>

          <TabsContent value="svg" className="py-4">
            <div className="mb-6">
              <p className="mb-4 text-sm text-muted-foreground">Click on an avatar to select it.</p>
              <div className="flex flex-wrap gap-2 mb-6">
                <Button 
                  variant={genderFilter === 'all' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setGenderFilter('all')}
                  className="transition-all hover:shadow-glow"
                >
                  All
                </Button>
                <Button 
                  variant={genderFilter === 'male' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setGenderFilter('male')}
                  className="transition-all hover:shadow-glow"
                >
                  Male
                </Button>
                <Button 
                  variant={genderFilter === 'female' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setGenderFilter('female')}
                  className="transition-all hover:shadow-glow"
                >
                  Female
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
              {filteredSvgAvatars.map((avatar, index) => (
                <div 
                  key={avatar.id}
                  className={`
                    cursor-pointer rounded-full p-1 transform transition-all duration-300
                    ${selectedAvatar === avatar.src ? 'ring-2 ring-primary scale-105 shadow-lg bg-blue-50' : 'hover:bg-muted/50 hover:scale-105'}
                    relative
                  `}
                  onClick={() => setSelectedAvatar(avatar.src)}
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <Avatar className="w-12 h-12 sm:w-14 sm:h-14 animate-fade-in">
                    <AvatarImage src={avatar.src} alt="Avatar option" className="transition-transform duration-300" />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  {selectedAvatar === avatar.src && (
                    <div className="absolute -top-1 -right-1 bg-white rounded-full shadow-md">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
          <DialogClose asChild>
            <Button variant="outline" className="hover:bg-muted/80 active:scale-95 transition-all">
              Cancel
            </Button>
          </DialogClose>
          <Button 
            onClick={handleSave} 
            className={cn(
              "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all hover:shadow-glow active:scale-95",
              saveClicked && "animate-pulse"
            )}
            disabled={saveClicked}
          >
            {saveClicked ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AvatarPickerDialog;