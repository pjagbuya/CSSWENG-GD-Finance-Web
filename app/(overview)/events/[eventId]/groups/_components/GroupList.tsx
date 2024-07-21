'use client';

import { Trash2 } from 'lucide-react';

import { deleteCategoryValidation } from '@/actions/categories';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type CategoryListProps = {
  categories: any[];
};

// TODO: Use a modal for category deletion confirmation
const GroupList = ({ categories }: CategoryListProps) => {
  const pathname = usePathname();

  function getRedirectLink(category: any) {
    return `${pathname}/${category.category_id}`;
  }

  async function handleCategoryDelete(category: any) {
    await deleteCategoryValidation(category.category_id, 'category_id');

    toast({
      variant: 'success',
      title: 'Category Deleted',
      description: `Category successfully deleted.`,
    });
  }

  return (
    <ol className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] border-2 p-4 hover:bg-gray-50">
      {categories && categories.length !== 0 ? (
        categories.map(category => (
          <li className="ml-4 list-disc" key={category}>
            <div className="flex items-center">
              <Link href={getRedirectLink(category)}>{category.category_name}</Link>

              <Button
                variant="ghost"
                className="ml-2 h-6 w-6 p-0"
                onClick={() => handleCategoryDelete(category)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </li>
        ))
      ) : (
        <span className="text-center text-sm">No categories so far.</span>
      )}
    </ol>
  );
};

export default GroupList;
