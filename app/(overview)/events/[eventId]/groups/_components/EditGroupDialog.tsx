'use client';

import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useFormState } from 'react-dom';
import {
  editTransactionValidation,
  selectWhereTransactionValidation,
} from '@/actions/transactions';
import {
  editCategoryValidation,
  selectAllCategoryValidation,
  selectWhereCategoryValidation,
} from '@/actions/categories';
import CreateForm from '../../_components/CreateForm';
import ErrorDisplay from '../../_components/ErrorDisplay';

type EditGroupDialogProps = {
  groupId: string;
  open: boolean;
  onFinish?: () => void;
};

const EditGroupDialog = ({ groupId, onFinish, open }: EditGroupDialogProps) => {
  const [fields, setFields] = useState({
    category_name: '',
  });

  const [state, action] = useFormState(
    editCategoryValidation.bind(null, groupId, 'category_id'),
    {
      errors: {},
    },
  );

  useEffect(() => {
    if (!groupId) {
      return;
    }

    async function getItemInfo() {
      const { data } = await selectWhereCategoryValidation(
        groupId,
        'category_id',
      );

      setFields(data![0]);
    }

    getItemInfo();
  }, [groupId]);

  return (
    <CreateForm
      action={action}
      isEditing={true}
      state={state}
      title="Edit Group"
      open={open}
      onFinish={onFinish}
    >
      <>
        <Label htmlFor="category_name">Name</Label>
        <Input
          id="category_name"
          name="category_name"
          placeholder="Category Name"
          value={fields.category_name}
          onChange={e =>
            setFields({ ...fields, category_name: e.target.value })
          }
        />

        <ErrorDisplay errors={state?.errors?.category_name} />
      </>
    </CreateForm>
  );
};

export default EditGroupDialog;
