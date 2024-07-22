'use client';

import { useFormState } from 'react-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import ErrorDisplay from '../../../../_components/ErrorDisplay';
import StaffSelector from './CertifiedStaffSelector';

type EditRevenueFormPageProps = {
  formInfo: any;
};

const EditRevenueFormPage = ({ formInfo }: EditRevenueFormPageProps) => {
  // const initialState: EditRevenueFormState = {
  //   errors: {},
  // };
  // const [state, action] = useFormState(updateRevenueForm, initialState);

  return (
    <main className="flex flex-col gap-4 px-6 py-4 text-left">
      <div className="mb-1">
        <h2 className="text-2xl font-bold">
          Edit Fields for Revenue Form: {formInfo?.rs_name}
        </h2>
        <p>Report Code: {formInfo?.rs_id}</p>
      </div>

      <form /*action={action}*/ className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
          <Label htmlFor="receipt_link">Receipts Link</Label>
          <Input
            id="receipt_link"
            name="receipt_link"
            placeholder="Receipts Link"
          />

          {/* <ErrorDisplay errors={state.errors?.receipt_link} /> */}
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="es_to">Account Transferred To</Label>
          <Input
            id="es_to"
            name="es_to"
            placeholder="Account Transferred To"
          />

          {/* <ErrorDisplay errors={state?.errors?.es_to} /> */}
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="es_from">Account Transfer Date</Label>
          <Input
            id="es_from"
            name="es_from"
            placeholder="Account Transferred To"
          />

          {/* <ErrorDisplay errors={state?.errors?.es_from} /> */}
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="es_notes">Notes</Label>
          <Textarea
            id="es_notes"
            name="es_notes"
            placeholder="Notes"
            className="resize-none"
          />

          {/* <ErrorDisplay errors={state.errors?.es_notes} /> */}
        </div>

        <div className="flex flex-col gap-3">
          <StaffSelector 
            label="Certified By"
            name="certified_staff_id" 
            placeholder="Certified By"
          />
          {/* <ErrorDisplay errors={state.errors?.certified_staff_id} /> */}
        </div>

        <div className="flex flex-col gap-3">
          <StaffSelector 
            label="Noted By"
            name="noted_staff_id" 
            placeholder="Noted By"
          />
          {/* <ErrorDisplay errors={state.errors?.noted_staff_id} /> */}
        </div>

        <Button className="self-start" type="submit">
          Finish Edit
        </Button>
      </form>
    </main>
  );
};

export default EditRevenueFormPage;
