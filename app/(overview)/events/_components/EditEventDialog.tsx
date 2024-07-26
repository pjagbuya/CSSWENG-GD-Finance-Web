import {
  EventState,
  editEventValidation,
  selectWhereEventValidation,
} from '@/actions/events';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import EventDialogForm from './EventDialogForm';

type EditEventDialogProps = {
  eventId: string;
  onFinish: () => void;
};

const EditEventDialog = ({ eventId, onFinish }: EditEventDialogProps) => {
  const [open, setOpen] = useState(false);

  const initialState: EventState = {
    errors: {
      event_name: [],
      event_date: [],
    },
  };
  const [state, formAction] = useFormState(
    editEventValidation.bind(null, eventId, 'event_id'),
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
      const { data } = await selectWhereEventValidation(eventId, 'event_id');
      setFields(data![0]);
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
