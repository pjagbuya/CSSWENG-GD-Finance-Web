'use client';

import { useState } from 'react';

import DataTable, { DeletePopup } from '@/components/DataTable';

const COL_DEFN = [];

const ExpenseTable = () => {
  const [tableData, setTableData] = useState<any[]>([]);

  const [toDeleteId, setToDeleteId] = useState('');

  // TODO
  async function deleteExpense() {
    setToDeleteId('');
  }

  return (
    <>
      <DataTable
        className="border-2"
        clickableIdColumn={true}
        columns={COL_DEFN}
        data={tableData}
        idFilter=""
        idColumn="" // TODO
        pkColumn="" // TODO
        onRowDelete={(formId: string) => setToDeleteId(formId)}
      />

      <DeletePopup
        type="Form"
        open={!!toDeleteId}
        onCancel={() => setToDeleteId('')}
        onConfirm={deleteExpense}
      />
    </>
  );
};

export default ExpenseTable;
