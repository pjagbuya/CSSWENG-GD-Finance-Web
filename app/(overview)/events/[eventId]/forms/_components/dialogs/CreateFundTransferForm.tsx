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

type CreateRevenueFormProps = {
  eventId: string;
  onFinish?: () => void;
};

const CreateFundTransferForm = ({ eventId, onFinish }: CreateRevenueFormProps) => {
  const [categories, setCategories] = useState<string[]>([]);

  const initialState: fundTransferState = {
    errors: {},
    message: null,
  };
  const [state, action] = useFormState(handleCreateRevenueForm, initialState);

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
      title="Create Fund Transfer Form"
      onFinish={onFinish}
      width={500}
    >
      <div className='grid grid-cols-2 gap-4'>
      <div>
      <>
        <Label htmlFor="id">Id</Label>
        <Input id="id" name="ft_id" placeholder="Id" />

        <ErrorDisplay errors={state.errors?.ft_id} />
      </>
      <>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="ft_name" placeholder="Name" />

        <ErrorDisplay errors={state.errors?.ft_name} />
      </>

      <>
        <Label htmlFor="date">Date</Label>
        {/* <DatePicker name='fr_date' /> */}
        <input name='ft_date' type='date' id='date' />

        <ErrorDisplay errors={state.errors?.ft_date} />
      </>
      <>
        <Label htmlFor="reason">Reason</Label>
        <Textarea id='reason' name='ft_reason' placeholder='State your reason' />

        <ErrorDisplay errors={state.errors?.ft_reason} />
      </>
      <div/>
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input id="amount" name="ft_amount" placeholder="Amount" />

          <ErrorDisplay errors={state.errors?.ft_amount} />
        </div>
        <div>
          <Label htmlFor="to">Transfer To</Label>
          <Input id="to" name="ft_to" placeholder="Transfer to" />

          <ErrorDisplay errors={state.errors?.ft_to} />
        </div>
        <div>
          <Label htmlFor="from">Transfer From</Label>
          <Input id="from" name="ft_from" placeholder="Transfer From" />

          <ErrorDisplay errors={state.errors?.ft_from} />
        </div>
        <div>
          <Label htmlFor="on">Transfer On</Label>
          <Input id="on" name="ft_on" placeholder="Transfer On" />

          <ErrorDisplay errors={state.errors?.ft_on} />
        </div>
      </div>
      <div>
        <Label htmlFor="name">Receipt Link</Label>
        <Input id="name" name="receipt_link" placeholder="Receipt Link" />

        <ErrorDisplay errors={state.errors?.receipt_link} />
      </div>
    </CreateForm>
  );
};

export default CreateFundTransferForm;
