import { useEffect, useRef, useState } from 'react';
import CreateForm from '../../../../_components/CreateForm';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import ErrorDisplay from '../../../../_components/ErrorDisplay';
import { Textarea } from '@/components/ui/textarea';
import { useFormState } from 'react-dom';
import { createItemValidation } from '@/actions/items';

type AddItemFormProps = {
  amount: string;
  paymentDetails: string;
  date: string;
  transactionId: string;
  onFinish?: () => void;
};

const AddItemFromReceiptDialog = ({
  amount,
  paymentDetails,
  date,
  transactionId,
  onFinish,
}: AddItemFormProps) => {
  const [fields, setFields] = useState({
    item_date: date,
    item_name: '',
    item_price: '',
    item_units: '',
    item_amount: amount,
    item_payment_details: paymentDetails,
  });

  const [state, action] = useFormState(
    createItemValidation.bind(null, transactionId),
    {
      errors: {},
    },
  );

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
          type="date"
          id="item_date"
          name="item_date"
          placeholder="Item Date"
          value={fields.item_date}
          onChange={e => {
            console.log(e.target.value);
            setFields({ ...fields, item_date: e.target.value });
          }}
        />

        <ErrorDisplay errors={state?.errors?.item_date} />
      </>

      <>
        <Label htmlFor="item_name">Name</Label>
        <Input
          id="item_name"
          name="item_name"
          placeholder="Item Name"
          value={fields.item_name}
          onChange={e => setFields({ ...fields, item_name: e.target.value })}
        />

        <ErrorDisplay errors={state?.errors?.item_name} />
      </>

      <>
        <Label htmlFor="item_price">Unit Price</Label>
        <Input
          type="number"
          id="item_price"
          name="item_price"
          placeholder="Unit Price (0 if none)"
          value={fields.item_price}
          min={0}
          step="any"
          onChange={e => setFields({ ...fields, item_price: e.target.value })}
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
          value={fields.item_units}
          min={0}
          onChange={e => setFields({ ...fields, item_units: e.target.value })}
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
          value={fields.item_amount}
          min={0}
          step="any"
          onChange={e => setFields({ ...fields, item_amount: e.target.value })}
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
          value={fields.item_payment_details}
          onChange={e =>
            setFields({ ...fields, item_payment_details: e.target.value })
          }
        />

        <ErrorDisplay errors={state.errors?.item_payment_details} />
      </>
    </CreateForm>
  );
};

export default AddItemFromReceiptDialog;
