// INSTRUCTIONS:
// staffList -> small case
// StaffList -> big case
// replace vals with column names
// remove comments after

import { StaffListSchema } from '@/lib/definitions';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import * as query from '@/lib/supabase';
import * as staffInstanceQuery from '@/actions/staff_instances'

export type staffListState = {
  errors?: {
    staff_list_id?: string[];
  };
  message?: string | null;
};

var staffListFormat = {
  staff_list_id: null,

  /*
    CREATE TABLE IF NOT EXISTS staff_lists
    (
        staff_list_id VARCHAR(25),
        PRIMARY KEY (staff_list_id)
    );
  */
};

var schema = 'staff_lists'; // replace with table name

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

export async function createStaffListValidation(
  prevState: staffListState,
  formData: FormData,
) {
  var transformedData = transformData(formData);
  const validatedFields = StaffListSchema.safeParse(transformedData);

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to create var.',
    };
  }

  // TODO: provide logic
  var data = convertData(validatedFields);
  const { error } = await createStaffList(data);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    message: null,
  };
}

export async function editStaffListValidation(
  id: string,
  identifier: string,
  prevState: staffListState,
  formData: FormData,
) {
  var transformedData = transformData(formData);
  const validatedFields = StaffListSchema.safeParse(transformedData);

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to edit var.',
    };
  }

  // TODO: provide logic
  var data = convertData(validatedFields.data);
  const { error } = await editStaffList(data, id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    message: null,
  };
}

export async function selectWhereStaffListValidation(id: string, identifier: string) {
  // TODO: provide logic
  const { data, error } = await selectWhereStaffList(id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    data: data,
  };
}

export async function selectAllStaffListValidation() {
  // TODO: provide logic
  const { data, error } = await selectAllStaffList();
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    data: data,
  };
}

export async function deleteStaffListValidation(id: string, identifier: string) {
  // TODO: provide logic

  await staffInstanceQuery.deleteStaffInstanceValidation(id, identifier)
  const { error } = await deleteStaffList(id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    message: null,
  };
}

export async function createStaffList(data: any) {
  return await query.insert(schema, data);
}

export async function editStaffList(data: any, id: string, identifier: string) {
  return await query.edit(schema, data, identifier, id);
}

export async function deleteStaffList(id: string, identifier: string) {
  return await query.remove(schema, identifier, id);
}

export async function selectWhereStaffList(id: string, identifier: string) {
  return await query.selectWhere(schema, identifier, id);
}

export async function selectAllStaffList() {
  return await query.selectAll(schema);
}
