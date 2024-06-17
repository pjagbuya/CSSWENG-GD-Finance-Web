import { Button } from '@/components/ui/button';
import Link from 'next/link';

type LogoProps = {
  className?: string;
};

const Profile = ({ className }: LogoProps) => {
  return (
    <div className={`${className} flex items-center gap-5`}>
      <div>
        <p className="-mb-1.5 font-bold">Name Name Name Name</p>
        <small>Position Position</small>
      </div>

      <Button asChild>
        <Link href="/">Sign Out</Link>
      </Button>
    </div>
  );
};

export default Profile;
