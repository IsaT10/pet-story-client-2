import { Skeleton } from './skeleton';

export function PostLoadingSkeletonLeft() {
  return (
    <div className='flex items-start'>
      <div className=' w-full '>
        <div className='flex gap-3'>
          <Skeleton className='size-12  rounded-full mb' />
          <div>
            <Skeleton className='h-5 w-[80px]' />
            <Skeleton className='h-4 w-[150px] mt-2' />
          </div>
        </div>

        <div>
          <Skeleton className='h-10 mt-10 w-full' />
          <Skeleton className='h-4 w-[150px] mt-2' />
          <Skeleton className='h-4 w-full mt-8' />
          <Skeleton className='h-4 w-full mt-3' />
          <Skeleton className='h-4 w-[90%] mt-3' />
          <Skeleton className='h-4 w-[80%] mt-3' />
          <Skeleton className='h-4 w-[60%] mt-3' />
          <Skeleton className='h-72 w-full mt-3' />
        </div>
      </div>
    </div>
  );
}
export function PostLoadingSkeletonRight() {
  return (
    <div className='w-[35%] pl-10 flex flex-col gap-4 pt-10 border-l h-screen sticky top-0 right-0 border-stone-300'>
      <Skeleton className='h-10 w-full' />
      <Skeleton className='h-[2px] w-full ' />

      <Skeleton className='h-10  border-t border-stone-300 w-full' />
      <Skeleton className='h-10  w-full' />
      <Skeleton className='h-10  w-full' />
    </div>
  );
}
