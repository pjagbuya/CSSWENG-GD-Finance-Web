import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import CreateForm from '../../../_components/CreateForm';
import ErrorDisplay from '../../../_components/ErrorDisplay';
import { Textarea } from '@/components/ui/textarea';
import { createTransactionValidation } from '@/actions/transactions';

type AddTransactionFormProps = {
  groupId: string;
  onFinish?: () => void;
};

const AddTransactionDialog = ({ groupId, onFinish }: AddTransactionFormProps) => {
  const dateElemRef = useRef<HTMLInputElement>(null);

  const [state, action] = useFormState(createTransactionValidation.bind(null, groupId), {
    errors: {},
  });

  useEffect(() => {
    dateElemRef.current!.value = new Date().toISOString().substring(0, 10);
  }, []);

  return (
    <CreateForm
      action={action}
      state={state}
      title="Add Transaction"
      onFinish={onFinish}
    >
      <>
        <Label htmlFor="transaction_date">Date</Label>
        <Input
          ref={dateElemRef}
          type="date"
          id="transaction_date"
          name="transaction_date"
          placeholder="Transaction Date"
          defaultValue={Date.now()}
        />

        <ErrorDisplay errors={state?.errors?.transaction_date} />
      </>

      <>
        <Label htmlFor="transaction_name">Name</Label>
        <Input
          id="transaction_name"
          name="transaction_name"
          placeholder="Transaction Name"
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
        />

        <ErrorDisplay errors={state.errors?.transaction_note} />
      </>
    </CreateForm>
  );
};

export default AddTransactionDialog;
