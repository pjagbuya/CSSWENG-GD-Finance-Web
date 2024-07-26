'use server';

import * as eventQuery from '@/actions/events';
import * as formListQuery from '@/actions/form_lists';
import * as fundTransferQuery from '@/actions/fund_transfers';
import * as expenseStatementQuery from '@/actions/expense_statements';
import * as revenueStatementQuery from '@/actions/revenue_statements';
import * as activityIncomeQuery from '@/actions/activity_incomes';
import * as staffQuery from '@/actions/staffs';
import * as staffListQuery from '@/actions/staff_lists';
import * as staffInstanceQuery from '@/actions/staff_instances';
import * as categoryQuery from '@/actions/categories';
import * as transactionListQuery from '@/actions/transaction_lists';
import * as transactionQuery from '@/actions/transactions';
import * as itemListQuery from '@/actions/item_lists';
import * as itemQuery from '@/actions/items';
import * as accountQuery from '@/actions/account';
import * as query from '@/lib/supabase';
import { createClient } from '@/utils/supabase/server';
import { unstable_noStore as noStore } from 'next/cache';

//-------------------------------------------------------------------
//          Dashboard Functions
//-------------------------------------------------------------------

// get specific form from event

// gets AI form of Event ID
export async function getAIFormFromEvent(event_id: any) {
  let eventData = await eventQuery.selectWhereEventValidation(
    event_id,
    'event_id',
  );

  if (eventData.data) {
    let form_list_id = eventData.data[0].ai_form_list_id;
    return await activityIncomeQuery.selectWhereActivityIncomeValidation(
      form_list_id,
      'form_list_id',
    );
  }
  return null;
}

// gets ES forms of Event ID
export async function getESFormFromEvent(event_id: any) {
  let eventData = await eventQuery.selectWhereEventValidation(
    event_id,
    'event_id',
  );
  if (eventData.data) {
    let form_list_id = eventData.data[0].es_form_list_id;
    return await expenseStatementQuery.selectWhereExpenseStatementValidation(
      form_list_id,
      'form_list_id',
    );
  }
  return null;
}

// gets RS forms of Event ID
export async function getRSFormFromEvent(event_id: any) {
  let eventData = await eventQuery.selectWhereEventValidation(
    event_id,
    'event_id',
  );
  if (eventData.data) {
    let form_list_id = eventData.data[0].rs_form_list_id;
    return await revenueStatementQuery.selectWhereRevenueStatementValidation(
      form_list_id,
      'form_list_id',
    );
  }
  return null;
}

// gets FT forms of Event ID
export async function getFTFormFromEvent(event_id: any) {
  noStore();
  let eventData = await eventQuery.selectWhereEventValidation(
    event_id,
    'event_id',
  );
  console.log(eventData);
  if (eventData.data) {
    let form_list_id = eventData.data[0].ft_form_list_id;
    return await fundTransferQuery.selectWhereFundTransferValidation(
      form_list_id,
      'form_list_id',
    );
  }
  return null;
}

// get specific category from event

// gets Expense Categories of Event ID
export async function getExpenseCategoryFromEvent(event_id: any) {
  const supabase = createClient();

  return await supabase
    .from('categories')
    .select()
    .eq('event_id', event_id)
    .eq('category_type', 'expense');
}

// gets Revenue Categories of Event ID
export async function getRevenueCategoryFromEvent(event_id: any) {
  const supabase = createClient();

  return await supabase
    .from('categories')
    .select()
    .eq('event_id', event_id)
    .eq('category_type', 'revenue');
}

// get specific transaction from category

// gets Transactions of Category ID
export async function getTransactionsFromCategory(category_id: any) {
  let categoryData = await categoryQuery.selectWhereCategoryValidation(
    category_id,
    'category_id',
  );
  if (categoryData.data) {
    let transaction_list_id = categoryData.data[0].transaction_list_id;
    return await transactionQuery.selectWhereTransactionValidation(
      transaction_list_id,
      'transaction_list_id',
    );
  }
  return null;
}

// get specific item from transaction

