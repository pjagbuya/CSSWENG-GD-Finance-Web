import { useEffect, useRef } from 'react';
import CreateForm from '../../../../_components/CreateForm';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import ErrorDisplay from '../../../../_components/ErrorDisplay';
import { Textarea } from '@/components/ui/textarea';
import { useFormState } from 'react-dom';
import { createItemValidation } from '@/actions/items';

type AddItemFormProps = {
  onFinish?: () => void;
};

const AddItemDialog = ({ onFinish }: AddItemFormProps) => {
  const dateElemRef = useRef<HTMLInputElement>(null);

  const [state, action] = useFormState(createItemValidation, {
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
        <Label htmlFor="date">Date</Label>
        <Input
          ref={dateElemRef}
          type="date"
          id="date"
          name="date"
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
        <Label htmlFor="item_price">Unit Price/Total Amount</Label>
        <Input
          type="number"
          id="item_price"
          name="item_price"
          placeholder="Unit Price/Total Amount"
          defaultValue={1}
          min={1}
          step="any"
        />

        <ErrorDisplay errors={state?.errors?.item_price} />
      </>

      <>
        <Label htmlFor="item_units">Unit Count (Optional)</Label>
        <Input
          type="number"
          id="item_units"
          name="item_units"
          placeholder="Unit Count (Optional)"
          defaultValue={1}
          min={1}
        />

        <ErrorDisplay errors={state?.errors?.item_units} />
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
