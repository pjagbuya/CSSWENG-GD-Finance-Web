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
  itemId: string;
  open: boolean;
  onFinish?: () => void;
};

const EditItemDialog = ({ itemId, onFinish, open }: EditItemFormProps) => {
  const [fields, setFields] = useState({
    item_date: '',
    item_name: '',
    item_price: '',
    item_units: '',
    item_payment_details: '',
  });

  const [state, action] = useFormState(
    editItemValidation.bind(null, itemId, 'item_id'),
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
      state={state}
      title="Edit Item"
      open={open}
      onFinish={onFinish}
    >
      <>
        <Label htmlFor="date">Date</Label>
        <Input
          type="date"
          id="date"
          name="date"
          placeholder="Item Date"
          value={fields.item_date}
          onChange={e => () =>
            setFields({ ...fields, item_date: e.target.value })
          }
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
          onChange={e => () =>
            setFields({ ...fields, item_name: e.target.value })
          }
        />

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
          value={fields.item_price}
          onChange={e => () =>
            setFields({ ...fields, item_price: e.target.value })
          }
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
          value={fields.item_units}
          onChange={e => () =>
            setFields({ ...fields, item_units: e.target.value })
          }
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
          value={fields.item_payment_details}
          onChange={e => () =>
            setFields({ ...fields, item_payment_details: e.target.value })
          }
        />

        <ErrorDisplay errors={state.errors?.item_payment_details} />
      </>
    </CreateForm>
  );
};

export default EditItemDialog;
