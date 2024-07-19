import { eventQuery } from "@/actions/events";
import { formListQuery } from "@/actions/form_lists";
import { fundTransferQuery } from "@/actions/fund_transfers";
import { expenseStatementQuery } from "@/actions/expense_statements";
import { revenueStatementQuery } from "@/actions/revenue_statements";
import { activityIncomeQuery } from "@/actions/activity_incomes";
import { staffQuery } from "@/actions/staffs";
import { staffListQuery } from "@/actions/staff_lists";
import { categoryQuery } from "@/actions/categories";
import { transactionListQuery } from "@/actions/transaction_lists";
import { transactionQuery } from "@/actions/transaction";
import { itemListQuery } from "@/actions/item_lists";
import { itemQuery } from "@/actions/items";

//-------------------------------------------------------------------
//          Dashboard Functions
//-------------------------------------------------------------------
// get specific form from event

// gets AI form of event ID
async function getAIFormFromEvent(event_id : any){
    let eventData = await eventQuery.selectWhereEventValidation(event_id, 'event_id')
    if(eventData.data){
        let form_list_id = eventData.data[0].ai_form_list_id
        return await activityIncomeQuery.selectWhereActivityIncomeValidation(
            form_list_id, 'form_list_id'
        )
    }
    return null
}

// gets RS forms of event ID
async function getRSFormFromEvent(event_id : any){
    let eventData = await eventQuery.selectWhereEventValidation(event_id, 'event_id')
    if(eventData.data){
        let form_list_id = eventData.data[0].rs_form_list_id
        return await revenueStatementQuery.selectWhereRevenueStatementValidation(
            form_list_id, 'form_list_id'
        )
    }
    return null
}

// gets ES forms of event ID
async function getESFormFromEvent(event_id : any){
    let eventData = await eventQuery.selectWhereEventValidation(event_id, 'event_id')
    if(eventData.data){
        let form_list_id = eventData.data[0].es_form_list_id
        return await expenseStatementQuery.selectWhereExpenseStatementValidation(
            form_list_id, 'form_list_id'
        )
    }
    return null
}

// gets FT forms of event ID
async function getFTFormFromEvent(event_id : any){
    let eventData = await eventQuery.selectWhereEventValidation(event_id, 'event_id')
    if(eventData.data){
        let form_list_id = eventData.data[0].ft_form_list_id
        return await fundTransferQuery.selectWhereFundTransferValidation(
            form_list_id, 'form_list_id'
        )
    }
    return null
}

// get specific category from event

// gets Revenue Categories of event ID
async function getRevenueCategoryFromEvent(event_id : any){
    let eventData = await eventQuery.selectWhereEventValidation(event_id, 'event_id')
    if(eventData.data){
        let form_list_id = eventData.data[0].ft_form_list_id
        return await fundTransferQuery.selectWhereFundTransferValidation(
            form_list_id, 'form_list_id'
        )
    }
    return null
}

// gets Expense Categories of event ID
async function getExpenseCategoryFromEvent(event_id : any){

}

// get specific transaction from category

// gets Transactions of category ID
async function getTransactionsFromCategory(category_id : any){

}

// get specific item from transaction

// gets Items from transaction ID
async function getItemsFromTransaction(transaction_id : any){

}

//-------------------------------------------------------------------
//          Activity Income Functions
//-------------------------------------------------------------------

// gets Revenue Items from event ID
async function getRevenueItemsFromEvent(id : any){

}

// gets Expense Items from event ID
async function getExpenseItemsFromEvent(id : any){

}

// gets Revenue Total from event ID
async function getRevenueTotalFromEvent(id : any){

}

// gets Expense Total from event ID
async function getExpenseTotalFromEvent(id : any){

}

//-------------------------------------------------------------------
//          Form Functions
//-------------------------------------------------------------------

// transforms header data
async function getFormHeaderData(data : any){

}

// transforms footer data
async function getFormFooterData(data : any){

}

// transforms Activity Income body data
async function getAIBodyData(data : any){

}

// transforms Revenue Statement body data
async function getRSBodyData(data : any){

}

// transforms Expense Statement body data
async function getESBodyData(data : any){

}

// transforms Fund Transfer body data
async function getFTBodyData(data : any){

}

export const utilFunc = {
    getAIFormFromEvent,
    getRSFormFromEvent,
    getESFormFromEvent,
    getFTFormFromEvent,

    getRevenueCategoryFromEvent,
    getExpenseCategoryFromEvent,
    getTransactionsFromCategory,
    getItemsFromTransaction,

    getRevenueItemsFromEvent,
    getExpenseItemsFromEvent,
    getRevenueTotalFromEvent,
    getExpenseTotalFromEvent,

    getFormHeaderData,
    getFormFooterData,
    getAIBodyData,
    getRSBodyData,
    getESBodyData,
    getFTBodyData,
}