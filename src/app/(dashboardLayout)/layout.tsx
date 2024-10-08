import { ReactNode } from 'react';

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className='flex '>
      <div className='w-[300px] bg-hover h-screen sticky left-0 top-0'>
        sidebar
      </div>
      <div>{children}</div>
    </div>
  );
}
