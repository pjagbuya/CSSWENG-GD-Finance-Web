'use client';

import { useState } from 'react';

import { ColumnDef } from '@tanstack/react-table';
import DataTable, {
  DeletePopup,
  SortableHeader,
  getFormattedDate,
} from '@/components/DataTable';

const TEMP_COLUMNS: ColumnDef<unknown, any>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <SortableHeader column={column}>Name</SortableHeader>
    ),
  },
  {
    accessorKey: 'code',
    header: ({ column }) => (
      <SortableHeader column={column}>Code</SortableHeader>
    ),
  },
  {
    accessorKey: 'dateCreated',
    header: ({ column }) => (
      <SortableHeader column={column}>Date Created</SortableHeader>
    ),
    cell: ({ row }) => getFormattedDate(new Date(row.getValue('dateCreated'))),
  },
];

const TEMP_DATA = [
  {
    name: 'Form 1',
    code: 'ES-001',
    dateCreated: Date.now(),
  },
];

type FormsTableProps = {
  nameFilter: string;
  onDelete?: () => void;
  onEdit?: () => void;
  onSelect?: () => void;
};

const FormsTable = ({
  nameFilter,
  onDelete,
  onEdit,
  onSelect,
}: FormsTableProps) => {
  const [toDeleteId, setToDeleteId] = useState('');

  return (
    <>
      <DataTable
        className="border-2"
        clickableIdColumn={true}
        columns={TEMP_COLUMNS}
        data={TEMP_DATA}
        idFilter={nameFilter}
        idColumn="name"
        onRowEdit={() => onEdit?.()}
        onRowDelete={() => setToDeleteId('123')}
        onRowSelect={onSelect ?? (() => {})}
      />

      <DeletePopup
        type="Form"
        open={!!toDeleteId}
        onCancel={() => setToDeleteId('')}
        onConfirm={onDelete ?? (() => {})}
      />
    </>
  );
};

export default FormsTable;
