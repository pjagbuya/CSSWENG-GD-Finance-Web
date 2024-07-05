'use client'
import React, { useEffect } from 'react';

import { AccountState } from '@/actions/account';
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
import { ButtonLoading } from '@/components/LoadingButton';
import { useFormStatus } from 'react-dom';
import { toast } from '@/components/ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';

interface AccountDialogFormProps {
  action: any; // TODO
  fields?: fieldsProp;
  label: string;
  state: AccountState;
  open: boolean;
  onFieldsChange?: (v: any) => void; // TODO
  onOpenChange: (v: boolean) => void;
}

type fieldsProp = {
  first_name: string;
  last_name: string;
  email: string;
  position: string;
}

const AccountDialogForm: React.FC<AccountDialogFormProps> = ({
  action,
  fields,
  label,
  state,
  open,
  onFieldsChange,
  onOpenChange,
}) => {
  useEffect(() => {
    if (!state.errors) {
      onOpenChange(true)
      toast({
        variant: 'success',
        title: 'Hooray',
        description: `Account successfully ${true ? 'edited' : 'created'}.`,
        action: <ToastAction altText="Try again">Exit</ToastAction>,
      });
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{label} Account</DialogTitle>
        </DialogHeader>

        <form action={action}>
          <div className="flex flex-col gap-6 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" value={fields?.first_name} name='first_name' placeholder="First Name" />
              <div id="first-name-error" aria-live="polite" aria-atomic="true">
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
              <Input id="lastName" value={fields?.last_name} name='last_name' placeholder="Last Name" />

              <div id="last-name-error" aria-live="polite" aria-atomic="true">
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
              <Input
                id="email"
                type="email"
                name='email'
                placeholder="Email"
                value={fields?.email}
                onChange={e =>
                  onFieldsChange?.({ ...fields, email: e.target.value })
                }
              />

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
              <Select name='role' value={fields?.position} onValueChange={(e) => onFieldsChange?.({ ...fields, position: e })}>
                <SelectTrigger>
                  <SelectValue placeholder="Position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chief">Chief</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                </SelectContent>
              </Select>

              <div id="position-error" aria-live="polite" aria-atomic="true">
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
              <Input id="password" name='password' type="password" placeholder="Password" />

              <div id="password-error" aria-live="polite" aria-atomic="true">
                {state.errors?.password &&
                  state.errors.password.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <SubmitButton label={label} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <>{pending ? <ButtonLoading /> : <Button type="submit">{label}</Button>}</>
  );
}
export default AccountDialogForm;
