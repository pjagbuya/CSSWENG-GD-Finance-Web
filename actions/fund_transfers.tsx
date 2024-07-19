
// INSTRUCTIONS:
// fundTransfer -> small case
// FundTransfer -> big case
// replace vals with column names
// remove comments after

import { FundTransferSchema } from "@/lib/definitions";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { query } from "@/lib/supabase";

export type fundTransferState = {
  errors?: {
    ft_id?: string[]; 
    ft_name?: string[]; 
    ft_date?: string[]; 
    ft_reason?: string[]; 
    ft_amount?: string[]; 
    ft_to?: string[]; 
    ft_from?: string[]; 
    fr_on?: string[]; 
    receipt_link?: string[]; 
    prepared_staff_id?: string[]; 
    certified_staff_id?: string[]; 
    noted_staff_list_id?: string[]; 
    form_list_id?: string[]; 
  }; 
  message?: string | null;
}

var fundTransferFormat = {
  ft_id : null,
  ft_name : null,
  ft_date : null,
  ft_reason : null,
  ft_amount : null,
  ft_to : null,
  ft_from : null,
  fr_on : null,
  receipt_link : null,
  prepared_staff_id : null,
  certified_staff_id : null,
  noted_staff_list_id : null,
  form_list_id : null,

  /*
    CREATE TABLE IF NOT EXISTS fund_transfers
  (
      ft_id VARCHAR(25),
      ft_name VARCHAR(55),
      ft_date DATE,
      ft_reason VARCHAR(105),
      ft_amount VARCHAR(105),
      ft_to VARCHAR(105), 
      ft_from VARCHAR(105),
      fr_on VARCHAR(105),
      receipt_link VARCHAR(55),
      prepared_staff_id VARCHAR(25),
      certified_staff_id VARCHAR(25),
      noted_staff_list_id VARCHAR(25),
      form_list_id VARCHAR(25),
      FOREIGN KEY (td_id) REFERENCES transaction_details(td_id),
      FOREIGN KEY (prepared_staff_id) REFERENCES staffs(staff_id),
      FOREIGN KEY (certified_staff_id) REFERENCES staffs(staff_id),
      FOREIGN KEY (noted_staff_id) REFERENCES staff_lists(staff_list_id),
      FOREIGN KEY (form_list_id) REFERENCES form_lists(form_list_id),
      PRIMARY KEY (ft_id)
  );
  */
}

var schema = "FundTransferSchema" // replace with table name
var identifier = "ft_id"

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


async function createFundTransferValidation(prevState: fundTransferState, formData: FormData) {

  var transformedData = transformData(formData)
  const validatedFields = FundTransferSchema.safeParse(transformedData)

  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Unable to create var."
    }
  }

  // TODO: provide logic
  var data = convertData(validatedFields)
  const { error } = await createFundTransfer(data)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    message: null
  }
}

async function editFundTransferValidation(id: string, prevState: fundTransferState, formData: FormData) {
  
  var transformedData = transformData(formData)
  const validatedFields = FundTransferSchema.safeParse(transformedData)

  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Unable to edit var."
    }
  }

  // TODO: provide logic
  var data = convertData(validatedFields.data)
  const { error } = await editFundTransfer(data, id)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    message: null
  }
}

async function selectOneFundTransferValidation(id: string) {

  // TODO: provide logic
  const { data, error } = await selectOneFundTransfer(id)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    data: data
  }
}

async function selectAllFundTransferValidation() {

  // TODO: provide logic
  const { data, error } = await selectAllFundTransfer()
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    data: data
  }
}


async function deleteFundTransferValidation(id: string) {

  // TODO: provide logic
  const { error } = await deleteFundTransfer(id)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    message: null
  }
}

async function createFundTransfer(data : any){
  return query.insert(schema, data);
}

async function editFundTransfer(data : any, id : string){
  return query.edit(schema, data, identifier, id);
}

async function deleteFundTransfer(id : string){
  return query.remove(schema, identifier, id);
}

async function selectOneFundTransfer(id : string){
  return query.selectWhere(schema, identifier, id);
}

async function selectAllFundTransfer(){
  return query.selectAll(schema);
}

export const fundTransferQuery = { 
  createFundTransferValidation, createFundTransfer,
  editFundTransferValidation, editFundTransfer,
  deleteFundTransferValidation, deleteFundTransfer,
  selectOneFundTransferValidation, selectOneFundTransfer,
  selectAllFundTransferValidation, selectAllFundTransfer
}
