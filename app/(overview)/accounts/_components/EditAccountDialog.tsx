
import { AccountState, createAccount, editAccount } from '@/actions/account';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
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
import { useEffect } from 'react';
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

  useEffect(() => {
    if (!state.errors) {
      onConfirm()
    }
  }, [state])


  return (
    <Dialog open={open} onOpenChange={v => (v ? onConfirm() : onCancel())}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{label} Account</DialogTitle>
        </DialogHeader>
        <form action={formAction}>

          <div className="flex flex-col gap-6 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="first_name" placeholder="First Name" />
              <div id="email-error" aria-live="polite" aria-atomic="true">
                {state.errors?.first_name &&
                  state.errors.first_name.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="last_name" placeholder="Last Name" />
              <div id="email-error" aria-live="polite" aria-atomic="true">
                {state.errors?.last_name &&
                  state.errors.last_name.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" name="email" placeholder="Email" />
              <div id="email-error" aria-live="polite" aria-atomic="true">
                {state.errors?.email &&
                  state.errors.email.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
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
              <div id="email-error" aria-live="polite" aria-atomic="true">
                {state.errors?.role &&
                  state.errors.role.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Password" />
              <div id="email-error" aria-live="polite" aria-atomic="true">
                {state.errors?.password &&
                  state.errors.password.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </div>
          <div>
            <p className="my-4 text-sm text-red-500">
              {state.message}
            </p>
          </div>
          <Button type='submit'>
            {label}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAccountDialog;
