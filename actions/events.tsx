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

async function transformData(data: any) {
  var arrayData = Array.from(data.entries());
  // TODO: provide logic

  // TODO: fill information
  var transformedData = {};
  return transformedData;
}

async function convertData(data: any) {
  // TODO: provide logic

  // JUST IN CASE: needs to do something with other data of validated fields
  return data.data;
}

async function createEventValidation(
  prevState: EventState,
  formData: FormData,
) {
  var transformedData = transformData(formData);
  const validatedFields = CreateEventSchema.safeParse(transformedData);

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to create var.',
    };
  }

  // TODO: provide logic
  var data = convertData(validatedFields);
  const { error } = await createEvent(data);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {};
}

async function editEventValidation(
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

async function selectWhereEventValidation(id: string, identifier: string) {
  // TODO: provide logic
  const { data, error } = await selectWhereEvent(id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    data: data,
  };
}

async function selectAllEventValidation() {
  // TODO: provide logic
  const { data, error } = await selectAllEvent();
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    data: data,
  };
}

async function deleteEventValidation(id: string, identifier: string) {
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

async function createEvent(data: any) {
  return await query.insert(schema, data);
}

async function editEvent(data: any, id: string, identifier: string) {
  return await query.edit(schema, data, identifier, id);
}

async function deleteEvent(id: string, identifier: string) {
  return await query.remove(schema, identifier, id);
}

async function selectWhereEvent(id: string, identifier: string) {
  return await query.selectWhere(schema, identifier, id);
}

async function selectAllEvent() {
  return await query.selectAll(schema);
}

export const eventQuery = {
  createEventValidation,
  createEvent,
  editEventValidation,
  editEvent,
  deleteEventValidation,
  deleteEvent,
  selectWhereEventValidation,
  selectWhereEvent,
  selectAllEventValidation,
  selectAllEvent,
};
