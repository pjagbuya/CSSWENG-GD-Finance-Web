'use server';
// INSTRUCTIONS:
// fundTransfer -> small case
// FundTransfer -> big case
// replace vals with column names
// remove comments after

import { FundTransferSchema } from '@/lib/definitions';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { date } from 'zod';
import * as query from '@/lib/supabase';
import * as categoryQuery from './categories';
import * as eventQuery from './events';
import * as staffQuery from './staffs';
import * as staffListQuery from './staff_lists';
import * as staffInstanceQuery from './staff_instances';
import { createClient } from '@/utils/supabase/server';

export type fundTransferState = {
  errors?: {
    ft_id?: string[];
    ft_name?: string[];
    ft_date?: string[];
    ft_reason?: string[];
    ft_amount?: string[];
    ft_to?: string[];
    ft_from?: string[];
    fr_on?: string[];
    receipt_link?: string[];
    // prepared_staff_id?: string[];
    certified_staff_id?: string[];
    noted_staff_list_id?: string[];
    // form_list_id?: string[];
  };
  message?: string | null;
};

var fundTransferFormat = {
  ft_id: null,
  ft_name: null,
  ft_date: null,
  ft_reason: null,
  ft_amount: null,
  ft_to: null,
  ft_from: null,
  fr_on: null,
  receipt_link: null,
  prepared_staff_id: null,
  certified_staff_id: null,
  noted_staff_list_id: null,
  form_list_id: null,

  /*
    CREATE TABLE IF NOT EXISTS fund_transfers
  (
      ft_id VARCHAR(25),
      ft_name VARCHAR(55),
      ft_date DATE,
      ft_reason VARCHAR(105),
      ft_amount VARCHAR(105),
      ft_to VARCHAR(105),
      ft_from VARCHAR(105),
      fr_on VARCHAR(105),
      receipt_link VARCHAR(55),
      prepared_staff_id VARCHAR(25),
      certified_staff_id VARCHAR(25),
      noted_staff_list_id VARCHAR(25),
      form_list_id VARCHAR(25),
      FOREIGN KEY (td_id) REFERENCES transaction_details(td_id),
      FOREIGN KEY (prepared_staff_id) REFERENCES staffs(staff_id),
      FOREIGN KEY (certified_staff_id) REFERENCES staffs(staff_id),
      FOREIGN KEY (noted_staff_id) REFERENCES staff_lists(staff_list_id),
      FOREIGN KEY (form_list_id) REFERENCES form_lists(form_list_id),
      PRIMARY KEY (ft_id)
  );
  */
};

var schema = 'fund_transfers'; // replace with table name

async function transformCreateData(data: any, event_id: string) {
  // TODO: provide logic

  const supabase = createClient();
  const currentUser = (await supabase.auth.getUser()).data.user;

  var ftData = await selectAllFundTransferValidation();
  var id_mod = 10000;
  if (ftData.data) {
    if (ftData.data.length > 0) {
      for (let i = 0; i < ftData.data.length; i++) {
        var num = parseInt(ftData.data[i].ft_id.slice(6));
        if (num > id_mod) {
          id_mod = num;
        }
      }
      id_mod += 1;
    }
  }

  var staffListData = await staffListQuery.selectAllStaffListValidation();
  var id_mod_staff = 10000;
  if (staffListData.data) {
    if (staffListData.data.length > 0) {
      for (let i = 0; i < staffListData.data.length; i++) {
        var num = parseInt(staffListData.data[i].staff_list_id.slice(4));
        if (num > id_mod_staff) {
          id_mod_staff = num;
        }
      }
      id_mod_staff += 1;
    }
  }

  var form_list_id;

  var eventData = await eventQuery.selectWhereEventValidation(
    event_id,
    'event_id',
  );
  if (eventData.data) {
    form_list_id = eventData.data[0].ft_form_list_id;
  }

  var preparedStaff = await staffQuery.selectWhereStaffValidation(
    currentUser?.id!,
    'user_id',
  );

  // TODO: fill information
  if (preparedStaff.data) {
    return {
      ft_id: `funtr_${id_mod}`,
      ft_name: data.get('ft_name'),
      ft_date: data.get('ft_date'),
      ft_reason: data.get('ft_reason'),
      ft_amount: data.get('ft_amount'),
      ft_to: data.get('ft_to'),
      ft_from: data.get('ft_from'),
      ft_on: data.get('ft_on'),
      receipt_link: data.get('receipt_link'),
      prepared_staff_id: preparedStaff.data[0].staff_id,
      certified_staff_id: null,
      noted_staff_list_id: `stl_${id_mod_staff}`,
      form_list_id: form_list_id,
    };
  }
  return null;
}

