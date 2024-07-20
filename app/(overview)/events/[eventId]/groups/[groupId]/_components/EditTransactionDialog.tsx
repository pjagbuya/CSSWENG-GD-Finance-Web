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
} from '@/actions/transaction';

type EditTransactionFormProps = {
  transactionId: string;
  open: boolean;
  onFinish?: () => void;
};

const EditTransactionDialog = ({
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
    editTransactionValidation.bind(null, transactionId, 'transaction_id'),
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
        <Label htmlFor="date">Date</Label>
        <Input
          type="date"
          id="date"
          name="date"
          placeholder="Transaction Date"
          defaultValue={Date.now()}
          value={fields.transaction_date}
          onChange={e => () =>
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
          onChange={e => () =>
            setFields({ ...fields, transaction_name: e.target.value })
          }
        />

        <ErrorDisplay errors={state?.errors?.transaction_name} />
      </>

      <>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          placeholder="notes"
          className="resize-none"
          value={fields.transaction_note}
          onChange={e => () =>
            setFields({ ...fields, transaction_note: e.target.value })
          }
        />

        <ErrorDisplay errors={state.errors?.transaction_note} />
      </>
    </CreateForm>
  );
};

export default EditTransactionDialog;
