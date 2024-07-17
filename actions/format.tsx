
import { varSchema } from "@/lib/definitions";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { query } from "@/lib/supabase";

export type varState = {
  errors?: {
    var?: string[];    
  }; 
  message?: string | null;
}

async function createVarValidation(prevState: varState, formData: FormData) {
  const validatedFields = varSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Unable to create var."
    }
  }

  // TODO: provide logic

  revalidatePath("")
  redirect("/")
}

async function editVarValidation(prevState: varState, formData: FormData) {
  const validatedFields = varSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Unable to edit event."
    }
  }

  const { error } = await createVar({
    
  })
  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/accounts")
  return {
    message: null
  }
}

async function selectOneVarValidation(id: string) {

  // TODO: provide logic

  revalidatePath("")
  redirect("/")
}

async function selectAllVarValidation() {

  // TODO: provide logic

  revalidatePath("")
  redirect("/")
}


async function deleteVarValidation(id: string) {

  // TODO: provide logic

  revalidatePath("")
  redirect("/")
}

async function createVar(data : any){
  return query.insert('varSchema', data);
}

async function editVar(data : any, id : string){
  return query.edit('varSchema', data, 'var_id', id);
}

async function deleteVar(id : string){
  return query.remove('varSchema', 'var_id', id);
}

async function selectOneVar(id : string){
  return query.selectWhere('varSchema', 'var_id', id);
}

async function selectAllVar(){
  return query.selectAll('varSchema');
}

export const varQuery = { 
  createVarValidation, createVar,
  editVarValidation, editVar,
  deleteVarValidation, deleteVar,
  selectOneVarValidation, selectOneVar,
  selectAllVarValidation, selectAllVar
}

/*
const { data, error } = await supabase.from('countries').select().eq(column, var)
const { error } = await supabase.from(schema).insert(data)
const { error } = await supabase.from(schema).update(updateData).eq(column, var)
const { error } = await supabase.from(schema).delete().eq(column, var)
*/