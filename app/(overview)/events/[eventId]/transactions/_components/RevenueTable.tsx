'use client';

import { useEffect, useState } from 'react';

import { deleteRevenue, getRevenue } from '@/actions/transactions';
import DataTable, {
  DeletePopup,
  getFormattedDate,
  SortableHeader,
} from '@/components/DataTable';
import { toast } from '@/components/ui/use-toast';
import { ColumnDef } from '@tanstack/react-table';

type RevenueTableProps = {
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
    accessorKey: 'acc_from',
    header: ({ column }) => (
      <SortableHeader column={column}>Account Received From</SortableHeader>
    ),
  },
  {
    accessorKey: 'acc_to',
    header: ({ column }) => (
      <SortableHeader column={column}>Account Received To</SortableHeader>
    ),
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <SortableHeader column={column}>Category</SortableHeader>
    ),
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <SortableHeader column={column}>Amount</SortableHeader>
    ),
  },
];

const RevenueTable = ({ eventId }: RevenueTableProps) => {
  const [tableData, setTableData] = useState<any[]>([]);

  const [toDeleteId, setToDeleteId] = useState('');

  useEffect(() => {
    fetchExpenses();

    async function fetchExpenses() {
      const expenses = await getRevenue(eventId);
      setTableData(expenses);
    }
  }, [eventId]);

  async function handleRevenueDelete() {
    await deleteRevenue(toDeleteId);
    setToDeleteId('');

    toast({
      variant: 'success',
      title: 'Deleted Revenue',
      description: `Revenue successfully deleted.`,
    });
  }

  return (
    <>
      <DataTable
        className="border-2"
        clickableIdColumn={true}
        columns={COL_DEFN}
        data={tableData}
        idFilter=""
        idColumn=""
        pkColumn=""
        onRowDelete={(formId: string) => setToDeleteId(formId)}
      />

      <DeletePopup
        type="Revenue"
        open={!!toDeleteId}
        onCancel={() => setToDeleteId('')}
        onConfirm={handleRevenueDelete}
      />
    </>
  );
};

export default RevenueTable;
