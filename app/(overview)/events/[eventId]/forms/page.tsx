import FormsTable from './_components/formsTable';
import CreateFormButton from './_components/CreateFormButton';
import { Button } from '@/components/ui/button';

type FormsPageProps = {
  params: {
    eventId: string;
  };
};

const FormsPage = ({ params }: FormsPageProps) => {
  return (
    <>
      <main className="flex flex-col gap-4 px-6 py-4 text-left">
        <div className="mb-1">
          <h2 className="text-2xl font-bold">
            Forms for: Brother Richie's Secret Event
          </h2>
          <p>Create, edit, and update GDSC event forms.</p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="border-b-2 border-muted pb-1 text-xl font-bold">
            Expense Statement Forms
          </h3>

          <div>
            <CreateFormButton variant="expense" />
          </div>

          <FormsTable
            eventId={params.eventId}
            nameFilter=""
            variant="expense"
          />
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="border-b-2 border-muted pb-1 text-xl font-bold">
            Revenue Statement Forms
          </h3>

          <div>
            <CreateFormButton variant="revenue" />
          </div>

          {/* <FormsTable nameFilter="" /> */}
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="border-b-2 border-muted pb-1 text-xl font-bold">
            AISF Form
          </h3>

          <p>Last generated on [DATE].</p>

          <div className="mb-8 flex gap-4">
            <Button className="min-w-24">View</Button>
            <Button className="min-w-24">Edit</Button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="border-b-2 border-muted pb-1 text-xl font-bold">
            Fund Transfer Forms
          </h3>

          <div>
            <CreateFormButton variant="fund_transfer" />
          </div>

          {/* <FormsTable nameFilter="" /> */}
        </div>
      </main>
    </>
  );
};

export default FormsPage;
