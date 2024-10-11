import { IUser } from '@/types';
import { Button } from './button';

type TProps = { user: IUser };

export default function UserList({ user }: TProps) {
  return (
    <div className='text-xs md:text-sm py-5 px-6 md:px-10 dark:text-stone-100 dark:bg-stone-700  flex gap-4 justify-between items-center'>
      <span className='flex-1 md:ml-6'>{user.name}</span>
      <span className='flex-1 text-center'>{user.email}</span>
      <span className={`flex-1 font-bold text-xs md:text-sm text-center`}>
        {user.role}
      </span>
      <span
        className={`flex-1 font-bold text-xs md:text-sm text-center ${
          user?.status === 'premium' ? 'text-primary' : 'text-green-500'
        }`}
      >
        {user.status.toUpperCase()}
      </span>

      {/* <span className='flex-[.5] text-center'>
       
        <Button className='py-2 px-6'>Delete</Button>
      </span> */}
    </div>
  );
}
