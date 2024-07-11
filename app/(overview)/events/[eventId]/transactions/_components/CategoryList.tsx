'use client';

import { Trash2 } from 'lucide-react';

import { deleteCategory } from '@/actions/transactions';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

type CategoryListProps = {
  categories: string[];
  eventId: string;
};

// TODO: Use a modal for category deletion confirmation
const CategoryList = ({ categories, eventId }: CategoryListProps) => {
  async function handleCategoryDelete(category: string) {
    await deleteCategory(eventId, category);

    toast({
      variant: 'success',
      title: 'Category Deleted',
      description: `Category successfully deleted.`,
    });
  }

  return (
    <ol className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] border-2 p-4 hover:bg-gray-50">
      {categories.length !== 0 ? (
        categories.map(category => (
          <li className="ml-4 list-disc" key={category}>
            <div className="flex items-center">
              {category}

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

export default CategoryList;
