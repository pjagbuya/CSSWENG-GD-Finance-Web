import { getEvent } from '@/actions/events';
import { getTransactionCategories } from '@/actions/transactions';

import AddCategoryButton from './_components/AddCategoryButton';
import CategoryList from './_components/CategoryList';
import CreateTransactionButton from './_components/CreateTransactionButton';
import ExpenseTable from './_components/ExpenseTable';
import RevenueTable from './_components/RevenueTable';

type TransactionsPageProps = {
  params: {
    eventId: string;
  };
};

const TransactionsPage = async ({ params }: TransactionsPageProps) => {
  const event = await getEvent(params.eventId);
  const categories = await getTransactionCategories(params.eventId);

  return (
    <main className="flex flex-col gap-4 px-6 py-4 text-left">
      <div className="mb-1">
        <h2 className="text-2xl font-bold">
          Transactions for: {event.event_name}
        </h2>
        <p>Create and update GDSC event transactions.</p>
      </div>

      <div className="mb-8 flex flex-col gap-3">
        <h3 className="border-b-2 border-muted pb-1 text-xl font-bold">
          Categories
        </h3>

        <div>
          <AddCategoryButton />
        </div>

        <CategoryList categories={categories} eventId={params.eventId} />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="border-b-2 border-muted pb-1 text-xl font-bold">
          Expenses
        </h3>

        <div>
          <CreateTransactionButton variant="expense" title="Add Expense" />
        </div>

        <ExpenseTable eventId={params.eventId} />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="border-b-2 border-muted pb-1 text-xl font-bold">
          Revenue
        </h3>

        <div>
          <CreateTransactionButton variant="revenue" title="Add Revenue" />

          {/* 
            Add Revenue Form
            - date (default to today's date)
            - account received from
            - account transferred to
            - amount
            - receipt image link
          */}
        </div>

        <RevenueTable />

        {/* 
          Table 
          - date
          - account received from
          - account transferred to
          - amount
          - receipt image link

          > allow delete
          > no edit (at least for now)
        */}
      </div>
    </main>
  );
};

export default TransactionsPage;
