import { selectWhereExpenseStatementValidation } from '@/actions/expense_statements';
import EditExpenseFormPage from './_components/EditExpenseFormPage';
import EditRevenueFormPage from './_components/EditRevenueFormPage';
import EditFundTransferFormPage from './_components/EditFundTransferFormPage';
import { selectWhereRevenueStatementValidation } from '@/actions/revenue_statements';
import { selectWhereActivityIncomeValidation } from '@/actions/activity_incomes';
import { selectWhereFundTransferValidation } from '@/actions/fund_transfers';
import EditAISFormPage from './_components/EditAISFormPage';

type EditFormPageParams = {
  params: {
    eventId: string;
    formId: string;
  };
};

const EditFormPage = async ({ params }: EditFormPageParams) => {
  async function getFormPage() {
    const typeStr = params.formId.slice(0, 5);

    switch (typeStr) {
      case 'expst': {
        const data = await selectWhereExpenseStatementValidation(
          params.formId,
          'es_id',
        );
        return (
          <EditExpenseFormPage
            eventId={params.eventId}
            formInfo={data!.data![0]}
          />
        );
      }

      case 'revst': {
        const data = await selectWhereRevenueStatementValidation(
          params.formId,
          'rs_id',
        );
        return (
          <EditRevenueFormPage
            eventId={params.eventId}
            formInfo={data!.data![0]}
          />
        );
      }

      case 'actin':
        const data = await selectWhereActivityIncomeValidation(
          params.formId,
          'ai_id',
        );
        return (
          <EditAISFormPage eventId={params.eventId} formInfo={data!.data![0]} />
        );

      case 'funtr':
        const data2 = await selectWhereFundTransferValidation(
          params.formId,
          'ft_id',
        );
        return (
          <EditFundTransferFormPage
            eventId={params.eventId}
            formInfo={data2!.data![0]}
          />
        );

      default:
        throw new Error('Invalid form type provided.');
    }
  }

  return getFormPage();
};

export default EditFormPage;
