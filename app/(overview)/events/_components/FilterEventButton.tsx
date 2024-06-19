import { SlidersHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';

const FilterEventButton = () => {
  return (
    <>
      <Button>
        <SlidersHorizontal className="mr-2 w-4" /> Filter
      </Button>
    </>
  );
};

export default FilterEventButton;
