import { useFormState } from 'react-dom';

import { addExpense } from '@/actions/transactions';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import CreateForm from '../../../_components/CreateForm';
import ErrorDisplay from '../../../_components/ErrorDisplay';
import { useEffect, useRef, useState } from 'react';
import { getItemCategories } from '@/actions/forms';

type CreateExpenseTransactionFormProps = {
  eventId: string;
  onFinish?: () => void;
};

const CreateExpenseTransactionForm = ({
  eventId,
  onFinish,
}: CreateExpenseTransactionFormProps) => {
  const dateElemRef = useRef<HTMLInputElement>(null);

  const [categories, setCategories] = useState<string[]>([]);

  const [state, action] = useFormState(addExpense, {
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
      title="Add Expense"
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
        <Label htmlFor="item_name">Item Name</Label>
        <Input id="item_name" name="item_name" placeholder="Item Name" />

        <ErrorDisplay errors={state?.errors?.item_name} />
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
        <Label htmlFor="unit_count">Unit Count</Label>
        <Input
          type="number"
          id="unit_count"
          name="unit_count"
          placeholder="Unit Count"
          defaultValue={1}
          min={1}
        />

        <ErrorDisplay errors={state?.errors?.unit_count} />
      </>

      <>
        <Label htmlFor="unit_price">Unit Price</Label>
        <Input
          type="number"
          id="unit_price"
          name="unit_price"
          placeholder="Unit Price"
          defaultValue={1}
          min={1}
          step="any"
        />

        <ErrorDisplay errors={state?.errors?.unit_price} />
      </>
    </CreateForm>
  );
};

export default CreateExpenseTransactionForm;
