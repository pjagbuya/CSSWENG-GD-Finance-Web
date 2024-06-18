'use client'

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SlidersHorizontal } from 'lucide-react';
import FormsTable from './formsTable';
import CreateFormDialogButton from './CreateFormDialogButton';

const EventsPage = () => {
  const [nameFilter, setNameFilter] = useState('');

  return (
    <>
      <main className="flex flex-col gap-4 px-6 py-4 text-left">
        <div>
          <h2 className="text-2xl font-bold">Forms for: Borther Richie’s secret finance forms and transactions</h2>
          <p>Created: July 5, 2003 | Last Modified: July 5, 2003</p>
        </div>

        <div className="flex justify-between">

          <CreateFormDialogButton />
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

        <FormsTable
          nameFilter={nameFilter}
        // onSelect={() => setShowEventJumpPtDialog(true)}
        />
      </main>
    </>
  );
};

export default EventsPage;

