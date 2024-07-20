import { selectWhereCategoryValidation } from '@/actions/categories';
import TransactionsTable from './_components/TransactionsTable';
import { getTransactionsFromCategory } from '@/actions/utils';
import CreateTransactionButton from './_components/CreateTransactionButton';

type GroupsPageProps = {
  params: {
    eventId: string;
    groupId: string;
  };
};

// transactions - for group (expense/revenue)
const GroupsPage = async ({ params: { groupId } }: GroupsPageProps) => {
  // const { data: group } = await selectWhereCategoryValidation(
  //   groupId,
  //   'category_id',
  // );
  // const { data: transactions } = await getTransactionsFromCategory(
  //   group![0].category_id,
  // );
  const transactions = [
    {
      transaction_name: 'transaction_name',
      transaction_date: 'transaction_date',
      transaction_note: 'transaction_note',
    },
    {
      transaction_name: 'transaction_name',
      transaction_date: 'transaction_date',
      transaction_note: 'transaction_note',
    },
    {
      transaction_name: 'transaction_name',
      transaction_date: 'transaction_date',
      transaction_note: 'transaction_note',
    },
    {
      transaction_name: 'transaction_name',
      transaction_date: 'transaction_date',
      transaction_note: 'transaction_note',
    },
  ];

  return (
    <main className="flex flex-col gap-4 px-6 py-4 text-left">
      <div className="mb-1">
        <h2 className="text-2xl font-bold">
          {/* Transactions for: {group![0].category_name} */}
        </h2>
        <p>Create and edit transaction groupings</p>
      </div>

      <div className="flex justify-between">
        <CreateTransactionButton />
      </div>

      <div className="mb-8 flex flex-col gap-3">
        <TransactionsTable transactions={transactions} />
      </div>
    </main>
  );
};

export default GroupsPage;
