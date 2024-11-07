'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React, { useState } from 'react';
import { PremiumUser, Share, Spinner } from '../../ui/icon';
import { useUser } from '@/context/user.provider';
import Image from 'next/image';
import avatar from '@/assets/images/avatar.png';
import { Button } from '../../ui/button';
import { useSharedPost } from '@/hooks/post.hook';

type TProps = {
  _id: string;
  shareCount: number;
};

export function ShareModal({ _id, shareCount }: TProps) {
  const [sharedText, setSharedText] = useState('');
  const { user } = useUser();
  const [isOpen, setIsOpen] = React.useState(false);
  const { mutate: sharedPost, isPending } = useSharedPost();

  const handleSharedPost = () => {
    console.log({ sharedText, _id });

    sharedPost(
      {
        sharedData: { sharedText },
        postId: _id,
      },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <button className='flex items-center gap-2 border border-stone-400 rounded-full w-20 justify-center  h-10'>
          <span>
            <Share />
          </span>
          {shareCount ? (
            <span className='leading-none font-medium'>{shareCount}</span>
          ) : (
            ''
          )}
        </button>
      </DialogTrigger>
      <DialogContent className='lg:w-1/2 w-[85%]  max-h-[90vh] overflow-y-auto '>
        <DialogHeader>
          <DialogTitle className='text-center border-b border-stone-300 pb-5'>
            Share
          </DialogTitle>
        </DialogHeader>
        <div className='flex items-start gap-3  py-5'>
          <div className='relative'>
            <Image
              src={user?.image || avatar}
              width={50}
              height={50}
              alt='user-image'
              className='rounded-full h-[50px] object-cover'
            />
            {user?.status === 'premium' ? (
              <div className='absolute -right-0.5 -bottom-0.5'>
                <PremiumUser className='size-4' />
              </div>
            ) : (
              ''
            )}
          </div>
          <div>
            <p className='font-semibold md:text-lg leading-none'>
              {user?.name}
            </p>
          </div>
        </div>

        <textarea
          rows={3}
          autoFocus
          className='outline-none resize-none mb-6'
          placeholder='Say something about this...'
          onChange={(e) => setSharedText(e.target.value)}
        ></textarea>

        <Button onClick={handleSharedPost}>
          {isPending ? <Spinner className='animate-spin h-4' /> : 'Share now'}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
