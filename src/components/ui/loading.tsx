import { Spinner } from './icon';

export default function Loading() {
  return (
    <div className='h-screen bg-black/10 fixed inset-0 z-[999] backdrop-blur-sm flex justify-center items-center'>
      <Spinner className='animate-spin h-6' />
    </div>
  );
}
