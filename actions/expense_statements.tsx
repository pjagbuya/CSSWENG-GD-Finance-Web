// INSTRUCTIONS:
// expenseStatement -> small case
// ExpenseStatement -> big case
// replace vals with column names
// remove comments after

import { ExpenseStatementSchema, UpdateExpenseFormSchema } from '@/lib/definitions';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import * as query from '@/lib/supabase';
import * as categoryQuery from './categories';
import * as eventQuery from './events';
import * as staffListQuery from './staff_lists';

export type ExpenseStatementState = {
  errors?: {
    receipt_link?: string[];
    es_to?: string[];
    es_from?: string[];
    es_notes?: string[];
    certified_staff_id?: string[];
    noted_staff_list_id?: string[];
  };
};

var expenseStatementFormat = {
  es_id: null,
  es_name: null,
  es_date: null,
  receipt_link: null,
  es_to: null,
  es_from: null,
  es_notes: null,
  prepared_staff_id: null,
  certified_staff_id: null,
  noted_staff_list_id: null,
  form_list_id: null,
  /*
  CREATE TABLE IF NOT EXISTS expense_statements
  (
      es_id VARCHAR(25),
      es_name VARCHAR(55),
      es_date DATE,
      receipt_link VARCHAR(55),    
      es_to VARCHAR(105),    
      es_from VARCHAR(105),
      es_notes VARCHAR(105),
      category_id VARCHAR(25),
      prepared_staff_id VARCHAR(25),
      certified_staff_id VARCHAR(25),
      noted_staff_list_id VARCHAR(25),
      form_list_id VARCHAR(25),
      FOREIGN KEY (expense_list_id) REFERENCES item_lists(item_list_id),
      FOREIGN KEY (td_id) REFERENCES transaction_details(td_id),
      FOREIGN KEY (prepared_staff_id) REFERENCES staffs(staff_id),
      FOREIGN KEY (certified_staff_id) REFERENCES staffs(staff_id),
      FOREIGN KEY (noted_staff_id) REFERENCES staff_lists(staff_list_id),
      FOREIGN KEY (form_list_id) REFERENCES form_lists(form_list_id),
      PRIMARY KEY (es_id)
  );
  */
};

var schema = 'expense_statements'; // replace with table name

async function transformCreateData(category_id : string) {
  // TODO: provide logic
  var rsData = await selectAllExpenseStatementValidation()
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

  var form_list_id
  var categoryData = await categoryQuery.selectWhereCategoryValidation(category_id, 'category_id')
  if(categoryData.data){
    var eventData = await eventQuery.selectWhereEventValidation(categoryData.data[0].event_id, 'event_id')
    if(eventData.data){
      form_list_id = eventData.data[0].es_form_list_id
    }
  }
  // TODO: fill information
  return{
    es_id: `expst_${id_mod}`,
    es_name: null,
    es_date: null,
    receipt_link: null,
    es_to: null,
    es_from: null,
    es_notes: null,
    prepared_staff_id: null,
    certified_staff_id: null,
    noted_staff_list_id: null,
    form_list_id: form_list_id,
  }
}

async function transformEditData(data: any, id: string) {
  
  // TODO: provide logic
  var esData = await selectWhereExpenseStatementValidation(id, 'es_id')

  // TODO: fill information
  if(esData.data){
    return{
      es_id: id,
      es_name: data.get('es_name'),
      es_date: data.get('es_date'),
      receipt_link: data.get('receipt_link'),
      es_to: data.get('es_to'),
      es_from: data.get('es_from'),
      es_notes: data.get('es_notes'),
      prepared_staff_id: data.get('prepared_staff_id'),
      certified_staff_id: data.get('certified_staff_id'),
      noted_staff_list_id: esData.data[0].noted_staff_list_id,
      form_list_id: esData.data[0].form_list_id,
    }
  }
  return null
}

async function convertData(data: any) {
  // TODO: provide logic

  // JUST IN CASE: needs to do something with other data of validated fields
  return data;
}

export async function createExpenseStatementValidation(
  category_id : any
) {
  var transformedData = transformCreateData(category_id);
  const validatedFields = ExpenseStatementSchema.safeParse(transformedData);

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to create var.',
    };
  }

  // TODO: provide logic
  var data = await convertData(transformedData);

  await staffListQuery.createStaffList({staff_list_id: data.staff_list_id})

  const { error } = await createExpenseStatement(data);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    message: null,
  };
}

export async function editExpenseStatementValidation(
  id: string,
  identifier: string,
  prevState: ExpenseStatementState,
  formData: FormData,
) {
  var transformedData = await transformEditData(formData, id);
  const validatedFields = UpdateExpenseFormSchema.safeParse(transformedData);

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // TODO: provide logic
  var data = await convertData(transformedData);
  const { error } = await editExpenseStatement(data, id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {} as ExpenseStatementState;
}

export async function selectWhereExpenseStatementValidation(
  id: string,
  identifier: string,
) {
  // TODO: provide logic
  const { data, error } = await selectWhereExpenseStatement(id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    data: data,
  };
}

export async function selectAllExpenseStatementValidation() {
  // TODO: provide logic
  const { data, error } = await selectAllExpenseStatement();
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    data: data,
  };
}

export async function deleteExpenseStatementValidation(
  id: string,
  identifier: string,
) {
  // TODO: provide logic
  const { error } = await deleteExpenseStatement(id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    message: null,
  };
}

export async function createExpenseStatement(data: any) {
  return await query.insert(schema, data);
}

export async function editExpenseStatement(
  data: any,
  id: string,
  identifier: string,
) {
  return await query.edit(schema, data, identifier, id);
}

export async function deleteExpenseStatement(id: string, identifier: string) {
  return await query.remove(schema, identifier, id);
}

export async function selectWhereExpenseStatement(
  id: string,
  identifier: string,
) {
  return await query.selectWhere(schema, identifier, id);
}

export async function selectAllExpenseStatement() {
  return await query.selectAll(schema);
}
