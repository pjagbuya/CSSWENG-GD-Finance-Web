export type AddCategoryFormState = {
  errors?: {
    name?: string[];
  };
  hasDuplicateCategory?: boolean;
};

// TODO @Enzo
export async function addCategory(
  prevState: AddCategoryFormState,
  formData: FormData,
) {
  return {} as AddCategoryFormState;
}

// TODO @Enzo
export async function addExpense(prevState: any, formData: FormData) {
  return {};
}

// TODO @Enzo
export async function addRevenue(prevState: any, formData: FormData) {
  return {};
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
