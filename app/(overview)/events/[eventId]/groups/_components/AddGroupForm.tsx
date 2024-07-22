import { useFormState } from 'react-dom';

import { createCategoryValidation } from '@/actions/categories';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CreateForm from '../../_components/CreateForm';
import ErrorDisplay from '../../_components/ErrorDisplay';

type AddGroupFormProps = {
  eventId: string;
  type: 'expense' | 'revenue';
  onFinish?: () => void;
};

const AddGroupForm = ({ eventId, type, onFinish }: AddGroupFormProps) => {
  const [state, action] = useFormState(
    createCategoryValidation.bind(null, eventId, type),
    {
      errors: {},
      hasDuplicateCategory: false,
    },
  );

  const typeLabel = type === 'expense' ? 'Expense' : 'Revenue';

  return (
    <>
      <CreateForm
        action={action}
        state={state}
        title={`Add ${typeLabel} Group`}
        onFinish={onFinish}
      >
        <>
          <Label htmlFor="category_name">Name</Label>
          <Input id="category_name" name="category_name" placeholder="Name" />

          <ErrorDisplay errors={state?.errors?.category_name} />
        </>
      </CreateForm>
    </>
  );
};

export default AddGroupForm;
