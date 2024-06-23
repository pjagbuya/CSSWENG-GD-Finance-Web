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

export async function createEvent(prevState: State, formData: FormData) {
  const validatedFields = LoginForm.safeParse(Object.fromEntries(formData.entries()))

  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Unable to create event."
    }
  }

  // TODO: provide logic

  redirect("/")
}
