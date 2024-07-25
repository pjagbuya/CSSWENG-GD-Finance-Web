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
import {
  createFundTransferValidation,
  fundTransferState,
} from '@/actions/fund_transfers';
import { DatePicker } from '@/components/ui/date-picker';
import { Textarea } from '@/components/ui/textarea';
import StaffSelector from '../../[formId]/edit/_components/CertifiedStaffSelector';
import StaffMultiSelector from '../../[formId]/edit/_components/StaffMultiSelector';

type CreateRevenueFormProps = {
  eventId: string;
  onFinish?: () => void;
};

const CreateFundTransferForm = ({
  eventId,
  onFinish,
}: CreateRevenueFormProps) => {
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
      <>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="ft_name" placeholder="Name" />

              <ErrorDisplay errors={state.errors?.ft_name} />
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="date">Date</Label>
              {/* <DatePicker name='fr_date' /> */}
              <Input name="ft_date" type="date" id="date" />

              <ErrorDisplay errors={state.errors?.ft_date} />
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="reason">Reason</Label>
              <Textarea
                className='resize-none'
                id="reason"
                name="ft_reason"
                placeholder="State your reason"
              />

              <ErrorDisplay errors={state.errors?.ft_reason} />
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" name="ft_amount" placeholder="Amount" />

              <ErrorDisplay errors={state.errors?.ft_amount} />
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="to">Transfer To</Label>
              <Input id="to" name="ft_to" placeholder="Transfer to" />

              <ErrorDisplay errors={state.errors?.ft_to} />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <Label htmlFor="from">Transfer From</Label>
              <Input id="from" name="ft_from" placeholder="Transfer From" />

              <ErrorDisplay errors={state.errors?.ft_from} />
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="on">Transfer On</Label>
              <Input id="on" name="ft_on" placeholder="Transfer On" />

              <ErrorDisplay errors={state.errors?.ft_on} />
            </div>

            <div className="flex flex-col gap-3">
              <StaffSelector
                label="Certified By"
                name="certified_staff_id"
                placeholder="Certified By"
              />
              <ErrorDisplay errors={state.errors?.certified_staff_id} />
            </div>

            <div className="flex flex-col gap-3">
              <StaffMultiSelector
                label="Noted By"
                name="noted_staff_list_ids"
                placeholder="Noted By"
                value=""
              />
              <ErrorDisplay errors={state.errors?.noted_staff_list_id} />
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="name">Receipt Link</Label>
              <Input id="name" name="receipt_link" placeholder="Receipt Link" />

              <ErrorDisplay errors={state.errors?.receipt_link} />
            </div>
          </div>
        </div>
      </>
    </CreateForm>
  );
};

export default CreateFundTransferForm;

// <div className='grid grid-cols-2 gap-4'>
//       <div>
//       <>
//         <Label htmlFor="name">Name</Label>
//         <Input id="name" name="ft_name" placeholder="Name" />

//         <ErrorDisplay errors={state.errors?.ft_name} />
//       </>

//       <>
//         <Label htmlFor="date">Date</Label>
//         {/* <DatePicker name='fr_date' /> */}
//         <input name='ft_date' type='date' id='date' />

//         <ErrorDisplay errors={state.errors?.ft_date} />
//       </>
//       <>
//         <Label htmlFor="reason">Reason</Label>
//         <Textarea id='reason' name='ft_reason' placeholder='State your reason' />

//         <ErrorDisplay errors={state.errors?.ft_reason} />
//       </>
//       </div>
//         <div>
//           <Label htmlFor="amount">Amount</Label>
//           <Input id="amount" name="ft_amount" placeholder="Amount" />

//           <ErrorDisplay errors={state.errors?.ft_amount} />
//         </div>
//         <div>
//           <Label htmlFor="to">Transfer To</Label>
//           <Input id="to" name="ft_to" placeholder="Transfer to" />

//           <ErrorDisplay errors={state.errors?.ft_to} />
//         </div>
//         <div>
//           <Label htmlFor="from">Transfer From</Label>
//           <Input id="from" name="ft_from" placeholder="Transfer From" />

//           <ErrorDisplay errors={state.errors?.ft_from} />
//         </div>
//         <div>
//           <Label htmlFor="on">Transfer On</Label>
//           <Input id="on" name="ft_on" placeholder="Transfer On" />

//           <ErrorDisplay errors={state.errors?.ft_on} />
//         </div>

//         <div>
//           <div className="flex flex-col gap-3">
//             <StaffSelector
//               label="Certified By"
//               name="certified_staff_id"
//               placeholder="Certified By"
//             />
//             <ErrorDisplay errors={state.errors?.certified_staff_id} />
//           </div>

//           <div className="flex flex-col gap-3">
//             <StaffMultiSelector
//               label="Noted By"
//               name="noted_staff_list_ids"
//               placeholder="Noted By"
//               value=""
//             />
//             <ErrorDisplay errors={state.errors?.noted_staff_list_ids} />
//           </div>

//           <div className="flex flex-col gap-3">
//             <Label htmlFor="name">Receipt Link</Label>
//             <Input id="name" name="receipt_link" placeholder="Receipt Link" />

//             <ErrorDisplay errors={state.errors?.receipt_link} />
//           </div>
//         </div>
//       </div>
