
import { ItemSchema } from "@/lib/definitions";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { query } from "@/lib/supabase";

export type itemState = {
  errors?: {
    item_id : null,    
    item_name : null, 
    item_price : null, 
    item_amount : null, 
    item_note : null, 
    item_list_id : null, 
    item_category : null, 
    payment_id : null, 
  }; 
  message?: string | null;
}

var itemFormat = {
  item_id : null, 
  item_name : null, 
  item_price : null, 
  item_amount : null, 
  item_note : null, 
  item_list_id : null, 
  item_category : null, 
  payment_id : null, 
}

var schema = "items"
var identifier = "item_id"

async function transformData(data : any){

  var arrayData = Array.from(data.entries())
  // TODO: provide logic

  // TODO: fill information
  var transformedData = {
    item_id : null, 
    item_name : null, 
    item_price : null, 
    item_amount : null, 
    item_note : null, 
    item_list_id : null, 
    item_category : null, 
    payment_id : null, 
  }
  return transformedData
}

async function convertData(data : any){

  // TODO: provide logic

  // JUST IN CASE: needs to do something with other data of validated fields
  return data.data
}


async function createItemValidation(prevState: itemState, formData: FormData) {

  var transformedData = transformData(formData)
  const validatedFields = ItemSchema.safeParse(transformedData)

  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Unable to create var."
    }
  }

  // TODO: provide logic
  var data = convertData(validatedFields)
  const { error } = await createItem(data)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    message: null
  }
}

async function editItemValidation(id: string, prevState: itemState, formData: FormData) {
  
  var transformedData = transformData(formData)
  const validatedFields = ItemSchema.safeParse(transformedData)

  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Unable to edit var."
    }
  }

  // TODO: provide logic
  var data = convertData(validatedFields.data)
  const { error } = await editItem(data, id)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    message: null
  }
}

async function selectOneItemValidation(id: string) {

  // TODO: provide logic
  const { data, error } = await selectOneItem(id)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    data: data
  }
}

async function selectAllItemValidation() {

  // TODO: provide logic
  const { data, error } = await selectAllItem()
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    data: data
  }
}


async function deleteItemValidation(id: string) {

  // TODO: provide logic
  const { error } = await deleteItem(id)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    message: null
  }
}

async function createItem(data : any){
  return query.insert(schema, data);
}

async function editItem(data : any, id : string){
  return query.edit(schema, data, identifier, id);
}

async function deleteItem(id : string){
  return query.remove(schema, identifier, id);
}

async function selectOneItem(id : string){
  return query.selectWhere(schema, identifier, id);
}

async function selectAllItem(){
  return query.selectAll(schema);
}

export const varQuery = { 
  createItemValidation, createItem,
  editItemValidation, editItem,
  deleteItemValidation, deleteItem,
  selectOneItemValidation, selectOneItem,
  selectAllItemValidation, selectAllItem
}
