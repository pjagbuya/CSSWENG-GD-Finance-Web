'use server';

import { EventSchema } from '@/lib/definitions';
import { redirect } from 'next/navigation';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';
import { createClient } from '@/utils/supabase/server';

export type EventState = {
  errors?: {
    event_name?: string[];
  };
  message?: string | null;
};

export async function createEvent(prevState: EventState, formData: FormData) {
  const supabase = createClient();
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

  const { error } = await supabase
    .from('gdsc_events')
    .insert([{ event_name: formData.get('event_name') }]);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/events');
  return { message: null };
}

export async function editEvent(
  id: string,
  prevState: EventState,
  formData: FormData,
) {
  const supabase = createClient();
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

  const { error } = await supabase
    .from('gdsc_events')
    .update({ event_name: formData.get('event_name') })
    .eq('event_id', id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/events');
  return { message: null };
}

export async function getEvent(id: string) {
  noStore();

  const supabase = createClient();
  const { data, error } = await supabase
    .from('gdsc_events')
    .select('*')
    .eq('event_id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
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
  const supabase = createClient();

  const { error } = await supabase
    .from('gdsc_events')
    .delete()
    .eq('event_id', id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/events');
}
