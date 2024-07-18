import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

async function insert(schema: any, data: any) {
  const { data: result, error } = await supabase.from(schema).insert(data).select()
  return { data: result ? result[0] : null, error: error }
}

async function edit(schema: any, data: any, column: any, value: any) {
  const { data: result, error } = await supabase.from(schema).update(data).eq(column, value)
  return { data: result ? result[0] : null, error: error }
}

async function remove(schema: any, column: any, value: any) {
  const { data: result, error }  = await supabase.from(schema).delete().eq(column, value)
  return { data: result ? result[0] : null, error: error }
}

async function selectAll(schema: any) {
  const { data, error } = await supabase.from(schema).select()
  return { data, error }
}

async function selectWhere(schema: any, column: any, value: any) {
  const { data, error } = await supabase.from(schema).select().eq(column, value)
  return { data, error }
}

export const query = {
  insert, edit, remove, selectAll, selectWhere
}
/*
const { data, error } = await supabase.from(schema).select().eq(column, var)
const { error } = await supabase.from(schema).insert(data)
const { error } = await supabase.from(schema).update(data).eq(column, value)
const { error } = await supabase.from(schema).delete().eq(column, var)
*/
