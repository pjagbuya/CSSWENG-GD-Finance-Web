import * as utilFunc from '@/actions/utils';

import AddGroupButton from './_components/AddGroupButton';
import GroupList from './_components/GroupList';
import { selectWhereEventValidation } from '@/actions/events';

type TransactionsPageProps = {
  params: {
    eventId: string;
  };
};

// groups (categories) - 1 for expense, 1 for revenue
const GroupsPage = async ({ params }: TransactionsPageProps) => {
  const { data: event } = await selectWhereEventValidation(
    params.eventId,
    'event_id',
  );
  const { data: expenseGroups } = await utilFunc.getExpenseCategoryFromEvent(
    params.eventId,
  );
  const { data: revenueGroups } = await utilFunc.getRevenueCategoryFromEvent(
    params.eventId,
  );

  return (
    <main className="flex flex-col gap-4 px-6 py-4 text-left">
      <div className="mb-1">
        <h2 className="text-2xl font-bold">
          Groups for: {event![0].event_name}
        </h2>
        <p>Create and edit transaction groupings</p>
      </div>

      <div className="mb-8 flex flex-col gap-3">
        <h3 className="border-b-2 border-muted pb-1 text-xl font-bold">
          Expense Groups
        </h3>

        <div>
          <AddGroupButton eventId={params.eventId} type="expense" />
        </div>

        <GroupList categories={expenseGroups!} />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="border-b-2 border-muted pb-1 text-xl font-bold">
          Revenue Groups
        </h3>

        <div>
          <AddGroupButton eventId={params.eventId} type="revenue" />
        </div>

        <GroupList categories={revenueGroups!} />
      </div>
    </main>
  );
};

export default GroupsPage;