async function transformEditData(data: any, id: string) {
  // TODO: provide logic
  var ftData = await selectWhereFundTransferValidation(id, 'ft_id');

  // TODO: fill information
  if (ftData.data) {
    return {
      ft_id: ftData.data[0].ft_id,
      ft_name: data.get('ft_name'),
      ft_date: data.get('ft_date'),
      ft_reason: data.get('ft_reason'),
      ft_amount: data.get('ft_amount'),
      ft_to: data.get('ft_to'),
      ft_from: data.get('ft_from'),
      ft_on: data.get('ft_on'),
      receipt_link: data.get('receipt_link'),
      prepared_staff_id: ftData.data[0].prepared_staff_id,
      certified_staff_id: data.get('certified_staff_id'),
      noted_staff_list_id: ftData.data[0].noted_staff_list_id,
      form_list_id: ftData.data[0].form_list_id,
    };
  }
  return null;
}

async function convertData(data: any) {
  // TODO: provide logic

  // JUST IN CASE: needs to do something with other data of validated fields
  return data;
}

export async function createFundTransferValidation(
  prevState: fundTransferState,
  formData: FormData,
  event_id: string,
) {
  var transformedData = await transformCreateData(formData, event_id);
  const validatedFields = FundTransferSchema.safeParse(transformedData);

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to create var.',
    };
  }

  // TODO: provide logic
  var data = await convertData(transformedData);

  await staffListQuery.createStaffList({
    staff_list_id: data.noted_staff_list_id,
  });

  const { error } = await createFundTransfer(data);
  if (error) {
    console.log(error.message);
    // throw new Error(error.message);
  }

  revalidatePath(`/events/${event_id}/forms`);
  return {
    message: null,
  };
}

export async function editFundTransferValidation(
  eventId: string,
  id: string,
  identifier: string,
  prevState: fundTransferState,
  formData: FormData,
) {
  var arrData = Array.from(formData.entries());

  const notedList = [];
  for (let i = 0; i < arrData.length; i++) {
    if (arrData[i][0].substring(0, 20) === 'noted_staff_list_id-') {
      notedList.push(arrData[i][0].substring(20));
    }
  }

  var transformedData = await transformEditData(formData, id);
  const validatedFields = FundTransferSchema.safeParse(transformedData);

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Unable to edit var.',
    };
  }

  // TODO: provide logic
  var data = await convertData(transformedData);

  await staffInstanceQuery.deleteStaffInstanceValidation(
    data.noted_staff_list_id,
    'staff_list_id',
  );

  for (let i = 0; i < notedList.length; i++) {
    await staffInstanceQuery.createStaffInstanceValidation(
      data.noted_staff_list_id,
      notedList[i],
    );
  }

  const { error } = await editFundTransfer(data, id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  redirect(`/events/${eventId}/forms`);
  return {
    message: null,
  };
}

export async function selectWhereFundTransferValidation(
  id: string,
  identifier: string,
) {
  // TODO: provide logic
  const { data, error } = await selectWhereFundTransfer(id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    data: data,
  };
}

export async function selectAllFundTransferValidation() {
  // TODO: provide logic
  const { data, error } = await selectAllFundTransfer();
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    data: data,
  };
}

export async function deleteFundTransferValidation(
  id: string,
  identifier: string,
) {
  // TODO: provide logic
  const { error } = await deleteFundTransfer(id, identifier);
  if (error) {
    throw new Error(error.message);
  }

  //revalidatePath("/")
  return {
    message: null,
  };
}

export async function createFundTransfer(data: any) {
  console.log(data);
  return await query.insert(schema, data);
}

export async function editFundTransfer(
  data: any,
  id: string,
  identifier: string,
) {
  return await query.edit(schema, data, identifier, id);
}

export async function deleteFundTransfer(id: string, identifier: string) {
  return await query.remove(schema, identifier, id);
}

export async function selectWhereFundTransfer(id: string, identifier: string) {
  return await query.selectWhere(schema, identifier, id);
}

export async function selectAllFundTransfer() {
  return await query.selectAll(schema);
}
