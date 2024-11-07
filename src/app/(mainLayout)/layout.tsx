import MenuSidebar from '@/components/ui/menu-sidebar';
import Nav from '@/components/ui/nav';
import { FocusProvider } from '@/context/focus.provider';
import { ReactNode } from 'react';

export default function MainLayot({ children }: { children: ReactNode }) {
  return (
    <div className='  text-textPrimary'>
      {/* <Nav /> */}

      <div className='relative max-w-[1900px] mx-5 md:mr-7   flex '>
        <MenuSidebar />
        {children}
      </div>
    </div>
  );
}
