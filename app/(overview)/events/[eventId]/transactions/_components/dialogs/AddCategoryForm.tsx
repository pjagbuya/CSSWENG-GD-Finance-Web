import { useEffect } from 'react';
import { useFormState } from 'react-dom';

import { addCategory } from '@/actions/transactions';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

import CreateForm from '../../../_components/CreateForm';
import ErrorDisplay from '../../../_components/ErrorDisplay';

type AddCategoryFormProps = {
  onFinish?: () => void;
};

const AddCategoryForm = ({ onFinish }: AddCategoryFormProps) => {
  const [state, action] = useFormState(addCategory, {
    errors: {},
    hasDuplicateCategory: false,
  });

  useEffect(() => {
    if (!state.hasDuplicateCategory) {
      return;
    }

    toast({
      variant: 'destructive',
      title: 'Duplicate Category',
      description: `The entered category already exists.`,
    });
  }, [state]);

  return (
    <CreateForm
      action={action}
      state={state}
      title="Add Category"
      onFinish={onFinish}
    >
      <>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="Name" />

        <ErrorDisplay errors={state?.errors?.name} />
      </>
    </CreateForm>
  );
};

export default AddCategoryForm;
