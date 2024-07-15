import {
  AddCategoryFormSchema,
  AddExpenseFormSchema,
  AddRevenueFormSchema,
} from '@/lib/definitions';
import { createClient } from '@/utils/supabase/client';

export type AddCategoryFormState = {
  errors?: {
    name?: string[];
  };
  hasDuplicateCategory?: boolean;
};

export type AddExpenseFormState = {
  errors?: {
    date?: string[];
    item_name?: string[];
    unit_count?: string[];
    unit_price?: string[];
    acc_to?: string[];
  };
};

export type AddRevenueFormState = {
  errors?: {
    date?: string[];
    acc_from?: string[];
    acc_to?: string[];
    amount?: string[];
  };
};

// TODO @Enzo
export async function addCategory(
  prevState: AddCategoryFormState,
  formData: FormData,
) {
  const supabase = createClient();
  const validatedFields = AddCategoryFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    console.log(validatedFields.error);

    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  return {} as AddCategoryFormState;
}

// TODO @Enzo
export async function addExpense(
  prevState: AddExpenseFormState,
  formData: FormData,
) {
  const supabase = createClient();
  const validatedFields = AddExpenseFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    console.log(validatedFields.error);

    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  return {} as AddExpenseFormState;
}

// TODO @Enzo
export async function addRevenue(
  prevState: AddRevenueFormState,
  formData: FormData,
) {
  const supabase = createClient();
  const validatedFields = AddRevenueFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    console.log(validatedFields.error);

    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  return {} as AddRevenueFormState;
}

// TODO @Enzo
export async function deleteCategory(eventId: string, category: string) {}

// TODO @Enzo
export async function deleteExpense(expenseId: string) {}

// TODO @Enzo
export async function deleteRevenue(expenseId: string) {}

// TODO @Enzo
export async function getExpenses(expenseId: string) {
  return [];
}

// TODO @Enzo
export async function getRevenue(expenseId: string) {
  return [];
}

// TODO @Enzo
export async function getTransactionCategories(eventId: string) {
  return [];
}
