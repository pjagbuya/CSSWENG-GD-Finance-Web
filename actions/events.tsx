'use server';

// INSTRUCTIONS:
// event -> small case
// Event -> big case
// replace vals with column names
// remove comments after

import { CreateEventSchema } from '@/lib/definitions';
import * as query from '@/lib/supabase';
import * as formListQuery from '@/actions/form_lists';
import { revalidatePath } from 'next/cache';
import * as categoryQuery from '@/actions/categories';

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

async function transformCreateData(data: FormData) {

  var eventData = await selectAllEventValidation()
  var id_mod = 10000
  if(eventData.data){
    if(eventData.data.length > 0){
      for(let i = 0; i < eventData.data!.length; i++){
        var num = parseInt(eventData.data[i].event_id.slice(6));
        if(num > id_mod){
          id_mod = num
        }
      }
      id_mod += 1
    }
  }

  // TODO: fill information
  return {
    event_id: `event_${id_mod}`,
    event_name: data.get('event_name'),
    ft_form_list_id: `ftl_${id_mod}`,
    rs_form_list_id: `rsl_${id_mod}`,
    es_form_list_id: `esl_${id_mod}`,
    ai_form_list_id: `ail_${id_mod}`,
  };
}

async function transformEditData(id: string, identifier: string, data: FormData) {
  const eventData = await selectWhereEventValidation(id, identifier)

  // TODO: fill information
  if(eventData.data){
    return {
      event_id: id,
      event_name: data.get('event_name'),
      ft_form_list_id: eventData.data[0].ft_form_list_id,
      rs_form_list_id: eventData.data[0].rs_form_list_id,
      es_form_list_id: eventData.data[0].es_form_list_id,
      ai_form_list_id: eventData.data[0].ai_form_list_id,
    };
  }
  return null
}

async function convertData(data: any) {
  return data;
}

export async function createEventValidation(
  prevState: EventState,
  formData: FormData,
) {
  var transformedData = await transformCreateData(formData);
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

  const ai_form_list = 
  {
    form_list_id: data.ai_form_list_id
  }
  await formListQuery.createFormList(ai_form_list)

  const rs_form_list = 
  {
    form_list_id: data.rs_form_list_id
  }
  await formListQuery.createFormList(rs_form_list)

  const es_form_list = 
  {
    form_list_id: data.es_form_list_id
  }
  await formListQuery.createFormList(es_form_list)

  const ft_form_list = 
  {
    form_list_id: data.ft_form_list_id
  }
  await formListQuery.createFormList(ft_form_list)

  const { error } = await createEvent(data);
  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/events');
  return {};
}

export async function editEventValidation(
  id: string,
  identifier: string,
  prevState: EventState,
  formData: FormData,
) {
  const transformedData = await transformEditData(id, identifier, formData);
  const validatedFields = CreateEventSchema.safeParse(transformedData);

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to edit var.',
    };
  }

  // TODO: provide logic
  var data = await convertData(transformedData);
  const { error } = await editEvent(data, id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/events")
  return {};
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
    data: data,
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
  const data = await selectWhereEventValidation(id, 'event_id')
  const categoryData = await categoryQuery.selectWhereCategoryValidation(id, 'event_id')

  if(categoryData.data){
    for(let i = 0; i < categoryData.data.length; i++){
      await categoryQuery.deleteCategoryValidation(categoryData.data[i].category_id, 'category_id');
    }
  }

  const { error } = await deleteEvent(id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  if(data.data){
    await formListQuery.deleteFormListValidation(data.data[0].ai_form_list_id, 'form_list_id')
    await formListQuery.deleteFormListValidation(data.data[0].rs_form_list_id, 'form_list_id')
    await formListQuery.deleteFormListValidation(data.data[0].es_form_list_id, 'form_list_id')
    await formListQuery.deleteFormListValidation(data.data[0].ft_form_list_id, 'form_list_id')
  }

  revalidatePath("/");
  
  return {};
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
