'use client';

// import { useState } from 'react';

import { ColumnDef } from '@tanstack/react-table';
import DataTable, {
  DeletePopup,
  SortableHeader,
  getFormattedDate,
} from '@/components/DataTable';
import { useEffect, useState } from 'react';
import { getFormList } from '@/actions/forms';

const COLUMN_DEFINITIONS: ColumnDef<unknown, any>[] = [
  {
    accessorKey: 'es_name',
    header: ({ column }) => (
      <SortableHeader column={column}>Name</SortableHeader>
    ),
  },
  {
    // TODO: How do we auto-generate this
    accessorKey: 'es_id',
    header: ({ column }) => (
      <SortableHeader column={column}>Code</SortableHeader>
    ),
  },
  {
    accessorKey: 'es_category',
    header: ({ column }) => (
      <SortableHeader column={column}>Name</SortableHeader>
    ),
  },
  {
    accessorKey: 'es_date_created',
    header: ({ column }) => (
      <SortableHeader column={column}>Date Created</SortableHeader>
    ),
    cell: ({ row }) =>
      getFormattedDate(new Date(row.getValue('es_date_created'))),
  },
];

type FormsTableProps = {
  eventId: string;
  nameFilter: string;
  variant: 'expense' | 'revenue' | 'fund_transfer';
};

const FormsTable = ({ eventId, nameFilter, variant }: FormsTableProps) => {
  // const [toDeleteId, setToDeleteId] = useState('');

  const [tableData, setTableData] = useState<any[]>([]);

  useEffect(() => {
    fetchTableData();

    async function fetchTableData() {
      const data = await getFormList(eventId, variant);
      setTableData(data);
    }
  }, [eventId, variant]);

  return (
    <>
      <DataTable
        className="border-2"
        clickableIdColumn={true}
        columns={COLUMN_DEFINITIONS}
        data={tableData}
        idFilter={nameFilter}
        idColumn="es_name"
        pkColumn="es_id"
        // onRowEdit={() => onEdit?.()}
        // onRowDelete={() => setToDeleteId('123')}
        // onRowSelect={onSelect ?? (() => {})}
      />

      {/* <DeletePopup
        type="Form"
        open={!!toDeleteId}
        onCancel={() => setToDeleteId('')}
        onConfirm={onDelete ?? (() => {})}
      /> */}
    </>
  );
};

export default FormsTable;
