import { EventState, createEventValidation } from '@/actions/events';
import { useFormState } from 'react-dom';
import EventDialogForm from './EventDialogForm';

type EditEventDialogProps = {
  open: boolean;
  onFinish: () => void;
};

const EditEventDialog = ({ open, onFinish }: EditEventDialogProps) => {
  const initialState: EventState = {
    errors: {
      event_name: [],
    },
  };
  const [state, formAction] = useFormState(createEventValidation, initialState);

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
