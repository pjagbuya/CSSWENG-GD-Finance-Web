'use client';

import { useFormState } from 'react-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import ErrorDisplay from '../../../../_components/ErrorDisplay';
import StaffSelector from './CertifiedStaffSelector';
import { editRevenueStatementValidation } from '@/actions/revenue_statements';
import { editFundTransferValidation } from '@/actions/fund_transfers';
import { useEffect, useState } from 'react';
import StaffMultiSelector from './StaffMultiSelector';

type EditRevenueFormPageProps = {
  eventId: string;
  formInfo: any;
};

const EditFundTransferFormPage = ({
  eventId,
  formInfo,
}: EditRevenueFormPageProps) => {
  const [values, setValues] = useState({
    ft_name: formInfo.ft_name,
    ft_date: formInfo.ft_date,
    ft_reason: formInfo.ft_reason,
    ft_amount: formInfo.ft_amount,
    ft_to: formInfo.ft_to,
    ft_from: formInfo.ft_from,
    ft_on: formInfo.ft_on,
    receipt_link: formInfo.receipt_link,
    certified_staff_id: formInfo.certified_staff_id,
    noted_staff_list_id: formInfo.noted_staff_list_id,
  });

  const [state, action] = useFormState(
    editFundTransferValidation.bind(null, eventId, formInfo.ft_id, 'ft_id'),
    {
      errors: {},
    },
  );

  return (
    <main className="flex flex-col gap-4 px-6 py-4 text-left">
      <div className="mb-1">
        <h2 className="text-2xl font-bold">
          Edit Fields for Revenue Form: {formInfo?.ft_name}
        </h2>
        <p>Report Code: {formInfo?.ft_id}</p>
      </div>

      <form action={action} className="flex flex-col gap-6">
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="ft_name"
                  placeholder="Name"
                  value={values.ft_name}
                  onChange={e =>
                    setValues({ ...values, ft_name: e.target.value })
                  }
                />

                <ErrorDisplay errors={state.errors?.ft_name} />
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="date">Date</Label>
                {/* <DatePicker name='fr_date' /> */}
                <Input
                  name="ft_date"
                  type="date"
                  id="date"
                  value={values.ft_date}
                  onChange={e =>
                    setValues({ ...values, ft_date: e.target.value })
                  }
                />

                <ErrorDisplay errors={state.errors?.ft_date} />
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="reason">Reason</Label>
                <Textarea
                  className="resize-none"
                  id="reason"
                  name="ft_reason"
                  placeholder="State your reason"
                  value={values.ft_reason}
                  onChange={e =>
                    setValues({ ...values, ft_reason: e.target.value })
                  }
                />

                <ErrorDisplay errors={state.errors?.ft_reason} />
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  name="ft_amount"
                  placeholder="Amount"
                  value={values.ft_amount}
                  onChange={e =>
                    setValues({ ...values, ft_amount: e.target.value })
                  }
                />

                <ErrorDisplay errors={state.errors?.ft_amount} />
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="to">Transfer To</Label>
                <Input
                  id="to"
                  name="ft_to"
                  placeholder="Transfer to"
                  value={values.ft_to}
                  onChange={e =>
                    setValues({ ...values, ft_to: e.target.value })
                  }
                />

                <ErrorDisplay errors={state.errors?.ft_to} />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3">
                <Label htmlFor="from">Transfer From</Label>
                <Input
                  id="from"
                  name="ft_from"
                  placeholder="Transfer From"
                  value={values.ft_from}
                  onChange={e =>
                    setValues({ ...values, ft_from: e.target.value })
                  }
                />

                <ErrorDisplay errors={state.errors?.ft_from} />
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="on">Transfer On</Label>
                <Input
                  type="date"
                  id="on"
                  name="ft_on"
                  placeholder="Transfer On"
                  value={values.ft_on}
                  onChange={e =>
                    setValues({ ...values, ft_on: e.target.value })
                  }
                />

                <ErrorDisplay errors={state.errors?.ft_on} />
              </div>

              <div className="flex flex-col gap-3">
                <StaffSelector
                  label="Certified By"
                  name="certified_staff_id"
                  placeholder="Certified By"
                  value={values.certified_staff_id}
                  onChange={v =>
                    setValues({ ...values, certified_staff_id: v })
                  }
                />
                <ErrorDisplay errors={state.errors?.certified_staff_id} />
              </div>

              <div className="flex flex-col gap-3">
                <StaffMultiSelector
                  label="Noted By"
                  name="noted_staff_list_ids"
                  placeholder="Noted By"
                  value={values.noted_staff_list_id}
                />
                <ErrorDisplay errors={state.errors?.noted_staff_list_id} />
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="name">Receipt Link</Label>
                <Input
                  id="name"
                  name="receipt_link"
                  placeholder="Receipt Link"
                  value={values.receipt_link}
                  onChange={e =>
                    setValues({ ...values, receipt_link: e.target.value })
                  }
                />

                <ErrorDisplay errors={state.errors?.receipt_link} />
              </div>
            </div>
          </div>
        </>

        <Button className="self-start" type="submit">
          Finish Edit
        </Button>
      </form>
    </main>
  );
};

export default EditFundTransferFormPage;
