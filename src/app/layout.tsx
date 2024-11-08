import type { Metadata } from 'next';
import '../styles/globals.css';
import { Providers } from '@/lib/providers';

import { Roboto } from 'next/font/google';

export const metadata: Metadata = {
  title: 'PetWise',
  description: 'Your one-stop platform for pet care, advice, and community.',
};

const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={roboto.className}>
        <div className='bg-white text-stone-950'>
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
