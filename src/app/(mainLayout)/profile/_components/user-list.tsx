'use client';

import { RotatingLines } from 'react-loader-spinner';
import { Button } from '@/components/ui/button';
import { useUnfollowUser } from '@/hooks/user.hook';
import { IUser } from '@/types';
import Image from 'next/image';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type TProps = { user: IUser; isFollowing?: boolean };

export default function UserList({ user, isFollowing = false }: TProps) {
  const { name, image, _id } = user;
  const { mutate: handleUnfollow, isSuccess, isPending } = useUnfollowUser();

  const handleUnfollowUser = () => {
    handleUnfollow(_id);
  };

  return (
    <div className='flex gap-3 items-center py-3'>
      <Image
        src={image}
        alt='follower-image'
        width={50}
        height={50}
        className='rounded-full'
      />
      <div className='flex gap-6 w-full justify-between items-start'>
        <p className='font-medium '>{name}</p>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            {isFollowing ? (
              <Button
                variant='outline'
                className={`py-1 ${isPending ? 'px-[33px]' : ''} text-sm `}
              >
                {isPending ? (
                  <RotatingLines
                    visible
                    height='20'
                    width='20'
                    strokeWidth='5'
                    strokeColor='#6A5ACD'
                    animationDuration='0.75'
                    ariaLabel='rotating-lines-loading'
                    className='text-white stroke-white'
                  />
                ) : (
                  'unfollow'
                )}
              </Button>
            ) : (
              ''
            )}
          </AlertDialogTrigger>
          <AlertDialogContent className='flex flex-col  '>
            <Image
              src={image}
              alt='follower-image'
              width={80}
              height={80}
              className='rounded-full mx-auto'
            />
            <AlertDialogTitle className='text-center mt-6 font-normal'>
              Unfollow {name}
            </AlertDialogTitle>

            <AlertDialogAction
              className='py-3 border-t text-sm border-stone-300 mt-8 font-medium text-red-600'
              onClick={handleUnfollowUser}
            >
              Unfollow
            </AlertDialogAction>
            <AlertDialogCancel className='py-3 text-sm border-t border-stone-300'>
              Cancel
            </AlertDialogCancel>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
