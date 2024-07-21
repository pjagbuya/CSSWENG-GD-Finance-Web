// INSTRUCTIONS:
// formList -> small case
// FormList -> big case
// replace vals with column names
// remove comments after

import { FormListSchema } from '@/lib/definitions';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import * as query from '@/lib/supabase';

export type formListState = {
  errors?: {
    form_list_id?: string[];
  };
  message?: string | null;
};

var formListFormat = {
  form_list_id: null,

  /*
    CREATE TABLE IF NOT EXISTS form_lists
    (
        form_list_id VARCHAR(25),
        PRIMARY KEY (form_list_id)
    );
  */
};

var schema = 'FormListSchema'; // replace with table name

async function transformData(data: any) {
  var arrayData = Array.from(data.entries());
  // TODO: provide logic

  // TODO: fill information
  var transformedData = {};
  return transformedData;
}

async function convertData(data: any) {
  // TODO: provide logic

  // JUST IN CASE: needs to do something with other data of validated fields
  return data.data;
}

export async function createFormListValidation(
  prevState: formListState,
  formData: FormData,
) {
  var transformedData = transformData(formData);
  const validatedFields = FormListSchema.safeParse(transformedData);

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to create var.',
    };
  }

  // TODO: provide logic
  var data = convertData(validatedFields);
  const { error } = await createFormList(data);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    message: null,
  };
}

export async function editFormListValidation(
  id: string,
  identifier: string,
  prevState: formListState,
  formData: FormData,
) {
  var transformedData = transformData(formData);
  const validatedFields = FormListSchema.safeParse(transformedData);

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to edit var.',
    };
  }

  // TODO: provide logic
  var data = convertData(validatedFields.data);
  const { error } = await editFormList(data, id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    message: null,
  };
}

export async function selectWhereFormListValidation(id: string, identifier: string) {
  // TODO: provide logic
  const { data, error } = await selectWhereFormList(id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    data: data,
  };
}

export async function selectAllFormListValidation() {
  // TODO: provide logic
  const { data, error } = await selectAllFormList();
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    data: data,
  };
}

export async function deleteFormListValidation(id: string, identifier: string) {
  // TODO: provide logic
  const { error } = await deleteFormList(id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    message: null,
  };
}

export async function createFormList(data: any) {
  return await query.insert(schema, data);
}

export async function editFormList(data: any, id: string, identifier: string) {
  return await query.edit(schema, data, identifier, id);
}

export async function deleteFormList(id: string, identifier: string) {
  return await query.remove(schema, identifier, id);
}

export async function selectWhereFormList(id: string, identifier: string) {
  return await query.selectWhere(schema, identifier, id);
}

export async function selectAllFormList() {
  return await query.selectAll(schema);
}