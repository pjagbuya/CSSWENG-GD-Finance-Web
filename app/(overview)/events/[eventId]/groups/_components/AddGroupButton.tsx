import { CirclePlus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import AddGroupForm from './AddGroupForm';

type AddGroupButtonProps = {
  type: 'expense' | 'revenue';
};

const AddGroupButton = ({ type }: AddGroupButtonProps) => {
  const [showDialog, setShowDialog] = useState(false);

  const typeLabel = type === 'expense' ? 'Expense' : 'Revenue';

  return (
    <>
      <Button onClick={() => setShowDialog(true)}>
        <CirclePlus className="mr-2 w-4" /> Add {typeLabel} Group
      </Button>

      {showDialog && (
        <AddGroupForm type={type} onFinish={() => setShowDialog(false)} />
      )}
    </>
  );
};

export default AddGroupButton;
