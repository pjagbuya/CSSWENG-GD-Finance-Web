'use client'

import { Input } from '@/components/ui/input';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const FormsSearchInput = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    const urlSearchParams = new URLSearchParams(searchParams)

    if (term) {
      urlSearchParams.set('query', term)
    } else {
      urlSearchParams.delete('query')
    }

    replace(`${pathname}?${urlSearchParams.toString()}`)
  }, 250)

  return (
    <Input
      placeholder="Search events by name..."
      onChange={e => handleSearch(e.target.value)}
      defaultValue={searchParams.get('query')?.toString()}
    />
  )
}

export default FormsSearchInput
