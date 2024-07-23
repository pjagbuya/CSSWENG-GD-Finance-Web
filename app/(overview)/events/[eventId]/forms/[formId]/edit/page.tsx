import { selectWhereExpenseStatementValidation } from '@/actions/expense_statements';
import EditExpenseFormPage from './_components/EditExpenseFormPage';
import EditRevenueFormPage from './_components/EditRevenueFormPage';
import { selectWhereRevenueStatementValidation } from '@/actions/revenue_statements';

type EditFormPageParams = {
  params: {
    eventId: string;
    formId: string;
  };
};

const EditFormPage = async ({ params }: EditFormPageParams) => {
  async function getFormPage() {
    const typeStr = params.formId.slice(0, 5)

    switch (typeStr) {
      case 'expst': {
        const data = await selectWhereExpenseStatementValidation(params.formId, 'es_id');
        return <EditExpenseFormPage formInfo={data!.data![0]} />;
      }

      case 'revst': {
        const data = await selectWhereRevenueStatementValidation(params.formId, 'rs_id');
        return <EditRevenueFormPage formInfo={data!.data![0]} />;
      }

      case 'actin':
        return null;
  
      case 'funtr':
        return null;

      default:
        throw new Error('Invalid form type provided.');
    }
  }

  return getFormPage();
};

export default EditFormPage;
