import { getForm } from '@/actions/forms';
import EditExpenseFormPage from './_components/EditExpenseFormPage';

export type EditFormPageParams = {
  params: {
    eventId: number;
    formId: number;
  };
};

const EditFormPage = async ({ params }: EditFormPageParams) => {
  const { type, data } = await getForm(params.eventId, params.formId);

  function getFormPage() {
    switch (type) {
      case 'expense':
        return <EditExpenseFormPage data={data} />;

      case 'revenue':
        return null;

      case 'fund_transfer':
        return null;

      default:
        throw new Error('Invalid form type provided.');
    }
  }

  return getFormPage();
};

export default EditFormPage;
