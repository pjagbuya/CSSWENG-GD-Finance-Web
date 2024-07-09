'use client';

import { ColumnDef } from '@tanstack/react-table';
import DataTable, {
  DeletePopup,
  SortableHeader,
  getFormattedDate,
} from '@/components/DataTable';
import { useEffect, useState } from 'react';
import { deleteForm, getFormList } from '@/actions/forms';
import { toast } from '@/components/ui/use-toast';
import { usePathname, useRouter } from 'next/navigation';

const EXPENSE_COL_DEF: ColumnDef<unknown, any>[] = [
  {
    accessorKey: 'es_name',
    header: ({ column }) => (
      <SortableHeader column={column}>Name</SortableHeader>
    ),
  },
  {
    // TODO: How do we auto-generate this
    accessorKey: 'id',
    header: ({ column }) => (
      <SortableHeader column={column}>Code</SortableHeader>
    ),
  },
  {
    accessorKey: 'es_category',
    header: ({ column }) => (
      <SortableHeader column={column}>Name</SortableHeader>
    ),
  },
  {
    accessorKey: 'es_date_created',
    header: ({ column }) => (
      <SortableHeader column={column}>Date Created</SortableHeader>
    ),
    cell: ({ row }) =>
      getFormattedDate(new Date(row.getValue('es_date_created'))),
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
    // TODO: How do we auto-generate this
    accessorKey: 'id',
    header: ({ column }) => (
      <SortableHeader column={column}>Code</SortableHeader>
    ),
  },
  {
    accessorKey: 'rs_category',
    header: ({ column }) => (
      <SortableHeader column={column}>Name</SortableHeader>
    ),
  },
  {
    accessorKey: 'rs_date_created',
    header: ({ column }) => (
      <SortableHeader column={column}>Date Created</SortableHeader>
    ),
    cell: ({ row }) =>
      getFormattedDate(new Date(row.getValue('rs_date_created'))),
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
      const data = await getFormList(eventId, variant);
      setTableData(data);
    }
  }, [eventId, variant]);

  useEffect(() => {
    if (toEditId) {
      router.push(`${pathname}/${toEditId}/edit`);
    }
  }, [toEditId]);

  useEffect(() => {
    if (toViewId) {
      router.push(`${pathname}/${toViewId}`);
    }
  }, [toViewId]);

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

  async function handleFormDelete() {
    if (!toDeleteId) {
      return;
    }

    const data = await deleteForm(eventId, variant, toDeleteId, pathname);
    setToDeleteId('');

    setTableData(data);

    toast({
      variant: 'destructive',
      title: 'Form Deleted',
      description: `Form successfully deleted.`,
    });
  }

  return (
    <>
      <DataTable
        className="border-2"
        clickableIdColumn={true}
        columns={getColumnDefinition()}
        data={tableData}
        idFilter={nameFilter}
        idColumn="es_name"
        pkColumn="id"
        onRowEdit={(formId: string) => setToEditId(formId)}
        onRowDelete={(formId: string) => setToDeleteId(formId)}
        onRowSelect={(formId: string) => setToViewId(formId)}
      />

      <DeletePopup
        type="Form"
        open={!!toDeleteId}
        onCancel={() => setToDeleteId('')}
        onConfirm={handleFormDelete}
      />
    </>
  );
};

export default FormsTable;
