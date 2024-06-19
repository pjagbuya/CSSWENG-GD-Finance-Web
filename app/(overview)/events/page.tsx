'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CirclePlus, SlidersHorizontal } from 'lucide-react';
import EventsTable from '@/components/EventsTable';
import EditEventDialog from '@/components/EditEventDialog';
import EventJumpPointDialog from '@/components/EventJumpPointDialog';

const EventsPage = () => {
  const [nameFilter, setNameFilter] = useState('');

  const [showCreateEventDialog, setShowCreateEventDialog] = useState(false);
  const [showEventJumpPtDialog, setShowEventJumpPtDialog] = useState(false);

  return (
    <>
      <main className="flex flex-col gap-4 px-6 py-4 text-left">
        <div>
          <h2 className="text-2xl font-bold">Events Dashboard</h2>
          <p>Create, edit, and update GDSC events.</p>
        </div>

        <div className="flex justify-between">
          <Button onClick={() => setShowCreateEventDialog(true)}>
            <CirclePlus className="mr-2 w-4" /> Create Event
          </Button>

          <div className="flex max-w-96 flex-1 gap-4">
            <Input
              placeholder="Search events by name..."
              onChange={e => setNameFilter(e.target.value)}
            />

            <Button>
              <SlidersHorizontal className="mr-2 w-4" /> Filter
            </Button>
          </div>
        </div>

        <EventsTable
          nameFilter={nameFilter}
          onSelect={() => setShowEventJumpPtDialog(true)}
        />
      </main>

      <EditEventDialog
        isEditing={false}
        open={showCreateEventDialog}
        onCancel={() => setShowCreateEventDialog(false)}
        onConfirm={() => {}}
      />

      <EventJumpPointDialog
        open={showEventJumpPtDialog}
        onExit={() => setShowEventJumpPtDialog(false)}
      />
    </>
  );
};

export default EventsPage;
