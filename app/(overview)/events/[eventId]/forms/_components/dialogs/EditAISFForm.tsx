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
import StaffSelector from '../../[formId]/edit/_components/CertifiedStaffSelector';
import StaffMultiSelector from '../../[formId]/edit/_components/StaffMultiSelector';

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
      <div className="flex flex-col gap-3">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="ai_name"
          placeholder="Enter Name"
        />

        <ErrorDisplay errors={state?.errors?.ai_name} />
      </div>
      <>
        <Label htmlFor="notes">Notes</Label>
        <Textarea id='notes' name='ai_notes' placeholder='Activity Income Notes' />

        <ErrorDisplay errors={state.errors?.ai_notes} />
      </>
      <div className="flex flex-col gap-3">
        <StaffSelector
          label="Prepared by"
          name="prepared_staff_id"
          placeholder="Prepared By"
        // value={values.certified_staff_id}
        // onChange={v => setValues({ ...values, certified_staff_id: v })}
        />
        <ErrorDisplay errors={state.errors?.prepared_staff_id} />
      </div>

      <div className="flex flex-col gap-3">
        <StaffMultiSelector
          label="Certified By"
          name="certified_staff_id"
          placeholder="Certified By"
          value={/*values.noted_staff_list_ids*/ ''}
        />
        <ErrorDisplay errors={state.errors?.certified_staff_id} />
      </div>
    </CreateForm>
  );
};

export default EditAISFForm;
