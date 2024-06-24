import { Button } from "@/components/ui/button"
import Logo from '@/components/Logo'
import Link from 'next/link'
import LoginForm from "./loginForm"

const LoginPage = () => {
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
            <Link href={"/signup"}>Sign Up</Link>
          </Button>
        </div>

        <div className='flex flex-col items-center w-full h-full justify-center gap-12 mb-[70px]'>
          {/* Title */}
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-3xl text-center">Sign In</h2>
            <p>Enter your account information to sign in to your account.</p>
          </div>

          {/* Form */}
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default LoginPage

