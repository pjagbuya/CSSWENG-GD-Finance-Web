'use server'

import { LoginForm } from "@/lib/definitions";
import { redirect } from "next/navigation"

export type State = {
  errors?: {
    email?: string;
    password?: string;
  };
  message?: string | null;
}

export async function login(prevState: State, formData: FormData) {
  const validatedFields = LoginForm.safeParse(Object.fromEntries(formData.entries()))

  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Unable to log in."
    }
  }

  // TODO: provide logic

  redirect("/")
}
