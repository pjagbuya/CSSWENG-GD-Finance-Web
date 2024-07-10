import { useFormState } from 'react-dom';

import { createRevenue } from '@/actions/transactions';

import CreateForm from '../../../_components/CreateForm';

type CreateRevenueTransactionFormProps = {
  onFinish?: () => void;
};

const CreateRevenueTransactionForm = ({
  onFinish,
}: CreateRevenueTransactionFormProps) => {
  const [state, action] = useFormState(createRevenue, {
    errors: {},
    message: null,
  });

  return (
    <CreateForm
      action={action}
      state={state}
      title="Add Revenue"
      onFinish={onFinish}
    >
      <>
        {/* 
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="es_name" placeholder="Name" /> 
          <ErrorDisplay errors={state.errors?.es_name} />
        */}
      </>
    </CreateForm>
  );
};

export default CreateRevenueTransactionForm;
