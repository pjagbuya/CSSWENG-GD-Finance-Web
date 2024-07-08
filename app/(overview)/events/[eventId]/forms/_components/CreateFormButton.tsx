'use client';

import React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';
import CreateExpenseForm from './dialogs/CreateExpenseForm';

type CreateFormButtonProps = {
  variant: 'expense' | 'revenue' | 'fund_transfer';
};

const CreateFormButton = ({ variant }: CreateFormButtonProps) => {
  const [showDialog, setShowDialog] = useState(false);

  function getFormComponent() {
    switch (variant) {
      case 'expense':
        return <CreateExpenseForm onFinish={() => setShowDialog(false)} />;

      case 'revenue':
        // TODO
        return null;

      case 'fund_transfer':
        // TODO
        return null;

      default:
        throw new Error('Invalid form variant given.');
    }
  }

  return (
    <>
      <Button onClick={() => setShowDialog(true)}>
        <CirclePlus className="mr-2 w-4" /> Create Form
      </Button>

      {showDialog && getFormComponent()}
    </>
  );
};

export default CreateFormButton;
