'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { login, type LoginState } from '@/actions/login';
import { useFormState } from 'react-dom';

const LoginForm = () => {
  const initialState: LoginState = { message: null, errors: {} };
  const [state, formAction] = useFormState(login, initialState);
  return (
    <form action={formAction} className="flex w-full justify-center">
      <div className="flex max-w-96 flex-1 flex-col gap-7">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              aria-describedby="email-error"
            />
            {/* Login error message */}
            <div id="email-error" aria-live="polite" aria-atomic="true">
              {state.errors?.email &&
                state.errors.email.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="email">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              aria-describedby="password-error"
            />
            <div id="password-error" aria-live="polite" aria-atomic="true">
              {state.errors?.password &&
                state.errors.password.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="w-full">
          <div>
            <p className="my-4 text-sm text-red-500">{state.message}</p>
          </div>
          <Button className="w-full">Sign In with Email</Button>
        </div>

        {/* <div className="flex items-center gap-2">
                <span className="flex-1 border-[1px] border-border h-[1px]"></span>
                <p className="text-muted-foreground">OR CONTINUE WITH</p>
                <span className="flex-1 border-[1px] border-border h-[1px]"></span>
              </div>

              <div className="flex flex-col gap-2">
                <Button variant="outline">Google</Button>
              </div> */}
      </div>
    </form>
  );
};

export default LoginForm;
