'use client'

import AccountsTable from './AccountsTable';
import SearchInput from '@/components/SearchInput';

import CreateAccountButton from './CreateAccountButton';
import React from 'react'

const AccountForm = ({ searchParams }: { searchParams?: { query?: string } }) => {
  return (
    <>
      <div className="flex justify-between">
        <CreateAccountButton />
        <SearchInput
          className="max-w-96"
          placeholder="Search accounts by name..."
        />
      </div>

      <AccountsTable nameFilter={searchParams?.query || ''} />
    </>
  )
}

export default AccountForm
