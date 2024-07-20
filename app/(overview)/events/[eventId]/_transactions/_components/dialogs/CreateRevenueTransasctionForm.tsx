import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';

import { getItemCategories } from '@/actions/forms';
import { addRevenue } from '@/actions/transactions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import CreateForm from '../../../_components/CreateForm';
import ErrorDisplay from '../../../_components/ErrorDisplay';

type CreateRevenueTransactionFormProps = {
  eventId: string;
  onFinish?: () => void;
};

const CreateRevenueTransactionForm = ({
  eventId,
  onFinish,
}: CreateRevenueTransactionFormProps) => {
  const dateElemRef = useRef<HTMLInputElement>(null);

  const [categories, setCategories] = useState<string[]>([]);

  const [state, action] = useFormState(addRevenue, {
    errors: {},
  });

  useEffect(() => {
    dateElemRef.current!.value = new Date().toISOString().substring(0, 10);
  }, []);

  useEffect(() => {
    fetchCategories();

    async function fetchCategories() {
      const categories = await getItemCategories(eventId);
      setCategories(categories);
    }
  }, []);

  return (
    <CreateForm
      action={action}
      state={state}
      title="Add Revenue"
      onFinish={onFinish}
    >
      <>
        <Label htmlFor="date">Date</Label>
        <Input
          ref={dateElemRef}
          type="date"
          id="date"
          name="date"
          placeholder="Date"
          defaultValue={Date.now()}
        />

        <ErrorDisplay errors={state?.errors?.date} />
      </>

      <>
        <Label htmlFor="acc_from">Account Received From</Label>
        <Input
          id="acc_from"
          name="acc_from"
          placeholder="Account Received From"
        />

        <ErrorDisplay errors={state?.errors?.acc_from} />
      </>

      <>
        <Label htmlFor="acc_to">Account Transferred To</Label>
        <Input id="acc_to" name="acc_to" placeholder="Account Transferred To" />

        <ErrorDisplay errors={state?.errors?.acc_to} />
      </>

      <>
        <Label htmlFor="category">Category</Label>
        <Select name="category">
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>

          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </>

      <>
        <Label htmlFor="amount">Amount</Label>
        <Input
          type="number"
          id="amount"
          name="amount"
          placeholder="Amount"
          defaultValue={1}
          min={1}
          step="any"
        />

        <ErrorDisplay errors={state?.errors?.amount} />
      </>
    </CreateForm>
  );
};

export default CreateRevenueTransactionForm;
