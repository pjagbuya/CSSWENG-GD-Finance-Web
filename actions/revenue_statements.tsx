
// INSTRUCTIONS:
// revenueStatement -> small case
// RevenueStatement -> big case
// replace vals with column names
// remove comments after

import { RevenueStatementSchema } from "@/lib/definitions";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { query } from "@/lib/supabase";

export type revenueStatementState = {
  errors?: {   
    rs_id?: string[]; 
    rs_name?: string[]; 
    rs_date?: string[]; 
    receipt_link?: string[];
    rs_to?: string[];  
    rs_from?: string[];  
    rs_notes?: string[]; 
    category_id?: string[]; 
    prepared_staff_id?: string[]; 
    certified_staff_id?: string[]; 
    noted_staff_list_id?: string[]; 
    form_list_id?: string[]; 
  }; 
  message?: string | null;
}

var revenueStatementFormat = {
  rs_id : null,
  rs_name : null,
  rs_date : null,
  receipt_link : null,
  rs_to : null,   
  rs_from : null,
  rs_notes : null,
  category_id : null,
  prepared_staff_id : null,
  certified_staff_id : null,
  noted_staff_list_id : null,
  form_list_id : null,
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
}

var schema = "RevenueStatementSchema" // replace with table name
var identifier = "rs_id"

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


async function createRevenueStatementValidation(prevState: revenueStatementState, formData: FormData) {

  var transformedData = transformData(formData)
  const validatedFields = RevenueStatementSchema.safeParse(transformedData)

  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Unable to create var."
    }
  }

  // TODO: provide logic
  var data = convertData(validatedFields)
  const { error } = await createRevenueStatement(data)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    message: null
  }
}

async function editRevenueStatementValidation(id: string, prevState: revenueStatementState, formData: FormData) {
  
  var transformedData = transformData(formData)
  const validatedFields = RevenueStatementSchema.safeParse(transformedData)

  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Unable to edit var."
    }
  }

  // TODO: provide logic
  var data = convertData(validatedFields.data)
  const { error } = await editRevenueStatement(data, id)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    message: null
  }
}

async function selectOneRevenueStatementValidation(id: string) {

  // TODO: provide logic
  const { data, error } = await selectOneRevenueStatement(id)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    data: data
  }
}

async function selectAllRevenueStatementValidation() {

  // TODO: provide logic
  const { data, error } = await selectAllRevenueStatement()
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    data: data
  }
}


async function deleteRevenueStatementValidation(id: string) {

  // TODO: provide logic
  const { error } = await deleteRevenueStatement(id)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    message: null
  }
}

async function createRevenueStatement(data : any){
  return query.insert(schema, data);
}

async function editRevenueStatement(data : any, id : string){
  return query.edit(schema, data, identifier, id);
}

async function deleteRevenueStatement(id : string){
  return query.remove(schema, identifier, id);
}

async function selectOneRevenueStatement(id : string){
  return query.selectWhere(schema, identifier, id);
}

async function selectAllRevenueStatement(){
  return query.selectAll(schema);
}

export const revenueStatementQuery = { 
  createRevenueStatementValidation, createRevenueStatement,
  editRevenueStatementValidation, editRevenueStatement,
  deleteRevenueStatementValidation, deleteRevenueStatement,
  selectOneRevenueStatementValidation, selectOneRevenueStatement,
  selectAllRevenueStatementValidation, selectAllRevenueStatement
}
 