'use client';

import { CirclePlus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import EditAccountDialog from './EditAccountDialog';

const CreateAccountButton = () => {
  const [showCreateAccountDialog, setShowCreateAccountDialog] = useState(false);

  return (
    <>
      <Button onClick={() => setShowCreateAccountDialog(true)}>
        <CirclePlus className="mr-2 w-4" /> Create Account
      </Button>

      <EditAccountDialog
        isEditing={false}
        open={showCreateAccountDialog}
        onCancel={() => setShowCreateAccountDialog(false)}
        onConfirm={() => setShowCreateAccountDialog(false)}
      />
    </>
  );
};

export default CreateAccountButton;
