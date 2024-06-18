import Link from 'next/link';

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => {
  return (
    <h1 className={`font-bold ${className}`}>
      <Link className="flex items-center gap-2 text-2xl" href="/">
        <img width="55" src="/icons/gdsc-logo.png" alt="GDSC Logo" />
        GD Finances
      </Link>
    </h1>
  );
};

export default Logo;
