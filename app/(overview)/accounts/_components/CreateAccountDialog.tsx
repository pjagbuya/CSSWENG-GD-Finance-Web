import { useFormState } from 'react-dom';

import { AccountState, createAccount } from '@/actions/account';
import AccountDialogForm from './AccountDialogForm';

type CreateAccountDialogProps = {
  open: boolean;
  onFinish: () => void;
};

const CreateAccountDialog = ({ open, onFinish }: CreateAccountDialogProps) => {
  const initialState: AccountState = {
    errors: {
      email: [],
      password: [],
      first_name: [],
      last_name: [],
      role: [],
    },
    message: null,
  };
  const [state, formAction] = useFormState(createAccount, initialState);

  return (
    <AccountDialogForm
      action={formAction}
      label={'Create'}
      state={state}
      open={open}
      onOpenChange={onFinish}
    />
  );
};

export default CreateAccountDialog;
