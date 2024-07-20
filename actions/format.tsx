// INSTRUCTIONS:
// vare_ -> small case
// Vare -> big case
// replace vals with column names
// remove comments after

import { VareSchema } from '@/lib/definitions';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { query } from '@/lib/supabase';

export type vare_State = {
  errors?: {
    vals?: string[];
  };
  message?: string | null;
};

var vare_Format = {
  vals: null,

  /*

  */
};

var schema = 'VareSchema'; // replace with table name

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

async function createVareValidation(prevState: vare_State, formData: FormData) {
  var transformedData = transformData(formData);
  const validatedFields = VareSchema.safeParse(transformedData);

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to create var.',
    };
  }

  // TODO: provide logic
  var data = convertData(validatedFields);
  const { error } = await createVare(data);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    message: null,
  };
}

async function editVareValidation(
  id: string,
  identifier: string,
  prevState: vare_State,
  formData: FormData,
) {
  var transformedData = transformData(formData);
  const validatedFields = VareSchema.safeParse(transformedData);

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to edit var.',
    };
  }

  // TODO: provide logic
  var data = convertData(validatedFields.data);
  const { error } = await editVare(data, id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    message: null,
  };
}

async function selectWhereVareValidation(id: string, identifier: string) {
  // TODO: provide logic
  const { data, error } = await selectWhereVare(id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    data: data,
  };
}

async function selectAllVareValidation() {
  // TODO: provide logic
  const { data, error } = await selectAllVare();
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    data: data,
  };
}

async function deleteVareValidation(id: string, identifier: string) {
  // TODO: provide logic
  const { error } = await deleteVare(id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    message: null,
  };
}

async function createVare(data: any) {
  return await query.insert(schema, data);
}

async function editVare(data: any, id: string, identifier: string) {
  return await query.edit(schema, data, identifier, id);
}

async function deleteVare(id: string, identifier: string) {
  return await query.remove(schema, identifier, id);
}

async function selectWhereVare(id: string, identifier: string) {
  return await query.selectWhere(schema, identifier, id);
}

async function selectAllVare() {
  return await query.selectAll(schema);
}

export const vare_Query = {
  createVareValidation,
  createVare,
  editVareValidation,
  editVare,
  deleteVareValidation,
  deleteVare,
  selectWhereVareValidation,
  selectWhereVare,
  selectAllVareValidation,
  selectAllVare,
};
