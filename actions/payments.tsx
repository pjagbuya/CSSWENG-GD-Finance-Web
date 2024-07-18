
// INSTRUCTIONS:
// payment -> small case
// Payment -> big case
// replace vals with column names
// remove comments after

import { PaymentSchema } from "@/lib/definitions";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { query } from "@/lib/supabase";

export type paymentState = {
  errors?: {
    payment_id?: string[];    
    payment_date?: string[];   
    payment_detail?: string[];   
  }; 
  message?: string | null;
}

var paymentFormat = {
  payment_id : null, 
  payment_date : null,
  payment_detail : null,
}

var schema = "payments"
var identifier = "payment_id"

async function transformData(data : any){

  var arrayData = Array.from(data.entries())
  // TODO: provide logic

  // TODO: fill information
  var transformedData = {
    payment_id : null, 
    payment_date : null,
    payment_detail : null,
  }
  return transformedData
}

async function convertData(data : any){

  // TODO: provide logic

  // JUST IN CASE: needs to do something with other data of validated fields
  return data.data
}


async function createPaymentValidation(prevState: paymentState, formData: FormData) {

  var transformedData = transformData(formData)
  const validatedFields = PaymentSchema.safeParse(transformedData)

  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Unable to create var."
    }
  }

  // TODO: provide logic
  var data = convertData(validatedFields)
  const { error } = await createPayment(data)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    message: null
  }
}

async function editPaymentValidation(id: string, prevState: paymentState, formData: FormData) {
  
  var transformedData = transformData(formData)
  const validatedFields = PaymentSchema.safeParse(transformedData)

  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Unable to edit var."
    }
  }

  // TODO: provide logic
  var data = convertData(validatedFields.data)
  const { error } = await editPayment(data, id)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    message: null
  }
}

async function selectOnePaymentValidation(id: string) {

  // TODO: provide logic
  const { data, error } = await selectOnePayment(id)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    data: data
  }
}

async function selectAllPaymentValidation() {

  // TODO: provide logic
  const { data, error } = await selectAllPayment()
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    data: data
  }
}


async function deletePaymentValidation(id: string) {

  // TODO: provide logic
  const { error } = await deletePayment(id)
  if (error) {
    throw new Error(error.message)
  }

  //revalidatePath("/")
  return {
    message: null
  }
}

async function createPayment(data : any){
  return query.insert(schema, data);
}

async function editPayment(data : any, id : string){
  return query.edit(schema, data, identifier, id);
}

async function deletePayment(id : string){
  return query.remove(schema, identifier, id);
}

async function selectOnePayment(id : string){
  return query.selectWhere(schema, identifier, id);
}

async function selectAllPayment(){
  return query.selectAll(schema);
}

export const varQuery = { 
  createPaymentValidation, createPayment,
  editPaymentValidation, editPayment,
  deletePaymentValidation, deletePayment,
  selectOnePaymentValidation, selectOnePayment,
  selectAllPaymentValidation, selectAllPayment
}
