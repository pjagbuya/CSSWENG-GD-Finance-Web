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

type EditExpenseFormPageProps = {
  eventId: string;
  formInfo: any;
};

const EditExpenseFormPage = ({ eventId, formInfo }: EditExpenseFormPageProps) => {
  const [values, setValues] = useState({
    receipt_link: formInfo.receipt_link,
    es_to: formInfo.es_to,
    es_on: formInfo.es_on,
    es_notes: formInfo.es_notes,
    certified_staff_id: formInfo.certified_staff_id,
    noted_staff_list_ids: formInfo.noted_staff_list_id,
  });

  const [state, action] = useFormState(
    editExpenseStatementValidation.bind(null, eventId, formInfo.es_id, 'es_id'),
    {
      errors: {},
    },
  );

  return (
    <main className="flex flex-col gap-4 px-6 py-4 text-left">
      <div className="mb-1">
        <h2 className="text-2xl font-bold">
          Edit Fields for Expense Form: {formInfo?.es_name}
        </h2>
        <p>Report Code: {formInfo?.es_id}</p>
      </div>

      <form action={action} className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Label htmlFor="receipt_link">Receipts Link</Label>
          <Input
            id="receipt_link"
            name="receipt_link"
            placeholder="Receipts Link"
            value={values.receipt_link}
            onChange={e =>
              setValues({ ...values, receipt_link: e.target.value })
            }
          />

          <ErrorDisplay errors={state.errors?.receipt_link} />
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="es_to">Account Transferred To</Label>
          <Input
            id="es_to"
            name="es_to"
            placeholder="Account Transferred To"
            value={values.es_to}
            onChange={e => setValues({ ...values, es_to: e.target.value })}
          />

          <ErrorDisplay errors={state?.errors?.es_to} />
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="es_on">Account Transfer On</Label>
          <Input
            type="date"
            id="es_on"
            name="es_on"
            placeholder="Account Transferred To"
            value={values.es_on}
            onChange={e => setValues({ ...values, es_on: e.target.value })}
          />

          <ErrorDisplay errors={state?.errors?.es_on} />
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="es_notes">Notes</Label>
          <Textarea
            id="es_notes"
            name="es_notes"
            placeholder="Notes"
            className="resize-none"
            value={values.es_notes}
            onChange={e => setValues({ ...values, es_notes: e.target.value })}
          />

          <ErrorDisplay errors={state.errors?.es_notes} />
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
          <ErrorDisplay errors={state.errors?.noted_staff_list_ids} />
        </div>

        <Button className="self-start" type="submit">
          Finish Edit
        </Button>
      </form>
    </main>
  );
};

export default EditExpenseFormPage;
