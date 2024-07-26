'use client';

import { useState } from 'react';

import { ColumnDef } from '@tanstack/react-table';
import DataTable, {
  DeletePopup,
  SortableHeader,
  getFormattedDate,
} from '@/components/DataTable';
// import EditEventDialog from './EditEventDialog';
// import EventJumpPointDialog from './EventJumpPointDialog';
import { deleteEventValidation } from '@/actions/events';

const TEMP_COLUMNS: ColumnDef<unknown, any>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <SortableHeader column={column}>ID</SortableHeader>,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <SortableHeader column={column}>Name</SortableHeader>
    ),
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <SortableHeader column={column}>Date</SortableHeader>
    ),
    cell: ({ row }) => getFormattedDate(new Date(row.getValue('date'))),
  },
  {
    accessorKey: 'transfered_from',
    header: ({ column }) => (
      <SortableHeader column={column}>Transfered From</SortableHeader>
    ),
  },
  {
    accessorKey: 'transfered_to',
    header: ({ column }) => (
      <SortableHeader column={column}>Transfered To</SortableHeader>
    ),
  },
];

type EventsTableProps = {
  events: any[] | null;
  nameFilter: string;
  onDelete?: () => void;
};

const FundsTransferTable = ({
  events,
  nameFilter,
  onDelete,
}: EventsTableProps) => {
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

      {/* <EventJumpPointDialog eventId={toJumpId} onExit={() => setToJumpId('')} /> */}

      <DeletePopup
        type="Event"
        open={!!toDeleteId}
        onCancel={() => setToDeleteId('')}
        onConfirm={onDelete ?? handleEventDelete}
      />

      {/* <EditEventDialog eventId={toEditId} onFinish={() => setToEditId('')} /> */}
    </>
  );
};

export default FundsTransferTable;
