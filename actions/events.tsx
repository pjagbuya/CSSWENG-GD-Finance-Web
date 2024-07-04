'use server';

import { EventSchema } from '@/lib/definitions';
import { redirect } from 'next/navigation';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';
import { createClient } from '@/utils/supabase/server';

export type EventState = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

export async function createEvent(prevState: EventState, formData: FormData) {
  const validatedFields = EventSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to create event.',
    };
  }

  // TODO: provide logic

  revalidatePath('');
  redirect('/');
}

export async function editEvent(prevState: EventState, formData: FormData) {
  const validatedFields = EventSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to edit event.',
    };
  }

  // TODO: provide logic

  revalidatePath('');
  redirect('/');
}

export async function getEvents() {
  noStore();

  const supabase = createClient();
  const { data, error } = await supabase.from('gdsc_events').select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteEvent(id: string) {
  // TODO: provide logic

  revalidatePath('');
}
