'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const loginForm = () => {
  return (
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
          <Button className='w-full'>Sign In with Email</Button>
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
  )
}

export default loginForm
