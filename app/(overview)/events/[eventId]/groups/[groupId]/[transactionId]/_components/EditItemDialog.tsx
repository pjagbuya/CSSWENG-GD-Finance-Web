'use client';

import { useEffect, useRef, useState } from 'react';
import CreateForm from '../../../../_components/CreateForm';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import ErrorDisplay from '../../../../_components/ErrorDisplay';
import { Textarea } from '@/components/ui/textarea';
import { useFormState } from 'react-dom';
import {
  createItemValidation,
  editItemValidation,
  selectWhereItemValidation,
} from '@/actions/items';

type EditItemFormProps = {
  transactionId: string;
  itemId: string;
  open: boolean;
  onFinish?: () => void;
};

const EditItemDialog = ({
  transactionId,
  itemId,
  onFinish,
  open,
}: EditItemFormProps) => {
  const [fields, setFields] = useState({
    item_date: '',
    item_name: '',
    item_price: '',
    item_units: '',
    item_amount: '',
    item_payment_details: '',
  });

  const [state, action] = useFormState(
    editItemValidation.bind(null, transactionId, itemId, 'item_id'),
    {
      errors: {},
    },
  );

  useEffect(() => {
    if (!itemId) {
      return;
    }

    async function getItemInfo() {
      const { data } = await selectWhereItemValidation(itemId, 'item_id');
      setFields(data![0]);
    }

    getItemInfo();
  }, [itemId]);

  return (
    <CreateForm
      action={action}
      isEditing={true}
      state={state}
      title="Edit Item"
      open={open}
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
          onChange={e => setFields({ ...fields, item_date: e.target.value })}
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

export default EditItemDialog;
