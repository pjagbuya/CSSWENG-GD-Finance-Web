'use client';

import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mb-4 flex flex-1 flex-col items-center justify-center">
      <h2 className="mb-4 text-4xl font-bold">An Error Occured 😭</h2>
      <p className="mb-6">"{error.message}"</p>

      <div className="grid grid-cols-2 gap-2">
        <Button onClick={reset}>Try Again</Button>

        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </main>
  );
}
