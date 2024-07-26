'use client';

import { useFormState } from 'react-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import ErrorDisplay from '../../../../_components/ErrorDisplay';
import StaffSelector from './CertifiedStaffSelector';
import { editExpenseStatementValidation } from '@/actions/expense_statements';
import { useState } from 'react';
import StaffMultiSelector from './StaffMultiSelector';
import { editActivityIncomeValidation } from '@/actions/activity_incomes';

type EditAISFormPageProps = {
  eventId: string;
  formInfo: any;
};

const EditAISFormPage = ({ eventId, formInfo }: EditAISFormPageProps) => {
  const [values, setValues] = useState({
    ai_notes: formInfo.ai_notes,
    certified_staff_id: formInfo.certified_staff_id,
    noted_staff_list_ids: formInfo.noted_staff_list_id,
  });

  const [state, action] = useFormState(
    editActivityIncomeValidation.bind(null, eventId, formInfo.ai_id, 'ai_id'),
    {
      errors: {},
    },
  );

  return (
    <main className="flex flex-col gap-4 px-6 py-4 text-left">
      <div className="mb-1">
        <h2 className="text-2xl font-bold">
          Edit Fields for AIS Form: {formInfo?.ai_name}
        </h2>
        <p>Report Code: {formInfo?.ai_id}</p>
      </div>

      <form action={action} className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Label htmlFor="ai_notes">Notes</Label>
          <Textarea
            id="ai_notes"
            name="ai_notes"
            placeholder="Notes"
            className="resize-none"
            value={values.ai_notes}
            onChange={e => setValues({ ...values, ai_notes: e.target.value })}
          />

          <ErrorDisplay errors={state.errors?.ai_notes} />
        </div>

        <div className="flex flex-col gap-3">
          <StaffSelector
            label="Certified By"
            name="certified_staff_id"
            placeholder="Certified By"
            value={values.certified_staff_id}
            onChange={v => setValues({ ...values, certified_staff_id: v })}
          />
          <ErrorDisplay errors={state.errors?.certified_staff_id} />
        </div>

        <div className="flex flex-col gap-3">
          <StaffMultiSelector
            label="Noted By"
            name="noted_staff_list_ids"
            placeholder="Noted By"
            value={values.noted_staff_list_ids}
          />
          <ErrorDisplay errors={state.errors?.noted_staff_list_id} />
        </div>

        <Button className="self-start" type="submit">
          Finish Edit
        </Button>
      </form>
    </main>
  );
};

export default EditAISFormPage;
