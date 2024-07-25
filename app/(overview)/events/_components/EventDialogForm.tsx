'use client';

import { EventState } from '@/actions/events';
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
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/components/ui/use-toast';
import React, { useEffect, useState } from 'react';

interface EventDialogFormProps {
  action: any; // TODO
  fields?: any; // TODO
  label: string;
  state: EventState;
  open: boolean;
  onFieldsChange?: (v: any) => void; // TODO
  onOpenChange: (v: boolean) => void;
}

const EventDialogForm: React.FC<EventDialogFormProps> = ({
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
          <DialogTitle>{label} Event</DialogTitle>
        </DialogHeader>

        <form action={action}>
          <div className="flex flex-col gap-6 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="event_name">Name</Label>
              <Input
                id="event_name"
                name="event_name"
                placeholder="Name"
                value={fields?.event_name}
                onChange={e =>
                  onFieldsChange?.({ ...fields, event_name: e.target.value })
                }
              />

              {/* <div id="name-error" aria-live="polite" aria-atomic="true">
                {state.errors?.staff_name &&
                  state.errors.staff_name.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div> */}
            </div>

            <div className="flex flex-col gap-2">
            <Label htmlFor="event_date">Date</Label>
            <Input
              id="event_name"
              name="event_name"
              placeholder="Event Date"
              value={fields?.event_date}
              onChange={e =>
                onFieldsChange?.({ ...fields, event_date: e.target.value })
              }
            />              
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

export default EventDialogForm;
