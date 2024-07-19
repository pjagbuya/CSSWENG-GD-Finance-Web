
// INSTRUCTIONS:
// transactionList -> small case
// TransactionList -> big case
// replace vals with column names
// remove comments after

import { TransactionListSchema } from "@/lib/definitions";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { query } from "@/lib/supabase";

export type transactionListState = {
  errors?: {
    transaction_list_id?: string[];    
  }; 
  message?: string | null;
}

var transactionListFormat = {
    transaction_list_id : null,

  /*
    CREATE TABLE IF NOT EXISTS transaction_lists
    (
        transaction_list_id VARCHAR(25),
        PRIMARY KEY (transaction_list_id)
    );
  */
}

var schema = "TransactionListSchema" // replace with table name
var identifier = "transactionList_id"

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


async function createTransactionListValidation(prevState: transactionListState, formData: FormData) {

  var transformedData = transformData(formData)
  const validatedFields = TransactionListSchema.safeParse(transformedData)

  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Unable to create var."
    }
  }

  // TODO: provide logic
  var data = convertData(validatedFields)
  const { error } = await createTransactionList(data)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    message: null
  }
}

async function editTransactionListValidation(id: string, prevState: transactionListState, formData: FormData) {
  
  var transformedData = transformData(formData)
  const validatedFields = TransactionListSchema.safeParse(transformedData)

  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Unable to edit var."
    }
  }

  // TODO: provide logic
  var data = convertData(validatedFields.data)
  const { error } = await editTransactionList(data, id)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    message: null
  }
}

async function selectOneTransactionListValidation(id: string) {

  // TODO: provide logic
  const { data, error } = await selectOneTransactionList(id)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    data: data
  }
}

async function selectAllTransactionListValidation() {

  // TODO: provide logic
  const { data, error } = await selectAllTransactionList()
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    data: data
  }
}


async function deleteTransactionListValidation(id: string) {

  // TODO: provide logic
  const { error } = await deleteTransactionList(id)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    message: null
  }
}

async function createTransactionList(data : any){
  return query.insert(schema, data);
}

async function editTransactionList(data : any, id : string){
  return query.edit(schema, data, identifier, id);
}

async function deleteTransactionList(id : string){
  return query.remove(schema, identifier, id);
}

async function selectOneTransactionList(id : string){
  return query.selectWhere(schema, identifier, id);
}

async function selectAllTransactionList(){
  return query.selectAll(schema);
}

export const transactionListQuery = { 
  createTransactionListValidation, createTransactionList,
  editTransactionListValidation, editTransactionList,
  deleteTransactionListValidation, deleteTransactionList,
  selectOneTransactionListValidation, selectOneTransactionList,
  selectAllTransactionListValidation, selectAllTransactionList
}
