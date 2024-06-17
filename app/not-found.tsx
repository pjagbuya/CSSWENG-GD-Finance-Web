import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mb-4 flex-1 flex flex-col justify-center items-center">
      <h2 className="font-bold text-4xl mb-4">Not Found 😥</h2>
      <p className="mb-6">Could not find the requested resource.</p>

      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
