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

type EditAccountDialogProps = {
  isEditing: boolean;
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const EditAccountDialog = ({
  isEditing,
  open,
  onCancel,
  onConfirm,
}: EditAccountDialogProps) => {
  const label = isEditing ? 'Edit' : 'Create';

  return (
    <Dialog open={open} onOpenChange={v => (v ? onConfirm() : onCancel())}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{label} Account</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Name" />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="position">Position</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Password" />
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

export default EditAccountDialog;
