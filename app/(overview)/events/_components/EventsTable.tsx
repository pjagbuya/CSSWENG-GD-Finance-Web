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
import { deleteEventValidation } from '@/actions/events';

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
];

type EventsTableProps = {
  events: any[] | null;
  nameFilter: string;
  onDelete?: () => void;
};

const EventsTable = ({ events, nameFilter, onDelete }: EventsTableProps) => {
  const [toDeleteId, setToDeleteId] = useState('');
  const [toEditId, setToEditId] = useState('');
  const [toJumpId, setToJumpId] = useState('');

  async function handleEventDelete() {
    if (!toDeleteId) {
      return;
    }

    await deleteEventValidation(toDeleteId, 'event_id');
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
        onRowSelect={id => setToJumpId(id)}
      />

      <EventJumpPointDialog eventId={toJumpId} onExit={() => setToJumpId('')} />

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
