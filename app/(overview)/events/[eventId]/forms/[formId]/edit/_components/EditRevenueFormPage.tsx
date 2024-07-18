'use client';

import { useFormState } from 'react-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { EditRevenueFormState, updateRevenueForm } from '@/actions/forms';
import ErrorDisplay from '../../../../_components/ErrorDisplay';

type EditRevenueFormPageProps = {
  formInfo: any;
};

const EditRevenueFormPage = ({ formInfo }: EditRevenueFormPageProps) => {
  const initialState: EditRevenueFormState = {
    errors: {},
  };
  const [state, action] = useFormState(updateRevenueForm, initialState);

  return (
    <main className="flex flex-col gap-4 px-6 py-4 text-left">
      <div className="mb-1">
        {/* TODO: @Enzo please add the corresponding field from formInfo to this*/}
        <h2 className="text-2xl font-bold">
          Edit Fields for Revenue Form: XXXX
        </h2>
        <p>Report Code: YYYY</p>
      </div>

      <form action={action} className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Label htmlFor="receipts_link">Receipts Link</Label>
          <Input
            id="receipts_link"
            name="receipts_link"
            placeholder="Receipts Link"
          />

          <ErrorDisplay errors={state.errors?.receipts_link} />
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            placeholder="notes"
            className="resize-none"
          />

          <ErrorDisplay errors={state.errors?.notes} />
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="acc_from">Account Received From</Label>
          <Input
            id="acc_from"
            name="acc_from"
            placeholder="Account Received From"
          />

          <ErrorDisplay errors={state?.errors?.acc_from} />
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="acc_to">Account Transferred To</Label>
          <Input
            id="acc_to"
            name="acc_to"
            placeholder="Account Transferred To"
          />

          <ErrorDisplay errors={state?.errors?.acc_to} />
        </div>

        <Button className="self-start" type="submit">
          Finish Edit
        </Button>
      </form>
    </main>
  );
};

export default EditRevenueFormPage;
