'use server';

import {
  CreateExpenseFormSchema,
  CreateRevenueFormSchema,
} from '@/lib/definitions';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';

export type CreateExpenseFormState = {
  formId?: string;
  errors?: {
    es_name?: string[];
    es_category?: string[];
  };
  message?: string | null;
};

export type CreateRevenueFormState = {
  formId?: string;
  errors?: {
    rs_name?: string[];
    rs_category?: string[];
  };
  message?: string | null;
};

export async function createExpenseForm(
  prevState: CreateExpenseFormState,
  formData: FormData,
) {
  const supabase = createClient();
  const validatedFields = CreateExpenseFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    console.log(validatedFields.error);

    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to create revenue form.',
    };
  }

  const { data, error } = await supabase
    .from('expense_statements')
    .insert([
      {
        es_name: formData.get('es_name'),
        es_category: formData.get('es_category'),
      },
    ])
    .select('*');

  if (error) {
    throw new Error(error.message);
  }

  // TODO: Associate created form with the event it's under

  return { formId: data[0].id, message: null };
}

export async function createRevenueForm(
  prevState: CreateExpenseFormState,
  formData: FormData,
) {
  const supabase = createClient();
  const validatedFields = CreateRevenueFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    console.log(validatedFields.error);

    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to create expense form.',
    };
  }

  const { data, error } = await supabase
    .from('revenue_statements')
    .insert([
      {
        rs_name: formData.get('rs_name'),
        rs_category: formData.get('rs_category'),
      },
    ])
    .select('*');

  if (error) {
    throw new Error(error.message);
  }

  // TODO: Associate created form with the event it's under

  return { formId: data[0].id, message: null };
}

// TODO: Filter forms for a specific event. This cannot be done without the
// FK relationships being finalized in the DB.
export async function deleteForm(
  eventId: string,
  variant: 'expense' | 'revenue' | 'fund_transfer',
  formId: string,
  pathname: string,
) {
  const supabase = createClient();

  const table_name = (() => {
    switch (variant) {
      case 'expense':
        return 'expense_statements';

      case 'revenue':
        return 'revenue_statements';

      case 'fund_transfer':
        return 'fund_transfers';

      default:
        throw new Error('Invalid form variant provided.');
    }
  })();

  const { error } = await supabase.from(table_name).delete().eq('id', formId);

  if (error) {
    throw new Error(error.message);
  }

  // TODO: Revalidation just does not work here for some reason
  return getFormList(eventId, variant);
}

// TODO: Filter forms for a specific event. This cannot be done without the
// FK relationships being finalized in the DB.
export async function getFormList(
  eventId: string,
  variant: 'expense' | 'revenue' | 'fund_transfer',
) {
  noStore();

  const table_name = (() => {
    switch (variant) {
      case 'expense':
        return 'expense_statements';

      case 'revenue':
        return 'revenue_statements';

      case 'fund_transfer':
        return 'fund_transfers';

      default:
        throw new Error('Invalid form variant provided.');
    }
  })();

  const supabase = createClient();
  const { data, error } = await supabase.from(table_name).select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getItemCategories() {
  // noStore();

  // const supabase = createClient();
  // const { data, error } = await supabase.from('gdsc_events').select('*');

  // if (error) {
  //   throw new Error(error.message);
  // }

  // return data;

  // TODO: Fetch enums from DB or provide another alternative
  // TODO: Validate enums in form input
  return ['TEST_CAT_1', 'TEST_CAT_2', 'TEST_CAT_3'];
}

export type State = {
  errors?: {
    name?: string;
  };
  message?: string | null;
};

export async function createFundTransfer(prevState: State, formData: FormData) {
  const validatedFields = EventSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to create event.',
    };
  }

  // TODO: provide logic

  revalidatePath('');
  redirect('/');
}

export async function editForm(prevState: State, formData: FormData) {
  const validatedFields = EventSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to edit event.',
    };
  }

  // TODO: provide logic

  revalidatePath('');
  redirect('/');
}

export async function deleteFundTransfer(id: string) {
  // TODO: provide logic

  revalidatePath('');
}
