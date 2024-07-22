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
import EditTransactionDialog from './EditTransactionDialog';
import { deleteTransactionValidation } from '@/actions/transaction';

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
    header: () => 'Notes',
  },
];

const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  const pathname = usePathname();

  const [toEditId, setToEditId] = useState('');
  const [toSelectId, setToSelectId] = useState('');
  const [toDeleteId, setToDeleteId] = useState('');

  useEffect(() => {
    if (toSelectId) {
      redirect(`${pathname}/${toSelectId}`);
    }
  }, [pathname, toSelectId]);

  async function handleTransactionDelete() {
    await deleteTransactionValidation(toDeleteId, 'transaction_id');
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
        onRowEdit={(transactionId: string) => setToEditId(transactionId)}
        onRowDelete={(transactionId: string) => setToDeleteId(transactionId)}
      />

      <DeletePopup
        type="Expense"
        open={!!toDeleteId}
        onCancel={() => setToDeleteId('')}
        onConfirm={handleTransactionDelete}
      />

      <EditTransactionDialog
        transactionId={toEditId}
        open={!!toEditId}
        onFinish={() => setToEditId('')}
      />
    </>
  );
};

export default TransactionsTable;
