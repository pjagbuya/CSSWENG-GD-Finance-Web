'use client';

import { CirclePlus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import RegisterAccountDialog from './RegisterAccountDialog';

type RegisterAccountButtonType = {
  id: string;
}

const EditStaffButton = ({ id }: RegisterAccountButtonType) => {
  const [showRegisterAccountDialog, setShowRegisterAccountDialog] = useState(false);

  return (
    <>
      <Button onClick={() => setShowRegisterAccountDialog(true)}>
        <CirclePlus className="mr-2 w-4" /> Edit Staff
      </Button>

      <RegisterAccountDialog
        open={showRegisterAccountDialog}
        onFinish={() => setShowRegisterAccountDialog(false)}
        id={id}
      />
    </>
  );
};

export default EditStaffButton;
