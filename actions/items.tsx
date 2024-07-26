'use server';

// INSTRUCTIONS:
// item -> small case
// Item -> big case
// replace vals with column names
// remove comments after

import { ItemSchema } from '@/lib/definitions';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import * as query from '@/lib/supabase';
import * as transactionQuery from '@/actions/transactions';

export type ItemState = {
  errors?: {
    item_name?: string[];
    item_units?: string[];
    item_price?: string[];
    item_amount?: string[];
    item_date?: string[];
    item_payment_details?: string[];
  };
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

var schema = 'items'; // replace with table name

async function transformCreateData(data: any, transactionId: string) {
  var transactionData = await transactionQuery.selectWhereTransactionValidation(
    transactionId,
    'transaction_id',
  );

  // TODO: fill information
  var itemData = await selectAllItemValidation();
  var id_mod = 10000;
  if (itemData.data) {
    if (itemData.data.length > 0) {
      for (let i = 0; i < itemData.data!.length; i++) {
        var num = parseInt(itemData.data[i].item_id.slice(6));
        if (num > id_mod) {
          id_mod = num;
        }
      }
      id_mod += 1;
    }
  }

  if (transactionData.data) {
    return {
      item_id: `items_${id_mod}`,
      item_name: data.get('item_name'),
      item_units: data.get('item_units'),
      item_price: data.get('item_price'),
      item_amount: data.get('item_amount'),
      item_date: data.get('item_date'),
      item_payment_details: data.get('item_payment_details'),
      item_list_id: transactionData.data[0].item_list_id,
    };
  }
  return null;
}

async function transformEditData(data: any, itemId: string) {
  // TODO: provide logic
  var itemData = await selectWhereItemValidation(itemId, 'item_id');

  if (itemData.data) {
    return {
      item_id: itemId,
      item_name: data.get('item_name'),
      item_units: data.get('item_units'),
      item_price: data.get('item_price'),
      item_amount: data.get('item_amount'),
      item_date: data.get('item_date'),
      item_payment_details: data.get('item_payment_details'),
      item_list_id: itemData.data[0].item_list_id,
    };
  }
  return null;
}

async function convertData(data: any) {
  return data;
}

export async function createItemValidation(
  transactionId: string,
  prevState: ItemState,
  formData: FormData,
) {
  var transformedData = await transformCreateData(formData, transactionId);
  const validatedFields = ItemSchema.safeParse(transformedData);

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to create var.',
    };
  }

  // TODO: provide logic
  var data = await convertData(transformedData);

  const { error } = await createItem(data);
  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/${transactionId}`);

  return {} as ItemState;
}

export async function editItemValidation(
  transactionId: string,
  id: string,
  identifier: string,
  prevState: ItemState,
  formData: FormData,
) {
  var transformedData = await transformEditData(formData, id);
  const validatedFields = ItemSchema.safeParse(transformedData);

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to edit var.',
    };
  }

  // TODO: provide logic
  var data = await convertData(transformedData);
  const { error } = await editItem(data, id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/${transactionId}`);
  return {} as ItemState;
}

export async function selectWhereItemValidation(
  id: string,
  identifier: string,
) {
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

export async function selectAllItemValidation() {
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

export async function deleteItemValidation(
  transactionId: string | null,
  id: string,
  identifier: string,
) {
  // TODO: provide logic
  const { error } = await deleteItem(id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  if (transactionId) {
    revalidatePath(`/${transactionId}`);
  }

  return {
    message: null,
  };
}

export async function createItem(data: any) {
  return await query.insert(schema, data);
}

export async function editItem(data: any, id: string, identifier: string) {
  return await query.edit(schema, data, identifier, id);
}

export async function deleteItem(id: string, identifier: string) {
  return await query.remove(schema, identifier, id);
}

export async function selectWhereItem(id: string, identifier: string) {
  return await query.selectWhere(schema, identifier, id);
}

export async function selectAllItem() {
  return await query.selectAll(schema);
}
