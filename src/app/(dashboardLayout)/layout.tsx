import Sidebar from '@/components/ui/sidebar';
import { ReactNode } from 'react';

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className='flex '>
      <div>
        <Sidebar />
      </div>
      <div className='pt-10 px-5 lg:px-10 flex-1'>{children}</div>
    </div>
  );
}
