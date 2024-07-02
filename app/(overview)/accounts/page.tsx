import AccountForm from "./_components/AccountForm";
import { varQuery } from "@/actions/format";

type AccountsPageProps = {
  searchParams?: { query?: string };
};

const AccountsPage = async ({ searchParams }: AccountsPageProps) => {

  await varQuery.editVar({name : "hello"}, '20');

  return (
    <main className="flex flex-col gap-4 px-6 py-4 text-left">
      <div className="mb-1">
        <h2 className="text-2xl font-bold">Accounts Dashboard</h2>
        <p>Create, edit, and update officer accounts.</p>
      </div>

      <AccountForm searchParams={searchParams} />

    </main>
  );
};

export default AccountsPage;
