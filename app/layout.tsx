import { cn } from '@/lib/utils';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { NavBar } from '@/components/navbar/NavBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // dir='rtl'
  return (
    <html lang='en' className='h-full' dir='rtl'>
      <body className={cn('flex flex-col min-h-full', inter.className)}>
        {/* <NavBar /> */}
        {children}
      </body>
    </html>
  );
}
