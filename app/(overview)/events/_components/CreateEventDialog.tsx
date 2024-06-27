import { EventState, createEvent } from '@/actions/events';
import { useFormState } from 'react-dom';
import EventDialogForm from './EventDialogForm';

type EditEventDialogProps = {
  open: boolean;
  onFinish: () => void;
};

const EditEventDialog = ({ open, onFinish }: EditEventDialogProps) => {
  const initialState: EventState = { message: null, errors: {} };
  const [state, formAction] = useFormState(createEvent, initialState);

  return (
    <EventDialogForm
      action={formAction}
      label={'Create'}
      state={state}
      open={open}
      onOpenChange={onFinish}
    />
  );
};

export default EditEventDialog;
