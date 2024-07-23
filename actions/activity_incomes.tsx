// INSTRUCTIONS:
// activityIncome -> small case
// ActivityIncome -> big case
// replace vals with column names
// remove comments after

import { ActivityIncomeSchema } from '@/lib/definitions';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import * as query from '@/lib/supabase';
import * as eventQuery from './events';
import * as staffListQuery from './staff_lists';

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

var schema = 'activity_incomes'; // replace with table name

async function transformCreateData(id: string) {
  // TODO: provide logic
  var aiData = await selectAllActivityIncomeValidation()
  var id_mod = 10000
  if(aiData.data){
    if(aiData.data.length > 0){
      for(let i = 0; i < aiData.data.length; i++){
        var num = parseInt(aiData.data[i].ai_id.slice(6));
        if(num > id_mod){
          id_mod = num
        }
      }
      id_mod += 1
    }
  }

  var staffListData = await staffListQuery.selectAllStaffListValidation()
  var id_mod_staff = 10000
  if(staffListData.data){
    if(staffListData.data.length > 0){
      for(let i = 0; i < staffListData.data.length; i++){
        var num = parseInt(staffListData.data[i].staff_list_id.slice(4));
        if(num > id_mod_staff){
          id_mod_staff = num
        }
      }
      id_mod_staff += 1
    }
  }

  var form_list_id
  var eventData = await eventQuery.selectWhereEventValidation(id, 'event_id')
  if(eventData.data){
    form_list_id = eventData.data[0].ai_form_list_id
    // TODO: fill information
    return {
      ai_id: `actin_${id_mod}`,
      ai_name: eventData.data[0].name,
      ai_notes: null,
      prepared_staff_id: null,
      certified_staff_id: null,
      noted_staff_list_id: `stl_${id_mod_staff}`,
      form_list_id: form_list_id,
    }
  }
  return null
}

async function transformEditData(data: any) {
  // TODO: provide logic

  // TODO: fill information
  var transformedData = {};
  return transformedData;
}


async function convertData(data : any) {
  // TODO: provide logic

  // JUST IN CASE: needs to do something with other data of validated fields
  return data;
}

export async function createActivityIncomeValidation(
  event_id: string
) {
  var transformedData = await transformCreateData(event_id);
  const validatedFields = ActivityIncomeSchema.safeParse(transformedData);

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to create var.',
    };
  }

  // TODO: provide logic
  var data = await convertData(transformedData);

  await staffListQuery.createStaffList({staff_list_id: data.noted_staff_list_id})

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
  var transformedData = transformEditData(formData);
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

  var data = await selectWhereActivityIncome(id, identifier)

  const { error } = await deleteActivityIncome(id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  if(data.data){
    await staffListQuery.deleteStaffListValidation(data.data[0].noted_staff_list_id, 'staff_list_id')
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