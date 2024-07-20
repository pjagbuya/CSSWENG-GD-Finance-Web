'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { logout } from '@/actions/login';
import Link from 'next/link';
import React from 'react';

type LogoProps = {
  className?: string;
  setChiefProps: (t: boolean) => void;
};

const Profile = ({ className, setChiefProps }: LogoProps) => {
  const [email, setEmail] = useState<string | undefined>();
  const [position, setPosition] = useState<string | undefined>();
  const [isLogin, setLogin] = useState<boolean>(false);
  useEffect(() => {
    async function getUser() {
      const supabase = createClient();

      const { data } = await supabase.auth.getUser();

      const user = data?.user;

      setEmail(user?.email);
      setPosition(user ? 'Certified Caveman' : undefined);
      setLogin(!!user);
      if (user) {
        const { data: userData, error: userError } = await supabase
          .from('users_view')
          .select('*')
          .eq('uuid', user?.id);

        setPosition((userData && userData[0]?.staff_position) || undefined);
        setChiefProps(!userError && userData[0]?.staff_position === 'chief');
      }
    }

    getUser();
  }, [email]);
  return (
    <div className={`${className} flex items-center gap-5`}>
      <div>
        <p className="-mb-1.5 font-bold">{email}</p>
        <small>{position}</small>
      </div>

      {isLogin ? (
        <form
          action={async () => {
            await logout();
            setEmail('');
          }}
        >
          <Button>Sign Out</Button>
        </form>
      ) : (
        <form>
          <Button asChild>
            <Link href="/login">Log in</Link>
          </Button>
        </form>
      )}
    </div>
  );
};

export default Profile;
