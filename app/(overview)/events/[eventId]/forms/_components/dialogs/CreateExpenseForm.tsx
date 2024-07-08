import { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import CreateForm from './CreateForm';
import { useFormState } from 'react-dom';
import {
  createExpenseForm,
  CreateExpenseFormState,
  getItemCategories,
} from '@/actions/forms';
import ErrorDisplay from './ErrorDisplay';
import { redirect, usePathname } from 'next/navigation';

type CreateExpenseFormProps = {
  onFinish?: () => void;
};

const CreateExpenseForm = ({ onFinish }: CreateExpenseFormProps) => {
  const pathname = usePathname();

  const [categories, setCategories] = useState<string[]>([]);

  const initialState: CreateExpenseFormState = {
    errors: {},
    message: null,
  };
  const [state, action] = useFormState(handleCreateExpenseForm, initialState);

  useEffect(() => {
    fetchCategories();

    async function fetchCategories() {
      const categories = await getItemCategories();
      setCategories(categories);
    }
  }, []);

  async function handleCreateExpenseForm(
    prevState: CreateExpenseFormState,
    formData: FormData,
  ) {
    const res = await createExpenseForm(prevState, formData);

    if (!res.message) {
      redirect(`${pathname}/${res.formId}/edit`);
    }

    return res;
  }

  return (
    <CreateForm
      action={action}
      state={state}
      title="Create Expense Form"
      onFinish={onFinish}
    >
      <>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="es_name" placeholder="Name" />

        <ErrorDisplay errors={state.errors?.es_name} />
      </>

      <>
        <Label htmlFor="category">Category</Label>
        <Select name="es_category">
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

        <ErrorDisplay errors={state.errors?.es_category} />
      </>
    </CreateForm>
  );
};

export default CreateExpenseForm;
