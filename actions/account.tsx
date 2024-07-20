'use server';

import { StaffSchema, UserFormSchema, EditUserFormSchema, staffType, addUserType, AddUserFormSchema } from "@/lib/definitions";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/utils/supabase/server";
import { unstable_noStore as noStore } from "next/cache";
import { insert, remove } from "@/lib/supabase";

export type AccountState = {
  errors?: {
    email?: string[];
    password?: string[];
    first_name?: string[];
    last_name?: string[];
  };
  message?: string | null;
};

export type RegisterAccountState = {
  errors?: {
    staff_name?: string[];
    staff_position?: string[];
  };
  message?: string | null;
};

export async function createAccount(
  prevState: AccountState,
  formData: FormData,
) {
  const supabase = createAdminClient();
  const validatedFields = AddUserFormSchema.safeParse(
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

  await createAccountDb(validatedFields.data, data.user.id);

  revalidatePath('/accounts');
  return {
    message: null,
  };
}

export async function editAccount(
  id: string,
  prevState: AccountState,
  formData: FormData,
) {
  const supabase = createAdminClient();
  const validatedFields = EditUserFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to edit event.',
    };
  }

  const { error } = await supabase.auth.admin.updateUserById(id, {
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  });

  if (error) {
    throw new Error(error.message);
  }

  await editAccountDb(
    { ...validatedFields.data, password: validatedFields.data.password || '' },
    id,
  );


  revalidatePath('/accounts');
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

//TODO: do it clyde
export async function registerAccount(id: string, prevState: RegisterAccountState, formData: FormData) {
  const validatedFields = StaffSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to register account.',
    };
  }

  await createStaff(validatedFields.data, id)

  revalidatePath('/accounts');
  return {
    message: null,
  };
}

export async function createStaff(data: staffType, userId: string) {
  const supabase = createAdminClient()
  const { data: staffData, error: staffError } = await insert('staffs', {
    staff_name: data.staff_name,
    staff_position: data.staff_position.toUpperCase(),
  });

  console.log(staffData)
  console.log(userId)

  if (staffError) {
    console.log(staffError)
  }


  await supabase
    .from('users')
    .update({ staff_id: staffData.staff_id })
    .eq('user_id', userId)
    .select()
}

export async function getUserStaff(uuid: string) {
  noStore();
  const { data, error } = await selectOneAccountDb(uuid);

  if (error) {
    throw new Error(error.message);
  }

  return data?.map(user => {
    return {
      staff_name: user.staff_name,
      position: user.staff_position && user.staff_position.toLowerCase(),
    };
  })[0];
}

export async function getUsers() {
  noStore();
  const { data, error } = await selectAllAccountDb();

  if (error) {
    throw new Error(error.message);
  }

  return data?.map(user => {
    return {
      email: user.email,
      uuid: user.uuid,
      first_name: user.first_name,
      last_name: user.last_name,
      id: user.uuid,
      position: user.staff_position && user.staff_position.toLowerCase(),
    };
  });
}

export async function getUser(uuid: string) {
  noStore();
  const { data, error } = await selectOneAccountDb(uuid);

  if (error) {
    throw new Error(error.message);
  }

  return data?.map(user => {
    return {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      position: user.staff_position && user.staff_position.toLowerCase(),
    };
  })[0];
}


async function createAccountDb(data: addUserType, userId: string) {
  const { error: userError } = await insert('users', {
    first_name: data.first_name,
    last_name: data.last_name,
    user_id: userId,
  });

  if (userError) {
    console.log(userError);
  }
}

async function editAccountDb(data: addUserType, uuid: string) {
  const supabase = createAdminClient();
  const { data: userData, error } = await supabase
    .from('users')
    .update({
      first_name: data.first_name,
      last_name: data.last_name,
    })
    .eq('user_id', uuid)
    .select();

  if (!userData) {
    return;
  }

  if (error) {
    return error;
  }
}

async function deleteAccountDb(data: addUserType, id: string) {
  return remove('varSchema', 'var_id', id);
}

async function selectOneAccountDb(uuid: string) {
  const supabase = createAdminClient();
  let { data, error } = await supabase
    .from('users_view')
    .select('*')
    .eq('uuid', uuid);

  return { data: data, error: error };
}

async function selectAllAccountDb() {
  const supabase = createAdminClient();
  let { data, error } = await supabase.from('users_view').select(`
    *
  `);
  return { data: data, error: error };
}
