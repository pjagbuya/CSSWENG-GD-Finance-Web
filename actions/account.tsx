'use server'

import { UserSchema } from "@/lib/definitions";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/utils/supabase/server";

export type AccountState = {
  errors?: {
    email?: string[],
    password?: string[],
    first_name?: string[],
    last_name?: string[],
    role?: string[]
  };
  message?: string | null;
}

export async function createAccount(prevState: AccountState, formData: FormData) {
  const supabase = createAdminClient()
  const validatedFields = UserSchema.safeParse(Object.fromEntries(formData.entries()))
  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Unable to create event."
    }
  }

  const { error } = await supabase.auth.admin.createUser({
    email: validatedFields.data.email,
    password: validatedFields.data.password,
    email_confirm: true
  })
  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/accounts")
  return {
    message: null
  }
}
// TODO: change to admin version of updating the user
export async function editAccount(prevState: AccountState, formData: FormData) {
  const supabase = createAdminClient()
  const validatedFields = UserSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Unable to edit event."
    }
  }

  const { error } = await supabase.auth.updateUser({ email: validatedFields.data.email, password: validatedFields.data.password })
  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/accounts")
  return {
    message: null
  }
}

export async function deleteAccount(id: string) {
  const supabase = createAdminClient()

  const { error } = await supabase.auth.admin.deleteUser(id, true)
  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/accounts")
}

export async function getUsers() {
  const supabase = createAdminClient()
  const { data, error } = await supabase.auth.admin.listUsers()

  if (error) {
    throw new Error(error.message)
  }

  return data.users
}
