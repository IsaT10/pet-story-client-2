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

export function ProfileLoading() {
  return (
    <div className='w-[35%] pl-10 flex flex-col gap-3 pt-10 border-l h-screen sticky top-0 right-0 border-stone-300'>
      <Skeleton className='size-24 mb-2 rounded-full' />
      <div className='flex gap-6 '>
        <Skeleton className='h-6 w-1/2 ' />
        <Skeleton className='h-6 w-1/2 ' />
      </div>

      <Skeleton className='h-6 my-2  border-t w-full' />
      <Skeleton className='h-8 my-2  border-t w-full' />

      <div className='flex gap-4 items-center'>
        <Skeleton className='size-14  rounded-full ' />
        <Skeleton className='h-6  w-1/2' />
      </div>
      <div className='flex gap-4 items-center'>
        <Skeleton className='size-14  rounded-full ' />
        <Skeleton className='h-6  w-[60%]' />
      </div>
      <div className='flex gap-4 items-center'>
        <Skeleton className='size-14  rounded-full ' />
        <Skeleton className='h-6  w-[40%]' />
      </div>
      <div className='flex gap-4 items-center'>
        <Skeleton className='size-14  rounded-full ' />
        <Skeleton className='h-6  w-[70%]' />
      </div>
      <div className='flex gap-4 items-center'>
        <Skeleton className='size-14  rounded-full ' />
        <Skeleton className='h-6  w-1/2' />
      </div>
      <div className='flex gap-4 items-center'>
        <Skeleton className='size-14  rounded-full ' />
        <Skeleton className='h-6  w-1/2' />
      </div>
    </div>
  );
}
