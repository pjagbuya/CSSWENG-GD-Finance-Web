
// INSTRUCTIONS:
// formList -> small case
// FormList -> big case
// replace vals with column names
// remove comments after

import { FormListSchema } from "@/lib/definitions";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { query } from "@/lib/supabase";

export type formListState = {
  errors?: {
    form_list_id?: string[]; 
    form_list_type?: string[]; 
    form_list_name?: string[]; 
  }; 
  message?: string | null;
}

var formListFormat = {
  form_list_id : null,
  form_list_type : null,
  form_list_name : null,

  /*
    CREATE TABLE IF NOT EXISTS form_lists
    (
        form_list_id VARCHAR(25),
        form_list_type ENUM('FT','RS','ES','AI'),
        form_list_name VARCHAR(55),
        PRIMARY KEY (form_list_id)
    );
  */
}

var schema = "FormListSchema" // replace with table name
var identifier = "formList_id"

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


async function createFormListValidation(prevState: formListState, formData: FormData) {

  var transformedData = transformData(formData)
  const validatedFields = FormListSchema.safeParse(transformedData)

  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Unable to create var."
    }
  }

  // TODO: provide logic
  var data = convertData(validatedFields)
  const { error } = await createFormList(data)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    message: null
  }
}

async function editFormListValidation(id: string, prevState: formListState, formData: FormData) {
  
  var transformedData = transformData(formData)
  const validatedFields = FormListSchema.safeParse(transformedData)

  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Unable to edit var."
    }
  }

  // TODO: provide logic
  var data = convertData(validatedFields.data)
  const { error } = await editFormList(data, id)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    message: null
  }
}

async function selectOneFormListValidation(id: string) {

  // TODO: provide logic
  const { data, error } = await selectOneFormList(id)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    data: data
  }
}

async function selectAllFormListValidation() {

  // TODO: provide logic
  const { data, error } = await selectAllFormList()
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    data: data
  }
}


async function deleteFormListValidation(id: string) {

  // TODO: provide logic
  const { error } = await deleteFormList(id)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    message: null
  }
}

async function createFormList(data : any){
  return query.insert(schema, data);
}

async function editFormList(data : any, id : string){
  return query.edit(schema, data, identifier, id);
}

async function deleteFormList(id : string){
  return query.remove(schema, identifier, id);
}

async function selectOneFormList(id : string){
  return query.selectWhere(schema, identifier, id);
}

async function selectAllFormList(){
  return query.selectAll(schema);
}

export const formListQuery = { 
  createFormListValidation, createFormList,
  editFormListValidation, editFormList,
  deleteFormListValidation, deleteFormList,
  selectOneFormListValidation, selectOneFormList,
  selectAllFormListValidation, selectAllFormList
}
