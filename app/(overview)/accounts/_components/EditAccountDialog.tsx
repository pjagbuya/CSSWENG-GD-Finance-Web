import { AccountState, createAccount, editAccount } from '@/actions/account';
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
import { useFormState } from 'react-dom';

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
  const initialState: AccountState = { message: null, errors: {} }
  const accountAction = isEditing ? editAccount : createAccount
  const [state, formAction] = useFormState(accountAction, initialState)

  return (
    <Dialog open={open} onOpenChange={v => (v ? onConfirm() : onCancel())}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{label} Account</DialogTitle>
        </DialogHeader>
        <form action={formAction} onSubmit={() => { console.log("Yo mama") }}>

          <div className="flex flex-col gap-6 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="first_name" placeholder="First Name" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="last_name" placeholder="Last Name" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" name="email" placeholder="Email" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="position">Position</Label>
              <Select name='role'>
                <SelectTrigger>
                  <SelectValue placeholder="Position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">member</SelectItem>
                  <SelectItem value="admin">admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Password" />
            </div>
          </div>

          <Button type='submit' onClick={() => onConfirm()}>
            {label}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAccountDialog;
