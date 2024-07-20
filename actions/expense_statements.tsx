
// INSTRUCTIONS:
// expenseStatement -> small case
// ExpenseStatement -> big case
// replace vals with column names
// remove comments after

import { ExpenseStatementSchema } from "@/lib/definitions";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import *  from "@/lib/supabase";

export type expenseStatementState = {
  errors?: {
    es_id?: string[]; 
    es_name?: string[]; 
    es_date?: string[]; 
    receipt_link?: string[]; 
    es_to?: string[];  
    es_from?: string[]; 
    es_notes?: string[]; 
    category_id?: string[]; 
    prepared_staff_id?: string[]; 
    certified_staff_id?: string[]; 
    noted_staff_list_id?: string[]; 
    form_list_id?: string[]; 
  }; 
  message?: string | null;
}

var expenseStatementFormat = {
  es_id : null,
  es_name : null,
  es_date : null,
  receipt_link : null,
  es_to : null,   
  es_from : null,
  es_notes : null,
  category_id : null,
  prepared_staff_id : null,
  certified_staff_id : null,
  noted_staff_list_id : null,
  form_list_id : null,
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
}

var schema = "ExpenseStatementSchema" // replace with table name

async function transformData(data : any){

  var arrayData = Array.from(data.entries())
  // TODO: provide logic

  // TODO: fill information
  var transformedData = {

  }
  return transformedData
}

async function convertData(data : any){

  // TODO: provide logic

  // JUST IN CASE: needs to do something with other data of validated fields
  return data.data
}


async function createExpenseStatementValidation(prevState: expenseStatementState, formData: FormData) {

  var transformedData = transformData(formData)
  const validatedFields = ExpenseStatementSchema.safeParse(transformedData)

  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Unable to create var."
    }
  }

  // TODO: provide logic
  var data = convertData(validatedFields)
  const { error } = await createExpenseStatement(data)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    message: null
  }
}

async function editExpenseStatementValidation(id : string, identifier : string, prevState: expenseStatementState, formData: FormData) {
  
  var transformedData = transformData(formData)
  const validatedFields = ExpenseStatementSchema.safeParse(transformedData)

  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Unable to edit var."
    }
  }

  // TODO: provide logic
  var data = convertData(validatedFields.data)
  const { error } = await editExpenseStatement(data, id, identifier)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    message: null
  }
}

async function selectWhereExpenseStatementValidation(id : string, identifier : string) {

  // TODO: provide logic
  const { data, error } = await selectWhereExpenseStatement(id, identifier)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    data: data
  }
}

async function selectAllExpenseStatementValidation() {

  // TODO: provide logic
  const { data, error } = await selectAllExpenseStatement()
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    data: data
  }
}


async function deleteExpenseStatementValidation(id : string, identifier : string) {

  // TODO: provide logic
  const { error } = await deleteExpenseStatement(id, identifier)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    message: null
  }
}

async function createExpenseStatement(data : any){
  return await query.insert(schema, data);
}

async function editExpenseStatement(data : any, id : string, identifier : string){
  return await query.edit(schema, data, identifier, id);
}

async function deleteExpenseStatement(id : string, identifier : string){
  return await query.remove(schema, identifier, id);
}

async function selectWhereExpenseStatement(id : string, identifier : string){
  return await query.selectWhere(schema, identifier, id);
}

async function selectAllExpenseStatement(){
  return await query.selectAll(schema);
}

export const expenseStatementQuery = { 
  createExpenseStatementValidation, createExpenseStatement,
  editExpenseStatementValidation, editExpenseStatement,
  deleteExpenseStatementValidation, deleteExpenseStatement,
  selectWhereExpenseStatementValidation, selectWhereExpenseStatement,
  selectAllExpenseStatementValidation, selectAllExpenseStatement
}
        