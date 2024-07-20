'use client';

import { CirclePlus } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';

import AddCategoryForm from './dialogs/AddCategoryForm';

const AddCategoryButton = () => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Button onClick={() => setShowDialog(true)}>
        <CirclePlus className="mr-2 w-4" /> Add Category
      </Button>

      {showDialog && <AddCategoryForm onFinish={() => setShowDialog(false)} />}
    </>
  );
};

export default AddCategoryButton;
