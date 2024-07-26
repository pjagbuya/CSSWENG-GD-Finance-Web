'use client';

import { Trash2 } from 'lucide-react';

import { deleteCategoryValidation } from '@/actions/categories';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import DataTable, { DeletePopup, SortableHeader } from '@/components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import EditGroupDialog from './EditGroupDialog';

type CategoryListProps = {
  categories: any[];
};

const COL_DEFN: ColumnDef<unknown, any>[] = [
  {
    accessorKey: 'category_name',
    header: ({ column }) => (
      <SortableHeader column={column}>Name</SortableHeader>
    ),
  },
];

// TODO: Use a modal for category deletion confirmation
const GroupList = ({ categories }: CategoryListProps) => {
  const pathname = usePathname();

  const [toEditId, setToEditId] = useState('');
  const [toSelectId, setToSelectId] = useState('');
  const [toDeleteId, setToDeleteId] = useState('');

  useEffect(() => {
    if (toSelectId) {
      redirect(`${pathname}/${toSelectId}`);
    }
  }, [pathname, toSelectId]);

  async function handleCategoryDelete() {
    await deleteCategoryValidation(toDeleteId, 'category_id');
    setToDeleteId('');

    toast({
      variant: 'success',
      title: 'Category Deleted',
      description: `Category successfully deleted.`,
    });
  }

  function handleCategorySelect(categoryId: string) {
    setToSelectId(categoryId);
  }

  return (
    <>
      <DataTable
        className="border-2"
        columns={COL_DEFN}
        clickableIdColumn={true}
        data={categories}
        idFilter=""
        idColumn="category_name"
        pkColumn="category_id"
        onRowSelect={(categoryId: string) => handleCategorySelect(categoryId)}
        onRowEdit={(categoryId: string) => setToEditId(categoryId)}
        onRowDelete={(categoryId: string) => setToDeleteId(categoryId)}
      />

      <DeletePopup
        type="Group"
        open={!!toDeleteId}
        onCancel={() => setToDeleteId('')}
        onConfirm={handleCategoryDelete}
      />

      <EditGroupDialog
        groupId={toEditId}
        open={!!toEditId}
        onFinish={() => setToEditId('')}
      />
    </>
  );
};

export default GroupList;
