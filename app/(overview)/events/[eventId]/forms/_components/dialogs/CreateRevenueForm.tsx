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

import CreateForm from '../../../_components/CreateForm';
import { useFormState } from 'react-dom';
import {
  createRevenueForm,
  CreateRevenueFormState,
  getItemCategories,
} from '@/actions/forms';
import ErrorDisplay from '../../../_components/ErrorDisplay';
import { redirect, usePathname } from 'next/navigation';

type CreateRevenueFormProps = {
  eventId: string;
  onFinish?: () => void;
};

const CreateRevenueForm = ({ eventId, onFinish }: CreateRevenueFormProps) => {
  const pathname = usePathname();

  const [categories, setCategories] = useState<string[]>([]);

  const initialState: CreateRevenueFormState = {
    errors: {},
    message: null,
  };
  const [state, action] = useFormState(handleCreateRevenueForm, initialState);

  useEffect(() => {
    fetchCategories();

    async function fetchCategories() {
      const categories = await getItemCategories(eventId);
      setCategories(categories);
    }
  }, []);

  async function handleCreateRevenueForm(
    prevState: CreateRevenueFormState,
    formData: FormData,
  ) {
    const res = await createRevenueForm(prevState, formData);

    if (!res.message) {
      redirect(`${pathname}/${res.formId}/edit`);
    }

    return res;
  }

  return (
    <CreateForm
      action={action}
      state={state}
      title="Create Revenue Form"
      onFinish={onFinish}
    >
      <>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="rs_name" placeholder="Name" />

        <ErrorDisplay errors={state.errors?.rs_name} />
      </>

      <>
        <Label htmlFor="category">Category</Label>
        <Select name="rs_category">
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

        <ErrorDisplay errors={state.errors?.rs_category} />
      </>
    </CreateForm>
  );
};

export default CreateRevenueForm;
