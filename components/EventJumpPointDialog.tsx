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

type EventJumpPointDialogProps = {
  open: boolean;
  onExit?: () => void;
};

const EventJumpPointDialog = ({ open, onExit }: EventJumpPointDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={v => !v && onExit?.()}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Event Name</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p>Created On: X</p>
          <p>Last Modified On: Y</p>
        </div>

        <DialogFooter className="grid auto-cols-fr grid-flow-col gap-4">
          <Button asChild>
            <Link href="/events/0/forms/0">
              <Folder className="mr-2 w-4" /> View Forms
            </Link>
          </Button>

          <Button asChild>
            <Link href="">
              <Coins className="mr-2 w-4" />
              View Transactions
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventJumpPointDialog;
