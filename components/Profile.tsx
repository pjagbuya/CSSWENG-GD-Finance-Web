'use client'

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation'
import React from 'react'

type LogoProps = {
  className?: string;
};

const Profile = ({ className }: LogoProps) => {
  const [email, setEmail] = useState<string>('')
  useEffect(() => {
    async function getUser() {
      const supabase = createClient()

      const { data, error } = await supabase.auth.getUser()
      if (error || !data?.user) {
        redirect('/login')
      }
      setEmail(data.user.email || 'anonymous')
    }

    getUser()
  })
  return (
    <div className={`${className} flex items-center gap-5`}>
      <div>
        <p className="-mb-1.5 font-bold">{email}</p>
        <small>Position Position</small>
      </div>

      <Button asChild>
        <Link href="/">Sign Out</Link>
      </Button>
    </div>
  );
};

export default Profile;
