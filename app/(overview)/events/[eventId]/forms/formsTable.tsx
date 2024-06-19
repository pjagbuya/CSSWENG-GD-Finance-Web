'use client';

import { useState } from 'react';

import { ColumnDef } from '@tanstack/react-table';
import DataTable, {
  DeletePopup,
  SortableHeader,
  getFormattedDate,
} from '@/components/DataTable';
import EditEventDialog from '../../_components/EditEventDialog';
import { Badge } from '@/components/ui/badge';
import { badgeVariants } from '@/components/ui/badge';
import { VariantProps } from 'class-variance-authority';

const TEMP_COLUMNS: ColumnDef<unknown, any>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <SortableHeader column={column}>Name</SortableHeader>
    ),
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return <SortableHeader column={column}>Name</SortableHeader>;
    },
    cell: ({ row }) => {
      type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];
      let badgeVariant: BadgeVariant = 'blue';
      switch (row.getValue('type')) {
        case 'Expense':
          badgeVariant = 'blue';
          break;
        case 'Revenue':
          badgeVariant = 'yellow';
          break;
        case 'Fund Transfer':
          badgeVariant = 'destructive';
          break;
        case 'Activity Transfer':
          badgeVariant = 'green';
          break;
      }
      return <Badge variant={badgeVariant}>{row.getValue('type')}</Badge>;
    },
  },
  {
    accessorKey: 'dateCreated',
    header: ({ column }) => (
      <SortableHeader column={column}>Date Created</SortableHeader>
    ),
    cell: ({ row }) => getFormattedDate(new Date(row.getValue('dateCreated'))),
  },
  {
    accessorKey: 'dateModified',
    header: ({ column }) => (
      <SortableHeader column={column}>Date Modified</SortableHeader>
    ),
    cell: ({ row }) => getFormattedDate(new Date(row.getValue('dateModified'))),
  },
];

const TEMP_DATA = [
  {
    name: 'Form 1',
    type: 'Expense',
    dateCreated: Date.now(),
    dateModified: Date.now(),
  },
  {
    name: 'Form 2',
    type: 'Revenue',
    dateCreated: Date.now(),
    dateModified: Date.now(),
  },
  {
    name: 'Form 3',
    type: 'Fund Transfer',
    dateCreated: Date.now(),
    dateModified: Date.now(),
  },
  {
    name: 'Form 4',
    type: 'Activity Transfer',
    dateCreated: Date.now(),
    dateModified: Date.now(),
  },
];

type EventsTableProps = {
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
}: EventsTableProps) => {
  const [toDeleteId, setToDeleteId] = useState('');
  const [toEditId, setToEditId] = useState('');

  return (
    <>
      <DataTable
        className="border-2"
        clickableIdColumn={true}
        columns={TEMP_COLUMNS}
        data={TEMP_DATA}
        idFilter={nameFilter}
        idColumn="name"
        onRowEdit={() => setToEditId('123')}
        onRowDelete={() => setToDeleteId('123')}
        onRowSelect={onSelect ?? (() => {})}
      />

      <DeletePopup
        type="Event"
        open={!!toDeleteId}
        onCancel={() => setToDeleteId('')}
        onConfirm={onDelete ?? (() => {})}
      />

      <EditEventDialog
        isEditing={true}
        open={!!toEditId}
        onCancel={() => setToEditId('')}
        onConfirm={onEdit ?? (() => {})}
      />
    </>
  );
};

export default FormsTable;
