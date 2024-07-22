'use client';

import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useFormState } from 'react-dom';
import CreateForm from '../../../_components/CreateForm';
import ErrorDisplay from '../../../_components/ErrorDisplay';
import {
  editTransactionValidation,
  selectWhereTransactionValidation,
} from '@/actions/transactions';

type EditTransactionFormProps = {
  groupId: string;
  transactionId: string;
  open: boolean;
  onFinish?: () => void;
};

const EditTransactionDialog = ({
  groupId,
  transactionId,
  onFinish,
  open,
}: EditTransactionFormProps) => {
  const [fields, setFields] = useState({
    transaction_date: '',
    transaction_name: '',
    transaction_note: '',
  });

  const [state, action] = useFormState(
    editTransactionValidation.bind(null, groupId, transactionId, 'transaction_id'),
    {
      errors: {},
    },
  );

  useEffect(() => {
    if (!transactionId) {
      return;
    }

    async function getItemInfo() {
      const { data } = await selectWhereTransactionValidation(
        transactionId,
        'transaction_id',
      );
      setFields(data![0]);
    }

    getItemInfo();
  }, [transactionId]);

  return (
    <CreateForm
      action={action}
      state={state}
      title="Edit Transaction"
      open={open}
      onFinish={onFinish}
    >
      <>
        <Label htmlFor="transaction_date">Date</Label>
        <Input
          type="date"
          id="transaction_date"
          name="transaction_date"
          placeholder="Transaction Date"
          defaultValue={Date.now()}
          value={fields.transaction_date}
          onChange={e =>
            setFields({ ...fields, transaction_date: e.target.value })
          }
        />

        <ErrorDisplay errors={state?.errors?.transaction_date} />
      </>

      <>
        <Label htmlFor="transaction_name">Name</Label>
        <Input
          id="transaction_name"
          name="transaction_name"
          placeholder="Transaction Name"
          value={fields.transaction_name}
          onChange={e => 
            setFields({ ...fields, transaction_name: e.target.value })
          }
        />

        <ErrorDisplay errors={state?.errors?.transaction_name} />
      </>

      <>
        <Label htmlFor="transaction_note">Notes</Label>
        <Textarea
          id="transaction_note"
          name="transaction_note"
          placeholder="Notes"
          className="resize-none"
          value={fields.transaction_note}
          onChange={e => 
            setFields({ ...fields, transaction_note: e.target.value })
          }
        />

        <ErrorDisplay errors={state.errors?.transaction_note} />
      </>
    </CreateForm>
  );
};

export default EditTransactionDialog;
