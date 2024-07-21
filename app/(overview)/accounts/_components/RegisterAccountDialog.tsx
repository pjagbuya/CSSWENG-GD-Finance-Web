import { useFormState } from 'react-dom';
import RegisterAccountForm from './RegisterAccountForm';
import { RegisterAccountState, registerAccount } from '@/actions/account';

type EditEventDialogProps = {
  open: boolean;
  onFinish: () => void;
  id: string;
};

const RegisterAccountDialog = ({ open, onFinish, id }: EditEventDialogProps) => {
  const initialState: RegisterAccountState = {
    message: null,
    errors: {
    }
  };
  const registerAction = registerAccount.bind(null, id)
  const [state, formAction] = useFormState(registerAction, initialState);

  return (
    <RegisterAccountForm
      action={formAction}
      label={'Register'}
      state={state}
      open={open}
      onOpenChange={onFinish}
    />
  );
};

export default RegisterAccountDialog;
