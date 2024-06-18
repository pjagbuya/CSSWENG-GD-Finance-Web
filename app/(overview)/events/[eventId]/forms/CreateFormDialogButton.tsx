'use client'
import React from 'react'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';
import EditEventDialog from '@/components/EditEventDialog';

const CreateFormDialogButton = () => {
  const [showCreateEventDialog, setShowCreateEventDialog] = useState(false);
  return (
    <>
      <Button onClick={() => setShowCreateEventDialog(true)}>
        <CirclePlus className="mr-2 w-4" /> Create Event
      </Button>

      <EditEventDialog
        isEditing={false}
        open={showCreateEventDialog}
        onCancel={() => setShowCreateEventDialog(false)}
        onConfirm={() => { }}
      />

    </>
  )
}

export default CreateFormDialogButton
