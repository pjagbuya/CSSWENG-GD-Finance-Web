'use client';

import { RegisterAccountState } from '@/actions/account';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/components/ui/use-toast';
import { SelectValue } from '@radix-ui/react-select';
import React, { useEffect, useState } from 'react';

interface EventDialogFormProps {
  action: any; // TODO
  fields?: any; // TODO
  label: string;
  state: RegisterAccountState;
  open: boolean;
  onFieldsChange?: (v: any) => void; // TODO
  onOpenChange: (v: boolean) => void;
}

const RegisterAccountForm: React.FC<EventDialogFormProps> = ({
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
      onOpenChange(true);

      toast({
        variant: 'success',
        title: 'Hooray',
        description: `Event successfully ${true ? 'edited' : 'created'}.`,
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
              <Label htmlFor="position">Position</Label>
              <Select name='staff_position' value={fields?.position} onValueChange={(e) => onFieldsChange?.({ ...fields, position: e })}>
                <SelectTrigger>
                  <SelectValue placeholder="Position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chief">Chief</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                </SelectContent>
              </Select>

              <div id="position-error" aria-live="polite" aria-atomic="true">
                {state.errors?.staff_position &&
                  state.errors.staff_position.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">{label}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterAccountForm;
