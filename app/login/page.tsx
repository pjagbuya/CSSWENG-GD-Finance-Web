import React from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Logo from '@/components/Logo'

const LoginPage = () => {
  return (
    <div className="min-h-screen flex bg-background">
      <div className="p-8 hidden flex-1 bg-slate-500 md:block">
        <div className="flex justify-between">
        </div>
      </div>

      <div className="p-8  flex-1 flex flex-col">
        <div className="flex justify-between md:justify-end">
          <Logo className="md:hidden" />
          <Button variant="outline">Sign Up</Button>
        </div>

        {/* TODO: Remove negative margin hack */}
        <div className="mt-[-50px] flex-1 flex flex-col justify-center gap-7">
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-3xl">Sign In</h2>
            <p>Enter your account information to sign in to your account.</p>
          </div>

          <div className="flex justify-center">
            <div className="max-w-96 flex-1 flex flex-col gap-7">
              <div className="flex flex-col gap-2">
                <Input type="email" placeholder="Email" />
                <Input type="password" placeholder="Password" />
                <Button>Sign In with Email</Button>
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
  )
}

export default LoginPage

