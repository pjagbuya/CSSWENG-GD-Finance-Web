'use client';

import { CirclePlus } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import AddItemDialog from './AddItemDialog';

type AddItemButtonProps = {
  transactionId: string;
};

const AddItemButton = ({ transactionId }: AddItemButtonProps) => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Button onClick={() => setShowDialog(true)}>
        <CirclePlus className="mr-2 w-4" /> Add Item
      </Button>

      {showDialog && <AddItemDialog transactionId={transactionId} onFinish={() => setShowDialog(false)} />}
    </>
  );
};

export default AddItemButton;
