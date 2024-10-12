'use client';

import { Spinner } from '@/components/ui/icon';
import UserList from '@/components/ui/user-list';
import { useGetAllUsers } from '@/hooks/user.hook';
import { IUser } from '@/types';

export default function UserManage() {
  const { data, isLoading, error } = useGetAllUsers([]);

  console.log(data?.data?.result);

  if (isLoading)
    return (
      <div className='h-screen flex flex-col items-center justify-center w-full'>
        <Spinner className='animate-spin h-20' />
      </div>
    );

  if (error)
    return (
      <div className='h-[calc(100vh-150px)] flex justify-center items-center text-red-600 font-semibold text-2xl'>
        Unable to load data. Please check your internet connection and try
        again.
      </div>
    );
  return (
    <div className=''>
      <div className='border border-stone-200 font-semibold rounded-b-none dark:border-stone-700 text-stone-800 text-xs md:text-sm rounded-lg py-3 md:py-4 px-6 md:px-10 flex justify-between items-center mt-2 bg-stone-100 dark:bg-stone-800 dark:text-stone-200'>
        <span className='flex-1 md:ml-6'>Name</span>
        <span className='flex-1  text-center'>Email</span>
        <span className='flex-1 text-center'>Role</span>

        <span className='flex-1 text-center'>Status</span>

        <span className='flex-1 text-center'>Actions</span>
      </div>

      <div className='rounded-lg border border-t-0 dark:border-stone-700 rounded-t-none border-stone-200 divide-y divide-stone-200 dark:divide-stone-950 mb-10'>
        {data?.data?.result?.map((el: IUser) => (
          <UserList key={el._id} user={el} />
        ))}
      </div>
    </div>
  );
}
