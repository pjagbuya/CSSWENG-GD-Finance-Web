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
  const [state, action] = useFormState(editActivityIncomeValidation, initialState);

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
        <Label htmlFor="id">Id</Label>
        <Input id="id" name="ai_id" placeholder="Id" />

        <ErrorDisplay errors={state.errors?.ft_id} />
      </>
      <>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="ai_name" placeholder="Name" />

        <ErrorDisplay errors={state.errors?.ft_name} />
      </>

      <>
        <Label htmlFor="date">Date</Label>
        {/* <DatePicker name='fr_date' /> */}
        <input name='ai_date' type='date' id='date' />

        <ErrorDisplay errors={state.errors?.ft_date} />
      </>
      <>
        <Label htmlFor="notes">Notes</Label>
        <Textarea id='notes' name='ai_notes' placeholder='Activity Income Notes' />

        <ErrorDisplay errors={state.errors?.ft_reason} />
      </>
    </CreateForm>
  );
};

export default EditAISFForm;
