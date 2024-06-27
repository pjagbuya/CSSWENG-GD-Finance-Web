import React from 'react';
import Header from '@/components/Header';
import { Toaster } from '@/components/ui/toaster';

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-screen">
      <Header />
      {children}
      <Toaster />
    </div>
  );
}
