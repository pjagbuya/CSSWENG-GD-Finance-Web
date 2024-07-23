// INSTRUCTIONS:
// staffInstance -> small case
// StaffInstance -> big case
// replace vals with column names
// remove comments after

import { StaffInstanceSchema } from '@/lib/definitions';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import * as query from '@/lib/supabase';
import * as staffListQuery from '@/actions/staff_lists';
import * as staffQuery from '@/actions/staffs';

export type staffInstanceState = {
  errors?: {
    staff_instance_id?: string[];
  };
  message?: string | null;
};

var staffInstanceFormat = {
  staff_instance_id: null,

  /*
    CREATE TABLE IF NOT EXISTS staff_instances
    (
        staff_instance_id VARCHAR(25),
        PRIMARY KEY (staff_instance_id)
    );
  */
};

var schema = 'staff_instances'; // replace with table name

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

export async function createStaffInstanceValidation(
  prevState: staffInstanceState,
  formData: FormData,
) {
  var transformedData = transformData(formData);
  const validatedFields = StaffInstanceSchema.safeParse(transformedData);

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to create var.',
    };
  }

  // TODO: provide logic
  var data = convertData(validatedFields);
  const { error } = await createStaffInstance(data);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    message: null,
  };
}

export async function editStaffInstanceValidation(
  id: string,
  identifier: string,
  prevState: staffInstanceState,
  formData: FormData,
) {
  var transformedData = transformData(formData);
  const validatedFields = StaffInstanceSchema.safeParse(transformedData);

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to edit var.',
    };
  }

  // TODO: provide logic
  var data = convertData(validatedFields.data);
  const { error } = await editStaffInstance(data, id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    message: null,
  };
}

export async function selectWhereStaffInstanceValidation(id: string, identifier: string) {
  // TODO: provide logic
  const { data, error } = await selectWhereStaffInstance(id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    data: data,
  };
}

export async function selectAllStaffInstanceValidation() {
  // TODO: provide logic
  const { data, error } = await selectAllStaffInstance();
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    data: data,
  };
}

export async function deleteStaffInstanceValidation(id: string, identifier: string) {
  // TODO: provide logic
  const { error } = await deleteStaffInstance(id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    message: null,
  };
}

export async function createStaffInstance(data: any) {
  return await query.insert(schema, data);
}

export async function editStaffInstance(data: any, id: string, identifier: string) {
  return await query.edit(schema, data, identifier, id);
}

export async function deleteStaffInstance(id: string, identifier: string) {
  return await query.remove(schema, identifier, id);
}

export async function selectWhereStaffInstance(id: string, identifier: string) {
  return await query.selectWhere(schema, identifier, id);
}

export async function selectAllStaffInstance() {
  return await query.selectAll(schema);
}
