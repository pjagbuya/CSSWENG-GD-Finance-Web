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
  let eventData = await eventQuery.selectWhereEventValidation(
    event_id,
    'event_id',
  );
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
  const staffInfo = []
  if (staffData.data) {
    for (let i = 0; i < staffData.data.length; i++) {
      var userData = await accountQuery.selectOneAccountDb(staffData.data[i].user_id)
      if (userData.data) {
        staffInfo.push({
          staff_id: staffData.data[i].staff_id,
          user_id: staffData.data[i].user_id,
          user_first_name: userData.data[0].user_first_name,
          user_last_name: userData.data[0].user_last_name,
          staff_position: staffData.data[i].staff_position
        })
      }
    }
  }
  return staffInfo
}

export async function getStaffInfo(staffData: any) {

  if (staffData.data) {
    var userData = await accountQuery.selectOneAccountDb(staffData.data[0].user_id)
    if (userData.data) {
      return {
        staff_id: staffData.data[0].staff_id,
        user_id: staffData.data[0].user_id,
        user_first_name: userData.data[0].user_first_name,
        user_last_name: userData.data[0].user_last_name,
        staff_position: staffData.data[0].staff_position
      }
    }
  }
  return null
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
export async function getFormHeaderData(form_id: string) { }

// transforms footer data
export async function getFormFooterData(form_id: string) {
  var formFooter = []
  if(form_id){
    switch (form_id.substring(0, 5)) {
      case 'expst':
        {
          var formData = await expenseStatementQuery.selectWhereExpenseStatementValidation(form_id, 'es_id')
          if (formData.data) {
            var preparedStaff = await staffQuery.selectWhereStaffValidation(formData.data[0].prepared_staff_id, 'staff_id')
            console.log(preparedStaff)
            var preparedData = await getStaffInfo(preparedStaff)
  
            if(preparedData){
             formFooter.push({
              id: formData.data[0].prepared_staff_id,
               message: 'Prepared By:',
               name: preparedData.user_first_name + " " + preparedData.user_last_name,
               position: preparedData.staff_position
             })
            }

            var certifiedStaff = await staffQuery.selectWhereStaffValidation(formData.data[0].certified_staff_id, 'staff_id')
            var certifiedData = await getStaffInfo(certifiedStaff)

            if(certifiedData){
              formFooter.push({
                id: formData.data[0].certified_staff_id,
                message: 'Certified By:',
                name: certifiedData.user_first_name + " " + certifiedData.user_last_name,
                position: certifiedData.staff_position
              })
            }
  
            var notedStaffList = await staffInstanceQuery.selectWhereStaffInstanceValidation(formData.data[0].noted_staff_list_id, 'staff_list_id')
            if(notedStaffList.data){
              for(let i = 0; i< notedStaffList.data.length; i++){
                var notedStaff = await staffQuery.selectWhereStaffValidation(notedStaffList.data[i].staff_id, 'staff_id')
                var notedData = await getStaffInfo(notedStaff)
                if(notedData){
                  formFooter.push({
                    id: notedStaffList.data[i].staff_id,
                    message: 'Noted By:',
                    name: notedData.user_first_name + " " + notedData.user_last_name,
                    position: notedData.staff_position
                  })
                }
              }
            }
          }
        }
        break
    }
  }
  return formFooter
}

// transforms Activity Income body data
export async function getAIBodyData(data: any) { }

// transforms Expense Statement body data
export async function getESBodyData(data: any) { }

// transforms Revenue Statement body data
export async function getRSBodyData(data: any) { }

// transforms Fund Transfer body data
export async function getFTBodyData(data: any) { }
