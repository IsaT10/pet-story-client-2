import Link from 'next/link';
import { ReactNode } from 'react';

export default function MainLayot({ children }: { children: ReactNode }) {
  return (
    <div className='max-w-6xl mx-auto text-textPrimary'>
      <div>
        <Link href='/'>Home</Link>
        <Link href='/profile'>Profile</Link>
      </div>
      {children}
    </div>
  );
}
