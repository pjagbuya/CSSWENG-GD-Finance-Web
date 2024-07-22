import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { Children, useEffect } from 'react';

type CreateFormProps = {
  action: string | ((formData: FormData) => void);
  children: React.ReactNode;
  state: { errors?: {}; message?: string | null };
  title: string;
  open?: boolean;
  onFinish?: () => void;
};

const CreateForm = ({
  action,
  children,
  state,
  title,
  onFinish,
  open,
}: CreateFormProps) => {
  useEffect(() => {
    if (!state.errors) {
      onFinish?.();

      toast({
        variant: 'success',
        title: 'Hooray',
        description: `Form successfully created.`,
      });
    }
  }, [state]);

  return (
    <Dialog open={open === undefined ? true : open} onOpenChange={onFinish}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <form action={action} className="flex flex-col flex-wrap">
          <div className="flex flex-col gap-5 py-4">
            {Children.map(children, child => (
              <div className="flex flex-col gap-2">{child}</div>
            ))}
          </div>

          <DialogFooter className="mt-3">
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateForm;
