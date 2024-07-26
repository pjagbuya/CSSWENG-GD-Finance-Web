import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import Link from 'next/link';
import LoginForm from './loginForm';

const LoginPage = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden flex-1 bg-zinc-900 p-8 md:block">
        <div className="flex justify-between"></div>
      </div>

      <div className="flex flex-1 flex-col p-8">
        <div className="flex justify-between md:justify-end">
          <Logo className="md:hidden" />
          <Button variant="outline" asChild>
            <Link href={'/signup'}>Sign Up</Link>
          </Button>
        </div>

        <div className="mb-[70px] flex h-full w-full flex-col items-center justify-center gap-12">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <h2 className="text-center text-3xl font-bold">Sign In</h2>
            <p>Enter your account information to sign in to your account.</p>
          </div>

          {/* Form */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
