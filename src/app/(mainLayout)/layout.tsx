import Nav from '@/components/ui/nav';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function MainLayot({ children }: { children: ReactNode }) {
  return (
    <div className='  text-textPrimary'>
      <Nav />
      <div className='max-w-5xl mx-auto pt-[72px]'>{children}</div>
    </div>
  );
}
