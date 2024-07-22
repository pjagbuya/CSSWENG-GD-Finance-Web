'use client';

import { useState } from 'react';

import DataTable, {
  DeletePopup,
  getFormattedDate,
  SortableHeader,
} from '@/components/DataTable';
import { toast } from '@/components/ui/use-toast';
import { ColumnDef } from '@tanstack/react-table';
import { deleteCategoryValidation } from '@/actions/categories';
import { deleteItemValidation } from '@/actions/items';
import EditItemDialog from './EditItemDialog';

type ItemsTableProps = {
  items: any[];
  transactionId: string;
};

const COL_DEFN: ColumnDef<unknown, any>[] = [
  {
    accessorKey: 'item_name',
    header: ({ column }) => (
      <SortableHeader column={column}>Name</SortableHeader>
    ),
  },
  {
    accessorKey: 'item_date',
    header: ({ column }) => (
      <SortableHeader column={column}>Date</SortableHeader>
    ),
    cell: ({ row }) => getFormattedDate(new Date(row.getValue('item_date'))),
  },
  {
    accessorKey: 'item_price',
    header: ({ column }) => (
      <SortableHeader column={column}>Unit Price</SortableHeader>
    ),
  },
  {
    accessorKey: 'item_units',
    header: ({ column }) => (
      <SortableHeader column={column}>Units</SortableHeader>
    ),
  },
  {
    accessorKey: 'item_amount',
    header: ({ column }) => (
      <SortableHeader column={column}>Total Amount</SortableHeader>
    ),
  },
  {
    accessorKey: 'item_payment_details',
    header: ({ column }) => 'Payment Details',
  },
];

const ItemsTable = ({ items, transactionId }: ItemsTableProps) => {
  const [toDeleteId, setToDeleteId] = useState('');
  const [toEditId, setToEditId] = useState('');

  async function handleItemDelete() {
    await deleteItemValidation(transactionId, toDeleteId, 'item_id');
    setToDeleteId('');

    toast({
      variant: 'success',
      title: 'Deleted Item',
      description: `Item successfully deleted.`,
    });
  }

  return (
    <>
      <DataTable
        className="border-2"
        columns={COL_DEFN}
        data={items}
        idFilter=""
        idColumn=""
        pkColumn="item_id"
        onRowDelete={(itemId: string) => setToDeleteId(itemId)}
        onRowEdit={(itemId: string) => setToEditId(itemId)}
      />

      <DeletePopup
        type="Expense"
        open={!!toDeleteId}
        onCancel={() => setToDeleteId('')}
        onConfirm={handleItemDelete}
      />

      <EditItemDialog
        transactionId={transactionId}
        itemId={toEditId}
        open={!!toEditId}
        onFinish={() => setToEditId('')}
      />
    </>
  );
};

export default ItemsTable;
