'use server'

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
import * as staffQuery from './staffs';
import * as staffListQuery from './staff_lists';
import * as staffInstanceQuery from './staff_instances';
import { createClient } from '@/utils/supabase/server';

export type activityIncomeState = {
  errors?: {
    // ai_id?: string[];
    // ai_name?: string[];
    // ai_date?: string[];
    ai_notes?: string[];
    // prepared_staff_id?: string[];
    certified_staff_id?: string[];
    noted_staff_list_id?: string[];
    // form_list_id?: string[];
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

  const supabase = createClient()
  const currentUser = (await supabase.auth.getUser()).data.user;
  // TODO: provide logic
  var aiData = await selectAllActivityIncomeValidation()
  var id_mod = 10000
  if (aiData.data) {
    if (aiData.data.length > 0) {
      for (let i = 0; i < aiData.data.length; i++) {
        var num = parseInt(aiData.data[i].ai_id.slice(6));
        if (num > id_mod) {
          id_mod = num
        }
      }
      id_mod += 1
    }
  }

  var staffListData = await staffListQuery.selectAllStaffListValidation()
  var id_mod_staff = 10000
  if (staffListData.data) {
    if (staffListData.data.length > 0) {
      for (let i = 0; i < staffListData.data.length; i++) {
        var num = parseInt(staffListData.data[i].staff_list_id.slice(4));
        if (num > id_mod_staff) {
          id_mod_staff = num
        }
      }
      id_mod_staff += 1
    }
  }

  var preparedStaff = await staffQuery.selectWhereStaffValidation(currentUser?.id!, 'user_id')

  var form_list_id
  var eventData = await eventQuery.selectWhereEventValidation(id, 'event_id')
  if (eventData.data) {
    form_list_id = eventData.data[0].ai_form_list_id
    // TODO: fill information
    if(preparedStaff.data){
      return {
        ai_id: `actin_${id_mod}`,
        ai_name: eventData.data[0].event_name,
        ai_date: eventData.data[0].event_date,
        ai_notes: null,
        prepared_staff_id: preparedStaff.data[0].staff_id,
        certified_staff_id: null,
        noted_staff_list_id: `stl_${id_mod_staff}`,
        form_list_id: form_list_id,
      }
    }
  }
  return null
}

async function transformEditData(data: any, id: string) {
  
  // TODO: provide logic
  var aiData = await selectWhereActivityIncomeValidation(id, 'ai_id')

  // TODO: fill information
  if(aiData.data){
    return{
      ai_id: id,
      ai_name: aiData.data[0].es_name,
      ai_notes: data.get('ai_notes'),
      prepared_staff_id: data.get('prepared_staff_id'),
      certified_staff_id: data.get('certified_staff_id'),
      noted_staff_list_id: aiData.data[0].noted_staff_list_id,
      form_list_id: aiData.data[0].form_list_id,
    }
  }
  return null
}

async function convertData(data: any) {
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

  await staffListQuery.createStaffList({ staff_list_id: data.noted_staff_list_id })

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
  eventId: string,
  id: string,
  identifier: string,
  prevState: activityIncomeState,
  formData: FormData,
) {
  console.log(formData.entries())
  var arrData = Array.from(formData.entries())

  const notedList = []
  for(let i = 0; i < arrData.length; i++){
    if(arrData[i][0].substring(0,20) === "noted_staff_list_id-"){
      notedList.push(arrData[i][0].substring(20))
    }
  }

  var transformedData = await transformEditData(formData, id);
  const validatedFields = ActivityIncomeSchema.safeParse(transformedData);

  
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to edit var.',
    };
  }

  // TODO: provide logic
  var data = await convertData(transformedData);

  await staffInstanceQuery.deleteStaffInstanceValidation(data.noted_staff_list_id, 'staff_list_id')
  
  for(let i = 0; i < notedList.length; i++){
    await staffInstanceQuery.createStaffInstanceValidation(data.noted_staff_list_id, notedList[i])
  }
  
  const { error } = await editActivityIncome(data, id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  redirect(`/events/${eventId}/forms`);

  //revalidatePath("/")
  // return {
  //   message: null,
  // };
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

  if (data.data) {
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
