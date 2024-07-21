// INSTRUCTIONS:
// category -> small case
// Category -> big case
// replace vals with column names
// remove comments after

import { CategorySchema } from '@/lib/definitions';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import * as query from '@/lib/supabase';

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

var schema = 'Categories'; // replace with table export name

async function transformData(data: any) {
  return {
    category_id: data.get('category_id'),
    category_name: data.get('category_name'),
    category_type: data.get('category_type'),
    event_id: data.get('event_id'),
    transaction_list_id: data.get('transaction_list_id'),
  };
}

export async function convertData(data: any) {
  return data;
}

export async function createCategoryValidation(
  eventId: string,
  type: 'revenue' | 'expense',
  prevState: CategoryState,
  formData: FormData,
) {
  var transformedData = transformData(formData);
  const validatedFields = CategorySchema.safeParse(transformedData);

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to create var.',
    };
  }

  // TODO: provide logic
  var data = convertData(validatedFields);
  const { error } = await createCategory(data);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
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
  const transformedData = await transformData(formData);
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
  // TODO: provide logic
  const { error } = await deleteCategory(id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
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
