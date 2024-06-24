'use server'

import { UserSchema } from "@/lib/definitions";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export type AccountState = {
  errors?: {
    email: string[],
    password: string[],
    first_name: string[],
    last_name: string[],
    role: string[]
  };
  message?: string | null;
}

export async function createAccount(prevState: AccountState, formData: FormData) {
  const supabase = createClient()
  const validatedFields = UserSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Unable to create event."
    }
  }

  const { error } = await supabase.auth.signUp({ email: validatedFields.data.email, password: validatedFields.data.password })
  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/account")
}

export async function editAccount(prevState: AccountState, formData: FormData) {
  const supabase = createClient()
  const validatedFields = UserSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Unable to edit event."
    }
  }

  // TODO: provide logic
  const { error } = await supabase.auth.updateUser({ email: validatedFields.data.email, password: validatedFields.data.password })
  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/account")
}

export async function deleteAccount(id: string) {
  const supabase = createClient()

  const { error } = await supabase.auth.admin.deleteUser(id, true)
  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/account")
}
