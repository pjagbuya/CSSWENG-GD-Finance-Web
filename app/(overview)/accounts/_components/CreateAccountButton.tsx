'use client';

import { CirclePlus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import CreateAccountDialog from './CreateAccountDialog';

const CreateAccountButton = () => {
  const [showCreateAccountDialog, setShowCreateAccountDialog] = useState(false);

  return (
    <>
      <Button onClick={() => setShowCreateAccountDialog(true)}>
        <CirclePlus className="mr-2 w-4" /> Create Account
      </Button>

      <CreateAccountDialog
        open={showCreateAccountDialog}
        onFinish={() => setShowCreateAccountDialog(false)}
      />
    </>
  );
};

export default CreateAccountButton;
