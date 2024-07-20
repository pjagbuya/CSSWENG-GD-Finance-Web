import AddGroupButton from './_components/AddGroupButton';
import GroupList from './_components/GroupList';

type TransactionsPageProps = {
  params: {
    eventId: string;
  };
};

// groups (categories) - 1 for expense, 1 for revenue
const GroupsPage = async ({ params }: TransactionsPageProps) => {
  // TODO: @Enzo link functions
  const event = await getEvent(params.eventId);
  const categories = await getGroups(params.eventId);

  return (
    <main className="flex flex-col gap-4 px-6 py-4 text-left">
      <div className="mb-1">
        <h2 className="text-2xl font-bold">Groups for: {event.event_name}</h2>
        <p>(todo description)</p>
      </div>

      <div className="mb-8 flex flex-col gap-3">
        <h3 className="border-b-2 border-muted pb-1 text-xl font-bold">
          Expense Groups
        </h3>

        <div>
          <AddGroupButton type="expense" />
        </div>

        <GroupList categories={categories} eventId={params.eventId} />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="border-b-2 border-muted pb-1 text-xl font-bold">
          Revenue Groups
        </h3>

        <div>
          <AddGroupButton type="revenue" />
        </div>

        <GroupList categories={categories} eventId={params.eventId} />
      </div>
    </main>
  );
};

export default GroupsPage;
