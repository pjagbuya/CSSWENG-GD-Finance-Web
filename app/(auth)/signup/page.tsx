import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Logo from '@/components/Logo';
import Link from 'next/link';
import { Label } from '@/components/ui/label';

const SignUpPage = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden flex-1 bg-zinc-900 p-8 md:block">
        <div className="flex justify-between"></div>
      </div>

      <div className="flex flex-1 flex-col p-8">
        <div className="flex justify-between md:justify-end">
          <Logo className="md:hidden" />
          <Button variant="outline" asChild>
            <Link href={'/login'}>Sign In</Link>
          </Button>
        </div>

        <div className="mb-[70px] flex h-full w-full flex-col items-center justify-center gap-12">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <h2 className="text-center text-3xl font-bold">Create Account</h2>
            <p>Enter your account information to create your account.</p>
          </div>

          {/* Form */}
          <div className="flex w-full justify-center">
            <div className="flex max-w-96 flex-1 flex-col gap-7">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" placeholder="Email" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Password</Label>
                  <Input type="password" placeholder="Password" />
                </div>
              </div>
              <div className="w-full">
                <Button className="w-full">Create Account</Button>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
