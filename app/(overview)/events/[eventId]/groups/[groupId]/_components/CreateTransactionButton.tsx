'use client';

import { CirclePlus } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import AddTransactionDialog from './AddTransactionDialog';

const CreateTransactionButton = () => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Button onClick={() => setShowDialog(true)}>
        <CirclePlus className="mr-2 w-4" /> Add Transaction
      </Button>

      {showDialog && (
        <AddTransactionDialog onFinish={() => setShowDialog(false)} />
      )}
    </>
  );
};

export default CreateTransactionButton;
