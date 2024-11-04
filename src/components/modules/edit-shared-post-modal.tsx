'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import avatar from '@/assets/images/avatar.png';
import React from 'react';
import { IPost } from '@/types';
import { PremiumUser, Spinner } from '../ui/icon';
import { Button } from '../ui/button';
import { useUpdateSharedPost } from '@/hooks/post.hook';
import Image from 'next/image';
import { timeCompact } from '@/app/utils/timeCompact';
import { useUser } from '@/context/user.provider';

type TProps = {
  post: IPost;
};

export function EditSharedPostModal({ post }: TProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user } = useUser();
  const [showFullContent, setShowFullContent] = React.useState(false);
  const { thumbnail, content, category, sharedPostId, _id } = post;
  const [sharedText, setSharedText] = React.useState(post?.sharedText || '');
  const { mutate: updateSharedPost, isPending } = useUpdateSharedPost();

  const handleUpdateSharedPost = () => {
    console.log(sharedText);

    updateSharedPost(
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
        <button className='px-4 py-1.5 text-sm rounded-md w-full text-left hover:bg-stone-100 hover:outine-none'>
          Edit post
        </button>
      </DialogTrigger>
      <DialogContent className='lg:w-1/2 w-[85%]  max-h-[80vh] overflow-y-auto '>
        <DialogHeader>
          <DialogTitle className='text-center border-b border-stone-300 pb-5'>
            Edit post
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
          rows={2}
          autoFocus
          defaultValue={sharedText}
          className='outline-none resize-none '
          placeholder='Say something about this...'
          onChange={(e) => setSharedText(e.target.value)}
        ></textarea>

        {thumbnail ? (
          <Image
            src={thumbnail}
            height={100}
            width={800}
            alt='post-thumbnail'
            className='mt-3  max-h-[320px] rounded-t-lg object-cover'
          />
        ) : (
          ''
        )}
        <div className='border rounded-b-lg py-5 px-6 border-stone-300'>
          <div className='flex items-start gap-3 mb-6  '>
            <div className='relative'>
              <Image
                src={sharedPostId?.author?.image || avatar}
                width={50}
                height={50}
                alt='author-image'
                className='rounded-full h-[50px] object-cover'
              />
              {sharedPostId?.author?.status === 'premium' ? (
                <div className='absolute -right-0.5 -bottom-0.5'>
                  <PremiumUser className='size-4' />
                </div>
              ) : (
                ''
              )}
            </div>
            <div>
              <p className='font-semibold md:text-lg leading-none'>
                {sharedPostId?.author?.name}
              </p>
              <div className=' flex gap-1.5 items-center'>
                {sharedPostId ? (
                  <p className='text-xs font-medium text-white mt-1 bg-primary rounded-full py-[2px] px-3'>
                    {category}
                  </p>
                ) : (
                  ''
                )}
                <span className='font-bold -mt-2 text-xl'>.</span>
                <p className='text-xs font-medium text-stone-500 mt-1'>
                  {timeCompact(sharedPostId ? sharedPostId.createdAt : '')}
                </p>
              </div>
            </div>
          </div>

          <div
            className='custom-html  '
            dangerouslySetInnerHTML={{
              __html: showFullContent
                ? content
                : `${content?.substring(0, 200)} ... `,
            }}
          ></div>

          {content?.length > 300 && (
            <button
              className='text-blue-500 mt-2  '
              onClick={() => setShowFullContent(!showFullContent)}
            >
              {showFullContent ? 'Read Less' : 'Read More'}
            </button>
          )}
        </div>

        <Button className='mt-7' onClick={handleUpdateSharedPost}>
          {isPending ? <Spinner className='animate-spin h-4' /> : 'Update '}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
