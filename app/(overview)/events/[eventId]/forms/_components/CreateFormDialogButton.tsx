'use client';

import React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';
import FormDialog from './FormDialog';

const CreateFormDialogButton = () => {
  const [showCreateEventDialog, setShowCreateEventDialog] = useState(false);
  return (
    <>
      <Button onClick={() => setShowCreateEventDialog(true)}>
        <CirclePlus className="mr-2 w-4" /> Create Form
      </Button>

      <FormDialog
        isEditing={false}
        open={showCreateEventDialog}
        onCancel={() => setShowCreateEventDialog(false)}
        onConfirm={() => {}}
      />
    </>
  );
};

export default CreateFormDialogButton;
