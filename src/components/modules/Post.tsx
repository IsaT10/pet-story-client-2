'use client';

import { IComment, IPost } from '@/types';
import Image from 'next/image';
import React, { useState } from 'react';
import {
  Comment,
  DownArrow,
  Eyeslash,
  PremiumPost,
  PremiumUser,
  Send,
  Spinner,
  UpArrow,
} from '../ui/icon';
import { useUser } from '@/context/user.provider';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  useDeletePost,
  useDownvotePost,
  useUpvotePost,
} from '@/hooks/post.hook';
import { useCreateComment } from '@/hooks/comment.hook';
import avatar from '@/assets/images/avatar.png';
import { timeCompact } from '@/app/utils/timeCompact';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import { EditContentModal } from './edit-modal';
import SingleComment from './comment';
// import { RotatingLines } from 'react-loader-spinner';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type TProps = {
  post: IPost;
  // refetch: () => void;
};

export default function Post({ post }: TProps) {
  const {
    thumbnail,
    author,
    content,
    comments,
    isPremium,
    downvotes,
    createdAt,
    upvotes,
    _id,
  } = post;
  const { user, isLoading } = useUser();
  const [showComment, setShowComment] = useState(false);
  const [showFullContent, setShowFullContent] = React.useState(false);
  const [userVote, setUserVote] = React.useState<'upvote' | 'downvote' | null>(
    null
  );
  const [commentText, setCommentText] = useState('');
  const [upvoteCount, setUpvoteCount] = React.useState(upvotes?.length);
  const [downvoteCount, setDownvoteCount] = React.useState(downvotes?.length);
  const pathname = usePathname(); // Use usePathname to get the current path

  const { mutate: handleUpvotesPost } = useUpvotePost();
  const { mutate: handleDownvotesPost } = useDownvotePost();
  const { mutate: handleComment, isPending } = useCreateComment();
  const { mutate: deletePost } = useDeletePost(_id);

  React.useEffect(() => {
    if (!isLoading && user) {
      if (upvotes.includes(user._id)) {
        setUserVote('upvote');
      } else if (downvotes.includes(user._id)) {
        setUserVote('downvote');
      } else {
        setUserVote(null);
      }
    }
  }, [upvotes, downvotes, user, isLoading]);

  const handleVote = (type: 'upvote' | 'downvote') => {
    if (type === 'upvote') {
      if (userVote === 'upvote') {
        setUpvoteCount(upvoteCount - 1);
        setUserVote(null);
      } else {
        setUpvoteCount(upvoteCount + 1);
        if (userVote === 'downvote') setDownvoteCount(downvoteCount - 1);
        setUserVote('upvote');
      }
      handleUpvotesPost(_id, {
        onError: () => {
          setUpvoteCount(
            userVote === 'upvote' ? upvoteCount + 1 : upvoteCount - 1
          );
          setUserVote(userVote === 'upvote' ? null : 'upvote');
        },
      });
    } else {
      if (userVote === 'downvote') {
        setDownvoteCount(downvoteCount - 1);
        setUserVote(null);
      } else {
        setDownvoteCount(downvoteCount + 1);
        if (userVote === 'upvote') setUpvoteCount(upvoteCount - 1);
        setUserVote('downvote');
      }
      handleDownvotesPost(_id, {
        onError: () => {
          setDownvoteCount(
            userVote === 'downvote' ? downvoteCount + 1 : downvoteCount - 1
          );
          setUserVote(userVote === 'downvote' ? null : 'downvote');
        },
      });
    }
  };

  const handleDelete = () => {
    deletePost(undefined, {
      onSuccess: () => {
        // refetch();
      },
    });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: IComment = {
      comment: commentText,
    };

    handleComment(
      {
        postId: _id,
        commentData: newComment,
      },
      {
        onSuccess: () => {
          // refetch();
          setCommentText('');
        },
      }
    );
  };
  const previewContent =
    content?.length > 300 ? content.substring(0, 500) + '...' : content;
  return (
    <div className='mb-14 md:mb-20 w-full'>
      <div className='flex justify-between items-start'>
        <div className='flex items-start gap-2 mb-6'>
          <div className='relative'>
            <Image
              src={author?.image || avatar}
              width={44}
              height={44}
              alt='author-image'
              className='rounded-full'
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
            <p className='font-semibold text-lg leading-none'>{author.name}</p>
            <p className='text-xs font-medium text-stone-500 mt-1'>
              {timeCompact(createdAt)}
            </p>
          </div>
        </div>

        <div className='flex gap-4 items-center'>
          {isPremium ? <PremiumPost /> : ''}

          {pathname === '/profile' || pathname === '/' ? (
            <>
              {' '}
              {author._id === user?._id ? (
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
                    <EditContentModal post={post} />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className='px-4 py-1.5 text-sm rounded-md w-full text-left hover:bg-stone-100 hover:outine-none'>
                          Delete post
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className='px-6 pt-6 h-[240px]'>
                        <AlertDialogHeader className=''>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>
                            <Button variant='outline' className='py-[7px]'>
                              Cancel
                            </Button>
                          </AlertDialogCancel>
                          <AlertDialogAction>
                            <Button
                              onClick={handleDelete}
                              variant='default'
                              className='py-2'
                            >
                              Continue
                            </Button>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
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

      <div
        className='custom-html'
        dangerouslySetInnerHTML={{
          __html: showFullContent ? content : previewContent,
        }}
      ></div>
      <div className='relative'>
        <div
          className={`${
            (isPremium && user?.status !== 'premium') || (isPremium && !user)
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

          <div className='flex gap-6 border-stone-300 items-center border-b pt-3 pb-4'>
            <div
              className={`flex gap-2 ${
                userVote === 'upvote'
                  ? 'bg-green-500'
                  : userVote === 'downvote'
                  ? 'bg-red-500'
                  : ''
              } items-center border border-stone-400 rounded-full w-max px-5 py-1.5`}
            >
              <button onClick={() => handleVote('upvote')}>
                <UpArrow />
              </button>
              {upvoteCount - downvoteCount}
              <button onClick={() => handleVote('downvote')}>
                <DownArrow />
              </button>
            </div>

            <button
              onClick={() => setShowComment(!showComment)}
              className='flex items-center gap-2 border border-stone-400 rounded-full w-max px-5 py-1.5'
            >
              <span className='mt-1'>
                <Comment />
              </span>
              <span>{comments?.length}</span>
            </button>
          </div>

          {showComment ? (
            <>
              <div className='flex w-full items-start my-4'>
                <Image
                  src={user?.image || avatar}
                  height={35}
                  width={35}
                  alt='user-profile'
                  className='rounded-full mr-2 '
                />
                <form
                  onSubmit={handleCommentSubmit}
                  className='flex items-center gap-2 w-full relative'
                >
                  <textarea
                    value={commentText}
                    rows={2}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder='Write a comment...'
                    className='resize-none rounded-xl  pl-4 pr-10 py-2 w-full  outline-primary bg-stone-100 border border-stone-200'
                  />
                  <button className='absolute right-4 top-5'>
                    {isPending ? (
                      <Spinner className='animate-spin h-5  text-primary' />
                    ) : (
                      <Send />
                    )}
                  </button>
                </form>
              </div>

              <div className='space-y-3'>
                {comments.map((comment) => (
                  <SingleComment
                    key={comment._id}
                    comment={comment}
                    // refetch={refetch}
                  />
                ))}
              </div>
            </>
          ) : (
            ''
          )}
        </div>
        {(isPremium && user?.status !== 'premium') || (isPremium && !user) ? (
          <div className='absolute flex flex-col gap-3 items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
            <Eyeslash />
            <Link href={'/subscription'}>
              <Button className='py-2'>Want to see premium content?</Button>
            </Link>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
