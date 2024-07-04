import { EventState, editEvent } from '@/actions/events';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import EventDialogForm from './EventDialogForm';

type EditEventDialogProps = {
  eventId: string;
  onFinish: () => void;
};

const EditEventDialog = ({ eventId, onFinish }: EditEventDialogProps) => {
  const [open, setOpen] = useState(false);

  const initialState: EventState = { message: null, errors: {} };
  const [state, formAction] = useFormState(editEvent, initialState);

  const [fields, setFields] = useState({
    email: '',
  });

  useEffect(() => {
    if (!eventId) {
      return;
    }

    // TODO: fetch initial info

    setOpen(true);
  }, [eventId]);

  function handleOpenChange(v: boolean) {
    onFinish();
    setOpen(false);
  }

  return (
    <EventDialogForm
      action={formAction}
      fields={fields}
      label={'Edit'}
      state={state}
      open={open}
      onFieldsChange={setFields}
      onOpenChange={handleOpenChange}
    />
  );
};

export default EditEventDialog;
