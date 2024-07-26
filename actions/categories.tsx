'use server';

// INSTRUCTIONS:
// category -> small case
// Category -> big case
// replace vals with column names
// remove comments after

import { CategorySchema } from '@/lib/definitions';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import * as query from '@/lib/supabase';
import * as transactionListQuery from './transaction_lists';
import * as expenseStatementQuery from './expense_statements';
import * as revenueStatementQuery from './revenue_statements';
import { StringOrTemplateHeader } from '@tanstack/react-table';
import { createClient } from '@/utils/supabase/server';

export type CategoryState = {
  errors?: {
    category_name?: string[];
  };
  hasDuplicateCategory?: boolean;
};

var categoryFormat = {
  vals: null,
  category_id: null,
  category_name: null,
  category_type: null,
  event_id: null,
  transaction_list_id: null,

  /*
    CREATE TABLE IF NOT EXISTS categories
    (
        category_id VARCHAR(25),
        category_name VARCHAR(55),
        category_type ENUM("Expense","Revenue")
        event_id VARCHAR(25),
        transaction_list_id VARCHAR(25),
        PRIMARY KEY (category_id),
        FOREIGN KEY (event_id) REFERENCES gdsc_events(event_id),
        FOREIGN KEY (transaction_list_id) REFERENCES transaction_lists(transaction_list_id)
    );
  */
};

var schema = 'categories'; // replace with table export name

async function transformCreateData(
  data: any,
  event_id: string,
  type: 'revenue' | 'expense',
) {
  var categoryData = await selectAllCategoryValidation();
  var id_mod = 10000;
  if (categoryData.data) {
    if (categoryData.data.length > 0) {
      for (let i = 0; i < categoryData.data!.length; i++) {
        var num = parseInt(categoryData.data[i].category_id.slice(6));
        if (num > id_mod) {
          id_mod = num;
        }
      }
      id_mod += 1;
    }
  }

  return {
    category_id: `categ_${id_mod}`,
    category_name: data.get('category_name'),
    category_type: type,
    event_id: event_id,
    transaction_list_id: `trl_${id_mod}`,
  };
}

async function transformEditData(data: any, id: string, identifier: string) {
  const categoryData = await selectWhereCategoryValidation(id, identifier);

  if (categoryData.data) {
    return {
      category_id: id,
      category_name: data.get('category_name'),
      category_type: categoryData.data[0].category_type,
      event_id: categoryData.data[0].event_id,
      transaction_list_id: categoryData.data[0].transaction_list_id,
    };
  }
  return null;
}

async function convertData(data: any) {
  return data;
}

export async function createCategoryValidation(
  eventId: string,
  type: 'revenue' | 'expense',
  prevState: CategoryState,
  formData: FormData,
) {
  const supabase = createClient();
  const currentUser = (await supabase.auth.getUser()).data.user;

  console.log(12345, currentUser);

  var transformedData = await transformCreateData(formData, eventId, type);
  const validatedFields = CategorySchema.safeParse(transformedData);

  console.log(validatedFields);
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to create var.',
    };
  }

  // TODO: provide logic
  var data = await convertData(transformedData);

  const transaction_list = {
    transaction_list_id: data.transaction_list_id,
  };
  await transactionListQuery.createTransactionList(transaction_list);

  const { error } = await createCategory(data);
  if (error) {
    throw new Error(error.message);
  }

  switch (type) {
    case 'revenue':
      {
        await revenueStatementQuery.createRevenueStatementValidation(
          data.category_id,
          data.category_name,
          currentUser?.id!,
        );
      }
      break;
    case 'expense':
      {
        await expenseStatementQuery.createExpenseStatementValidation(
          data.category_id,
          data.category_name,
          currentUser?.id!,
        );
      }
      break;
  }

  revalidatePath(`/groups`);
  return {
    hasDuplicateCategory: false,
  } as CategoryState;
}

export async function editCategoryValidation(
  id: string,
  identifier: string,
  prevState: CategoryState,
  formData: FormData,
) {
  const transformedData = await transformEditData(formData, id, identifier);
  const validatedFields = CategorySchema.safeParse(transformedData);

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to edit var.',
    };
  }

  const data = await convertData(transformedData);
  const { error } = await editCategory(data, id, identifier);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/groups');
  return {} as CategoryState;
}

export async function selectWhereCategoryValidation(
  id: string,
  identifier: string,
) {
  // TODO: provide logic
  const { data, error } = await selectWhereCategory(id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    data: data,
  };
}

export async function selectAllCategoryValidation() {
  // TODO: provide logic
  const { data, error } = await selectAllCategory();
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    data: data,
  };
}

export async function deleteCategoryValidation(id: string, identifier: string) {
  const data = await selectWhereCategoryValidation(id, identifier);

  if (data.data) {
    switch (data.data[0].category_type) {
      case 'expense':
        await expenseStatementQuery.deleteExpenseStatementValidation(
          id,
          identifier,
        );
        break;
      case 'revenue':
        await revenueStatementQuery.deleteRevenueStatementValidation(
          id,
          identifier,
        );
        break;
    }
  }

  const { error } = await deleteCategory(id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  // TODO: provide logic
  if (data.data) {
    await transactionListQuery.deleteTransactionListValidation(
      data.data[0].transaction_list_id,
      'transaction_list_id',
    );
  }

  revalidatePath(`/groups`);

  return {
    message: null,
  };
}

export async function createCategory(data: any) {
  return await query.insert(schema, data);
}

export async function editCategory(data: any, id: string, identifier: string) {
  return await query.edit(schema, data, identifier, id);
}

export async function deleteCategory(id: string, identifier: string) {
  return await query.remove(schema, identifier, id);
}

export async function selectWhereCategory(id: string, identifier: string) {
  return await query.selectWhere(schema, identifier, id);
}

export async function selectAllCategory() {
  return await query.selectAll(schema);
}
