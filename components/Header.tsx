'use client'
import Logo from './Logo';
import Navbar from './Navbar';
import Profile from './Profile';
import { useState } from 'react';

const Header = () => {
  const [isChief, setChief] = useState<boolean>(false)

  function setChiefState(t: boolean) {
    setChief(t)
  }
  return (
    <header className="flex items-center justify-between gap-4 border-b-2 bg-background p-3.5 print:hidden">
      <Logo />
      <Navbar className="max-w-none justify-start" isChief={isChief} />

      <Profile setChiefProps={setChiefState} />
    </header>
  );
};

export default Header;
