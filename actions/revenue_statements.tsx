// INSTRUCTIONS:
// revenueStatement -> small case
// RevenueStatement -> big case
// replace vals with column names
// remove comments after

import { RevenueStatementSchema, UpdateRevenueFormSchema } from '@/lib/definitions';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import * as query from '@/lib/supabase';
import * as categoryQuery from './categories';
import * as eventQuery from './events';
import * as staffListQuery from './staff_lists';

export type RevenueStatementState = {
  errors?: {
    receipt_link?: string[];
    rs_to?: string[];
    rs_from?: string[];
    rs_notes?: string[];
    certified_staff_id?: string[];
    noted_staff_id?: string[];
  };
};

var revenueStatementFormat = {
  rs_id: null,
  rs_name: null,
  rs_date: null,
  receipt_link: null,
  rs_to: null,
  rs_from: null,
  rs_notes: null,
  prepared_staff_id: null,
  certified_staff_id: null,
  noted_staff_list_id: null,
  form_list_id: null,
  category_id: null
  /*
  CREATE TABLE IF NOT EXISTS revenue_statements
  (
      rs_id VARCHAR(25),
      rs_name VARCHAR(55),
      rs_date DATE,
      receipt_link VARCHAR(55),    
      rs_to VARCHAR(105),    
      rs_from VARCHAR(105),
      rs_notes VARCHAR(105),
      category_id VARCHAR(25),
      prepared_staff_id VARCHAR(25),
      certified_staff_id VARCHAR(25),
      noted_staff_list_id VARCHAR(25),
      form_list_id VARCHAR(25),
      FOREIGN KEY (revenue_list_id) REFERENCES item_lists(item_list_id),
      FOREIGN KEY (td_id) REFERENCES transaction_details(td_id),
      FOREIGN KEY (prepared_staff_id) REFERENCES staffs(staff_id),
      FOREIGN KEY (certified_staff_id) REFERENCES staffs(staff_id),
      FOREIGN KEY (noted_staff_id) REFERENCES staff_lists(staff_list_id),
      FOREIGN KEY (form_list_id) REFERENCES form_lists(form_list_id),
      PRIMARY KEY (rs_id)
  );
  */
};

var schema = 'revenue_statements'; // replace with table name

async function transformCreateData(category_id : string, category_name : string) {
  // TODO: provide logic
  var rsData = await selectAllRevenueStatementValidation()
  var id_mod = 10000
  if(rsData.data){
    if(rsData.data.length > 0){
      for(let i = 0; i < rsData.data.length; i++){
        var num = parseInt(rsData.data[i].rs_id.slice(6));
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
  var categoryData = await categoryQuery.selectWhereCategoryValidation(category_id, 'category_id')
  if(categoryData.data){
    var eventData = await eventQuery.selectWhereEventValidation(categoryData.data[0].event_id, 'event_id')
    if(eventData.data){
      form_list_id = eventData.data[0].rs_form_list_id
    }
  }
  // TODO: fill information
  return{
    rs_id: `revst_${id_mod}`,
    rs_name: category_name,
    receipt_link: null,
    rs_to: null,
    rs_from: null,
    rs_notes: null,
    prepared_staff_id: null,
    certified_staff_id: null,
    noted_staff_list_id: `stl_${id_mod_staff}`,
    form_list_id: form_list_id,
    category_id: category_id,
  }
}

async function transformEditData(data: any, id: string) {
  
  // TODO: provide logic
  var rsData = await selectWhereRevenueStatementValidation(id, 'rs_id')

  // TODO: fill information
  if(rsData.data){
    return{
      rs_id: id,
      rs_name: rsData.data[0].rs_name,
      receipt_link: data.get('receipt_link'),
      rs_to: data.get('rs_to'),
      rs_from: data.get('rs_from'),
      rs_notes: data.get('rs_notes'),
      prepared_staff_id: data.get('prepared_staff_id'),
      certified_staff_id: data.get('certified_staff_id'),
      noted_staff_list_id: rsData.data[0].noted_staff_list_id,
      form_list_id: rsData.data[0].form_list_id,
      category_id: rsData.data[0].category_id,
    }
  }
  return null
}

async function convertData(data: any) {
  // TODO: provide logic

  // JUST IN CASE: needs to do something with other data of validated fields
  return data;
}

export async function createRevenueStatementValidation(
  category_id : any,
  category_name : string,
) {
  var transformedData = await transformCreateData(category_id, category_name);
  const validatedFields = RevenueStatementSchema.safeParse(transformedData);

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
 
  const { error } = await createRevenueStatement(data);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    message: null,
  };
}

export async function editRevenueStatementValidation(
  id: string,
  identifier: string,
  prevState: RevenueStatementState,
  formData: FormData,
) {
  var transformedData = await transformEditData(formData, id);
  const validatedFields = UpdateRevenueFormSchema.safeParse(transformedData);

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to edit var.',
    };
  }

  // TODO: provide logic
  var data = await convertData(transformedData);
  const { error } = await editRevenueStatement(data, id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {} as RevenueStatementState;
}

export async function selectWhereRevenueStatementValidation(
  id: string,
  identifier: string,
) {
  // TODO: provide logic
  const { data, error } = await selectWhereRevenueStatement(id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    data: data,
  };
}

export async function selectAllRevenueStatementValidation() {
  // TODO: provide logic
  const { data, error } = await selectAllRevenueStatement();
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    data: data,
  };
}

export async function deleteRevenueStatementValidation(
  id: string,
  identifier: string,
) {
  // TODO: provide logic
  var data = await selectWhereRevenueStatement(id, identifier)

  const { error } = await deleteRevenueStatement(id, identifier);
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

export async function createRevenueStatement(data: any) {
  return await query.insert(schema, data);
}

export async function editRevenueStatement(
  data: any,
  id: string,
  identifier: string,
) {
  return await query.edit(schema, data, identifier, id);
}

export async function deleteRevenueStatement(id: string, identifier: string) {
  return await query.remove(schema, identifier, id);
}

export async function selectWhereRevenueStatement(
  id: string,
  identifier: string,
) {
  return await query.selectWhere(schema, identifier, id);
}

export async function selectAllRevenueStatement() {
  return await query.selectAll(schema);
}
