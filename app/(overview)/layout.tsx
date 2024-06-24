import React from 'react';
import Header from '@/components/Header';

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-screen">
      <Header />
      {children}
    </div>
  );
}
