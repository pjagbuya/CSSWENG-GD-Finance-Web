'use client';

import { useState } from 'react';

import { ColumnDef } from '@tanstack/react-table';
import DataTable, {
  DeletePopup,
  SortableHeader,
  getFormattedDate,
} from '../../../../components/DataTable';
import EditEventDialog from './EditEventDialog';
import EventJumpPointDialog from './EventJumpPointDialog';
import { deleteEvent, editEvent } from '@/actions/events';

const TEMP_COLUMNS: ColumnDef<unknown, any>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <SortableHeader column={column}>Name</SortableHeader>
    ),
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
    name: 'Event 1',
    dateCreated: new Date('2/2/2023'),
    dateModified: new Date('2/2/2023'),
  },
  {
    name: 'Event 2',
    dateCreated: new Date('2/2/2023'),
    dateModified: new Date('2/2/2023'),
  },
  {
    name: 'Event 3',
    dateCreated: new Date('2/2/2023'),
    dateModified: new Date('2/2/2023'),
  },
];

type EventsTableProps = {
  nameFilter: string;
  onDelete?: () => void;
  onSelect?: () => void;
};

const EventsTable = ({ nameFilter, onDelete, onSelect }: EventsTableProps) => {
  const [showEventJumpPtDialog, setShowEventJumpPtDialog] = useState(false);

  const [toDeleteId, setToDeleteId] = useState('');
  const [toEditId, setToEditId] = useState('');

  function handleEventDelete() {
    if (!toDeleteId) {
      return;
    }

    deleteEvent(toDeleteId);
    setToDeleteId('');
  }

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
        onRowSelect={onSelect ?? (() => setShowEventJumpPtDialog(true))}
      />

      <EventJumpPointDialog
        open={showEventJumpPtDialog}
        onExit={() => setShowEventJumpPtDialog(false)}
      />

      <DeletePopup
        type="Event"
        open={!!toDeleteId}
        onCancel={() => setToDeleteId('')}
        onConfirm={onDelete ?? handleEventDelete}
      />

      <EditEventDialog eventId={toEditId} onFinish={() => setToEditId('')} />
    </>
  );
};

export default EventsTable;
