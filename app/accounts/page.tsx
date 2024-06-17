'use client';

import { useState } from 'react';

import AccountsTable from '@/components/AccountsTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CirclePlus } from 'lucide-react';
import EditAccountDialog from '@/components/EditAccountDialog';

const AccountsPage = () => {
  const [nameFilter, setNameFilter] = useState('');

  const [showCreateAccountDialog, setShowCreateAccountDialog] = useState(false);

  return (
    <>
      <main className="flex flex-col gap-4 px-6 py-4 text-left">
        <div>
          <h2 className="text-2xl font-bold">Accounts Dashboard</h2>
          <p>Create, edit, and update officer accounts.</p>
        </div>

        <div className="flex justify-between">
          <Button onClick={() => setShowCreateAccountDialog(true)}>
            <CirclePlus className="mr-2 w-4" /> Create Account
          </Button>

          <Input
            className="max-w-96"
            placeholder="Search accounts by name..."
            onChange={e => setNameFilter(e.target.value)}
          />
        </div>

        <AccountsTable nameFilter={nameFilter} />
      </main>

      <EditAccountDialog
        isEditing={false}
        open={showCreateAccountDialog}
        onCancel={() => setShowCreateAccountDialog(false)}
        onConfirm={() => {}}
      />
    </>
  );
};

export default AccountsPage;
