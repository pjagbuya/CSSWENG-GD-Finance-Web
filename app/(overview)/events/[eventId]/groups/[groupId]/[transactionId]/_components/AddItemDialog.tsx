import { useEffect, useRef } from 'react';
import CreateForm from '../../../../_components/CreateForm';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import ErrorDisplay from '../../../../_components/ErrorDisplay';
import { Textarea } from '@/components/ui/textarea';
import { useFormState } from 'react-dom';
import { createItemValidation } from '@/actions/items';

type AddItemFormProps = {
  transactionId: string;
  onFinish?: () => void;
};

const AddItemDialog = ({ transactionId, onFinish }: AddItemFormProps) => {
  const dateElemRef = useRef<HTMLInputElement>(null);

  const [state, action] = useFormState(createItemValidation.bind(null, transactionId), {
    errors: {},
  });

  useEffect(() => {
    dateElemRef.current!.value = new Date().toISOString().substring(0, 10);
  }, []);

  return (
    <CreateForm
      action={action}
      state={state}
      title="Add Item"
      onFinish={onFinish}
    >
      <>
        <Label htmlFor="item_date">Date</Label>
        <Input
          ref={dateElemRef}
          type="date"
          id="item_date"
          name="item_date"
          placeholder="Item Date"
          defaultValue={Date.now()}
        />

        <ErrorDisplay errors={state?.errors?.item_date} />
      </>

      <>
        <Label htmlFor="item_name">Name</Label>
        <Input id="item_name" name="item_name" placeholder="Item Name" />

        <ErrorDisplay errors={state?.errors?.item_name} />
      </>

      <>
        <Label htmlFor="item_price">Unit Price</Label>
        <Input
          type="number"
          id="item_price"
          name="item_price"
          placeholder="Unit Price (0 if none)"
          defaultValue={0}
          min={0}
          step="any"
        />

        <ErrorDisplay errors={state?.errors?.item_price} />
      </>
      
      <>
        <Label htmlFor="item_units">Unit Count</Label>
        <Input
          type="number"
          id="item_units"
          name="item_units"
          placeholder="Unit Count (0 if none)"
          defaultValue={0}
          min={0}
        />

        <ErrorDisplay errors={state?.errors?.item_units} />
      </>
      
      <>
        <Label htmlFor="item_amount">Total Amount</Label>
        <Input
          type="number"
          id="item_amount"
          name="item_amount"
          placeholder="Total Amount (0 if none)"
          defaultValue={0}
          min={0}
          step="any"
        />

        <ErrorDisplay errors={state?.errors?.item_amount} />
      </>

      <>
        <Label htmlFor="item_payment_details">Payment Details</Label>
        <Textarea
          id="item_payment_details"
          name="item_payment_details"
          placeholder="Payment Details"
          className="resize-none"
        />

        <ErrorDisplay errors={state.errors?.item_payment_details} />
      </>
    </CreateForm>
  );
};

export default AddItemDialog;
