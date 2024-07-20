'use client';

import { useEffect, useState } from 'react';

import DataTable, {
  DeletePopup,
  getFormattedDate,
  SortableHeader,
} from '@/components/DataTable';
import { toast } from '@/components/ui/use-toast';
import { ColumnDef } from '@tanstack/react-table';
import { deleteCategoryValidation } from '@/actions/categories';
import { redirect, usePathname } from 'next/navigation';

type TransactionsTableProps = {
  transactions: any[];
};

const COL_DEFN: ColumnDef<unknown, any>[] = [
  {
    accessorKey: 'transaction_name',
    header: ({ column }) => (
      <SortableHeader column={column}>Name</SortableHeader>
    ),
  },
  {
    accessorKey: 'transaction_date',
    header: ({ column }) => (
      <SortableHeader column={column}>Date</SortableHeader>
    ),
    cell: ({ row }) =>
      getFormattedDate(new Date(row.getValue('transaction_date'))),
  },
  {
    accessorKey: 'transaction_note',
    header: ({ column }) => (
      <SortableHeader column={column}>Notes</SortableHeader>
    ),
  },
];

const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  const pathname = usePathname();

  const [toSelectId, setToSelectId] = useState('');
  const [toDeleteId, setToDeleteId] = useState('');

  useEffect(() => {
    if (toSelectId) {
      redirect(`${pathname}/${toSelectId}`);
    }
  }, [pathname, toSelectId]);

  async function handleTransactionDelete() {
    await deleteCategoryValidation(toDeleteId, 'category_id');
    setToDeleteId('');

    toast({
      variant: 'success',
      title: 'Deleted Transaction',
      description: `Transaction successfully deleted.`,
    });
  }

  function handleTransactionSelect(transactionId: string) {
    setToSelectId(transactionId);
  }

  return (
    <>
      <DataTable
        className="border-2"
        columns={COL_DEFN}
        clickableIdColumn={true}
        data={transactions}
        idFilter=""
        idColumn="transaction_name"
        pkColumn="transaction_name"
        onRowSelect={(transactionId: string) =>
          handleTransactionSelect(transactionId)
        }
        onRowDelete={(transactionId: string) => setToDeleteId(transactionId)}
      />

      <DeletePopup
        type="Expense"
        open={!!toDeleteId}
        onCancel={() => setToDeleteId('')}
        onConfirm={handleTransactionDelete}
      />
    </>
  );
};

export default TransactionsTable;
