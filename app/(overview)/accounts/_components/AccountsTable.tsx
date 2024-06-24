'use client';

import { useEffect, useState } from 'react';

import { ColumnDef } from '@tanstack/react-table';
import DataTable, {
  DeletePopup,
  SortableHeader,
} from '../../../../components/DataTable';
import EditAccountDialog from './EditAccountDialog';
import { createAdminClient } from '@/utils/supabase/client';

const TEMP_COLUMNS: ColumnDef<unknown, any>[] = [
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <SortableHeader column={column}>Email</SortableHeader>
    ),
  },
  {
    accessorKey: 'first_name',
    header: ({ column }) => (
      <SortableHeader column={column}>First name</SortableHeader>
    ),
  },
  {
    accessorKey: 'last_name',
    header: ({ column }) => (
      <SortableHeader column={column}>Last Name</SortableHeader>
    ),
  },
  {
    accessorKey: 'id',
    header: ({ column }) => <SortableHeader column={column}>ID</SortableHeader>,
  },
  {
    accessorKey: 'position',
    header: ({ column }) => (
      <SortableHeader column={column}>Position</SortableHeader>
    ),
  },
];

const TEMP_DATA = [
  {
    name: 'name',
    id: 123,
    position: 'position',
  },
  {
    name: 'name2',
    id: 124,
    position: 'position',
  },
];

type AccountsTableProps = {
  nameFilter: string;
  onDelete?: () => void;
  onEdit?: () => void;
};

const AccountsTable = ({
  nameFilter,
  onDelete,
  onEdit,
}: AccountsTableProps) => {
  const supabase = createAdminClient()
  const [toDeleteId, setToDeleteId] = useState('');
  const [toEditId, setToEditId] = useState('');
  const [userInfos, setUserInfos] = useState<any>([])
  useEffect(() => {
    async function getUsers() {
      const { data: { users }, error } = await supabase.auth.admin.listUsers()

      if (error) {
        throw new Error(error.message)
      }

      setUserInfos(users)
    }
    getUsers()
  })

  return (
    <>
      <DataTable
        className="border-2"
        columns={TEMP_COLUMNS}
        data={userInfos}
        idFilter={nameFilter}
        idColumn="name"
        onRowEdit={() => setToEditId('123')}
        onRowDelete={() => setToDeleteId('123')}
      />

      <DeletePopup
        type="Account"
        open={!!toDeleteId}
        onCancel={() => setToDeleteId('')}
        onConfirm={onDelete ?? (() => { })}
      />

      <EditAccountDialog
        isEditing={true}
        open={!!toEditId}
        onCancel={() => setToEditId('')}
        onConfirm={onEdit ?? (() => { })}
      />
    </>
  );
};

export default AccountsTable;
