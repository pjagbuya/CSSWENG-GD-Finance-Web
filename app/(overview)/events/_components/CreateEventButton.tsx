'use client';

import { CirclePlus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import CreateEventDialog from './CreateEventDialog';

const CreateEventButton = () => {
  const [showCreateEventDialog, setShowCreateEventDialog] = useState(false);

  return (
    <>
      <Button onClick={() => setShowCreateEventDialog(true)}>
        <CirclePlus className="mr-2 w-4" /> Create Event
      </Button>

      <CreateEventDialog
        open={showCreateEventDialog}
        onFinish={() => setShowCreateEventDialog(false)}
      />
    </>
  );
};

export default CreateEventButton;