// gets Items from Transaction ID
export async function getItemsFromTransaction(transaction_id: any) {
  let transactionData = await transactionQuery.selectWhereTransactionValidation(
    transaction_id,
    'transaction_id',
  );
  if (transactionData.data) {
    let item_list_id = transactionData.data[0].item_list_id;
    return await itemQuery.selectWhereItemValidation(
      item_list_id,
      'item_list_id',
    );
  }
  return null;
}

// get specific item from category

// gets Items from Category ID
export async function getItemsFromCategory(category_id: any) {
  let itemList = [];
  let categoryData = await categoryQuery.selectWhereCategoryValidation(
    category_id,
    'category_id',
  );
  if (categoryData.data) {
    let transaction_list_id = categoryData.data[0].transaction_list_id;
    let transactionData =
      await transactionQuery.selectWhereTransactionValidation(
        transaction_list_id,
        'transaction_list_id',
      );
    if (transactionData.data) {
      for (let i = 0; i < transactionData.data.length; i++) {
        let item_list_id = transactionData.data[i].item_list_id;
        let itemData = await itemQuery.selectWhereItemValidation(
          item_list_id,
          'item_list_id',
        );
        if (itemData.data) {
          for (let j = 0; j < itemData.data.length; j++) {
            itemList.push(itemData.data[j]);
          }
        }
      }
    }
  }
  if (itemList.length > 0) {
    return itemList;
  }
  return null;
}

// get staff info

export async function getStaffInfos(staffData: any) {
  const staffInfo = [];
  if (staffData.data) {
    for (let i = 0; i < staffData.data.length; i++) {
      var userData = await accountQuery.selectOneUser(
        staffData.data[i].user_id,
      );
      console.log(userData);
      if (userData) {
        if (staffData.data[i].staff_status) {
          staffInfo.push({
            staff_id: staffData.data[i].staff_id,
            user_id: staffData.data[i].user_id,
            user_first_name: userData[0].user_first_name,
            user_last_name: userData[0].user_last_name,
            staff_position: staffData.data[i].staff_position,
          });
        }
      }
    }
  }
  return staffInfo;
}

export async function getStaffInfo(staffData: any) {
  if (staffData.data) {
    var userData = await accountQuery.selectOneUser(staffData.data[0].user_id);
    console.log(userData);
    if (userData) {
      return {
        staff_id: staffData.data[0].staff_id,
        user_id: staffData.data[0].user_id,
        user_first_name: userData[0].user_first_name,
        user_last_name: userData[0].user_last_name,
        staff_position: staffData.data[0].staff_position,
      };
    }
  }
  return null;
}

// get specific staff from form

// get Prepared Staff from Form Id
export async function getPreparedStaffFromEvent(
  form_id: any,
  form_type: string,
) {
  let formData;
  switch (form_type) {
    case 'ai':
      formData = await activityIncomeQuery.selectWhereActivityIncomeValidation(
        form_id,
        'ai_id',
      );
      if (formData.data) {
        let staff_id = formData.data[0].prepared_staff_id;
        return await staffQuery.selectWhereStaffValidation(
          staff_id,
          'staff_id',
        );
      }
      break;
    case 'es':
      formData =
        await expenseStatementQuery.selectWhereExpenseStatementValidation(
          form_id,
          'es_id',
        );
      if (formData.data) {
        let staff_id = formData.data[0].prepared_staff_id;
        return await staffQuery.selectWhereStaffValidation(
          staff_id,
          'staff_id',
        );
      }
      break;
    case 'rs':
      formData =
        await revenueStatementQuery.selectWhereRevenueStatementValidation(
          form_id,
          'rs_id',
        );
      if (formData.data) {
        let staff_id = formData.data[0].prepared_staff_id;
        return await staffQuery.selectWhereStaffValidation(
          staff_id,
          'staff_id',
        );
      }
      break;
    case 'ft':
      formData = await fundTransferQuery.selectWhereFundTransferValidation(
        form_id,
        'ft_id',
      );
      if (formData.data) {
        let staff_id = formData.data[0].prepared_staff_id;
        return await staffQuery.selectWhereStaffValidation(
          staff_id,
          'staff_id',
        );
      }
      break;
  }
  return null;
}

