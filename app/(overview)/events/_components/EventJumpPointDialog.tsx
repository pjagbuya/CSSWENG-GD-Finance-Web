import { eventQuery } from '@/actions/events';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Coins, Folder } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type EventJumpPointDialogProps = {
  eventId: string;
  onExit?: () => void;
};

const EventJumpPointDialog = ({
  eventId,
  onExit,
}: EventJumpPointDialogProps) => {
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState({
    event_name: '',
    date_created: '',
    date_modified: '',
  });

  // TODO: Have to client-side fetch since next does not support putting server-
  // side components directly inside client-side ones.
  useEffect(() => {
    fetchEvent();

    async function fetchEvent() {
      if (!eventId) {
        setOpen(false);
        return;
      }

      const { data } = await eventQuery.selectOneEventValidation(eventId);
      setEvent(data![0]);
      setOpen(true);
    }
  }, [eventId]);
  return (
    <Dialog open={open} onOpenChange={v => !v && onExit?.()}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{event.event_name}</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p>Created On: {event.date_created}</p>
          <p>Last Modified On: {event.date_modified}</p>
        </div>

        <DialogFooter className="grid auto-cols-fr grid-flow-col gap-4">
          <Button asChild>
            <Link href={`/events/${eventId}/forms`}>
              <Folder className="mr-2 w-4" /> View Forms
            </Link>
          </Button>

          <Button asChild>
            <Link href={`/events/${eventId}/groups`}>
              <Coins className="mr-2 w-4" />
              View Groups
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventJumpPointDialog;
