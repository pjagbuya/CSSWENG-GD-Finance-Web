'use server'

import { LoginForm } from "@/lib/definitions";
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server";

export type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
}

export async function login(prevState: LoginState, formData: FormData) {
  const supabase = createClient()

  const validatedFields = LoginForm.safeParse(Object.fromEntries(formData.entries()))

  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Unable to log in."
    }
  }

  const { error } = await supabase.auth.signInWithPassword(validatedFields.data)

  if (error) {
    return { message: "Wrong username and password", errors: {} }
  }


  redirect("/events")
}

export async function logout() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(error.message)
  }


  redirect("/")
}
