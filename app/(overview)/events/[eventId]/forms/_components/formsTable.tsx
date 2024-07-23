'use client';

import { ColumnDef } from '@tanstack/react-table';
import DataTable, {
  DeletePopup,
  SortableHeader,
  getFormattedDate,
} from '@/components/DataTable';
import { useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { usePathname, useRouter } from 'next/navigation';
import {
  getESFormFromEvent,
  getFTFormFromEvent,
  getRSFormFromEvent,
} from '@/actions/utils';
import { deleteExpenseStatement } from '@/actions/expense_statements';

const EXPENSE_COL_DEF: ColumnDef<unknown, any>[] = [
  {
    accessorKey: 'es_name',
    header: ({ column }) => (
      <SortableHeader column={column}>Name</SortableHeader>
    ),
  },
  {
    accessorKey: 'es_id',
    header: ({ column }) => (
      <SortableHeader column={column}>Code</SortableHeader>
    ),
  },
  {
    accessorKey: 'es_date',
    header: ({ column }) => (
      <SortableHeader column={column}>Date Created</SortableHeader>
    ),
    cell: ({ row }) =>
      getFormattedDate(new Date(row.getValue('es_date'))),
  },
];

const REVENUE_COL_DEF: ColumnDef<unknown, any>[] = [
  {
    accessorKey: 'rs_name',
    header: ({ column }) => (
      <SortableHeader column={column}>Name</SortableHeader>
    ),
  },
  {
    accessorKey: 'rs_id',
    header: ({ column }) => (
      <SortableHeader column={column}>Code</SortableHeader>
    ),
  },
  {
    accessorKey: 'rs_date',
    header: ({ column }) => (
      <SortableHeader column={column}>Date Created</SortableHeader>
    ),
    cell: ({ row }) =>
      getFormattedDate(new Date(row.getValue('rs_date'))),
  },
];

type FormsTableProps = {
  eventId: string;
  nameFilter: string;
  variant: 'expense' | 'revenue' | 'fund_transfer';
};

const FormsTable = ({ eventId, nameFilter, variant }: FormsTableProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const [tableData, setTableData] = useState<any[]>([]);

  const [toDeleteId, setToDeleteId] = useState('');
  const [toEditId, setToEditId] = useState('');
  const [toViewId, setToViewId] = useState('');

  useEffect(() => {
    fetchTableData();

    async function fetchTableData() {
      let formData;

      switch (variant) {
        case 'expense':
          formData = await getESFormFromEvent(eventId);
          break;

        case 'revenue':
          formData = await getRSFormFromEvent(eventId);
          break;

        case 'fund_transfer':
          formData = await getFTFormFromEvent(eventId);
          break;
      }

      const data = formData!.data!;
      setTableData(data);
    }
  }, [eventId, variant]);

  useEffect(() => {
    if (toEditId) {
      router.push(`${pathname}/${toEditId}/edit`);
    }
  }, [pathname, router, toEditId]);

  useEffect(() => {
    if (toViewId) {
      router.push(`${pathname}/${toViewId}`);
    }
  }, [pathname, router, toViewId]);

  function getColumnDefinition() {
    switch (variant) {
      case 'expense':
        return EXPENSE_COL_DEF;

      case 'revenue':
        return REVENUE_COL_DEF;

      default:
        throw new Error('Invalid form variant provided.');
    }
  }

  // async function handleFormDelete() {
  //   if (!toDeleteId) {
  //     return;
  //   }

  //   let formData;

  //   switch (variant) {
  //     case 'expense':
  //       formData = await deleteExpenseStatement(eventId, '');
  //       break;

  //     case 'revenue':
  //       formData = await getRSFormFromEvent(eventId);
  //       break;

  //     case 'fund_transfer':
  //       formData = await getFTFormFromEvent(eventId);
  //       break;
  //   }

  //   const data = await deleteForm(eventId, variant, toDeleteId, pathname);
  //   setToDeleteId('');

  //   setTableData(data);

  //   toast({
  //     variant: 'destructive',
  //     title: 'Form Deleted',
  //     description: `Form successfully deleted.`,
  //   });
  // }

  return (
    <>
      <DataTable
        className="border-2"
        clickableIdColumn={true}
        columns={getColumnDefinition()}
        data={tableData}
        deletable={false}
        idFilter={nameFilter}
        idColumn={variant === 'expense' ? 'es_name' : 'rs_name'}
        pkColumn={variant === 'expense' ? 'es_id' : 'rs_id'}
        onRowEdit={(formId: string) => setToEditId(formId)}
        onRowDelete={(formId: string) => setToDeleteId(formId)}
        onRowSelect={(formId: string) => setToViewId(formId)}
      />

      {/* <DeletePopup
        type="Form"
        open={!!toDeleteId}
        onCancel={() => setToDeleteId('')}
        onConfirm={handleFormDelete}
      /> */}
    </>
  );
};

export default FormsTable;
