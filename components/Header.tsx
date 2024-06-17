import Logo from './Logo';
import Navbar from './Navbar';
import Profile from './Profile';

const Header = () => {
  return (
    <header className="flex items-center justify-between gap-4 border-b-2 bg-background p-3.5">
      <Logo />
      <Navbar className="max-w-none justify-start" />

      <Profile />
    </header>
  );
};

export default Header;
