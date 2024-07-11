'use client';

import { useEffect, useState } from 'react';

import { deleteExpense, getExpenses } from '@/actions/transactions';
import DataTable, {
  DeletePopup,
  getFormattedDate,
  SortableHeader,
} from '@/components/DataTable';
import { toast } from '@/components/ui/use-toast';
import { ColumnDef } from '@tanstack/react-table';

type ExpenseTableProps = {
  eventId: string;
};

const COL_DEFN: ColumnDef<unknown, any>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <SortableHeader column={column}>Date</SortableHeader>
    ),
    cell: ({ row }) => getFormattedDate(new Date(row.getValue('date'))),
  },
  {
    accessorKey: 'item_name',
    header: ({ column }) => (
      <SortableHeader column={column}>Item Name</SortableHeader>
    ),
  },
  {
    accessorKey: 'unit_count',
    header: ({ column }) => (
      <SortableHeader column={column}>Unit Count</SortableHeader>
    ),
  },
  {
    accessorKey: 'unit_price',
    header: ({ column }) => (
      <SortableHeader column={column}>Unit Price</SortableHeader>
    ),
  },
  {
    accessorKey: 'total_price',
    header: ({ column }) => (
      <SortableHeader column={column}>Total Price</SortableHeader>
    ),
  },
  {
    accessorKey: 'acc_to',
    header: ({ column }) => (
      <SortableHeader column={column}>Account Transferred To</SortableHeader>
    ),
  },
];

const ExpenseTable = ({ eventId }: ExpenseTableProps) => {
  const [tableData, setTableData] = useState<any[]>([]);

  const [toDeleteId, setToDeleteId] = useState('');

  useEffect(() => {
    fetchExpenses();

    async function fetchExpenses() {
      const expenses = await getExpenses(eventId);
      setTableData(expenses);
    }
  }, [eventId]);

  async function handleExpenseDelete() {
    await deleteExpense(toDeleteId);
    setToDeleteId('');

    toast({
      variant: 'success',
      title: 'Deleted Expense',
      description: `Expense successfully deleted.`,
    });
  }

  return (
    <>
      <DataTable
        className="border-2"
        columns={COL_DEFN}
        data={tableData}
        idFilter=""
        idColumn=""
        pkColumn=""
        onRowDelete={(formId: string) => setToDeleteId(formId)}
      />

      <DeletePopup
        type="Form"
        open={!!toDeleteId}
        onCancel={() => setToDeleteId('')}
        onConfirm={handleExpenseDelete}
      />
    </>
  );
};

export default ExpenseTable;
