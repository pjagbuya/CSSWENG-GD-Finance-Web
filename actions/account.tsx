'use server';

import { UserSchema, UserSchemaEdit, userType } from "@/lib/definitions";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/utils/supabase/server";
import { unstable_noStore as noStore } from "next/cache";
import { query } from "@/lib/supabase";
import { use } from "react";

export type AccountState = {
  errors?: {
    email?: string[];
    password?: string[];
    first_name?: string[];
    last_name?: string[];
    role?: string[];
  };
  message?: string | null;
};

export async function createAccount(
  prevState: AccountState,
  formData: FormData,
) {
  const supabase = createAdminClient();
  const validatedFields = UserSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to create event.',
    };
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email: validatedFields.data.email,
    password: validatedFields.data.password,
    email_confirm: true,
  });
  if (error) {
    throw new Error(error.message);
  }

  await createAccountDb(validatedFields.data, data.user.id)

  revalidatePath("/accounts")
  return {
    message: null,
  };
}

export async function editAccount(id: string, prevState: AccountState, formData: FormData) {
  const supabase = createAdminClient()
  const validatedFields = UserSchemaEdit.safeParse(Object.fromEntries(formData.entries()))

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to edit event.',
    };
  }


  const { error } = await supabase.auth.admin.updateUserById(id, { email: validatedFields.data.email, password: validatedFields.data.password })

  if (error) {
    throw new Error(error.message);
  }


  const userError = await editAccountDb({ ...validatedFields.data, password: validatedFields.data.password || '' }, id)

  if (userError) {
    throw new Error(userError.message)
  }

  revalidatePath("/accounts")
  return {
    message: null,
  };
}

export async function deleteAccount(id: string) {
  const supabase = createAdminClient();

  const { error } = await supabase.auth.admin.deleteUser(id, true);
  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/accounts');
}

export async function getUsers() {
  noStore()
  const { data, error } = await selectAllAccountDb()

  if (error) {
    throw new Error(error.message);
  }

  return data?.map((user) => {
    return {
      email: user.email,
      uuid: user.uuid,
      first_name: user.first_name,
      last_name: user.last_name,
      id: user.staff_id,
      position: user.staff_position && user.staff_position.toLowerCase()
    }
  })
}

export async function getUser(uuid: string) {
  noStore()
  const { data, error } = await selectOneAccountDb(uuid)

  if (error) {
    throw new Error(error.message);
  }

  return data?.map((user) => {
    return {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      position: user.staff_position && user.staff_position.toLowerCase()
    }
  })[0]
}

async function createAccountDb(data: userType, userId: string) {
  const { data: staffData, error: staffError } = await query.insert('staffs', {
    staff_position: data.role.toUpperCase(),
  });

  if (!staffData) {
    return
  }

  if (staffError) {
    console.log(staffError)
  }

  const { error: userError } = await query.insert('users', {
    first_name: data.first_name,
    last_name: data.last_name,
    user_id: userId,
    staff_id: staffData.staff_id
  });

  if (userError) {
    console.log(userError)
  }

}

async function editAccountDb(data: userType, uuid: string) {
  const supabase = createAdminClient()
  const { data: userData, error } = await supabase
    .from('users')
    .update({
      'first_name': data.first_name,
      'last_name': data.last_name,
    })
    .eq('user_id', uuid)
    .select()

  if (!userData) {
    return
  }

  if (error) {
    return error
  }

  const { error: staffError } = await supabase
    .from('staffs')
    .update({
      'staff_position': data.role
    })
    .eq('staff_id', userData[0].staff_id)

  return staffError
}

async function deleteAccountDb(data: userType, id: string) {
  return query.remove('varSchema', 'var_id', id);
}

async function selectOneAccountDb(uuid: string) {
  const supabase = createAdminClient()
  let { data, error } = await supabase
    .from('users_view')
    .select('*')
    .eq('uuid', uuid)

  return { data: data, error: error }
}

async function selectAllAccountDb() {
  const supabase = createAdminClient()
  let { data, error } = await supabase
    .from('users_view')
    .select(`
    *
  `)
  return { data: data, error: error }
}
