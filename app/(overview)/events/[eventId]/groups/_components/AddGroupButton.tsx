'use client';

import { CirclePlus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import AddGroupForm from './AddGroupForm';

type AddGroupButtonProps = {
  eventId: string;
  type: 'expense' | 'revenue';
};

const AddGroupButton = ({ eventId, type }: AddGroupButtonProps) => {
  const [showDialog, setShowDialog] = useState(false);

  const typeLabel = type === 'expense' ? 'Expense' : 'Revenue';

  return (
    <>
      <Button onClick={() => setShowDialog(true)}>
        <CirclePlus className="mr-2 w-4" /> Add {typeLabel} Group
      </Button>

      {showDialog && (
        <AddGroupForm
          eventId={eventId}
          type={type}
          onFinish={() => setShowDialog(false)}
        />
      )}
    </>
  );
};

export default AddGroupButton;
