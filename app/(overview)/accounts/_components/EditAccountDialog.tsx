'use client'

import {
  AccountState,
  createAccount,
  editAccount,
  getUser,
} from '@/actions/account';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import AccountDialogForm from './AccountDialogForm';

type EditAccountDialogProps = {
  isEditing: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  accountId?: string;
};

const EditAccountDialog = ({
  isEditing,
  onCancel,
  onConfirm,
  accountId,
}: EditAccountDialogProps) => {
  const [open, setOpen] = useState(false);

  const initialState: AccountState = { message: null, errors: {} };
  const accountAction = isEditing
    ? editAccount.bind(null, accountId || '')
    : createAccount;
  const [state, formAction] = useFormState(accountAction, initialState);

  const [fields, setFields] = useState({
    email: '',
  });


  useEffect(() => {
    async function getUserInfo() {
      if (accountId) {
        const user = await getUser(accountId);
        setFields({ ...fields, email: user.email || '' });

        setOpen(true);
      }
    }

    if (isEditing) {
      getUserInfo();
    } else {
      setFields({ email: '' });
    }
  }, [accountId]);

  function handleOpenChange(v: boolean) {
    if (v) {
      onConfirm();
    } else {
      onCancel();
    }

    setOpen(false);
  }

  return (
    <AccountDialogForm
      action={formAction}
      fields={fields}
      label="Create"
      state={state}
      open={open}
      onFieldsChange={setFields}
      onOpenChange={handleOpenChange}
    />
  );
};


export default EditAccountDialog;
