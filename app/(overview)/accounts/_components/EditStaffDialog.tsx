import { useFormState } from 'react-dom';
import RegisterAccountForm from './RegisterAccountForm';
import { RegisterAccountState, getUserStaff, registerAccount } from '@/actions/account';
import { useEffect, useState } from 'react';

type EditEventDialogProps = {
  open: boolean;
  onFinish: () => void;
  id: string;
};

const EditStaffDialog = ({ open, onFinish, id }: EditEventDialogProps) => {
  const initialState: RegisterAccountState = {
    message: null,
    errors: {
    }
  };
  const registerAction = registerAccount.bind(null, id)
  const [state, formAction] = useFormState(registerAction, initialState);
  const [fields, setFields] = useState({
    position: '',
  });


  useEffect(() => {
    async function getUserInfo() {
      if (id) {
        const user = await getUserStaff(id);
        setFields({ ...fields, ...user });

        // setOpen(true);
      }
    }

    getUserInfo();
  }, [id]);



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

export default EditStaffDialog;
