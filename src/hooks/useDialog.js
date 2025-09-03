import { useState } from 'react';

export function useDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [dialogData, setDialogData] = useState(null);

  const openDialog = (type, data = null) => {
    setDialogType(type);
    setDialogData(data);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setDialogData(null);
  };

  return {
    isDialogOpen,
    dialogType,
    dialogData,
    openDialog,
    closeDialog
  };
}