'use client';

import AddItemButton from './_components/AddItemButton';
import ItemsTable from './_components/ItemsTable';

// items in transactions (revenue/expense)
const TransactionsPage = () => {
  // const { data: group } = await selectWhereCategoryValidation(
  //   groupId,
  //   'category_id',
  // );
  // const { data: transactions } = await getTransactionsFromCategory(
  //   group![0].category_id,
  // );
  const items = [{}];

  return (
    <main className="flex flex-col gap-4 px-6 py-4 text-left">
      <div className="mb-1">
        <h2 className="text-2xl font-bold">
          {/* Items for: {group![0].category_name} */}
        </h2>
        <p>Add and edit items per transaction</p>
      </div>

      <div className="flex justify-between">
        <AddItemButton />
      </div>

      <div className="mb-8 flex flex-col gap-3">
        <ItemsTable items={items} />
      </div>
    </main>
  );
};

export default TransactionsPage;
