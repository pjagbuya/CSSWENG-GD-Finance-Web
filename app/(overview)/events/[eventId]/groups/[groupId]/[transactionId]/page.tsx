import { selectWhereCategoryValidation } from '@/actions/categories';
import AddItemButton from './_components/AddItemButton';
import ItemsTable from './_components/ItemsTable';
import {
  getItemsFromTransaction,
  getTransactionsFromCategory,
} from '@/actions/utils';
import { selectWhereTransactionValidation } from '@/actions/transactions';
import AddItemFromReceiptButton from './_components/AddItemFromReceiptButton';

type TransactionsPageProps = {
  params: {
    transactionId: string;
  };
};

// items in transactions (revenue/expense)
const TransactionsPage = async ({ params }: TransactionsPageProps) => {
  const { data: group } = await selectWhereTransactionValidation(
    params.transactionId,
    'transaction_id',
  );
  const itemsData = await getItemsFromTransaction(params.transactionId)!;

  return (
    <main className="flex flex-col gap-4 px-6 py-4 text-left">
      <div className="mb-1">
        <h2 className="text-2xl font-bold">
          Items for: {group![0].transaction_name}
        </h2>
        <p>Add and edit items per transaction</p>
      </div>

      <div className="flex gap-4">
        <AddItemButton transactionId={params.transactionId} />
        <AddItemFromReceiptButton transactionId={params.transactionId} />
      </div>

      <div className="mb-8 flex flex-col gap-3">
        <ItemsTable
          transactionId={params.transactionId}
          items={itemsData!.data!}
        />
      </div>
    </main>
  );
};

export default TransactionsPage;
