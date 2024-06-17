'use client';

import { useState } from 'react';

import { ColumnDef } from '@tanstack/react-table';
import DataTable, { DeletePopup, SortableHeader } from './DataTable';
import EditAccountDialog from './EditAccountDialog';

const TEMP_COLUMNS: ColumnDef<unknown, any>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <SortableHeader column={column}>Name</SortableHeader>
    ),
  },
  {
    accessorKey: 'id',
    header: ({ column }) => <SortableHeader column={column}>ID</SortableHeader>,
  },
  {
    accessorKey: 'position',
    header: ({ column }) => (
      <SortableHeader column={column}>Position</SortableHeader>
    ),
  },
];

const TEMP_DATA = [
  {
    name: 'name',
    id: 123,
    position: 'position',
  },
  {
    name: 'name2',
    id: 124,
    position: 'position',
  },
];

type AccountsTableProps = {
  nameFilter: string;
  onDelete?: () => void;
  onEdit?: () => void;
};

const AccountsTable = ({
  nameFilter,
  onDelete,
  onEdit,
}: AccountsTableProps) => {
  const [toDeleteId, setToDeleteId] = useState('');
  const [toEditId, setToEditId] = useState('');

  return (
    <>
      <DataTable
        className="border-2"
        columns={TEMP_COLUMNS}
        data={TEMP_DATA}
        idFilter={nameFilter}
        idColumn="name"
        onRowEdit={() => setToEditId('123')}
        onRowDelete={() => setToDeleteId('123')}
      />

      <DeletePopup
        type="Account"
        open={!!toDeleteId}
        onCancel={() => setToDeleteId('')}
        onConfirm={onDelete ?? (() => {})}
      />

      <EditAccountDialog
        isEditing={true}
        open={!!toEditId}
        onCancel={() => setToEditId('')}
        onConfirm={onEdit ?? (() => {})}
      />
    </>
  );
};

export default AccountsTable;
