import { Logo } from '@/components/ui/icon';
import MenuSidebar from '@/components/ui/menu-sidebar';
// import Nav from '@/components/ui/nav';
// import { FocusProvider } from '@/context/focus.provider';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function MainLayot({ children }: { children: ReactNode }) {
  return (
    <div className='  text-textPrimary relative'>
      {/* <Nav /> */}

      <div className=' py-4 fixed left-0 right-0 top-0 bg-white z-50 md:hidden  border-b border-stone-300'>
        <Link
          href='/'
          className='text-xl sm:text-2xl w-max mx-auto items-center md:hidden justify-center font-semibold text-primary flex gap-1 '
        >
          <Logo />
          PetWise
        </Link>
      </div>

      <div className='relative max-w-[1900px] mx-5 md:mr-7  mt-20 md:mt-0 flex '>
        <MenuSidebar />
        {children}
      </div>
    </div>
  );
}
