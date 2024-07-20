'use client';

import { CirclePlus } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';

import CreateExpenseTransactionForm from './dialogs/CreateExpenseTransactionForm';
import CreateRevenueTransactionForm from './dialogs/CreateRevenueTransasctionForm';

type CreateFormButtonProps = {
  title: string;
  variant: 'expense' | 'revenue';
};

const CreateFormButton = ({ title, variant }: CreateFormButtonProps) => {
  const [showDialog, setShowDialog] = useState(false);

  function getFormComponent() {
    switch (variant) {
      case 'expense':
        return (
          <CreateExpenseTransactionForm onFinish={() => setShowDialog(false)} />
        );

      case 'revenue':
        return (
          <CreateRevenueTransactionForm onFinish={() => setShowDialog(false)} />
        );

      default:
        throw new Error('Invalid variant given.');
    }
  }

  return (
    <>
      <Button onClick={() => setShowDialog(true)}>
        <CirclePlus className="mr-2 w-4" /> {title}
      </Button>

      {showDialog && getFormComponent()}
    </>
  );
};

export default CreateFormButton;
