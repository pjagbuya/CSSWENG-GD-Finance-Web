import AccountForm from "./_components/AccountForm";

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

      <AccountForm searchParams={searchParams} />

    </main>
  );
};

export default AccountsPage;
