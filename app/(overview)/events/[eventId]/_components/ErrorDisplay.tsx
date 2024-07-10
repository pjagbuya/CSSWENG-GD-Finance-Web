type ErrorDisplayProps = {
  errors: string[] | undefined;
};

const ErrorDisplay = ({ errors }: ErrorDisplayProps) => {
  return (
    <div aria-live="polite" aria-atomic="true">
      {errors &&
        errors.map((error: string) => (
          <p className="mt-2 text-sm text-red-500" key={error}>
            {error}
          </p>
        ))}
    </div>
  );
};

export default ErrorDisplay;
