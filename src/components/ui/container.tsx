import { ReactNode } from 'react';

export default function container({ children }: { children: ReactNode }) {
  return <div className='max-w-7xl mx-5 md:mx-8 xl:mx-auto'>{children}</div>;
}
