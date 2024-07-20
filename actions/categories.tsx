
// INSTRUCTIONS:
// category -> small case
// Category -> big case
// replace vals with column names
// remove comments after

import { CategorySchema } from "@/lib/definitions";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { query } from "@/lib/supabase";

export type categoryState = {
  errors?: {
    category_id?: string[];    
    category_name?: string[];    
    category_type?: string[];    
    event_id?: string[];    
    transaction_list_id?: string[];    
  }; 
  message?: string | null;
}

var categoryFormat = {
    vals : null,
    category_id : null,
    category_name : null,
    category_type : null,
    event_id : null, 
    transaction_list_id : null, 

  /*
    CREATE TABLE IF NOT EXISTS categories
    (
        category_id VARCHAR(25),
        category_name VARCHAR(55),
        category_type ENUM("Expense","Revenue")
        event_id VARCHAR(25),
        transaction_list_id VARCHAR(25),
        PRIMARY KEY (category_id),
        FOREIGN KEY (event_id) REFERENCES gdsc_events(event_id),
        FOREIGN KEY (transaction_list_id) REFERENCES transaction_lists(transaction_list_id)
    );
  */
}

var schema = "CategorySchema" // replace with table name
var identifier = "category_id"

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


async function createCategoryValidation(prevState: categoryState, formData: FormData) {

  var transformedData = transformData(formData)
  const validatedFields = CategorySchema.safeParse(transformedData)

  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Unable to create var."
    }
  }

  // TODO: provide logic
  var data = convertData(validatedFields)
  const { error } = await createCategory(data)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    message: null
  }
}

async function editCategoryValidation(id: string, prevState: categoryState, formData: FormData) {
  
  var transformedData = transformData(formData)
  const validatedFields = CategorySchema.safeParse(transformedData)

  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Unable to edit var."
    }
  }

  // TODO: provide logic
  var data = convertData(validatedFields.data)
  const { error } = await editCategory(data, id)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    message: null
  }
}

async function selectOneCategoryValidation(id: string) {

  // TODO: provide logic
  const { data, error } = await selectOneCategory(id)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    data: data
  }
}

async function selectAllCategoryValidation() {

  // TODO: provide logic
  const { data, error } = await selectAllCategory()
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    data: data
  }
}


async function deleteCategoryValidation(id: string) {

  // TODO: provide logic
  const { error } = await deleteCategory(id)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    message: null
  }
}

async function createCategory(data : any){
  return query.insert(schema, data);
}

async function editCategory(data : any, id : string){
  return query.edit(schema, data, identifier, id);
}

async function deleteCategory(id : string){
  return query.remove(schema, identifier, id);
}

async function selectOneCategory(id : string){
  return query.selectWhere(schema, identifier, id);
}

async function selectAllCategory(){
  return query.selectAll(schema);
}

export const categoryQuery = { 
  createCategoryValidation, createCategory,
  editCategoryValidation, editCategory,
  deleteCategoryValidation, deleteCategory,
  selectOneCategoryValidation, selectOneCategory,
  selectAllCategoryValidation, selectAllCategory
}
