'use client';

import { IPost } from '@/types';
import Image from 'next/image';
import React, { useState } from 'react';
import { Comment, Eyeslash, PremiumPost, PremiumUser } from '../ui/icon';
import { useUser } from '@/context/user.provider';

import avatar from '@/assets/images/avatar.png';
import { timeCompact } from '@/app/utils/timeCompact';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
// import { RotatingLines } from 'react-loader-spinner';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import WarningMessage from '../ui/warning-message';
import PostThreedotButton from './post-threedot-button';
import PostUpvoteDownvote from './post-upvote-downvote';
import PostComments from './post-comments';
import { ShareModal } from './share-modal';

type TProps = {
  post: IPost;
};

export default function Post({ post }: TProps) {
  const {
    thumbnail,
    author,
    content,
    comments,
    isPremium,
    category,
    downvotes,
    createdAt,
    upvotes,
    sharedText,
    sharedPostId,
    sharedBy,
    shareCount,
    _id,
  } = post;
  const { user } = useUser();
  console.log(sharedText || 'ass');
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenVote, setIsOpenVote] = React.useState(false);
  const [isOpenComment, setIsOpenComment] = React.useState(false);
  const [isOpenShare, setIsOpenShare] = React.useState(false);
  const [showComment, setShowComment] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showFullContent, setShowFullContent] = React.useState(false);

  const pathname = usePathname(); // Use usePathname to get the current path
  const route = useRouter();

  console.log(sharedBy);

  const previewContent =
    content?.length > 300 ? content.substring(0, 500) + '...' : content;

  const handleSeePremiumPOst = () => {
    if (!user) {
      setIsOpen(true);
    } else {
      route.push('/subscription');
    }
  };

  const handleShowComment = () => {
    if (user) {
      setShowComment(!showComment);
    } else {
      setIsOpenComment(true);
    }
  };
  return (
    <>
      <div className='w-full py-6 border-b border-stone-400'>
        <div className='flex justify-between items-start'>
          <div className='flex items-start gap-3 mb-6'>
            <div className='relative'>
              <Image
                src={author?.image || avatar}
                width={50}
                height={50}
                alt='author-image'
                className='rounded-full h-[50px] object-cover'
              />
              {author.status === 'premium' ? (
                <div className='absolute -right-0.5 -bottom-0.5'>
                  <PremiumUser className='size-4' />
                </div>
              ) : (
                ''
              )}
            </div>
            <div>
              <p className='font-semibold md:text-lg leading-none'>
                {author.name}
              </p>
              <div className=' flex gap-1.5 items-center'>
                {!sharedPostId ? (
                  <p className='text-xs font-medium text-white mt-1 bg-primary rounded-full py-[2px] px-3'>
                    {category}
                  </p>
                ) : (
                  ''
                )}
                <span className='font-bold -mt-2 text-xl'>.</span>
                <p className='text-xs font-medium text-stone-500 mt-1'>
                  {timeCompact(createdAt)}
                </p>
              </div>
            </div>
          </div>

          <div className='flex gap-4 items-center'>
            {isPremium ? <PremiumPost /> : ''}

            {pathname === '/profile' || pathname === '/' ? (
              <>
                {author._id === user?._id ? (
                  <PostThreedotButton post={post} />
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className='bg--100 p-3 rounded-full hover:bg-stone-100'>
                        <MoreHorizontal className='h-4 w-4' />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className='bg-white w-[100px] border shadow-sm rounded-lg p-1'
                      align='center'
                    >
                      <Link
                        href={`/profile/${author._id}`}
                        className='px-4 py-1.5 text-sm rounded-md w-full text-left hover:bg-stone-100 hover:outine-none'
                      >
                        View Profile
                      </Link>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </>
            ) : (
              ''
            )}
          </div>
        </div>

        {sharedPostId ? (
          <p>{sharedText}</p>
        ) : (
          <div
            className='custom-html'
            dangerouslySetInnerHTML={{
              __html: showFullContent ? content : previewContent,
            }}
          ></div>
        )}

        <div className='relative'>
          {sharedPostId ? (
            <div
              className={`${
                (isPremium && user?.status !== 'premium') ||
                (isPremium && !user) ||
                (sharedPostId?.isPremium && !user) ||
                (sharedPostId?.isPremium && user?.status !== 'premium')
                  ? 'blur-md '
                  : ''
              }`}
            >
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
                        {timeCompact(sharedPostId?.createdAt)}
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
            </div>
          ) : (
            <div
              className={`${
                (isPremium && user?.status !== 'premium') ||
                (isPremium && !user)
                  ? 'blur-md '
                  : ''
              }`}
            >
              {content?.length > 300 && (
                <button
                  className='text-blue-500 mt-2'
                  onClick={() => setShowFullContent(!showFullContent)}
                >
                  {showFullContent ? 'Read Less' : 'Read More'}
                </button>
              )}

              {thumbnail ? (
                <Image
                  src={thumbnail}
                  height={100}
                  width={800}
                  alt='post-thumbnail'
                  className='my-3 max-h-[400px] rounded-lg object-cover'
                />
              ) : (
                ''
              )}
            </div>
          )}
          <WarningMessage
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            message='You need to be logged in and premium to see any premium post. Please login or signup '
          />

          <WarningMessage
            setIsOpen={setIsOpenVote}
            isOpen={isOpenVote}
            message='You need to be logged in to react a post. Please login or signup
                 to continue.'
          />
          <WarningMessage
            setIsOpen={setIsOpenComment}
            isOpen={isOpenComment}
            message='You need to be logged in to see comments. Please login or signup
                 to continue.'
          />
          <WarningMessage
            setIsOpen={setIsOpenShare}
            isOpen={isOpenShare}
            message='You need to be logged in to share post. Please login or signup
                 to continue.'
          />
          <div className='flex gap-6  items-center pt-5 '>
            <PostUpvoteDownvote
              upvotes={upvotes}
              downvotes={downvotes}
              _id={_id}
              setIsOpenVote={setIsOpenVote}
            />

            <button
              onClick={handleShowComment}
              className='flex items-center gap-2 border border-stone-400 rounded-full w-20 justify-center  h-10'
            >
              <span>
                <Comment />
              </span>
              {comments?.length ? (
                <span className='leading-none font-medium'>
                  {comments.length}
                </span>
              ) : (
                ''
              )}
            </button>

            <ShareModal
              _id={_id}
              isOpenShare={isOpenShare}
              shareCount={shareCount}
              setIsOpenShare={setIsOpenShare}
              showShareModal={showShareModal}
              setShowShareModal={setShowShareModal}
            />
          </div>

          {showComment ? <PostComments _id={_id} comments={comments} /> : ''}

          {(isPremium && user?.status !== 'premium') ||
          (isPremium && !user) ||
          (sharedPostId?.isPremium && !user) ||
          (sharedPostId?.isPremium && user?.status !== 'premium') ? (
            <div className='absolute flex flex-col gap-3 items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
              <Eyeslash />
              <Button onClick={handleSeePremiumPOst} className='py-2'>
                Want to see premium content?
              </Button>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
}
