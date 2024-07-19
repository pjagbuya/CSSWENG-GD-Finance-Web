
// INSTRUCTIONS:
// transaction -> small case
// Transaction -> big case
// replace vals with column names
// remove comments after

import { TransactionSchema } from "@/lib/definitions";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { query } from "@/lib/supabase";

export type transactionState = {
  errors?: {    
    transaction_id?: string[]; 
    transaction_name?: string[]; 
    transaction_note?: string[];  
    transaction_date?: string[];   
    transaction_list_id?: string[]; 
    item_list_id?: string[]; 
  }; 
  message?: string | null;
}

var transactionFormat = {
  vals : null,
    transaction_id : null, 
    transaction_name : null, 
    transaction_note : null,  
    transaction_date : null,   
    transaction_list_id : null, 
    item_list_id : null, 

  /*
    CREATE TABLE IF NOT EXISTS transactions
    (
        transaction_id VARCHAR(25),
        transaction_name VARCHAR(25),
        transaction_note VARCHAR(55), 
        transaction_date DATE,    
        transaction_list_id VARCHAR(25),
        item_list_id VARCHAR(25),
        PRIMARY KEY (transaction_id), 
        FOREIGN KEY (transaction_list_id) REFERENCES transaction_lists(transaction_list_id),
        FOREIGN KEY (item_list_id) REFERENCES item_lists(item_list_id)
    );
  */
}

var schema = "TransactionSchema" // replace with table name
var identifier = "transaction_id"

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


async function createTransactionValidation(prevState: transactionState, formData: FormData) {

  var transformedData = transformData(formData)
  const validatedFields = TransactionSchema.safeParse(transformedData)

  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Unable to create var."
    }
  }

  // TODO: provide logic
  var data = convertData(validatedFields)
  const { error } = await createTransaction(data)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    message: null
  }
}

async function editTransactionValidation(id: string, prevState: transactionState, formData: FormData) {
  
  var transformedData = transformData(formData)
  const validatedFields = TransactionSchema.safeParse(transformedData)

  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Unable to edit var."
    }
  }

  // TODO: provide logic
  var data = convertData(validatedFields.data)
  const { error } = await editTransaction(data, id)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    message: null
  }
}

async function selectOneTransactionValidation(id: string) {

  // TODO: provide logic
  const { data, error } = await selectOneTransaction(id)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    data: data
  }
}

async function selectAllTransactionValidation() {

  // TODO: provide logic
  const { data, error } = await selectAllTransaction()
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    data: data
  }
}


async function deleteTransactionValidation(id: string) {

  // TODO: provide logic
  const { error } = await deleteTransaction(id)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    message: null
  }
}

async function createTransaction(data : any){
  return query.insert(schema, data);
}

async function editTransaction(data : any, id : string){
  return query.edit(schema, data, identifier, id);
}

async function deleteTransaction(id : string){
  return query.remove(schema, identifier, id);
}

async function selectOneTransaction(id : string){
  return query.selectWhere(schema, identifier, id);
}

async function selectAllTransaction(){
  return query.selectAll(schema);
}

export const transactionQuery = { 
  createTransactionValidation, createTransaction,
  editTransactionValidation, editTransaction,
  deleteTransactionValidation, deleteTransaction,
  selectOneTransactionValidation, selectOneTransaction,
  selectAllTransactionValidation, selectAllTransaction
}
