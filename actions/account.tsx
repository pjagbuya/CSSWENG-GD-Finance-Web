'use server'

import { UserSchema } from "@/lib/definitions";
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache";

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
  const validatedFields = UserSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Unable to create event."
    }
  }

  // TODO: provide logic

  revalidatePath("")
  redirect("/")
}

export async function editAccount(prevState: AccountState, formData: FormData) {
  const validatedFields = UserSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Unable to edit event."
    }
  }

  // TODO: provide logic

  revalidatePath("")
  redirect("/")
}

export async function deleteAccount(id: string) {

  // TODO: provide logic

  revalidatePath("")
}
