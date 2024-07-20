'use client';

import { CirclePlus } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import AddItemDialog from './AddItemDialog';

const AddItemButton = () => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Button onClick={() => setShowDialog(true)}>
        <CirclePlus className="mr-2 w-4" /> Add Transaction
      </Button>

      {showDialog && <AddItemDialog onFinish={() => setShowDialog(false)} />}
    </>
  );
};

export default AddItemButton;
