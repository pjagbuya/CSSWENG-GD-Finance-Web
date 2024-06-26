'use client';

import { useEffect, useState } from 'react';

import { ColumnDef } from '@tanstack/react-table';
import DataTable, {
  DeletePopup,
  SortableHeader,
} from '../../../../components/DataTable';
import EditAccountDialog from './EditAccountDialog';
import { deleteAccount, getUsers } from '@/actions/account';

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
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
};

type UserInfoType = {
  email: string;
  uuid: string;
}

const AccountsTable = ({
  nameFilter,
  onDelete,
  onEdit,
}: AccountsTableProps) => {
  const [toDeleteId, setToDeleteId] = useState('');
  const [toEditId, setToEditId] = useState('');
  const [userInfos, setUserInfos] = useState<UserInfoType[]>([])
  useEffect(() => {
    async function getUserInfos() {
      const users = await getUsers()
      setUserInfos(users.map(user => {
        return {
          email: user.email || '',
          uuid: user.id
        }
      }))
    }

    getUserInfos()
  })

  return (
    <>
      <DataTable
        className="border-2"
        columns={TEMP_COLUMNS}
        data={userInfos}
        idFilter={nameFilter}
        idColumn="name"
        onRowEdit={(id) => {
          setToEditId(userInfos[Number(id)].uuid)
        }}
        onRowDelete={(id) => {
          setToDeleteId(userInfos[Number(id)].uuid)
        }}
      />

      <DeletePopup
        type="Account"
        open={!!toDeleteId}
        onCancel={() => setToDeleteId('')}
        // Temporary comment
        onConfirm={/* onDelete ?? */ (async () => {
          await deleteAccount(toDeleteId)
          setToDeleteId('')
        })}
      />

      <EditAccountDialog
        isEditing={true}
        open={!!toEditId}
        onCancel={() => setToEditId('')}
        // Temporary comment
        onConfirm={/* onEdit ?? */ (() => { })}
      />
    </>
  );
};

export default AccountsTable;
