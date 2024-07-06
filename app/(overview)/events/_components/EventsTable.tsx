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
    accessorKey: 'event_name',
    header: ({ column }) => (
      <SortableHeader column={column}>Name</SortableHeader>
    ),
  },
  {
    accessorKey: 'date_created',
    header: ({ column }) => (
      <SortableHeader column={column}>Date Created</SortableHeader>
    ),
    cell: ({ row }) => getFormattedDate(new Date(row.getValue('date_created'))),
  },
  {
    accessorKey: 'date_modified',
    header: ({ column }) => (
      <SortableHeader column={column}>Date Modified</SortableHeader>
    ),
    cell: ({ row }) =>
      getFormattedDate(new Date(row.getValue('date_modified'))),
  },
];

type EventsTableProps = {
  events: any[];
  nameFilter: string;
  onDelete?: () => void;
  onSelect?: () => void;
};

const EventsTable = ({
  events,
  nameFilter,
  onDelete,
  onSelect,
}: EventsTableProps) => {
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
        data={events}
        idFilter={nameFilter}
        idColumn="event_name"
        pkColumn="event_id"
        onRowEdit={id => setToEditId(id)}
        onRowDelete={id => setToDeleteId(id)}
        onRowSelect={onSelect ?? (() => setShowEventJumpPtDialog(true))}
      />

      {/* TODO: ret index from datatable, use index to get data obj, pass data here */}
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
