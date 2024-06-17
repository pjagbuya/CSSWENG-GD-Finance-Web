import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mb-4 flex flex-1 flex-col items-center justify-center">
      <h2 className="mb-4 text-4xl font-bold">Not Found 😥</h2>
      <p className="mb-6">Could not find the requested resource.</p>

      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </main>
  );
}
