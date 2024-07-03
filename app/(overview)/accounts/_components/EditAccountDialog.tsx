'use client'

import {
  AccountState,
  createAccount,
  editAccount,
  getUser,
} from '@/actions/account';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
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
