import AccountsTable from './_components/AccountsTable';
import SearchInput from '@/components/SearchInput';

import CreateAccountButton from './_components/CreateAccountButton';

type AccountsPageProps = {
  searchParams?: { query?: string };
};

const AccountsPage = ({ searchParams }: AccountsPageProps) => {
  return (
    <main className="flex flex-col gap-4 px-6 py-4 text-left">
      <div>
        <h2 className="text-2xl font-bold">Accounts Dashboard</h2>
        <p>Create, edit, and update officer accounts.</p>
      </div>

      <div className="flex justify-between">
        <CreateAccountButton />
        <SearchInput
          className="max-w-96"
          placeholder="Search accounts by name..."
        />
      </div>

      <AccountsTable nameFilter={searchParams?.query || ''} />
    </main>
  );
};

export default AccountsPage;
