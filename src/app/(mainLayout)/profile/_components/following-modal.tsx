'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React from 'react';
import UserList from './user-list';
import { IUser } from '@/types';
type Tprops = {
  following?: IUser[];
};

export default function FollowingModal({ following }: Tprops) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <button>
          <span className='font-medium'>{following?.length}</span> following
        </button>
      </DialogTrigger>
      <DialogContent className='md:max-w-[400px] rounded-md  p-0'>
        <DialogHeader className=''>
          <DialogTitle className='text-center py-4 border-b mb-5 border-stone-300 font-semibold '>
            Following
          </DialogTitle>
        </DialogHeader>
        <div className='h-[360px] overflow-y-auto  px-6'>
          {following && following?.length > 0 ? (
            <div className='flex flex-col  divide-y divide-stone-200'>
              {following?.map((user) => (
                <UserList key={user._id} user={user} isFollowing={true} />
              ))}
            </div>
          ) : (
            <p className='h-[300px] text-stone-500 text- px-5 font- text-center flex flex-col items-center justify-center'>
              It looks like you’re not following anyone right now.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
