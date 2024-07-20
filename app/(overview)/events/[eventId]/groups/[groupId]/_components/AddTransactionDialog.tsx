import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import CreateForm from '../../../_components/CreateForm';
import ErrorDisplay from '../../../_components/ErrorDisplay';
import { Textarea } from '@/components/ui/textarea';
import { createTransactionValidation } from '@/actions/transaction';

type AddTransactionFormProps = {
  onFinish?: () => void;
};

const AddTransactionDialog = ({ onFinish }: AddTransactionFormProps) => {
  const dateElemRef = useRef<HTMLInputElement>(null);

  const [state, action] = useFormState(createTransactionValidation, {
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
        <Label htmlFor="date">Date</Label>
        <Input
          ref={dateElemRef}
          type="date"
          id="date"
          name="date"
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
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          placeholder="notes"
          className="resize-none"
        />

        <ErrorDisplay errors={state.errors?.transaction_note} />
      </>
    </CreateForm>
  );
};

export default AddTransactionDialog;
