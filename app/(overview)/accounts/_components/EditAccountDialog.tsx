import { useEffect } from 'react';
import { useFormState } from 'react-dom';

import { AccountState, editAccount } from '@/actions/account';
import AccountDialogForm from './AccountDialogForm';

type EditAccountDialogProps = {
  accountId: string;
  onFinish: () => void;
};

const EditAccountDialog = ({ accountId, onFinish }: EditAccountDialogProps) => {
  const initialState: AccountState = {
    errors: {},
    message: null,
  };
  const [state, formAction] = useFormState(editAccount, initialState);

  useEffect(() => {
    // fetch initial info
  }, [accountId]);

  return (
    <AccountDialogForm
      action={formAction}
      label={'Edit'}
      state={state}
      open={!!accountId}
      onOpenChange={onFinish}
    />
  );
};

export default EditAccountDialog;
