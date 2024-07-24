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
import ErrorDisplay from '../../../_components/ErrorDisplay';
import { redirect, usePathname } from 'next/navigation';
import { createFundTransferValidation, fundTransferState } from '@/actions/fund_transfers';
import { DatePicker } from '@/components/ui/date-picker';
import { Textarea } from '@/components/ui/textarea';
import { activityIncomeState, editActivityIncomeValidation } from '@/actions/activity_incomes';

type CreateRevenueFormProps = {
  eventId: string;
  onFinish?: () => void;
};

const EditAISFForm = ({ eventId, onFinish }: CreateRevenueFormProps) => {
  const [categories, setCategories] = useState<string[]>([]);

  const initialState: activityIncomeState = {
    errors: {},
    message: null,
  };
  const formAction = editActivityIncomeValidation.bind(eventId, '')
  const [state, action] = useFormState(formAction, initialState);

  useEffect(() => {
    fetchCategories();

    async function fetchCategories() {
      // const categories = await getItemCategories(eventId);
      // setCategories(categories);
    }
  }, []);

  async function handleCreateRevenueForm(
    prevState: fundTransferState,
    formData: FormData,
  ) {
    const res = await createFundTransferValidation(prevState, formData);


    return res;

  }

  return (
    <CreateForm
      action={action}
      state={state}
      title="Edit AISF Form"
      onFinish={onFinish}
    >
      <>
        <Label htmlFor="notes">Notes</Label>
        <Textarea id='notes' name='ai_notes' placeholder='Activity Income Notes' />

        <ErrorDisplay errors={state.errors?.ai_id} />
      </>
      <>
        <Label htmlFor="notes">Notes</Label>
        <Textarea id='notes' name='ai_notes' placeholder='Activity Income Notes' />

        <ErrorDisplay errors={state.errors?.ai_id} />
      </>
      <>
        <Label htmlFor="notes">Notes</Label>
        <Textarea id='notes' name='ai_notes' placeholder='Activity Income Notes' />

        <ErrorDisplay errors={state.errors?.ai_id} />
      </>
    </CreateForm>
  );
};

export default EditAISFForm;
