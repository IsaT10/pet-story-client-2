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
  followers?: IUser[];
};

export default function FollowersModal({ followers }: Tprops) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <button>
          <span className='font-medium'>{followers?.length}</span> followers
        </button>
      </DialogTrigger>
      <DialogContent className='md:max-w-[350px] rounded-md  p-0'>
        <DialogHeader className=''>
          <DialogTitle className='text-center py-4 border-b mb-5 border-stone-300 font-semibold'>
            Followers
          </DialogTitle>
        </DialogHeader>
        <div className='h-[360px] overflow-y-auto  px-6'>
          {followers && followers?.length > 0 ? (
            <div className='flex flex-col  divide-y divide-stone-200'>
              {followers?.map((user) => (
                <UserList key={user._id} user={user} />
              ))}
            </div>
          ) : (
            <p className='h-[300px] text-stone-500 text- px-5 font- text-center flex flex-col items-center justify-center'>
              You currently have no followers. Don't worry! Keep engaging and
              sharing your sotry.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
