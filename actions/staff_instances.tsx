// INSTRUCTIONS:
// staffInstance -> small case
// StaffInstance -> big case
// replace vals with column names
// remove comments after

import { StaffInstanceSchema } from '@/lib/definitions';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import * as query from '@/lib/supabase';
import * as staffListQuery from '@/actions/staff_lists';
import * as staffQuery from '@/actions/staffs';

export type staffInstanceState = {
  errors?: {
    staff_instance_id?: string[];
  };
  message?: string | null;
};

var staffInstanceFormat = {
  staff_instance_id: null,

  /*
    CREATE TABLE IF NOT EXISTS staff_instances
    (
        staff_instance_id VARCHAR(25),
        PRIMARY KEY (staff_instance_id)
    );
  */
};

var schema = 'staff_instances'; // replace with table name

export async function createStaffInstanceValidation(
  staff_list_id: any,
  staff_id: any,
) {
  var staffInstanceData = await selectAllStaffInstanceValidation();
  var id_mod = 10000;
  if (staffInstanceData.data) {
    if (staffInstanceData.data.length > 0) {
      for (let i = 0; i < staffInstanceData.data!.length; i++) {
        var num = parseInt(
          staffInstanceData.data[i].staff_instance_id.slice(6),
        );
        if (num > id_mod) {
          id_mod = num;
        }
      }
      id_mod += 1;
    }
  }

  var data = {
    staff_instance_id: `stain_${id_mod}`,
    staff_id: staff_id,
    staff_list_id: staff_list_id,
  };
  console.log(data);

  const { error } = await createStaffInstance(data);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    message: null,
  };
}

export async function selectWhereStaffInstanceValidation(
  id: string,
  identifier: string,
) {
  // TODO: provide logic
  const { data, error } = await selectWhereStaffInstance(id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    data: data,
  };
}

export async function selectAllStaffInstanceValidation() {
  // TODO: provide logic
  const { data, error } = await selectAllStaffInstance();
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    data: data,
  };
}

export async function deleteStaffInstanceValidation(
  id: string,
  identifier: string,
) {
  // TODO: provide logic
  const { error } = await deleteStaffInstance(id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    message: null,
  };
}

export async function createStaffInstance(data: any) {
  return await query.insert(schema, data);
}

export async function editStaffInstance(
  data: any,
  id: string,
  identifier: string,
) {
  return await query.edit(schema, data, identifier, id);
}

export async function deleteStaffInstance(id: string, identifier: string) {
  return await query.remove(schema, identifier, id);
}

export async function selectWhereStaffInstance(id: string, identifier: string) {
  return await query.selectWhere(schema, identifier, id);
}

export async function selectAllStaffInstance() {
  return await query.selectAll(schema);
}
