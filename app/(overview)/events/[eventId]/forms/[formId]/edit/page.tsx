import { getForm } from '@/actions/forms';

import EditExpenseFormPage from './_components/EditExpenseFormPage';
import EditRevenueFormPage from './_components/EditRevenueFormPage';

type EditFormPageParams = {
  params: {
    eventId: string;
    formId: string;
  };
};

const EditFormPage = async ({ params }: EditFormPageParams) => {
  const { type, data } = await getForm(params.formId);

  function getFormPage() {
    switch (type) {
      case 'expense':
        return <EditExpenseFormPage formInfo={data} />;

      case 'revenue':
        return <EditRevenueFormPage formInfo={data} />;

      case 'fund_transfer':
        return null;

      default:
        throw new Error('Invalid form type provided.');
    }
  }

  return getFormPage();
};

export default EditFormPage;
