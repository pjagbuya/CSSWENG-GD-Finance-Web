// INSTRUCTIONS:
// item -> small case
// Item -> big case
// replace vals with column names
// remove comments after

import { ItemSchema } from '@/lib/definitions';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { query } from '@/lib/supabase';

export type itemState = {
  errors?: {
    item_id?: string[];
    item_list_id?: string[];
    item_name?: string[];
    item_units?: string[];
    item_price?: string[];
    item_amount?: string[];
    item_date?: string[];
    item_payment_details?: string[];
  };
  message?: string | null;
};

var itemFormat = {
  item_id: null,
  item_list_id: null,
  item_name: null,
  item_units: null,
  item_price: null,
  item_amount: null,
  item_date: null,
  item_payment_details: null,

  /*
CREATE TABLE IF NOT EXISTS items(
    item_id VARCHAR(25),
    item_list_id VARCHAR(25),    
    item_name VARCHAR(55),    
    item_units INT,
    item_price FLOAT,
    item_amount FLOAT,
    item_date DATE,
    item_payment_details VARCHAR(55),
    PRIMARY KEY(item_id),
    FOREIGN KEY(item_list_id) REFERENCES item_lists(item_list_id)
);
  */
};

var schema = 'ItemSchema'; // replace with table name

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

async function createItemValidation(prevState: itemState, formData: FormData) {
  var transformedData = transformData(formData);
  const validatedFields = ItemSchema.safeParse(transformedData);

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to create var.',
    };
  }

  // TODO: provide logic
  var data = convertData(validatedFields);
  const { error } = await createItem(data);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    message: null,
  };
}

async function editItemValidation(
  id: string,
  identifier: string,
  prevState: itemState,
  formData: FormData,
) {
  var transformedData = transformData(formData);
  const validatedFields = ItemSchema.safeParse(transformedData);

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to edit var.',
    };
  }

  // TODO: provide logic
  var data = convertData(validatedFields.data);
  const { error } = await editItem(data, id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    message: null,
  };
}

async function selectWhereItemValidation(id: string, identifier: string) {
  // TODO: provide logic
  const { data, error } = await selectWhereItem(id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    data: data,
  };
}

async function selectAllItemValidation() {
  // TODO: provide logic
  const { data, error } = await selectAllItem();
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    data: data,
  };
}

async function deleteItemValidation(id: string, identifier: string) {
  // TODO: provide logic
  const { error } = await deleteItem(id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    message: null,
  };
}

async function createItem(data: any) {
  return await query.insert(schema, data);
}

async function editItem(data: any, id: string, identifier: string) {
  return await query.edit(schema, data, identifier, id);
}

async function deleteItem(id: string, identifier: string) {
  return await query.remove(schema, identifier, id);
}

async function selectWhereItem(id: string, identifier: string) {
  return await query.selectWhere(schema, identifier, id);
}

async function selectAllItem() {
  return await query.selectAll(schema);
}

export const itemQuery = {
  createItemValidation,
  createItem,
  editItemValidation,
  editItem,
  deleteItemValidation,
  deleteItem,
  selectWhereItemValidation,
  selectWhereItem,
  selectAllItemValidation,
  selectAllItem,
};
