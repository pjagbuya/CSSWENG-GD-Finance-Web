'use server';

// INSTRUCTIONS:
// event -> small case
// Event -> big case
// replace vals with column names
// remove comments after

import { CreateEventSchema } from '@/lib/definitions';
import * as query from '@/lib/supabase';

export type EventState = {
  errors?: {
    event_name?: string[];
  };
};

var eventFormat = {
  event_id: null,
  event_name: null,
  ft_form_list_id: null,
  rs_form_list_id: null,
  es_form_list_id: null,
  ai_form_list_id: null,

  /*
  CREATE TABLE IF NOT EXISTS gdsc_events
    (
        event_id VARCHAR(25),
        event_name VARCHAR(55),
        ft_form_list_id VARCHAR(25),
        rs_form_list_id VARCHAR(25),
        es_form_list_id VARCHAR(25),
        ai_form_list_id VARCHAR(25),
        FOREIGN KEY (ft_form_list_id) REFERENCES form_lists(form_list_id),
        FOREIGN KEY (rs_form_list_id) REFERENCES form_lists(form_list_id),
        FOREIGN KEY (es_form_list_id) REFERENCES form_lists(form_list_id),
        FOREIGN KEY (ai_form_list_id) REFERENCES form_lists(form_list_id),
        PRIMARY KEY (event_id)
    );
  */
};

var schema = 'gdsc_events'; // replace with table name
var identifier = 'event_id';

async function transformData(data: FormData) {
  var eventData = await selectAllEventValidation();
  var count = 0;

  if (eventData.data) {
    count = eventData.data!.length;
  }

  // TODO: fill information
  var transformedData = {
    event_id: `event_${count + 10000}`,
    event_name: data.get('event_name'),
    ft_form_list_id: `ftl_${count + 10000}`,
    rs_form_list_id: `rsl_${count + 10000}`,
    es_form_list_id: `esl_${count + 10000}`,
    ai_form_list_id: `ail_${count + 10000}`,
  };

  return transformedData;
}

async function convertData(data: any) {
  return data;
}

export async function createEventValidation(
  prevState: EventState,
  formData: FormData,
) {
  var transformedData = await transformData(formData);
  const validatedFields = CreateEventSchema.safeParse(transformedData);

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to create var.',
    };
  }

  // TODO: provide logic
  var data = await convertData(transformedData);

  const { error } = await createEvent(data);
  if (error) {
    throw new Error(error.message);
  }

  return {};
}

export async function editEventValidation(
  id: string,
  identifier: string,
  prevState: EventState,
  formData: FormData,
) {
  var transformedData = transformData(formData);
  const validatedFields = CreateEventSchema.safeParse(transformedData);

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to edit var.',
    };
  }

  // TODO: provide logic
  var data = convertData(validatedFields.data);
  const { error } = await editEvent(data, id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    message: null,
  };
}

export async function selectWhereEventValidation(
  id: string,
  identifier: string,
) {
  const { data, error } = await selectWhereEvent(id, identifier);

  if (error) {
    throw new Error(error.message);
  }

  return {
    data: data!,
  };
}

export async function selectAllEventValidation() {
  const { data, error } = await selectAllEvent();

  if (error) {
    throw new Error(error.message);
  }

  return {
    data: data,
  };
}

export async function deleteEventValidation(id: string, identifier: string) {
  // TODO: provide logic
  const { error } = await deleteEvent(id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    message: null,
  };
}

export async function createEvent(data: any) {
  return await query.insert(schema, data);
}

export async function editEvent(data: any, id: string, identifier: string) {
  return await query.edit(schema, data, identifier, id);
}

export async function deleteEvent(id: string, identifier: string) {
  return await query.remove(schema, identifier, id);
}

export async function selectWhereEvent(id: string, identifier: string) {
  return await query.selectWhere(schema, identifier, id);
}

export async function selectAllEvent() {
  return await query.selectAll(schema);
}
