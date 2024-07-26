'use client';

import { useFormState } from 'react-dom';
import {
  RegisterAccountState,
  editSTaffForm,
  getUserStaff,
  registerAccount,
} from '@/actions/account';
import { useEffect, useState } from 'react';
import EditStaffForm from './EditStaffForm';

type EditEventDialogProps = {
  open: boolean;
  onFinish: () => void;
  id: string;
};

const EditStaffDialog = ({ open, onFinish, id }: EditEventDialogProps) => {
  const initialState: RegisterAccountState = {
    message: null,
    errors: {},
  };
  const registerAction = editSTaffForm.bind(null, id);
  const [state, formAction] = useFormState(registerAction, initialState);
  const [fields, setFields] = useState({
    position: '',
  });

  useEffect(() => {
    async function getUserInfo() {
      if (id) {
        const user = await getUserStaff(id);
        setFields({ ...fields, ...user });

        console.log(id);
      }
    }

    getUserInfo();
  }, [id]);

  function handleOpenChange(v: boolean) {
    onFinish();
  }

  return (
    <EditStaffForm
      action={formAction}
      fields={fields}
      label={'Edit'}
      state={state}
      open={open}
      onFieldsChange={setFields}
      onOpenChange={handleOpenChange}
    />
  );
};

export default EditStaffDialog;