// get Certified Staff from Form Id
export async function getCertifiedStaffFromEvent(
  form_id: any,
  form_type: string,
) {
  let formData;
  switch (form_type) {
    case 'ai':
      formData = await activityIncomeQuery.selectWhereActivityIncomeValidation(
        form_id,
        'ai_id',
      );
      if (formData.data) {
        let staff_id = formData.data[0].certified_staff_id;
        return await staffQuery.selectWhereStaffValidation(
          staff_id,
          'staff_id',
        );
      }
      break;
    case 'es':
      formData =
        await expenseStatementQuery.selectWhereExpenseStatementValidation(
          form_id,
          'es_id',
        );
      if (formData.data) {
        let staff_id = formData.data[0].certified_staff_id;
        return await staffQuery.selectWhereStaffValidation(
          staff_id,
          'staff_id',
        );
      }
      break;
    case 'rs':
      formData =
        await revenueStatementQuery.selectWhereRevenueStatementValidation(
          form_id,
          'rs_id',
        );
      if (formData.data) {
        let staff_id = formData.data[0].certified_staff_id;
        return await staffQuery.selectWhereStaffValidation(
          staff_id,
          'staff_id',
        );
      }
      break;
    case 'ft':
      formData = await fundTransferQuery.selectWhereFundTransferValidation(
        form_id,
        'ft_id',
      );
      if (formData.data) {
        let staff_id = formData.data[0].certified_staff_id;
        return await staffQuery.selectWhereStaffValidation(
          staff_id,
          'staff_id',
        );
      }
      break;
  }
  return null;
}

// get Noted Staff from Form Id
export async function getNotedStaffFromEvent(form_id: any, form_type: string) {
  let formData;
  switch (form_type) {
    case 'ai':
      formData = await activityIncomeQuery.selectWhereActivityIncomeValidation(
        form_id,
        'ai_id',
      );
      if (formData.data) {
        let staff_list_id = formData.data[0].noted_staff_list_id;
        return await staffInstanceQuery.selectWhereStaffInstanceValidation(
          staff_list_id,
          'staff_list_id',
        );
      }
      break;
    case 'es':
      formData =
        await expenseStatementQuery.selectWhereExpenseStatementValidation(
          form_id,
          'es_id',
        );
      if (formData.data) {
        let staff_list_id = formData.data[0].noted_staff_list_id;
        return await staffInstanceQuery.selectWhereStaffInstanceValidation(
          staff_list_id,
          'staff_list_id',
        );
      }
      break;
    case 'rs':
      formData =
        await revenueStatementQuery.selectWhereRevenueStatementValidation(
          form_id,
          'rs_id',
        );
      if (formData.data) {
        let staff_list_id = formData.data[0].noted_staff_list_id;
        return await staffInstanceQuery.selectWhereStaffInstanceValidation(
          staff_list_id,
          'staff_list_id',
        );
      }
      break;
    case 'ft':
      formData = await fundTransferQuery.selectWhereFundTransferValidation(
        form_id,
        'ft_id',
      );
      if (formData.data) {
        let staff_list_id = formData.data[0].noted_staff_list_id;
        return await staffInstanceQuery.selectWhereStaffInstanceValidation(
          staff_list_id,
          'staff_list_id',
        );
      }
      break;
  }
  return null;
}

//-------------------------------------------------------------------
//          Activity Income Functions
//-------------------------------------------------------------------

// gets Expense Items from event ID
export async function getExpenseItemsFromEvent(event_id: any) {
  let itemList = [];
  let categoryData = await getExpenseCategoryFromEvent(event_id);
  if (categoryData.data) {
    for (let i = 0; i < categoryData.data.length; i++) {
      let category_id = categoryData.data[i].category_id;
      let itemData = await getItemsFromCategory(category_id);
      if (itemData) {
        for (let j = 0; j < itemData.length; j++) {
          itemList.push(itemData[j]);
        }
      }
    }
  }
  if (itemList.length > 0) {
    return itemList;
  }
  return null;
}

