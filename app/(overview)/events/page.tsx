import SearchInput from '@/components/SearchInput';
import CreateEventButton from './_components/CreateEventButton';
import EventsTable from './_components/EventsTable';
import FilterEventButton from './_components/FilterEventButton';

type EventsPageProps = {
  searchParams?: { query?: string };
};

const EventsPage = ({ searchParams }: EventsPageProps) => {
  return (
    <main className="flex flex-col gap-4 px-6 py-4 text-left">
      <div>
        <h2 className="text-2xl font-bold">Events Dashboard</h2>
        <p>Create, edit, and update GDSC events.</p>
      </div>

      <div className="flex justify-between">
        <CreateEventButton />

        <div className="flex max-w-96 flex-1 gap-4">
          <SearchInput placeholder="Search events by name..." />

          <FilterEventButton />
        </div>
      </div>

      <EventsTable nameFilter={searchParams?.query || ''} />
    </main>
  );
};

export default EventsPage;
