'use server'

import { EventSchema } from "@/lib/definitions";
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache";

export type EventState = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
}

export async function createEvent(prevState: EventState, formData: FormData) {
  const validatedFields = EventSchema.safeParse(Object.fromEntries(formData.entries()))

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

export async function editEvent(prevState: EventState, formData: FormData) {
  const validatedFields = EventSchema.safeParse(Object.fromEntries(formData.entries()))

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

export async function deleteEvent(id: string) {

  // TODO: provide logic

  revalidatePath("")
}