// gets Revenue Items from event ID
export async function getRevenueItemsFromEvent(event_id: any) {
  let itemList = [];
  let categoryData = await getRevenueCategoryFromEvent(event_id);
  if (categoryData.data) {
    for (let i = 0; i < categoryData.data.length; i++) {
      let category_id = categoryData.data[i].category_id;
      let itemData = await getItemsFromCategory(category_id);
      if (itemData) {
        for (let j = 0; j < itemData.length; j++) {
          itemList.push(itemData[j]);
        }
      }
    }
  }
  if (itemList.length > 0) {
    return itemList;
  }
  return null;
}

// gets Expense Total from event ID
export async function getExpenseTotalFromEvent(event_id: any) {
  let itemList = await getExpenseItemsFromEvent(event_id);
  let total = 0;
  if (itemList) {
    for (let i = 0; i < itemList.length; i++) {
      total += itemList[i].item_amount;
    }
  }
  return total;
}

// gets Revenue Total from event ID
export async function getRevenueTotalFromEvent(event_id: any) {
  let itemList = await getRevenueItemsFromEvent(event_id);
  let total = 0;
  if (itemList) {
    for (let i = 0; i < itemList.length; i++) {
      total += itemList[i].item_amount;
    }
  }
  return total;
}

//-------------------------------------------------------------------
//          Form Functions
//-------------------------------------------------------------------

// transforms header data
export async function getFormHeaderData(form_id: string) {
  var formType;
  switch (form_id.substring(0, 5)) {
    case 'actin':
      formType = 'Activity Income';
      break;
    case 'expst':
      formType = 'Expense Statement';
      break;
    case 'revst':
      formType = 'Revenue Statement';
      break;
    case 'funtr':
      formType = 'Fund Transfer';
      break;
  }

  var academicYear;
  if (new Date().getMonth() < 8) {
    academicYear = `YEAR${new Date().getFullYear()}-${new Date().getFullYear() + 1}`;
  } else {
    academicYear = `YEAR${new Date().getFullYear() - 1}-${new Date().getFullYear()}`;
  }

  return {
    academicYear: academicYear,
    formType: formType,
    formCode: form_id,
  };
}

// transforms footer data
export async function getFormFooterData(form_id: string) {
  var formFooter = [];
  var formData;
  if (form_id) {
    switch (form_id.substring(0, 5)) {
      case 'expst':
        {
          formData =
            await expenseStatementQuery.selectWhereExpenseStatementValidation(
              form_id,
              'es_id',
            );
        }
        break;
      case 'revst':
        {
          formData =
            await revenueStatementQuery.selectWhereRevenueStatementValidation(
              form_id,
              'rs_id',
            );
        }
        break;
      case 'actin':
        {
          formData =
            await activityIncomeQuery.selectWhereActivityIncomeValidation(
              form_id,
              'ai_id',
            );
        }
        break;
      case 'funtr':
        {
          formData = await fundTransferQuery.selectWhereFundTransferValidation(
            form_id,
            'ft_id',
          );
        }
        break;
    }
    if (formData) {
      if (formData.data) {
        if (formData.data[0].prepared_staff_id) {
          var preparedStaff = await staffQuery.selectWhereStaffValidation(
            formData.data[0].prepared_staff_id,
            'staff_id',
          );
          var preparedData = await getStaffInfo(preparedStaff);
          if (preparedData) {
            formFooter.push({
              id: formData.data[0].prepared_staff_id,
              message: 'Prepared By:',
              name:
                preparedData.user_first_name +
                ' ' +
                preparedData.user_last_name,
              position: preparedData.staff_position,
            });
          }
        }

        if (formData.data[0].certified_staff_id) {
          var certifiedStaff = await staffQuery.selectWhereStaffValidation(
            formData.data[0].certified_staff_id,
            'staff_id',
          );
          var certifiedData = await getStaffInfo(certifiedStaff);

          if (certifiedData) {
            formFooter.push({
              id: formData.data[0].certified_staff_id,
              message: 'Certified By:',
              name:
                certifiedData.user_first_name +
                ' ' +
                certifiedData.user_last_name,
              position: certifiedData.staff_position,
            });
          }
        }

        var notedStaffList =
          await staffInstanceQuery.selectWhereStaffInstanceValidation(
            formData.data[0].noted_staff_list_id,
            'staff_list_id',
          );
        if (notedStaffList.data) {
          for (let i = 0; i < notedStaffList.data.length; i++) {
            var notedStaff = await staffQuery.selectWhereStaffValidation(
              notedStaffList.data[i].staff_id,
              'staff_id',
            );
            var notedData = await getStaffInfo(notedStaff);
            if (notedData) {
              formFooter.push({
                id: notedStaffList.data[i].staff_id,
                message: 'Noted By:',
                name:
                  notedData.user_first_name + ' ' + notedData.user_last_name,
                position: notedData.staff_position,
              });
            }
          }
        }
      }
    }
  }
  return formFooter;
}

