import React from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Logo from '@/components/Logo'
import Link from 'next/link'
import { Label } from "@/components/ui/label"

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex bg-background">
      <div className="p-8 hidden flex-1 bg-zinc-900 md:block">
        <div className="flex justify-between">
        </div>
      </div>

      <div className="p-8 flex-1 flex flex-col ">
        <div className="flex justify-between md:justify-end">
          <Logo className="md:hidden" />
          <Button variant="outline" asChild>
            <Link href={"/login"}>Sign In</Link>
          </Button>
        </div>

        <div className='flex flex-col items-center w-full h-full justify-center gap-12 mb-[70px]'>
          {/* Title */}
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-3xl text-center">Create Account</h2>
            <p>Enter your account information to create your account.</p>
          </div>

          {/* Form */}
          <div className="flex justify-center w-full">
            <div className="max-w-96 flex-1 flex flex-col gap-7">
              <div className="flex flex-col gap-2">
                <div className='flex flex-col gap-2'>
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" placeholder="Email" />
                </div>
                <div className='flex flex-col gap-2'>
                  <Label htmlFor="email">Password</Label>
                  <Input type="password" placeholder="Password" />
                </div>
              </div>
              <div className='w-full'>
                <Button className='w-full'>Create Account</Button>
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

export default SignUpPage
