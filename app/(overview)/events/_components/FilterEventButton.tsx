'use client';

import { SlidersHorizontal } from 'lucide-react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const FilterEventButton = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleQuery = useDebouncedCallback((name: string, term: string) => {
    const urlSearchParams = new URLSearchParams(searchParams);

    if (term) {
      urlSearchParams.set(name, term);
    } else {
      urlSearchParams.delete(name);
    }

    replace(`${pathname}?${urlSearchParams.toString()}`);
  }, 250);

  return (
    <>
      <Popover>
        <PopoverTrigger className={buttonVariants({ variant: 'default' })}>
          <SlidersHorizontal className="mr-2 w-4" /> Filter
        </PopoverTrigger>

        <PopoverContent>
          <div className="flex flex-col gap-6 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                onChange={e => handleQuery('startDate', e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                onChange={e => handleQuery('endDate', e.target.value)}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default FilterEventButton;
