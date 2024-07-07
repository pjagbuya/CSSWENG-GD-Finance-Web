import AccountsTable from './AccountsTable';
import SearchInput from '@/components/SearchInput';

import CreateAccountButton from './CreateAccountButton';
import { getUsers } from '@/actions/account';

const AccountForm = async ({ searchParams }: { searchParams?: { query?: string } }) => {
  const users = (await getUsers())
  return (
    <>
      <div className="flex justify-between">
        <CreateAccountButton />
        <SearchInput
          className="max-w-96"
          placeholder="Search accounts by name..."
        />
      </div>

      <AccountsTable nameFilter={searchParams?.query || ''} userInfos={users} />
    </>
  )
}

export default AccountForm
