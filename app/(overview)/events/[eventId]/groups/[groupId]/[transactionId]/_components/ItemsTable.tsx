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
      <SortableHeader column={column}>Unit/Total Price</SortableHeader>
    ),
    cell: ({ row }) =>
      row.getValue('item_price') || row.getValue('item_amount'),
  },
  {
    accessorKey: 'item_units',
    header: ({ column }) => (
      <SortableHeader column={column}>Units</SortableHeader>
    ),
  },
  {
    accessorKey: 'item_note',
    header: ({ column }) => 'Notes',
  },
];

const ItemsTable = ({ items }: ItemsTableProps) => {
  const [toDeleteId, setToDeleteId] = useState('');
  const [toEditId, setToEditId] = useState('');

  async function handleItemDelete() {
    await deleteItemValidation(toDeleteId, 'item_id');
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
        pkColumn=""
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
        itemId={toEditId}
        open={!!toEditId}
        onFinish={() => setToEditId('')}
      />
    </>
  );
};

export default ItemsTable;
