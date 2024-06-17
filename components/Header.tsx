import Logo from './Logo';
import Navbar from './Navbar';
import Profile from './Profile';

const Header = () => {
  return (
    <header className="p-3.5 flex gap-4 items-center justify-between bg-background border-b-2">
      <Logo />
      <Navbar className="max-w-none justify-start" />

      <Profile />
    </header>
  );
};

export default Header;
