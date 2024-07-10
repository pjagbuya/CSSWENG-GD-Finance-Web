import { useFormState } from 'react-dom';

import { createExpense } from '@/actions/transactions';

import CreateForm from '../../../_components/CreateForm';

type CreateExpenseTransactionFormProps = {
  onFinish?: () => void;
};

const CreateExpenseTransactionForm = ({
  onFinish,
}: CreateExpenseTransactionFormProps) => {
  const [state, action] = useFormState(createExpense, {
    errors: {},
    message: null,
  });

  return (
    <CreateForm
      action={action}
      state={state}
      title="Add Expense"
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

export default CreateExpenseTransactionForm;
