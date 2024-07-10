'use client';

import { useFormState } from 'react-dom';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

type EditExpenseFormPageProps = {
  formInfo: any;
};

// TODO: Move this out of here
type EditExpenseFormState = {
  errors?: {
    receipts_link?: string[];
    transferred_to?: string[];
    transferred_on?: string[];
    notes?: string[];
    prepared_by?: string[];
  };
  message?: string | null;
};

const EditExpenseFormSchema = z.object({
  receipts_link: z
    .string({ required_error: 'Receipts Link is required.' })
    .url({ message: 'Please enter a valid URL.' }),
  transferred_to: z
    .string({ required_error: 'Transferred To is required.' })
    .min(1),
  transferred_on: z
    .string({
      required_error: 'Transferred On is required and must be a valid date.',
    })
    .date(),
  notes: z.string(),
  prepared_by: z.string({ required_error: 'Prepared By is required.' }).min(1),
});

const EditExpenseFormPage = ({ formInfo }: EditExpenseFormPageProps) => {
  const initialState: EditExpenseFormState = {
    errors: {},
    message: null,
  };
  const [state, action] = useFormState(submitEdits, initialState);

  async function submitEdits(
    prevState: EditExpenseFormState,
    formData: FormData,
  ) {
    const supabase = createClient();
    const validatedFields = EditExpenseFormSchema.safeParse(
      Object.fromEntries(formData.entries()),
    );

    if (!validatedFields.success) {
      console.log(validatedFields.error);

      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing fields. Unable to edit expense form.',
      };
    }

    const { data, error } = await supabase
      .from('expense_statements')
      .insert([
        {
          // es_name: formData.get('rs_name'),
          // es_category: formData.get('rs_category'),
        },
      ])
      .eq('id', formInfo.id);

    if (error) {
      throw new Error(error.message);
    }

    redirect('/');
  }

  return (
    <main className="flex flex-col gap-4 px-6 py-4 text-left">
      <div className="mb-1">
        <h2 className="text-2xl font-bold">Edit Form Fields for: X</h2>
        <p>Report Code: YYYY</p>
      </div>

      <form action={action}>
        <div>
          <Label htmlFor="receipts_link">Receipts Link</Label>
          <Input id="receipts_link" name="receipts_link" />

          <Label htmlFor="transferred_to">Transferred To</Label>
          <Input id="transferred_to" name="transferred_to" />

          <Label htmlFor="transferred_on">Transferred On</Label>
          <Input type="date" id="transferred_on" name="transferred_on" />

          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" name="notes" />

          <Label htmlFor="prepared_by">Prepared By</Label>
          <Select name="prepared_by">
            <SelectTrigger>
              <SelectValue placeholder="GDSC Officer" />
            </SelectTrigger>

            <SelectContent>
              {/* TODO: Dynamically fetch values */}
              <SelectItem value="Officer 1">Officer 1</SelectItem>
              <SelectItem value="Officer 2">Officer 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Button asChild>
            <Link href="/">Preview Form</Link>
          </Button>

          <Button type="submit">Finish Edit</Button>
        </div>
      </form>
    </main>
  );
};

export default EditExpenseFormPage;
