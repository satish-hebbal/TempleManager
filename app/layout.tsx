// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';

const lexend = Lexend({ 
  subsets: ['latin'],
  // You can specify different weights if needed
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-lexend',
});

export const metadata: Metadata = {
  title: 'Mandir Manthan - Temple Manager',
  description: 'Manage temple information and donations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      <body className={`${lexend.variable} font-lexend`}>
        {children}
      </body>
    </html>
  );
}