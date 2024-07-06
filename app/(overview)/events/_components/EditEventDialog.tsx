import { EventState, editEvent, getEvent } from '@/actions/events';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import EventDialogForm from './EventDialogForm';
import { set } from 'zod';

type EditEventDialogProps = {
  eventId: string;
  onFinish: () => void;
};

const EditEventDialog = ({ eventId, onFinish }: EditEventDialogProps) => {
  const [open, setOpen] = useState(false);

  const initialState: EventState = { message: null, errors: {} };
  const [state, formAction] = useFormState(
    editEvent.bind(null, eventId),
    initialState,
  );

  const [fields, setFields] = useState({
    event_name: '',
  });

  useEffect(() => {
    if (!eventId) {
      return;
    }

    async function getEventInfo() {
      const event = await getEvent(eventId);
      setFields({ ...event });

      setOpen(true);
    }

    getEventInfo();
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
