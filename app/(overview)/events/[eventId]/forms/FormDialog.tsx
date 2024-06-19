import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type EditEventDialogProps = {
  isEditing: boolean;
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const FormDialog = ({
  isEditing,
  open,
  onCancel,
  onConfirm,
}: EditEventDialogProps) => {
  const label = isEditing ? 'Edit' : 'Create';

  return (
    <Dialog open={open} onOpenChange={v => (v ? onConfirm() : onCancel())}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{label} Form</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Name" />
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" onClick={onConfirm}>
            {label}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
