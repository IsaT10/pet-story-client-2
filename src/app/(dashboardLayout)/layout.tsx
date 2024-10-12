import Sidebar from '@/components/ui/sidebar';
import { ReactNode } from 'react';

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className='flex divide-x divide-stone-200 '>
      <Sidebar />
      <div className='flex-1 pl-16 p-6 md:p-8 lg:p-10 md:ml-12  lg:ml-64 min-h-screen dark:bg-stone-950'>
        {children}
      </div>
    </div>
  );
}
