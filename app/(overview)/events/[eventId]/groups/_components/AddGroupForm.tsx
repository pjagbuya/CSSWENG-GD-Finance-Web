import { useFormState } from 'react-dom';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CreateForm from '../../_components/CreateForm';
import ErrorDisplay from '../../_components/ErrorDisplay';

type AddGroupFormProps = {
  type: 'expense' | 'revenue';
  onFinish?: () => void;
};

const AddGroupForm = ({ type, onFinish }: AddGroupFormProps) => {
  // TODO: @Enzo link functions
  const [state, action] = useFormState(addCategory.bind(null, type), {
    errors: {},
    hasDuplicateCategory: false,
  });

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
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Name" />

          <ErrorDisplay errors={state?.errors?.name} />
        </>
      </CreateForm>
    </>
  );
};

export default AddGroupForm;
