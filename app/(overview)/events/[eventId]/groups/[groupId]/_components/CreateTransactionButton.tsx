'use client';

import { CirclePlus } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import AddTransactionDialog from './AddTransactionDialog';

type CreateTransactionButtonProps = {
  groupId: string;
};

const CreateTransactionButton = ({groupId}: CreateTransactionButtonProps) => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Button onClick={() => setShowDialog(true)}>
        <CirclePlus className="mr-2 w-4" /> Add Transaction
      </Button>

      {showDialog && (
        <AddTransactionDialog groupId={groupId} onFinish={() => setShowDialog(false)} />
      )}
    </>
  );
};

export default CreateTransactionButton;
