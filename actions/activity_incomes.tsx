// INSTRUCTIONS:
// activityIncome -> small case
// ActivityIncome -> big case
// replace vals with column names
// remove comments after

import { ActivityIncomeSchema } from '@/lib/definitions';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import * as query from '@/lib/supabase';

export type activityIncomeState = {
  errors?: {
    ai_id?: string[];
    ai_name?: string[];
    ai_date?: string[];
    ai_notes?: string[];
    prepared_staff_id?: string[];
    certified_staff_id?: string[];
    noted_staff_list_id?: string[];
    form_list_id?: string[];
  };
  message?: string | null;
};

var activityIncomeFormat = {
  ai_id: null,
  ai_name: null,
  ai_date: null,
  ai_notes: null,
  prepared_staff_id: null,
  certified_staff_id: null,
  noted_staff_list_id: null,
  form_list_id: null,

  /*
    CREATE TABLE IF NOT EXISTS activity_incomes
    (
        ai_id VARCHAR(25),
        ai_name VARCHAR(55),
        ai_date DATE,
        ai_notes VARCHAR(205),
        prepared_staff_id VARCHAR(25),
        certified_staff_id VARCHAR(25),
        noted_staff_list_id VARCHAR(25),
        form_list_id VARCHAR(25), 
        FOREIGN KEY (prepared_staff_id) REFERENCES staffs(staff_id),
        FOREIGN KEY (certified_staff_id) REFERENCES staffs(staff_id),
        FOREIGN KEY (noted_staff_id) REFERENCES staff_lists(staff_list_id),
        FOREIGN KEY (form_list_id) REFERENCES form_lists(form_list_id),
        PRIMARY KEY (ai_id)
    );
  */
};

var schema = 'ActivityIncomeSchema'; // replace with table name

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

export async function createActivityIncomeValidation(
  prevState: activityIncomeState,
  formData: FormData,
) {
  var transformedData = transformData(formData);
  const validatedFields = ActivityIncomeSchema.safeParse(transformedData);

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to create var.',
    };
  }

  // TODO: provide logic
  var data = convertData(validatedFields);
  const { error } = await createActivityIncome(data);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    message: null,
  };
}

export async function editActivityIncomeValidation(
  id: string,
  identifier: string,
  prevState: activityIncomeState,
  formData: FormData,
) {
  var transformedData = transformData(formData);
  const validatedFields = ActivityIncomeSchema.safeParse(transformedData);

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to edit var.',
    };
  }

  // TODO: provide logic
  var data = convertData(validatedFields.data);
  const { error } = await editActivityIncome(data, id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    message: null,
  };
}

export async function selectWhereActivityIncomeValidation(
  id: string,
  identifier: string,
) {
  // TODO: provide logic
  const { data, error } = await selectWhereActivityIncome(id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    data: data,
  };
}

export async function selectAllActivityIncomeValidation() {
  // TODO: provide logic
  const { data, error } = await selectAllActivityIncome();
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    data: data,
  };
}

export async function deleteActivityIncomeValidation(id: string, identifier: string) {
  // TODO: provide logic
  const { error } = await deleteActivityIncome(id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    message: null,
  };
}

export async function createActivityIncome(data: any) {
  return await query.insert(schema, data);
}

export async function editActivityIncome(data: any, id: string, identifier: string) {
  return await query.edit(schema, data, identifier, id);
}

export async function deleteActivityIncome(id: string, identifier: string) {
  return await query.remove(schema, identifier, id);
}

export async function selectWhereActivityIncome(id: string, identifier: string) {
  return await query.selectWhere(schema, identifier, id);
}

export async function selectAllActivityIncome() {
  return await query.selectAll(schema);
}