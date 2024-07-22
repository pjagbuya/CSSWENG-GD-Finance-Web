// INSTRUCTIONS:
// transaction -> small case
// Transaction -> big case
// replace vals with column names
// remove comments after

import { TransactionSchema } from '@/lib/definitions';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import * as query from '@/lib/supabase';
import * as categoryQuery from '@/actions/categories';
import { deleteItemListValidation } from './item_lists';

export type TransactionState = {
  errors?: {
    transaction_name?: string[];
    transaction_note?: string[];
    transaction_date?: string[];
  };
};

var transactionFormat = {
  transaction_id: null,
  transaction_name: null,
  transaction_note: null,
  transaction_date: null,
  transaction_list_id: null,
  item_list_id: null,

  /*
    CREATE TABLE IF NOT EXISTS transactions
    (
        transaction_id VARCHAR(25),
        transaction_name VARCHAR(25),
        transaction_note VARCHAR(55), 
        transaction_date DATE,    
        transaction_list_id VARCHAR(25),
        item_list_id VARCHAR(25),
        PRIMARY KEY (transaction_id), 
        FOREIGN KEY (transaction_list_id) REFERENCES transaction_lists(transaction_list_id),
        FOREIGN KEY (item_list_id) REFERENCES item_lists(item_list_id)
    );
  */
};

var schema = 'transactions'; // replace with table name

export async function transformCreateData(data: any, groupId: string) {
  // TODO: provide logic

  var categoryData = await categoryQuery.selectWhereCategoryValidation(groupId, 'category_id')

  // TODO: fill information
  var transactionData = await selectAllTransactionValidation()
  var id_mod = 10000;
  if(transactionData.data){
    if(transactionData.data.length > 0){
      for(let i = 0; i < transactionData.data!.length; i++){
        var num = parseInt(transactionData.data[i].transaction_id.slice(6))
        if(num > id_mod){
          id_mod = num
        }
      }
      id_mod += 1
    }
  }

  return {
    transaction_id: null,
    transaction_name: data.get('transaction_name'),
    transaction_note: data.get('transaction_note'),
    transaction_date: data.get('transaction_date'),
    transaction_list_id: null,
    item_list_id: null,
  };
}

export async function transformEditData(data: any, groupId: string) {
  // TODO: provide logic

  var categoryData = await categoryQuery.selectWhereCategoryValidation(groupId, 'category_id')
  var transaction_list_id
  if(categoryData.data){
    transaction_list_id = categoryData.data[0].transaction_list_id
  }
  // TODO: fill information
  var transactionData = await selectAllTransactionValidation()
  var id_mod = 10000;
  if(transactionData.data){
    if(transactionData.data.length > 0){
      for(let i = 0; i < transactionData.data!.length; i++){
        var num = parseInt(transactionData.data[i].transaction_id.slice(6))
        if(num > id_mod){
          id_mod = num
        }
      }
      id_mod += 1
    }
  }

  return {
    transaction_id: `trans_${id_mod}`,
    transaction_name: data.get('transaction_name'),
    transaction_note: data.get('transaction_note'),
    transaction_date: data.get('transaction_date'),
    transaction_list_id: transaction_list_id,
    item_list_id: `itl_${id_mod}`,
  };
}

export async function convertData(data: any) {
  // TODO: provide logic

  // JUST IN CASE: needs to do something with other data of validated fields
  return data.data;
}

export async function createTransactionValidation(
  groupId: string, 
  prevState: TransactionState,
  formData: FormData,
) {
  const transformedData = await transformCreateData(formData, groupId);
  const validatedFields = TransactionSchema.safeParse(transformedData);

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to create var.',
    };
  }

  // TODO: provide logic
  var data = convertData(validatedFields);
  const { error } = await createTransaction(data);
  if (error) {
    throw new Error(error.message);
  }

  // revalidatePath("/")
  return {} as TransactionState;
}

export async function editTransactionValidation(
  id: string,
  identifier: string,
  prevState: TransactionState,
  formData: FormData,
) {
  var transformedData = await transformEditData(formData, id);
  const validatedFields = TransactionSchema.safeParse(transformedData);

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to edit var.',
    };
  }

  // TODO: provide logic
  var data = convertData(validatedFields.data);
  const { error } = await editTransaction(data, id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {} as TransactionState;
}

export async function selectWhereTransactionValidation(
  id: string,
  identifier: string,
) {
  // TODO: provide logic
  const { data, error } = await selectWhereTransaction(id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    data: data,
  };
}

export async function selectAllTransactionValidation() {
  // TODO: provide logic
  const { data, error } = await selectAllTransaction();
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    data: data,
  };
}

export async function deleteTransactionValidation(
  id: string,
  identifier: string,
) {
  const data = await selectWhereTransactionValidation(id, identifier)!;
  const itemListId = data.data![0].item_list_id;
  await deleteItemListValidation(itemListId, 'item_id');

  // TODO: provide logic
  const { error } = await deleteTransaction(id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    message: null,
  };
}

export async function createTransaction(data: any) {
  return await query.insert(schema, data);
}

export async function editTransaction(
  data: any,
  id: string,
  identifier: string,
) {
  return await query.edit(schema, data, identifier, id);
}

export async function deleteTransaction(id: string, identifier: string) {
  return await query.remove(schema, identifier, id);
}

export async function selectWhereTransaction(id: string, identifier: string) {
  return await query.selectWhere(schema, identifier, id);
}

export async function selectAllTransaction() {
  return await query.selectAll(schema);
}