// transforms Activity Income body data
export async function getAIBodyData(form_id: string) {
  var formData = await activityIncomeQuery.selectWhereActivityIncomeValidation(
    form_id,
    'ai_id',
  );
  if (formData.data) {
    var eventData = await eventQuery.selectWhereEventValidation(
      formData.data[0].form_list_id,
      'ai_form_list_id',
    );
    if (eventData.data) {
      return {
        title: [
          {
            message: 'Activity Title:',
            description: eventData.data[0].event_name,
          },
          {
            message: 'Activity Date:',
            description: eventData.data[0].event_date,
          },
        ],
        event_id: eventData.data[0].event_id,
        notes: formData.data[0].ai_notes,
      };
    }
  }
  return null;
}

// transforms Expense Statement body items
export async function getESBodyItems(form_id: string) {
  var formData =
    await expenseStatementQuery.selectWhereExpenseStatementValidation(
      form_id,
      'es_id',
    );
  if (formData.data) {
    var items = await getItemsFromCategory(formData.data[0].category_id);
    return items;
  }
  return null;
}

// transforms Expense Statement body data
export async function getESBodyData(form_id: string) {
  var formData =
    await expenseStatementQuery.selectWhereExpenseStatementValidation(
      form_id,
      'es_id',
    );
  if (formData.data) {
    return [
      {
        message: 'Receipt link:',
        description: formData.data[0].receipt_link,
      },
      {
        message: 'Transferred to:',
        description: formData.data[0].es_to,
      },
      {
        message: 'Transferred on:',
        description: formData.data[0].es_on,
      },
      {
        message: 'Notes:',
        description: formData.data[0].es_notes,
      },
    ];
  }
  return null;
}

// transforms Revenue Statement body items
export async function getRSBodyItems(form_id: string) {
  var formData =
    await revenueStatementQuery.selectWhereRevenueStatementValidation(
      form_id,
      'rs_id',
    );
  if (formData.data) {
    var items = await getItemsFromCategory(formData.data[0].category_id);
    return items;
  }
  return null;
}

// transforms Revenue Statement body data
export async function getRSBodyData(form_id: string) {
  var formData =
    await revenueStatementQuery.selectWhereRevenueStatementValidation(
      form_id,
      'rs_id',
    );
  if (formData.data) {
    return [
      {
        message: 'Receipt link:',
        description: formData.data[0].receipt_link,
      },
      {
        message: 'Transferred to:',
        description: formData.data[0].rs_to,
      },
      {
        message: 'Transferred on:',
        description: formData.data[0].rs_on,
      },
      {
        message: 'Notes:',
        description: formData.data[0].rs_notes,
      },
    ];
  }
  return null;
}

// transforms Fund Transfer body data
export async function getFTBodyData(form_id: string) {
  var formData = await fundTransferQuery.selectWhereFundTransferValidation(
    form_id,
    'ft_id',
  );

  if (formData.data) {
    return [
      {
        message: 'Description/Reason:',
        description: formData.data[0].ft_reason,
      },
      {
        message: 'Transferred amount:',
        description: formData.data[0].ft_amount,
      },
      {
        message: 'Transferred from:',
        description: formData.data[0].ft_from,
      },
      {
        message: 'Transferred to:',
        description: formData.data[0].ft_to,
      },
      {
        message: 'Transferred on:',
        description: formData.data[0].ft_on,
      },
      {
        message: 'Receipt link:',
        description: formData.data[0].receipt_link,
      },
    ];
  }
  return null;
}
