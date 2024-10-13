'use client';

import { useUser } from '@/context/user.provider';
import { IUser } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

type TProps = { user: IUser; isFollowing?: boolean };

export default function SingleUserList({ user }: TProps) {
  const { user: myself } = useUser();

  const { name, image, _id } = user;

  return (
    <div className='flex gap-3 items-center py-3'>
      <Image
        src={image}
        alt='follower-image'
        width={50}
        height={50}
        className='rounded-full object-cover h-[50px]'
      />
      <div className='flex gap-6 w-full justify-between items-start'>
        <Link
          href={`${myself?._id === _id ? `/profile` : `/profile/${_id}`}`}
          className='font-medium hover:underline'
        >
          {name}
        </Link>
      </div>
    </div>
  );
}
